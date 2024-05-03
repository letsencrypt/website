---
title: ASN.1 と DER へようこそ
slug: a-warm-welcome-to-asn1-and-der
date: 2020-04-23
lastmod: 2021-03-21
---

このドキュメントでは、HTTPS で使用される証明書を定義するデータ構造とフォーマットを簡単に紹介します。 コンピュータ科学の多少の経験と証明書の知識がある人なら誰でも理解できるはずです。

HTTPS 証明書は、他のファイルと同様に、ファイルの一種です。 ファイルの内容は、[RFC 5280](https://tools.ietf.org/html/rfc5280) で定義されたフォーマットに従います。 定義は、ファイルフォーマットあるいは (同等の) データ構造を定義する ために使用される言語 ASN.1 で表されます。 たとえば、もし C 言語なら、次のように書くことができます。

```c
struct point {
  int x, y;
  char label[10];
};
```

Go 言語の場合は次のようになります。

```go
type point struct {
  x, y int
  label string
}
```

ASN.1 では、これを次のように記述します。

```asn1
Point ::= SEQUENCE {
  x INTEGER,
  y INTEGER,
  label UTF8String
}
```

Go や C の代わりに ASN.1 で定義を書くことの利点は、言語に依存しないことです。 ASN.1 で定義した Point は、様々な言語で実装することができます。あるいは（できれば）ASN.1 定義から、好みの言語に実装するコードを自動生成するツールを利用する事もできます。 ASN.1 定義のセットは、「[モジュール](https://www.obj-sys.com/asn1tutorial/node6.html)」と呼ばれます。

ASN.1 のその他の重要な点として多様なシリアライゼーション形式、-- 例えばメモリ内のデータ構造を連続したバイト（またはファイル）に変換するまたは、再び元に戻す方法があることが上げられます。 これはあるマシンで生成された証明書を、たとえ CPU やオペレーティングシステムが違っても異なるマシンで読み込むことを可能にします。

ASN.1 と[同じ事ができる言語](https://en.wikipedia.org/wiki/Interface_description_language)はいくつかあります。 例えば ProtocolBuffer は、型定義のための[言語](https://developers.google.com/protocol-buffers/docs/proto3)と定義済みの型をエンコードするための[シリアライゼーション形式](https://developers.google.com/protocol-buffers/docs/encoding)の両方を提供します。 [ Thrift ](https://thrift.apache.org/)もまた、言語とシリアライゼーション形式を提供します。 ProtocolBuffer または Thrift は、HTTPS 証明書のフォーマットを定義するために容易に使用できましたが、ASN.1 (1984)は、証明書(1988)と HTTPS (1994)が発明されたときにすでに存在していたという大きな利点を持っていました。

ASN.1 は長年にわたり何度も改訂され、その版は一般的に発行された年で識別されます。 このドキュメントは、RFC 5280 とその他の HTTPS 証明書に関連する規格を明確に理解するに十分な ASN.1 を教える事を目標としています。 そこで、1988年版を中心に説明しつつ、その後の版で追加された機能についていくつか言及します。 色々な版を ITU からダウンロードすることができますが、いくつかは ITU のメンバーのみ許可されていることを申し添えます。 関連する規格は、[ X.680 ](https://www.itu.int/rec/T-REC-X.680) ( ASN.1 言語の定義) と[ X.690 ](https://www.itu.int/rec/T-REC-X.690) ( DER 形式と BER 形式のシリアライゼーションの定義)です。 それらの規格の初期のものはそれぞれ[ X.208 ](https://www.itu.int/rec/T-REC-X.208/en)と[ X.209 ](https://www.itu.int/rec/T-REC-X.209/en)です。

ASN.1 の中心となるシリアライゼーション形式は「Distinguished EncodingRules」 DER です。 DER は、「Basic Encoding Rules」 BER の一種で正規化が追加されたものです。 例えば、もし型に SET OF を含む時、SET OF の要素は DER のシリアライゼーション形式にするためにソートされる必要があります。

DER 形式でエンコードされた証明書は、しばしば更に PEM 形式でエンコードされます。PEM 形式は、[ base64 ](https://en.wikipedia.org/wiki/Base64)のアルゴリズムを使い任意のバイト配列をアルファベットの文字列と '+' と '/' にエンコードし、("\-\-\-\--BEGIN CERTIFICATE\-\-\-\--" と "\-\-\-\--END CERTIFICATE\-\-\-\--") からなるセパレータを追加します。 PEM 形式は簡単にコピー&ペーストできるので有用です。

このドキュメントは、まず ASN.1 を使った型と記法について説明をし、その後 ASN.1 で定義されたオブジェクトがどのようにエンコードされるかを説明します 特に ASN.1 言語のいくつかの機能は直接的にエンコーディングの詳細を指し示しているので、気軽に章の間を前後して読んでください。 このドキュメントではよりなじみのある言葉をつかうことを好みます。 したがって、オクテットの代わりにバイトを使い、コンテンツのかわりに値を使います。またシリアライゼーションとエンコーディングは同じ意味として使います。

型
=========

INTEGER
-------

おなじみの INTEGER です。 正負両方の範囲をとり得ます。 ASN.1 の INTEGER が変わっているのは、任意の大きさをとりうる事です。 Int64 では大きさが足りませんか？ 問題ありません これは、RSA の modulus のような、 2<sup>2048</sup> のような int64 よりもずっと大きいものを表現するときに特に便利です。 技術的には DER 形式の場合 INTEGER には最大値がありますが、それは非常に大きい値です。DER の長さフィールドは、最大で連続した 126 バイトの長さまで表現できます。 したがって INTEGER の最大値は 256<sup>(2\*\*1008)</sup>-1 まで表現できます。 真に無限の INTEGER を表現したい場合、BER 形式でエンコードする必要がありますが、無限長のフィールドが表現できます。

String
-------

ASN.1 は、色々な文字列型を持ちます。BMPString、GeneralString、GraphicString、IA5String、ISO646String、NumericString、PrintableString、TeletexString、T61String、UniversalString、UTF8String、VideotexString、そして VisibleString です。 HTTPS 証明書では、PrintableString、UTF8String と [IA5String](https://en.wikipedia.org/wiki/IA5STRING) に注意を払う必要があります。 与えられたフィールドの文字列型は、フィールドを定義する ASN.1 モジュールによって定義されます。 [例えば](https://tools.ietf.org/html/rfc5280#page-127)

```
CPSuri ::= IA5String
```

PrintableString は、ASCII の制限された部分集合です。英数字とスペースそして特定のいくつかの記号、 `' () + , - . / : = ?`を含みます。 注目すべきは、 `*` または `@` が含まれないことです。 より制限された文字列型に対して容量の利点はありません。

いくつかのフィールドは、例えば[ RFC 5280の DirectoryString ](https://tools.ietf.org/html/rfc5280#page-20)ですが、シリアライゼーションコードをいくつかの文字列型から選択可能です。 DER 形式でのエンコードはあなたの利用する文字の型を含むため、あなたが何かの文字列を PrintableString でエンコードするときは、それが本当に[ PrintableString の要件](https://community.letsencrypt.org/t/2018-03-12-wildcard-certificate-encoding-issue/55485)を満たしているか確認してください。

[ International Alphabet No.5 ](https://en.wikipedia.org/wiki/T.50_(standard))に基づく IA5String は、より寛容です。ほとんど全ての ASCII 文字を許容し、証明書の中の email address、DNS name、URL に使用されます。 いくつかのバイトの値の意味が、IA5 と US-ASCII で異なるものがあることに注意して下さい。

TeletexString、BMPString と UniversalString は、HTTPS 証明書では利用が廃止されています。ですが古い CA 証明書を解析するときに出会う可能性があります。これらは有効期間がながく、廃止以前に発行されたものの可能性があります。

ASN.1 の文字列は、C や C++ 同様にヌル終端ではありません。 実際、埋め込みのヌルバイトを持っていても規格上完全に問題ありません。 これは、二つのシステムが同じ ASN.1 文字を異なる解釈をしたときに脆弱性の原因となります。 例えば、いくつかの CA は[だまされて](https://www.theregister.co.uk/2009/07/30/universal_ssl_certificate/)、evil.com の所有権に基づき、「example.com\0.evil.com」を発行する可能性がありました。 当時の証明書検証ライブラリは、その検証結果を「example.com」に対して有効として取り扱っていました。 C と C++ での ASN.1 文字列の取り扱いについては、脆弱性を避けるため十分注意してください。

Date と Time
---------------

UTCTime、GeneralizedTime、DATE、TIME-OF-DAY、DATE-TIME、DURATION など多くの時刻型があります。 HTTPS 証明書の場合は、UTCTime と GeneralizedTime についてのみ注意しなければなりません。

UTCTime は日付と時刻を YYMMDDhhmm[ss] で表します。オプションのタイムゾーンオフセットまたは Zulu (UTC またはゼロタイムゾーンオフセット) を表す「Z」があります。 例えば、UTCTimes 820102120000Z と 820102070000-0500 はどちらも同じ時刻を表します。1982年1月2日の午前7時 (UTC-5) と午後12時 (UTC) です。

UTCTime は 1900年代か 2000年代かが曖昧であるため、RFC 5280 は 1950年から 2050年までの日付を表すことを[明確](https://tools.ietf.org/html/rfc5280#section-4.1.2.5.1)にしています。 RFC 5280はまた、「Z」タイムゾーンを使用し、秒を含まなければならないことを要求しています。

GeneralizedTime は、4桁の数字で年を表す単純な方法で 2050年以降の日付をサポートしています。 また、小数点以下の秒も許可しています (奇妙なことに、コンマまたはピリオドのいずれかを小数点として使用しています) 。 RFC 5280は小数点以下の秒を禁止し、「Z」タイムゾーンを要求しています。

OBJECT IDENTIFIER
-----------------

Object Identifier (オブジェクト識別子) は、整数のシーケンスで構成される世界的に一意な階層識別子です。 これらはあらゆる種類の「もの」を指しますが、一般的には、標準、アルゴリズム、証明書拡張、組織、またはポリシー文書を識別するために使用されます。 例えば、[1.2.840.113549](http://oid-info.com/get/1.2.840.113549)は RSA Security LLC を識別します。 RSA は、[RFC 8017](https://tools.ietf.org/html/rfc8017#page-69)で定義されている sha256WithRSAEncryption を識別する [1.2.840.113549.1.1.11](1.2.840.113549.1.1.11)のように、そのプレフィックスから始まる OID を割り当てることができます。

同様に、[1.3.6.1.4.1.11129](http://oid-info.com/get/1.3.6.1.4.1.11129)は Google,Inc. を識別します。Google は、[RFC 6962](https://tools.ietf.org/html/rfc6962)で定義されているように、証明書の透過性 ( Google で最初に開発された) で使用される[ SCT リスト拡張](https://letsencrypt.org/2018/04/04/sct-encoding.html)を識別するために[1.3.6.1.4.1.11129.2.4.2](http://oid-info.com/get/1.3.6.1.4.1.11129.2.4.2)を割り当てました。

指定されたプレフィックスの下に存在できる子 OID のセットは「 OID アーク」と呼ばれます。 短い OID の表現はより小さいので、短いアークの下での OID 割当ては、特にその OID が大量に送信されるフォーマットに対して、より価値があると考えられます。 OID アーク[2.5](http://oid-info.com/get/2.5)は、HTTPS 証明書のベースとなる X.509 を含む一連の仕様である「ディレクトリサービス」に割り当てられます。 証明書の多くのフィールドは、この便利な短いアークで始まります。 例えば、[2.5.4.6](http://oid-info.com/get/2.5.4.6)は「 countryName 」を意味し、[2.5.4.10](http://oid-info.com/get/2.5.4.10)は「 organizationName 」を意味します。 ほとんどの証明書は、これらの OID のそれぞれを少なくとも1回はエンコードしなければならないので、それらが短いことは便利です。

仕様に記載された OID は、一般に、便宜上人間が読むことのできる名前で表され、別の OID との連結によって指定される場合があります。 [例えば RFC 8017では](https://tools.ietf.org/html/rfc8017#page-68)

```asn1
   pkcs-1    OBJECT IDENTIFIER ::= {
       iso(1) member-body(2) us(840) rsadsi(113549) pkcs(1) 1
   }
   ...

   sha256WithRSAEncryption      OBJECT IDENTIFIER ::= { pkcs-1 11 }
```

NULL
----

NULL は NULL ですよね?

SEQUENCE と SEQUENCE OF
------------------------

名前にだまされないようにしてください。これらはまったく異なる2つの型です。 SEQUENCE は、ほとんどのプログラミング言語の「構造体」と同等です。 異なる型のフィールドが一定数保持されます。 例えば、次の[証明書の例](#bit-string-and-octet-string)を参照してください

一方、SEQUENCE OF は、単一の型の任意の数のフィールドを保持します。 これは、プログラミング言語の配列またはリストに類似しています。 [例えば](https://tools.ietf.org/html/rfc5280#page-116)

```asn1
   RDNSequence ::= SEQUENCE OF RelativeDistinguishedName
```

これは特定の順序で、0、1、または7000個の RelativeDistinguishedNames を並べた物になります。

SEQUENCE と SEQUENCE OF には1つの類似性があることがわかります。どちらも同じ方法でエンコードされています。 詳しくは[ SEQUENCE エンコーディング](#sequence-encoding)節を参照してください。

SET と SET OF
--------------

これらは意図的に各構成要素の順番についてのセマンティクスが付加されていないことを除いて SEQUENCE および SEQUENCE OF とほとんど同じです。 ただし、エンコード形式では各構成要素は、ソートする必要があります。 [例えば](https://tools.ietf.org/html/rfc5280#page-116)

```asn1
RelativeDistinguishedName ::=
  SET SIZE (1..MAX) OF AttributeTypeAndValue
```

注意：この例では、SIZE キーワードを使用して RelativeDistinguishedName には少なくとも1つのメンバーが必要であることを追加指定していますが、一般的には SET または SET OF のサイズは、ゼロを許します。

BIT STRING と OCTET STRING
---------------------------

これらには、それぞれ任意のビットまたはバイトが含まれます。 これらは、ナンスやハッシュ関数の出力などの非構造化データを保持するために使用できます。 また、C の void ポインタや Go の空のインタフェース型 (interface{}) のように使用することもできます。構造を持つデータを保持する方法ですが、その構造は型システムとは別に理解または定義されます。 [例えば](https://tools.ietf.org/html/rfc5280#page-116)、証明書の署名は BIT STRING として定義されます。

```
Certificate  ::=  SEQUENCE  {
     tbsCertificate       TBSCertificate,
     signatureAlgorithm   AlgorithmIdentifier,
     signature            BIT STRING  }
```

ASN.1 言語の後のバージョンは、BIT STRING の内容のより[詳細な仕様](https://tools.ietf.org/html/rfc5912#page-99)の指定を可能にします (そして OCTET STRING についても同様です) 。

CHOICE と ANY
--------------

CHOICE は、その定義に列挙されているタイプのうちの1つを正確に含むことができる型です。 [例えば](https://tools.ietf.org/html/rfc5280#page-117)、Time は、UTCTime または GeneralizedTime のうちの1つを正確に含むことができます。

```asn1
Time ::= CHOICE {
     utcTime        UTCTime,
     generalTime    GeneralizedTime }
```

ANY は、値が任意の型であることを示します。 実際には、大抵 ASN.1 文法ではなかなか表現できないものによって制約されます。 [例えば](https://tools.ietf.org/html/rfc5280#page-111)

```asn1
   AttributeTypeAndValue ::= SEQUENCE {
     type     AttributeType,
     value    AttributeValue }

   AttributeType ::= OBJECT IDENTIFIER

   AttributeValue ::= ANY -- DEFINED BY AttributeType
```

これは拡張機能 (extensions) の場合に特に便利です。主となる仕様が公開された後に追加フィールドを別途定義する余地を残したい場合に、新しい型 (オブジェクト識別子) を登録し、その型の定義で新しいフィールドの構造を指定できる方法があります。

ANY は 1988 ASN.1 記法の名残であることに注意してください。 [1994年版](https://www.itu.int/rec/T-REC-X.680-199407-S/en)では、ANY は廃止され、Information Object Classes に置き換えられました。これは、人々が ANY に求めていた拡張動作の種類を指定するための高級で正式な方法です。 この変更は今ではあまりにも古くなっているので、最新の ASN.1 仕様 (2015年版) には ANY は言及されていません。 しかし、1994年版を見ると、切り替えについてのいくつかの議論を見ることができます。 私は古い構文をここに含めています、なぜならそれはまだ RFC 5280が使用しているからです。 [RFC 5912](https://tools.ietf.org/html/rfc5912)は 2002 ASN.1 構文を使用して、RFC 5280といくつかの関連する仕様から同じ型を表現しています。

その他の表記
==============

コメントは `--`で始まります。 SEQUENCE または SET のフィールドは、OPTIONAL または DEFAULT foo と指定することができます。これは OPTIONAL と同じことを意味しますが、フィールドが存在しない場合は「foo」が含まれていると見なす必要があります。 長さを持つ型 (strings、octet と bit strings そして sets と sequences OF things) には、SIZE パラメータを与えることができます。このパラメータは、長さを正確な長さまたは範囲に制限します。

型は、型定義の後に中括弧を使用することで、特定の値を持つように制約できます。 [次の例](https://tools.ietf.org/html/rfc5280#page-117)では、Version フィールドに3つの値を持つことができることを定義し、それらの値に意味のある名前を割り当てています

```asn1
Version ::= INTEGER { v1(0), v2(1), v3(2) }
```

これは、特定の OID に名前を割り当てる場合にもよく使用されます (これは単一の値であり、代替値を示すカンマがないことに注意してください) 。 [RFC 5280からの例](https://tools.ietf.org/html/rfc5280#page-110)

```asn1
id-pkix  OBJECT IDENTIFIER  ::=
         { iso(1) identified-organization(3) dod(6) internet(1)
                    security(5) mechanisms(5) pkix(7) }
```

また、[数字]、IMPLICIT、EXPLICIT、UNIVERSAL、および APPLICATION もあります。 これらは、値のエンコード方法の詳細を定義します。これについては、後述します。

エンコーディング
============

ASN.1 は、BER、DER、PER、XER などの多くのエンコード方式に関連付けられています。 基本符号化規則 (BER) はかなり柔軟です。 識別符号化規則 (DER) は、[正規化](https://en.wikipedia.org/wiki/Canonicalization)ルールを持つ BER のサブセットであるため、特定の構造を表現する方法は1つしかありません。 圧縮符号化規則 (PER) は、エンコードに使用するバイト数が少ないため、スペースまたは伝送時間が貴重な場合に便利です。 XML 符号化規則 (XER) は、何らかの理由で XML を使用する場合に便利です。

HTTPS 証明書は一般に DER でエンコードされます。 BER でエンコードすることは可能ですが、署名値は証明書の正確なバイトではなく同等の DER エンコードで計算されるため、BER で証明書をエンコードすると不要な問題が発生します。 ここでは、まず BER について説明し、その後 DER によって提供される追加の制限事項について説明します。

[実際の証明書のデコード](https://lapo.it/asn1js/#MIIFaTCCBFGgAwIBAgISA9QVMY4sVx0pBfw-BSdonQ0JMA0GCSqGSIb3DQEBCwUAMEoxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MSMwIQYDVQQDExpMZXQncyBFbmNyeXB0IEF1dGhvcml0eSBYMzAeFw0xOTA5MjkxNjMzMzZaFw0xOTEyMjgxNjMzMzZaMBoxGDAWBgNVBAMTD2xldHNlbmNyeXB0Lm9yZzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANACdZdYiHLXjUhzqmaHENZ_mYp05-bbJw0RhmkCMN32iqPP0_2_KBRi60F87-itSNcKpQ_HQmEm5NoaH6rHzPuihv834og9TPsHeM0QOkaGOcR001h0kGRlIgynXzG7kSO7hTAUSbLfzCD4Hp8swLJHCz787sn_09DvPkJdeHhlQvrgfnGXqsHLqSXo9UtZXriwYS0HRCt5dKCLTOQAmS5ezKG2-7LVcuQQGsG1st3f2t092zJ8BDj_hAd0Zh8vKRwkDZvPzZzo76g4pGtVPRhmcDnVLin4PmsysWevEdzpJhNO7FXCsCA2aWo4ePAYKrR9BjyNlPAQ2QkKlI_cJx8CAwEAAaOCAncwggJzMA4GA1UdDwEB_wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwDAYDVR0TAQH_BAIwADAdBgNVHQ4EFgQUfCuj5zyEXzjUdndlK8VKWGyO3aowHwYDVR0jBBgwFoAUqEpqYwR93brm0Tm3pkVl7_Oo7KEwbwYIKwYBBQUHAQEEYzBhMC4GCCsGAQUFBzABhiJodHRwOi8vb2NzcC5pbnQteDMubGV0c2VuY3J5cHQub3JnMC8GCCsGAQUFBzAChiNodHRwOi8vY2VydC5pbnQteDMubGV0c2VuY3J5cHQub3JnLzAvBgNVHREEKDAmgg9sZXRzZW5jcnlwdC5vcmeCE3d3dy5sZXRzZW5jcnlwdC5vcmcwTAYDVR0gBEUwQzAIBgZngQwBAgEwNwYLKwYBBAGC3xMBAQEwKDAmBggrBgEFBQcCARYaaHR0cDovL2Nwcy5sZXRzZW5jcnlwdC5vcmcwggECBgorBgEEAdZ5AgQCBIHzBIHwAO4AdQDiaUuuJujpQAnohhu2O4PUPuf-dIj7pI8okwGd3fHb_gAAAW1-FbruAAAEAwBGMEQCIBROHx_dL0yfOpZs7Y6teawOn0oawhuW-3lvVs61DhjcAiB2ZuYwHu3BwYtqJTqfwsjQzjMZm8bQOutdme7dfaLXvgB1ACk8UZZUyDlluqpQ_FgH1Ldvv1h6KXLcpMMM9OVFR_R4AAABbX4VuuYAAAQDAEYwRAIgTc8_QJi4odfZIQ1u74zzvkBobqa08Wb_vxoqlgviUYICIGnAFgaPUg-xzKTRZGTGO4cj8UGJ3f52NoD6UWipPgIvMA0GCSqGSIb3DQEBCwUAA4IBAQAWl67Avp7BgqZW3VEWEjXHganloM8OHMS6en6S46nyuW0itGzth8SmCuG4i7fseecEG3Zsm0U1S1d3AffClOwWAGxB5Ark8Bpjszy8nGtNo7pFH-psGCBGj1pnklteu3jUzkkXKHS00Dsna1fJIzswgD7X7et8PRvV3ufIidkvvbfev0L2TYPWEFMM7WO0eIysf9WTljuflgcbzJXY0PatUBzL59ekidJZvGZ7d-hTl14CcCTrZ-VGMZlmK6tMhBuXJdAa5R0QSUpqirGRLz37Ox-SVh_tjA-I2tcRs0euAoX0etcr5cbBapV4-6LtSUt_rLBddeXCnDxqAWQxyy0p)を別のウィンドウで開いて、この章を読むことをお勧めします。

型-長さ-値
-----------------

BER は、Protocol Buffers や Thrift と同様に、型-長さ-値エンコード方式です。 つまり、BER でエンコードされたバイトを読み込むと、最初に ASN.1 でタグと呼ばれる「型」に遭遇することになります。 これはバイトまたは一連のバイトであり、どの種類の「型」がエンコードされているかを示します。例えば、INTEGER、UTF8String、または構造体などです。

| 型  | 長さ | 値        |
| -- | -- | -------- |
| 02 | 03 | 01 00 01 |

次に「長さ」に遭遇します。これは、値を取得するために何バイトのデータを読み込まなければならないかを示す数値です。 そして、もちろん値そのものを含むバイト列である「値」が来ます。 例えば16進数のバイト 02 03 01 00 01 は、「型」は INTEGER (タグ02は INTEGER に対応します) を表し、「長さ」は 03で、3バイトの「値」は 01 00 01 です。

型-長さ-値は、JSON、CSV、XML などのデリミタ付きエンコーディングとは区別されます。この場合、フィールドの長さを事前に知る代わりに、予想されるデリミタ（例えばJSONでは `}` 、XML では `</some-tag>`）に達するまでバイトを読み込みます。

タグ
---

タグは通常1バイトです。 複数バイト (「high tag number」形式) を使用して任意の大きいタグ番号をエンコードする方法がありますが、通常は必要ありません。

タグの例を次に示します。

<style>
td {
  padding: 0.2em 1em;
  border: 2px solid lightgrey;
}
table {
  margin-left: 1em;
  margin-bottom: 0.5em;
}
</style>

| タグ (10進) |      タグ (16進) | 型                      |
| --------:| -------------:| ---------------------- |
|        2 |            02 | INTEGER                |
|        3 |            03 | BIT STRING             |
|        4 |            04 | OCTET STRING           |
|        5 |            05 | NULL                   |
|        6 |            06 | OBJECT IDENTIFIER      |
|       12 |            0C | UTF8String             |
|       16 | 10 (と 30)\* | SEQUENCE と SEQUENCE OF |
|       17 | 11 (と 31)\* | SET と SET OF           |
|       19 |            13 | PrintableString        |
|       22 |            16 | IA5String              |
|       23 |            17 | UTCTime                |
|       24 |            18 | GeneralizedTime        |

これらのタグは、コア ASN.1 仕様で指定されており、すべての ASN.1 モジュールにわたって同じ意味をもつため、「汎用 (universal) 」タグであり、その他のいくつかのタグは、退屈なものとしてスキップしました。

これらのタグはすべて31 (0x1F) 以下になっていますが、これにはもっともな理由があります。ビット8、7、6 (タグバイトの上位ビット) は追加情報をエンコードするために使用されるので、31を超える汎用クラスタグ番号は追加のバイトを必要とする「high tag number」形式を使用する必要があります。 31を超える汎用クラスタグはほんの一握りありますが、非常にまれです。

`*`印がついた2つのタグは、常に 0x30 または 0x31 としてエンコードされます。なぜならビット6が、フィールドが構造型か基本型であるかどうかを示すために使用されるからです。 これらのタグは常に構造型であるため、エンコードはビット6が1に設定されています。 詳細については、[構造型 vs 基本型](#constructed-vs-primitive)の節を参照してください。

タグクラス
-----------

汎用クラスがすべての「良い」タグ番号を使い切ったからといって、独自のタグを定義することができないわけではありません。 また、「応用 (application) 」、「私用 (private) 」、および「コンテキスト特定 (context-specific) 」クラスもあります。 これらはビット8および7によって区別されます。

| クラス                        | ビット8 | ビット7 |
| -------------------------- | ----:| ----:|
| 汎用(universal)              |    0 |    0 |
| 応用(application)            |    0 |    1 |
| コンテキスト特定(context-specific) |    1 |    0 |
| 私用(private)                |    1 |    1 |

仕様では多くの場合、最も重要な構成要素を提供する汎用クラスのタグを使用します。 例えば、証明書のシリアル番号は、タグ番号 0x02 である普通の INTEGER でエンコードされます。 しかし仕様は、オプションエントリーを定義した SET または SEQUENCE や、同じ型をもった複数のエントリーをもつ CHOICE に対して、曖昧さをなくすためにコンテキスト特定クラスでタグを定義する必要がある場合があります。 例えば次のような定義があります。

```asn1
Point ::= SEQUENCE {
  x INTEGER OPTIONAL,
  y INTEGER OPTIONAL
}
```

オプション (OPTIONAL) フィールドは存在しない場合には、エンコーディングから完全に省略されるので x 座標だけの点と y 座標だけの点を区別することは不可能です。 例えば、x 座標だけの点をこのようにエンコードするとします (30はここでは SEQUENCE を意味します) 。

```der
30 03 02 01 09
```

これは長さ3 (バイト) の SEQUENCE であり、値9を持つ長さ1の INTEGER を含みます。 しかし、Point を y 座標9でエンコードする方法もまったく同じであるため、曖昧さがあります。

符号化命令
---------------------

この曖昧さを解決するために、仕様では、各エントリに一意のタグを割り当てる符号化命令を提供する必要があります。 そして、汎用クラスタグを踏みにじることは許可されていないため、他のタグの1つ、例えば応用クラスタグを使用する必要があります。

```asn1
Point ::= SEQUENCE {
  x [APPLICATION 0] INTEGER OPTIONAL,
  y [APPLICATION 1] INTEGER OPTIONAL
}
```

しかし、このユースケースでは、カッコ内の数字によってそれ自体が表されたコンテキスト特定クラスを使用する方が一般的です。

```asn1
Point ::= SEQUENCE {
  x [0] INTEGER OPTIONAL,
  y [1] INTEGER OPTIONAL
}
```

そこで、x 座標が9だけの Point をエンコードするには、x を汎用クラスの INTEGER としてエンコードする代わりに、エンコードされたタグのビット8と7を (1,0) に設定してコンテキスト特定クラスを示し、下位ビットを0に設定して、次のエンコードを行います。

```der
30 03 80 01 09
```

9の y 座標だけで Point を表現するには、下位ビットを1に設定する以外は同じことを行います。

```der
30 03 81 01 09
```

または、x 座標と y 座標の両方が9に等しい点を表すこともできます。

```der
30 06 80 01 09 81 01 09
```

長さ
------

タグ-長さ-値タプルの「長さ」は、常に、すべてのサブオブジェクトを含むオブジェクトの合計バイト数を表します。 つまり、1つのフィールドを持つSEQUENCEの長さは1ではありません。長さは、そのフィールドのエンコードされたフォームが何バイトになるかになります。

長さのエンコーディングには、単形式 (Short form) と長形式 (Long form) の2つの形式があります。 単形式は、0から127の間のシングルバイトです。

長形式は少なくとも2バイトであり、最初のバイトのビット8が1に設定されています。 最初のバイトのビット7から1は、長さフィールド自体のバイト数を示します。 残りのバイトは、長さ自体をマルチバイト整数として指定します。

ご想像の通り、これは非常に大きい値を可能にします。 とりうる最長の値は、254(255は将来拡張のために予約されています)の値をもつバイトで始まり、長さフィールドだけでさらに126バイト続くことを指定します。 これらの126バイトがそれぞれ255の場合、2<sup>1008</sup>-1 バイトが値フィールドに続くことを示します。

長形式を使用すると、同じ長さを複数の方法でエンコードできます。例えば、1バイトに収まる長さを表すために2バイトを使用したり、単形式に収まる長さを表すために長形式を使用したりできます。 DER では、常に可能な限り最小の長さの表現を使用するように指定されています。

安全警告：デコードした長さの値を完全に信頼しないでください。 例えば、エンコードされた長さが、デコードされるストリームから得られる使用可能なデータの量よりも小さい事を確認してください。

不定長
-----------------

BER では、事前に長さがわからない場合(例えば、ストリーミングの出力) でも文字列、SEQUENCE、SEQUENCE OF、SET、または SET OF をエンコードすることもできます。 これを行うには、「長さ」を値80のシングルバイトとしてエンコードし、「値」をエンコードされた一連のオブジェクトとして連結してエンコードします。最後に2つのバイト`00 00`が示されます (これは、タグ0を持つ長さゼロのオブジェクトと見なすことができます) 。 例えば、UTF8String の不定長エンコードは、1つ以上の UTF8String を連結し、最後に 00 00 を連結したエンコードです。

不定長は任意に入れ子にできます。 例えば、不定長の UTF8String を作るために連結した1つ以上の UTF8String はそれ自体を固定長または不定長でエンコードすることができます。

長さのバイトが80の場合は、有効な単形式または長形式の長さではないため、区別されます。 ビット8は1に設定されているため、通常は長形式として解釈されますが、残りのビットは、長さを構成する追加バイト数を示すものと見なされます。 ビット7から1はすべて0であるため、ゼロバイトの長さを構成する長形式のエンコーディングを示します。これは許可されていません。

DER では、不定長のエンコードは禁止されています。 固定長のエンコーディング (つまり、最初に長さを指定する) を使用する必要があります。

構造型 vs 基本型
------------------------

最初のタグバイトのビット6は、「値」が基本型 (Primitive) 形式でエンコードされているか、構造型 (Constructed) 形式でエンコードされているかを示すために使用されます。 基本型エンコーディングは値を直接表します。例えば、UTF8String では、値は UTF-8 バイトの文字列のみで構成されます 構造型エンコーディングは、他のエンコードされた値の連結として値を表します。 例えば、「不定長」の説で説明したように、構造型エンコーディングの UTF8String は、複数のエンコードされた UTF8String (それぞれにタグと長さがあります) を連結したもので構成されます。 UTF8String 全体の長さは、これらのすべてのエンコードされた値を連結した合計の長さ (バイト) になります。 構造型エンコーディングは、固定長または不定長のいずれかを使用できます。 基本型エンコーディングは常に固定長を使用します。これは、構造型エンコーディングを使用せずに不定長を表す方法がないためです。

INTEGER、OBJECT IDENTIFIER、および NULL では、基本型エンコーディングを使用する必要があります。 SEQUENCE、SEQUENCE OF、SET、および SET OF では、構造型エンコーディングを使用する必要があります (これらは本質的に複数の値の連結であるため) 。 BIT STRING、OCTET STRING、UTCTime、GeneralizedTime、およびさまざまな文字列型に対して、送信者の裁量により BER では基本型エンコーディングまたは構造型エンコーディングのいずれかを使用できます。 ただし DER では、基本型と構造型の間でエンコーディングの選択ができる全ての型は、基本型エンコーディングを使用する必要があります。

EXPLICIT vs IMPLICIT
--------------------

先述の[符号化命令](#encoding-instructions) 、例えば `[1]`または`[APPLICATION 8]`では、キーワード EXPLICIT または IMPLICIT を含むこともできます ([RFC 5280からの例](https://tools.ietf.org/html/rfc5280#page-117)) 。

```asn1
TBSCertificate  ::=  SEQUENCE  {
     version         [0]  Version DEFAULT v1,
     serialNumber         CertificateSerialNumber,
     signature            AlgorithmIdentifier,
     issuer               Name,
     validity             Validity,
     subject              Name,
     subjectPublicKeyInfo SubjectPublicKeyInfo,
     issuerUniqueID  [1]  IMPLICIT UniqueIdentifier OPTIONAL,
                          -- If present, version MUST be v2 or v3
     subjectUniqueID [2]  IMPLICIT UniqueIdentifier OPTIONAL,
                          -- If present, version MUST be v2 or v3
     extensions      [3]  Extensions OPTIONAL
                          -- If present, version MUST be v3 --  }
```

これはタグのエンコード方法を定義します。タグ番号が明示的に割り当てられているか否かとは関係ありません ( IMPLICIT も EXPLICIT も両方が、常に特定のタグ番号と並んでいるため) 。 IMPLICIT は、フィールドを基底型のようにエンコードしますが、そのタグ番号とクラスは ASN.1 モジュールで提供されるものを使います。 EXPLICIT はフィールドを基底型としてエンコードし、そのエンコーディングを外部エンコーディングで包みます。 その外部エンコーディングのタグ番号とクラスは、 ASN.1 モジュールで提供されるものを使い、さらに[構造型ビット](#constructed-vs-primitive)をセットします。

以下に、IMPLICIT を使用した ASN.1 エンコードの例を示します。

```asn1
[5] IMPLICIT UTF8String
```

「hi」は次のようにエンコードされます。

```der
85 02 68 69
```

EXPLICIT を使用するこのASN.1符号化命令と比較してください。

```asn1
[5] EXPLICIT UTF8String
```

「hi」は次のようにエンコードされます。

```der
A5 04 0C 02 68 69
```

IMPLICIT または EXPLICIT キーワードが存在しない場合、モジュールが先頭に「EXPLICIT TAGS」、「IMPLICIT TAGS」または「AUTOMATIC TAGS」を指定して別のデフォルトを設定しないかぎり、デフォルトは EXPLICIT になります。 例えば、RFC 5280では2つのモジュールが定義されています。1つは[ EXPLICIT タグがデフォルト](https://tools.ietf.org/html/rfc5280#appendix-A.1)であり、もう1つは、最初のモジュールをインポートして[ IMPLICIT タグをデフォルト](https://tools.ietf.org/html/rfc5280#appendix-A.2)として持つモジュールです。 暗黙的（Implicit）エンコーディングでは、明示的（Explicit）エンコーディングよりも使用されるバイト数が少なくなります。

「AUTOMATIC TAGS」は「IMPLICIT TAGS」と同じですが、タグ番号 (`[0]`、 `[1]`など) が必要な場所に自動的に割り当てられるという追加の特性があります (オプションフィールドを持つ SEQUENCE と同様) 。

特定の型のエンコーディング
==========================

この章では、各型の値がどのようにエンコードされるかについて、例を使って説明します。

INTEGER エンコーディング
----------------

整数は1つまたは複数のバイトとして、左端のバイトの上位ビット (ビット8) を符号ビットとする2の補数でエンコードされます。 BER の仕様には次のように書かれています。

2の補数の2進数の値は、最終オクテットのビット1をビットゼロとして始め、最初のオクテットのビット8を最後の番号として終わるように、内容となるオクテットのビットに番号付けすることによって得られます。 各ビットには2<sup>N</sup>の数値が割り当ていて、N は上記の番号付けにおける位置を表しています。 2の補数の2進数の値は、最初のオクテットのビット8を除く、1に設定された各ビットに対して、それぞれのビットに割り当てられた値を合計し、そしてその合計値を、最初のオクテットのビット8が1に設定されている場合は、そのビットに割り当てられた値で減算することで得られます。

例えば、この1バイトの値(2進数で表現) は10進数の50をエンコードしています。

00110010(==10進数の50)

この1バイトの値(2進数で表現) は、10進数の-100をエンコードしています。

10011100(==10進数の-100)

この5バイトの値(2進数で表現)は、10進数の-549755813887(つまり-2<sup>39</sup> + 1)をエンコードしています。

10000000 00000000 00000000 00000000 00000001(==10進数の-549755813887)

BER および DER はどちらも、整数を可能な限り最短の形式で表すことを要求します。 それは次の規則によって適用されます

```
... 第1オクテットのビットと第2オクテットのビット8は
  1. すべてが1であってはならない
  2. すべてがゼロであってはならない
```

ルール (2) はおおまかに言うと「エンコーディングの先頭にゼロバイトがある場合は、それを除いても同じ値になる」ということです。 2バイト目のビット8もここで重要です。なぜなら、特定の値を表現する場合は、先頭にゼロバイトを使用する必要があるからです。 例えば、10進数の255は2バイトとしてエンコードされます。

00000000 11111111

これは、11111111のシングルバイトエンコーディング自体が-1を意味するからです (ビット8は符号ビットとして扱われます) 。

ルール (1) は例を用いて説明するのが最もよいでしょう。 10進数の-128は次のようにエンコードされます。

10000000(==10進数の-128)

ただし、次のようにエンコードすることもできます。

11111111 10000000(==10進数の-128、ただし無効なエンコーディング)

拡張すると -2<sup>15</sup> + 2<sup>14</sup> + 2<sup>13</sup> + 2<sup>12</sup> + 2<sup>11</sup> + 2<sup>10</sup> + 2<sup>9</sup> + 2<sup>8</sup> + 2<sup>7</sup> == -2<sup>7</sup> == -128になります。 "10000000"の1はシングルバイトエンコーディングでは符号ビットでしたが、2バイト符号化では2<sup>7</sup>を意味することに注意してください。

これは一般的な変換です。BER (または DER) としてエンコードされた負の数に対しては、その前にプレフィックスとして11111111を付けると同じ数になります。 これは[符号拡張](https://andybargh.com/binary-sign-extension/)と呼ばれます。 また、値のエンコーディングが11111111で始まる負の数がある場合は、そのバイトを削除しても同じ値になります。 そのため、BER と DER には最短のエンコーディングが必要です。

INTEGER の2の補数のエンコーディングは[証明書発行に実際的な影響](https://bugzilla.mozilla.org/buglist.cgi?query_format=specific&order=relevance%20desc&bug_status=__closed__&product=NSS&content=%E2%80%9CSerial%20entropy%E2%80%9D&comments=0&list_id=16028758)を与えます。 最初のビットは常に符号ビットであるため、8バイトとして DER でエンコードされたシリアル番号の長さは最大で63ビットになることを意味します。 64ビットの正のシリアル番号をエンコードするには、9バイトのエンコードされた値(最初のバイトはゼロ) が必要です。

以下に、値が2<sup>63</sup>+1 の INTEGER のエンコーディング (これは64ビットの正の数です) の例を示します。

```der
02 09 00 80 00 00 00 00 00 00 01
```

String エンコーディング
---------------

文字列はリテラルバイトとしてエンコードされます。 IA5String と PrintableString は、受け入れられる文字の異なるサブセットを定義するだけなので、これらのエンコードの違いはタグだけです。

「hi」を含む PrintableString

```der
13 02 68 69
```

「hi」を含む IA5String

```der
16 02 68 69
```

UTF8String も同じですが、より多様な文字をエンコードできます。 例えばこれは、サングラスをかけた笑顔(😎)（U+1F60E）の UTF8String のエンコーディングです。

```der
0c 04 f0 9f 98 8e
```

Date and Time エンコーディング
----------------------

UTCTime と GeneralizedTime は、意外にも実際には文字列のようにエンコードされています。 先述の「型」節で説明したように、UTCTime は、フォーマット YYMMDDhhmmss で日付を表します。 GeneralizedTime は、YY の代わりに4桁の年 YYYY を使用します。 どちらにもオプションのタイムゾーンのオフセット、またはUTC からのタイムゾーンのオフセットがないことを示す「Z」 (Zulu) があります。

例えば、PST 時間帯 (UTC-8) の2019年12月15日19:02:10の場合、UTCTime では191215190210-0800と表されます。 BER でエンコードすると、次のようになります。

```der
17 11 31 39 31 32 31 35 31 39 30 32 31 30 2d 30 38 30 30
```

BER エンコーディングに関しては、秒は UTCTime と GeneralizedTime の両方においてオプションであり、タイムゾーンオフセットは許可されます。 しかし、DER (と RFC 5280) では、秒は存在しなければならず、1秒未満は存在してはならないと規定しており、時刻は「Z」形式で UTC として表現されなければなりません。

上述の日付は、DER 内で次のようにエンコードされます。

```der
17 0d 31 39 31 32 31 36 30 33 30 32 31 30 5a
```

OBJECT IDENTIFIER エンコーディング
--------------------------

[前述](#object-identifier)のように、OID は概念的には一連の整数です。 OID は常に2つ以上の要素で構成されます。 最初の要素は常に0、1または2です。 最初の要素が0または1の場合、2番目の要素は常に40より小さいです。 このため、最初の2つの要素は明確に40\*X+Yと表されます。ここで X は最初の要素、Y は2番目の要素です。

例えば2.999.3をエンコードするには、最初の2つの要素を結合して10進数の1079(40\*2 + 999) にします。これにより「1079.3」が得られます。

この変換を適用した後、各要素を base128 でエンコードし、最上位バイトを最初に置きます。 各要素において、ビット8は最後のバイトを除き、すべてのバイトで「1」に設定します。これにより、1つの要素が完了して次の要素が始まることがわかります。 従って要素「3」は単純にバイト0x03として表されます。 要素「129」はバイト0x81 0x01として表されます。 各要素をエンコードした後、エンコードされた OID のすべての要素の値を連結することで、OID のエンコード値が形成されます。

OID は、BER か DER かにかかわらず、可能な限り最小のバイト数で表される必要があります。 したがってエンコードされた Oid の要素は、バイト0x80で始まることはできません。

例として、OID 1.2.840.113549.1.1.11 ([ sha256WithRSAEncryption ](https://tools.ietf.org/html/rfc8017#appendix-A.2.4)) は次のようにエンコードされます。

```der
06 09 2a 86 48 86 f7 0d 01 01 0b
```

NULL エンコーディング
-------------

NULL を含むオブジェクトの値は常に長さゼロであるため、NULL のエンコードは常にタグと長さがゼロのフィールドのみとなります。

```der
05 00
```

SEQUENCE エンコーディング
-----------------

SEQUENCE について最初に知っておくべきことは、他のオブジェクトを含んでいるので、常に構造型エンコーディングを使用するということです。 言い換えると、SEQUENCE の「値」バイトは、その SEQUENCE のエンコードされたフィールドの連結を含んでいます (それらのフィールドが定義された順序で) 。 これはまた、SEQUENCEのタグのビット6 ([構造型 vs 基本型](#構造型-vs-基本型)ビット) が常に1に設定されていることを意味します。 したがって、SEQUENCE のタグ番号は技術的には0x10ですが、そのタグバイトは一度エンコードされると常に0x30になります。

OPTIONAL のアノテーションを持つ SEQUENCE 内にフィールドがある場合、それらは存在しなければエンコーディングから単純に省略されます。 デコーダは、SEQUENCE の要素を処理するとき、どの型がデコードされているかをこれまでにデコードされたものと読み取ったタグバイトに基づいて解決できます。 例えば、要素が同じ型を持つ場合など、曖昧さがある場合、ASN.1 モジュールは、要素に異なるタグ番号を割り当てる[符号化命令](#encoding-instructions)を指定する必要があります。

DEFAULT フィールドは OPTIONAL フィールドに似ています。 フィールドの値がデフォルトの場合、BER エンコーディングから省略されることがあります。 DERエンコーディングでは、省略されなければなりません。

例として、RFC 5280は[ AlgorithmIdentifier ](https://tools.ietf.org/html/rfc5280#page-118)を SEQUENCE として定義しています。

```asn1
   AlgorithmIdentifier  ::=  SEQUENCE  {
        algorithm               OBJECT IDENTIFIER,
        parameters              ANY DEFINED BY algorithm OPTIONAL  }
```

これは1.2.840.113549.1.1.11を含む AlgorithmIdentifier のエンコーディングです。 RFC 8017は、[「parameters」はこのアルゴリズムに対して NULL 型を持つべきである](https://tools.ietf.org/html/rfc8017#appendix-A.2)と述べています。

```der
30 0d 06 09 2a 86 48 86 f7 0d 01 01 0b 05 00
```

SEQUENCE OF エンコーディング
--------------------

SEQUENCE OF は SEQUENCE とまったく同じ方法でエンコードされます。 タグですら同じです。 デコードする場合、SEQUENCE と SEQUENCE OF の違いを見分ける唯一の方法は、ASN.1 モジュールを参照することです。

7、8、9の数字を含む SEQUENCE OF INTEGER のエンコーディングは次のとおりです。

```der
30 09 02 01 07 02 01 08 02 01 09
```

SET エンコーディング
------------

SEQUENCE と同様に、SET は構造型であり、「値」バイトはエンコードされたフィールドの連結であることを意味します。 そのタグ番号は0x11です。 [構造型 vs 基本型](#constructed-vs-primitive)ビット(ビット6) は常に1に設定されるため、タグバイトは0x31でエンコードされることを意味します。

SET のエンコーディングは、SEQUENCE と同様に、OPTIONAL フィールドと DEFAULT フィールドが存在しないか、デフォルト値がある場合、これらのフィールドを省略します。 同じタイプのフィールドに起因する曖昧さは、ASN.1 モジュールによって解決されなければならず、DEFAULT フィールドは、デフォルト値がある場合、DER エンコーディングから省略されなければなりません。

BER では、SET は任意の順序でエンコーディングできます。 DER では、SET は各要素のシリアル化された値で昇順にエンコーディングされる必要があります。

SET OF エンコーディング
---------------

SET OF の要素は、0x31のタグバイトを含めて、SET と同じ方法でエンコードされます。 DER エンコーディングの場合、SET OF は SET と同様に昇順でエンコードしなければならないという要件があります。 SET OF 内のすべての要素は同じ型を持つため、タグによる順序付けでは十分ではありません。 したがって、SET OF の要素はエンコードされた値によってソートされ、短い値はゼロで右側にパディングされたかのように扱われます。

BIT STRING エンコーディング
-------------------

N ビットのビット列は N/8バイト(切り上げ) としてエンコードされますが、ビット数が8の倍数でない場合を明確にするために、「未使用ビット数」を表す1バイトのプレフィックスが付きます。 例えば、ビット列011011100101110111(18ビット) をエンコードする場合、少なくとも3バイトが必要です。 しかし、それは合計24ビットの容量があり必要とされる容量以上です。 それらのビットのうち6ビットは未使用です。 それらの6ビットはビット列の右端に書き込まれるため、次のようにエンコードされます。

```der
03 04 06 6e 5d c0
```

BER では、未使用ビットは任意の値を持つことができるので、そのエンコーディングの最後のバイトは c1、c2、c3 などの様になります。 DER では、未使用ビットはすべて0でなければなりません。

OCTET STRING エンコーディング
---------------------

OCTET STRING は、自身が含むバイト列としてエンコードされます。 バイト03、02、06、A0を含む OCTET STRING の例を次に示します。

```der
04 04 03 02 06 A0
```

CHOICE と ANY のエンコーディング
-----------------------

CHOICE フィールドまたは ANY フィールドは、符号化命令によって変更されない限り、実際に保持している型としてエンコードされます。 したがって、ASN.1 仕様の CHOICE フィールドで INTEGER または UTCTime が許可され、エンコードされる特定のオブジェクトが INTEGER を含んでいる場合、INTEGER としてエンコードされます。

実際には CHOICE フィールドは多くの場合、符号化命令を持っています。 例えば、RFC 5280からこの例を考えてみましょう。ここでは、 rfc822Name と dNSName を区別するために符号化命令は必要です。なぜなら、どちらも基底型 IA5String を持っているからです。

```
   GeneralName ::= CHOICE {
        otherName                       [0]     OtherName,
        rfc822Name                      [1]     IA5String,
        dNSName                         [2]     IA5String,
        x400Address                     [3]     ORAddress,
        directoryName                   [4]     Name,
        ediPartyName                    [5]     EDIPartyName,
        uniformResourceIdentifier       [6]     IA5String,
        iPAddress                       [7]     OCTET STRING,
        registeredID                    [8]     OBJECT IDENTIFIER }
```

以下に、rfc822Name `a@example.com` を含む GeneralName のエンコーディングの例を示します。 ([1]が、ビット8が1に設定されている「コンテキスト特定クラス」のタグ番号1を使用し、IMPLICIT タグエンコーディングメソッドを使用することを思いだしてください) 。

```der
81 0d 61 40 65 78 61 6d 70 6c 65 2e 63 6f 6d
```

以下に、dNSName 「example.com」を含む GeneralName のエンコーディングの例を示します。

```der
82 0b 65 78 61 6d 70 6c 65 2e 63 6f 6d
```

安全性
======

特に C や C++ のようなメモリセーフでない言語では、BER と DER のデコードには非常に注意することが重要です。 デコーダには、脆弱性の長い歴史があります。 一般的に入力を解析することは[脆弱性の共通の原因](http://langsec.org/)となります。 とりわけ ASN.1 エンコーディングフォーマットは[特に脆弱性を呼ぶ磁石](https://bugzilla.redhat.com/show_bug.cgi?id=1300257)のようです。 それらは複雑なフォーマットで、多くの可変長フィールドがあります。 長ささえ可変長です。 また、ASN.1 の入力はしばしば攻撃者によってコントロールされます。 認可されたユーザーと認可されていないユーザーを区別するために証明書を解析する必要がある場合、証明書ではなく、ASN.1 コードのバグを悪用するために作られた奇妙な入力を解析することもあると想定する必要があります。

これらの問題を回避するには、可能な限りメモリセーフな言語を使用することが最善です。 また、メモリセーフな言語を使用できるかどうかにかかわらず、ゼロから書いた物より、[ ASN.1 コンパイラ](https://www.itu.int/en/ITU-T/asn1/Pages/Tools.aspx)を使って解析コードを生成するほうがベストです。

謝辞
================

[ A Layman's Guide to a Subset of ASN.1,DER,and BER ](http://luca.ntop.org/Teaching/Appunti/asn1.html)に感謝を表したいと思います。これらのトピックを学ぶ上で、大きな恩義があります。 [ A warm welcome to　DNS ](https://powerdns.org/hello-dns/)の著者にも感謝を表したいと思います。これは、素晴らしい読み物でありこのドキュメントの作風に影響を与えました。

ちょっとしたおまけ
==============

PEM エンコードされた証明書が常に「MII」で始まることに気づいたことがありますか。 例えば、

```
-----BEGIN CERTIFICATE-----

MIIFajCCBFKgAwIBAgISA6HJW9qjaoJoMn8iU8vTuiQ2MA0GCSqGSIb3DQEBCwUA
...
```

いまやあなたは、理由を説明できるようになっています。 [証明書は SEQUENCE ](https://tools.ietf.org/html/rfc5280#page-116)であるため、0x30バイトで始まります。 次のバイト列は[長さ](#length)フィールドです。 証明書はほとんどの場合127バイトより大きいため、長さフィールドは長さの長形式を使用する必要があります。 つまり、最初のバイトは0x80 + N になります。ここでNは最初のバイトの後に続く、長さを表すバイトの数です。 N はほとんどの場合2です。これは128から65535までの長さをエンコードするのに必要なバイト数であり、ほとんどすべての証明書はその範囲の長さを持っているからです。

これで、証明書の DER エンコードの最初の2バイトが、0x30 0x82であることがわかりました。 [ PEM エンコーディング](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail)では、[ base64 ](https://en.wikipedia.org/wiki/Base64)が使用されます。base64 は、3バイトのバイナリ入力を4つの ASCII 文字の出力にエンコードします。 別の言い方をすると、base64 は、24ビットのバイナリ入力を4つの ASCII 文字の出力に変換し、6ビットの入力が各文字に割り当てられます。 私たちは、すべての証明書の最初の16ビットが何であるかを知っています。 ほとんどすべての証明書の最初の文字が「MII」であることを証明するには、次の2ビットを調べる必要があります。 これらは2つの長さのバイトの最上位バイトの最上位ビットです。 これらのビットは1に設定されることはあるでしょうか。 証明書の長さが16383バイト以上でない限り、ありません。 したがって、PEM 証明書の最初の文字は常に同じであることが予測できます。 自分で試してみてください。

```bash
xxd -r -p <<<308200 | base64
```
