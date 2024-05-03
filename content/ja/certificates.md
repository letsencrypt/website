---
title: Chain of Trust
linkTitle: Chain of Trust (ルートおよび中間証明書)
slug: certificates
lastmod: 2021-10-02
show_lastmod: 1
---


[![2020年12月現在の ISRG の証明書の階層図](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

# ルート証明書

私たちのルートは安全にオフラインで保管されています。 私たちは次のセクションにある中間CAからサブスクライバに対してエンドエンティティ証明書を発行します。 新しいルートX2を様々なルートプログラムに送信する際に互換性を得るため、私たちはルートX1からクロス署名しました。

* 有効
  * ISRG Root X1 (`RSA 4096, O = Internet Security Research Group, CN = ISRG Root X1`)
    * [自己署名](https://crt.sh/?id=9314791): [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
    * [DST Root CA X3のクロス署名](https://crt.sh/?id=3958242236): [der](/certs/isrg-root-x1-cross-signed.der), [pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1-cross-signed.txt)
* 有効、利用制限あり
  * ISRG Root X2 (`ECDSA P-384, O = Internet Security Research Group, CN = ISRG Root X2`)
    * [自己署名](https://crt.sh/?id=3335562555): [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
    * [ISRG Root X1のクロス署名](https://crt.sh/?id=3334561878): [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)

Let's Encrypt のルート証明書とチェーンでつながっている証明書をテストするためのウェブサイトを用意しています。

* ISRG Root X1
  * [有効](https://valid-isrgrootx1.letsencrypt.org/)
  * [失効済み](https://revoked-isrgrootx1.letsencrypt.org/)
  * [期限切れ](https://expired-isrgrootx1.letsencrypt.org/)
* ISRG Root X2
  * [有効](https://valid-isrgrootx2.letsencrypt.org/)
  * [失効済み](https://revoked-isrgrootx2.letsencrypt.org/)
  * [期限切れ](https://expired-isrgrootx2.letsencrypt.org/)

# 中間証明書

通常の状況では、Let's Encrypt が発行した証明書はRSA 中間認証局の「R3」から来ます。 現在、ECDSA中間CAであるE1からの発行は、[許可されたアカウント](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679)へのECDSAサブスクライバ鍵のみ可能です。 将来的には誰でも「E1」からの発行が利用可能になります。

私たちの他の中間証明書(「R4」と「E2」) は災害復旧に備えて予約されており、プライマリの中間証明書から発行する能力を失った場合にのみ使用されます。 X1, X2, X3, X4の中間証明書はもはや使用されることはありません。

IdenTrust には、追加の互換性のためにクロス署名された Let's Encrypt の RSA 中間証明書があります。

* 有効
  * Let's Encrypt R3 (`RSA 2048, O = Let's Encrypt, CN = R3`)
    * [ISRG Root X1 に署名されたもの](https://crt.sh/?id=3334561879): [der](/certs/lets-encrypt-r3.der), [pem](/certs/lets-encrypt-r3.pem), [txt](/certs/lets-encrypt-r3.txt)
    * [IdenTrust にクロス署名されたもの](https://crt.sh/?id=3479778542): [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt) (Retired)
* 有効、利用制限あり
  * Let's Encrypt E1 (`ECDSA P-384, O = Let's Encrypt, CN = E1`)
    * [ISRG Root X2 に署名されたもの](https://crt.sh/?id=3334671964): [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem), [txt](/certs/lets-encrypt-e1.txt)
* バックアップ
  * Let's Encrypt R4 (`RSA 2048, O = Let's Encrypt, CN = R4`)
    * [Signed by ISRG Root X1](https://crt.sh/?id=3334561877): [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
    * [IdenTrust にクロス署名されたもの](https://crt.sh/?id=3479778543): [der](/certs/lets-encrypt-r4-cross-signed.der), [pem](/certs/lets-encrypt-r4-cross-signed.pem), [txt](/certs/lets-encrypt-r4-cross-signed.txt) (Retired)
  * Let's Encrypt E2 (`ECDSA P-384, O = Let's Encrypt, CN = E2`)
    * [ISRG Root X2 に署名されたもの](https://crt.sh/?id=3334671963): [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)
* 廃止済み
  * Let's Encrypt Authority X1 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X1`)
    * [ISRG Root X1 に署名されたもの](https://crt.sh/?id=9314792): [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
    * [IdenTrustがクロス署名したもの](https://crt.sh/?id=10235198): [der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
  * Let's Encrypt Authority X2 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X2`)
    * [ISRG Root X1 に署名されたもの](https://crt.sh/?id=12721505): [der](/certs/letsencryptauthorityx2.der), [pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
    * [IdenTrustがクロス署名したもの](https://crt.sh/?id=10970235): [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)
  * Let's Encrypt Authority X3 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X3`)
    * [ISRG Root X1 に署名されたもの](https://crt.sh/?id=47997543): [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
    * [IdenTrustがクロス署名したもの](https://crt.sh/?id=15706126): [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
  * Let's Encrypt Authority X4 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X4`)
    * [ISRG Root X1 に署名されたもの](https://crt.sh/?id=47997546): [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
    * [IdenTrustがクロス署名したもの](https://crt.sh/?id=15710291): [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)

# クロス署名

## 中間証明書

Let's Encrypt の中間証明書は、単一の公開鍵と秘密鍵のキーペアを表します。 キーペアの秘密鍵はすべてのエンド・エンティティ証明書 (つまり、Let's Encrypt があなたのサーバーで使用するために発行する証明書) の署名を生成します (リーフ証明書としても知られます)。

Let's Encrypt の RSA 中間証明書は、ISRG Root X1 で署名されています。 現在、ISRG Root X1 はさまざまな環境で信頼されていますが、クライアントの互換性を追加するために、RSA 中間証明書はまだ IdenTrust の「[DST Root CA X3](https://crt.sh/?id=8395)」(現在は「TrustID X3 Root」と呼ばれています) でクロス署名されています。 IdenTrust のルート証明書は長い間幅広く使用されていたため、古いデバイスやオペレーティングシステム (例: Windows XP、Android 7) との互換性が高くなっています。 [IdenTrustから"TrustID X3 Root" をダウンロード](https://www.identrust.com/support/downloads)できます。 (または[Let's Encryptからもダウンロード](/certs/trustid-x3-root.pem.txt)できます)。

クロス署名をすることは、Let's EncryptのどのRSA中間証明書も同一の署名鍵を表す2つの証明書を持っていることを意味します。 1つは、 DST Root CA X3 により署名された証明書で、もう1つは、ISRG Root X1 により署名された証明書です。 両者を区別する最も簡単な方法は、発行者のフィールドを確認することです。

ウェブサーバーを設定するとき、管理者は、エンド・エンティティ証明書だけでなく、中間証明書のリストも設定します。これは、エンド・エンティティ証明書が信頼できるルートまで辿れるトラストチェーンを持っていることをブラウザが検証するのを助けるためです。 ほぼ全ての管理者は主体者「R3」で発行者「ISRG Root X1」の中間証明書を含むチェインを選択するでしょう。 推奨されるLet's Encryptのクライアントソフトウェアである[Certbot](https://certbot.org)はこの設定をシームレスに行います。

## ルート証明書
中間証明書と同様に、ルート証明書はクロス署名することでクライアントの互換性を高められます。 Let's EncryptのECDSA階層のルート証明書であるISRG Root X2は2020年秋に生成されました。 これは2つの証明書によって表されています。1つは自己署名であり、もう一つはISRG Root X1の署名です。

ECDSA中間証明書「E1」が署名した全ての証明書は、主体者「ISRG Root X2」で発行者「ISRG Root X1」である中間証明書を含むチェーンと共に提供される。 ほぼ全ての管理者はISRG ROOT X2が広く信頼されるまで最も互換性の高いこのチェーンを選択するでしょう。

# OCSP で署名された証明書

この証明書は、Let's Encrypt 認証局の中間証明書に対する OCSP のレスポンスの署名に使われます。そのため、レスポンスに署名するためにルートキーをオンラインにする必要はありません。 この証明書のコピーは、自動的に OCSP のレスポンスに含まれるため、これに関して Let's Encrypt の利用者がするべきことは何もありません。 情報提供の目的でルートキーをここに示します。

* ISRG Root OCSP X1 ([Signed by ISRG Root X1](https://crt.sh/?id=2929281974)): [der](/certs/isrg-root-ocsp-x1.der), [pem](/certs/isrg-root-ocsp-x1.pem), [txt](/certs/isrg-root-ocsp-x1.txt)

Let's Encryptの新しい中間証明書はOCSPのURLを持っておらず、失効情報はCRLから提供されます。そのためISRG ROOT X2からのOCSP署名証明書は発行しません。

# 証明書の透明性

私たちは、Let's Encrypt の運営と発行した証明書の透明性を非常に重視しています。 私たちは、証明書を発行するたびに、すべての証明書を  [Certificate Transparency logs](https://www.certificate-transparency.or)  に記録しています。 以下のリンクから、Let's Encrypt が発行したすべての証明書を確認することができます。

* [Issued by Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Issued by Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)
* [Issued by E1](https://crt.sh/?Identity=%25&iCAID=183283)
* [Issued by R3](https://crt.sh/?Identity=%25&iCAID=183267)
