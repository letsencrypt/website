---
author: Jacob Hoffman-Andrews, Boulder developer
date: 2018-04-04T20:00:00Z
excerpt: How Signed Certificate Timestamps get embedded in certificates
title: "Engineering deep dive: Encoding of SCTs in certificates"
slug: sct-encoding
---

Let's Encrypt recently [launched SCT embedding in
certificates](https://community.letsencrypt.org/t/signed-certificate-timestamps-embedded-in-certificates/57187).
This feature allows browsers to check that a certificate was submitted to a
[Certificate Transparency](https://en.wikipedia.org/wiki/Certificate_Transparency)
log. As part of the launch, we did a thorough review
that the encoding of Signed Certificate Timestamps (SCTs) in our certificates
matches the relevant specifications. In this post, I'll dive into the details.
You'll learn more about X.509, ASN.1, DER, and TLS encoding, with references to
the relevant RFCs.

Certificate Transparency offers three ways to deliver SCTs to a browser: In a
TLS extension, in stapled OCSP, or embedded in a certificate. We chose to
implement the embedding method because it would just work for Let's Encrypt
subscribers without additional work. In the SCT embedding method, we submit
a "precertificate" with a [poison extension](#poison) to a set of
CT logs, and get back SCTs. We then issue a real certificate based on the
precertificate, with two changes: The poison extension is removed, and the SCTs
obtained earlier are added in another extension.

Given a certificate, let's first look for the SCT list extension. According to CT ([RFC 6962
section 3.3](https://tools.ietf.org/html/rfc6962#section-3.3)),
the extension OID for a list of SCTs is `1.3.6.1.4.1.11129.2.4.2`. An [OID (object
ID)](http://www.hl7.org/Oid/information.cfm) is a series of integers, hierarchically
assigned and globally unique. They are used extensively in X.509, for instance
to uniquely identify extensions.

We can [download an example certificate](https://acme-v01.api.letsencrypt.org/acme/cert/031f2484307c9bc511b3123cb236a480d451),
and view it using OpenSSL (if your OpenSSL is old, it may not display the
detailed information):

```
$ openssl x509 -noout -text -inform der -in Downloads/031f2484307c9bc511b3123cb236a480d451
...
CT Precertificate SCTs:
    Signed Certificate Timestamp:
        Version   : v1(0)
        Log ID    : DB:74:AF:EE:CB:29:EC:B1:FE:CA:3E:71:6D:2C:E5:B9:
                    AA:BB:36:F7:84:71:83:C7:5D:9D:4F:37:B6:1F:BF:64
        Timestamp : Mar 29 18:45:07.993 2018 GMT
        Extensions: none
        Signature : ecdsa-with-SHA256
                    30:44:02:20:7E:1F:CD:1E:9A:2B:D2:A5:0A:0C:81:E7:
                    13:03:3A:07:62:34:0D:A8:F9:1E:F2:7A:48:B3:81:76:
                    40:15:9C:D3:02:20:65:9F:E9:F1:D8:80:E2:E8:F6:B3:
                    25:BE:9F:18:95:6D:17:C6:CA:8A:6F:2B:12:CB:0F:55:
                    FB:70:F7:59:A4:19
    Signed Certificate Timestamp:
        Version   : v1(0)
        Log ID    : 29:3C:51:96:54:C8:39:65:BA:AA:50:FC:58:07:D4:B7:
                    6F:BF:58:7A:29:72:DC:A4:C3:0C:F4:E5:45:47:F4:78
        Timestamp : Mar 29 18:45:08.010 2018 GMT
        Extensions: none
        Signature : ecdsa-with-SHA256
                    30:46:02:21:00:AB:72:F1:E4:D6:22:3E:F8:7F:C6:84:
                    91:C2:08:D2:9D:4D:57:EB:F4:75:88:BB:75:44:D3:2F:
                    95:37:E2:CE:C1:02:21:00:8A:FF:C4:0C:C6:C4:E3:B2:
                    45:78:DA:DE:4F:81:5E:CB:CE:2D:57:A5:79:34:21:19:
                    A1:E6:5B:C7:E5:E6:9C:E2
```

Now let's go a little deeper. How is that extension represented in
the certificate? Certificates are expressed in
 [ASN.1](https://en.wikipedia.org/wiki/Abstract_Syntax_Notation_One),
which generally refers to both a language for expressing data structures
and a set of formats for encoding them. The most common format,
 [DER](https://en.wikipedia.org/wiki/X.690#DER_encoding),
is a tag-length-value format. That is, to encode an object, first you write
down a tag representing its type (usually one byte), then you write
down a number expressing how long the object is, then you write down
the object contents. This is recursive: An object can contain multiple
objects within it, each of which has its own tag, length, and value.

One of the cool things about DER and other tag-length-value formats is that you
can decode them to some degree without knowing what they mean. For instance, I
can tell you that 0x30 means the data type "SEQUENCE" (a struct, in ASN.1
terms), and 0x02 means "INTEGER", then give you this hex byte sequence to
decode:

```
30 06 02 01 03 02 01 0A
```

You could tell me right away that decodes to:

```
SEQUENCE
  INTEGER 3
  INTEGER 10
```

Try it yourself with this great [JavaScript ASN.1
decoder](https://lapo.it/asn1js/#300602010302010A). However, you wouldn't know
what those integers represent without the corresponding ASN.1 schema (or
"module"). For instance, if you knew that this was a piece of DogData, and the
schema was:

```
DogData ::= SEQUENCE {
    legs           INTEGER,
    cutenessLevel  INTEGER
}
```

You'd know this referred to a three-legged dog with a cuteness level of 10.

We can take some of this knowledge and apply it to our certificates. As a first
step, convert the above certificate to hex with
`xxd -ps < Downloads/031f2484307c9bc511b3123cb236a480d451`. You can then copy
and paste the result into
[lapo.it/asn1js](https://lapo.it/asn1js) (or use [this handy link](https://lapo.it/asn1js/#3082062F30820517A0030201020212031F2484307C9BC511B3123CB236A480D451300D06092A864886F70D01010B0500304A310B300906035504061302555331163014060355040A130D4C6574277320456E6372797074312330210603550403131A4C6574277320456E637279707420417574686F72697479205833301E170D3138303332393137343530375A170D3138303632373137343530375A302D312B3029060355040313223563396137662E6C652D746573742E686F66666D616E2D616E64726577732E636F6D30820122300D06092A864886F70D01010105000382010F003082010A0282010100BCEAE8F504D9D91FCFC69DB943254A7FED7C6A3C04E2D5C7DDD010CBBC555887274489CA4F432DCE6D7AB83D0D7BDB49C466FBCA93102DC63E0EB1FB2A0C50654FD90B81A6CB357F58E26E50F752BF7BFE9B56190126A47409814F59583BDD337DFB89283BE22E81E6DCE13B4E21FA6009FC8A7F903A17AB05C8BED85A715356837E849E571960A8999701EAE9CE0544EAAB936B790C3C35C375DB18E9AA627D5FA3579A0FB5F8079E4A5C9BE31C2B91A7F3A63AFDFEDB9BD4EA6668902417D286BE4BBE5E43CD9FE1B8954C06F21F5C5594FD3AB7D7A9CBD6ABF19774D652FD35C5718C25A3BA1967846CED70CDBA95831CF1E09FF7B8014E63030CE7A776750203010001A382032A30820326300E0603551D0F0101FF0404030205A0301D0603551D250416301406082B0601050507030106082B06010505070302300C0603551D130101FF04023000301D0603551D0E041604148B3A21ABADF50C4B30DCCD822724D2C4B9BA29E3301F0603551D23041830168014A84A6A63047DDDBAE6D139B7A64565EFF3A8ECA1306F06082B0601050507010104633061302E06082B060105050730018622687474703A2F2F6F6373702E696E742D78332E6C657473656E63727970742E6F7267302F06082B060105050730028623687474703A2F2F636572742E696E742D78332E6C657473656E63727970742E6F72672F302D0603551D110426302482223563396137662E6C652D746573742E686F66666D616E2D616E64726577732E636F6D3081FE0603551D200481F63081F33008060667810C0102013081E6060B2B0601040182DF130101013081D6302606082B06010505070201161A687474703A2F2F6370732E6C657473656E63727970742E6F72673081AB06082B0601050507020230819E0C819B54686973204365727469666963617465206D6179206F6E6C792062652072656C6965642075706F6E2062792052656C79696E67205061727469657320616E64206F6E6C7920696E206163636F7264616E636520776974682074686520436572746966696361746520506F6C69637920666F756E642061742068747470733A2F2F6C657473656E63727970742E6F72672F7265706F7369746F72792F30820104060A2B06010401D6790204020481F50481F200F0007500DB74AFEECB29ECB1FECA3E716D2CE5B9AABB36F7847183C75D9D4F37B61FBF64000001627313EB19000004030046304402207E1FCD1E9A2BD2A50A0C81E713033A0762340DA8F91EF27A48B3817640159CD30220659FE9F1D880E2E8F6B325BE9F18956D17C6CA8A6F2B12CB0F55FB70F759A419007700293C519654C83965BAAA50FC5807D4B76FBF587A2972DCA4C30CF4E54547F478000001627313EB2A0000040300483046022100AB72F1E4D6223EF87FC68491C208D29D4D57EBF47588BB7544D32F9537E2CEC10221008AFFC40CC6C4E3B24578DADE4F815ECBCE2D57A579342119A1E65BC7E5E69CE2300D06092A864886F70D01010B0500038201010095F87B663176776502F792DDD232C216943C7803876FCBEB46393A36354958134482E0AFEED39011618327C2F0203351758FEB420B73CE6C797B98F88076F409F3903F343D1F5D9540F41EF47EB39BD61B62873A44F00B7C8B593C6A416458CF4B5318F35235BC88EABBAA34F3E3F81BD3B047E982EE1363885E84F76F2F079F2B6EEB4ECB58EFE74C8DE7D54DE5C89C4FB5BB0694B837BD6F02BAFD5A6C007D1B93D25007BDA9B2BDBF82201FE1B76B628CE34E2D974E8E623EC57A5CB53B435DD4B9993ADF6BA3972F2B29D259594A94E17BBE06F34AAE5CF0F50297548C4DFFC5566136F78A3D3B324EAE931A14EB6BE6DA1D538E48CF077583C67B52E7E8)). You can also run `openssl asn1parse -i -inform der -in Downloads/031f2484307c9bc511b3123cb236a480d451` to use OpenSSL's parser, which is less easy to use in some ways, but easier to copy and paste.

In the decoded data, we can find the OID `1.3.6.1.4.1.11129.2.4.2`, indicating
the SCT list extension. Per [RFC 5280, section
4.1](https://tools.ietf.org/html/rfc5280#page-17), an extension is defined:

```
Extension  ::=  SEQUENCE  {
      extnID      OBJECT IDENTIFIER,
      critical    BOOLEAN DEFAULT FALSE,
      extnValue   OCTET STRING
                  -- contains the DER encoding of an ASN.1 value
                  -- corresponding to the extension type identified
                  -- by extnID
      }
```

We've found the `extnID`. The "critical" field is omitted because it has the
default value (false). Next up is the `extnValue`. This has the type
`OCTET STRING`, which has the tag "0x04". `OCTET STRING` means "here's
a bunch of bytes!" In this case, as described by the spec, those bytes
happen to contain more DER. This is a fairly common pattern in X.509
to deal with parameterized data. For instance, this allows defining a
structure for extensions without knowing ahead of time all the structures
that a future extension might want to carry in its value. If you're a C
programmer, think of it as a `void*` for data structures. If you prefer Go,
think of it as an `interface{}`.

Here's that `extnValue`:

```
04 81 F5 0481F200F0007500DB74AFEECB29ECB1FECA3E716D2CE5B9AABB36F7847183C75D9D4F37B61FBF64000001627313EB19000004030046304402207E1FCD1E9A2BD2A50A0C81E713033A0762340DA8F91EF27A48B3817640159CD30220659FE9F1D880E2E8F6B325BE9F18956D17C6CA8A6F2B12CB0F55FB70F759A419007700293C519654C83965BAAA50FC5807D4B76FBF587A2972DCA4C30CF4E54547F478000001627313EB2A0000040300483046022100AB72F1E4D6223EF87FC68491C208D29D4D57EBF47588BB7544D32F9537E2CEC10221008AFFC40CC6C4E3B24578DADE4F815ECBCE2D57A579342119A1E65BC7E5E69CE2
```

That's tag "0x04", meaning `OCTET STRING`, followed by "0x81 0xF5", meaning
"this string is 245 bytes long" (the 0x81 prefix is part of [variable length
number encoding](#variable-length)).

According to [RFC 6962, section
3.3](https://tools.ietf.org/html/rfc6962#section-3.3), "obtained SCTs
can be directly embedded in the final certificate, by encoding the
SignedCertificateTimestampList structure as an ASN.1 `OCTET STRING`
and inserting the resulting data in the TBSCertificate as an X.509v3
certificate extension"

So, we have an `OCTET STRING`, all's good, right? Except if you remove the
tag and length from extnValue to get its value, you're left with:

```
04 81 F2 00F0007500DB74AFEEC...
```

There's that "0x04" tag again, but with a shorter length. Why
do we nest one `OCTET STRING` inside another?  It's because the
contents of extnValue are required by RFC 5280 to be valid DER, but a
SignedCertificateTimestampList is not encoded using DER (more on that
in a minute). So, by RFC 6962, a SignedCertificateTimestampList is wrapped in an
`OCTET STRING`, which is wrapped in another `OCTET STRING` (the extnValue).

Once we decode that second `OCTET STRING`, we're left with the contents:

```
00F0007500DB74AFEEC...
```

"0x00" isn't a valid tag in DER. What is this? It's TLS encoding. This is
defined in [RFC 5246, section 4](https://tools.ietf.org/html/rfc5246#section-4)
(the TLS 1.2 RFC). TLS encoding, like ASN.1, has both a way to define data
structures and a way to encode those structures. TLS encoding differs
from DER in that there are no tags, and lengths are only encoded when necessary for
variable-length arrays. Within an encoded structure, the type of a field is determined by
its position, rather than by a tag. This means that TLS-encoded structures are
more compact than DER structures, but also that they can't be processed without
knowing the corresponding schema. For instance, here's the top-level schema from
[RFC 6962, section 3.3](https://tools.ietf.org/html/rfc6962#section-3.3):

```
   The contents of the ASN.1 OCTET STRING embedded in an OCSP extension
   or X509v3 certificate extension are as follows:

        opaque SerializedSCT<1..2^16-1>;

        struct {
            SerializedSCT sct_list <1..2^16-1>;
        } SignedCertificateTimestampList;

   Here, "SerializedSCT" is an opaque byte string that contains the
   serialized TLS structure.
```

Right away, we've found one of those variable-length arrays. The length of such
an array (in bytes) is always represented by a length field just big enough to
hold the max array size. The max size of an `sct_list` is 65535 bytes, so the
length field is two bytes wide. Sure enough, those first two bytes are "0x00
0xF0", or 240 in decimal. In other words, this `sct_list` will have 240 bytes. We
don't yet know how many SCTs will be in it. That will become clear only by
continuing to parse the encoded data and seeing where each struct ends (spoiler
alert: there are two SCTs!).

Now we know the first SerializedSCT starts with `0075...`. SerializedSCT
is itself a variable-length field, this time containing `opaque` bytes (much like `OCTET STRING`
back in the ASN.1 world). Like SignedCertificateTimestampList, it has a max size
of 65535 bytes, so we pull off the first two bytes and discover that the first
SerializedSCT is 0x0075 (117 decimal) bytes long. Here's the whole thing, in
hex:

```
00DB74AFEECB29ECB1FECA3E716D2CE5B9AABB36F7847183C75D9D4F37B61FBF64000001627313EB19000004030046304402207E1FCD1E9A2BD2A50A0C81E713033A0762340DA8F91EF27A48B3817640159CD30220659FE9F1D880E2E8F6B325BE9F18956D17C6CA8A6F2B12CB0F55FB70F759A419
```

This can be decoded using the TLS encoding struct defined in [RFC 6962, section
3.2](https://tools.ietf.org/html/rfc6962#page-13):

```
enum { v1(0), (255) }
 Version;

struct {
   opaque key_id[32];
} LogID;

opaque CtExtensions<0..2^16-1>;
...

struct {
   Version sct_version;
   LogID id;
   uint64 timestamp;
   CtExtensions extensions;
   digitally-signed struct {
       Version sct_version;
       SignatureType signature_type = certificate_timestamp;
       uint64 timestamp;
       LogEntryType entry_type;
       select(entry_type) {
           case x509_entry: ASN.1Cert;
           case precert_entry: PreCert;
       } signed_entry;
      CtExtensions extensions;
   };
} SignedCertificateTimestamp;
```

Breaking that down:

```
# Version sct_version v1(0)
00
# LogID id (aka opaque key_id[32])
DB74AFEECB29ECB1FECA3E716D2CE5B9AABB36F7847183C75D9D4F37B61FBF64
# uint64 timestamp (milliseconds since the epoch)
000001627313EB19
# CtExtensions extensions (zero-length array)
0000
# digitally-signed struct
04030046304402207E1FCD1E9A2BD2A50A0C81E713033A0762340DA8F91EF27A48B3817640159CD30220659FE9F1D880E2E8F6B325BE9F18956D17C6CA8A6F2B12CB0F55FB70F759A419
```

To understand the "digitally-signed struct," we need to turn back to [RFC 5246,
section 4.7](https://tools.ietf.org/html/rfc5246#section-4.7). It says:

```
A digitally-signed element is encoded as a struct DigitallySigned:

struct {
   SignatureAndHashAlgorithm algorithm;
   opaque signature<0..2^16-1>;
} DigitallySigned;
```

And in [section
7.4.1.4.1](https://tools.ietf.org/html/rfc5246#section-7.4.1.4.1):

```
enum {
    none(0), md5(1), sha1(2), sha224(3), sha256(4), sha384(5),
    sha512(6), (255)
} HashAlgorithm;

enum { anonymous(0), rsa(1), dsa(2), ecdsa(3), (255) }
  SignatureAlgorithm;

struct {
      HashAlgorithm hash;
      SignatureAlgorithm signature;
} SignatureAndHashAlgorithm;
```

We have "0x0403", which corresponds to sha256(4) and ecdsa(3). The next two
bytes, "0x0046", tell us the length of the "opaque signature" field, 70 bytes in
decimal. To decode the signature, we reference [RFC 4492 section
5.4](https://tools.ietf.org/html/rfc4492#page-20), which says:

```
The digitally-signed element is encoded as an opaque vector <0..2^16-1>, the
contents of which are the DER encoding corresponding to the
following ASN.1 notation.

Ecdsa-Sig-Value ::= SEQUENCE {
   r       INTEGER,
   s       INTEGER
}
```

Having dived through two layers of TLS encoding, we are now back in ASN.1 land!
We
[decode](https://lapo.it/asn1js/#304402207E1FCD1E9A2BD2A50A0C81E713033A0762340DA8F91EF27A48B3817640159CD30220659FE9F1D880E2E8F6B325BE9F18956D17C6CA8A6F2B12CB0F55FB70F759A419)
the remaining bytes into a SEQUENCE containing two INTEGERS. And we're done! Here's the whole
extension decoded:

```
# Extension SEQUENCE - RFC 5280
30
# length 0x0104 bytes (260 decimal)
820104
  # OBJECT IDENTIFIER
  06
  # length 0x0A bytes (10 decimal)
  0A
    # value (1.3.6.1.4.1.11129.2.4.2)
    2B06010401D679020402
  # OCTET STRING
  04
  # length 0xF5 bytes (245 decimal)
  81F5
    # OCTET STRING (embedded) - RFC 6962
    04
    # length 0xF2 bytes (242 decimal)
    81F2
    # Beginning of TLS encoded SignedCertificateTimestampList - RFC 5246 / 6962
    # length 0xF0 bytes
    00F0
      # opaque SerializedSCT<1..2^16-1>
      # length 0x75 bytes
      0075
      # Version sct_version v1(0)
      00
      # LogID id (aka opaque key_id[32])
      DB74AFEECB29ECB1FECA3E716D2CE5B9AABB36F7847183C75D9D4F37B61FBF64
      # uint64 timestamp (milliseconds since the epoch)
      000001627313EB19
      # CtExtensions extensions (zero-length array)
      0000
      # digitally-signed struct - RFC 5426
      # SignatureAndHashAlgorithm (ecdsa-sha256)
      0403
      # opaque signature<0..2^16-1>;
      # length 0x0046
      0046
        # DER-encoded Ecdsa-Sig-Value - RFC 4492
        30 # SEQUENCE
        44 # length 0x44 bytes
          02 # r INTEGER
          20 # length 0x20 bytes
            # value
            7E1FCD1E9A2BD2A50A0C81E713033A0762340DA8F91EF27A48B3817640159CD3
          02 # s INTEGER
          20 # length 0x20 bytes
            # value
            659FE9F1D880E2E8F6B325BE9F18956D17C6CA8A6F2B12CB0F55FB70F759A419
      # opaque SerializedSCT<1..2^16-1>
      # length 0x77 bytes
      0077
      # Version sct_version v1(0)
      00
      # LogID id (aka opaque key_id[32])
      293C519654C83965BAAA50FC5807D4B76FBF587A2972DCA4C30CF4E54547F478
      # uint64 timestamp (milliseconds since the epoch)
      000001627313EB2A
      # CtExtensions extensions (zero-length array)
      0000
      # digitally-signed struct - RFC 5426
      # SignatureAndHashAlgorithm (ecdsa-sha256)
      0403
      # opaque signature<0..2^16-1>;
      # length 0x0048
      0048
        # DER-encoded Ecdsa-Sig-Value - RFC 4492
        30 # SEQUENCE
        46 # length 0x46 bytes
          02 # r INTEGER
          21 # length 0x21 bytes
            # value
            00AB72F1E4D6223EF87FC68491C208D29D4D57EBF47588BB7544D32F9537E2CEC1
          02 # s INTEGER
          21 # length 0x21 bytes
            # value
            008AFFC40CC6C4E3B24578DADE4F815ECBCE2D57A579342119A1E65BC7E5E69CE2
```

One surprising thing you might notice: In the first SCT, `r` and `s` are twenty
bytes long. In the second SCT, they are both twenty-one bytes long, and have a
leading zero. Integers in DER are two's complement, so if the leftmost bit is
set, they are interpreted as negative. Since `r` and `s` are positive, if the
leftmost bit would be a 1, an extra byte has to be added so that the leftmost
bit can be 0.

This is a little taste of what goes into encoding a certificate. I hope it was
informative! If you'd like to learn more, I recommend "[A Layman's Guide to a
Subset of ASN.1, BER, and DER](http://luca.ntop.org/Teaching/Appunti/asn1.html)."

<a name="poison"></a>Footnote 1: A "poison extension" is defined by [RFC 6962
section 3.1](https://tools.ietf.org/html/rfc6962#section-3.1):

```
The Precertificate is constructed from the certificate to be issued by adding a special
critical poison extension (OID `1.3.6.1.4.1.11129.2.4.3`, whose
extnValue OCTET STRING contains ASN.1 NULL data (0x05 0x00))
```

In other words, it's an empty extension whose only purpose is to ensure that
certificate processors will not accept precertificates as valid certificates. The
specification ensures this by setting the "critical" bit on the extension, which
ensures that code that doesn't recognize the extension will reject the whole
certificate. Code that does recognize the extension specifically as poison
will also reject the certificate.

<a name="variable-length"></a>Footnote 2: Lengths from 0-127 are represented by
a single byte (short form). To express longer lengths, more bytes are used (long form).
The high bit (0x80) on the first byte is set to distinguish long form from short
form. The remaining bits are used to express how many more bytes to read for the
length. For instance, 0x81F5 means "this is long form because the length is
greater than 127, but there's still only one byte of length (0xF5) to decode."
