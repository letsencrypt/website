---
title: Bienvenue à l'ASN.1 et au DER
slug: a-warm-welcome-to-asn1-and-der
top_graphic: 1
date: 2020-04-23
lastmod: 2021-03-21
---

Ce document fournit une introduction aux structures de données et aux formats qui définissent les certificats utilisés dans HTTPS. Il devrait être accessible à toute personne ayant un peu d'expérience en informatique et un peu de familiarité avec les certificats.

Un certificat HTTPS est un type de fichier, comme tout autre fichier. Son contenu suit un format défini par la [RFC 5280](https://tools.ietf.org/html/rfc5280). Les définitions sont exprimées en ASN.1, qui est un langage utilisé pour définir des formats de fichiers ou (de manière équivalente) des structures de données. Par exemple, en C vous pourriez écrire :

```c
struct point {
  int x, y;
  char label[10];
};
```

Dans Go, vous écririez :

```go
type point struct {
  x, y int
  label string
}
```

Et en ASN.1, vous écririez :

```asn1
Point ::= SEQUENCE {
  x INTEGER,
  y INTEGER,
  label UTF8String
}
```

L'avantage d'écrire des définitions ASN.1 au lieu de définitions Go ou C est qu'elles sont indépendantes du langage. Vous pouvez implémenter la définition ASN.1 de Point dans n'importe quel langage, ou (de préférence) vous pouvez utiliser un outil qui prend la définition ASN.1 et génère automatiquement le code l'implémentant dans votre langage préféré. Un ensemble de définitions ASN.1 est appelé un "[module](https://www.obj-sys.com/asn1tutorial/node6.html)."

L'autre chose importante à propos de l'ASN.1 est qu'il est livré avec une variété de formats de sérialisation\-- des moyens de transformer une structure de données en mémoire en une série d'octets (ou un fichier) et inversement. Cela permet à un certificat généré par une machine d'être lu par une machine différente, même si cette machine utilise un processeur et un système d'exploitation différents.

Il y a d'autres langages qui [font les mêmes choses](https://en.wikipedia.org/wiki/Interface_description_language) que l'ASN.1. Par exemple, Protocol Buffers offre à la fois un [langage](https://developers.google.com/protocol-buffers/docs/proto3) pour définir les types et un [format de sérialisation](https://developers.google.com/protocol-buffers/docs/encoding) pour encoder les objets des types que vous avez définis. [Thrift](https://thrift.apache.org/) également possède à la fois un langage et un format de sérialisation. Protocol Buffers ou Thrift auraient pu être utilisés pour définir le format des certificats HTTPS, mais l'ASN.1 (1984) avait l'avantage considérable d'exister lorsque les certificats (1988) et HTTPS (1994) ont été inventés.

ASN.1 a été révisé plusieurs fois au fil des ans, avec des éditions généralement identifiés par l'année de leur publication. Ce document vise à enseigner suffisamment d'ASN.1 pour comprendre clairement la RFC 5280 et d'autres normes liées aux certificats HTTPS. Nous parlerons donc principalement de l'édition 1988, avec quelques notes sur les fonctionnalités ajoutées dans les éditions ultérieures. Vous pouvez télécharger les différentes éditions directement à partir de l'UIT, avec la mise en garde que certains ne sont accessibles qu'aux membres de l'UIT. Les normes pertinentes sont [X.680](https://www.itu.int/rec/T-REC-X.680) (qui définit le langage ASN.1) et [X.690](https://www.itu.int/rec/T-REC-X.690) (qui définit les formats de sérialisation DER et BER). Les versions antérieures de ces normes étaient [X.208](https://www.itu.int/rec/T-REC-X.208/en) et [X.209](https://www.itu.int/rec/T-REC-X.209/en), respectivement.

Le principal format de sérialisation de l'ASN.1 est "Distinguished Encoding Rules" (DER). Il s'agit d'une variante des "Basic Encoding Rules" (BER) avec canonicalisation ajoutée. Par exemple, si un type comprend un SET OF, les membres doivent être triés pour la sérialisation DER.

Un certificat représenté en DER est souvent encodé de nouveau en PEM, qui utilise la [base64](https://en.wikipedia.org/wiki/Base64) pour encoder des octets arbitraires en caractères alphanumériques (et '+' et '/') et ajoute des lignes de séparation ("\-\-\-\--BEGIN CERTIFICATE\-\-\-\--" et "\-\-\-\--END CERTIFICATE\-\-\-\--"). PEM est utile car il est plus facile de copier-coller.

Ce document décrira d'abord les types et la notation utilisés par ASN.1, et décrira ensuite comment les objets définis en utilisant ASN.1 sont codés. N'hésitez pas à faire des allers-retours entre les sections, d'autant plus que certaines caractéristiques du langage ASN.1 spécifient directement les détails de l'encodage. Ce document préfère les termes plus familiers, et utilise donc «byte» à la place d'"octet" et "valeur" à la place de "contenu." Il utilise "sérialisation" et "encodage" de manière interchangeable.

Les types
=========

ENTIER
-------

Ce bon vieux ENTIER familier. Ceux-ci peuvent être positifs ou négatifs. Ce qui est vraiment inhabituel avec les ENTIERS ASN.1, c'est qu'ils peuvent être arbitrairement grands. Pas assez de place dans un int64 ? Pas de problème. C'est particulièrement pratique pour représenter des choses comme un module RSA, qui est beaucoup plus grand qu'un int64 (comme 2<sup>2048</sup>). Techniquement, il existe un nombre entier maximum dans DER, mais il est extraordinairement grand : la longueur de n'importe quel champ DER peut être exprimée comme une série de 126 octets maximum. Donc le plus grand ENTIER que vous pouvez représenter en DER est 256<sup>(2\*\*1008)</sup>-1. Pour un ENTIER non borné, vous devriez coder en BER, qui autorise des champs d'une longueur indéfinie.

Chaînes de caractères
-------

L'ASN.1 comporte de nombreux types de chaînes de caractères : BMPString, GeneralString, GraphicString, IA5String, ISO646String, NumericString, PrintableString, TeletexString, T61String, UniversalString, UTF8String, VideotexString, and VisibleString. Pour les besoins des certificats HTTPS, vous devez surtout vous préoccuper de PrintableString, UTF8String, et [IA5String](https://en.wikipedia.org/wiki/IA5STRING). Le type de chaîne de caractères pour un champ donné est défini par le module ASN.1 qui définit le champ. [Par exemple](https://tools.ietf.org/html/rfc5280#page-127) :

```
CPSuri ::= IA5String
```

PrintableString est un sous-groupe de l'ASCII, autorisant les caractères alphanumériques, les espaces, et une partie bien précise de la ponctuation : `' () + , - . / : = ?`. Notamment, il n'inclut pas `*` ou `@`. Il n'y a aucun avantage en termes de taille de stockage à des types de chaînes plus restrictifs.

Certains champs, comme [DirectoryString dans la RFC 5280](https://tools.ietf.org/html/rfc5280#page-20), permettent au code de sérialisation de choisir parmi plusieurs types de chaînes. Étant donné que l'encodage DER inclut le type de chaîne que vous utilisez, assurez-vous que lorsque vous encodez quelque chose en tant que PrintableString, il [répond bien aux exigences de PrintableString](https://community.letsencrypt.org/t/2018-03-12-wildcard-certificate-encoding-issue/55485).

IA5String, basé sur l'[Alphabet International n°5](https://en.wikipedia.org/wiki/T.50_(standard)), est plus permissif : il autorise presque tous les caractères ASCII et est utilisé pour les adresses électroniques, les noms DNS et les URL dans les certificats. Notez qu'il y a quelques valeurs d'octets pour lesquelles la signification IA5 de la valeur d'octet est différente de la signification US-ASCII de cette même valeur.

TeletexString, BMPString et UniversalString sont dépréciés pour être utilisés dans les certificats HTTPS, mais vous pouvez les voir lors de l'analyse d'anciens certificats de CA qui ont une longue durée de vie et peuvent être antérieurs à la dépréciation.

Les chaînes en ASN.1 ne sont pas terminées par un nul comme les chaînes en C et C ++. En fait, il est parfaitement légal d'avoir des octets nuls. Cela peut causer des failles lorsque deux systèmes interprètent la même chaîne ASN.1 différemment. Par exemple, certaines autorités de certification [pouvaient être trompées pour délivrer des certificats](https://www.theregister.co.uk/2009/07/30/universal_ssl_certificate/) pour "example.com\\0.evil.com" sur la base de la propriété de evil.com. Les bibliothèques de validation de certificats de l'époque ont traité le résultat comme valide pour "exemple.com". Soyez très prudent en manipulant des chaînes ASN.1 en C et C++ pour éviter de créer des failles.

Dates et heures
---------------

Encore une fois, beaucoup de types de temps : UTCTime, GeneralizedTime, DATE, TIME-OF-DAY, DATE-TIME et DURATION. Pour les certificats HTTPS, vous n'avez à vous préoccuper que d'UTCTime et de GeneralizedTime.

UTCTime représente une date et une heure sous la forme YYMMDDhhmm[ss], avec une option de décalage de fuseau horaire ou "Z" pour représenter le zoulou (alias UTC alias 0 décalage horaire). Par exemple, les UTCTimes 820102120000Z et 820102070000-0500 représentent tous deux la même heure : le 2 janvier 1982, à 7 heures du matin à New York (UTC-5) et à 12 heures du soir en UTC.

Puisque UTCTime est ambiguë quant à savoir s'il s'agit des années 1900 ou 2000, [ la RFC 5280 clarifie](https://tools.ietf.org/html/rfc5280#section-4.1.2.5.1) qu'il représente les dates de 1950 à 2050. La RFC 5280 stipule également que le le fuseau horaire "Z" doit être utilisé et les secondes doivent être incluses.

GeneralizedTime prend en charge les dates postérieures à 2050 par le simple fait de représenter de représenter l'année avec quatre chiffres. Il permet également les fractions de secondes (bizarrement, avec une virgule ou un point comme séparateur décimal). La RFC 5280 interdit les secondes fractionnaires et exige le "Z."

IDENTIFIANT D'OBJET (OID)
-----------------

Les identifiants d'objets sont des identifiants hiérarchiques, uniques , composés de d'une séquence d'entiers. Ils peuvent se référer à n'importe quel type de "chose", mais sont couramment utilisés pour identifier des normes, des algorithmes, des extensions de certificats, des organisations, ou des documents de politique générale. A titre d'exemple : [1.2.840.113549](http://oid-info.com/get/1.2.840.113549) identifie RSA Security LLC. RSA peut alors attribuer des OIDs commençant par ce préfixe, comme [1.2.840.113549.1.1.11](http://oid-info.com/get/1.2.840.113549.1.1.11), qui identifie sha256WithRSAEncryption, comme défini dans la [RFC 8017](https://tools.ietf.org/html/rfc8017#page-69).

De même, [1.3.6.1.4.1.11129](http://oid-info.com/get/1.3.6.1.4.1.11129) indique que Google, Inc. Google a attribué [1.3.6.1.4.1.11129.2.4.2](http://oid-info.com/get/1.3.6.1.4.1.11129.2.4.2) pour identifier l'[extension de liste SCT](https://letsencrypt.org/2018/04/04/sct-encoding.html) utilisée dans Certificate Transparency (qui a été initialement développée chez Google), comme défini dans le [RFC 6962](https://tools.ietf.org/html/rfc6962).

L'ensemble des OIDs enfants qui peuvent exister sous un préfixe donné est appelé un "arc d'OID." Puisque la représentation des OID est plus courte, les assignations d'OID sous des arcs plus courts sont considérés comme ayant plus de valeur, en particulier pour les formats où cet OID devra être envoyé souvent. L'arc OID [2.5](http://oid-info.com/get/2.5) est est attribué à "Directory Services", la série de spécifications qui comprend comprend la norme X.509, sur laquelle sont basés les certificats HTTPS. Beaucoup de champs dans les certificats commencent par cet arc commode et court. Par exemple, [2.5.4.6](http://oid-info.com/get/2.5.4.6) signifie "countryName," alors que [2.5.4.10](http://oid-info.com/get/2.5.4.10) signifie "organizationName." Puisque la plupart des certificats doivent encoder chacun de ces OIDs au moins une fois, il est pratique qu'ils soient courts.

Dans les spécifications, les OID sont généralement représentés par un nom lisible par l'homme. pour des raisons de commodité, et peuvent être spécifiés par concaténation avec un autre OID. [Par exemple à partir de la RFC 8017](https://tools.ietf.org/html/rfc8017#page-68) :

```asn1
   pkcs-1    OBJECT IDENTIFIER ::= {
       iso(1) member-body(2) us(840) rsadsi(113549) pkcs(1) 1
   }
   ...

   sha256WithRSAEncryption      OBJECT IDENTIFIER ::= { pkcs-1 11 }
```

NULL
----

NULL est juste NULL, vous savez?

SEQUENCE et SEQUENCE OF
------------------------

Ne vous laissez pas tromper par les noms : ce sont deux types très différents. Une SEQUENCE est équivalente à "struct" dans la plupart des langages de programmation. Elle contient un nombre fixe de champs de différents types. Par exemple, voir l' [exemple de Certificat ci-dessous](#bit-string-and-octet-string).

Une SEQUENCE OF, en revanche, contient un nombre arbitraire de champs d'un seul type. C'est analogue à un tableau ou à une liste dans un langage de programmation. [Par exemple](https://tools.ietf.org/html/rfc5280#page-116) :

```asn1
   RDNSequence ::= SEQUENCE OF RelativeDistinguishedName
```

Cela peut être 0, 1, ou 7000 RelativeDistinguishedNames, dans un ordre spécifique. ordre précis.

Il s'avère que SEQUENCE et SEQUENCE OF ont une similitude - elles sont toutes deux codées de la même façon ! Plus d'informations à ce sujet dans la section [Encodage](#sequence-encoding).

SET et SET OF
--------------

Elles sont à peu près les mêmes que SEQUENCE et SEQUENCE OF, sauf qu'il n'y a intentionnellement aucune sémantique attachée à l'ordre des éléments qui les composent. Cependant, sous forme codée, ils doivent être triés. [Un exemple](https://tools.ietf.org/html/rfc5280#page-116) :

```asn1
RelativeDistinguishedName ::=
  SET SIZE (1..MAX) OF AttributeTypeAndValue
```

Remarque : Cet exemple utilise le mot-clé SIZE pour spécifier en plus que RelativeDistinguishedName doit avoir au moins un membre, mais en général un SET ou SET OF est autorisé à avoir une taille de zéro.

BIT STRING et OCTET STRING
---------------------------

Ils contiennent respectivement des bits ou des octets arbitraires. Ils peuvent être utilisés pour contenir des données non structurées, comme des nonces ou des sorties de fonctions de hachage. Ils peuvent également être utilisés comme un pointeur void en C ou le type interface vide (interface{}) en Go : Une manière de contenir des données qui ont une structure, mais où cette structure est comprise ou définie séparément du type. [Par exemple](https://tools.ietf.org/html/rfc5280#page-116), la signature d'un certificat est définie comme une BIT STRING :

```
Certificate  ::=  SEQUENCE  {
     tbsCertificate       TBSCertificate,
     signatureAlgorithm   AlgorithmIdentifier,
     signature            BIT STRING  }
```

Les versions ultérieures du langage ASN.1 [permettent de spécifier de manière plus détaillée](https://tools.ietf.org/html/rfc5912#page-99) ce que contient la BIT STRING (il en va de même pour les OCTET STRING).

CHOICE et ANY
--------------

CHOICE est un type qui peut contenir exactement un des types listés dans sa définition. [Par exemple](https://tools.ietf.org/html/rfc5280#page-117), Time peut contenir exclusivement un UTCTime ou un GeneralizedTime :

```asn1
Time ::= CHOICE {
     utcTime        UTCTime,
     generalTime    GeneralizedTime }
```

ANY indique qu'une valeur peut être de n'importe quel type. En pratique, il est généralement limité par des choses qui ne peuvent pas être exprimées dans la grammaire de l'ASN.1. [Par exemple](https://tools.ietf.org/html/rfc5280#page-111) :

```asn1
   AttributeTypeAndValue ::= SEQUENCE {
     type     AttributeType,
     value    AttributeValue }

   AttributeType ::= OBJECT IDENTIFIER

   AttributeValue ::= ANY -- DEFINED BY AttributeType
```

Ceci est particulièrement utile pour les extensions, où vous souhaitez laisser de la place pour que des champs supplémentaires puissent être définis séparément après la publication de la spécification principale, afin de disposer d'un moyen d'enregistrer de nouveaux types (identificateurs d'objets), et permettre aux définitions de ces types de spécifier ce que doit être la structure des nouveaux champs.

Notez que ANY est une relique de la notation ASN.1 de 1988. Dans [l'édition de 1994](https://www.itu.int/rec/T-REC-X.680-199407-S/en), ANY a été déprécié et remplacé par Information Object Classes, qui sont une manière originale et formalisée de spécifier le type de comportement d'extension que les gens attendaient de ANY. Le changement est si ancien maintenant que les dernières spécifications ASN.1 (de 2015) ne mentionnent même pas ANY. Mais si vous regardez l'édition de 1994, vous pouvez voir une discussion sur la transition. J'inclus l'ancienne syntaxe ici car c'est toujours ce que la RFC 5280 utilise. [RFC 5912](https://tools.ietf.org/html/rfc5912) utilise la syntaxe ASN.1 de 2002 pour exprimer les mêmes types que la RFC 5280 et plusieurs spécifications connexes.

Autre notation
==============

Les commentaires commencent par `--`. Les champs d'une SEQUENCE ou d'un SET peuvent être marqués OPTIONAL, ou bien ils peuvent être marqués DEFAULT foo, ce qui signifie la même chose que OPTIONAL, sauf que lorsque le champ est absent, il doit être considéré comme contenant "foo." Les types ayant une longueur (chaînes de caractères, chaînes d'octets et de bits, ensembles et séquences de choses) peuvent être dotés d'un paramètre SIZE qui contraint leur longueur, soit à une longueur exacte, soit à un intervalle.

Les types peuvent être contraints à avoir certaines valeurs en utilisant des accolades après la définition du type. [Cet exemple définit que ](https://tools.ietf.org/html/rfc5280#page-117) le champ Version peut avoir trois valeurs, et attribue des noms significatifs à ces valeurs :

```asn1
Version ::= INTEGER { v1(0), v2(1), v3(2) }
```

Ceci est également souvent utilisé pour attribuer des noms à des OID spécifiques (notez que ceci est une valeur unique, sans virgule pour indiquer les valeurs alternatives). [Exemple de la RFC 5280](https://tools.ietf.org/html/rfc5280#page-110).

```asn1
id-pkix  OBJECT IDENTIFIER  ::=
         { iso(1) identified-organization(3) dod(6) internet(1)
                    security(5) mechanisms(5) pkix(7) }
```

Vous verrez également \[number\], IMPLICIT, EXPLICIT, UNIVERSAL, et APPLICATION. Ceux-ci définissent les détails de la façon dont une valeur doit être codée, dont nous parlerons ci-dessous.

L'encodage
============

L'ASN.1 est associé à de nombreux codages : BER, DER, PER, XER, etc. et bien d'autres encore. Les règles de codage de base (BER) sont assez flexibles. Les règles de codage DER (Distinguished Encoding Rules) sont un sous-ensemble de BER avec des règles de [canonicalisation](https://en.wikipedia.org/wiki/Canonicalization) de sorte qu'il n'y a qu'une seule façon d'exprimer une structure donnée. Les règles PER (Packed Encoding Rules ) utilisent moins d'octets pour coder les données. Elles sont donc utiles lorsque l'espace ou le temps de transmission sont limités. Les règles d'encodage XML (XER) sont utiles lorsque, pour une raison ou une autre, vous souhaitez utiliser XML.

Les certificats HTTPS sont généralement encodés en DER. Il est possible de les coder en BER, mais comme la valeur de la signature est calculée sur l'encodage DER équivalent, et non les octets exacts du certificat, l'encodage d'un certificat en BER entraîne des problèmes inutiles. Je vais décrire BER, et j'expliquerai au fur et à mesure les restrictions supplémentaires fournies par DER.

Je vous encourage à lire cette section avec [ce décodage d'un véritable certificat](https://lapo.it/asn1js/#MIIFaTCCBFGgAwIBAgISA9QVMY4sVx0pBfw-BSdonQ0JMA0GCSqGSIb3DQEBCwUAMEoxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MSMwIQYDVQQDExpMZXQncyBFbmNyeXB0IEF1dGhvcml0eSBYMzAeFw0xOTA5MjkxNjMzMzZaFw0xOTEyMjgxNjMzMzZaMBoxGDAWBgNVBAMTD2xldHNlbmNyeXB0Lm9yZzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBANACdZdYiHLXjUhzqmaHENZ_mYp05-bbJw0RhmkCMN32iqPP0_2_KBRi60F87-itSNcKpQ_HQmEm5NoaH6rHzPuihv834og9TPsHeM0QOkaGOcR001h0kGRlIgynXzG7kSO7hTAUSbLfzCD4Hp8swLJHCz787sn_09DvPkJdeHhlQvrgfnGXqsHLqSXo9UtZXriwYS0HRCt5dKCLTOQAmS5ezKG2-7LVcuQQGsG1st3f2t092zJ8BDj_hAd0Zh8vKRwkDZvPzZzo76g4pGtVPRhmcDnVLin4PmsysWevEdzpJhNO7FXCsCA2aWo4ePAYKrR9BjyNlPAQ2QkKlI_cJx8CAwEAAaOCAncwggJzMA4GA1UdDwEB_wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwDAYDVR0TAQH_BAIwADAdBgNVHQ4EFgQUfCuj5zyEXzjUdndlK8VKWGyO3aowHwYDVR0jBBgwFoAUqEpqYwR93brm0Tm3pkVl7_Oo7KEwbwYIKwYBBQUHAQEEYzBhMC4GCCsGAQUFBzABhiJodHRwOi8vb2NzcC5pbnQteDMubGV0c2VuY3J5cHQub3JnMC8GCCsGAQUFBzAChiNodHRwOi8vY2VydC5pbnQteDMubGV0c2VuY3J5cHQub3JnLzAvBgNVHREEKDAmgg9sZXRzZW5jcnlwdC5vcmeCE3d3dy5sZXRzZW5jcnlwdC5vcmcwTAYDVR0gBEUwQzAIBgZngQwBAgEwNwYLKwYBBAGC3xMBAQEwKDAmBggrBgEFBQcCARYaaHR0cDovL2Nwcy5sZXRzZW5jcnlwdC5vcmcwggECBgorBgEEAdZ5AgQCBIHzBIHwAO4AdQDiaUuuJujpQAnohhu2O4PUPuf-dIj7pI8okwGd3fHb_gAAAW1-FbruAAAEAwBGMEQCIBROHx_dL0yfOpZs7Y6teawOn0oawhuW-3lvVs61DhjcAiB2ZuYwHu3BwYtqJTqfwsjQzjMZm8bQOutdme7dfaLXvgB1ACk8UZZUyDlluqpQ_FgH1Ldvv1h6KXLcpMMM9OVFR_R4AAABbX4VuuYAAAQDAEYwRAIgTc8_QJi4odfZIQ1u74zzvkBobqa08Wb_vxoqlgviUYICIGnAFgaPUg-xzKTRZGTGO4cj8UGJ3f52NoD6UWipPgIvMA0GCSqGSIb3DQEBCwUAA4IBAQAWl67Avp7BgqZW3VEWEjXHganloM8OHMS6en6S46nyuW0itGzth8SmCuG4i7fseecEG3Zsm0U1S1d3AffClOwWAGxB5Ark8Bpjszy8nGtNo7pFH-psGCBGj1pnklteu3jUzkkXKHS00Dsna1fJIzswgD7X7et8PRvV3ufIidkvvbfev0L2TYPWEFMM7WO0eIysf9WTljuflgcbzJXY0PatUBzL59ekidJZvGZ7d-hTl14CcCTrZ-VGMZlmK6tMhBuXJdAa5R0QSUpqirGRLz37Ox-SVh_tjA-I2tcRs0euAoX0etcr5cbBapV4-6LtSUt_rLBddeXCnDxqAWQxyy0p) à ouvrir dans une autre fenêtre.

Type-Longueur-Valeur
-----------------

BER est un encodage type-longueur-valeur, tout comme Protocol Buffers et Thrift. Cela signifie que, lorsque vous lisez des octets qui sont codés avec BER, vous rencontrez d'abord un type, appelé en ASN.1 un tag. C'est un octet, ou série d'octets, qui vous indique quel type est encodé : un INTEGER, ou une UTF8String, ou une structure, ou autre.

| type | longueur | valeur   |
| ---- | -------- | -------- |
| 02   | 03       | 01 00 01 |

Ensuite, vous rencontrez une longueur : un nombre qui vous indique combien d'octets de données vous allez devoir lire pour obtenir la valeur. Ensuite, bien sûr, viennent les octets contenant la valeur elle-même. Par exemple, les octets hexadécimaux 02 03 01 00 01 représentent un INTEGER (le tag 02 correspond au type INTEGER), de longueur 03, et une valeur de trois octets constituée de 01 00 01.

Le type-longueur-valeur se distingue des encodages délimités comme JSON, CSV, ou XML, où au lieu de connaître la longueur d'un champ dès le départ, vous lisez les octets jusqu'à ce que vous trouviez le délimiteur attendu (par exemple `}` en JSON, ou `</some-tag>` en XML).

Tag
---

Le tag est généralement d'un octet. Il existe un moyen de coder des tags de grande taille en utilisant plusieurs octets (la forme "high tag number"), mais ce n'est généralement pas nécessaire.

Voici quelques exemples de tags :

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

| Tag (décimal) |      Tag (hex) | Type                    |
| -------------:| --------------:| ----------------------- |
|             2 |             02 | INTEGER                 |
|             3 |             03 | BIT STRING              |
|             4 |             04 | OCTET STRING            |
|             5 |             05 | NULL                    |
|             6 |             06 | OBJECT IDENTIFIER       |
|            12 |             0C | UTF8String              |
|            16 | 10 (et 30)\* | SEQUENCE et SEQUENCE OF |
|            17 | 11 (et 31)\* | SET et SET OF           |
|            19 |             13 | PrintableString         |
|            22 |             16 | IA5String               |
|            23 |             17 | UTCTime                 |
|            24 |             18 | GeneralizedTime         |

Ces tags, et quelques autres que j'ai omis parce qu'ils sont ennuyeux, sont les tags "universels", parce qu'ils sont spécifiés dans la spécification de base de l'ASN.1 et qu'ils signifient la même chose dans tous les modules ASN.1.

Il se trouve que ces tags sont tous inférieurs à 31 (0x1F), et ce pour une bonne raison : les bits 8, 7 et 6 (les bits de poids fort de l'octet du tag) sont utilisés pour coder des informations , donc tout numéro de balise universel supérieur à 31 devra utiliser la forme " high tag number ", qui prend des octets supplémentaires. Il existe une petite quantité de tags universels supérieurs à 31, mais ils sont assez rares.

Les deux balises marquées d'un `*` sont toujours codées comme 0x30 ou 0x31, car le bit 6 est utilisé pour indiquer si un champ est Constructed ou Primitive. Ces tags sont toujours Constructed, donc leur encodage a le bit 6 mis à 1. Voir la section [Constructed vs Primitive](#constructed-vs-primitive) pour plus de détails.

Classes de tags
-----------

Ce n'est pas parce que la classe universelle a utilisé tous les "bons" numéros de tags que nous n'avons pas la possibilité de définir nos propres tags. Il existe également les classes "application", " private " et " context-specific ". Elles se distinguent par les bits 8 et 7 :

| Classe           | Bit 8 | Bit 7 |
| ---------------- | -----:| -----:|
| Universel        |     0 |     0 |
| Application      |     0 |     1 |
| Context-specific |     1 |     0 |
| Privé            |     1 |     1 |

Les spécifications utilisent principalement des tags dans la classe universelle, car ils fournissent les blocs de construction les plus importants. Par exemple, le numéro de série d'un certificat est codé sous forme d'un simple INTEGER, avec le tag 0x02. Mais parfois, une spécification doit définir des tags dans la classe context-specific pour désambiguïser les entrées d'un SET ou d'une SEQUENCE qui définit des entrées facultatives, ou pour désambiguïser un CHOICE avec plusieurs entrées qui ont le même type. Par exemple, prenez cette définition :

```asn1
Point ::= SEQUENCE {
  x INTEGER OPTIONAL,
  y INTEGER OPTIONAL
}
```

Puisque les champs OPTIONAL sont entièrement omis de l'encodage lorsqu'ils ne sont pas présents, il serait impossible de distinguer un Point avec seulement une coordonnée x d'un Point avec seulement une coordonnée y. Par exemple vous coderiez un Point avec seulement une coordonnée x de 9 comme ceci (30 signifie SEQUENCE ici) :

```der
30 03 02 01 09
```

C'est une SEQUENCE de longueur 3 (octets), contenant un INTEGER de longueur 1, qui a la valeur 9. Mais vous coderiez également un Point avec une coordonnée y de 9 exactement de la même manière, il y a donc une ambiguïté.

Instructions d'encodage
---------------------

Pour résoudre cette ambiguïté, une spécification doit fournir des instructions d'encodage qui attribuent un tag unique à chaque entrée. Et parce que nous n'avons pas le droit de triturer les tag UNIVERSAL, nous devons utiliser un des autres, par exemple APPLICATION :

```asn1
Point ::= SEQUENCE {
  x [APPLICATION 0] INTEGER OPTIONAL,
  y [APPLICATION 1] INTEGER OPTIONAL
}
```

Bien que pour ce cas d'utilisation, il est en fait beaucoup plus courant d'utiliser la classe context-specific, qui est représentée par un nombre entre crochets :

```asn1
Point ::= SEQUENCE {
  x [0] INTEGER OPTIONAL,
  y [1] INTEGER OPTIONAL
}
```

Donc maintenant, pour encoder un point avec juste une coordonnée x de 9, au lieu de d'encoder x comme un UNIVERSAL INTEGER, on met les bits 8 et 7 du tag encodé à (1, 0) pour indiquer la classe context specific, et on met les bits de poids faible à 0, ce qui donne cet encodage :

```der
30 03 80 01 09
```

Et pour représenter un Point avec seulement une coordonnée y de 9, vous feriez la la même chose, sauf que vous mettez les bits de poids faible à 1 :

```der
30 03 81 01 09
```

Ou vous pouvez représenter un point avec des coordonnées x et y toutes deux égales à 9 :

```der
30 06 80 01 09 81 01 09
```

Longueur
------

La longueur dans le tuple tag-length-value représente toujours le nombre total d'octets dans l'objet, y compris tous les sous-objets. Ainsi, une SEQUENCE comportant un champ n'a pas une longueur de 1 ; elle a une longueur égale au nombre d'octets que la forme codée de ce champ occupe.

L'encodage de la longueur peut prendre deux formes : courte ou longue. La forme courte est un seul octet, entre 0 et 127.

La forme longue comporte au moins deux octets, et le bit 8 du premier octet est mis à 1. Les bits 7-1 du premier octet indiquent combien d'octets supplémentaires se trouvent dans le champ longueur. Puis les octets restants spécifient la longueur elle-même, sous la forme d'un nombre entier à plusieurs octets.

Comme vous pouvez l'imaginer, cela permet des valeurs très longues. La plus grande longueur possible commencerait par l'octet 254 (un octet de longueur de 255 est réservé pour de futures extensions), ce qui signifie que 126 octets supplémentaires suivraient dans le seul champ de longueur. Si chacun de ces 126 octets valait 255, cela indiquerait 2<sup>1008</sup>-1 octets à suivre dans le champ valeur.

La forme longue vous permet de coder la même longueur de plusieurs façons, par exemple en utilisant deux octets pour exprimer une longueur qui pourrait tenir dans un seul, ou en utilisant la forme longue pour exprimer une longueur qui pourrait tenir dans la forme courte. DER dit de toujours utiliser la plus petite longueur possible.

Avertissement de sécurité : ne faites pas entièrement confiance aux valeurs de longueur que vous décodez ! Par exemple, vérifiez que la longueur codée est inférieure à la quantité de données disponibles dans le flux en cours de décodage.

Longueur indéfinie
-----------------

Il est également possible, en BER, de coder une chaîne de caractères, une SEQUENCE, une SEQUENCE OF, un SET ou un SET OF dont on ne connaît pas la longueur à l'avance (par exemple lors d'une sortie en streaming). Pour ce faire, vous codez la longueur comme un seul octet avec la valeur 80, et vous codez la valeur comme une série d'objets codés concaténés ensemble, la fin étant indiquée par les deux octets `00 00` (qui peut être considéré comme un objet de longueur nulle avec le tag 0). Ainsi, par exemple, le codage de longueur indéfinie d'une UTF8String serait le codage d'une ou plusieurs UTF8Strings concaténées ensemble, et concaténées finalement avec 00 00.

L'indéfini peut être imbriqué arbitrairement! Ainsi, par exemple, les UTF8Strings que vous concaténerez ensemble pour former un UTF8String de longueur indéfinie peuvent eux-mêmes être encodés soit avec une longueur définie, soit avec une longueur indéfinie.

Un octet de longueur de 80 est distinctif car il ne s'agit pas d'une longueur de format court ou long valide. Le bit 8 étant à 1, il s'agit normalement de la forme longue, mais les autres bits sont censés indiquer le nombre d'octets supplémentaires qui composent la longueur. Puisque les bits 7-1 sont tous à 0, cela indiquerait un codage long avec zéro octet pour la longueur, ce qui n'est pas autorisé.

DER interdit le codage de longueur indéfinie. Vous devez utiliser le codage à longueur définie (c'est-à-dire avec la longueur spécifiée au début).

Construit vs Primitif
------------------------

Le bit 6 du premier octet du tag est utilisé pour indiquer si la valeur est codée sous forme primitive ou sous forme construite. Le codage primitif représente la valeur directement - par exemple, dans une chaîne UTF8String, la valeur serait constituée uniquement de la chaîne elle-même, en octets UTF-8. Le codage construit représente la valeur comme une concaténation d'autres valeurs codées. Par exemple, comme décrit dans la section "Longueur indéfinie", une UTF8String en codage construit consisterait en de multiples UTF8Strings codés (chacun avec un tag et une longueur), concaténés ensemble. La longueur de la chaîne UTF8 globale serait la longueur totale, en octets, de toutes ces valeurs codées concaténées. Le codage construit peut utiliser une longueur définie ou indéfinie. Le codage primitif utilise toujours une longueur définie, car il n'y a aucun moyen d'exprimer une longueur indéfinie sans utiliser un codage construit.

INTEGER, OBJECT IDENTIFIER, et NULL doivent utiliser le codage primitif. SEQUENCE, SEQUENCE OF, SET et SET OF doivent utiliser un codage construit (parce qu'ils sont par nature des concaténations de plusieurs valeurs). BIT STRING, OCTET STRING, UTCTime, GeneralizedTime et les différents types de chaînes peuvent utiliser un codage primitif ou un codage construit, à la discrétion de l'expéditeur\-- en BER. Cependant, en DER, tous les types qui ont un choix d'encodage entre primitif et construit doivent utiliser l'encodage primitif.

EXPLICIT vs IMPLICIT
--------------------

Les [instructions de codage](#encoding-instructions) décrites ci-dessus, par exemple `[1]`, ou `[APPLICATION 8]`, peuvent également inclure le mot clé EXPLICIT ou IMPLICIT ([exemple tiré du RFC 5280](https://tools.ietf.org/html/rfc5280#page-117)) :

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

Cela définit la façon dont le tag doit être encodé ; cela n'a rien à voir avec le fait que le numéro de tag soit explicitement attribué ou non (puisque IMPLICIT et EXPLICIT vont toujours de pair avec un numéro de tag spécifique). IMPLICIT encode le champ comme le type sous-jacent, mais avec le numéro de tag et la classe fournis dans le module ASN.1. EXPLICIT encode le champ comme le type sous-jacent, puis l'enveloppe dans un encodage externe. L'encodage externe possède le numéro de tag et la classe du module ASN.1 et possède en outre le bit [Constructed](#constructed-vs-primitive) activé.

Voici un exemple d'instruction de codage ASN.1 utilisant IMPLICIT :

```asn1
[5] IMPLICIT UTF8String
```

Cela coderait "hi" comme :

```der
85 02 68 69
```

Comparez avec cette instruction de codage ASN.1 utilisant EXPLICIT :

```asn1
[5] EXPLICIT UTF8String
```

Cela coderait "hi" comme :

```der
A5 04 0C 02 68 69
```

Lorsque le mot-clé IMPLICIT ou EXPLICIT n'est pas présent, la valeur par défaut est EXPLICIT, à moins que le module ne définisse une valeur par défaut différente au début avec "EXPLICIT TAGS", "IMPLICIT TAGS" ou "AUTOMATIC TAGS." Par exemple, le RFC 5280 définit deux modules, l'un où les tags [EXPLICIT sont la valeur par défaut](https://tools.ietf.org/html/rfc5280#appendix-A.1), et un second qui importe le premier et a les tags [IMPLICIT comme valeur par défaut](https://tools.ietf.org/html/rfc5280#appendix-A.2). Le codage implicite utilise moins d'octets que le codage explicite.

AUTOMATIC TAGS est identique à IMPLICIT TAGS, mais avec la propriété supplémentaire que les numéros de tag (`[0]`, `[1]`, etc) sont automatiquement assignés dans les types qui en ont besoin, comme les SEQUENCEs avec des champs optionnels.

Encodage de types spécifiques
==========================

Dans cette section, nous parlerons de la manière dont la valeur de chaque type est encodée, avec des exemples.

Encodage INTEGER
----------------

Les nombres entiers sont codés comme un ou plusieurs octets, en complément à deux avec le bit de poids fort (bit 8) de l'octet le plus à gauche comme bit de signe. Comme le dit la spécification BER :

La valeur d'un nombre binaire de complément à deux est obtenue en numérotant les bits dans les octets, en commençant par le bit 1 du dernier octet comme bit zéro et en terminant la numérotation par le bit 8 du premier octet. Chaque bit se voit attribuer une valeur numérique de 2<sup>N</sup>, où N est sa position dans la séquence de numérotation ci-dessus. La valeur du nombre binaire de complément à deux est obtenue en additionnant les valeurs numériques attribuées à chaque bit pour les bits qui sont à un, à l'exclusion du bit 8 du premier octet, puis en réduisant cette valeur par la valeur numérique attribuée au bit 8 du premier octet si ce bit est à un.

Ainsi, par exemple, cette valeur d'un octet (représentée en binaire) encode le nombre décimal 50 :

00110010 (== décimal 50)

Cette valeur d'un octet (représentée en binaire) code le nombre décimal -100 :

10011100 (== décimal -100)

Cette valeur de cinq octets (représentée en binaire) encode le nombre décimal -549755813887 (i.e. -2<sup>39</sup> + 1) :

10000000 00000000 00000000 00000000 00000001 (== décimal -549755813887)

BER et DER exigent tous deux que les entiers soient représentés sous la forme la plus courte possible. Cela est appliqué avec cette règle :

```
... les bits du premier octet et le bit 8 du deuxième octet :

1.  ne doivent pas tous être des 1 ; et
2.  ne doivent pas tous être des 0.
```

La règle (2) signifie en gros : s'il y a des octets zéro en tête dans le codage, vous pouvez tout aussi bien les laisser de côté et obtenir le même nombre. Le bit 8 du deuxième octet est important ici aussi, car si vous voulez représenter certaines valeurs, vous devez utiliser un octet zéro en tête. Par exemple, la valeur décimale 255 est codée en deux octets :

00000000 11111111

C'est parce que l'encodage d'un seul octet de 11111111 par lui-même signifie -1 (le bit 8 est traité comme le bit de signe).

La règle (1) est mieux expliquée par un exemple. La valeur décimale -128 est encodée comme :

10000000 (== décimal -128)

Cependant, cela pourrait également être codé comme suit :

11111111 10000000 (== décimal -128, mais un encodage invalide)

En développant cela, on obtient -2<sup>15</sup> + 2<sup>14</sup> + 2<sup>13</sup> + 2<sup>12</sup> + 2<sup>11</sup> + 2<sup>10</sup> + 2<sup>9</sup> + 2<sup>8</sup> + 2<sup>7</sup> == -2<sup>7</sup> == -128. Notez que le 1 de "10000000" est un bit de signe dans le codage à un octet, mais signifie 27 dans le codage à deux octets.

Il s'agit d'une transformation générique : Pour tout nombre négatif codé en BER (ou DER), vous pouvez le préfixer avec 11111111 et obtenir le même nombre. Cela s'appelle [l'extension du signe](https://andybargh.com/binary-sign-extension/). Ou, de manière équivalente, s'il existe un nombre négatif dont le codage de la valeur commence par 11111111, vous pouvez supprimer cet octet et obtenir le même nombre. Par conséquent, BER et DER utilisent le codage le plus court.

Le codage en complément à deux des INTEGER a un [impact réel sur la délivrance des certificats](https://bugzilla.mozilla.org/buglist.cgi?query_format=specific&order=relevance%20desc&bug_status=__closed__&product=NSS&content=%E2%80%9CSerial%20entropy%E2%80%9D&comments=0&list_id=16028758) : la RFC 5280 exige que les numéros de série soient positifs. Comme le premier bit est toujours un bit de signe, cela signifie que les numéros de série codés en DER sur 8 octets peuvent avoir une longueur maximale de 63 bits. Le codage d'un numéro de série positif de 64 bits nécessite une valeur codée de 9 octets (le premier octet étant zéro).

Voici le codage d'un INTEGER avec la valeur 2<sup>63</sup>+1 (qui se trouve être un nombre positif de 64 bits) :

```der
02 09 00 80 00 00 00 00 00 00 01
```

Encodage des chaînes de caractères
---------------

Les chaînes sont codées comme leurs octets littéraux. Puisque IA5String et PrintableString définissent simplement différents sous-ensembles de caractères acceptables, leurs encodages ne diffèrent que par le tag.

Une PrintableString contenant "hi" :

```der
13 02 68 69
```

Une IA5String contenant "hi" :

```der
16 02 68 69
```

Les UTF8Strings sont identiques, mais peuvent encoder une plus grande variété de caractères. Par exemple, voici l'encodage d'une chaîne UTF8 contenant U+1F60E Smiling Face With Sunglasses (😎):

```der
0c 04 f0 9f 98 8e
```

Codage de la date et de l'heure
----------------------

UTCTime et GeneralizedTime sont en fait codés comme des chaînes de caractères, étonnamment ! Comme décrit ci-dessus dans la section "Types", UTCTime représente les dates au format YYMMDDhhmmss. GeneralizedTime utilise une année à quatre chiffres YYYY à la place de YY. Tous deux ont un décalage de fuseau horaire facultatif ou "Z" (Zulu) pour indiquer le décalage de fuseau horaire par rapport à UTC.

Par exemple, le 15 décembre 2019 à 19:02:10 dans le fuseau horaire PST (UTC-8) est représenté dans une UTCTime par : 191215190210-0800. Encodé en BER, c'est :

```der
17 11 31 39 31 32 31 35 31 39 30 32 31 30 2d 30 38 30 30
```

Pour l'encodage BER, les secondes sont facultatives dans UTCTime et GeneralizedTime, et les décalages de fuseau horaire sont autorisés. Cependant, DER (ainsi que la RFC 5280) spécifie que les secondes doivent être présentes, que les secondes fractionnaires ne doivent pas être présentes et que l'heure doit être exprimée en UTC avec la forme "Z".

La date ci-dessus serait encodée en DER comme suit :

```der
17 0d 31 39 31 32 31 36 30 33 30 32 31 30 5a
```

Encodage OBJECT IDENTIFIER
--------------------------

Comme [décrit ci-dessus](#object-identifier), les OID sont conceptuellement une série d'entiers. Ils sont toujours composés d'au moins deux éléments. Le premier élément est toujours 0, 1 ou 2. Lorsque le premier élément est égal à 0 ou 1, le deuxième élément est toujours inférieur à 40. De ce fait, les deux premiers éléments sont représentés sans ambiguïté par 40\*X+Y, où X est le premier élément et Y le second.

Ainsi, par exemple, pour coder 2.999.3, il faudrait combiner les deux premiers éléments en 1079 décimal (40\*2 + 999), ce qui vous donnerait "1079.3".

Après avoir appliqué cette transformation, chaque composant est encodé en base 128, avec l'octet le plus significatif en premier. Le bit 8 est mis à "1" dans chaque octet, sauf le dernier d'un élément ; c'est ainsi que vous savez quand un élément est terminé et que le suivant commence. Ainsi, l'élément "3" serait représenté simplement par l'octet 0x03. L'élément "129" serait représenté par les octets 0x81 0x01. Une fois codés, tous les éléments d'un OID sont concaténés ensemble pour former la valeur codée de l'OID.

Les OID doivent être représentés dans le plus petit nombre d'octets possible, que ce soit en BER ou en DER. Les éléments ne peuvent donc pas commencer par l'octet 0x80.

A titre d'exemple, l'OID 1.2.840.113549.1.1.11 (représentant [sha256WithRSAEncryption](https://tools.ietf.org/html/rfc8017#appendix-A.2.4)) est encodé de la manière suivante :

```der
06 09 2a 86 48 86 f7 0d 01 01 0b
```

Encodage NULL
-------------

La valeur d'un objet contenant NULL est toujours de longueur zéro. codage de NULL est toujours juste le tag et un champ de longueur de zéro :

```der
05 00
```

Encodage SEQUENCE
-----------------

La première chose à savoir à propos de SEQUENCE est qu'elle utilise toujours un encodage construit car elle contient d'autres objets. En d'autres termes, les octets de valeur d'une SEQUENCE contiennent la concaténation des champs codés de cette SEQUENCE (dans l'ordre où ces champs ont été définis). Cela signifie également que le bit 6 du tag d'une SEQUENCE (le bit [Constructed vs. Primitive](#constructed-vs-primitive)) est toujours mis à 1. Ainsi, même si le numéro de tag de SEQUENCE est techniquement 0x10, son octet de tag, une fois encodé, est toujours 0x30.

Quand il y a des champs dans une SEQUENCE avec l'annotation OPTIONAL, ils sont simplement omis de l'encodage s'ils ne sont pas utilisés. Lorsqu'un décodeur traite les éléments de la SEQUENCE, il peut déterminer quel type est décodé en fonction de ce qui a été décodé jusqu'à présent et des octets de tag qu'il lit. En cas d'ambiguïté, par exemple lorsque des éléments ont le même type, le module ASN.1 doit spécifier des [instructions de codage](#encoding-instructions) qui attribuent des numéros de tag distincts aux éléments.

Les champs DEFAULT sont similaires aux champs OPTIONAL. Si la valeur d'un champ est la valeur par défaut, elle peut être omise du codage BER. Dans le codage DER, elle DOIT être omise.

A titre d'exemple, la RFC 5280 [définit AlgorithmIdentifier](https://tools.ietf.org/html/rfc5280#page-118) comme une SEQUENCE :

```asn1
   AlgorithmIdentifier  ::=  SEQUENCE  {
        algorithm               OBJECT IDENTIFIER,
        parameters              ANY DEFINED BY algorithm OPTIONAL  }
```

Voici l'encodage de l'AlgorithmIdentifier contenant 1.2.840.113549.1.1.11. La RFC 8017 dit que ["les paramètres" devraient avoir le type NULL pour cet algorithme](https://tools.ietf.org/html/rfc8017#appendix-A.2).

```der
30 0d 06 09 2a 86 48 86 f7 0d 01 01 0b 05 00
```

Encodage SEQUENCE OF
--------------------

Une SEQUENCE OF est codée exactement de la même manière qu'une SEQUENCE. Elle utilise le même tag ! Si vous décodez, la seule façon de faire la différence entre une SEQUENCE et une SEQUENCE OF est de faire référence au module ASN.1.

Voici l'encodage d'une SEQUENCE OF INTEGER contenant les chiffres 7, 8 et 9 :

```der
30 09 02 01 07 02 01 08 02 01 09
```

Encodage SET
------------

Comme la SEQUENCE, un SET est construit, ce qui signifie que ses octets de valeur sont la concaténation de ses champs codés. Son tag est 0x11. Puisque le bit [Constructed vs Primitive](#constructed-vs-primitive) (bit 6) est toujours égal à 1, cela signifie qu'il est codé avec un octet tag de 0x31.

L'encodage d'un SET, comme celui d'une SEQUENCE, omet les champs OPTIONAL et DEFAULT s'ils sont absents ou ont la valeur par défaut. Toute ambiguïté résultant de champs ayant le même type doit être résolue par le module ASN.1, et les champs DEFAULT DOIVENT être omis du codage DER s'ils ont la valeur par défaut.

En BER, un SET peut être codé dans n'importe quel ordre. En DER, un SET doit être encodé dans l'ordre croissant de la valeur sérialisée de chaque élément.

Encodage SET OF
---------------

Un SET OF est encodé de la même manière qu'un SET, y compris l'octet tag de 0x31. Pour le codage DER, il existe une exigence similaire selon laquelle le SET OF doit être codé dans l'ordre croissant. Comme tous les éléments du SET OF ont le même type, le classement par tag n'est pas suffisant. Les éléments d'un SET OF sont donc triés en fonction de leurs valeurs codées, les valeurs les plus courtes étant traitées comme si elles étaient complétées à droite par des zéros.

Encodage BIT STRING
-------------------

Une BIT STRING de N bits est codée sous la forme de N/8 octets (arrondis au supérieur), avec un préfixe d'un octet qui contient le " nombre de bits inutilisés ", pour plus de clarté lorsque le nombre de bits n'est pas un multiple de 8. Par exemple, pour coder la chaîne de bits 011011100101110111 (18 bits), il faut au moins trois octets. Mais c'est un peu plus que ce dont nous avons besoin : cela nous donne une capacité de 24 bits au total. Six de ces bits seront inutilisés. Ces six bits sont écrits à l'extrémité droite de la chaîne de bits, ce qui donne le code suivant :

```der
03 04 06 6e 5d c0
```

Dans BER, les bits non utilisés peuvent avoir n'importe quelle valeur, de sorte que le dernier octet de ce codage pourrait tout aussi bien être c1, c2, c3, et ainsi de suite. En DER, les bits non utilisés doivent tous être à zéro.

Encodage OCTET STRING
---------------------

Une OCTET STRING est codée comme les octets qu'elle contient. Voici un exemple d'une chaîne OCTET STRING contenant les octets 03, 02, 06 et A0 :

```der
04 04 03 02 06 A0
```

Encodage de CHOICE et ANY
-----------------------

Un champ CHOICE ou ANY est encodé comme le type qu'il contient réellement, sauf s'il est modifié par des instructions d'encodage. Ainsi, si un champ CHOICE dans une spécification ASN.1 autorise un INTEGER ou un UTCTime, et que l'objet spécifique encodé contient un INTEGER, il est encodé comme un INTEGER.

En pratique, les champs CHOICE ont très souvent des instructions d'encodage. Par exemple, considérez cet exemple du RFC 5280, où les instructions d'encodage sont nécessaires pour distinguer rfc822Name de dNSName, car ils ont tous deux le type sous-jacent IA5String :

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

Voici un exemple d'encodage d'un GeneralName contenant rfc822Name `a@example.com` (en rappelant que \[1\] signifie utiliser le tag numéro 1, dans la classe de tag "context-specific" (bit 8 mis à 1), avec la méthode d'encodage de tag IMPLICIT) :

```der
81 0d 61 40 65 78 61 6d 70 6c 65 2e 63 6f 6d
```

Voici un exemple d'encodage d'un GeneralName contenant le dNSName "exemple.com" :

```der
82 0b 65 78 61 6d 70 6c 65 2e 63 6f 6d
```

Sécurité
======

Il est important d'être très prudent lors du décodage de BER et DER, en particulier dans les langages non-memory-safe comme C et C++. Il y a une longue histoire de vulnérabilités dans les décodeurs. L'analyse des données entrantes en général est une [source commune de vulnérabilités](http://langsec.org/). Les formats de codage ASN.1 en particulier semblent être [des points de vulnérabilité](https://bugzilla.redhat.com/show_bug.cgi?id=1300257) particuliers. Ce sont des formats compliqués, avec de nombreux champs de longueur variable. Même les longueurs ont des longueurs variables ! Aussi, l'entrée ASN.1 est souvent contrôlée par les attaquants. Si vous devez analyser un certificat afin de distinguer un utilisateur autorisé d'un utilisateur non autorisé, vous devez supposer que, dans certains cas, vous n'analyserez pas un certificat, mais une entrée étrange conçue pour exploiter des bogues dans votre code ASN.1.

Pour éviter ces problèmes, il est préférable d'utiliser un langage sûr pour la mémoire dès que possible. Et que vous puissiez utiliser un langage sûr pour la mémoire ou non. non, il est préférable d'utiliser un [Compilateur ASN.1](https://www.itu.int/en/ITU-T/asn1/Pages/Tools.aspx) pour générer votre code d'analyse plutôt que de l'écrire à partir de zéro.

Remerciements
================

Je suis grandement redevable au document [A Layman's Guide to a Subset of ASN.1, DER, and BER](http://luca.ntop.org/Teaching/Appunti/asn1.html), qui est en grande partie à l'origine de mon apprentissage de ces sujets. Je tiens également à remercier les auteurs de [A warm welcome to DNS](https://powerdns.org/hello-dns/), qui est une excellente lecture et a inspiré le ton de ce document.

Un petit bonus
==============

Avez-vous déjà remarqué qu'un certificat codé en PEM commence toujours par "MII" ? Par exemple :

```
----- DÉBUT DU CERTIFICAT -----

MIIFajCCBFKgAwIBAgISA6HJW9qjaoJoMn8iU8vTuiQ2MA0GCSqGSIb3DQEBCwUA
...
```

Maintenant, vous en savez assez pour expliquer pourquoi ! Un [Certificat est une SEQUENCE](https://tools.ietf.org/html/rfc5280#page-116), donc il commencera par l'octet 0x30. Les octets suivants sont le [champ de longueur](#length). Les certificats sont presque toujours supérieurs à 127 octets, de sorte que le champ de longueur doit utiliser la forme longue de la longueur. Cela signifie que le premier octet sera 0x80 + N, où N est le nombre d'octets de longueur à suivre. N est généralement égal à 2, car c'est le nombre d'octets nécessaires pour coder des longueurs de 128 à 65535, presque tous les certificats ont des longueurs comprises dans cette fourchette.

Nous savons donc maintenant que les deux premiers octets de l'encodage DER d'un certificat sont 0x30 0x82. [L'encodage PEM](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) utilise la [base64](https://en.wikipedia.org/wiki/Base64), qui encode 3 octets d'entrée binaire en 4 caractères ASCII de sortie. Ou, pour le dire autrement : la base64 transforme 24 bits d'entrée binaire en 4 caractères ASCII de sortie, 6 bits de l'entrée étant affectés à chaque caractère. Nous savons ce que seront les 16 premiers bits de chaque certificat. Pour prouver que les premiers caractères de (presque) tous les certificats seront "MII", nous devons regarder les 2 bits suivants. Ce seront les bits les plus significatifs de l'octet le plus significatif des deux octets de longueur. Ces bits seront-ils jamais mis à 1 ? Non, sauf si le certificat fait plus de 16 383 octets ! On peut donc prédire que les premiers caractères d'un certificat PEM seront toujours les mêmes. Essayez-le vous-même :

```bash
xxd -r -p <<<308200 | base64
```
