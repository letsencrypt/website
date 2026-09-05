---
title: Ett varmt välkomnande till ASN.1 och DER
slug: a-warm-welcome-to-asn1-and-der
lastmod: 2021-03-21
---

Detta dokument ger en mild introduktion till datastrukturer och format som definierar de certifikat som används i HTTPS. Det bör vara tillgängligt för alla med lite erfarenhet av datavetenskap och viss bekantskap med certifikat.

Ett HTTPS-certifikat är en typ av fil, precis som vilken annan fil som helst. Dess innehåll följer ett format definierat av [RFC 5280](https://tools.ietf.org/html/rfc5280). Definitionerna uttrycks i ASN.1, som är ett språk som används för att definiera filformat eller (ekvivalent) datastrukturer. Till exempel, i C kan du skriva:

```c
struct point {
  int x, y;
  char label[10];
};
```

I Go skulle du skriva:

```go
type point struct {
  x, y int
  label string
}
```

Och i ASN.1 skulle du skriva:

```asn1
Point ::= SEQUENCE {
  x INTEGER,
  y INTEGER,
  label UTF8String
}
```

Fördelen med att skriva ASN.1-definitioner istället för Go- eller C-definitioner är att de är språkoberoende. Du kan implementera ASN.1-definitionen av Point i vilket språk som helst, eller (helst) kan du använda ett verktyg som tar ASN.1-definitionen och automatiskt genererar kod som implementerar den i ditt favoritspråk. En uppsättning ASN.1-definitioner kallas en "[-modul](https://www.obj-sys.com/asn1tutorial/node6.html)."

Det andra viktiga med ASN.1 är att det kommer med en mängd serialiseringsformat--sätt att omvandla en datastruktur i minnet till en serie bytes (eller en fil) och tillbaka igen. Detta gör det möjligt för ett certifikat som genererats av en maskin att läsas av en annan maskin, även om den maskinen använder en annan CPU och operativsystem.

Det finns några andra språk som [gör samma saker](https://en.wikipedia.org/wiki/Interface_description_language) som ASN.1. Till exempel erbjuder Protocol Buffers både ett [språket](https://developers.google.com/protocol-buffers/docs/proto3) för att definiera typer och ett [serialiseringsformat](https://developers.google.com/protocol-buffers/docs/encoding) för att koda objekt av de typer du har definierat. [Thrift](https://thrift.apache.org/) har också både ett språk och ett serialiseringsformat. Antingen Protocol Buffers eller Thrift kunde lika gärna ha använts för att definiera formatet för HTTPS-certifikat, men ASN.1 (1984) hade den betydande fördelen att redan existera när certifikat (1988) och HTTPS (1994) uppfanns.

ASN.1 har reviderats flera gånger genom åren, med upplagor som vanligtvis identifieras av året de publicerades. Detta dokument syftar till att lära ut tillräckligt med ASN.1 för att klart förstå RFC 5280 och andra standarder relaterade till HTTPS-certifikat, så vi kommer främst att prata om upplagan från 1988, med några anteckningar om funktioner som lades till i senare upplagor. Du kan ladda ner de olika upplagorna direkt från ITU, med den reservationen att vissa endast är tillgängliga för ITU-medlemmar. De relevanta standarderna är [X.680](https://www.itu.int/rec/T-REC-X.680) (definierar ASN.1-språket) och [X.690](https://www.itu.int/rec/T-REC-X.690) (definierar serialiseringsformaten DER och BER). Tidigare versioner av dessa standarder var [X.208](https://www.itu.int/rec/T-REC-X.208/en) respektive [X.209](https://www.itu.int/rec/T-REC-X.209/en).

ASN.1:s huvudsakliga serialiseringsformat är "Distinguished Encoding Rules" (DER). De är en variant av "Basic Encoding Rules" (BER) med kanonisering tillagd. Till exempel, om en typ innehåller en SET OF, måste medlemmarna sorteras för DER-serialisering.

Ett certifikat som representeras i DER kodas ofta ytterligare till PEM, som använder [base64](https://en.wikipedia.org/wiki/Base64) för att koda godtyckliga byte som alfanumeriska tecken (och '+' och '/') och lägger till separationsrader ("\-\-\-\--BEGIN CERTIFICATE\-\-\-\--" och "\-\-\-\--END CERTIFICATE\-\-\-\--"). PEM är användbart eftersom det är enklare att kopiera och klistra in.

Detta dokument kommer först att beskriva de typer och notationer som används av ASN.1, och kommer sedan att beskriva hur objekt definierade med ASN.1 kodas. Känn dig fri att bläddra fram och tillbaka mellan sektionerna, särskilt eftersom vissa funktioner i ASN.1-språket direkt specificerar kodningsdetaljer. Detta dokument föredrar mer välbekanta termer och använder därför "byte" istället för "octet," och "värde" istället för "innehåll." Det använder "serialization" och "encoding" omväxlande.

Typerna
=========

INTEGER
-------

Den gamla goda välbekanta INTEGER. Dessa kan vara positiva eller negativa. Det som verkligen är ovanligt med ASN.1 INTEGER är att de kan vara arbiträrt stora. Inte tillräckligt utrymme i en int64? Inga problem. Detta är särskilt användbart för att representera saker som en RSA-modulus, som är mycket större än en int64 (som 2<sup> 2048 </sup> stor). Tekniskt sett finns det ett maximalt heltal i DER, men det är oerhört stort: Längden på ett DER-fält kan uttryckas som en serie av upp till 126 byte. Så det största INTEGER du kan representera i DER är 256<sup> (2**1008) </sup>-1. För ett verkligt obegränsat INTEGER skulle du behöva koda i BER, som tillåter fält av obestämd längd.

Strängar
-------

ASN.1 har många strängtyper: BMPString, GeneralString, GraphicString, IA5String, ISO646String, NumericString, PrintableString, TeletexString, T61String, UniversalString, UTF8String, VideotexString och VisibleString. För HTTPS-certifikat behöver du mest bry dig om PrintableString, UTF8String och [IA5String](https://en.wikipedia.org/wiki/IA5STRING). Strängtypen för ett givet fält definieras av ASN.1-modulen som definierar fältet. [Till exempel](https://tools.ietf.org/html/rfc5280#page-127):

```
CPSuri ::= IA5String
```

PrintableString är en begränsad delmängd av ASCII, som tillåter alfanumeriska tecken, mellanslag och en specifik handfull skiljetecken: `' () + , - . / : = ?`. Anmärkningsvärt är att det inte inkluderar `*` eller `@`. Det finns inga fördelar med lagringsstorlek för mer restriktiva strängtyper.

Vissa fält, som [DirectoryString i RFC 5280](https://tools.ietf.org/html/rfc5280#page-20), tillåter att serialiseringskoden väljer mellan flera strängtyper. Eftersom DER-kodning inkluderar typen av strängen du använder, se till att när du kodar något som PrintableString [verkligen uppfyller kraven för PrintableString](https://community.letsencrypt.org/t/2018-03-12-wildcard-certificate-encoding-issue/55485).

IA5String, baserad på [International Alphabet No. 5](https://en.wikipedia.org/wiki/T.50_(standard)), är mer tillåtande: Den tillåter nästan alla ASCII-tecken och används för e-postadresser, DNS-namn och URL:er i certifikat. Notera att det finns några bytevärden där IA5-betydelsen av bytevärdet skiljer sig från US-ASCII-betydelsen av samma värde.

TeletexString, BMPString och UniversalString är föråldrade för användning i HTTPS-certifikat, men du kan se dem när du parserar äldre CA-certifikat, som är långlivade och kan ha uppkommit före föråldrandet.

Strängar i ASN.1 är inte null-terminerade som strängar i C och C++. Faktum är att det är helt lagligt att ha inbäddade null-bytes. Detta kan orsaka sårbarheter när två system tolkar samma ASN.1-sträng olika. Till exempel kunde vissa CA:er [bli lurade till att utfärda](https://www.theregister.co.uk/2009/07/30/universal_ssl_certificate/) för "example.com\\0.evil.com" baserat på ägande av evil.com. Certifikatvalideringsbibliotek vid den tiden betraktade resultatet som giltigt för "example.com". Var mycket försiktig när du hanterar ASN.1-strängar i C och C++ för att undvika att skapa sårbarheter.

Datum och tider
---------------

Återigen, många tids-typer: UTCTime, GeneralizedTime, DATE, TIME-OF-DAY, DATE-TIME och DURATION. För HTTPS-certifikat behöver du bara bry dig om UTCTime och GeneralizedTime.

UTCTime representerar ett datum och tid som YYMMDDhhmm[ss], med en valfri tidszonförskjutning eller "Z" för att representera Zulu (aka UTC aka 0 tidszonförskjutning). Till exempel representerar UTCTimes 820102120000Z och 820102070000-0500 samma tid: 2 januari 1982, kl 07:00 i New York City (UTC-5) och kl 12:00 UTC.

Eftersom UTCTime är tvetydigt när det gäller om det är 1900-talet eller 2000-talet, [klargör RFC 5280](https://tools.ietf.org/html/rfc5280#section-4.1.2.5.1) att det representerar datum från 1950 till 2050. RFC 5280 kräver också att tidszonen "Z" måste användas och sekunder måste inkluderas.

GeneralizedTime stöder datum efter 2050 genom den enkla åtgärden att representera året med fyra siffror. Det tillåter också bråkdelar av sekunder (konstigt nog, med antingen ett komma eller en punkt som decimalavskiljare). RFC 5280 förbjuder bråkdelar av sekunder och kräver "Z."

OBJECT IDENTIFIER
-----------------

Objektidentifierare är globalt unika, hierarkiska identifierare som består av en sekvens av heltal. De kan avse vilken typ av objekt som helst, men används ofta för att identifiera standarder, algoritmer, certifikattillägg, organisationer eller policydokument. Som exempel: [1.2.840.113549](http://oid-info.com/get/1.2.840.113549) identifierar RSA Security LLC. RSA kan sedan tilldela OIDs som börjar med det prefixet, såsom [1.2.840.113549.1.1.11](http://oid-info.com/get/1.2.840.113549.1.1.11), vilket identifierar sha256WithRSAEncryption, som definieras i [RFC 8017](https://tools.ietf.org/html/rfc8017#page-69).

På samma sätt identifierar [1.3.6.1.4.1.11129](http://oid-info.com/get/1.3.6.1.4.1.11129) Google, Inc. Google tilldelade [1.3.6.1.4.1.11129.2.4.2](http://oid-info.com/get/1.3.6.1.4.1.11129.2.4.2) för att identifiera [SCT-listtillägget](https://letsencrypt.org/2018/04/04/sct-encoding.html) som används i Certificate Transparency (som ursprungligen utvecklades på Google), enligt [RFC 6962](https://tools.ietf.org/html/rfc6962).

Mängden barn-OIDs som kan finnas under ett givet prefix kallas en "OID-båge." Eftersom representationen av kortare OIDs är mindre, anses OID-tilldelningar under kortare bågar vara mer värdefulla, särskilt för format där den OID måste skickas ofta. OID-bågen [2.5](http://oid-info.com/get/2.5) är tilldelad till "Directory Services," serien av specifikationer som inkluderar X.509, vilken HTTPS-certifikat baseras på. Många fält i certifikat börjar med den praktiskt korta bågen. Till exempel betyder [2.5.4.6](http://oid-info.com/get/2.5.4.6) "countryName," medan [2.5.4.10](http://oid-info.com/get/2.5.4.10) betyder "organizationName." Eftersom de flesta certifikat måste koda var och en av dessa OIDs åtminstone en gång, är det praktiskt att de är korta.

OIDs i specifikationer representeras ofta med ett människoläsbart namn för bekvämlighet och kan anges genom sammanfogning med en annan OID. [Till exempel från RFC 8017](https://tools.ietf.org/html/rfc8017#page-68):

```asn1
   pkcs-1    OBJECT IDENTIFIER ::= {
       iso(1) member-body(2) us(840) rsadsi(113549) pkcs(1) 1
   }
   ...

   sha256WithRSAEncryption      OBJECT IDENTIFIER ::= { pkcs-1 11 }
```

NULL
----

NULL är bara NULL, förstår du?

SEQUENCE och SEQUENCE OF
------------------------

Låt inte namnen lura dig: Dessa är två mycket olika typer. En SEQUENCE är motsvarigheten till "struct" i de flesta programmeringsspråk. Den innehåller ett fast antal fält av olika typer. Till exempel, se [certifikatexempel nedan](#bit-string-and-octet-string).

En SEQUENCE OF, å andra sidan, innehåller ett godtyckligt antal fält av en enda typ. Detta är analogt med en array eller en lista i ett programspråk. [Till exempel](https://tools.ietf.org/html/rfc5280#page-116):

```asn1
   RDNSequence ::= SEQUENCE OF RelativeDistinguishedName
```

Det kan vara 0, 1, eller 7 000 RelativeDistinguishedNames, i en specifik ordning.

Det visar sig att SEQUENCE och SEQUENCE OF faktiskt har en likhet - de kodas på samma sätt! Mer om det i [Kodnings](#sequence-encoding)-sektionen.

SET och SET OF
--------------

Dessa är i stort sett desamma som SEQUENCE och SEQUENCE OF, förutom att det medvetet inte finns någon semantik kopplad till ordningen på elementen i dem. I kodad form måste de dock sorteras. [Ett exempel](https://tools.ietf.org/html/rfc5280#page-116):

```asn1
RelativeDistinguishedName ::=
  SET SIZE (1..MAX) OF AttributeTypeAndValue
```

Observera: Detta exempel använder nyckelordet SIZE för att ytterligare specificera att RelativeDistinguishedName måste ha minst ett medlemselement, men i allmänhet får en SET eller SET OF ha en storlek på noll.

BIT STRING och OCTET STRING
---------------------------

Dessa innehåller godtyckliga bitar respektive bytes. Dessa kan användas för att hålla ostrukturerad data, som nonces eller output från hashfunktioner. De kan också användas som en void-pointer i C eller den tomma interfacetypen (interface{}) i Go: Ett sätt att hålla data som har en struktur, men där den strukturen förstås eller definieras separat från typ systemet. [Till exempel](https://tools.ietf.org/html/rfc5280#page-116), är signaturen på ett certifikat definierad som en BIT STRING:

```
Certificate  ::=  SEQUENCE  {
     tbsCertificate       TBSCertificate,
     signatureAlgorithm   AlgorithmIdentifier,
     signature            BIT STRING  }
```

Senare versioner av ASN.1-språket [tillåter mer detaljerad specifikation](https://tools.ietf.org/html/rfc5912#page-99) av innehållet inuti BIT STRING (och samma gäller för OCTET STRING).

CHOICE och ANY
--------------

CHOICE är en typ som kan innehålla exakt en av de typer som listas i dess definition. [Till exempel](https://tools.ietf.org/html/rfc5280#page-117), kan Time innehålla exakt en av en UTCTime eller en GeneralizedTime:

```asn1
Time ::= CHOICE {
     utcTime        UTCTime,
     generalTime    GeneralizedTime }
```

ANY indikerar att ett värde kan vara av vilken typ som helst. I praktiken begränsas det vanligtvis av saker som inte riktigt kan uttryckas i ASN.1-grammatiken. [Till exempel](https://tools.ietf.org/html/rfc5280#page-111):

```asn1
   AttributeTypeAndValue ::= SEQUENCE {
     type     AttributeType,
     value    AttributeValue }

   AttributeType ::= OBJECT IDENTIFIER

   AttributeValue ::= ANY -- DEFINED BY AttributeType
```

Detta är särskilt användbart för tillägg, där du vill lämna utrymme för att extra fält ska kunna definieras separat efter att huvudspecificeringen publicerats, så att du har ett sätt att registrera nya typer (objektidentifierare) och tillåta definitionerna för dessa typer att specificera hur strukturen för de nya fälten ska se ut.

Observera att ANY är en kvarleva från ASN.1-notationen från 1988. I [1994 års utgåva](https://www.itu.int/rec/T-REC-X.680-199407-S/en) togs ANY bort och ersattes med informationsobjektklasser, ett elegant och formaliserat sätt att ange den typ av utökningsbarhet som man tidigare ville uppnå med ANY. Förändringen är så gammal nu att de senaste ASN.1-specifikationerna (från 2015) inte ens nämner ANY. Men om du tittar på 1994 års upplaga kan du se viss diskussion om övergången. Jag inkluderar den äldre syntaxen här eftersom det fortfarande är det som RFC 5280 använder. [RFC 5912](https://tools.ietf.org/html/rfc5912) använder 2002 års ASN.1-syntax för att uttrycka samma typer som RFC 5280 och flera relaterade specifikationer.

Annan notation
==============

Kommentarer börjar med `--` . Fält i en SEQUENCE eller SET kan markeras som OPTIONAL, eller de kan markeras som DEFAULT foo, vilket betyder samma sak som OPTIONAL förutom att när fältet saknas ska det anses innehålla "foo." Typer med en längd (strängar, oktet- och bitsträngar, set och sequences OF saker) kan ges en SIZE-parameter som begränsar deras längd, antingen till en exakt längd eller till ett intervall.

Typer kan begränsas till att ha vissa värden genom att använda klammerparenteser efter typdefinitionen. [Detta exempel definierar](https://tools.ietf.org/html/rfc5280#page-117) att Version-fältet kan ha tre värden och tilldelar meningsfulla namn till dessa värden:

```asn1
Version ::= INTEGER { v1(0), v2(1), v3(2) }
```

Detta används också ofta för att tilldela namn till specifika OID:er (observera att detta är ett enda värde, utan kommatecken som indikerar alternativa värden). [Exempel från RFC 5280](https://tools.ietf.org/html/rfc5280#page-110).

```asn1
id-pkix  OBJECT IDENTIFIER  ::=
         { iso(1) identified-organization(3) dod(6) internet(1)
                    security(5) mechanisms(5) pkix(7) }
```

Du kommer också att se [nummer], IMPLICIT, EXPLICIT, UNIVERSAL och APPLICATION. Dessa definierar detaljer om hur ett värde ska kodas, vilket vi kommer att prata om nedan.

Kodningen
============

ASN.1 är associerat med många kodningar: BER, DER, PER, XER och fler. Basic Encoding Rules (BER) är ganska flexibla. Distinguished Encoding Rules (DER) är en delmängd av BER med [kanoniserings](https://en.wikipedia.org/wiki/Canonicalization) regler så det finns bara ett sätt att uttrycka en given struktur. Packed Encoding Rules (PER) använder färre byte för att koda saker, så de är användbara när utrymme eller överföringstid är begränsad. XML Encoding Rules (XER) är användbara när du av någon anledning vill använda XML.

HTTPS-certifikat är generellt kodade i DER. Det är möjligt att koda dem i BER, men eftersom signaturvärdet beräknas över motsvarande DER-kodning, inte de exakta bytena i certifikatet, medför kodning av ett certifikat i BER onödiga problem. Jag kommer att beskriva BER och förklara under tiden de ytterligare begränsningar som DER tillhandahåller.

Jag uppmuntrar dig att läsa detta avsnitt med denna [-dekodning av ett verkligt certifikat](https://lapo.it/asn1js/#MIIFaTCCBFGgAwIBAgISA9QVMY4sVx0pBfw-BSdonQ0JMA0GCSqGSIb3DQEBCwUAMEoxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MSMwIQYDVQQDExpMZXQncyBFbmNyeXB0IEF1dGhvcml0eSBYMzAeFw0xOTA5MjkxNjMzMzZaFw0xOTEyMjgxNjMzMzZaMBoxGDAWBgNVBAMTD2xldHNlbmNyeXB0Lm9yZzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANACdZdYiHLXjUhzqmaHENZ_mYp05-bbJw0RhmkCMN32iqPP0_2_KBRi60F87-itSNcKpQ_HQmEm5NoaH6rHzPuihv834og9TPsHeM0QOkaGOcR001h0kGRlIgynXzG7kSO7hTAUSbLfzCD4Hp8swLJHCz787sn_09DvPkJdeHhlQvrgfnGXqsHLqSXo9UtZXriwYS0HRCt5dKCLTOQAmS5ezKG2-7LVcuQQGsG1st3f2t092zJ8BDj_hAd0Zh8vKRwkDZvPzZzo76g4pGtVPRhmcDnVLin4PmsysWevEdzpJhNO7FXCsCA2aWo4ePAYKrR9BjyNlPAQ2QkKlI_cJx8CAwEAAaOCAncwggJzMA4GA1UdDwEB_wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwDAYDVR0TAQH_BAIwADAdBgNVHQ4EFgQUfCuj5zyEXzjUdndlK8VKWGyO3aowHwYDVR0jBBgwFoAUqEpqYwR93brm0Tm3pkVl7_Oo7KEwbwYIKwYBBQUHAQEEYzBhMC4GCCsGAQUFBzABhiJodHRwOi8vb2NzcC5pbnQteDMubGV0c2VuY3J5cHQub3JnMC8GCCsGAQUFBzAChiNodHRwOi8vY2VydC5pbnQteDMubGV0c2VuY3J5cHQub3JnLzAvBgNVHREEKDAmgg9sZXRzZW5jcnlwdC5vcmeCE3d3dy5sZXRzZW5jcnlwdC5vcmcwTAYDVR0gBEUwQzAIBgZngQwBAgEwNwYLKwYBBAGC3xMBAQEwKDAmBggrBgEFBQcCARYaaHR0cDovL2Nwcy5sZXRzZW5jcnlwdC5vcmcwggECBgorBgEEAdZ5AgQCBIHzBIHwAO4AdQDiaUuuJujpQAnohhu2O4PUPuf-dIj7pI8okwGd3fHb_gAAAW1-FbruAAAEAwBGMEQCIBROHx_dL0yfOpZs7Y6teawOn0oawhuW-3lvVs61DhjcAiB2ZuYwHu3BwYtqJTqfwsjQzjMZm8bQOutdme7dfaLXvgB1ACk8UZZUyDlluqpQ_FgH1Ldvv1h6KXLcpMMM9OVFR_R4AAABbX4VuuYAAAQDAEYwRAIgTc8_QJi4odfZIQ1u74zzvkBobqa08Wb_vxoqlgviUYICIGnAFgaPUg-xzKTRZGTGO4cj8UGJ3f52NoD6UWipPgIvMA0GCSqGSIb3DQEBCwUAA4IBAQAWl67Avp7BgqZW3VEWEjXHganloM8OHMS6en6S46nyuW0itGzth8SmCuG4i7fseecEG3Zsm0U1S1d3AffClOwWAGxB5Ark8Bpjszy8nGtNo7pFH-psGCBGj1pnklteu3jUzkkXKHS00Dsna1fJIzswgD7X7et8PRvV3ufIidkvvbfev0L2TYPWEFMM7WO0eIysf9WTljuflgcbzJXY0PatUBzL59ekidJZvGZ7d-hTl14CcCTrZ-VGMZlmK6tMhBuXJdAa5R0QSUpqirGRLz37Ox-SVh_tjA-I2tcRs0euAoX0etcr5cbBapV4-6LtSUt_rLBddeXCnDxqAWQxyy0p) öppen i ett annat fönster.

Typ-Längd-Värde
-----------------

BER är en typ-längd-värde-kodning, precis som Protocol Buffers och Thrift. Det innebär att när du läser byte som är kodade med BER, stöter du först på en typ, kallad en tagg i ASN.1. Detta är en byte, eller serie av byte, som berättar vilken typ av sak som är kodad: en INTEGER, eller en UTF8String, eller en struktur, eller något annat.

| typ | längd | värde    |
| --- | ----- | -------- |
| 02  | 03    | 01 00 01 |

Därefter stöter du på en längd: ett nummer som berättar hur många byte av data du behöver läsa för att få värdet. Sedan kommer förstås bytena som innehåller själva värdet. Som exempel skulle hex-byten 02 03 01 00 01 representera en INTEGER (tag 02 motsvarar INTEGER-typen), med längd 03, och ett tre-byte värde bestående av 01 00 01.

Typ-längd-värde skiljer sig från avgränsade kodningar som JSON, CSV eller XML, där du istället för att känna till längden på ett fält i förväg, läser byte tills du når den förväntade avgränsaren (t.ex. `}` i JSON, eller `</some-tag>` i XML).

Tagg
---

Taggen är vanligtvis en byte. Det finns ett sätt att koda godtyckligt stora taggnumer med flera byte (formen "high tag number"), men detta är normalt inte nödvändigt.

Här är några exempel på taggar:

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

| Tagg (decimal) |      Tagg (hex) | Typ                      |
| --------------:| ---------------:| ------------------------ |
|              2 |              02 | INTEGER                  |
|              3 |              03 | BIT STRING               |
|              4 |              04 | OCTET STRING             |
|              5 |              05 | NULL                     |
|              6 |              06 | OBJECT IDENTIFIER        |
|             12 |              0C | UTF8String               |
|             16 | 10 (och 30)\* | SEQUENCE och SEQUENCE OF |
|             17 | 11 (och 31)\* | SET och SET OF           |
|             19 |              13 | PrintableString          |
|             22 |              16 | IA5String                |
|             23 |              17 | UTCTime                  |
|             24 |              18 | GeneralizedTime          |

Dessa, och några få andra som jag har hoppat över för att de är tråkiga, är de "universella" taggarna, eftersom de anges i kärn-ASN.1-specifikationen och betyder samma sak i alla ASN.1-moduler.

Dessa taggar råkar alla vara under 31 (0x1F), och det finns en god anledning till det: Bit 8, 7 och 6 (de höga bitarna i taggbajtet) används för att koda extra information, så alla universella taggnummer högre än 31 måste använda formen "högt taggnumer", vilket tar extra byte. Det finns en liten handfull universella taggar högre än 31, men de är ganska sällsynta.

De två taggarna märkta med en `*` kodas alltid som 0x30 eller 0x31, eftersom bit 6 används för att indikera om ett fält är konstruerat eller primitivt. Dessa taggar är alltid konstruerade, så deras kodning har bit 6 satt till 1. Se avsnittet [Konstruerat vs Primitivt](#constructed-vs-primitive) för detaljer.

Taggklasser
-----------

Bara för att den universella klassen har använt alla "bra" taggnummer betyder det inte att vi är utan chans att definiera våra egna taggar. Det finns också "applikations", "privat" och "kontextspecifik" klasser. Dessa skiljs åt av bitarna 8 och 7:

| Klass           | Bit 8 | Bit 7 |
| --------------- | -----:| -----:|
| Universell      |     0 |     0 |
| Applikation     |     0 |     1 |
| Kontextspecifik |     1 |     0 |
| Privat          |     1 |     1 |

Specifikationer använder mestadels taggar i den universella klassen, eftersom de tillhandahåller de viktigaste byggstenarna. Till exempel kodas serienumret i ett certifikat i en vanlig INTEGER, taggnummer 0x02. Men ibland behöver en specifikation definiera taggar i den kontextspecifika klassen för att avgränsa poster i en SET eller SEQUENCE som definierar valfria poster, eller för att avgränsa ett CHOICE med flera poster som har samma typ. Till exempel, ta denna definition:

```asn1
Point ::= SEQUENCE {
  x INTEGER OPTIONAL,
  y INTEGER OPTIONAL
}
```

Eftersom OPTIONAL-fält helt utelämnas från kodningen när de inte är närvarande, skulle det vara omöjligt att skilja en Punkt med endast x-koordinat från en Punkt med endast y-koordinat. Till exempel skulle du koda en Punkt med endast x-koordinat 9 så här (30 betyder SEQUENCE här):

```der
30 03 02 01 09
```

Det är en SEQUENCE av längd 3 (bytes), som innehåller en INTEGER av längd 1, vilken har värdet 9. Men du skulle också koda en Punkt med y-koordinat 9 exakt på samma sätt, så det finns en tvetydighet.

Kodningsinstruktioner
---------------------

För att lösa denna tvetydighet, måste en specifikation tillhandahålla kodningsinstruktioner som tilldelar en unik tagg till varje post. Och eftersom vi inte får skriva över UNIVERSALA taggar, måste vi använda en av de andra, till exempel APPLICATION:

```asn1
Point ::= SEQUENCE {
  x [APPLICATION 0] INTEGER OPTIONAL,
  y [APPLICATION 1] INTEGER OPTIONAL
}
```

Fast för detta användningsfall är det faktiskt mycket vanligare att använda den kontextspecifika klassen, som representeras av ett nummer inom hakparenteser för sig själva:

```asn1
Point ::= SEQUENCE {
  x [0] INTEGER OPTIONAL,
  y [1] INTEGER OPTIONAL
}
```

Så nu, för att koda en Punkt med endast ett x-koordinatvärde på 9, istället för att koda x som en UNIVERSAL INTEGER, skulle du sätta bitarna 8 och 7 i den kodade taggen till (1, 0) för att indikera den kontextspecifika klassen, och sätta de låga bitarna till 0, vilket ger denna kodning:

```der
30 03 80 01 09
```

Och för att representera en Punkt med endast ett y-koordinatvärde på 9, skulle du göra samma sak, förutom att du skulle sätta de låga bitarna till 1:

```der
30 03 81 01 09
```

Eller så kan du representera en Punkt med x- och y-koordinater båda lika med 9:

```der
30 06 80 01 09 81 01 09
```

Längd
------

Längden i tagg-längd-värde-tripel representerar alltid det totala antalet bytes i objektet inklusive alla delobjekt. Så en SEQUENCE med ett fält har inte en längd på 1; den har en längd av hur många bytes den kodade formen av det fältet tar upp.

Kodningen av längd kan ta två former: kort eller lång. Kortformen är en enda byte, mellan 0 och 127.

Långformen är minst två bytes lång, och bit 8 i den första byten är satt till 1. Bitarna 7-1 i den första byten anger hur många fler bytes som finns i längdfältet självt. Sedan anger de resterande bytes själva längden, som ett flertals-bytes heltal.

Som du kan föreställa dig, tillåter detta mycket långa värden. Den längsta möjliga längden skulle starta med byten 254 (en längdbyte på 255 är reserverad för framtida tillägg), som anger att 126 fler bytes skulle följa endast i längdfältet. Om var och en av de 126 bytena var 255, skulle det ange 2<sup> 1008 </sup>-1 bytes att följa i värdefältet.

Långformen tillåter dig att koda samma längd på flera sätt - till exempel genom att använda två bytes för att uttrycka en längd som kunde passa i en, eller genom att använda långform för att uttrycka en längd som skulle passa i kortform. DER säger att man alltid ska använda den minsta möjliga längdrepresentationen.

Säkerhetsvarning: Lita inte fullt ut på de längdvärden du avkodar! Till exempel, kontrollera att den kodade längden är mindre än mängden data som är tillgänglig från strömmen som avkodas.

Obestämd längd
-----------------

Det är också möjligt, i BER, att koda en sträng, SEQUENCE, SEQUENCE OF, SET, eller SET OF där du inte känner till längden i förväg (till exempel vid strömmande utdata). För att göra detta kodar du längden som en enda byte med värdet 80, och kodar värdet som en serie av kodade objekt sammanfogade tillsammans, med slutet markerat av de två bytena `00 00` (vilket kan betraktas som ett objekt med nollängd och tagg 0). Så, till exempel, den obestämda längdkodningen av en UTF8String skulle vara kodningen av en eller flera UTF8Strings sammanfogade tillsammans, och slutligen sammanfogade med 00 00.

Obestämdhet kan nästlas godtyckligt! Så, till exempel, de UTF8Strings som du sammanfogar för att bilda en obestämd lång UTF8String kan själva kodas antingen med bestämd längd eller obestämd längd.

En längdbyte av 80 är särpräglad eftersom det inte är en giltig kortform eller långform av längd. Eftersom bit 8 är satt till 1, skulle detta normalt tolkas som lång form, men de återstående bitarna ska ange antal ytterligare byten som utgör längden. Eftersom bitarna 7-1 alla är 0, skulle detta indikera en långformskodning med noll byten som utgör längden, vilket inte är tillåtet.

DER förbjuder kodning av obestämd längd. Du måste använda kodningen med bestämd längd (det vill säga med längden specificerad i början).

Konstruktiv vs. Primitiv
------------------------

Bit 6 i den första tagg-bytet används för att indikera om värdet är kodad i primitiv form eller konstruktiv form. Primitiv kodning representerar värdet direkt - till exempel, i en UTF8String skulle värdet bestå enbart av strängen själv, i UTF-8-byten. Konstruktiv kodning representerar värdet som en sammanfogning av andra kodade värden. Till exempel, som beskrivs i avsnittet "Obestämd längd", skulle en UTF8String i konstruktiv kodning bestå av flera kodade UTF8Strings (var och en med tagg och längd), sammanfogade tillsammans. Längden på den övergripande UTF8String skulle vara den totala längden, i byte, av alla dessa sammanfogade kodade värden. Konstruktiv kodning kan använda antingen bestämd eller obestämd längd. Primitiv kodning använder alltid bestämd längd, eftersom det inte finns något sätt att uttrycka obestämd längd utan att använda konstruktiv kodning.

INTEGER, OBJECT IDENTIFIER, och NULL måste använda primitiv kodning. SEQUENCE, SEQUENCE OF, SET, och SET OF måste använda konstruktiv kodning (eftersom de i grunden är sammanfogningar av flera värden). BIT STRING, OCTET STRING, UTCTime, GeneralizedTime och de olika strängtyperna kan använda antingen primitiv eller konstruerad kodning, efter avsändarens eget val – i BER. Men i DER måste alla typer som har ett kodningsval mellan primär och konstruerad använda primär kodning.

EXPLICIT vs IMPLICIT
--------------------

De [kodningsinstruktionerna](#encoding-instructions) som beskrivs ovan, t.ex. `[1]`, eller `[APPLICATION 8]`, kan också inkludera nyckelordet EXPLICIT eller IMPLICIT ([exempel från RFC 5280](https://tools.ietf.org/html/rfc5280#page-117)):

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

Detta definierar hur taggen ska kodas; det har inget att göra med om tagnummret är uttryckligen tilldelat eller inte (eftersom både IMPLICIT och EXPLICIT alltid går tillsammans med ett specifikt taggnummer). IMPLICIT kodar fältet på samma sätt som den underliggande typen, men med tagnummret och klassen som anges i ASN.1-modulen. EXPLICIT kodar fältet som den underliggande typen och omsluter det sedan i en yttre kodning. Den yttre kodningen har tagnummret och klassen från ASN.1-modulen och har dessutom [Konstruerad-bit](#constructed-vs-primitive) satt.

Här är ett exempel på ASN.1-kodningsinstruktion med IMPLICIT:

```asn1
[5] IMPLICIT UTF8String
```

Detta skulle koda "hi" som:

```der
85 02 68 69
```

Jämför med denna ASN.1-kodningsinstruktion med EXPLICIT:

```asn1
[5] EXPLICIT UTF8String
```

Detta skulle koda "hi" som:

```der
A5 04 0C 02 68 69
```

När nyckelordet IMPLICIT eller EXPLICIT inte finns, är standarden EXPLICIT, om inte modulen anger en annan standard högst upp med "EXPLICIT TAGS," "IMPLICIT TAGS," eller "AUTOMATIC TAGS." Till exempel definierar RFC 5280 två moduler, en där [EXPLICIT-taggar är standard](https://tools.ietf.org/html/rfc5280#appendix-A.1), och en andra som importerar den första, och har [IMPLICIT-taggar som standard](https://tools.ietf.org/html/rfc5280#appendix-A.2). Implicit kodning använder färre byten än explicit kodning.

AUTOMATIC TAGS är detsamma som IMPLICIT TAGS, men med den ytterligare egenskapen att tagnummren (`[0]`, `[1]`, etc.) automatiskt tilldelas på platser som behöver dem, som SEQUENCEs med valfria fält.

Kodning av specifika typer
==========================

I detta avsnitt kommer vi att prata om hur värdet av varje typ kodas, med exempel.

INTEGER-kodning
----------------

Heltal kodas som en eller flera byten, i tvåkomplementsform med den höga biten (bit 8) i den vänstra byten som tecknet. Som BER-specifikationen säger:

Värdet på ett tvås komplementbinärt tal härleds genom att numrera bitarna i innehålloktetterna, med början i bit 1 i den sista oktetten som bit noll och avslutande med bit 8 i den första oktetten. Varje bit tilldelas ett numeriskt värde på 2<sup> N </sup>, där N är dess position i ovanstående numreringssekvens. Värdet på två\s komplementbinära tal erhålls genom att summera de numeriska värden som tilldelas varje bit för de bitar som är satta till ett, exklusive bit 8 i den första oktetten, och sedan reducera detta värde med det numeriska värdet som tilldelas bit 8 i den första oktetten om den biten sätts till ett.

Så till exempel kodar detta enbytesvärde (representerat i binärt) decimal 50:

00110010 (== decimal 50)

Detta enbytesvärde (representerat i binärt) kodar decimal -100:

10011100 (== decimal -100)

Detta fembytesvärde (representerat i binärt) kodar decimalt -549755813887 (dvs. -2<sup> 39 </sup> + 1):

10000000 00000000 00000000 00000000 00000001 (== decimal -549755813887)

BER och DER kräver båda att heltal representeras i den kortast möjliga formen. Det upprätthålls med denna regel:

```
... Bitarna i den första oktetten och bit 8 i den andra oktetten: 1.  skall inte alla vara en; och 2.  skall inte alla vara noll.
```

Regel (2) betyder ungefär: om det finns ledande nollbyte i kodningen kan du lika gärna lämna dem av och ha samma antal. Bit 8 i den andra byten är också viktig här eftersom om du vill representera vissa värden måste du använda en ledande nollbyte. Till exempel kodas decimal 255 som två byte:

00000000 11111111

Det beror på att en enbyteskodning av 11111111 i sig betyder -1 (bit 8 behandlas som teckenbiten).

Regel (1) förklaras bäst med ett exempel. Decimal -128 kodas som:

10000000 (== decimal -128)

Det kan dock också kodas som:

11111111 10000000 (== decimal -128, men en ogiltig kodning)

Om man utvecklar det, är det -2<sup> 15 </sup> + 2<sup> 14 </sup> + 2<sup> 13 </sup> + 2<sup> 12 </sup> + 2<sup> 11 </sup> + 2<sup> 10 </sup> + 2<sup> 9 </sup> + 2<sup> 8 </sup> + 2<sup> 7 </sup> == -2<sup> 7 </sup> == -128. Observera att 1 i "10000000" var en teckenbit i enkla bytet kodning, men betyder 27 i tvåbytekodning.

Detta är en generell transform: För vilket negativt tal som helst kodad som BER (eller DER) kunde man prefixa det med 11111111 och få samma tal. Detta kallas [teckentillägg](https://andybargh.com/binary-sign-extension/). Eller ekvivalent, om det finns ett negativt tal där kodningen av värdet börjar med 11111111, kunde man ta bort den byten och fortfarande ha samma tal. Så BER och DER kräver den kortaste kodningen.

Toskomplementkodningen av INTEGERs har [praktisk påverkan vid utfärdandet av certifikat](https://bugzilla.mozilla.org/buglist.cgi?query_format=specific&order=relevance%20desc&bug_status=__closed__&product=NSS&content=%E2%80%9CSerial%20entropy%E2%80%9D&comments=0&list_id=16028758): RFC 5280 kräver att serienummer ska vara positiva. Eftersom den första biten alltid är en teckenbit, innebär det att serienummer kodade i DER som 8 byte kan vara högst 63 bitar långa. Kodning av ett 64-bitars positivt serienummer kräver ett 9-byte kodad värde (med första byten som noll).

Här är kodningen av en INTEGER med värdet 2<sup> 63 </sup>+1 (vilket råkar vara ett 64-bitars positivt tal):

```der
02 09 00 80 00 00 00 00 00 00 01
```

Strängkodning
---------------

Strängar kodas som sina bokstavliga byte. Eftersom IA5String och PrintableString bara definierar olika delmängder av accepterade tecken, skiljer sig deras kodningar endast genom taggen.

En PrintableString som innehåller "hi":

```der
13 02 68 69
```

En IA5String som innehåller "hi":

```der
16 02 68 69
```

UTF8Strings är samma, men kan koda en större variation av tecken. Till exempel, detta är kodningen av en UTF8String som innehåller U+1F60E Smiling Face With Sunglasses (😎):

```der
0c 04 f0 9f 98 8e
```

Datum och tidskodning
----------------------

UTCTime och GeneralizedTime kodas faktiskt som strängar, förvånansvärt nog! Som beskrivs ovan i sektionen "Typer", representerar UTCTime datum i formatet YYMMDDhhmmss. GeneralizedTime använder ett fyrsiffrigt år YYYY istället för YY. Båda har ett valfritt tidszonavvikelse eller "Z" (Zulu) för att indikera ingen tidsförskjutning från UTC.

Till exempel representeras den 15 december 2019 kl. 19:02:10 i PST-tidszonen (UTC-8) i en UTCTime som: 191215190210-0800. Kodat i BER, det är:

```der
17 11 31 39 31 32 31 35 31 39 30 32 31 30 2d 30 38 30 30
```

För BER-kodning är sekunder valfria både i UTCTime och GeneralizedTime, och tidszonsförskjutningar är tillåtna. Dock anger DER (tillsammans med RFC 5280) att sekunder måste finnas, bråkdelar av sekunder får inte finnas, och tiden måste uttryckas som UTC med formen "Z".

Ovanstående datum skulle kodas i DER som:

```der
17 0d 31 39 31 32 31 36 30 33 30 32 31 30 5a
```

Kodning av OBJECT IDENTIFIER
--------------------------

Som [beskrivits ovan](#object-identifier) är OID:er konceptuellt en serie heltal. De är alltid minst två komponenter långa. Den första komponenten är alltid 0, 1 eller 2. När den första komponenten är 0 eller 1 är den andra komponenten alltid mindre än 40. På grund av detta representeras de två första komponenterna entydigt som 40\*X+Y, där X är den första komponenten och Y den andra.

Så, till exempel, för att koda 2.999.3, skulle du kombinera de två första komponenterna till 1079 decimal (40\*2 + 999), vilket ger dig "1079.3".

Efter att transformen har applicerats kodas varje komponent i bas 128, med den mest signifikanta byten först. Bit 8 är satt till "1" i varje byte utom den sista i en komponent; det är så du vet när en komponent är klar och nästa börjar. Så komponenten "3" skulle helt enkelt representeras som byte 0x03. Komponenten, "129", representeras som bytes 0x81 0x01. När den är kodad sammanfogas alla komponenter i en OID för att bilda det kodade värdet av OID:n.

OID:er måste representeras med så få byte som möjligt, oavsett om det är i BER eller DER. Så komponenter kan inte börja med byte 0x80.

Som exempel är OID 1.2.840.113549.1.1.11 (som representerar [sha256WithRSAEncryption](https://tools.ietf.org/html/rfc8017#appendix-A.2.4)) kodad så här:

```der
06 09 2a 86 48 86 f7 0d 01 01 0b
```

NULL-kodning
-------------

Värdet på ett objekt som innehåller NULL är alltid noll-längd, så kodningen av NULL är alltid bara taggen och ett längdfält av noll:

```der
05 00
```

SEQUENCE-kodning
-----------------

Det första man bör veta om SEQUENCE är att den alltid använder konstruerad kodning eftersom den innehåller andra objekt. Med andra ord innehåller värdebytena för en SEQUENCE sammanfogningen av de kodade fälten i denna SEQUENCE (i den ordning fälten definierades). Det innebär också att bit 6 i taggen för en SEQUENCE (biten [Constructed vs Primitive](#constructed-vs-primitive)) alltid sätts till 1. Så även om taggnumret för SEQUENCE tekniskt sett är 0x10, är dess taggbyte, när det väl är kodat, alltid 0x30.

När en SEQUENCE innehåller fält med annoteringen OPTIONAL utelämnas de helt enkelt från kodningen om de inte finns. När en avkodare bearbetar element i SEQUENCE kan den lista ut vilken typ som avkodas baserat på vad som hittills har avkodats och de taggbytes den läser. Om det finns tvetydighet, till exempel när element har samma typ, måste ASN.1-modulen specificera [kodningsinstruktioner](#encoding-instructions) som tilldelar olika taggnummer till elementen.

DEFAULT-fält liknar OPTIONAL-fält. Om ett fälts värde är standardvärdet kan det utelämnas från BER-kodningen. I DER-kodningen MÅSTE den utelämnas.

Som exempel definierar RFC 5280 [AlgorithmIdentifier](https://tools.ietf.org/html/rfc5280#page-118) som en SEQUENCE:

```asn1
   AlgorithmIdentifier  ::=  SEQUENCE  {
        algorithm               OBJECT IDENTIFIER,
        parameters              ANY DEFINED BY algorithm OPTIONAL  }
```

Här är kodningen av AlgorithmIdentifier som innehåller 1.2.840.113549.1.1.11. RFC 8017 säger att ["parametrar" ska ha typen NULL för denna algoritm](https://tools.ietf.org/html/rfc8017#appendix-A.2).

```der
30 0d 06 09 2a 86 48 86 f7 0d 01 01 0b 05 00
```

Kodning av SEQUENCE OF
--------------------

En SEQUENCE OF kodas på exakt samma sätt som en SEQUENCE. Den använder till och med samma tagg! Om du avkodar är det enda sättet att se skillnad mellan en SEQUENCE och en SEQUENCE OF genom att referera till ASN.1-modulen.

Här är kodningen av en SEQUENCE OF INTEGER som innehåller talen 7, 8 och 9:

```der
30 09 02 01 07 02 01 08 02 01 09
```

SET-kodning
------------

Liksom SEQUENCE är en SET konstruerad, vilket betyder att dess värdebyte är sammanfogningen av dess kodade fält. Dess taggnummer är 0x11. Eftersom [Constructed vs Primitive](#constructed-vs-primitive) bit (bit 6) alltid är satt till 1, betyder det att den är kodad med taggbyte 0x31.

Kodningen av en SET, som en SEQUENCE, utelämnar fälten OPTIONAL och DEFAULT om de saknas eller har standardvärdet. All tvetydighet som uppstår på grund av fält av samma typ måste lösas av ASN.1-modulen, och DEFAULT-fält MÅSTE utelämnas från DER-kodningen om de har standardvärdet.

I BER kan en SET kodas i valfri ordning. I DER måste en SET kodas i stigande ordning efter det serialiserade värdet för varje element.

Kodning av SET OF
---------------

En SET OF kodas på samma sätt som en SET, inklusive taggbyten 0x31. För DER-kodning finns det ett liknande krav att SET OF måste kodas i stigande ordning. Eftersom alla element i en SET OF har samma typ räcker det inte att sortera efter tagg. Elementen i en SET OF sorteras därför efter sina kodade värden, där kortare värden behandlas som om de fylldes ut till höger med nollor.

BIT STRING-kodning
-------------------

En BIT STRING med N bitar kodas som N/8 byte (avrundat uppåt), med ett prefix på en byte som innehåller "antalet oanvända bitar", för tydlighet när antalet bitar inte är en multipel av 8. Till exempel, när man kodar bitsträngen 011011100101110111 (18 bitar), behöver vi minst tre byte. Men det är något mer än vi behöver: det ger oss kapacitet för totalt 24 bitar. Sex av de bitarna kommer att vara oanvända. Dessa sex bitar är skrivna i den högra änden av bitsträngen, så detta kodas som:

```der
03 04 06 6e 5d c0
```

I BER kan de oanvända bitarna ha vilket värde som helst, så den sista byten i den kodningen skulle lika gärna kunna vara c1, c2, c3 och så vidare. I DER måste alla oanvända bitar vara noll.

Kodning av OCTET STRING
---------------------

En OCTET STRING kodas som de byte den innehåller. Här är ett exempel på en OCTET STRING som innehåller bytevärdena 03, 02, 06 och A0:

```der
04 04 03 02 06 A0
```

Kodning av CHOICE och ANY
-----------------------

Ett fält av typen CHOICE eller ANY kodas som den typ det faktiskt innehåller, om det inte modifieras av kodningsinstruktioner. Så om ett CHOICE-fält i en ASN.1-specifikation tillåter en INTEGER eller en UTCTime, och det specifika objekt som kodas innehåller en INTEGER, då kodas det som en INTEGER.

I praktiken har CHOICE-fält mycket ofta kodningsinstruktioner. Till exempel, betrakta detta exempel från RFC 5280, där kodningsinstruktionerna är nödvändiga för att särskilja rfc822Name från dNSName, eftersom de båda har den underliggande typen IA5String:

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

Här är ett exempel på kodning av ett GeneralName som innehåller rfc822Name `a@example.com` (kom ihåg att [1] betyder att använda taggnummer 1, i taggklassen "context-specific" (bit 8 satt till 1), med den IMPLICIT taggkodningsmetoden):

```der
81 0d 61 40 65 78 61 6d 70 6c 65 2e 63 6f 6d
```

Här är ett exempel på en kodning av ett GeneralName som innehåller dNSName "example.com":

```der
82 0b 65 78 61 6d 70 6c 65 2e 63 6f 6d
```

Säkerhet
======

Det är viktigt att vara mycket försiktig när man avkodar BER och DER, särskilt i språk som C och C++ som inte är minnessäkra. Det finns en lång historia av sårbarheter i dekodrar. Att analysera indata är generellt en [vanlig källa till sårbarheter](http://langsec.org/). ASN.1-kodningsformaten verkar särskilt vara [särskilda sårbarhetsmagneter](https://bugzilla.redhat.com/show_bug.cgi?id=1300257). De är komplicerade format, med många fält med variabel längd. Även längderna har varierande längder! Dessutom är ASN.1-inmatning ofta attackerarstyrd. Om du måste tolka ett certifikat för att skilja en auktoriserad användare från en obehörig, måste du anta att du ibland kommer att parsa inte ett certifikat, utan någon bisarr indata skapad för att utnyttja buggar i din ASN.1-kod.

För att undvika dessa problem är det bäst att använda ett minnessäkert språk när det är möjligt. Och oavsett om du kan använda ett minnessäkert språk eller inte, är det bäst att använda en [ASN.1-kompilator](https://www.itu.int/en/ITU-T/asn1/Pages/Tools.aspx) för att generera din parsingkod istället för att skriva den från grunden.

Tacksamheter
================

Jag står i stor tacksamhetsskuld till [A Layman's Guide to a Subset of ASN.1, DER och BER](http://luca.ntop.org/Teaching/Appunti/asn1.html), vilket är en stor del av hur jag lärde mig dessa ämnen. Jag vill också tacka författarna till [A warm welcome to DNS](https://powerdns.org/hello-dns/), som är en fantastisk läsning och inspirerade tonen i detta dokument.

En liten bonus
==============

Har du någonsin märkt att ett PEM-kodat certifikat alltid börjar med "MII"? Till exempel:

```
-----BEGIN CERTIFICATE-----

MIIFajCCBFKgAwIBAgISA6HJW9qjaoJoMn8iU8vTuiQ2MA0GCSqGSIb3DQEBCwUA
...
```

Nu vet du tillräckligt för att förklara varför! Ett [Certificate är en SEQUENCE](https://tools.ietf.org/html/rfc5280#page-116), så det börjar med bytet 0x30. Nästa byte är fältet [längd](#length). Certifikat är nästan alltid mer än 127 byte, så längdfältet måste använda längdens långa form. Det betyder att den första byten blir 0x80 + N, där N är antalet längdbyte som följer. N är nästan alltid 2, eftersom det är så många byte det tar att koda längder från 128 till 65535, och nästan alla certifikat har längder inom det intervallet.

Så nu vet vi att de första två bytena av DER-kodningen av ett certifikat är 0x30 0x82. [PEM-kodning använder](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) [base64](https://en.wikipedia.org/wiki/Base64), som kodar 3 byte binär indata till 4 ASCII-tecken som utdata. Eller, för att uttrycka det annorlunda: base64 omvandlar 24 bitar binär indata till 4 ASCII-tecken av utdata, med 6 bitar av indata tilldelade varje tecken. Vi vet vad de första 16 bitarna av varje certifikat kommer att vara. För att bevisa att de första tecknen i (nästan) varje certifikat kommer att vara "MII" måste vi titta på de nästa två bitarna. De kommer att vara de mest signifikanta bitarna av den mest signifikanta byten av de två längd-byten. Kommer dessa bitar någonsin att sättas till 1? Inte om inte certifikatet är längre än 16 383 byte! Så vi kan förutsäga att de första tecknen i ett PEM-certifikat alltid kommer att vara desamma. Prova det själv:

```bash
xxd -r -p <<<308200 | base64
```
