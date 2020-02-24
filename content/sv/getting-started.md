---
title: Kom igång
slug: getting-started
top_graphic: 3
date: 2019-12-21
---

{{< lastmod >}}

För att aktivera HTTPS på din webbplats behöver du erhålla ett certifikat (en
typ av fil) från en certifikatutgivare (CA, Certificate Authority). Let's
Encrypt är en sådan.  För att erhålla ett certifikat för din webbplats domän
från Let's Encrypt behöver du bevisa kontroll över domänen. Med Let's Encrypt
gör du detta genom att använda ett program som använder
[ACME-protokollet](https://tools.ietf.org/html/rfc8555) och det kör vanligtvis
på din webbserver.

För att få reda på vilken metod som funkar bäst för dig behöver du veta huruvida
du har [tillgång till skal](https://sv.wikipedia.org/wiki/Skalprogram) (även
känt som [SSH](https://sv.wikipedia.org/wiki/Secure_Shell)) på din webbserver.
Om du hanterar din webbplats uteslutande genom en kontrollpanel som
[cPanel](https://cpanel.net/), [Plesk](https://www.plesk.com/) eller
[WordPress](https://sv.wordpress.org/), är sannolikheten stor att du inte har
tillgång till skalprogram. Fråga ditt webbhotell för att vara säker.

# Med tillgång till skal

Vi rekommenderar att folk med tillgång till skal i första hand använder
ACME-klienten [Certbot]. Den kan automatisera certifikatutfärdande och
installation utan nertid. Den har även expertlägen för de som inte föredrar
automatisk konfiguration. Den är lätt att använda, fungerar på många
operativsystem och har väldigt bra dokumentation. [Besök
Certbot-sajten][Certbot](engelska) för att få skräddarsydda instruktioner för
ditt operativsystem och din webbserver.

Om [Certbot] inte uppfyller dina krav eller om du vill testa något annat så
finns det {{<link "många fler ACME-klienter att välja bland" "/docs/client-options" >}}. När du väl valt ACME-klient så kika på den
klientens dokumentation för att fortsätta.

Om du experimenterar med olika ACME-klienter, se till att använda vår
{{<link "testmiljö" "/docs/staging-environment" >}} för att undvika att
utsättas för {{<link "taktbegränsningar" "/docs/rate-limits" >}}.

[Certbot]: https://certbot.eff.org/  "Certbot"

# Utan tillgång till skal

Det bästa sättet att använda Let's Encrypt utan tillgång till skal är genom att
använda inbyggt stöd hos ditt webbhotell. Om ditt webbhotell erbjuder Let's
Encrypt-stöd så kan de begära ett gratis certifikat å dina vägnar, installera
det och hålla det uppdaterat automatiskt. Hos vissa webbhotell är detta en
konfigurationsinställning som behöver aktiveras först. Andra webbhotell begär
automatiskt certifikat och installerar dem för sina kunder.

[Kontrollera vår lista över
webbhotell](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920)
(engelska) för att se om ditt finns med. Följ i så fall deras dokumentation för
att konfigurera ditt Let's Encrypt-certifikat.

Om ditt webbhotell inte erbjuder stöd för Let's Encrypt kan du kontakta dem och
efterfråga det. Vi gör vårt bästa för att göra det väldigt enkelt att lägga till
Let's Encrypt-stöd och webbhotell blir ofta glada att få förslag från sina
kunder!

Om ditt webbhotell inte vill integrera Let's Encrypt men tillåter uppladdning av
egna certifikat kan du installera Certbot på din egen dator och använda dess
[manuella läge](https://certbot.eff.org/docs/using.html#manual) (instruktioner
på engelska).  I manuellt läge laddar du upp en speciell fil till din webbplats
för att bevisa din kontroll över domänen. Certbot kommer då att hämta ett
certifikat som du kan ladda upp till ditt webbhotell. Vi rekommenderar inte det
här alternativet eftersom det är tidsödande och du kommer behöva upprepa detta
flera gånger per år eftersom ditt certifikat löper ut. För de flesta är det
bättre att efterfråga stöd för Let's Encrypt hos webbhotellet eller byta
leverantör om de inte planerar att införa stöd.

# Få hjälp

Om du har frågor angående val av ACME-klient, om användning av en specifik
klient eller något annat relaterat till Let's Encrypt, är du välkommen att
testa vårt [hjälpsamma användarforum](https://community.letsencrypt.org/) på
engelska.
