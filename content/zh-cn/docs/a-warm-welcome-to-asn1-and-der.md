---
title: ASN.1 与 DER 轻松入门
slug: a-warm-welcome-to-asn1-and-der
date: 2020-04-23
lastmod: 2021-03-21
---

本文以轻松的笔触介绍了 HTTPS 证书背后的数据结构和格式， 只要稍有计算机科学知识并对数字证书略知一二就不难理解。

HTTPS 证书是一种文件，与任何其他文件一样。 它的具体格式是由 [RFC 5280](https://tools.ietf.org/html/rfc5280) 规定的， 该标准采用了一门名为 ASN.1 的语言，专门用于定义文件格式，也可以说是定义数据结构。 譬如，C 语言是这样定义数据结构的：

```c
struct point {
  int x, y;
  char label[10];
};
```

Go 语言则是这样定义的：

```go
type point struct {
  x, y int
  label string
}
```

而写成 ASN.1 就会是这样：

```asn1
Point ::= SEQUENCE {
  x INTEGER,
  y INTEGER,
  label UTF8String
}
```

与 Go 和 C 的语法相比，ASN.1 的优势在于它不依赖某一门特定的编程语言， 任何语言都可以根据上述 ASN.1 定义实现 Point 结构。不仅如此，借助工具还可以将 ASN.1 定义自动转换成你想使用的语言。 在 ASN.1 中，一系列相关的定义称为一个“[模块](https://www.obj-sys.com/asn1tutorial/node6.html)”。

ASN.1 的另一特点在于它有各种序列化格式，也就是说数据可以从内存导出成一串字节（或存入文件中），也可以由一串字节反过来导入内存。 因此任何一台设备生成的证书其他设备都能正常读取，无需顾忌 CPU 和操作系统的差异。

还有一些语言也能起到与 ASN.1 [同样的作用](https://en.wikipedia.org/wiki/Interface_description_language)。 例如，Protocol Buffers 也提供了一门定义类型的[语言](https://developers.google.com/protocol-buffers/docs/proto3)，以及负责将各类对象编码的[序列化格式](https://developers.google.com/protocol-buffers/docs/encoding)。 [Thrift](https://thrift.apache.org/) 同样具备类似的语言和序列化格式。 Protocol Buffers 和 Thrift 完全可以胜任定义 HTTPS 证书的职责，只不过 ASN.1 早在 1984 年就已诞生，对于数字证书（1988 年）和 HTTPS（1994 年）技术来说具备先天优势。

多年来 ASN.1 标准几经修订，各修订版本通常以发布年份加以区分。 本文介绍 ASN.1 旨在帮助读者准确理解 RFC 5280 及其他 HTTPS 证书相关标准，所以我们将着重探讨 1988 年版，并简要提及后续版本引入的功能。 各版本的标准文档可以直接在国际电信联盟（ITU）的网站上下载，不过部分文件只对 ITU 成员开放。 相关标准包括 [X.680](https://www.itu.int/rec/T-REC-X.680)（定义了 ASN.1 语言）和 [X.690](https://www.itu.int/rec/T-REC-X.690)（定义了 DER 和 BER 序列化格式）， 其前身分别是 [X.208](https://www.itu.int/rec/T-REC-X.208/en) 与 [X.209](https://www.itu.int/rec/T-REC-X.209/en)。

ASN.1 最主要的序列化格式称为 Distinguished Encoding Rules (DER)。 它是对 Basic Encoding Rules (BER) 格式加以严格规范化而成的一种变体。 例如，在 DER 格式中，即使是集合类型（SET OF）的元素也必须有序排列。

DER 格式的证书通常会进一步转换成 PEM 格式，这一过程采用 [Base64](https://en.wikipedia.org/wiki/Base64) 编码将二进制字节转化为一连串的字母、数字、“+”和“/”符号，并在头尾加入“\-\-\-\--BEGIN CERTIFICATE\-\-\-\--”与“\-\-\-\--END CERTIFICATE\-\-\-\--”两行文字以示分隔。 PEM 格式的优点在于方便复制与粘贴。

本文将首先介绍 ASN.1 使用的类型与语法，然后再介绍 ASN.1 定义的对象是如何编码的。 读者不妨随时翻阅前后章节，毕竟 ASN.1 语言的部分功能直接决定了其编码方式。 本文倾向使用更为通行的术语，如用“字节”而非“八位组”，用“数值”而非“内容”。 “序列化”与“编码”则作为同义词使用。

类型
=========

INTEGER
-------

就是老生常谈的整数。 可以是正数，也可以是负数。 ASN.1 的 INTEGER 类型最为特别之处在于大小不限。 int64 不够大？ 小事一桩。 这对于表示 RSA 模数之类远超 int64 范围的整数（比如 2<sup>2048</sup>）尤为有用。 严格说来 DER 格式的整数范围是有上限的，但上限极高：任何 DER 字段的长度必须能够用 126 个字节来表示。 因此，DER 能表示的最大的 INTEGER 数值是 256<sup>(2\*\*1008)</sup>−1。 真正无限大的 INTEGER 必须用 BER 编码，因为 BER 对字段长度没有限制。

字符串
-------

ASN.1 有很多字符串类型：BMPString、GeneralString、GraphicString、IA5String、ISO646String、NumericString、PrintableString、TeletexString、T61String、UniversalString、UTF8String、VideotexString，还有 VisibleString。 对于 HTTPS 证书来说基本只需要关心 PrintableString、UTF8String 和 [IA5String](https://en.wikipedia.org/wiki/IA5STRING)。 ASN.1 模块定义字段的时候也会定义其应当使用的字符串类型。 [例如](https://tools.ietf.org/html/rfc5280#page-127)：

```
CPSuri ::= IA5String
```

PrintableString 只能存储 ASCII 中的部分字符，包括字母、数字、空格以及一些特定的符号：`' () + , - . / : = ?`。 注意其中不包括 `*` 和 `@`。 虽然允许使用的字符有限，但在存储空间上并无优势。

某些字段，例如 [RFC 5280 中的 DirectoryString](https://tools.ietf.org/html/rfc5280#page-20)，有多种字符串类型可供选择。 由于 DER 编码会将字符串的类型信息一并存储，使用 PrintableString 这类字符串时务必确保其内容[符合类型要求](https://community.letsencrypt.org/t/2018-03-12-wildcard-certificate-encoding-issue/55485)。

IA5String 源自 [International Alphabet No. 5](https://en.wikipedia.org/wiki/T.50_(standard))，限制较为宽松，所有 ASCII 字符几乎都能使用，在证书中常用于邮箱地址、DNS 域名、网址之类的字段。 需要注意的是 IA5 编码中有部分数值的含义与 US-ASCII 并不相同。

TeletexString、BMPString 和 UniversalString 对 HTTPS 证书来说都已过时，建议不再使用。但一些历史悠久的证书可能在其过时之前就已颁布，因此还能发现它们的身影，需要予以解析。

与 C 和 C++ 语言中的字符串不同，ASN.1 的字符串不以空字符结尾。 事实上，字符串中出现空字符也是完全符合规范的。 如果两套系统采取不同方式读取同一 ASN.1 字符串，就可能出现安全漏洞。 例如，过去攻击者只要持有 evil.com 域名，就能[诱使某些证书颁发机构](https://www.theregister.co.uk/2009/07/30/universal_ssl_certificate/)为“example.com\\0.evil.com”颁发证书。 当时的证书验证软件会认为这一证书对 example.com 也是有效的。 在 C 和 C++ 中处理 ASN.1 字符串必须加倍小心，避免产生安全漏洞。

日期和时间
---------------

时间类型也有不少：UTCTime、GeneralizedTime、DATE、TIME-OF-DAY、DATE-TIME 以及 DURATION。 但在 HTTPS 证书中只需关心 UTCTime 和 GeneralizedTime。

UTCTime 采用 YYMMDDhhmm[ss] 的格式表示日期和时间，末尾还可以加上时区，或者加上“Z”表示协调世界时（UTC）。 例如，UTCTime 的 820102120000Z 和 820102070000-0500 表示同一时刻：1982 年 1 月 2 日纽约（UTC−5）的早晨七点，即协调世界时的正午十二点。

因为 UTCTime 没有写明是 20 世纪还是 21 世纪，[RFC 5280](https://tools.ietf.org/html/rfc5280#section-4.1.2.5.1) 补充规定了其范围是 1950 至 2050 年。 RFC 5280 还规定时区必须为“Z”，且秒数不能省略。

GeneralizedTime 用四位数字表示年份，从而得以支持 2050 年以后的日期。 它还允许秒数出现小数（而且句点和逗号竟然都可以作为小数点）。 RFC 5280 又禁止了秒数出现小数，并要求时区为“Z”。

OBJECT IDENTIFIER
-----------------

Object identifier (OID) 是一种全球唯一的层状标识符，由一串整数组成。 它可以用来标识任何东西，但通常用于指代标准、算法、证书扩展、组织机构或政策文件。 例如 [1.2.840.113549](http://oid-info.com/get/1.2.840.113549) 表示的是 RSA 安全公司， 因此该公司有权分配以这一串数字开头的 OID，比如 [RFC 8017](https://tools.ietf.org/html/rfc8017#page-69) 定义的 [1.2.840.113549.1.1.11](http://oid-info.com/get/1.2.840.113549.1.1.11) 表示 sha256WithRSAEncryption。

类似地，[1.3.6.1.4.1.11129](http://oid-info.com/get/1.3.6.1.4.1.11129) 指的是 Google 公司，Google 则在 [RFC 6962](https://tools.ietf.org/html/rfc6962) 中将 [1.3.6.1.4.1.11129.2.4.2](http://oid-info.com/get/1.3.6.1.4.1.11129.2.4.2) 分配给了证书透明化系统中的 [SCT 列表扩展](https://letsencrypt.org/2018/04/04/sct-encoding.html)，因为该系统最初便是由 Google 研发的。

同一前缀下的所有 OID 在英文中又称为 OID arc。 OID 越短，占据的空间就越小，价值也就越高，对于大量使用 OID 的格式尤为如此。 OID 前缀 [2.5](http://oid-info.com/get/2.5) 分配给了 Directory Services，指的是一系列的标准文档，在 HTTPS 证书中处于核心地位的 X.509 标准也位列其中。 证书中有很多字段用的都是这个简短的前缀。 例如，[2.5.4.6](http://oid-info.com/get/2.5.4.6) 表示国家名称（countryName），[2.5.4.10](http://oid-info.com/get/2.5.4.10) 则表示机构名称（organizationName）。 这些 OID 在绝大多数证书中至少都会出现一次，自然越短越好。

标准文件中的 OID 常用英文词汇表示以便阅读，有时还会拼接形成新的 OID。 [以 RFC 8017 为例](https://tools.ietf.org/html/rfc8017#page-68)：

```asn1
   pkcs-1    OBJECT IDENTIFIER ::= {
       iso(1) member-body(2) us(840) rsadsi(113549) pkcs(1) 1
   }
   ...

   sha256WithRSAEncryption      OBJECT IDENTIFIER ::= { pkcs-1 11 }
```

NULL
----

NULL 就是 NULL，懂了吧？

SEQUENCE 和 SEQUENCE OF
------------------------

别被名字给骗了，这是两种截然不同的类型。 SEQUENCE 相当于大多数编程语言中的 struct 类型， 用于存放若干不同类型的固定字段。 参见[下文的证书示例](#bit-string-%E5%92%8C-octet-string)。

SEQUENCE OF 表示的则是任意数量同一类型的字段， 相当于编程语言中的数组或列表。 [例如](https://tools.ietf.org/html/rfc5280#page-116)：

```asn1
   RDNSequence ::= SEQUENCE OF RelativeDistinguishedName
```

可以是 0 个、1 个乃至 7000 个 RelativeDistinguishedName，并且按某种特定顺序排列。

不过 SEQUENCE 和 SEQUENCE OF 还是有相似之处的：二者的编码完全相同！ 这一点留到探讨[编码](#sequence-%E7%9A%84%E7%BC%96%E7%A0%81)时再详细介绍。

SET 和 SET OF
--------------

这两种类型与 SEQUENCE 和 SEQUENCE OF 基本相同，只是强调其中元素的顺序无关紧要。 但是在编码前必须先予以排序。 [例如](https://tools.ietf.org/html/rfc5280#page-116)：

```asn1
RelativeDistinguishedName ::=
  SET SIZE (1..MAX) OF AttributeTypeAndValue
```

注意：本例使用了 SIZE 关键字要求 RelativeDistinguishedName 中至少应有一个元素，但通常 SET 和 SET OF 都可以为空。

BIT STRING 和 OCTET STRING
---------------------------

前者表示一段任意的二进制位，而后者表示一段任意的字节。 这两种类型可以存放无特殊结构的数据，比如密码学中的 nonce 和散列值。 它们也可以当作 C 语言中的 void 指针或 Go 语言中的空接口（interface{}）使用，表示数据虽然存在内部结构，但该结构只在别处定义，与 ASN.1 的类型系统无关。 [例如](https://tools.ietf.org/html/rfc5280#page-116)，证书的数字签名就是用 BIT STRING 定义的：

```
Certificate  ::=  SEQUENCE  {
     tbsCertificate       TBSCertificate,
     signatureAlgorithm   AlgorithmIdentifier,
     signature            BIT STRING  }
```

新版的 ASN.1 语言还[支持详细规定](https://tools.ietf.org/html/rfc5912#page-99) BIT STRING 的内容，OCTET STRING 亦然。

CHOICE 和 ANY
--------------

CHOICE 表示可以使用其定义中列出的任意一种类型。 [例如](https://tools.ietf.org/html/rfc5280#page-117)，下方的 Time 要么是 UTCTime，要么是 GeneralizedTime：

```asn1
Time ::= CHOICE {
     utcTime        UTCTime,
     generalTime    GeneralizedTime }
```

ANY 表示允许使用任意类型。 但实际中通常还有一些 ASN.1 语法难以表达的限制。 [例如](https://tools.ietf.org/html/rfc5280#page-111)：

```asn1
   AttributeTypeAndValue ::= SEQUENCE {
     type     AttributeType,
     value    AttributeValue }

   AttributeType ::= OBJECT IDENTIFIER

   AttributeValue ::= ANY -- DEFINED BY AttributeType
```

ANY 在协议的扩展机制中扮演了重要的角色。它为将来新增字段留出了余地，协议的主体规范发布后不必反复修订，新字段只需注册新的类型（用 OID 表示），并随之定义具体的字段格式即可。

需要注意的是 ANY 属于 ASN.1 从 1988 年遗留下来的类型。 [1994 年](https://www.itu.int/rec/T-REC-X.680-199407-S/en) ANY 就已经被废弃，取而代之的是 Information Object Class，这是一种规范化的扩展定义方式，弥补了 ANY 的不足。 现如今这一改变已经相当彻底，2015 年版的 ASN.1 标准甚至连 ANY 的字样都没有出现。 但是如果回过头看 1994 年版还是可以找到有关这一变动的探讨。 此处介绍这种旧式语法是因为 RFC 5280 仍在使用， [RFC 5912](https://tools.ietf.org/html/rfc5912) 则把 RFC 5280 及相关标准中的类型都转换成了 2002 年的 ASN.1 格式。

其他语法
==============

以 `--` 开头的文字是注释。 SEQUENCE 和 SET 类型的字段标注 OPTIONAL 表示可以省略，或者标注 DEFAULT foo 表示省略后的默认值为 foo。 具有长度的类型（字符串、OCTET STRING、BIT STRING、SET OF、SEQUENCE OF）可以通过 SIZE 参数限定长度必须在某一范围内或恰为某个数。

类型定义结尾可以使用花括号限定该类型只能取某些值。 [例如此处定义](https://tools.ietf.org/html/rfc5280#page-117) Version 字段只能取三个值中的一个，并对这三个值分别赋予了含义：

```asn1
Version ::= INTEGER { v1(0), v2(1), v3(2) }
```

这种方法也常用于标识 OID 的名称。注意此时没有用逗号，因此表示的是一个整体，而非可供选择的多个值。 [以 RFC 5280 为例](https://tools.ietf.org/html/rfc5280#page-110)：

```asn1
id-pkix  OBJECT IDENTIFIER  ::=
         { iso(1) identified-organization(3) dod(6) internet(1)
                    security(5) mechanisms(5) pkix(7) }
```

接下来还会出现 \[数字\]、IMPLICIT、EXPLICIT、UNIVERSAL、APPLICATION 等语法要素， 这些语法关系到编码细节，我们将在下文探讨。

编码
============

ASN.1 有很多种编码：BER、DER、PER、XER 等等。 BER (Basic Encoding Rules) 是一种很灵活的编码， DER (Distinguished Encoding Rules) 则在 BER 的基础上加入了[规范化](https://en.wikipedia.org/wiki/Canonicalization)的规则，从而保证同样的信息编码方式也是唯一的。 PER (Packed Encoding Rules) 编码更为紧凑，适合对存储空间或传输速度要求较高的场景。 XER (XML Encoding Rules) 则在需要使用 XML 的情况下能够派上用场。

HTTPS 证书通常采用 DER 编码。 用 BER 也是可以的，但是数字签名必须根据 DER 编码计算，和证书的实际编码方式无关，所以用 BER 相当于自讨苦吃。 本文以介绍 BER 为主，并随之说明 DER 在其基础上施加的额外规定。

阅读本章时建议在另一窗口打开这个[实际证书解码示例](https://lapo.it/asn1js/#MIIFaTCCBFGgAwIBAgISA9QVMY4sVx0pBfw-BSdonQ0JMA0GCSqGSIb3DQEBCwUAMEoxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MSMwIQYDVQQDExpMZXQncyBFbmNyeXB0IEF1dGhvcml0eSBYMzAeFw0xOTA5MjkxNjMzMzZaFw0xOTEyMjgxNjMzMzZaMBoxGDAWBgNVBAMTD2xldHNlbmNyeXB0Lm9yZzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANACdZdYiHLXjUhzqmaHENZ_mYp05-bbJw0RhmkCMN32iqPP0_2_KBRi60F87-itSNcKpQ_HQmEm5NoaH6rHzPuihv834og9TPsHeM0QOkaGOcR001h0kGRlIgynXzG7kSO7hTAUSbLfzCD4Hp8swLJHCz787sn_09DvPkJdeHhlQvrgfnGXqsHLqSXo9UtZXriwYS0HRCt5dKCLTOQAmS5ezKG2-7LVcuQQGsG1st3f2t092zJ8BDj_hAd0Zh8vKRwkDZvPzZzo76g4pGtVPRhmcDnVLin4PmsysWevEdzpJhNO7FXCsCA2aWo4ePAYKrR9BjyNlPAQ2QkKlI_cJx8CAwEAAaOCAncwggJzMA4GA1UdDwEB_wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwDAYDVR0TAQH_BAIwADAdBgNVHQ4EFgQUfCuj5zyEXzjUdndlK8VKWGyO3aowHwYDVR0jBBgwFoAUqEpqYwR93brm0Tm3pkVl7_Oo7KEwbwYIKwYBBQUHAQEEYzBhMC4GCCsGAQUFBzABhiJodHRwOi8vb2NzcC5pbnQteDMubGV0c2VuY3J5cHQub3JnMC8GCCsGAQUFBzAChiNodHRwOi8vY2VydC5pbnQteDMubGV0c2VuY3J5cHQub3JnLzAvBgNVHREEKDAmgg9sZXRzZW5jcnlwdC5vcmeCE3d3dy5sZXRzZW5jcnlwdC5vcmcwTAYDVR0gBEUwQzAIBgZngQwBAgEwNwYLKwYBBAGC3xMBAQEwKDAmBggrBgEFBQcCARYaaHR0cDovL2Nwcy5sZXRzZW5jcnlwdC5vcmcwggECBgorBgEEAdZ5AgQCBIHzBIHwAO4AdQDiaUuuJujpQAnohhu2O4PUPuf-dIj7pI8okwGd3fHb_gAAAW1-FbruAAAEAwBGMEQCIBROHx_dL0yfOpZs7Y6teawOn0oawhuW-3lvVs61DhjcAiB2ZuYwHu3BwYtqJTqfwsjQzjMZm8bQOutdme7dfaLXvgB1ACk8UZZUyDlluqpQ_FgH1Ldvv1h6KXLcpMMM9OVFR_R4AAABbX4VuuYAAAQDAEYwRAIgTc8_QJi4odfZIQ1u74zzvkBobqa08Wb_vxoqlgviUYICIGnAFgaPUg-xzKTRZGTGO4cj8UGJ3f52NoD6UWipPgIvMA0GCSqGSIb3DQEBCwUAA4IBAQAWl67Avp7BgqZW3VEWEjXHganloM8OHMS6en6S46nyuW0itGzth8SmCuG4i7fseecEG3Zsm0U1S1d3AffClOwWAGxB5Ark8Bpjszy8nGtNo7pFH-psGCBGj1pnklteu3jUzkkXKHS00Dsna1fJIzswgD7X7et8PRvV3ufIidkvvbfev0L2TYPWEFMM7WO0eIysf9WTljuflgcbzJXY0PatUBzL59ekidJZvGZ7d-hTl14CcCTrZ-VGMZlmK6tMhBuXJdAa5R0QSUpqirGRLz37Ox-SVh_tjA-I2tcRs0euAoX0etcr5cbBapV4-6LtSUt_rLBddeXCnDxqAWQxyy0p)，方便对照。

类型–长度–数据
-----------------

与 Protocol Buffers 和 Thrift 一样，BER 的编码形式称为“类型–长度–数据”（type–length–value，常缩写为 TLV）。 也就是说，如果按顺序读取 BER 编码的每个字节，首先读取到的是类型信息，在 ASN.1 中称为“标签”。 标签可以有一个或多个字节，表示存储的是哪种数据，例如 INTEGER、UTF8String 等等。

| 类型 | 长度 | 数据       |
| -- | -- | -------- |
| 02 | 03 | 01 00 01 |

接下来出现的是长度，表示数据究竟有多少个字节。 再接下来自然就是数据本身了。 例如，以十六进制表示的字节 02 03 01 00 01 表示一个 INTEGER（02 就是 INTEGER 类型对应的标签），长度是 03，后面的 3 个字节 01 00 01 则是数据。

与类型–长度–数据的编码方式不同，JSON、CSV、XML 等格式通过分隔符实现编码，也就是事先并不知道数据的长度，出现特定的分隔符（比如 JSON 中的 `}` 和 XML 中的 `</some-tag>`）便表示数据结束。

标签
---

标签通常只有一个字节。 如果使用多个字节还可以编码任意大小的标签，但通常没有这个必要。

以下是一些常见的标签：

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

| 标签（十进制） |     标签（十六进制） | 对应类型                   |
| -------:| ------------:| ---------------------- |
|       2 |           02 | INTEGER                |
|       3 |           03 | BIT STRING             |
|       4 |           04 | OCTET STRING           |
|       5 |           05 | NULL                   |
|       6 |           06 | OBJECT IDENTIFIER      |
|      12 |           0C | UTF8String             |
|      16 | 10（和 30）\* | SEQUENCE 和 SEQUENCE OF |
|      17 | 11（和 31）\* | SET 和 SET OF           |
|      19 |           13 | PrintableString        |
|      22 |           16 | IA5String              |
|      23 |           17 | UTCTime                |
|      24 |           18 | GeneralizedTime        |

这些标签都属于“通用”标签（universal tags），由 ASN.1 核心规范定义，在所有 ASN.1 模块中都有着相同的含义。此外还有一些无关紧要的通用标签，这里略去不表。

这些标签的值都小于 31（0x1F），其实是有原因的。第 8、7、6 位（也就是标签字节的最高三位）有着特殊含义，所以大于 31 的通用标签只能用多字节标签表示。 有一小部分通用标签的值大于 31，但是数量很少。

标 * 的两个标签在编码中一定是 0x30 和 0x31，因为第 6 位表示该字段是单一字段还是复合字段。 这两种类型必然是复合字段，所以第 6 位只能是 1。 详见[单一字段与复合字段](#%E5%8D%95%E4%B8%80%E5%AD%97%E6%AE%B5%E4%B8%8E%E5%A4%8D%E5%90%88%E5%AD%97%E6%AE%B5)的说明。

标签类别
-----------

通用标签把“好用”的数字都用光了，但这并不妨碍我们定义自己的标签。 除了通用标签外还有三种标签：程序内部标签、特定语境标签和私有标签。 标签类别可通过第 7 位和第 8 位区分：

| 类别                     | 第 8 位 | 第 7 位 |
| ---------------------- | -----:| -----:|
| 通用（Universal）          |     0 |     0 |
| 程序内部（Application）      |     0 |     1 |
| 特定语境（Context-specific） |     1 |     0 |
| 私有（Private）            |     1 |     1 |

标准规范中使用的大多是通用标签，因为通用标签已经涵盖了所有常用数据结构。 例如，证书序列号就是用朴实无华的 INTEGER 类型编码的，标签值为 0x02。 但有时标准中也需要定义特定语境标签来区分 SET 和 SEQUENCE 中的可省略元素，或者区分 CHOICE 中同类型的选项。 以下述定义为例：

```asn1
Point ::= SEQUENCE {
  x INTEGER OPTIONAL,
  y INTEGER OPTIONAL
}
```

OPTIONAL 字段如果省略，在编码中就完全不存在，这样一来只有 x 坐标和只有 y 坐标的 Point 就无法区分。 例如，一个只声明 x 坐标为 9 的 Point 编码如下（30 是 SEQUENCE 的标签）：

```der
30 03 02 01 09
```

这是一个长度为 3（字节）的 SEQUENCE，包含一个长度为 1 的 INTEGER 元素，且其数值为 9。 但一个 y 坐标为 9 的 Point 也得这么编码，于是就出现了歧义。

编码指令
---------------------

为避免出现歧义，标准规范需要通过编码指令为每个字段分配互不相同的标签。 既然通用标签不能随意改变含义，我们只好改用其他类别，比如程序内部标签：

```asn1
Point ::= SEQUENCE {
  x [APPLICATION 0] INTEGER OPTIONAL,
  y [APPLICATION 1] INTEGER OPTIONAL
}
```

不过这种情形下最常用的还是特定语境标签，表示方法就是方括号内只有一个数字：

```asn1
Point ::= SEQUENCE {
  x [0] INTEGER OPTIONAL,
  y [1] INTEGER OPTIONAL
}
```

这样一来，只声明 x 坐标为 9 的 Point 编码时便不再用 INTEGER 的通用标签，而是将标签的第 8 和第 7 位分别改为 1 和 0，表示特定语境标签，其他低位设为 0，得到以下编码：

```der
30 03 80 01 09
```

y 坐标为 9 的 Point 编码方式如出一辙，只不过低位要设为 1：

```der
30 03 81 01 09
```

x 和 y 坐标都为 9 的 Point 则可以编码如下：

```der
30 06 80 01 09 81 01 09
```

长度
------

类型–长度–数据中的长度指的一定是数据的字节数，数据中嵌套的所有字段也包含在内。 因此，只含有一个元素的 SEQUENCE 长度也不是 1，而是该元素编码后有多少个字节。

长度也有两种编码方式：短编码和长编码。 短编码就是一个字节，取值范围是 0 到 127。

长编码则至少有两个字节。第一个字节的第 8 位必须为 1， 其余 7 位表示这个长度字段还有几个字节。 接下来就是一个多字节整数，给出了长度的具体数值。

可想而知，这样得到的长度值可以非常大。 长度最大时第一个字节是 254（255 是保留值，供将来扩展使用），表示这个长度字段内还有足足 126 个字节。 如果这 126 个字节都是 255，那么实际数据的长度会达到 2<sup>1008</sup>−1 字节（超过 10<sup>294</sup> GB）。

此外，同一长度值的长编码并不唯一，比如一个字节的数字可以拿两个字节表示，短编码就能表示的数字也可以用长编码。 所以 DER 规定必须采用最短的编码方式。

安全警示：不要轻信长度字段的值！ 举例来说，待解码的数据流究竟有没有该字段显示的那么长还是需要核实的。

不定长编码
-----------------

在 BER 中，字符串、SEQUENCE、SEQUENCE OF、SET 和 SET OF 类型的字段即使事先不知道长度也可以直接编码，通过数据流输出就可以采用这种方式。 具体方法是将长度字段设为一个字节 0x80，数据中连续存放若干个编码后的字段，最后以两个字节 `00 00`（可以认为是一个标签和长度都为 0 的字段）结尾。 例如，UTF8String 的不定长编码就是若干个 UTF8String 拼接在一起，然后在末尾加上 `00 00`。

不定长编码还可以任意嵌套。 例如，在 UTF8String 的不定长编码中，待拼接的每一段 UTF8String 本身也可以选用定长或不定长编码。

作为长度的 0x80 字节并不存在歧义，因为它既不是短编码，也不是长编码。 它的第 8 位是 1，按理说应该是长编码，其余 7 位表示还有多少个字节。 但这 7 位都是 0，说明长度要用 0 个字节来表示，这是不允许的。

DER 禁止使用不定长编码， 所以必须使用定长编码，提前写明数据的实际长度。

单一字段与复合字段
------------------------

标签中第一个字节的第 6 位表示该字段是单一（primitive）字段还是复合（constructed）字段。 单一字段中存储的就是数据本身，比如 UTF8String 的数据就是经过 UTF-8 编码的字符串。 复合字段存储的则是若干其他字段，经过编码后拼接在一起。 例如“不定长编码”一节中提到的不定长 UTF8String 就会有多个 UTF8String 字段（各有标签和长度）编码后连在一起，形成复合字段。 复合字段的长度便是拼接后各字段的总字节数。 复合字段可以采用定长或不定长编码， 而单一字段只能用定长编码，因为其数据中没有其他字段，也就无法表明数据该在哪里结束。

INTEGER、OBJECT IDENTIFIER 和 NULL 类型必须是单一字段， 而 SEQUENCE、SEQUENCE OF、SET 和 SET OF 类型必须是复合字段（因为它们的作用本来就是存放多个元素）。 BIT STRING、OCTET STRING、UTCTime、GeneralizedTime 还有各种字符串类型既可以是单一字段，也可以是复合字段，在 BER 中编码者可以自行决定， 但在 DER 中凡是单一、复合均可的类型都必须用单一字段。

EXPLICIT 与 IMPLICIT
--------------------

前面提到的 `[1]`、`[APPLICATION 8]` 等[编码指令](#%E7%BC%96%E7%A0%81%E6%8C%87%E4%BB%A4)还可以加上 EXPLICIT 或 IMPLICIT 关键字。以 [RFC5280](https://tools.ietf.org/html/rfc5280#page-117) 为例：

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

这两个关键字定义的是标签的编码方式，与标签值是明确写出还是自动分配无关。事实上使用这两个关键字时都必须在方括号中写明标签的值。 IMPLICIT 字段的编码方式与其原始类型相同，只是标签的值和类别由方括号中的内容决定。 EXPLICIT 字段则需要先将数据按原始类型编码，再将编码结果套入另一字段中。 外层字段的标签值和类别再由方括号中的内容决定，而且一定是[复合字段](#%E5%8D%95%E4%B8%80%E5%AD%97%E6%AE%B5%E4%B8%8E%E5%A4%8D%E5%90%88%E5%AD%97%E6%AE%B5)。

例如，若在 ASN.1 的编码指令中加上 IMPLICIT：

```asn1
[5] IMPLICIT UTF8String
```

那么字符串“hi”会被编码为：

```der
85 02 68 69
```

但如果在 ASN.1 的编码指令中加上 EXPLICIT：

```asn1
[5] EXPLICIT UTF8String
```

则字符串“hi”会被编码为：

```der
A5 04 0C 02 68 69
```

如果 IMPLICIT 和 EXPLICIT 关键字都没有出现，默认编码为 EXPLICIT，除非该模块开头指定了“EXPLICIT TAGS”、“IMPLICIT TAGS”或“AUTOMATIC TAGS”。 例如 RFC 5280 定义了两个模块，一个[默认编码为 EXPLICIT](https://tools.ietf.org/html/rfc5280#appendix-A.1)，另一个则导入了前一模块，并将[默认编码设为 IMPLICIT](https://tools.ietf.org/html/rfc5280#appendix-A.2)。 IMPLICIT 编码比 EXPLICIT 编码更短。

AUTOMATIC TAGS 的作用与 IMPLICIT TAGS 相同，只是标签的数值（`[0]`、`[1]` 等等）会在必要时自动分配，比如 SEQUENCE 中存在可省略元素的情况。

各种类型的具体编码
==========================

我们接下来结合具体示例看看各种类型究竟是如何编码的。

INTEGER 的编码
----------------

整数的编码由一个或多个字节组成，采用补码格式，最左侧字节的最高位（即第 8 位）为符号位。 BER 标准中是这样写的：

计算二进制补码的数值时，首先将其各字节的每一位标号，最后一个字节的最低位序号为 0，从这一位开始到第一个字节的最高位序号依次递增， 第 N 位表示的数值为 2<sup>N</sup>。 整个二进制补码的值即为所有等于 1 的二进制位表示的数值的总和（除了最高位），再减去最高位表示的数值（如果最高位为 1）。

例如，这个字节（以二进制表示）等于十进制数字 50：

00110010（即十进制的 2<sup>5</sup> + 2<sup>4</sup> + 2<sup>1</sup> = 50）

这个字节（以二进制表示）则等于十进制数字 −100：

10011100（即十进制的 2<sup>4</sup> + 2<sup>3</sup> + 2<sup>2</sup> − 2<sup>7</sup> = −100）

这五个字节（以二进制表示）等于十进制数字 −549755813887：

10000000 00000000 00000000 00000000 00000001（即十进制的 2<sup>0</sup> − 2<sup>39</sup>）

BER 和 DER 都规定整数必须以最短的方式编码。 这一规则是通过以下条件体现的：

```
……第一个字节的每一位和第二个字节的最高位：

1.  既不能同时为 1；
2.  也不能同时为 0。
```

第二项条件的大意就是说，如果编码开头存在零字节，那么把它们删去也不会影响数值。 第二个字节的最高位也很重要，因为有些数值的编码开头必须有零字节。 例如，十进制的 255 需要用两个字节编码：

00000000 11111111

因为一个字节 11111111 表示的是 −1（最高位是符号位）。

第一项条件则最好结合实例来看。 比如十进制数字 −128 的编码为：

10000000（即十进制的 −2<sup>7</sup> = −128）

但是似乎也可以这么编码：

11111111 10000000（还是十进制的 −128，不过是错误的编码）

不难验证，−2<sup>15</sup> + 2<sup>14</sup> + 2<sup>13</sup> + 2<sup>12</sup> + 2<sup>11</sup> + 2<sup>10</sup> + 2<sup>9</sup> + 2<sup>8</sup> + 2<sup>7</sup> = −2<sup>7</sup> = −128。 注意，1 在单字节的 10000000 中是符号位，但在第二个字节中只代表 2<sup>7</sup>。

这种变换具有普遍性：BER（或 DER）编码的任何一个负数都可以在开头加上 11111111 并保持数值不变。 这称为[符号扩展](https://andybargh.com/binary-sign-extension/)。 反过来说，如果一个负数的编码开头是 11111111，将该字节删去同样不会影响数值。 这就是 BER 与 DER 要求使用最短编码的原因。

INTEGER 采用补码表示[对于证书发行影响重大](https://bugzilla.mozilla.org/buglist.cgi?query_format=specific&order=relevance%20desc&bug_status=__closed__&product=NSS&content=%E2%80%9CSerial%20entropy%E2%80%9D&comments=0&list_id=16028758)。RFC 5280 规定证书序列号必须是正数， 但最高位必然是符号位，所以 DER 中 8 个字节只能编码 63 位的序列号， 64 位的正数需要 9 个字节才能编码（尽管第一个字节为 0）。

值为 2<sup>63</sup>+1（恰好是 64 位的正数）的 INTEGER 编码如下：

```der
02 09 00 80 00 00 00 00 00 00 01
```

字符串的编码
---------------

字符串的编码就是其字节序列。 IA5String 和 PrintableString 因为都是 ASCII 的子集，只是范围有所不同，所以它们的编码除了标签以外完全一样。

PrintableString 的“hi”编码为：

```der
13 02 68 69
```

而 IA5String 的“hi”编码为：

```der
16 02 68 69
```

UTF8String 也类似，但它能表示的字符更多。 例如，表情“😎”（U+1F60E Smiling Face With Sunglasses）的编码是：

```der
0c 04 f0 9f 98 8e
```

日期和时间的编码
----------------------

出人意料的是，UTCTime 和 GeneralizedTime 的编码方式其实和字符串一样。 正如上文“类型”一章所述，UTCTime 表示时间的格式是 YYMMDDhhmmss， GeneralizedTime 则在其基础上将 YY 改成了四位年份 YYYY。 二者最后都可以加上时区，或者加一个 Z 表示协调世界时（UTC）。

例如，太平洋标准时间（PST，即 UTC−8）的 2019 年 12 月 15 日 19:02:10 用 UTCTime 表示为 191215190210-0800， 用 BER 编码就是：

```der
17 11 31 39 31 32 31 35 31 39 30 32 31 30 2d 30 38 30 30
```

BER 编码中，UTCTime 和 GeneralizedTime 的秒数都可以省略，并且可以使用各种时区。 但在 DER 编码（及 RFC 5280）中，秒数则不能省略，且不能出现小数，时区也只能用 Z，表示协调世界时。

上述时间如果用 DER 编码则是：

```der
17 0d 31 39 31 32 31 36 30 33 30 32 31 30 5a
```

OBJECT IDENTIFIER 的编码
--------------------------

如[上文所述](#object-identifier)，OID 的实质就是一串整数， 而且至少由两个整数组成。 第一个数必须是 0、1、2 三者之一， 如果是 0 或 1，则第二个数必须小于 40。 因此，前两个数 X 和 Y 可以直接用 40×X+Y 来表示，不会产生歧义。

以 2.999.3 的编码为例，首先要将前两个数合并成 1079（即 40×2+999），得到 1079.3。

完成合并后再用 Base 128 编码，左侧为高位字节。 也就是说，每个字节的最高位设为 1，但最后一个字节最高位设为 0，表示一个整数到此结束。各字节的其余七位从高到低依次相连表示数值。 例如数字 3 就用一个字节 0x03 表示， 而 129 则需要两个字节 0x81 0x01。 每个数字都如此转换成字节后，拼接在一起就形成了 OID 的编码。

无论是在 BER 还是 DER 中，OID 都必须用最短的方式编码。 所以其中每个数字编码时开头都不能出现 0x80 字节。

例如，OID 1.2.840.113549.1.1.11（代表 [sha256WithRSAEncryption](https://tools.ietf.org/html/rfc8017#appendix-A.2.4)）的编码是：

```der
06 09 2a 86 48 86 f7 0d 01 01 0b
```

NULL 的编码
-------------

NULL 字段的长度永远为 0，所以它的编码只有标签和长度：

```der
05 00
```

SEQUENCE 的编码
-----------------

首先需要注意的是，SEQUENCE 必然是复合字段，因为它的作用就是容纳其他对象。 换句话说，SEQUENCE 中的数据就是其元素各自编码后按定义中的顺序拼接在一起组成的。 因此，SEQUENCE 标签的第 6 位（[单一/复合字段](#%E5%8D%95%E4%B8%80%E5%AD%97%E6%AE%B5%E4%B8%8E%E5%A4%8D%E5%90%88%E5%AD%97%E6%AE%B5)位）一定是 1。 虽然 SEQUENCE 本来的标签是 0x10，但在编码中一定会以 0x30 的形式出现。

SEQUENCE 的定义中标为 OPTIONAL 的字段可以省略，省略后就会直接从编码中消失。 读取 SEQUENCE 的内容时，解码器可以根据标签和已读入的元素确定正在读取的是哪个字段。 如果存在歧义，比如有同类型的元素，则在 ASN.1 模块中必须借助[编码指令](#%E7%BC%96%E7%A0%81%E6%8C%87%E4%BB%A4)为这些元素分配不同的标签。

标有 DEFAULT 的字段与 OPTIONAL 类似。 如果该字段取默认值，在 BER 编码中就可以予以省略， 而在 DER 编码中则必须省略。

例如，RFC 5280 中的 [AlgorithmIdentifier](https://tools.ietf.org/html/rfc5280#page-118) 就是 SEQUENCE 类型：

```asn1
   AlgorithmIdentifier  ::=  SEQUENCE  {
        algorithm               OBJECT IDENTIFIER,
        parameters              ANY DEFINED BY algorithm OPTIONAL  }
```

algorithm 为 1.2.840.113549.1.1.11 的 AlgorithmIdentifier 编码如下。 RFC 8017 [建议这种算法对应的 parameters 字段应为 NULL](https://tools.ietf.org/html/rfc8017#appendix-A.2)。

```der
30 0d 06 09 2a 86 48 86 f7 0d 01 01 0b 05 00
```

SEQUENCE OF 的编码
--------------------

SEQUENCE OF 的编码方式与 SEQUENCE 完全相同， 甚至连标签都一样！ 解码时也只有查阅 ASN.1 模块才能确定一个字段究竟是 SEQUENCE 还是 SEQUENCE OF。

例如以下是一个 SEQUENCE OF 对象的编码，其中包含 7、8、9 三个 INTEGER。

```der
30 09 02 01 07 02 01 08 02 01 09
```

SET 的编码
------------

与 SEQUENCE 一样，SET 也一定是复合字段，其数据总是由若干个字段的编码组成的。 它的标签是 0x11， 但因为[单一/复合字段](#%E5%8D%95%E4%B8%80%E5%AD%97%E6%AE%B5%E4%B8%8E%E5%A4%8D%E5%90%88%E5%AD%97%E6%AE%B5)位（第 6 位）必须为 1，所以在编码中实际上是 0x31。

SET 的编码方式也和 SEQUENCE 类似，OPTIONAL 和 DEFAULT 字段如果省略或取默认值就不会出现， 任何由类型相同导致的歧义都需要在 ASN.1 模块中解决，并且取默认值的 DEFAULT 字段在 DER 编码中必须省略。

BER 编码对 SET 中元素的顺序没有要求， 但在 DER 中各元素必须按标签值升序排列。

SET OF 的编码
---------------

SET OF 的编码方式和 SET 一样，标签也是 0x31。 DER 编码同样规定 SET OF 中的字段要按升序排列。 因为 SET OF 中所有元素的类型都一样，仅靠标签排序是不够的。 所以 SET OF 中的元素以编码后的字节序为准，编码较短的就先在最后补齐零字节再作排序。

BIT STRING 的编码
-------------------

一个 N 位的 BIT STRING 用 N/8 个字节（向上取整）来编码，开头还有一个字节的前缀，当 N 不是 8 的倍数时可以指明最后有几个二进制位是无用的。 例如，编码 18 个二进制位 011011100101110111 至少需要三个字节， 但三个字节其实足以存放 24 个二进制位， 有 6 位是用不上的。 这 6 位就放在末尾，于是最终编码为：

```der
03 04 06 6e 5d c0
```

在 BER 中这些无用的二进制位可以取任意值，所以最后一个字节也可以是 c1、c2、c3 等等。 DER 则要求无用的位都必须为 0。

OCTET STRING 的编码
---------------------

OCTET STRING 的编码就是其中包含的所有字节。 例如，包含四个字节 03 02 06 A0 的 OCTET STRING 的编码为：

```der
04 04 03 02 06 A0
```

CHOICE 和 ANY 的编码
-----------------------

CHOICE 和 ANY 的编码与其最终表示的实际类型一致，但也可以通过编码指令更改。 假如一份 ASN.1 相关规范要求某一个 CHOICE 字段必须是 INTEGER 或 UTCTime，而现在该字段恰好属于 INTEGER，那就按 INTEGER 编码即可。

但实际应用中 CHOICE 往往都有编码指令。 比如在 RFC 5280 的下列定义中，rfc822Name 和 dNSName 的类型都是 IA5String，只有靠编码指令才能区分。

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

举例来说，如果一个 GeneralName 里包含的是 rfc822Name，值为 `a@example.com`，则编码如下（回忆一下，\[1\] 表示标签值为 1，类别为特定语境标签，即第 8 位为 1，并且标签编码方式为 IMPLICIT）：

```der
81 0d 61 40 65 78 61 6d 70 6c 65 2e 63 6f 6d
```

如果 GeneralName 里包含的是 dNSName，值为“example.com”，编码则是：

```der
82 0b 65 78 61 6d 70 6c 65 2e 63 6f 6d
```

安全性
======

解码 BER 和 DER 格式时必须格外小心，尤其是在 C、C++ 等非内存安全的编程语言中。 各种解码器的安全漏洞可谓罄竹难书， 而解析用户输入本身就是[安全问题的一大来源](http://langsec.org/)。 ASN.1 编码与漏洞近乎[如影随形](https://bugzilla.redhat.com/show_bug.cgi?id=1300257)， 毕竟这种格式颇为复杂，各种不定长度的字段不计其数， 连长度字段本身都没有固定长度！ 另一方面，ASN.1 格式的数据又往往来自潜在的攻击者， 所以如果要靠数字证书验证用户身份，不能光考虑如何解码正确的证书，还得应对五花八门的恶意输入，以免 ASN.1 代码中存在漏洞而被攻陷。

面对这些问题，最好的解决办法就是尽可能使用内存安全的编程语言， 并且无论能否使用这类语言，都应当借助现成的 [ASN.1 编译器](https://www.itu.int/en/ITU-T/asn1/Pages/Tools.aspx)生成解析程序，而非闭门造车，自行编写解码器。

致谢
================

首先我要向 [A Layman's Guide to a Subset of ASN.1, DER, and BER](http://luca.ntop.org/Teaching/Appunti/asn1.html) 致以诚挚的敬意，本文中的大部分知识我都是从这份材料中学到的。 我还要感谢另一篇佳作 [A warm welcome to DNS](https://powerdns.org/hello-dns/) 的作者，其文风也奠定了本文的笔法基调。

一点题外话
==============

你可曾注意到 PEM 编码的证书开头都是“MII”？ 例如：

```
-----BEGIN CERTIFICATE-----

MIIFajCCBFKgAwIBAgISA6HJW9qjaoJoMn8iU8vTuiQ2MA0GCSqGSIb3DQEBCwUA
...
```

现在你已经能解释原因了！ 证书本身[是一个 SEQUENCE 结构](https://tools.ietf.org/html/rfc5280#page-116)，所以第一个字节是 0x30。 接下来是[长度字段](#%E9%95%BF%E5%BA%A6)， 绝大多数证书都不止 127 个字节，所以需要采用长编码， 也就是说第一个字节是 0x80 + N，意味着后面还有 N 个字节表示长度。 N 一般都是 2，因为大多数证书的长度都在 128 至 65535 个字节之间，只需要两个字节表示。

于是我们可以得知 DER 格式的证书前两个字节是 0x30 0x82。 但 [PEM](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) 采用了 [Base64 编码](https://en.wikipedia.org/wiki/Base64)，将每 3 个二进制字节转换成 4 个 ASCII 字符。 换句话说，Base64 是将 24 个二进制位写成 4 个 ASCII 字符，每个字符表示 6 个二进制位。 我们已经知道证书的前 16 位是什么了， 要证明（几乎）所有证书开头都是“MII”，还需确定接下来的两个二进制位。 这两位正是长度字节的最高位， 它们会是 1 吗？ 那这个证书就非得超过 16383 个字节不可！ 由此我们可以断定 PEM 证书开头的几个字符都是相同的。 你不妨也试试看：

```bash
xxd -r -p <<<308200 | base64
```
