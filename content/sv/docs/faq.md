---
title: Vanliga frågor
linkTitle: Vanliga frågor (FAQ)
slug: faq
top_graphic: 1
date: 2017-07-06
lastmod: 2019-12-22
menu:
  main:
    weight: 30
    parent: about
---

{{< lastmod >}}

Denna vanliga frågor-sida är uppdelad i följande delar:

* [Allmänna frågor](#general)
* [Tekniska frågor](#technical)

# <a name="general">Allmänna frågor</a>

## Vilka tjänster erbjuder Let's Encrypt?

Let's Encrypt är en global certifikatsauktoritet (CA). Vi låter människor och
organisationer runt om i världen erhålla, förnya och hantera SSL/TLS-certifikat.
Våra certifikat kan användas på webbplatser för att möjliggöra säkra
HTTPS-anslutningar.

Let's Encrypt erbjuder domänvalideringscertifikat (DV). Vi erbjuder inte
organisationsvalidering (OV) eller utökad validering (EV) främst eftersom vi
inte kan automatisera utfärdande av dessa typer av certifikat.

För att komma igång, besök vår [kom igång-sida]({{< relref "/getting-started.md"
>}}).

## Vad kostar det att använda Let's Encrypt? Är det verkligen gratis?

Vi tar inte ut en avgift för våra certifikat. Let's Encrypt är en
icke-kommersiell organisation. Vårt mål är att skapa en säkrare och mer
integritetsrespekterande webb genom att främja en bred användning av HTTPS. Våra
tjänster är gratis och enkla att använda så att alla webbplatser kan aktivera
HTTPS.

Vi behöver stöd från generösa sponsorer, anslagsgivare och individer för att
kunna erbjuda våra tjänster kostnadsfritt i hela världen. Om du är intresserad
av att stödja oss så överväg att {{<link "donera" "/donate.html" >}} eller
{{<link "bli en sponsor" "/become-a-sponsor.html" >}}.

I vissa fall kommer mellanhänder såsom webbhotell debitera en symbolisk summa
för att täcka sina administrations- och hanteringskostnader som de ådrar sig
genom att erbjuda Let's Encrypt-certifikat.

## Vilken sorts support erbjuder ni?

Let's Encrypt drivs av ett litet team och förlitar sig på automatisering för att
hålla kostnaderna nere. På grund av detta kan vi inte erbjuda direktsupport till
våra prenumeranter. Vi har däremot några fantastiska supportalternativ:

1. Vi har riktigt nyttig {{<link "dokumentation" "/docs" >}}.
2. Vi har ett väldigt aktivt och hjälpsamt
   [användarforum](https://community.letsencrypt.org/). Medlemmar i vår
   gemenskap gör ett fantastiskt jobb genom att besvara frågor och många av de
   vanligaste frågorna är redan besvarade.

Här är ett [klipp vi gillar](https://www.youtube.com/watch?v=Xe1TZaElTAs) (nio
minuter, engeska) om kraften i en bra användargemenskap.

## En webbplats som använder Let's Encrypt håller på med nätfiske/skadeprogram/lurendrejeri/... Vad ska jag göra?

Vi rekommenderar att rapportera sådana sajter till Google Safe Browsing och
Microsofts SmartScreen-initiativ som har möjlighet att mer effektivt skydda
användare. Här är Googles rapporteringsadress:

https://safebrowsing.google.com/safebrowsing/report\_badware/

Om du vill läsa mer om våra policyer och principer kan du göra detta här:

https://letsencrypt.org/2015/10/29/phishing-and-malware.html

# <a name="technical">Tekniska frågor</a>

## Är certifikat från Let's Encrypt betrodda av min webbläsare?

Ja, av de flesta webbläsare och operativsystem. Se
{{<link "kompatibilitetslistan" "/docs/cert-compat" >}} för fler
detaljer.

## Utfärdar Let's Encrypt certifikat för något annat än SSL/TLS för webbsidor?

Let's Encrypt-certifikat är vanliga domänvaliderade certifikat (DV) så du kan
använda dem i valfri server som använder ett domännamn, exempelvis webbservrar,
e-postservrar, FTP-servrar och så vidare.

E-postkryptering och kodsignering kräver en annan typ av certifikat som Let's
Encrypt inte utfärdar.

## Genererar eller sparar Let's Encrypt de privata nycklarna för mina certifikat på Let's Encrypts servrar?

Nej, aldrig.

De privata nycklarna genereras och hanteras alltid på dina egna servrar --- inte
av Let's Encrypt-CA:n.

## Vad är livslängden på Let's Encrypt-certifikat? Hur länge är de giltiga?

Våra certifikat är giltiga i 90 dagar. Du kan läsa mer om varför
[här](/2015/11/09/why-90-days.html).

Det finns inget sätt att ändra på detta. Det finns inga undantag. Vi
rekommenderar automatisk förnyelse av dina certifikat var 60:e dag.

## Kommer Let's Encrypt utfärda organisationsvaliderade certifikat (OV) eller stöda utökad validering (EV)?

Vi har inga planer på att utfärda OV- eller EV-certifikat.

## Kan jag få ett certifikat för flera domännamn (SAN- eller UCC-certifikat)?

Ja, ett enskilt certifikat kan innehålla flera olika namn med Subject
Alternative Name-mekanismen (SAN).

## Utfärdar Let's Encrypt wildcard-certifikat?

Ja. Utfärdande av wildcard-certifikat (jokercertifikat) måste göras via ACMEv2
genom utmaningen DNS-01. Se [det här
inlägget](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578)
för mer teknisk information.

## Finns det en Let's Encrypt-klient (ACME) för mitt operativsystem?

Det finns en uppsjö av {{<link "ACME-klienter" "/docs/client-options" >}}
tillgängliga. Sannolikheten är stor att någon fungerar bra på ditt
operativsystem. Vi rekommenderar att du börjar med
[Certbot](https://certbot.eff.org/).

## Kan jag använda en befintlig privat nyckel eller certifikatsigneringsbegäran (CSR)?

Ja, men inte alla klienter stöder detta. [Certbot](https://certbot.eff.org/) gör.

## Från vilka IP-adresser gör Let's Encrypt valideringen av min webbserver?

Vi publicerar inte en lista av IP-adresser som vi använder för validering och
adresserna vi använder kan komma att ändras. I framtiden kommer vi att validera
från flera IP-adresser samtidigt. Se [det här
inlägget](https://community.letsencrypt.org/t/validating-challenges-from-multiple-network-vantage-points)
för detaljer.

## Jag förnyade framgångsrikt ett certifikat men igen validering gjordes den här gången --- hur kommer det sig?

När du väl framgångsrikt slutfört utmaningarna för en domän sparas ditt kontos
resulterande behörighet för att användas senare. Behörigheter sparas i 30 dagar
från validering. Om ditt konto har alla nödvändiga behörigheter som behövs för
certifikatet du efterfrågade sparade så kommer inte någon validering att ske
förrän relevanta sparade behörigheter löper ut.
