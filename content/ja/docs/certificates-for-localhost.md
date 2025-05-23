---
title: localhost 向けの証明書
slug: certificates-for-localhost
date: 2017-12-21
lastmod: 2017-12-21
show_lastmod: 1
---


ローカルの開発で使用したり、ウェブアプリケーションとの通信が必要なネイティブ・アプリケーションに配布するために、"localhost" というホスト名に対する証明書を発行したい場合もあると思います。 Let's Encrypt は、"localhost" に対する証明書を提供することはできません。理由は、その証明書をユニークに所有することができる主体が存在せず、".com" や ".net" のようなトップレベルのドメインをルートに持つことができないからです。 `127.0.0.1` に解決するドメインを自分自身でセットアップして、DNS チャレンジを使用して証明書を取得することは技術的には可能ではあります。 しかし、これは一般的に悪いアイデアであり、それよりも良い選択肢があります。

# ローカルの開発のための証明書

ウェブアプリを開発している場合、Apache や Nginx などのローカルのウェブサーバーを実行して、そのウェブアプリにはウェブブラウザから `http://localhost:8000/` でアクセスできるようにすると便利です。 しかし、HTTP と HTTPS のページでは、ブラウザの動作の仕方が微妙に違います。 主な違いは、HTTPS のページでは、HTTP の URL から JavaScript をロードするリクエストがブロックされるという点です。 そのため、HTTP を使ってローカルで開発をする場合、ある script タグが開発用のマシンでは正しく動作するにもかかわらず、HTTPS の本番のサイト環境にデプロイすると不具合が発生するということがありえます。 この種の問題を捉えるには、ローカルのウェブサーバーで HTTPS のセットアップを行うと役に立ちます。 しかし、証明書の警告を毎回見たくはないと思います。 それでは、ローカルでもブラウザ上で緑の鍵マークが見られるように設定するには、どのようにすればよいのでしょうか？

最善の選択は、自分で証明書を発行し、それに自己署名またはローカル環境のルートで署名を行い、オペレーティングシステムのトラストストアでその証明書を信頼する、という方法です。 そして、その証明書をローカルのウェブサーバーで使います。 詳しくは、以下の各セクションを読んでください。

# ウェブアプリと通信するネイティブアプリのための証明書

開発者は、ダウンロード可能なネイティブアプリを提供して、ウェブサイトとともに追加機能を提供したい場合があります。 たとえば、Dropbox や Spotify のデスクトップアプリは、マシン上のファイルをスキャンできますが、このような動作はウェブアプリでは可能ではありません。 このようなネイティブアプリでよくあるアプローチの1つは、localhost でウェブサーバーを起動し、ウェブアプリからはそのサーバーに XMLHTTPRequest (XHR) または WebSocket でリクエストを送るという方法です。 ほとんどのウェブアプリは常に HTTPS を使用します。つまり、ブラウザーはセキュアではない URL に XHR や WebSocket のリクエストを送ることを禁止します。 このようなリクエストのブロックを、混合コンテンツブロック (Mixed Content Blocking) と呼びます。 ウェブアプリと通信できるようにするには、ネイティブアプリがセキュアなウェブサーバーを提供する必要があります。

幸い、モダンなウェブブラウザは `http://127.0.0.1:8000/` を [「潜在的に信頼することができる」][secure-contexts]URL であると[見做してくれます][mcb-localhost]。この URL はループバックアドレスを指すためです。 `127.0.0.1` に送られたトラフィックは、マシンの外部に送られないことが保証されているため、ネットワークの傍受に対して安全であることが自明だとみなされます。 つまり、ウェブアプリが HTTPS を使い、ネイティブアプリのウェブサービスが `127.0.0.1` でウェブサービスを提供する場合、XHR による2者間の通信はめでたく成功するということです。 残念ながら、[localhost という名前は、まだ同じようには扱われません][let-localhost]。 また、WebSocket にはいずれの名前に対しても同様の扱いはありません。

この制限を回避するために、グローバルの DNS に `127.0.0.1` に解決するドメイン名 (たとえば、`localhost.example.com`) をセットアップして、そのドメイン名に対する証明書を取得し、その証明書を対応する秘密鍵と一緒にネイティブアプリに含めて配布したあと、ウェブアプリが `http://127.0.0.1:8000/` の代わりに `https://localhost.example.com:8000/` と通信するように設定しようとするかもしれません。 *このようなことは絶対にしてはいけません。*ユーザーをリスクに晒すことになるため、署名書が取り消される可能性があります。

IP アドレスの代わりにドメイン名を導入してしまうと、攻撃者が DNS ルックアップに対して中間者攻撃 (Man in the Middle; MitM) して、別の IP アドレスを指すレスポンスを挿入することを可能にしてしまいます。 攻撃者はローカルアプリのふりをして、偽のレスポンスをウェブアプリに送り返すことができます。これにより、実装の仕方によっては、ウェブアプリ側のあなたのアカウントが偽装されることもあります。

このような場合、アプリが正しく動作するためには証明書の秘密鍵をネイティブアプリ内に同梱することが不可欠であるため、中間者攻撃が成功する可能性があります。 つまり、ネイティブアプリをダウンロードすれば、攻撃者を含む誰もが秘密鍵のコピーを取得できてしまうからです。 これは秘密鍵が流出している状況と見做せるため、認証局 (CA) がこのことを検出した場合には、証明書を無効化する必要があります。 [多くのネイティブアプリ][mdsp1]で、[秘密鍵を含めて配布したこと][mdsp3]が原因で[アプリの証明書][mdsp2]が無効化されています。

残念ながら、この方法では、多くの優れたセキュアなオプションなしでネイティブアプリが対応するウェブサイトと通信することになってしまします。 ブラウザがさらに[ウェブから localhost へのアクセス制限を強化][tighten-access]した場合、将来の状況はさらに面倒になる可能性があります。

また、特権を持つネイティブの API を提供するウェブサービスを公開することも本質的にリスクがあることにも注意が必要です。権限を与えるつもりのないウェブサイトからのアクセスを許してしまう可能性があるからです。 それでもこの方法を使いたい場合は、[Cross-Origin Resource Sharing][cors] を熟読して、Access-Control-Allow-Origin を利用し、メモリセーフな HTTP パーサーを使用してください。アクセスを許可していないオリジンからでも preflight request を送信することが可能でああるため、パーサーのバグを悪用できてしまう可能性があるからです。

# 自分の証明書を作成して信頼する

CA の助けを借りなくても、誰でも自分の証明書を作ることができます。 唯一の違いは、自分で作った証明書は、他の誰からも信頼されないということです。 それでも、ローカルの開発の場合は十分です。

localhost の秘密鍵と自己署名証明書を生成する最も簡単な方法は、次のような openssl のコマンドを実行することです。

    openssl req -x509 -out localhost.crt -keyout localhost.key \
      -newkey rsa:2048 -nodes -sha256 \
      -subj '/CN=localhost' -extensions EXT -config <( \
       printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

その後、localhost.crt と localhost.key を使ってローカルのウェブサーバーを設定し、localhost.crt をローカルのトラストルートのリストにインストールできます。

開発用の証明書をより現実的に管理したい場合、[minica][minica] を使うことができます。minica を使うと、ローカルのルート証明書を生成して、end-entity (または leaf) 証明書をそのルート証明書で署名することができます。 そして、自己署名の end-entity 証明書ではなく、ルート証明書をインポートします。

`127.0.0.1` へのエイリアスとして /etc/hosts を追加すれば、`www.localhost` のようなドットを含むドメインを使うこともできます。 この方法を採用した場合、ブラウザの cookie storage の扱い方が微妙に変わります。

[mcb-localhost]: https://bugs.chromium.org/p/chromium/issues/detail?id=607878
[secure-contexts]: https://www.w3.org/TR/secure-contexts/#is-origin-trustworthy
[let-localhost]: https://tools.ietf.org/html/draft-ietf-dnsop-let-localhost-be-localhost-02
[mdsp1]: https://groups.google.com/d/msg/mozilla.dev.security.policy/eV89JXcsBC0/wsj5zpbbAQAJ
[mdsp2]: https://groups.google.com/d/msg/mozilla.dev.security.policy/T6emeoE-lCU/-k-A2dEdAQAJ
[mdsp3]: https://groups.google.com/d/msg/mozilla.dev.security.policy/pk039T_wPrI/tGnFDFTnCQAJ
[tighten-access]: https://bugs.chromium.org/p/chromium/issues/detail?id=378566
[minica]: https://github.com/jsha/minica
[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
