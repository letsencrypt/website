---
title: DST Root CA X3 の失効 (2021年9月)
slug: dst-root-ca-x3-expiration-september-2021
top_graphic: 1
lastmod: 2021-05-07
menu:
  main:
    weight: 30
    parent: about
show_lastmod: 1
---


2021年9月30日に、古いブラウザとデバイスが Let's Encrypt の証明書を信頼する方法に若干の変更が加えられます。 一般的なウェブサイトを運営している場合、違いには気付かないはずです。大多数の訪問者は Let's Encrypt の証明書をそのまま受け入れます。 もし API を提供している場合や、IoT デバイスをサポートする必要がある場合は、この変更にもう少し注意を払う必要があります。

Let's Encrypt には、[ISRG Root X1][] という名前の「[ルート証明書][]」が存在します。 最新のブラウザーやデバイスは、あなたのウェブサイトにインストールされた Let's Encrypt 証明書を信頼できます。ブラウザ内のルート証明書のリストに ISRG Root X1 が含まれているためです。 Let's Encrypt が発行した証明書が古いデバイスに信頼されることを保証するために、 古いルート証明書 DST Root CA X3 からの 「クロス署名 (cross-signature)」もあります。

Let's Encrypt の初期には、古いルート証明書 (DST Root CA X3) のおかげで、開始からすぐにほとんどすべてのデバイスから信頼されるのに役立ちました。 新しいルート証明書 (ISRG Root X1) は、現在では幅広く信頼されていますが、一部の古いデバイス (たとえば、iPhone 4 や HTC Dream など) にはソフトウェアアップデートをもう受け取らないため、ルート証明書を決して信頼しません。 [ISRG Root X1 を信頼するプラットフォームの一覧はこちら][compatibility]です。

DST Root CA X3 は2021年9月30日に失効します。 つまり、ISRG Root X1 を信頼しない古いデバイスが Let's Encrypt 証明書を使用しているサイトを訪れると、証明書の警告が表示され始めることになります。 重要な例外が1つあります。ISRG Root X1 を信頼しない古い Android デバイスでは、引き続き Let's Encrypt が動作するということです。これは、ルートの有効期限を延長する [DST Root CA X3 からの特別なクロス署名のおかげ][cross-sign]です。 この例外は Android でのみ動作します。

あなたは何をすべきですか？ ほとんどの人は何もする必要はありません！ Let's Encrypt は証明書の発行を設定しており、あなたのウェブサイトはほとんどの場合、幅広い互換性を優先し、正しいことを行います。 もし API を提供している場合や、IoT デバイスをサポートする必要がある場合は、次の2つのことを行う必要があります。(1) API のすべてのクライアントが ISRG Root X1 (DST Root CA X3 ではありません) を信頼することを保証する。(2) API のクライアントが OpenSSL を使用している場合、[バージョン 1.1.0 以上のを使用することを要求する][openssl]。 OpenSSL 1.0.x では証明書の検証に癖があるため、Let's Encrypt がデフォルトで推奨している Android 互換の証明書チェーンを提示した場合に、ISRGルート X1 を信頼するクライアントでさえ失敗してしまいます。

現在進行中の本番のチェーンの変更に関する追加情報については、 [Let's Encrypt コミュニティのこのスレッド][production]をチェックしてください。

今後の有効期限について質問がある場合は、[Let's Encrypt のフォーラムのこのスレッド][forum]に投稿してください。

[ルート証明書]: /docs/glossary/#def-root
[ISRG Root X1]: /certificates/
[cross-sign]: /2020/12/21/extending-android-compatibility.html
[openssl]: https://community.letsencrypt.org/t/openssl-client-compatibility-changes-for-let-s-encrypt-certificates/143816
[forum]: https://community.letsencrypt.org/t/help-thread-for-dst-root-ca-x3-expiration-september-2021/149190
[compatibility]: /docs/cert-compat/
[production]: https://community.letsencrypt.org/t/production-chain-changes/150739
