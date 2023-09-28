---
title: "GoDaddy ホスティングでの Let's Encrypt 証明書"
slug: godaddy
top_graphic: 1
date: 2019-12-02
lastmod: 2019-12-02
show_lastmod: 1
---


私たちは GoDaddy で Let's Encrypt を取得する方法についてたくさんの質問を受けてきました。 GoDaddy でウェブホスティングを共有している場合、現在は Let's Encrypt 証明書を手動でインストールするのは非常に難しい状態であるため、GoDaddy では Let's Encrypt を使用するのをおすすめしません。 これは、GoDaddy が証明書発行と更新のための[ ACME プロトコル](https://tools.ietf.org/html/rfc8555)をサポートしないためです。 代わりに、GoDaddy は自動更新する証明書を提供していますが、[有料機能](https://www.godaddy.com/web-security/ssl-certificate)です。

ACME プロトコルを直接実装していないホスティングプロバイダでは、完全な自動更新が行えないため、Let's Encrypt 証明書を利用することをおすすめしません。 私たちは証明書の使用において自動更新を非常に重要な機能だと考えています。 ソフトウェアを使って自動更新をすれば、新しい証明書と置き換える前に証明書が期限切れになる可能性を大きく減らすことができます。 もし証明書の期限が切れてしまうと、あなたのサイトにアクセスできなくなるため、ユーザーに多大ないらだちを与えてしまいます。

私たちは自動更新の有効性を確信しているため、Let's Encrypt 証明書を ACME による自動化で使用できるように設計しています。 Let's Encrypt 証明書は、60日後に自動的に更新されるようになっており、更新されなかった場合は90日後に自動的に無効化されます。

上記の問題を理解した上で、GoDaddy ホスティングで Let's Encrypt 証明書を使用したい場合は、[GoDaddy が提供している作業手順](https://www.godaddy.com/help/install-a-lets-encrypt-certificate-on-your-cpanel-hosting-account-28023)を参照してください。 この設定作業は時間がかかる上、60日ごとに同じ作業をしなければなりません (上のリンク先のページに書かれている90日ごとではありません)。
