---
title: En varm velkomst til ASN.1 og DER
slug: a-warm-welcome-to-asn1-and-der
lastmod: 2021-03-21
---

Dette dokument giver en blid introduktion til de datastrukturer og formater, der definerer de certifikater, der anvendes i HTTPS. Det bør være tilgængeligt for alle med en lille smule datalogi erfaring og en smule bekendtskab med certifikater.

Et HTTPS-certifikat er en filtype som enhver anden fil. Dens indhold følger et format defineret af [RFC 5280](https://tools.ietf.org/html/rfc5280). Definitionerne udtrykkes i ASN.1, som er et sprog, der anvendes til at definere filformater eller (tilsvarende) datastrukturer. Du kan for eksempel i C skrive:

```c
struct point {
  int x, y;
  char label[10];
};
```

I Go vil du skrive:

```go
type point struct {
  x, y int
  label string
}
```

Og i ASN.1 ville du skrive:

```asn1
Point ::= SEQUENCE {
  x INTEGER,
  y INTEGER,
  label UTF8String
}
```

Fordelen ved at skrive ASN.1 definitioner i stedet for Go eller C definitioner er, at de er sproguafhængige. Du kan implementere ASN.1 definitionen af punkt på et hvilket som helst sprog, eller (helst) du kan bruge et værktøj, der tager ASN. definition og automatisk genererer kode implementering i dit foretrukne sprog. Et sæt af ASN.1 definitioner kaldes et "[modul](https://www.obj-sys.com/asn1tutorial/node6.html)."

Den anden vigtige ting om ASN. er, at det kommer med en række serialiseringsformater\-- måder at forvandle en in-memory datastruktur til en serie af bytes (eller en fil) og tilbage igen. Dette gør det muligt at læse et certifikat genereret af en maskine på en anden maskine - selv om den maskine bruger en anden CPU og styresystem.

Der er nogle andre sprog, som [gør de samme ting](https://en.wikipedia.org/wiki/Interface_description_language) som ASN.1. . For eksempel tilbyder Protokolbuffere både et [sprog](https://developers.google.com/protocol-buffers/docs/proto3) til definerende typer og et [serialiserings format](https://developers.google.com/protocol-buffers/docs/encoding) til kodning objekter af de typer, du har defineret. [Thrift](https://thrift.apache.org/) har også både et sprog og et serialiseringsformat. Både Protocol Buffer og Thrift kunne lige så let have været anvendt til at definere formatet for HTTPS certifikater, men ASN.1 (1984) havde væsentlige fordel at det allerede eksisterede, da certifikater (1988) og HTTPS (1994) blev opfundet.</p> 

ASN.1 er blevet revideret flere gange gennem årene, med udgaver normalt identificeret ved det år, de blev offentliggjort. Formålet med dette dokument er at undervise nok i ASN. klart at forstå RFC 5280 og andre standarder relateret til HTTPS certifikater så vi vil hovedsageligt tale om 1988 udgaven, med et par noter om funktioner, der blev tilføjet i senere udgaver. Du kan downloade de forskellige udgaver direkte fra ITU, med den undtagelse, at nogle kun er tilgængelige for ITU medlemmer. De relevante standarder er [X.680](https://www.itu.int/rec/T-REC-X.680) (som definerer ASN. sproget) og [X.690](https://www.itu.int/rec/T-REC-X.690) (som definerer serialiseringsformaterne DER og BER). Tidligere versioner af disse standarder var henholdsvis [X.208](https://www.itu.int/rec/T-REC-X.208/en) og [X.209](https://www.itu.int/rec/T-REC-X.209/en).

ASN.1's vigtigste serialiseringsformat er "Distinguished Encoding Rules" (DER). De er en variant af "Basic Encoding Rules" (BER) med kanonisering tilføjet. For eksempel, hvis en type omfatter en SET OF, skal medlemmer sorteres til DER serialisering.

Et certifikat repræsenteret i DER er ofte yderligere kodet i PEM, som bruger [base64](https://en.wikipedia.org/wiki/Base64) til indkode vilkårlige bytes som alfanumeriske tegn (og '+' og '/') og tilføjer separatorlinjer ("\-\-\-\--BEGIN CERTIFICATE\-\-\-\-" og "\-\-\-\-\--END CERTIFICATE\-\-\-\-\--"). PEM er nyttigt, fordi det er lettere at kopiere og indsætte.

Dette dokument vil først beskrive de typer og notation der anvendes af ASN.1, og vil derefter beskrive, hvordan objekter defineret ved hjælp af ASN.1 er kodet. Du er velkommen til at springe frem og tilbage mellem sektionerne, især da visse funktioner i ASN.1 sproget angiver kodningen direkte. Dette dokument foretrækker mere velkendte udtryk, og bruger derfor "byte" i stedet for "octet" og "værdi" i stedet for "indhold". Det bruger "serialisering" og "kodning" omskifteligt.





Data Typer
=========





HELTAL (INTEGER)
-------

Godt gamle, velkendte INTEGER. Disse kan være positive eller negative. Hvad er virkelig usædvanligt ved ASN.1 INTEGERs er, at de kan være vilkårligt store. Ikke plads nok i en int64? Intet problem. Dette er især praktisk når den repræsenterer ting som et RSA-modul, som er meget større end en int64 (såsom 2<sup>2048</sup>stor). Teknisk set er der et maksimalt heltal i DER, men det er usædvanligt stort: Længden af ethvert DER felt kan udtrykkes som en serie på op til 126 bytes. Så den største INTEGER du kan repræsentere i DER er 256<sup>(2\*\*1008)</sup>-1. For en virkelig ubegrænset INTEGER du ville nødt til at kode i BER, som tillader ubestemt lange felter.





Tekststrenge
-------

ASN.1 har en masse strengtyper: BMPString, GeneralString, GraphicString, IA5String, ISO646String, NumericString, PrintableString, TeletexString, T61String, UniversalString, UTF8String, VideotexString, og VisibleString. I forbindelse med HTTPS-certifikater skal du for det meste bekymre dig om PrintableString, UTF8String og [IA5String](https://en.wikipedia.org/wiki/IA5STRING). Streng typen for et givet felt er defineret af ASN.1 modulet, som definerer feltet. [For eksempel](https://tools.ietf.org/html/rfc5280#page-127):



```
CPSuri ::= IA5String
```


PrintableString er en begrænset delmængde af ASCII, der tillader alfanumeriske, mellemrum og en specifik håndfuld tegnsætning: `' () + , - . / : = ?`. Det omfatter ikke `*` eller `@`. Der er ingen plads-størrelse fordele for mere restriktive strengtyper.

Nogle felter, såsom [DirectoryString in RFC 5280](https://tools.ietf.org/html/rfc5280#page-20), tillader serialiseringskode at vælge mellem flere strengtyper. Siden DER kodning indeholder den type streng, du bruger, så sørg for at når du indkode noget som PrintableString det [virkelig opfylder PrintableString -kravene](https://community.letsencrypt.org/t/2018-03-12-wildcard-certificate-encoding-issue/55485).

IA5String, baseret på [International Alphabet No. 5](https://en.wikipedia.org/wiki/T.50_(standard)), er mere tilladelig: Det giver næsten ethvert ASCII-tegn, og bruges til e-mail-adresse, DNS-navne og URL'er i certifikater. Bemærk, at der er et par byte værdier, hvor IA5-betydningen af byte værdien er forskellig fra US-ASCII-betydningen af den samme værdi.

TeletexString, BMPString og UniversalString er forældede til brug i HTTPS-certifikater men du kan se dem, når du fortolker ældre CA certifikater, som har lange levetider og kan gå forud for udfasningen af teksttyperne.

Strenge i ASN.1 er ikke ugyldige som strenge i C og C++. Det er faktisk helt lovligt at have indlejret null bytes. Dette kan forårsage sårbarheder, når to systemer fortolker den samme ASN.1 streng forskelligt. For eksempel, nogle CA'er [plejede at være i stand til at blive lokket til udstede](https://www.theregister.co.uk/2009/07/30/universal_ssl_certificate/) certifikat for "eksempel. om\\0.evil.com" på grundlag af ejerskab af evil.com. Certifikatvalideringsbiblioteker på det tidspunkt behandlede resultatet som gyldigt for "example.com". Vær meget forsigtig med at håndtere ASN.1 strenge i C og C++ for at undgå at skabe sårbarheder.





Datoer og tider
---------------

Igen, masser af tidstyper: UTCTime, GeneralizedTime, DATE, TIME-OF-DAY, DATE-TIME og VARIGHED. For HTTPS certifikater, du kun behøver at bekymre dig om om UTCTime og GeneralizedTime.

UTCTime repræsenterer en dato og tid som ÅÅMMDDhhmm[ss] med en valgfri tidszone offset eller "Z" til at repræsentere Zulu (aka UTC aka 0 tidszone forskydning). F. eks. repræsenterer UTCTimes 820102120000Z og 82010207 - 0500 begge den samme tid: 2 januar 1982, kl. 7 i New York City (UTC-5) og kl. 12 i UTC.

Eftersom UTCTime er tvetydig med hensyn til, om det er 1900-tallet eller 2000'erne, [RFC 5280 præciserer](https://tools.ietf.org/html/rfc5280#section-4.1.2.5.1), at den repræsenterer datoer fra 1950 til 2050. RFC 5280 kræver også, at "Z" tidszone skal bruges, og sekunder skal medtages.

GeneralizedTime understøtter datoer efter 2050 gennem den enkle formålstjenlige at repræsentere året med fire cifre. Det giver også mulighed for fraktionerede sekunder (underligt, med enten et komma eller et fuldt stop som decimaltallet separator). RFC 5280 forbyder fraktionelle sekunder og kræver "Z."





OBJEKT IDENTIFIKATOR
-----------------

Objektidentifikatorer er globalt unikke, hierarkiske identifikatorer lavet af en sekvens af heltal. De kan henvise til enhver form for "ting", men er almindeligt anvendt til at identificere standarder, algoritmer, certifikatudvidelser, organisationer eller politik dokumenter. Eksempel: [1.2.840.113549](http://oid-info.com/get/1.2.840.113549)identificerer RSA Security LLC. RSA kan derefter tildele OID'er startende med den præfiks, som [1.2.840.113549.1.1. 1](http://oid-info.com/get/1.2.840.113549.1.1.11), som identificerer sha256WithRSAEncryption, som defineret i [RFC 8017](https://tools.ietf.org/html/rfc8017#page-69).

Tilsvarende identificerer.3.6.1.4.1.11129</a> Google, Inc. Google tildelt [1.3.6.1.4.1.11129.2.4.](http://oid-info.com/get/1.3.6.1.4.1.11129.2.4.2)til identificere [SCT-listen udvidelsen](https://letsencrypt.org/2018/04/04/sct-encoding.html)brugt i Certifikat Gennemsigtighed (som oprindeligt blev udviklet på Google), som defineret i [RFC 6962](https://tools.ietf.org/html/rfc6962).

Sættet af børn til OID'er, der kan eksistere under et givet præfiks kaldes en "OID bue." Da repræsentation af kortere OID'er er mindre, anses OID opgaver under kortere buer for mere værdifulde, især for formater, hvor det pågældende OID skal sendes en masse. Buen OID [2.](http://oid-info.com/get/2.5)er tildelt "Directory Services", serien af specifikationer, som omfatter X.509, hvilke HTTPS-certifikater er baseret på. En masse felter i certifikater begynder med, at bekvemt kort bue. For eksempel betyder [2.5.4.6](http://oid-info.com/get/2.5.4.6) "countryName", mens [2.5.4.10](http://oid-info.com/get/2.5.4.10)betyder "organizationName" Da de fleste certifikater skal kode hver af disse OID'er mindst én gang, er det praktisk, at de er korte.

OID'er i specifikationer er almindeligvis repræsenteret med et menneskeligt læsbart navn for nemheds skyld og kan angives ved sammenkædning med et andet OID. [For eksempel fra RFC 8017](https://tools.ietf.org/html/rfc8017#page-68):



```asn1
   pkcs-1    OBJECT IDENTIFIER ::= {
       iso(1) member-body(2) us(840) rsadsi(113549) pkcs(1) 1
   }
   ...

   sha256WithRSAEncryption      OBJECT IDENTIFIER ::= { pkcs-1 11 }
```






NULL
----

NULL er bare NULL, sådan er det.





SEKVENS og SEKVENS AF
------------------------

Lad ikke navnene narre dig: Disse er to meget forskellige typer. En SEKVENS (SEQUENCE) svarer til "struct" i de fleste programmeringssprog. Det har et fast antal felter af forskellige typer. Se f. eks. eksemplet med [Certifikatet her under](#bit-string-and-octet-string).

En SEKVENS AF (SEQUENCE OF) har derimod et vilkårligt antal felter af en enkelt type. Dette er analogt med en matrix eller en liste i et programmerings- sprog. [For eksempel](https://tools.ietf.org/html/rfc5280#page-116):



```asn1
   RDNSequence ::= SEQUENCE OF RelativeDistinguishedName
```


Det kunne være 0, 1, eller 7.000 RelativeDistinguishedNames, i en bestemt rækkefølge.

Det viser sig SEKVENS og SEKVENS AF har en lighed - de er begge kodet på samme måde! Mere om det i afsnittet [Encoding](#sequence-encoding).





SÆT og SÆT AF
--------------

Disse er stort set de samme som SEKVENS og SEKVENS AF, undtagen at der forsætligt ikke er knyttet semantik til rækkefølgen af elementer i dem. I kodet form skal de imidlertid sorteres. [Et eksempel](https://tools.ietf.org/html/rfc5280#page-116):



```asn1
RelativeDistinguishedName ::=
  SET SIZE (1..MAX) OF AttributeTypeAndValue
```


Bemærk: Dette eksempel bruger STØRRELSE nøgleordet til yderligere at specificere, at RelativeDistinguishedName skal have mindst ét medlem, men generelt kan et SÆT eller SÆT AF have en størrelse på nul.





BIT STRING og OCTET STRING
---------------------------

Disse indeholder henholdsvis vilkårlige bits eller bytes. Disse kan bruges til at holde ustrukturerede data, som nonces eller hash-funktion output. De kan også bruges som en tom markør (void pointer) i C eller den tomme grænseflade type (interface{}) i Go: En måde at holde data, der har en struktur, på, men hvor denne struktur forstås eller defineres adskilt fra type systemet. [For eksempel](https://tools.ietf.org/html/rfc5280#page-116) defineres underskriften på et certifikat som en BIT-STRING:



```
Certificate  ::=  SEQUENCE  {
     tbsCertificate       TBSCertificate,
     signatureAlgorithm   AlgorithmIdentifier,
     signature            BIT STRING  }
```


Senere versioner af ASN.1 sproget [tillader mere detaljeret specifikation](https://tools.ietf.org/html/rfc5912#page-99)af indholdet i BIT-STRING (og det samme gælder for OCTET STRINGs).





CHOICE og ANY
--------------

CHOICE er en type, der kan indeholde præcis en af de typer, der er anført i dens definition. [For eksempel](https://tools.ietf.org/html/rfc5280#page-117) Tid kan indeholde præcis en af en UTCTime eller en GeneralizedTime:



```asn1
Time ::= CHOICE {
     utcTime        UTCTime,
     generalTime    GeneralizedTime }
```


ANY angiver, at en værdi kan være af enhver type. I praksis er det normalt begrænset af ting, der ikke helt kan udtrykkes i ASN.1 grammatik. [For eksempel](https://tools.ietf.org/html/rfc5280#page-111):



```asn1
   AttributeTypeAndValue ::= SEQUENCE {
     type     AttributeType,
     value    AttributeValue }

   AttributeType ::= OBJECT IDENTIFIER

   AttributeValue ::= ANY -- DEFINED BY AttributeType
```


Dette er særlig nyttigt i forbindelse med udvidelser, hvor du ønsker at give plads til yderligere felter defineres separat, efter at hovedspecifikationen er offentliggjort så du har en måde at registrere nye typer (objektidentifikatorer) og give definitionerne for disse typer mulighed for at specificere, hvad strukturen af de nye felter skal være.

Bemærk, at noget er et levn fra 1988 ASN.1 notation. I [i 1994 udgaven](https://www.itu.int/rec/T-REC-X.680-199407-S/en) blev ANY forældet og erstattet med Information Objekt Klasser, som er en fancy, formaliseret måde at angive den slags udvidelse adfærd folk ønskede fra ANY. Ændringen er så gammel nu, at de seneste ASN.1 specifikationer (fra 2015) ikke engang nævner ANY. Men hvis du ser på 1994 udgaven kan du se nogle diskussioner af skiftet. Jeg inkluderer den ældre syntaks her, fordi det stadig er hvad RFC 5280 anvender. [RFC 5912](https://tools.ietf.org/html/rfc5912)bruger syntaksen fra 2002 ASN.1 til at udtrykke de samme typer fra RFC 5280 og flere relaterede specifikationer.





Anden Notation
==============

Kommentarer begynder med `--`. Felter af en SEKVENS eller SÆT kan markeres VALGFRI, eller de kan markeres STANDARD foo, hvilket betyder det samme som OPTIONAL, bortset fra at når feltet ikke er til stede, bør det anses for at indeholde "foo". Typer med en længde (strenge, oktet og bitstrenge, sæt og sekvenser af ting) kan gives en STØRRELSE parameter, der begrænser deres længde, enten til en nøjagtig længde eller til et interval.

Typer kan være begrænset til at have visse værdier ved hjælp af krøllede parentes efter typens definitionen. [Dette eksempel definerer](https://tools.ietf.org/html/rfc5280#page-117) at Versionsfeltet kan have tre værdier og tildele relevante navne til disse værdier:



```asn1
Version ::= INTEGER { v1(0), v2(1), v3(2) }
```


Dette bruges også ofte ved tildeling af navne til specifikke OID'er (bemærk dette er en enkelt værdi, uden kommaer der angiver alternative værdier). [Eksempel fra RFC 5280](https://tools.ietf.org/html/rfc5280#page-110).



```asn1
id-pkix  OBJECT IDENTIFIER  ::=
         { iso(1) identified-organization(3) dod(6) internet(1)
                    security(5) mechanisms(5) pkix(7) }
```


Du vil også se \[nummer\], IMPLICIT, EKSPLICIT, UNIVERSAL, og APPLIKATION. Disse definerer detaljer om, hvordan en værdi skal kodes, som vi vil tale om nedenfor.





Kodningen
============

ASN.1 er forbundet med mange kodninger: BER, DER, PER, XER og mere. Grundlæggende indkodningsregler (BER) er ret fleksible. Distinguished Encoding Rules (DER) er en delmængde af BER med [canonicalization](https://en.wikipedia.org/wiki/Canonicalization) regler så der kun er en måde at udtrykke en en given struktur. (Automatisk kopi). Pakket kodning Regler (PER) bruger færre bytes til at kode ting, så de er nyttige, når plads eller transmissionstid er kostbar. XML-kodningsregler (XER) er nyttige, når du af en eller anden grund ønsker at bruge XML.

HTTPS-certifikater er generelt kodet i DER. Det er muligt at kode dem i BER, men da signaturværdien er beregnet over den tilsvarende DER kodning, ikke de nøjagtige bytes i certifikatet, kodning af et certifikat i BER inviterer unødvendige problemer. Jeg vil beskrive BER, og forklare, som jeg går de yderligere restriktioner, som DER.

Jeg opfordrer dig til at læse dette afsnit med denne [afkodning af et ægte certifikat](https://lapo.it/asn1js/#MIIFaTCCBFGgAwIBAgISA9QVMY4sVx0pBfw-BSdonQ0JMA0GCSqGSIb3DQEBCwUAMEoxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MSMwIQYDVQQDExpMZXQncyBFbmNyeXB0IEF1dGhvcml0eSBYMzAeFw0xOTA5MjkxNjMzMzZaFw0xOTEyMjgxNjMzMzZaMBoxGDAWBgNVBAMTD2xldHNlbmNyeXB0Lm9yZzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANACdZdYiHLXjUhzqmaHENZ_mYp05-bbJw0RhmkCMN32iqPP0_2_KBRi60F87-itSNcKpQ_HQmEm5NoaH6rHzPuihv834og9TPsHeM0QOkaGOcR001h0kGRlIgynXzG7kSO7hTAUSbLfzCD4Hp8swLJHCz787sn_09DvPkJdeHhlQvrgfnGXqsHLqSXo9UtZXriwYS0HRCt5dKCLTOQAmS5ezKG2-7LVcuQQGsG1st3f2t092zJ8BDj_hAd0Zh8vKRwkDZvPzZzo76g4pGtVPRhmcDnVLin4PmsysWevEdzpJhNO7FXCsCA2aWo4ePAYKrR9BjyNlPAQ2QkKlI_cJx8CAwEAAaOCAncwggJzMA4GA1UdDwEB_wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwDAYDVR0TAQH_BAIwADAdBgNVHQ4EFgQUfCuj5zyEXzjUdndlK8VKWGyO3aowHwYDVR0jBBgwFoAUqEpqYwR93brm0Tm3pkVl7_Oo7KEwbwYIKwYBBQUHAQEEYzBhMC4GCCsGAQUFBzABhiJodHRwOi8vb2NzcC5pbnQteDMubGV0c2VuY3J5cHQub3JnMC8GCCsGAQUFBzAChiNodHRwOi8vY2VydC5pbnQteDMubGV0c2VuY3J5cHQub3JnLzAvBgNVHREEKDAmgg9sZXRzZW5jcnlwdC5vcmeCE3d3dy5sZXRzZW5jcnlwdC5vcmcwTAYDVR0gBEUwQzAIBgZngQwBAgEwNwYLKwYBBAGC3xMBAQEwKDAmBggrBgEFBQcCARYaaHR0cDovL2Nwcy5sZXRzZW5jcnlwdC5vcmcwggECBgorBgEEAdZ5AgQCBIHzBIHwAO4AdQDiaUuuJujpQAnohhu2O4PUPuf-dIj7pI8okwGd3fHb_gAAAW1-FbruAAAEAwBGMEQCIBROHx_dL0yfOpZs7Y6teawOn0oawhuW-3lvVs61DhjcAiB2ZuYwHu3BwYtqJTqfwsjQzjMZm8bQOutdme7dfaLXvgB1ACk8UZZUyDlluqpQ_FgH1Ldvv1h6KXLcpMMM9OVFR_R4AAABbX4VuuYAAAQDAEYwRAIgTc8_QJi4odfZIQ1u74zzvkBobqa08Wb_vxoqlgviUYICIGnAFgaPUg-xzKTRZGTGO4cj8UGJ3f52NoD6UWipPgIvMA0GCSqGSIb3DQEBCwUAA4IBAQAWl67Avp7BgqZW3VEWEjXHganloM8OHMS6en6S46nyuW0itGzth8SmCuG4i7fseecEG3Zsm0U1S1d3AffClOwWAGxB5Ark8Bpjszy8nGtNo7pFH-psGCBGj1pnklteu3jUzkkXKHS00Dsna1fJIzswgD7X7et8PRvV3ufIidkvvbfev0L2TYPWEFMM7WO0eIysf9WTljuflgcbzJXY0PatUBzL59ekidJZvGZ7d-hTl14CcCTrZ-VGMZlmK6tMhBuXJdAa5R0QSUpqirGRLz37Ox-SVh_tjA-I2tcRs0euAoX0etcr5cbBapV4-6LtSUt_rLBddeXCnDxqAWQxyy0p)åbent i et andet vindue.





Type-Længde-værdi
-----------------

BER er en type længde-værdi kodning, ligesom Protokol Buffere og Thrift. Det betyder, at som du læser bytes, der er kodet med BER, er det første du støder på en type, kaldet i ASN.1 et mærke. Dette er en byte, eller serie af bytes, der fortæller dig, hvilken type ting der er kodet: en INTEGER, eller en UTF8String, eller en struktur, eller hvad som helst andet.

| type | længde | værdi    |
| ---- | ------ | -------- |
| 02   | 03     | 01 00 01 |


Det næste du støder på er en længde: et tal, der fortæller dig, hvor mange bytes af data, du har brug for at læse for at få værdien. Så kommer naturligvis de bytes, der indeholder værdien selv. Som et eksempel ville hexbytes 02 03 01 00 01 repræsentere en INTEGER (tag 02 svarer til INTEGER-typen). med længde 03 og en tre-byte -værdi bestående af 01 00 01.

Type-længde-værdi skelnes fra afgrænset kodninger som JSON, CSV eller XML, hvor i stedet for at kende længden af et felt op foran, du læser bytes indtil du rammer den forventede afgrænser (f. eks.. `}` i JSON, eller `</some-tag>` i XML).





Mærke
---

Mærket er normalt en byte. Der er et middel til vilkårligt at indkode store tagnumre ved hjælp af flere bytes ("high tag number" formularen) men dette er ikke typisk nødvendigt.

Her er et eksempel på mærker:

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

| Mærke (decimal) |    Mærke (hex) | Type                  |
| ---------------:| --------------:| --------------------- |
|               2 |             02 | HELTAL (INTEGER)      |
|               3 |             03 | BIT STRING            |
|               4 |             04 | OKTET STRING          |
|               5 |             05 | NULL                  |
|               6 |             06 | OBJEKT IDENTIFIKATOR  |
|              12 |             0C | UTF8Streng            |
|              16 | 10 (og 30)\* | SEKVENS og SEKVENS AF |
|              17 | 11 (og 31)\* | SÆT og SÆT AF         |
|              19 |             13 | PrintableString       |
|              22 |             16 | IA5Streng             |
|              23 |             17 | UTCTid                |
|              24 |             18 | Generaliseret Tid     |


Disse og et par andre jeg har sprunget over for at være kedelige, er "universal" tags, fordi de er specificeret i kernen ASN.1 specifikation og betyder det samme på tværs af alle ASN.1 moduler.

Disse tags alle tilfældigvis er under 31 (0x1F), og det er af en god grund: Bits 8, 7, og 6 (de høje bits af tag byte) bruges til at indkode ekstra information, så eventuelle universelle tag tal højere end 31 skal bruge "high tag number" formular, som tager ekstra bytes. Der er en lille håndfuld universelle tags højere end 31, men de er ret sjældne.

De to tags markeret med en `*` er altid kodet som 0x30 eller 0x31 fordi bit 6 bruges til at angive, om et felt er Konstrueret vs Primitive. Disse tags er altid Konstrueret, så deres kodning har bit 6 sat til 1. Se afsnittet [Konstrueret vs Primitive](#constructed-vs-primitive) for detaljer.





Tag Klasser
-----------

Bare fordi den universelle klasse har opbrugt alle de "gode" tag numre, det betyder ikke, at vi ikke kan definere vores egne tags. Der er også "applikationen", "private", og "kontekst-specifikke" klasser. Disse er kendetegnet ved bit 8 og 7:

| Klasse            | Bit 8 | Bit 7 |
| ----------------- | -----:| -----:|
| Universal         |     0 |     0 |
| Applikation       |     0 |     1 |
| Kontekst-specifik |     1 |     0 |
| Privat            |     1 |     1 |


Specifikationer bruger for det meste tags i den universelle klasse, da de giver de vigtigste byggesten. Eksempelvis er serienummeret i et certifikat kodet i en almindelig ol' INTEGER, tagnummer 0x02. Men nogle gange en specifikation skal definere tags i den kontekstspecifikke klasse til utvetydige poster i en SET eller SEQUENCE, der definerer valgfrie poster, eller utvetydige CHOICE med flere poster der har den samme -type. Tag for eksempel denne definition:



```asn1
Point ::= SEQUENCE {
  x INTEGER OPTIONAL,
  y INTEGER OPTIONAL
}
```


Da OPTIONAL felter er udeladt helt fra kodningen, når de ikke er til stede, det ville være umuligt at skelne et punkt med kun et x-koordinat fra et punkt med en y-koordinat. For eksempel du vil indkode et punkt med kun et x-koordinat af 9 således (30 betyder SEKVENS her):



```der
30 03 02 01 09
```


Det er en SEKVENS af længde 3 (bytes), der indeholder en INTEGER af længde 1, som har værdien 9. Men du ville også indkode et punkt med en y koordinat af 9 nøjagtig samme måde, så der er tvetydighed.





Instruktioner til indkodning
---------------------

For at løse denne tvetydighed skal en specifikation give kodningsinstruktioner, der tildeler et unikt tag til hver post. Og fordi vi ikke har lov til at overskrive på UNIVERSAL tags, er vi nødt til at bruge en af de andre, for eksempel APPLIKATION:



```asn1
Point ::= SEQUENCE {
  x [APPLICATION 0] INTEGER OPTIONAL,
  y [APPLICATION 1] INTEGER OPTIONAL
}
```


Selv for denne brug sag, er det faktisk meget mere almindeligt at bruge kontekst-specifik klasse, som repræsenteres af et nummer i parentes af selv:



```asn1
Point ::= SEQUENCE {
  x [0] INTEGER OPTIONAL,
  y [1] INTEGER OPTIONAL
}
```


Så for at indkode et punkt med blot en x-koordinat på 9, i stedet for kodning x som en UNIVERSAL INTEGER, sætter du bit 8 og 7 på det kodede tag (1, 0) for at indikere den specfikke kontekst, og sæt de lave bits til 0, hvilket giver dette kodning:



```der
30 03 80 01 09
```


Og for at repræsentere et punkt med blot en y-koordinat på 9, du ville gøre samme ting, undtagen du ville indstille de lave bits til 1:



```der
30 03 81 01 09
```


Eller du kan repræsentere et punkt med x og y koordinere begge lig med 9:



```der
30 06 80 01 09 81 01 09
```






Længde
------

Længden i tag-length-value tuple repræsenterer altid det samlede antal bytes i objektet, herunder alle underobjekter. Så en SEKVENS med et felt har ikke en længde på 1; den har en længde på dog mange bytes den kodede form af dette felt tager op.

Længdekodningen kan antage to former: kort eller lang. Den korte form er en enkelt byte, mellem 0 og 127.

Den lange form er mindst to bytes lang, og har bit 8 af den første byte sat til 1. Bits 7-1 af den første byte angiver, hvor mange flere bytes er i selve længdefeltet. Derefter angiver de resterende bytes længden selv, som et multi-byte heltal.

Som De kan forestille Dem, giver dette mulighed for meget lange værdier. Den længst mulige længde ville starte med byte 254 (en længde byte på 255 er reserveret til fremtidige udvidelser), at specificere at 126 bytes ville følge i længdefeltet alene. Hvis hver af disse 126 bytes var 255, at ville indikere 2<sup>1008</sup>-1 bytes til at angive værdi feltet.

Den lange formular giver dig mulighed for at indkode den samme længde flere måder - for eksempel ved at bruge to bytes til at udtrykke en længde, der kunne passe i en, eller ved at bruge lang form til at udtrykke en længde, der kunne passe i den korte form. DER anviser man altid bruger den mindste mulige længde repræsentation.

Sikkerhedsadvarsel: Stol ikke fuldt ud på de længdeværdier, som du afkoder! For eksempel skal du kontrollere, at den kodede længde er mindre end den mængde data, der er til rådighed fra strømmen der afkodes.





Ubestemt længde
-----------------

Det er også muligt, i BER, at indkode en streng, SEKVENS, SEKVENS AF, SÆT, eller SÆT AF hvor du ikke kender længden i forvejen (f. eks., når streaming output). For at gøre dette, indkoder du længden som en enkelt byte med værdien 80, og indkoder værdien som en serie af kodede objekter sammenkædet med enden angivet med de to bytes `00 00` (som kan betragtes som et objekt med nul-længde med tag 0). Så for eksempel ville den ubestemte længdekodning af en UTF8String være en -kodning af en eller flere UTF8Strings sammenkædet og endelig sammenkædet med 00 00.

Ubestemthed kan være vilkårligt indlejret! Så for eksempel De UTF8Strings, som du sammenkæder sammen for at danne en ubestemt længde UTF8String kan indkodes enten med bestemt længde eller på ubestemt længde.

En længde byte på 80 er kendetegnende, fordi det ikke er en gyldig kort form eller lang formlængde. Da bit 8 er sat til 1, ville dette normalt blive fortolket som den lange form, men de resterende bits formodes at angiver antallet af yderligere bytes, der udgør længden. Da bits 7-1 er alle 0, vil det indikere en lang form kodning med nul bytes op længden, hvilket ikke er tilladt.

DER forbyder ubestemt længde kodning. Du skal bruge den bestemte længde kodning (dvs. med længden angivet i begyndelsen).





Konstrueret vs Primitive
------------------------

Bit 6 af den første tag byte bruges til at angive, om værdien er kodet i primitiv form eller konstrueret form. Primitiv kodning repræsenterer værdien direkte - for eksempel i en UTF8String vil værdien udelukkende bestå af selve strengen i UTF-8 bytes. Konstrueret kodning repræsenterer værdien som en sammenkædning af andre kodede værdier. For eksempel, som beskrevet i afsnittet "Ubestemt længde", en UTF8String i konstrueret kodning vil bestå af flere kodede UTF8Strings (hver med et tag og længde), sammenkædet sammen. Længden af den samlede UTF8String vil være den samlede længde, i bytes, af alle disse sammenkædede kodede værdier. Konstrueret kodning kan bruge enten bestemt eller ubestemt længde. Primitiv kodning bruger altid bestemt længde, fordi der ikke er nogen måde at udtrykke ubestemt længde uden at bruge konstrueret kodning.

INTEGER, OBJEKT IDENTIFIKATOR og NULL skal bruge primitiv kodning. SEKVENS, SEKVENS AF, SÆT og SÆT AF skal anvende konstrueret kodning (fordi de i sagens natur er sammenfaldende med flere værdier). BIT STRENG, OKTET STRENG, UTCTime, GeneralizedTime, og de forskellige strengtyper kan bruge enten primitiv kodning eller konstrueret kodning, efter afsenderens skøn\-- i BER. I DER skal alle typer, der har et indkodningsvalg mellem primitive og konstruerede dog anvende kodningen primitive indkodning.





EXPLICIT vs. IMPLICIT
--------------------

De ovenfor beskrevne [kodningsinstrukser](#encoding-instructions), f.eks. `[1]`eller `[APPLIKATION 8]`kan også inkludere søgeordet EXPLICIT eller IMPLICIT ([eksempel fra RFC 5280](https://tools.ietf.org/html/rfc5280#page-117)):



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


Dette definerer hvordan mærket skal kodes; det har ikke noget med at gøre, om tagnummeret er eksplicit tildelt eller ej (da både IMPLICIT og EXPLICIT altid går sammen med et bestemt tagnummer). IMPLICIT koder feltet ligesom den underliggende type, men med tag nummer og klasse som angivet i i ASN.1 modulet. EXPLICIT koder feltet som den underliggende type, og omgiver det i en ydre kodning. Den ydre kodning har tag nummer og klasse fra ASN.1 modulet og derudover har [Konstrueret bit](#constructed-vs-primitive) sæt.

Her er et eksempel på ASN.1 kodningsinstruktion ved hjælp af IMPLICIT:



```asn1
[5] IMPLICIT UTF8String
```


Dette ville kode "hi" som:



```der
85 02 68 69
```


Sammenlign med denne ASN.1 kodningsinstruktion ved hjælp af EXPLICIT:



```asn1
[5] EXPLICIT UTF8String
```


Dette ville kode "hi" som:



```der
A5 04 0C 02 68 69
```


Når IMPLICIT eller EXPLICIT nøgleordet ikke er til stede, er standard EXPLICIT, medmindre modulet sætter en anden standard øverst med "EXPLICIT TAGS", "IMPLICIT TAGS", eller "AUTOMATISK TAGS" For eksempel definerer RFC 5280 to moduler, et hvor [EXPLICIT tags er standard](https://tools.ietf.org/html/rfc5280#appendix-A.1), og en anden der importerer den første, og har [IMPLICIT tags som standard](https://tools.ietf.org/html/rfc5280#appendix-A.2). Implicit kodning bruger færre bytes end eksplicit kodning.

AUTOMATISK TAGS er det samme som IMPLICIT TAGS, men med yderligere egenskaber, der tagger numre (`[0]`, `[1]`, osv.) tildeles automatisk på steder, der har brug for dem, såsom SEKVENSer med valgfrie felter.





Indkodning af specifikke typer
==========================

I dette afsnit vil vi tale om, hvordan værdien af hver type er indkodet, med eksempler.





INTEGER indkodning
----------------

Integere er kodet som en eller flere bytes i to's supplement med høje bit (bit 8) af den byte længst til venstre som fortegnet bit. Som BER specifikation siger:

Værdien af et to\'s komplementbinært tal afledes ved at nummerere bits i indholdet okteter, starter med bit 1 af den sidste oktet så lidt nul og slutter nummereringen med bit 8 af den første oktet. Hver bit tildeles en numerisk værdi på 2<sup>N</sup>, hvor N er dens position i over nummereringssekvensen. Værdien af to\'s komplement binære tal opnås ved at opsummere de numeriske værdier, der er tildelt til hver bit for de bits, der er sat til en, ekskl. bit 8 af den første oktet og derefter reducere denne værdi med den numeriske værdi tildelt bit 8 af den første oktet, hvis den bit er sat til en.

Så for eksempel denne et-byte værdi (repræsenteret i binær) koder decimal 50:

00110010 (== decimal 50)

Denne 1-byte-værdi (repræsenteret i binær) koder decimal -100:

10011100 (== decimal -100)

Denne fem-byte-værdi (repræsenteret i binær) koder decimal -549755813887 (som 2<sup>39</sup> + 1):

10000000 00000000 00000000 00000000 00000001 (== decimal -549755813887)

BER og DER begge kræver, at heltal (integers) skal være repræsenteret i den kortest mulige form. Det håndhæves med denne regel:



```
... bits af den første oktet og bit 8 af den anden oktet:

1.  må ikke alle være én, og
2.  må ikke alle være nul.
```


Regel (2) betyder nogenlunde: hvis der er førende nul bytes i kodning kan du lige så godt forlade dem og have det samme nummer. Bit 8 af den anden byte er også vigtig her, fordi hvis du ønsker at repræsentere visse værdier, idet du skal bruge en ledende nul byte. For eksempel er decimal 255 kodet som to bytes:

00000000 11111111

Det er fordi en single-byte kodning på 11111111 i sig selv betyder -1 (bit 8 behandles som fortegn bit).

Regel (1) kan bedst forklares med et eksempel. Decimal -128 er kodet som:

10000000 (== decimal -128)

Men det kunne også være kodet som:

11111111 10000000 (== decimal -128, men ugyldig kodning)

Ved at udvide det bliver det til 2<sup>15</sup>+ 2<sup>14</sup>+ 2<sup>13</sup>+ 2<sup>12</sup>+ 2<sup>11</sup>+ 2<sup>10 10</sup>+ 2<sup>9</sup>+ 2<sup>8</sup>+ 2<sup>7</sup>== -2<sup>7</sup>== -128. Bemærk, at 1 i "10000000" var en tal bit i single-byte-kodningen, men betyder 27 i to-byte-kodningen.

Dette er en generisk transform: For ethvert negativt tal, der er kodet som BER (eller DER) kan du præfikse det med 11111111 og får det samme nummer. Dette kaldes [fortegns udvidelse](https://andybargh.com/binary-sign-extension/). Eller tilsvarende, hvis der er et negativt tal, hvor kodningen af værdien begynder med 11111111, du kan fjerne denne byte og det er stadigt det samme nummer. Så BER og DER kræver det korteste kodning.

To's komplementkodning af INTEGERs har [praktisk betydning i certifikat-udstedelse](https://bugzilla.mozilla.org/buglist.cgi?query_format=specific&order=relevance%20desc&bug_status=__closed__&product=NSS&content=%E2%80%9CSerial%20entropy%E2%80%9D&comments=0&list_id=16028758): RFC 5280 kræver, at serienumrene er positive. Eftersom første bit altid er et fortegns bit, betyder dette, at serienumre kodet i DER som 8 bytes kan være højst 63 bits lange. Indkodning af et 64-bit positivt serienummer kræver en 9-byte-kodet værdi (hvor den første byte er nul).

Her er kodningen af en INTEGER med værdien 2<sup>63</sup>+1 (som i dette tilfælde er et 64-bit positivt tal):



```der
02 09 00 80 00 00 00 00 00 00 01
```






Streng indkodning
---------------

Strenge er indkodet som deres bogstavelige bytes. Eftersom IA5String og PrintableString blot definerer forskellige undergrupper af acceptable tegn, deres kodninger adskiller sig kun efter tag.

En printableString som indeholder "hi":



```der
13 02 68 69
```


En printableString som indeholder "hi":



```der
16 02 68 69
```


UTF8Strings er de samme, men kan kode et bredere udvalg af tegn. For eksempel, dette er kodning af en UTF8String indeholder U+1F60E Smiling Ansigt med solbriller (😎):



```der
0c 04 f0 9f 98 8e
```






Indkodning af dato og tid
----------------------

UTCTime og GeneralizedTime er faktisk kodet som strenge, overraskende! Som beskrevet ovenfor i afsnittet "Typer", repræsenterer UTCTime datoer i formatet YYMMDDhhmmss. GeneralizedTime bruger en fire-cifret år YYYY i stedet for YY. Begge har en valgfri tidszoneforskydning eller "Z" (Zulu) for at angive ingen tidszoneforskydning fra UTC.

F.eks. er 15. december 2019 kl.19:02:10 i PST tidszone (UTC-8) repræsenteret i UTCTime som: 191215190210-0800. Indkodet i BER er det:



```der
17 11 31 39 31 32 31 35 31 39 30 32 31 30 2d 30 38 30 30
```


For BER-indkodning er sekunder valgfrie i både UTCTime og GeneralizedTime, og tidszoneforskydninger er tilladt. DER (sammen med RFC 5280) specificerer dog, at sekunder skal være til stede, brøker sekunder må ikke være til stede, og tiden må udtrykkes som UTC med "Z" formularen.

Ovenstående dato ville blive kodet i DER som:



```der
17 0d 31 39 31 32 31 36 30 33 30 32 31 30 5a
```






OBJEKT IDENTIFIKATOR indkodning
--------------------------

Som [beskrevet ovenfor](#object-identifier), er OID'er begrebsmæssigt en række heltal. De er altid mindst to komponenter lange. Den første komponent er altid 0, 1 eller 2. Når den første komponent er 0 eller 1, er den anden komponent altid mindre end 40. På grund af dette er de to første komponenter entydigt repræsenteret som 40\*X+Y, hvor X er den første komponent og Y er sekund.

Så for eksempel at indkode 2.999.3, ville du kombinere de to første komponenter i 1079 decimal (40\*2 + 999), hvilket vil give dig "1079.3".

Efter at have anvendt denne transformere er hver komponent kodet i base 128, med den mest betydningsfulde byte først. Bit 8 er indstillet til "1" i hver byte undtaget den sidste i en komponent. Det er sådan du ved, hvornår en komponent er færdig, og den næste begynder. Så komponenten "3" ville være repræsenteret blot som byte 0x03. Så komponenten "129" ville være repræsenteret blot som bytes 0x81 0x01. Når de er kodet, er alle komponenterne i et OID sammenkædet til at danne den kodede værdi af OID'et.

OID'er skal være repræsenteret i færrest mulige bytes, uanset om de er i BER eller DER. Så komponenter kan ikke begynde med byte 0x80.

Som et eksempel er OID 1.2.840.113549.1.1.11 (som repræsenterer [sha256WithRSAEncryption](https://tools.ietf.org/html/rfc8017#appendix-A.2.4)) indkodet som så:



```der
06 09 2a 86 48 86 f7 0d 01 01 0b
```






NULL kodning
-------------

Værdien af et objekt indeholdende NULL er altid nullængde, så kodningen af NULL er altid kun tag og et længdefelt på nul:



```der
05 00
```






SEKVENS kodning
-----------------

Den første ting at vide om SEQUENCE er, at det altid bruger Konstrueret kodning, fordi det indeholder andre objekter. Med andre ord, værdien bytes af en SEQUENCE indeholder sammenkædningen af de kodede -felter i den pågældende SEQUENCE (i den rækkefølge disse felter blev defineret). Dette betyder også, at bit 6 af et SEQUENCE's tag ( [Constructed vs Primitive](#constructed-vs-primitive) bit) altid er sat til 1. Så selv selvom tagnummeret for SEQUENCE er teknisk 0x10, dens tag byte, når kodet, er altid 0x30.

Når der er felter i en SEQUENCE med den OPTIONAL anmærkning, er de simpelthen udeladt fra kodningen, hvis ikke til stede. Som en dekoder behandler SEQUENCE's elementer, kan den finde ud af, hvilken type, der afkodes baseret på, hvad der hidtil er afkodet, og tag bytes det læser. Hvis der er tvetydighed, for eksempel når elementer har den samme type, ASN.1 modulet skal angive [-kodning -instruktioner](#encoding-instructions), der tildeler forskellige tag numre til elementerne.

DEFAULT felter ligner de VALGTIGE felter. Hvis et felts værdi er standard, kan det udelades fra BER-kodningen. I DER kodningen SKAL det udelades.

For eksempel definerer RFC 5280 [ AlgoritmeIdentifier](https://tools.ietf.org/html/rfc5280#page-118) som en SEQUENCE:



```asn1
   AlgorithmIdentifier  ::=  SEQUENCE  {
        algorithm               OBJECT IDENTIFIER,
        parameters              ANY DEFINED BY algorithm OPTIONAL  }
```


Her er kodningen af algoritmeidentifikatoren, der indeholder 1.2.840.113549.1.1.11. RFC 8017 siger, at ["parametre" skal have typen NULL for denne algoritme](https://tools.ietf.org/html/rfc8017#appendix-A.2).



```der
30 0d 06 09 2a 86 48 86 f7 0d 01 01 0b 05 00
```






SEKVENS AF indkodning
--------------------

En SEQUENCE AF er kodet på nøjagtig samme måde som en SEQUENCE. Den bruger endda det samme tag! Hvis du afkoder, er den eneste måde, du kan fortælle forskellen mellem en SEQUENCE og en SEQUENCE OF er ved henvisning til ASN.1 modulet.

Her er kodningen af en SEKVENS AF INTEGER indeholdende numrene 7, 8 og 9:



```der
30 09 02 01 07 02 01 08 02 01 09
```






SÆT indkodning
------------

Ligesom SEKVENS er en SÆT konstrueret, hvilket betyder, at dens værdi bytes er sammenkædning af dens kodede felter. Dens tag nummer er 0x11. Da [Konstrueret vs Primitive](#constructed-vs-primitive) bit (bit 6) altid er indstillet til 1, det betyder, at det er kodet med en tag byte på 0x31.

Kodningen af et SÆT, som en SEKVENS, udelader VALGTIGE og DEFAULT felter, hvis de er fraværende eller har standardværdien. Enhver tvetydighed, der skyldes felter med samme type, skal løses af ASN.1 modulet, og DEFAULT-felter SKAL udelades fra DER kodning, hvis de har standardværdien.

I BER kan en SÆT indkodes i en hvilken som helst rækkefølge. I DER, skal en SÆT indkodes i stigende rækkefølge af den serialiserede værdi af hvert element.





SÆT AF indkodning
---------------

Et SÆT AF elementer er kodet på samme måde som et SÆT, herunder tag byte på 0x31. For DER kodning, er der et lignende krav om, at SÆT AF skal kodes i stigende rækkefølge. Da alle elementer i SÆT AF har samme type, er sortering efter tag ikke tilstrækkeligt. Så elementerne i en SÆT AF er sorteret efter deres kodede værdier, med kortere værdier behandlet som om de var polstret til højre med nuller.





BIT STRING indkodning
-------------------

En BIT STRING af N bits er kodet som N/8 bytes (rundet op), med et one-byte præfiks der indeholder "antallet af ubrugte bit, for klarhed, når antallet af bit ikke er et multiplum af 8. For eksempel, når kodning af bit strengen 011011100101110111 (18 bits), vi har brug for mindst tre bytes. Men det er noget mere, end vi har brug for: det giver os kapacitet til 24 bits i alt. Seks af disse bits vil ikke blive brugt. Disse seks bits er skrevet i den højre ende af bitstrengen, så dette er kodet som:



```der
03 04 06 6e 5d c0
```


I BER kan de ubrugte bits have en hvilken som helst værdi, så den sidste byte af denne kodning kunne lige så godt være c1, c2, c3, og så videre. I DER, skal de ubrugte bits alle være nul.





OCTET STRING indkodning
---------------------

En OCTET STRING er kodet som de bytes den indeholder. Her er et eksempel på en OCTET STRING indeholdende bytes 03, 02, 06, og A0:



```der
04 04 03 02 06 A0
```






VALG og ENHVER kodning
-----------------------

Et VALG eller ENHVER felt er kodet som en hvilken som helst type, det rent faktisk indeholder, medmindre det er ændret ved kodningsinstruktioner. Så hvis et VALG felt i en ASN.1 specifikation tillader en INTEGER eller en UTCTime, og det specifikke objekt, der er kodet, indeholder en INTEGER, og den er kodet som en INTEGER.

I praksis har VALG felter meget ofte kodningsinstruktioner. For eksempel, overvej dette eksempel fra RFC 5280, hvor kodning instruktionerne er nødvendige for at skelne rfc822Name fra dNSName, siden de begge har den underliggende type IA5String:



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


Her er et eksempel på kodning af et GeneralName indeholdende rfc822Name `a@eksempel. om` (genkald at \[1\] betyder at bruge tag nummer 1, i tag klassen "context-specific" (bit 8 sat til 1), med IMPLICIT tag kodningsmetode):



```der
81 0d 61 40 65 78 61 6d 70 6c 65 2e 63 6f 6d
```


Her er et eksempel på kodning af et GeneralName indeholdende dNSName "example.com":



```der
82 0b 65 78 61 6d 70 6c 65 2e 63 6f 6d
```






Sikkerhed
======

Det er vigtigt at være meget omhyggelig dekodning BER og DER, især i ikke-hukommelsessikre sprog som C og C ++. Der er en lang historie af sårbarheder i dekodere. Parsing input i almindelighed er en [almindelig kilde til sårbarheder](http://langsec.org/). ASN.1 kodningsformater i særdeleshed synes at være [især en sårbarheds magnet](https://bugzilla.redhat.com/show_bug.cgi?id=1300257). De er komplicerede formater, med mange felter med variabel længde. Selv længderne har forskellige længder! Desuden er ASN.1 input ofte angriber-styret. Hvis du skal fortolke et certifikat for at kunne skelne en autoriseret bruger fra en uautoriseret bruger, du skal antage, at noget af tiden du vil parse, ikke et certifikat men nogle bizarre input udformet til at udnytte fejl i din ASN.1 kode.

For at undgå disse problemer, er det bedst at bruge et hukommelsessikkert sprog, når det er muligt. Og uanset om du kan bruge et hukommelsessikkert sprog eller ikke, er det bedst at bruge en [ASN.1 compiler](https://www.itu.int/en/ITU-T/asn1/Pages/Tools.aspx)til generere din parsing kode i stedet for at skrive den fra bunden.





Anerkendelser
================

Jeg skylder en betydelig gæld til [A Layman's Guide til en undergruppe af ASN., DER, og BER](http://luca.ntop.org/Teaching/Appunti/asn1.html), som er en stor del af hvordan jeg har lært disse emner. Jeg vil også gerne takke forfatterne af [En varm velkommen til DNS](https://powerdns.org/hello-dns/), som er en stor læse og inspireret tonen i dette dokument.





En Lille Bonus
==============

Har du nogensinde bemærket, at et PEM-kodet certifikat altid starter med "MII"? For eksempel:



```
-----BEGIN CERTIFICATE-----

MIIFajCCBFKgAwIBAgISA6HJW9qjaoJoMn8iU8vTuiQ2MA0GCSqGSIb3DQEBCwUA
...
```


Nu ved du nok til at forklare hvorfor! Et [certifikat er et SEKVENS](https://tools.ietf.org/html/rfc5280#page-116), så det vil starte med byte 0x30. De næste bytes er feltet [længde ](#length). Certifikater er næsten altid mere end 127 bytes, så længden feltet skal bruge den lange form af længden. Det betyder, at den første byte vil være 0x80 + N, hvor N er antallet af længdebytes der skal følges. N er næsten altid 2, da det er hvor mange bytes det tager at indkode længder fra 128 til 65535, og næsten alle certifikater har længder i denne rækkevidde.

Så nu ved vi, at de første to bytes af DER kodning af et certifikat er 0x30 0x82. [PEM kodning](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) anvender [base64](https://en.wikipedia.org/wiki/Base64), som koder 3 bytes af binære input i 4 ASCII tegn af output. Eller for at sige det anderledes: base64 forvandler 24 bits binær input til 4 ASCII-tegn output, med 6 bits af input tildelt til hvert tegn. Vi ved, hvad de første 16 bits af hvert certifikat vil være. For at bevise, at de første tegn af (næsten) hvert certifikat vil være "MII", har vi brug for to til at se på de næste 2 bit. Disse vil være de mest betydningsfulde bits af den mest betydningsfulde byte af de to længde bytes. Vil disse bits nogensinde blive sat til 1? Ikke medmindre certifikatet er mere end 16,383 bytes langt! Så vi kan forudsige, at de første tegn i et PEM-certifikat altid vil være det samme. Prøv det selv:



```bash
xxd -r -p <<<308200 | base64
```
