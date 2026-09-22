---
title: Vanliga frågor
linkTitle: Vanliga frågor (FAQ)
slug: faq
lastmod: 2025-04-28
menu:
  main:
    weight: 30
    parent: about
show_lastmod: 1
---

Denna vanliga frågor-sida är uppdelad i följande delar:

- [Allmänna frågor](#general)
- [Tekniska frågor](#technical)

# <a id="general">Allmänna frågor</a>

## Vilka tjänster erbjuder Let's Encrypt?

Let's Encrypt är en global certifikatsauktoritet (CA). Vi låter människor och organisationer runt om i världen erhålla, förnya och hantera SSL/TLS-certifikat. Våra certifikat kan användas på webbplatser för att möjliggöra säkra HTTPS-anslutningar.

Let's Encrypt erbjuder domänvalideringscertifikat (DV). Vi erbjuder inte organisationsvalidering (OV) eller utökad validering (EV) främst eftersom vi inte kan automatisera utfärdande av dessa typer av certifikat.

För att komma igång, besök vår [kom igång-sida](/getting-started).

## Vad kostar det att använda Let's Encrypt? Är det verkligen gratis?

Vi tar inte ut en avgift för våra certifikat. Let's Encrypt är en icke-kommersiell organisation. Vårt mål är att skapa en säkrare och mer integritetsrespekterande webb genom att främja en bred användning av HTTPS. Våra tjänster är gratis och enkla att använda så att alla webbplatser kan aktivera HTTPS.

Vi behöver stöd från generösa sponsorer, anslagsgivare och individer för att kunna erbjuda våra tjänster kostnadsfritt i hela världen. Om du är intresserad av att stödja oss, vänligen överväg [att donera](/donate) eller [att bli sponsor](https://www.abetterinternet.org/sponsor).

I vissa fall kommer mellanhänder såsom webbhotell debitera en symbolisk summa för att täcka sina administrations- och hanteringskostnader som de ådrar sig genom att erbjuda Let's Encrypt-certifikat.

## Vilken sorts support erbjuder ni?

Let's Encrypt drivs av ett litet team och förlitar sig på automatisering för att hålla kostnaderna nere. På grund av detta kan vi inte erbjuda direktsupport till våra prenumeranter. Vi har däremot några fantastiska supportalternativ:

1. Vi har riktigt nyttig [dokumentation](/docs).
2. Vi har ett väldigt aktivt och hjälpsamt [användarforum](https://community.letsencrypt.org/). Medlemmar i vår gemenskap gör ett fantastiskt jobb genom att besvara frågor och många av de vanligaste frågorna är redan besvarade.

Här är ett [klipp vi gillar](https://www.youtube.com/watch?v=Xe1TZaElTAs) (nio minuter, engeska) om kraften i en bra användargemenskap.

## En webbplats som använder Let's Encrypt är involverad i Phishing/Malware/Bedrägeri/..., vad ska jag göra?

Vi rekommenderar att rapportera sådana sajter till Google Safe Browsing och Microsofts SmartScreen-initiativ som har möjlighet att mer effektivt skydda användare. Här är rapporterings-URL:erna:

- [https://safebrowsing.google.com/safebrowsing/report_badware/](https://safebrowsing.google.com/safebrowsing/report_badware/)
- [https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site-guest](https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site-guest)

Om du vill läsa mer om våra policyer och principer kan du göra detta här:

https://letsencrypt.org/2015/10/29/phishing-and-malware.html

# <a id="technical">Tekniska frågor</a>

## Är certifikat från Let's Encrypt betrodda av min webbläsare?

Ja, av de flesta webbläsare och operativsystem. Se [kompatibilitetslistan](/docs/cert-compat) för fler detaljer.

## Utfärdar Let's Encrypt certifikat för något annat än SSL/TLS för webbsidor?

Let's Encrypt-certifikat är vanliga domänvaliderade certifikat (DV) så du kan använda dem i valfri server som använder ett domännamn, exempelvis webbservrar, e-postservrar, FTP-servrar och så vidare.

E-postkryptering och kodsignering kräver en annan typ av certifikat som Let's Encrypt inte utfärdar.

## Genererar eller sparar Let's Encrypt de privata nycklarna för mina certifikat på Let's Encrypts servrar?

Nej, aldrig. Nej, aldrig.

Den privata nyckeln genereras och hanteras alltid på dina egna servrar, inte av Let's Encrypt.

## Vad är livslängden på Let's Encrypt-certifikat? Hur länge är de giltiga?

Våra standardcertifikat är giltiga i 90 dagar. Du kan läsa mer om varför [här](/2015/11/09/why-90-days.html).

Prenumeranter kan välja att använda kortlivade certifikat som är giltiga i sex dagar. Du kan läsa om dessa [här](/2025/02/20/first-short-lived-cert-issued.html).

Det finns inget sätt att justera dessa giltighetstider, det finns inga undantag. Vi rekommenderar att förnya 90-dagarscertifikat var 60:e dag och sexdagarscertifikat var tredje dag.

## Kommer Let's Encrypt utfärda organisationsvaliderade certifikat (OV) eller stöda utökad validering (EV)?

Vi har inga planer på att utfärda OV- eller EV-certifikat.

## Kan jag få ett certifikat för flera domännamn (SAN- eller UCC-certifikat)?

Ja, ett enskilt certifikat kan innehålla flera olika namn med Subject Alternative Name-mekanismen (SAN).

## Utfärdar Let's Encrypt wildcard-certifikat?

Ja. Wildcardsutgivning måste använda [DNS-01-utmaning](/docs/challenge-types/#dns-01-challenge). Se [det här inlägget](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578) för mer teknisk information.

## Finns det en Let's Encrypt-klient (ACME) för mitt operativsystem?

Det finns en uppsjö av [ACME-klienter](/docs/client-options) tillgängliga. Sannolikheten är stor att någon fungerar bra på ditt operativsystem. Vi rekommenderar att du börjar med [Certbot](https://certbot.eff.org/).

## Kan jag använda en befintlig privat nyckel eller certifikatsigneringsbegäran (CSR)?

Ja, men inte alla klienter stöder detta. [Certbot](https://certbot.eff.org/) gör.

## Jag begärde ett certifikat och nu får min domän mycket trafik! Varför händer detta?

Detta är normalt och förväntat. Under [certifikatutfärdandeprocess](/how-it-works), Let's Encrypt kommer att validera kontrollen av din domän från [flera nätverksperspektiv](/2020/02/19/multi-perspective-validation). Efter lyckad validering skickas certifikatet till flera [Certificate Transparency-loggar (CT-loggar)](/docs/ct-logs). Se [här](https://certificate.transparency.dev/howctworks/#pki) för mer information om varför detta är nödvändigt. Strax efter att certifikatet har skickats in till CT kommer automatiserade CT-crawling-botar att kunna upptäcka din domän, försöka få åtkomst till den och generera ytterligare trafik i dina webbserverloggar.

## Från vilka IP-adresser gör Let's Encrypt valideringen av min webbserver?

Vi publicerar inte en lista av IP-adresser som vi använder för validering och adresserna vi använder kan komma att ändras. Observera att vi nu [validerar från flera IP-adresser](/2020/02/19/multi-perspective-validation.html).

## Jag förnyade framgångsrikt ett certifikat men igen validering gjordes den här gången --- hur kommer det sig?

När du väl framgångsrikt slutfört utmaningarna för en domän sparas ditt kontos resulterande behörighet för att användas senare. Cachelagda auktoriseringar gäller i upp till 30 dagar från valideringstidpunkten, beroende på den associerade [-profilen](/docs/profiles). Om ditt konto har alla nödvändiga behörigheter som behövs för certifikatet du efterfrågade sparade så kommer inte någon validering att ske förrän relevanta sparade behörigheter löper ut.

## Varför ska min Let's Encrypt (ACME) klient köras vid en slumpmässig tid?

Vi ber att [ACME-klienter utför rutinmässiga förnyelser vid slumpmässiga tider](https://letsencrypt.org/docs/integration-guide/#when-to-renew) för att undvika toppar i trafiken vid fasta tider på dagen, såsom exakt midnatt UTC, eller den första sekunden varje timme eller minut. När tjänsten är för upptagen, kommer klienterna att bli ombedda att [försöka igen senare](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503), så att slumpmässiga förnyelsetider kan hjälpa till att undvika onödiga försök.

## Var kan jag lära mig mer om TLS/SSL och PKI i allmänhet?

Den länge verksamma säkerhetsforskaren och praktikern Ivan Ristić publicerade en konfigurationsguide som ger användbar information om vad du bör överväga när du <a href="https://www.feistyduck.com/library/bulletproof-tls-guide/online/" target="_blank" rel="noopener noreferrer">sätter upp din TLS-konfiguration</a>.

För mer omfattande bakgrund och större detaljer rekommenderar vi <a href="https://www.feistyduck.com/books/bulletproof-tls-and-pki/" target="_blank" rel="noopener noreferrer">Bulletproof TLS and PKI</a>, också skriven av Ristić.
