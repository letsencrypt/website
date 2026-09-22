---
title: Úvod do ASN.1 a DER
slug: a-warm-welcome-to-asn1-and-der
lastmod: 2021-03-21
---

Tento dokument poskytuje základní úvod do datových struktur a formátů definujících certifikáty používané v HTTPS. Měl by být přístupný každému, kdo má trochu zkušenosti s informatikou a je alespoň obeznámen s problematikou certifikátů.

Certifikát HTTPS je soubor jako každý jiný. Jeho obsah má formát definovaný v [RFC 5280](https://tools.ietf.org/html/rfc5280). Definice jsou vyjádřeny v ASN.1, což je jazyk používaný pro definování formátů souborů nebo (odpovídajících) datových struktur. Např. v C můžete napsat:

```c
struct point {
  int x, y;
  char label[10];
};
```

V jazyce Go byste napsali:

```go
type point struct {
  x, y int
  label string
}
```

A v ASN.1 byste napsali:

```asn1
Point ::= SEQUENCE {
  x INTEGER,
  y INTEGER,
  label UTF8String
}
```

Výhodou psaní definic ASN.1 namísto definice Go nebo C je to, že jsou jazykově nezávislé. Definici Point v ASN.1 můžete implementovat v libovolném jazyce. Ještě lepší je použít nástroj, který z definice ASN.1 automaticky vygeneruje kód ve vašem oblíbeném jazyce. Soubor definic ASN.1 se nazývá „[modul](https://www.obj-sys.com/asn1tutorial/node6.html)“.

Další důležitou vlastností ASN.1 je nabídka různých serializačních formátů, tedy způsobů, jak převést datovou strukturu v paměti na posloupnost bajtů (nebo soubor) a zpět. Díky tomu může certifikát vytvořený na jednom počítači přečíst jiný počítač, i když používá jiný procesor a operační systém.

Existují i další jazyky, které [slouží ke stejnému účelu](https://en.wikipedia.org/wiki/Interface_description_language) jako ASN.1. Například Protocol Buffers nabízí [jazyk](https://developers.google.com/protocol-buffers/docs/proto3) pro definici typů i [serializační formát](https://developers.google.com/protocol-buffers/docs/encoding) pro kódování objektů těchto typů. [Thrift](https://thrift.apache.org/) také nabízí jazyk i serializační formát. Formát certifikátů HTTPS mohl být stejně dobře definován pomocí Protocol Buffers nebo Thrift. ASN.1 (1984) ale mělo zásadní výhodu: v době vzniku certifikátů (1988) a HTTPS (1994) už existovalo.

ASN.1 bylo v průběhu let několikrát revidováno a jednotlivá vydání se obvykle označují rokem vydání. Cílem tohoto dokumentu je vysvětlit ASN.1 natolik, abyste rozuměli RFC 5280 a dalším standardům souvisejícím s certifikáty HTTPS. Zaměříme se proto především na vydání z roku 1988 a přidáme několik poznámek k funkcím zavedeným později. Jednotlivá vydání si můžete stáhnout přímo od ITU, některá jsou však dostupná pouze jejím členům. Příslušnými standardy jsou [X.680](https://www.itu.int/rec/T-REC-X.680) (definice jazyka ASN.1) a [X.690](https://www.itu.int/rec/T-REC-X.690) (definice serializačních formátů DER a BER). Jejich dřívější verze nesly označení [X.208](https://www.itu.int/rec/T-REC-X.208/en), respektive [X.209](https://www.itu.int/rec/T-REC-X.209/en).

Hlavním serializačním formátem ASN.1 je „Distinguished Encoding Rules“ (DER). Jde o variantu „Basic Encoding Rules“ (BER) doplněnou o kanonizaci. Pokud například typ obsahuje SET OF, musí být jeho prvky při serializaci do DER seřazeny.

Certifikát ve formátu DER se často dále kóduje do PEM. Ten pomocí [base64](https://en.wikipedia.org/wiki/Base64) převádí libovolné bajty na alfanumerické znaky (a znaky „+“ a „/“) a přidává oddělovací řádky („\-\-\-\--BEGIN CERTIFICATE\-\-\-\--“ a „\-\-\-\--END CERTIFICATE\-\-\-\--“). PEM je praktický, protože se snáze kopíruje a vkládá.

Nejprve popíšeme typy a zápis používané v ASN.1 a poté vysvětlíme, jak se objekty definované pomocí ASN.1 kódují. Mezi jednotlivými částmi se klidně vracejte, některé prvky jazyka ASN.1 totiž přímo určují podrobnosti kódování. Tento dokument používá známější pojmy: „bajt“ místo „oktet“ a „hodnota“ místo „obsah“. Pojmy „serializace“ a „kódování“ používá zaměnitelně.

Typy
=========

INTEGER
-------

Starý známý INTEGER. Mohou být kladná i záporná. Na INTEGER v ASN.1 je neobvyklé to, že může obsahovat libovolně velká čísla. Nestačí vám rozsah int64? Žádný problém. To se hodí zejména pro modul RSA, který je mnohem větší než int64 (například řádově 2<sup>2048</sup>). Technicky sice DER stanovuje maximální velikost celého čísla, ta je ale obrovská: délku libovolného pole DER lze vyjádřit posloupností až 126 bajtů. Největší INTEGER, který lze v DER vyjádřit, je tedy 256<sup>(2\*\*1008)</sup>-1. Pro skutečně neomezený INTEGER byste museli použít kódování BER, které umožňuje pole neurčené délky.

Řetězce
-------

ASN.1 má mnoho řetězcových typů: BMPString, GeneralString, GraphicString, IA5String, ISO646String, NumericString, PrintableString, TeletexString, T61String, UniversalString, UTF8String, VideotexString a VisibleString. U certifikátů HTTPS vás zajímají především PrintableString, UTF8String a [IA5String](https://en.wikipedia.org/wiki/IA5STRING). Řetězcový typ daného pole určuje modul ASN.1, který toto pole definuje. [Například](https://tools.ietf.org/html/rfc5280#page-127):

```
CPSuri ::= IA5String
```

PrintableString je omezená podmnožina ASCII. Povoluje písmena, číslice, mezery a několik konkrétních interpunkčních znaků: `' () + , - . / : = ?`. Neobsahuje například `*` ani `@`. Použití omezenějších řetězcových typů nepřináší úsporu místa.

Některá pole, například [DirectoryString v RFC 5280](https://tools.ietf.org/html/rfc5280#page-20), umožňují serializačnímu kódu vybrat si z několika řetězcových typů. Protože kódování DER obsahuje i použitý typ řetězce, ujistěte se, že hodnota kódovaná jako PrintableString [skutečně splňuje požadavky PrintableString](https://community.letsencrypt.org/t/2018-03-12-wildcard-certificate-encoding-issue/55485).

IA5String, založený na [International Alphabet No. 5](https://en.wikipedia.org/wiki/T.50_(standard)), je méně omezující: dovoluje téměř všechny znaky ASCII a v certifikátech se používá pro e-mailové adresy, názvy DNS a URL. U několika bajtů se však význam v IA5 liší od významu v US-ASCII.

TeletexString, BMPString a UniversalString se v certifikátech HTTPS už nemají používat. Můžete se s nimi ale setkat při zpracování starších certifikátů certifikačních autorit, které mají dlouhou platnost a mohly vzniknout ještě před vyřazením těchto typů.

Řetězce v ASN.1 nejsou na rozdíl od řetězců v C a C++ ukončeny nulovým bajtem. Nulové bajty jsou naopak uvnitř řetězce zcela přípustné. Pokud dva systémy interpretují stejný řetězec ASN.1 odlišně, může to vést k bezpečnostním chybám. Některé certifikační autority [bylo dříve možné například přimět k vydání certifikátu](https://www.theregister.co.uk/2009/07/30/universal_ssl_certificate/) pro „example.com\\0.evil.com“ na základě vlastnictví evil.com. Tehdejší knihovny pro ověřování certifikátů považovaly výsledek za platný pro „example.com“. Při práci s řetězci ASN.1 v C a C++ proto postupujte velmi opatrně, abyste nezavedli bezpečnostní chyby.

Datum a čas
---------------

I časových typů je mnoho: UTCTime, GeneralizedTime, DATE, TIME-OF-DAY, DATE-TIME a DURATION. U certifikátů HTTPS vás zajímají pouze UTCTime a GeneralizedTime.

UTCTime zapisuje datum a čas jako YYMMDDhhmm[ss] s volitelným posunem časového pásma nebo znakem „Z“ označujícím Zulu (tedy UTC neboli posun časového pásma 0). Například UTCTime 820102120000Z a 820102070000-0500 označují stejný okamžik: 2. ledna 1982 v 7 hodin ráno v New Yorku (UTC-5) a ve 12 hodin v UTC.

Protože UTCTime nerozlišuje století začínající rokem 1900 a 2000, [RFC 5280 upřesňuje](https://tools.ietf.org/html/rfc5280#section-4.1.2.5.1), že představuje data od roku 1950 do roku 2050. RFC 5280 dále vyžaduje použití časového pásma „Z“ a uvedení sekund.

GeneralizedTime podporuje data po roce 2050 jednoduše tím, že rok zapisuje čtyřmi číslicemi. Umožňuje také zlomky sekund (poněkud překvapivě s čárkou i tečkou jako desetinným oddělovačem). RFC 5280 zlomky sekund zakazuje a vyžaduje „Z“.

OBJECT IDENTIFIER
-----------------

Identifikátory objektů jsou globálně jedinečné hierarchické identifikátory tvořené posloupností celých čísel. Mohou odkazovat na jakoukoli „věc“, obvykle se ale používají k identifikaci standardů, algoritmů, rozšíření certifikátů, organizací nebo dokumentů s pravidly. Například [1.2.840.113549](https://oid-base.com/get/1.2.840.113549) označuje RSA Security LLC. RSA pak může přidělovat OID začínající tímto prefixem, například [1.2.840.113549.1.1.11](https://oid-base.com/get/1.2.840.113549.1.1.11). Ten označuje sha256WithRSAEncryption podle definice v [RFC 8017](https://tools.ietf.org/html/rfc8017#page-69).

Podobně [1.3.6.1.4.1.11129](https://oid-base.com/get/1.3.6.1.4.1.11129) označuje Google, Inc. Google přidělil [1.3.6.1.4.1.11129.2.4.2](https://oid-base.com/get/1.3.6.1.4.1.11129.2.4.2) rozšíření [seznamu SCT](https://letsencrypt.org/2018/04/04/sct-encoding.html) používanému v Certificate Transparency (které původně vzniklo v Googlu), jak je definováno v [RFC 6962](https://tools.ietf.org/html/rfc6962).

Množina podřízených OID pod daným prefixem se nazývá „větev OID“. Kratší OID zabírají méně místa, a proto jsou přidělení v kratších větvích cennější, zvláště u formátů, v nichž se dané OID často přenáší. Větev OID [2.5](https://oid-base.com/get/2.5) je přidělena „Directory Services“, řadě specifikací zahrnující X.509, na kterém jsou certifikáty HTTPS založeny. Touto krátkou větví začíná mnoho polí v certifikátech. Například [2.5.4.6](https://oid-base.com/get/2.5.4.6) znamená „countryName“, zatímco [2.5.4.10](https://oid-base.com/get/2.5.4.10) znamená „organizationName“. Většina certifikátů musí každé z těchto OID zakódovat alespoň jednou, takže se jejich krátkost hodí.

Ve specifikacích se OID pro přehlednost běžně zapisují pomocí čitelných názvů a mohou být definována připojením k jinému OID. [Například v RFC 8017](https://tools.ietf.org/html/rfc8017#page-68):

```asn1
   pkcs-1    OBJECT IDENTIFIER ::= {
       iso(1) member-body(2) us(840) rsadsi(113549) pkcs(1) 1
   }
   ...

   sha256WithRSAEncryption      OBJECT IDENTIFIER ::= { pkcs-1 11 }
```

NULL
----

NULL je zkrátka NULL.

SEQUENCE a SEQUENCE OF
------------------------

Nenechte se zmást názvy: jde o dva velmi odlišné typy. SEQUENCE odpovídá „struct“ ve většině programovacích jazyků. Obsahuje pevný počet polí různých typů. Podívejte se například na [ukázku Certificate níže](#bit-string-and-octet-string).

Naproti tomu SEQUENCE OF obsahuje libovolný počet polí jediného typu. Odpovídá tedy poli nebo seznamu v programovacím jazyce. [Například](https://tools.ietf.org/html/rfc5280#page-116):

```asn1
   RDNSequence ::= SEQUENCE OF RelativeDistinguishedName
```

Může jít o 0, 1 nebo 7 000 položek RelativeDistinguishedName v určitém pořadí.

SEQUENCE a SEQUENCE OF ale přece jen mají něco společného: oba se kódují stejně! Více v části [Kódování](#sequence-encoding).

SET a SET OF
--------------

Jsou téměř stejné jako SEQUENCE a SEQUENCE OF, pořadí jejich prvků však záměrně nemá žádný význam. V zakódované podobě ovšem musí být seřazeny. [Příklad](https://tools.ietf.org/html/rfc5280#page-116):

```asn1
RelativeDistinguishedName ::=
  SET SIZE (1..MAX) OF AttributeTypeAndValue
```

Poznámka: Tento příklad pomocí klíčového slova SIZE navíc určuje, že RelativeDistinguishedName musí obsahovat alespoň jeden prvek. Obecně ale SET a SET OF mohou mít nulovou velikost.

BIT STRING a OCTET STRING
---------------------------

Obsahují libovolné bity, respektive bajty. Mohou uchovávat nestrukturovaná data, například nonce nebo výstup hašovací funkce. Lze je také použít podobně jako ukazatel void v C nebo prázdné rozhraní (interface{}) v Go: k uchování strukturovaných dat, jejichž struktura je známá nebo definovaná odděleně od typového systému. [Například](https://tools.ietf.org/html/rfc5280#page-116) podpis certifikátu je definován jako BIT STRING:

```
Certificate  ::=  SEQUENCE  {
     tbsCertificate       TBSCertificate,
     signatureAlgorithm   AlgorithmIdentifier,
     signature            BIT STRING  }
```

Pozdější verze jazyka ASN.1 [umožňují podrobněji specifikovat](https://tools.ietf.org/html/rfc5912#page-99) obsah BIT STRING (totéž platí pro OCTET STRING).

CHOICE a ANY
--------------

CHOICE může obsahovat právě jeden z typů uvedených v jeho definici. [Například](https://tools.ietf.org/html/rfc5280#page-117) Time může obsahovat buď UTCTime, nebo GeneralizedTime:

```asn1
Time ::= CHOICE {
     utcTime        UTCTime,
     generalTime    GeneralizedTime }
```

ANY označuje hodnotu libovolného typu. V praxi bývá obvykle omezen pravidly, která v gramatice ASN.1 nelze plně vyjádřit. [Například](https://tools.ietf.org/html/rfc5280#page-111):

```asn1
   AttributeTypeAndValue ::= SEQUENCE {
     type     AttributeType,
     value    AttributeValue }

   AttributeType ::= OBJECT IDENTIFIER

   AttributeValue ::= ANY -- DEFINED BY AttributeType
```

To se hodí zejména pro rozšíření, u nichž chcete ponechat prostor pro nová pole definovaná samostatně až po vydání hlavní specifikace. Můžete tak registrovat nové typy (identifikátory objektů) a v jejich definicích určit strukturu nových polí.

ANY je pozůstatkem zápisu z roku 1988 v jazyce ASN.1. Ve [vydání z roku 1994](https://www.itu.int/rec/T-REC-X.680-199407-S/en) bylo ANY označeno za zastaralé a nahrazeno třídami Information Object Classes. Ty formálně popisují rozšiřitelnost, kterou uživatelé od ANY očekávali. Tato změna je už tak stará, že nejnovější specifikace ASN.1 (z roku 2015) ANY ani nezmiňují. Ve vydání z roku 1994 ale najdete vysvětlení tohoto přechodu. Starší syntaxi zde uvádím proto, že ji stále používá RFC 5280. [RFC 5912](https://tools.ietf.org/html/rfc5912) používá syntaxi z roku 2002 jazyka ASN.1 k vyjádření stejných typů jako RFC 5280 a několik souvisejících specifikací.

Další prvky zápisu
==============

Komentáře začínají znaky `--`. Pole v SEQUENCE nebo SET mohou být označena jako OPTIONAL nebo DEFAULT foo. Druhá možnost znamená totéž co OPTIONAL, jen se v případě chybějícího pole předpokládá hodnota „foo“. Typům s délkou (řetězcům, bajtovým a bitovým řetězcům, množinám a posloupnostem OF) lze přiřadit parametr SIZE, který délku omezí na přesnou hodnotu nebo rozsah.

Typy lze omezit na určité hodnoty pomocí složených závorek za definicí typu. [Tento příklad určuje](https://tools.ietf.org/html/rfc5280#page-117), že pole Version může nabývat tří hodnot, a přiřazuje jim výstižné názvy:

```asn1
Version ::= INTEGER { v1(0), v2(1), v3(2) }
```

Tento zápis se často používá také k přiřazení názvů konkrétním OID (zde jde o jedinou hodnotu, bez čárek oddělujících alternativní hodnoty). [Příklad z RFC 5280](https://tools.ietf.org/html/rfc5280#page-110).

```asn1
id-pkix  OBJECT IDENTIFIER  ::=
         { iso(1) identified-organization(3) dod(6) internet(1)
                    security(5) mechanisms(5) pkix(7) }
```

Setkáte se také se zápisem \[number\] a klíčovými slovy IMPLICIT, EXPLICIT, UNIVERSAL a APPLICATION. Ty určují podrobnosti kódování hodnoty, kterým se budeme věnovat níže.

Kódování
============

S ASN.1 je spojeno mnoho kódování: BER, DER, PER, XER a další. Basic Encoding Rules (BER) jsou poměrně flexibilní. Distinguished Encoding Rules (DER) jsou podmnožinou BER s pravidly [kanonizace](https://en.wikipedia.org/wiki/Canonicalization), takže danou strukturu lze vyjádřit jediným způsobem. Packed Encoding Rules (PER) používají ke kódování méně bajtů, a hodí se proto tam, kde záleží na úspoře místa nebo době přenosu. XML Encoding Rules (XER) se hodí, pokud z nějakého důvodu chcete použít XML.

Certifikáty HTTPS se obvykle kódují pomocí DER. Lze je zakódovat i pomocí BER. Podpis se však počítá z odpovídajícího kódování DER, nikoli z přesných bajtů certifikátu, takže kódování certifikátu pomocí BER zbytečně přidělává problémy. Popíšu BER a průběžně vysvětlím další omezení, která zavádí DER.

Při čtení této části doporučuji mít v jiném okně otevřené toto [dekódování skutečného certifikátu](https://lapo.it/asn1js/#MIIFaTCCBFGgAwIBAgISA9QVMY4sVx0pBfw-BSdonQ0JMA0GCSqGSIb3DQEBCwUAMEoxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MSMwIQYDVQQDExpMZXQncyBFbmNyeXB0IEF1dGhvcml0eSBYMzAeFw0xOTA5MjkxNjMzMzZaFw0xOTEyMjgxNjMzMzZaMBoxGDAWBgNVBAMTD2xldHNlbmNyeXB0Lm9yZzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANACdZdYiHLXjUhzqmaHENZ_mYp05-bbJw0RhmkCMN32iqPP0_2_KBRi60F87-itSNcKpQ_HQmEm5NoaH6rHzPuihv834og9TPsHeM0QOkaGOcR001h0kGRlIgynXzG7kSO7hTAUSbLfzCD4Hp8swLJHCz787sn_09DvPkJdeHhlQvrgfnGXqsHLqSXo9UtZXriwYS0HRCt5dKCLTOQAmS5ezKG2-7LVcuQQGsG1st3f2t092zJ8BDj_hAd0Zh8vKRwkDZvPzZzo76g4pGtVPRhmcDnVLin4PmsysWevEdzpJhNO7FXCsCA2aWo4ePAYKrR9BjyNlPAQ2QkKlI_cJx8CAwEAAaOCAncwggJzMA4GA1UdDwEB_wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwDAYDVR0TAQH_BAIwADAdBgNVHQ4EFgQUfCuj5zyEXzjUdndlK8VKWGyO3aowHwYDVR0jBBgwFoAUqEpqYwR93brm0Tm3pkVl7_Oo7KEwbwYIKwYBBQUHAQEEYzBhMC4GCCsGAQUFBzABhiJodHRwOi8vb2NzcC5pbnQteDMubGV0c2VuY3J5cHQub3JnMC8GCCsGAQUFBzAChiNodHRwOi8vY2VydC5pbnQteDMubGV0c2VuY3J5cHQub3JnLzAvBgNVHREEKDAmgg9sZXRzZW5jcnlwdC5vcmeCE3d3dy5sZXRzZW5jcnlwdC5vcmcwTAYDVR0gBEUwQzAIBgZngQwBAgEwNwYLKwYBBAGC3xMBAQEwKDAmBggrBgEFBQcCARYaaHR0cDovL2Nwcy5sZXRzZW5jcnlwdC5vcmcwggECBgorBgEEAdZ5AgQCBIHzBIHwAO4AdQDiaUuuJujpQAnohhu2O4PUPuf-dIj7pI8okwGd3fHb_gAAAW1-FbruAAAEAwBGMEQCIBROHx_dL0yfOpZs7Y6teawOn0oawhuW-3lvVs61DhjcAiB2ZuYwHu3BwYtqJTqfwsjQzjMZm8bQOutdme7dfaLXvgB1ACk8UZZUyDlluqpQ_FgH1Ldvv1h6KXLcpMMM9OVFR_R4AAABbX4VuuYAAAQDAEYwRAIgTc8_QJi4odfZIQ1u74zzvkBobqa08Wb_vxoqlgviUYICIGnAFgaPUg-xzKTRZGTGO4cj8UGJ3f52NoD6UWipPgIvMA0GCSqGSIb3DQEBCwUAA4IBAQAWl67Avp7BgqZW3VEWEjXHganloM8OHMS6en6S46nyuW0itGzth8SmCuG4i7fseecEG3Zsm0U1S1d3AffClOwWAGxB5Ark8Bpjszy8nGtNo7pFH-psGCBGj1pnklteu3jUzkkXKHS00Dsna1fJIzswgD7X7et8PRvV3ufIidkvvbfev0L2TYPWEFMM7WO0eIysf9WTljuflgcbzJXY0PatUBzL59ekidJZvGZ7d-hTl14CcCTrZ-VGMZlmK6tMhBuXJdAa5R0QSUpqirGRLz37Ox-SVh_tjA-I2tcRs0euAoX0etcr5cbBapV4-6LtSUt_rLBddeXCnDxqAWQxyy0p).

Typ–délka–hodnota
-----------------

BER používá kódování typ–délka–hodnota, stejně jako Protocol Buffers a Thrift. Při čtení bajtů zakódovaných pomocí BER tedy nejprve narazíte na typ, který se v ASN.1 nazývá tag. Jde o bajt nebo posloupnost bajtů určující typ zakódované hodnoty: INTEGER, UTF8String, strukturu nebo cokoli jiného.

| typ | délka | hodnota  |
| --- | ----- | -------- |
| 02  | 03    | 01 00 01 |

Následuje délka: číslo určující, kolik bajtů dat je třeba přečíst, abyste získali hodnotu. Poté následují bajty samotné hodnoty. Například hexadecimální bajty 02 03 01 00 01 představují INTEGER (tag 02 odpovídá INTEGER) o délce 03 a tříbajtové hodnotě tvořené bajty 01 00 01.

Kódování typ–délka–hodnota se liší od formátů s oddělovači, jako jsou JSON, CSV nebo XML. U nich délku pole předem neznáte a čtete bajty, dokud nenarazíte na očekávaný oddělovač (například `}` v JSON nebo `</some-tag>` v XML).

Tag
---

Tag obvykle zabírá jeden bajt. Libovolně velká čísla tagů lze zakódovat pomocí více bajtů (formou „high tag number“), ale většinou to není potřeba.

Několik příkladů tagů:

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

| Tag (desítkově) | Tag (hexadecimálně) | Typ                    |
| ---------------:| -------------------:| ---------------------- |
|               2 |                  02 | INTEGER                |
|               3 |                  03 | BIT STRING             |
|               4 |                  04 | OCTET STRING           |
|               5 |                  05 | NULL                   |
|               6 |                  06 | OBJECT IDENTIFIER      |
|              12 |                  0C | UTF8String             |
|              16 |       10 (a 30)\* | SEQUENCE a SEQUENCE OF |
|              17 |       11 (a 31)\* | SET a SET OF           |
|              19 |                  13 | PrintableString        |
|              22 |                  16 | IA5String              |
|              23 |                  17 | UTCTime                |
|              24 |                  18 | GeneralizedTime        |

Tyto tagy a několik dalších, které jsem pro nezajímavost vynechal, jsou „univerzální“. Definuje je totiž základní specifikace ASN.1 a ve všech modulech ASN.1 mají stejný význam.

Všechny tyto tagy jsou menší než 31 (0x1F), a má to dobrý důvod: bity 8, 7 a 6 (nejvyšší bity bajtu tagu) kódují dodatečné informace. Univerzální tagy s čísly vyššími než 31 by proto musely používat formu „high tag number“, která zabírá další bajty. Existuje několik univerzálních tagů vyšších než 31, jsou však poměrně vzácné.

Dva tagy označené `*` se vždy kódují jako 0x30 nebo 0x31, protože bit 6 určuje, zda je pole konstruované, nebo primitivní. Tyto tagy jsou vždy konstruované, takže mají v kódování bit 6 nastavený na 1. Podrobnosti najdete v části [Konstruované a primitivní kódování](#constructed-vs-primitive).

Třídy tagů
-----------

To, že univerzální třída využila všechna „dobrá“ čísla tagů, ještě neznamená, že nemůžeme definovat vlastní. Existují také třídy „application“, „private“ a „context-specific“. Rozlišují se pomocí bitů 8 a 7:

| Třída            | Bit 8 | Bit 7 |
| ---------------- | -----:| -----:|
| Universal        |     0 |     0 |
| Application      |     0 |     1 |
| Context-specific |     1 |     0 |
| Private          |     1 |     1 |

Specifikace používají především tagy univerzální třídy, protože poskytují nejdůležitější stavební prvky. Například sériové číslo certifikátu se kóduje jako obyčejný INTEGER s tagem 0x02. Někdy ale specifikace potřebuje definovat tagy třídy context-specific, aby rozlišila položky v SET nebo SEQUENCE s volitelnými poli, případně varianty CHOICE, které mají stejný typ. Vezměme například tuto definici:

```asn1
Point ::= SEQUENCE {
  x INTEGER OPTIONAL,
  y INTEGER OPTIONAL
}
```

Protože nepřítomná pole OPTIONAL se z kódování zcela vynechávají, nebylo by možné rozlišit Point pouze se souřadnicí x od Point pouze se souřadnicí y. Point, který má pouze souřadnici x s hodnotou 9, byste například zakódovali takto (30 zde znamená SEQUENCE):

```der
30 03 02 01 09
```

Jde o SEQUENCE o délce 3 bajtů, obsahující INTEGER o délce 1 s hodnotou 9. Úplně stejně byste ale zakódovali i Point pouze se souřadnicí y s hodnotou 9, takže zápis není jednoznačný.

Pokyny pro kódování
---------------------

K odstranění této nejednoznačnosti musí specifikace obsahovat pokyny pro kódování, které každé položce přiřadí jedinečný tag. A protože nesmíme předefinovat tagy UNIVERSAL, musíme použít některou z ostatních tříd, například APPLICATION:

```asn1
Point ::= SEQUENCE {
  x [APPLICATION 0] INTEGER OPTIONAL,
  y [APPLICATION 1] INTEGER OPTIONAL
}
```

Pro tento účel se však mnohem častěji používá třída context-specific, která se zapisuje samotným číslem v hranatých závorkách:

```asn1
Point ::= SEQUENCE {
  x [0] INTEGER OPTIONAL,
  y [1] INTEGER OPTIONAL
}
```

Point pouze se souřadnicí x s hodnotou 9 tedy nyní zakódujete takto: místo kódování x jako UNIVERSAL INTEGER nastavíte bity 8 a 7 tagu na (1, 0), čímž označíte třídu context-specific. Nízké bity nastavíte na 0 a získáte:

```der
30 03 80 01 09
```

Pro Point pouze se souřadnicí y s hodnotou 9 postupujete stejně, jen nízké bity nastavíte na 1:

```der
30 03 81 01 09
```

Nebo můžete zapsat Point, jehož souřadnice x i y mají hodnotu 9:

```der
30 06 80 01 09 81 01 09
```

Délka
------

Délka v trojici tag–délka–hodnota vždy představuje celkový počet bajtů objektu včetně všech vnořených objektů. SEQUENCE s jedním polem tedy nemá délku 1. Její délka odpovídá počtu bajtů, které zabírá zakódovaná podoba tohoto pole.

Délku lze zakódovat dvěma způsoby: krátkou nebo dlouhou formou. Krátká forma je jediný bajt s hodnotou od 0 do 127.

Dlouhá forma má alespoň dva bajty a bit 8 prvního bajtu je nastaven na 1. Bity 7-1 prvního bajtu určují, kolik dalších bajtů obsahuje samotné pole délky. Zbývající bajty pak udávají samotnou délku jako vícebajtové celé číslo.

Lze tak zapsat velmi dlouhé hodnoty. Největší možná délka by začínala bajtem 254 (bajt délky 255 je vyhrazen pro budoucí rozšíření). Ten určuje, že jen v poli délky následuje dalších 126 bajtů. Pokud by každý z těchto 126 bajtů měl hodnotu 255, znamenalo by to, že v poli hodnoty následuje 2<sup>1008</sup>-1 bajtů.

Dlouhá forma umožňuje zapsat stejnou délku několika způsoby: například pomocí dvou bajtů tam, kde by stačil jeden, nebo pomocí dlouhé formy tam, kde by stačila krátká. DER vyžaduje vždy co nejkratší zápis délky.

Bezpečnostní upozornění: Dekódovaným hodnotám délky nikdy slepě nedůvěřujte! Například ověřte, že zakódovaná délka je menší než množství dat dostupných v dekódovaném proudu.

Neurčená délka
-----------------

V BER lze zakódovat také řetězec, SEQUENCE, SEQUENCE OF, SET nebo SET OF, jehož délku předem neznáte (například při streamování výstupu). Délku v takovém případě zapíšete jediným bajtem s hodnotou 80 a hodnotu jako posloupnost zřetězených zakódovaných objektů. Konec označují dva bajty `00 00` (které lze chápat jako objekt nulové délky s tagem 0). UTF8String s neurčenou délkou by tedy byl zakódován jako jeden nebo více zřetězených zakódovaných UTF8String zakončených bajty 00 00.

Neurčenou délku lze libovolně vnořovat! Například řetězce UTF8String, které zřetězíte do jednoho UTF8String s neurčenou délkou, mohou být samy zakódované s určenou i neurčenou délkou.

Bajt délky 80 je jednoznačný, protože není platným zápisem délky v krátké ani dlouhé formě. Protože je bit 8 nastaven na 1, normálně by se vyhodnotil jako dlouhá forma. Zbývající bity by ale musely udávat počet dalších bajtů tvořících délku. Bity 7-1 jsou všechny 0, což by znamenalo dlouhou formu s nulovým počtem bajtů délky. To není dovoleno.

DER kódování s neurčenou délkou zakazuje. Musíte použít kódování s určenou délkou, tedy s délkou uvedenou na začátku.

Konstruované a primitivní kódování
------------------------

Bit 6 prvního bajtu tagu určuje, zda je hodnota zakódována v primitivní, nebo konstruované formě. Primitivní kódování vyjadřuje hodnotu přímo. Například u UTF8String by ji tvořil pouze samotný řetězec v bajtech UTF-8. Konstruované kódování vyjadřuje hodnotu zřetězením jiných zakódovaných hodnot. Jak je popsáno v části „Neurčená délka“, UTF8String v konstruovaném kódování by se skládal z několika zřetězených zakódovaných UTF8String, každého s vlastním tagem a délkou. Délka celého UTF8String by byla součtem délek všech těchto zřetězených zakódovaných hodnot v bajtech. Konstruované kódování může používat určenou i neurčenou délku. Primitivní kódování vždy používá určenou délku, protože neurčenou délku nelze vyjádřit bez konstruovaného kódování.

INTEGER, OBJECT IDENTIFIER a NULL musí používat primitivní kódování. SEQUENCE, SEQUENCE OF, SET a SET OF musí používat konstruované kódování, protože ze své podstaty zřetězují více hodnot. BIT STRING, OCTET STRING, UTCTime, GeneralizedTime a různé řetězcové typy mohou podle volby odesílatele používat primitivní i konstruované kódování, ovšem pouze v BER. V DER musí všechny typy, které umožňují volbu mezi primitivním a konstruovaným kódováním, používat primitivní kódování.

EXPLICIT a IMPLICIT
--------------------

Výše popsané [pokyny pro kódování](#encoding-instructions), například `[1]` nebo `[APPLICATION 8]`, mohou obsahovat také klíčové slovo EXPLICIT nebo IMPLICIT ([příklad z RFC 5280](https://tools.ietf.org/html/rfc5280#page-117)):

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

Tím se určuje způsob kódování tagu. Nesouvisí to s tím, zda je číslo tagu přiřazeno explicitně, protože IMPLICIT i EXPLICIT se vždy uvádějí společně s konkrétním číslem tagu. IMPLICIT kóduje pole stejně jako jeho základní typ, ale s číslem tagu a třídou uvedenými v modulu ASN.1. EXPLICIT kóduje pole jako jeho základní typ a poté jej obalí vnějším kódováním. Vnější kódování má číslo tagu a třídu z modulu ASN.1 a navíc nastavený [bit konstruovaného kódování](#constructed-vs-primitive).

Zde je příklad pokynu pro kódování ASN.1 s použitím IMPLICIT:

```asn1
[5] IMPLICIT UTF8String
```

„hi“ by se zakódovalo takto:

```der
85 02 68 69
```

Porovnejte to s tímto pokynem pro kódování ASN.1 s použitím EXPLICIT:

```asn1
[5] EXPLICIT UTF8String
```

„hi“ by se zakódovalo takto:

```der
A5 04 0C 02 68 69
```

Pokud klíčové slovo IMPLICIT nebo EXPLICIT chybí, platí EXPLICIT. Modul ale může na začátku nastavit jinou výchozí možnost pomocí „EXPLICIT TAGS“, „IMPLICIT TAGS“ nebo „AUTOMATIC TAGS“. Například RFC 5280 definuje dva moduly: jeden, v němž jsou výchozí [tagy EXPLICIT](https://tools.ietf.org/html/rfc5280#appendix-A.1), a druhý, který první modul importuje a jako výchozí používá [tagy IMPLICIT](https://tools.ietf.org/html/rfc5280#appendix-A.2). Implicitní kódování zabírá méně bajtů než explicitní.

AUTOMATIC TAGS funguje stejně jako IMPLICIT TAGS, ale čísla tagů (`[0]`, `[1]` atd.) se navíc automaticky přiřazují tam, kde jsou potřeba, například v SEQUENCE s volitelnými poli.

Kódování jednotlivých typů
==========================

Na příkladech si ukážeme, jak se kódují hodnoty jednotlivých typů.

Kódování INTEGER
----------------

Celá čísla se kódují jedním nebo více bajty ve dvojkovém doplňku. Nejvyšší bit (bit 8) bajtu zcela vlevo je znaménkový. Jak uvádí specifikace BER:

Hodnota binárního čísla ve dvojkovém doplňku se odvodí očíslováním bitů v oktetech obsahu. Číslování začíná bitem 1 posledního oktetu jako bitem nula a končí bitem 8 prvního oktetu. Každému bitu se přiřadí číselná hodnota 2<sup>N</sup>, kde N je jeho pozice v uvedeném číslování. Hodnota binárního čísla ve dvojkovém doplňku se získá sečtením číselných hodnot všech bitů nastavených na jedničku s výjimkou bitu 8 prvního oktetu. Je-li bit 8 prvního oktetu nastaven na jedničku, jeho číselná hodnota se od součtu odečte.

Například tato jednobajtová hodnota (zapsaná binárně) kóduje desítkové číslo 50:

00110010 (== desítkově 50)

Tato jednobajtová hodnota (zapsaná binárně) kóduje desítkové číslo -100:

10011100 (== desítkově -100)

Tato pětibajtová hodnota (zapsaná binárně) kóduje desítkové číslo -549755813887 (tedy -2<sup>39</sup> + 1):

10000000 00000000 00000000 00000000 00000001 (== desítkově -549755813887)

BER i DER vyžadují co nejkratší zápis celých čísel. Zajišťuje to následující pravidlo:

```
... bity prvního oktetu a bit 8 druhého oktetu:

1.  nesmějí být všechny jedničky a
2.  nesmějí být všechny nuly.
```

Pravidlo (2) zhruba znamená: pokud kódování začíná nulovými bajty, můžete je vynechat a získáte stejné číslo. Důležitý je také bit 8 druhého bajtu, protože pro některé hodnoty úvodní nulový bajt použít musíte. Například desítkové číslo 255 se kóduje dvěma bajty:

00000000 11111111

Samotný jednobajtový zápis 11111111 totiž znamená -1 (bit 8 je znaménkový).

Pravidlo (1) nejlépe vysvětlí příklad. Desítkové číslo -128 se kóduje takto:

10000000 (== desítkově -128)

Dalo by se ale zakódovat také takto:

11111111 10000000 (== desítkově -128, ale neplatné kódování)

Po rozepsání dostaneme -2<sup>15</sup> + 2<sup>14</sup> + 2<sup>13</sup> + 2<sup>12</sup> + 2<sup>11</sup> + 2<sup>10</sup> + 2<sup>9</sup> + 2<sup>8</sup> + 2<sup>7</sup> == -2<sup>7</sup> == -128. Číslice 1 v „10000000“ byla v jednobajtovém kódování znaménkovým bitem, ale ve dvoubajtovém kódování znamená 27.

Tato transformace platí obecně: před každé záporné číslo zakódované v BER (nebo DER) můžete přidat 11111111 a získáte stejné číslo. Tomu se říká [rozšíření znaménka](https://andybargh.com/binary-sign-extension/). Stejně tak pokud kódování záporného čísla začíná bajtem 11111111, můžete tento bajt odstranit a hodnota se nezmění. Proto BER i DER vyžadují nejkratší kódování.

Kódování INTEGER ve dvojkovém doplňku má [praktický dopad na vydávání certifikátů](https://bugzilla.mozilla.org/buglist.cgi?query_format=specific&order=relevance%20desc&bug_status=__closed__&product=NSS&content=%E2%80%9CSerial%20entropy%E2%80%9D&comments=0&list_id=16028758): RFC 5280 vyžaduje kladná sériová čísla. Protože první bit je vždy znaménkový, sériové číslo zakódované v DER do 8 bajtů může mít délku nejvýše 63 bitů. Zakódování 64bitového kladného sériového čísla vyžaduje hodnotu o délce 9 bajtů, přičemž první bajt je nulový.

Zde je kódování INTEGER s hodnotou 2<sup>63</sup>+1, což je 64bitové kladné číslo:

```der
02 09 00 80 00 00 00 00 00 00 01
```

Kódování řetězců
---------------

Řetězce se kódují přímo svými bajty. Protože IA5String a PrintableString pouze definují různé podmnožiny povolených znaků, jejich kódování se liší jen tagem.

PrintableString obsahující „hi“:

```der
13 02 68 69
```

IA5String obsahující „hi“:

```der
16 02 68 69
```

UTF8String funguje stejně, ale umožňuje zakódovat širší škálu znaků. Například takto se kóduje UTF8String obsahující U+1F60E Smiling Face With Sunglasses (😎):

```der
0c 04 f0 9f 98 8e
```

Kódování data a času
----------------------

UTCTime a GeneralizedTime se překvapivě kódují jako řetězce! Jak jsme popsali výše v části „Typy“, UTCTime zapisuje datum a čas ve formátu YYMMDDhhmmss. GeneralizedTime používá místo YY čtyřciferný rok YYYY. Oba typy mají volitelný posun časového pásma nebo „Z“ (Zulu), které označuje nulový posun vůči UTC.

Například 15. prosince 2019 v 19:02:10 v časovém pásmu PST (UTC-8) se v UTCTime zapisuje jako 191215190210-0800. V kódování BER:

```der
17 11 31 39 31 32 31 35 31 39 30 32 31 30 2d 30 38 30 30
```

V kódování BER jsou sekundy u UTCTime i GeneralizedTime volitelné a posuny časového pásma jsou povoleny. DER (společně s RFC 5280) však vyžaduje přítomnost sekund, zakazuje jejich zlomky a stanovuje, že čas musí být vyjádřen v UTC pomocí „Z“.

Výše uvedené datum a čas by se v DER zakódovaly takto:

```der
17 0d 31 39 31 32 31 36 30 33 30 32 31 30 5a
```

Kódování OBJECT IDENTIFIER
--------------------------

Jak jsme [popsali výše](#object-identifier), OID jsou v principu posloupnosti celých čísel. Vždy mají alespoň dvě složky. První složka je vždy 0, 1 nebo 2. Pokud je první složka 0 nebo 1, druhá je vždy menší než 40. První dvě složky proto lze jednoznačně vyjádřit jako 40\*X+Y, kde X je první složka a Y druhá.

Například při kódování 2.999.3 spojíte první dvě složky do desítkové hodnoty 1079 (40\*2 + 999), čímž získáte „1079.3“.

Po této transformaci se každá složka zakóduje v soustavě o základu 128, s nejvýznamnějším bajtem na začátku. Bit 8 je v každém bajtu kromě posledního bajtu složky nastaven na „1“. Podle toho poznáte, kde jedna složka končí a další začíná. Složka „3“ se tedy zapíše jednoduše jako bajt 0x03. Složka „129“ se zapíše jako bajty 0x81 0x01. Zakódované složky OID se poté zřetězí a vytvoří zakódovanou hodnotu celého OID.

OID musí být v BER i DER zapsáno co nejmenším počtem bajtů. Složky proto nesmějí začínat bajtem 0x80.

Například OID 1.2.840.113549.1.1.11 (označující [sha256WithRSAEncryption](https://tools.ietf.org/html/rfc8017#appendix-A.2.4)) se kóduje takto:

```der
06 09 2a 86 48 86 f7 0d 01 01 0b
```

Kódování NULL
-------------

Hodnota objektu obsahujícího NULL má vždy nulovou délku. Kódování NULL tedy tvoří pouze tag a pole délky s hodnotou nula:

```der
05 00
```

Kódování SEQUENCE
-----------------

SEQUENCE vždy používá konstruované kódování, protože obsahuje další objekty. Bajty hodnoty SEQUENCE tedy obsahují zřetězená zakódovaná pole této SEQUENCE v pořadí, v jakém byla definována. To také znamená, že bit 6 tagu SEQUENCE ([bit rozlišující konstruované a primitivní kódování](#constructed-vs-primitive)) je vždy nastaven na 1. Přestože číslo tagu SEQUENCE je technicky 0x10, jeho zakódovaný bajt má vždy hodnotu 0x30.

Pole označená jako OPTIONAL se z kódování SEQUENCE vynechají, pokud nejsou přítomna. Při zpracování prvků SEQUENCE může dekodér určit typ právě dekódované hodnoty podle dosud dekódovaných prvků a přečtených bajtů tagu. Pokud je zápis nejednoznačný, například mají-li prvky stejný typ, musí modul ASN.1 obsahovat [pokyny pro kódování](#encoding-instructions), které prvkům přiřadí různá čísla tagů.

Pole DEFAULT se podobají polím OPTIONAL. Pokud má pole výchozí hodnotu, lze ho z kódování BER vynechat. V kódování DER musí být vynecháno (MUST).

Například RFC 5280 [definuje AlgorithmIdentifier](https://tools.ietf.org/html/rfc5280#page-118) jako SEQUENCE:

```asn1
   AlgorithmIdentifier  ::=  SEQUENCE  {
        algorithm               OBJECT IDENTIFIER,
        parameters              ANY DEFINED BY algorithm OPTIONAL  }
```

Zde je kódování AlgorithmIdentifier obsahujícího 1.2.840.113549.1.1.11. RFC 8017 uvádí, že [„parameters“ má mít pro tento algoritmus typ NULL](https://tools.ietf.org/html/rfc8017#appendix-A.2).

```der
30 0d 06 09 2a 86 48 86 f7 0d 01 01 0b 05 00
```

Kódování SEQUENCE OF
--------------------

SEQUENCE OF se kóduje úplně stejně jako SEQUENCE. Používá dokonce stejný tag! Při dekódování lze SEQUENCE od SEQUENCE OF rozlišit jedině podle modulu ASN.1.

Zde je kódování SEQUENCE OF INTEGER obsahující čísla 7, 8 a 9:

```der
30 09 02 01 07 02 01 08 02 01 09
```

Kódování SET
------------

Stejně jako SEQUENCE používá SET konstruované kódování. Bajty jeho hodnoty tedy tvoří zřetězená zakódovaná pole. Jeho číslo tagu je 0x11. Protože [bit rozlišující konstruované a primitivní kódování](#constructed-vs-primitive) (bit 6) je vždy nastaven na 1, kóduje se bajtem tagu 0x31.

Kódování SET stejně jako SEQUENCE vynechává pole OPTIONAL a DEFAULT, pokud chybějí nebo mají výchozí hodnotu. Případnou nejednoznačnost způsobenou poli stejného typu musí vyřešit modul ASN.1. Pole DEFAULT s výchozí hodnotou musí být z kódování DER vynechána (MUST).

V BER lze SET zakódovat v libovolném pořadí. V DER musí být SET zakódován vzestupně podle serializované hodnoty jednotlivých prvků.

Kódování SET OF
---------------

SET OF se kóduje stejně jako SET, včetně bajtu tagu 0x31. Pro DER platí podobný požadavek: SET OF musí být zakódován ve vzestupném pořadí. Protože všechny prvky SET OF mají stejný typ, seřazení podle tagu nestačí. Prvky SET OF se proto řadí podle svých zakódovaných hodnot. S kratšími hodnotami se zachází, jako by byly zprava doplněny nulami.

Kódování BIT STRING
-------------------

BIT STRING o N bitech se kóduje jako N/8 bajtů (zaokrouhleno nahoru) s jednobajtovým prefixem obsahujícím „počet nevyužitých bitů“. Ten odstraní nejednoznačnost, pokud počet bitů není násobkem 8. Například k zakódování bitového řetězce 011011100101110111 (18 bitů) potřebujeme alespoň tři bajty. To je ale o něco víc, než potřebujeme: získáme prostor pro celkem 24 bitů. Šest z nich zůstane nevyužitých. Těchto šest bitů se zapisuje na pravý konec bitového řetězce, takže kódování vypadá takto:

```der
03 04 06 6e 5d c0
```

V BER mohou mít nevyužité bity libovolnou hodnotu. Poslední bajt tohoto kódování by tedy mohl být také c1, c2, c3 a podobně. V DER musí být všechny nevyužité bity nulové.

Kódování OCTET STRING
---------------------

OCTET STRING se kóduje přímo bajty, které obsahuje. Zde je příklad OCTET STRING obsahujícího bajty 03, 02, 06 a A0:

```der
04 04 03 02 06 A0
```

Kódování CHOICE a ANY
-----------------------

Pole CHOICE nebo ANY se kóduje podle typu, který skutečně obsahuje, pokud pokyny pro kódování neurčují jinak. Pokud tedy pole CHOICE ve specifikaci ASN.1 povoluje INTEGER nebo UTCTime a konkrétní kódovaný objekt obsahuje INTEGER, zakóduje se jako INTEGER.

V praxi mají pole CHOICE velmi často vlastní pokyny pro kódování. Podívejme se například na tuto ukázku z RFC 5280. Pokyny pro kódování jsou zde nutné k rozlišení rfc822Name a dNSName, protože oba mají základní typ IA5String:

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

Zde je příklad kódování GeneralName obsahujícího rfc822Name `a@example.com`. Připomeňme, že \[1\] znamená číslo tagu 1 ve třídě „context-specific“ (bit 8 nastavený na 1) s metodou kódování tagu IMPLICIT:

```der
81 0d 61 40 65 78 61 6d 70 6c 65 2e 63 6f 6d
```

Zde je příklad kódování GeneralName obsahujícího dNSName „example.com“:

```der
82 0b 65 78 61 6d 70 6c 65 2e 63 6f 6d
```

Bezpečnost
======

Při dekódování BER a DER je nutná velká opatrnost, zejména v jazycích bez paměťové bezpečnosti, jako jsou C a C++. Dekodéry mají za sebou dlouhou historii bezpečnostních chyb. Zpracování vstupu je obecně [častým zdrojem zranitelností](https://langsec.org/). Zdá se, že kódovací formáty ASN.1 jsou k nim [obzvlášť náchylné](https://bugzilla.redhat.com/show_bug.cgi?id=1300257). Jde o složité formáty s mnoha poli proměnné délky. Proměnnou délku mají dokonce i samotné délky! Vstup ASN.1 navíc často ovládá útočník. Pokud musíte zpracovat certifikát, abyste rozlišili oprávněného uživatele od neoprávněného, počítejte s tím, že někdy místo certifikátu zpracováváte podivný vstup vytvořený přímo k zneužití chyb ve vašem kódu ASN.1.

Těmto problémům nejlépe předejdete tím, že pokud možno použijete jazyk s paměťovou bezpečností. Ať už takový jazyk použít můžete, nebo ne, je nejlepší nechat kód pro zpracování vstupu vygenerovat [překladačem ASN.1](https://www.itu.int/en/ITU-T/asn1/Pages/Tools.aspx) místo jeho ručního psaní od začátku.

Poděkování
================

Velmi mi pomohl text [A Layman's Guide to a Subset of ASN.1, DER, and BER](https://luca.ntop.org/Teaching/Appunti/asn1.html), ze kterého jsem se o těchto tématech mnoho naučil. Rád bych také poděkoval autorům textu [A warm welcome to DNS](https://powerdns.org/hello-dns/). Skvěle se čte a inspiroval styl tohoto dokumentu.

Malý bonus
==============

Všimli jste si někdy, že certifikát zakódovaný v PEM vždy začíná „MII“? Například:

```
-----BEGIN CERTIFICATE-----

MIIFajCCBFKgAwIBAgISA6HJW9qjaoJoMn8iU8vTuiQ2MA0GCSqGSIb3DQEBCwUA
...
```

Teď už víte dost na to, abyste vysvětlili proč! [Certificate je SEQUENCE](https://tools.ietf.org/html/rfc5280#page-116), takže začíná bajtem 0x30. Další bajty tvoří [pole délky](#length). Certifikáty mají téměř vždy více než 127 bajtů, takže pole délky musí používat dlouhou formu. Jeho první bajt tedy bude 0x80 + N, kde N je počet následujících bajtů délky. N je téměř vždy 2, protože tolik bajtů stačí k zakódování délek od 128 do 65535 a téměř všechny certifikáty spadají do tohoto rozsahu.

Víme tedy, že první dva bajty certifikátu zakódovaného v DER jsou 0x30 0x82. [Kódování PEM](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) používá [base64](https://en.wikipedia.org/wiki/Base64), které převádí 3 bajty binárního vstupu na 4 výstupní znaky ASCII. Jinými slovy: base64 převádí 24 bitů binárního vstupu na 4 výstupní znaky ASCII, přičemž každému znaku přiřadí 6 vstupních bitů. Víme, jak bude vypadat prvních 16 bitů každého certifikátu. Abychom dokázali, že první znaky (téměř) každého certifikátu budou „MII“, musíme se podívat na další 2 bity. Jde o nejvýznamnější bity významnějšího ze dvou bajtů délky. Mohou být někdy nastaveny na 1? Jedině pokud má certifikát více než 16 383 bajtů! Můžeme tedy předpovědět, že první znaky certifikátu PEM budou vždy stejné. Vyzkoušejte si to:

```bash
xxd -r -p <<<308200 | base64
```
