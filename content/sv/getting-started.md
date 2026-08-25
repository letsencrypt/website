---
title: Komma igång
slug: getting-started
lastmod: 2025-01-23
---

Let's Encrypt utfärdar certifikat via ett automatiserat API baserat på [ACME-protokollet](https://en.wikipedia.org/wiki/Automatic_Certificate_Management_Environment).

För att interagera med Let's Encrypt API och få ett certifikat krävs en programvara som kallas en "ACME-klient". Ingen del av processen för att få ett certifikat sker på denna webbplats, som endast är informativ.

Den första frågan att besvara för personer som vill komma igång med Let's Encrypt är: kommer min webbhotellleverantör att få och hantera certifikat från Let's Encrypt åt mig, eller behöver jag köra en ACME-klient själv?

# Att få certifikat via din webbhotellleverantör

För många människor kommer deras [webbhotellleverantör att få och hantera certifikat från Let's Encrypt åt dem](https://certbot.eff.org/hosting_providers). Om detta är din situation, kör din leverantör en ACME-klient och du behöver inte tänka på att skaffa eller driva ACME-klientprogramvara själv.

Om din leverantör får och hanterar certifikat åt dig, kommer det antingen att ske automatiskt eller så finns det ett konfigurationsalternativ som du behöver aktivera. Kontrollera din leverantörs dokumentation och konfigurationsalternativ.

# Att själv välja och driva en ACME-klient

Om din webbhotellleverantör inte hanterar att få och hantera certifikat åt dig, och om du har möjlighet att köra kommandon på din server med tillräckliga rättigheter, kan du välja en ACME-klient och köra den själv för att få certifikat från Let's Encrypt.

För de flesta människor rekommenderar vi [Certbot ACME-klienten](https://certbot.eff.org/). Certbots webbplats har utmärkt dokumentation och instruktioner för hur man använder Certbot.

Det finns [många fler alternativ för ACME-klientprogramvara](/docs/client-options/) om Certbot av någon anledning inte uppfyller dina behov.

Om din klient behöver konfigureras med Let's Encrypt ACME API-slutpunkt, är den:

<code>[https://acme-v02.api.letsencrypt.org/directory](https://acme-v02.api.letsencrypt.org/directory)</code>

Vi rekommenderar att först köra tester mot vår [staging API](/docs/staging-environment/).

# Få hjälp

Om du har frågor angående val av ACME-klient, om användning av en specifik klient eller något annat relaterat till Let's Encrypt, är du välkommen att testa vårt [hjälpsamma användarforum](https://community.letsencrypt.org/) på engelska.

Vår webbplats har också [omfattande dokumentation](/docs/) om du behöver fler detaljer.
