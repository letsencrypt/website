---
title: Chain of Trust
linkTitle: Chain of Trust (ルートおよび中間証明書)
slug: certificates
top_graphic: 5
lastmod: 2019-10-18
---

# ルート証明書

Let's Encrypt のルート証明書はオフラインで安全に保管されています。Let's Encrypt は、次のセクションにある中間証明書から、サブスクライバに対してエンド・エンティティ証明書を発行します。

* 有効
  * [ISRG Root X1 (self-signed)](/certs/isrgrootx1.pem.txt)

Let's Encrypt のルート証明書とチェーンでつながっている証明書をテストするためのウェブサイトを用意しています。

* ISRG Root X1 の有効な証明書
  * [https://valid-isrgrootx1.letsencrypt.org/](https://valid-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 の無効化した証明書
  * [https://revoked-isrgrootx1.letsencrypt.org/](https://revoked-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 の期限切れの証明書
  * [https://expired-isrgrootx1.letsencrypt.org/](https://expired-isrgrootx1.letsencrypt.org/)

# 中間証明書

IdenTrust には、クロス署名された Let's Encrypt の中間証明書があります。これにより、Let's Encrypt が自分自身のルート証明書を配布しながらも、Let's Encrypt の終端の証明書がすべての主要なブラウザで受け入れられるようになっています。

通常は、Let's Encrypt が発行した証明書は「Let’s Encrypt Authority X3」から来ます。もう一つの中間証明書「Let’s Encrypt Authority X4」は、緊急時の回復用に予約されているものであり、「Let’s Encrypt Authority X3」の発行が不可能になった場合にのみ使用されます。X1 と X2 の中間証明書は第1世代の中間証明書でした。これらは、Windows XP でも互換性のある X3 の証明書と置き換えられました。

* 有効
  * [Let's Encrypt Authority X3 (IdenTrust cross-signed)](/certs/lets-encrypt-x3-cross-signed.pem.txt)
    * [Let's Encrypt Authority X3 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx3.pem.txt)
* バックアップ
  * [Let's Encrypt Authority X4 (IdenTrust cross-signed)](/certs/lets-encrypt-x4-cross-signed.pem.txt)
    * [Let's Encrypt Authority X4 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx4.pem.txt)
* 廃止済み
  * [Let's Encrypt Authority X2 (IdenTrust cross-signed)](/certs/lets-encrypt-x2-cross-signed.pem.txt)
    * [Let's Encrypt Authority X2 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx2.pem.txt)
  * [Let's Encrypt Authority X1 (IdenTrust cross-signed)](/certs/lets-encrypt-x1-cross-signed.pem.txt)
    * [Let's Encrypt Authority X1 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx1.pem.txt)

# クロス署名

私たちの証明書「Let’s Encrypt Authority X3」は、1組の秘密鍵/公開鍵のキーペアからなります。キーペアの秘密鍵はすべてのエンド・エンティティ証明書 (つまり、Let's Encrypt があなたのサーバーで使用するために発行する証明書) の署名を生成します (リーフ証明書としても知られます)。

Let's Encrypt の中間証明書は、ISRG Root X1 で署名されています。しかし、Let's Encrypt は非常に新しい認証局であるため、ISRG Root X1 はまだほとんどブラウザで信頼されていません。すぐに広く信頼された証明書として利用できるようにするため、Let's Encrypt の中間証明書は、ルート証明書がすべての主要なブラウザですでに信頼されている別の認証局 IdenTrust によるクロス署名も行われています。特に、IdenTrust は Let's Encrypt の中間証明書を「DST Root CA X3」(現在は「TrustID X3 Root」と呼ばれています) を使ってクロス署名しています。[identrust.com の「TrustID X3 Root」](https://www.identrust.com/support/downloads)からダウンロードできます。(または、代わりにここからもダウンロードできます。[.pem](/certs/trustid-x3-root.pem.txt), [.p7b](/certs/trustid-x3-root.p7b))

つまり、ともに Let's Encrypt の中間証明書を表す2つの証明書が存在します。1つは、 DST Root CA X3 により署名された証明書で、もう1つは、ISRG Root X1 により署名された証明書です。両者を区別する最も簡単な方法は、発行者のフィールドを確認することです。

ウェブサーバーを設定するとき、管理者は、エンド・エンティティ証明書だけでなく、中間証明書のリストも設定します。これは、エンド・エンティティ証明書が信頼できるルートまで辿れるトラストチェーンを持っていることをブラウザが検証するのを助けるためです。ほとんどすべてのサーバー管理者は、サブジェクト名が「Let’s Encrypt Authority X3」で、発行者が「DST Root CA X3」である中間証明書を含むチェーンを選んで配信します。Let's Encrypt がおすすめするクライアントソフトウェア [Certbot](https://certbot.org) では、この設定はシームレスに行われます。

次の図は、Let's Encrypt の証明書の関係を視覚的に説明したものです。

<img src="/certs/isrg-keys.png" alt="ISRG のキーの関係図">

# OCSP で署名された証明書

この証明書は、Let's Encrypt 認証局の中間証明書に対する OCSP のレスポンスの署名に使われます。そのため、レスポンスに署名するためにルートキーをオンラインにする必要はありません。この証明書のコピーは、自動的に OCSP のレスポンスに含まれるため、これに関して Let's Encrypt の利用者がするべきことは何もありません。情報提供の目的でルートキーをここに示します。

* [ISRG Root OCSP X1 (ISRG Root X1 で署名したもの)](/certs/isrg-root-ocsp-x1.pem.txt)

# 証明書の透明性

私たちは、Let's Encrypt の運営と発行した証明書の透明性を非常に重視しています。私たちは、証明書を発行するたびに、すべての証明書を [Certificate Transparency
logs](https://www.certificate-transparency.org/) に記録しています。以下のリンクから、Let's Encrypt が発行したすべての証明書を確認することができます。

* [Issued by Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Issued by Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)

# さらなる情報

ISRG root CA と Let's Encrypt 中間認証局の秘密鍵は、ハードウェア・セキュリティ・モジュール (HSM) に保存されており、鍵が盗難されないように厳重に保管されています。

すべての ISRG キーは、現在は RSA の鍵を使用しています。私たちは、[ECDSA の鍵を生成すること]({{< ref "/upcoming-features.md" >}})を計画しています。
