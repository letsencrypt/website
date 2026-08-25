---
title: lencr.org
slug: lencr.org
lastmod: 2025-07-31
show_lastmod: 1
---


# Vad är `lencr.org`?

`lencr.org` är ett domännamn som ägs av Let's Encrypt. Vi använder det för att värddata som refereras till i de certifikat vi utfärdar.

# Varför hämtar min dator dessa data? Är det skadligt?

Nej, datan på `lencr.org` är aldrig skadlig. När en enhet ansluter till `lencr.org` är det för att klientprogramvara på den enheten (som en webbläsare eller en app) anslöt till en annan webbplats, såg ett Let's Encrypt-certifikat och försöker verifiera att det är giltigt. Detta är rutin för många klienter.

Vi kan inte uttala oss om huruvida den andra webbplatsen</em> som *anslöt till är skadlig. Om du undersöker nätverksaktivitet som verkar ovanlig, kanske du vill fokusera på anslutningen som startade precis innan anslutningen till `lencr.org`.</p>

Mönstret för klienters anslutningar till `lencr.org` kan se ovanligt eller intermittenta ut. Klienter kanske aldrig hämtar denna data; hämtar endast delmängder av den; eller "cachar" viss data för effektivitet, så de kommer bara åt den ibland (första gången de behöver den och när datan kan ha gått ut).

# Vad exakt är denna data till för?

När klientprogramvara (som en webbläsare eller en app) ansluter till en webbplats och den webbplatsen presenterar ett certifikat, bör klienten verifiera att certifikatet är autentiskt och giltigt. Denna data hjälper klienter att göra det på flera sätt.

* Under `c.lencr.org` tillhandahåller vi Certifikatåterkallelse-listor (CRL) som listar alla ogiltiga certifikat som vi utfärdade och senare återkallade.

* Under `i.lencr.org` tillhandahåller vi kopior av våra mellanliggande "utfärdar"-certifikat, som antingen är signerade av ett av våra rotcertifikat eller "cross-signerade" av en annan certifikatutfärdare (CA). En klient kan använda denna data för att bekräfta "tillitskedjan" från slutentitetscertifikatet den verifierar, via ett eller flera mellanliggande steg, till ett rotcertifikat från en CA som den känner igen och litar på.

# Varför "`lencr.org`"?

Vi brukade använda längre URL:er som `http://example.int-x3.letsencrypt.org/`. När vi utfärdade våra [nya rot- och mellancertifikat][1] ville vi dock göra dem så små som möjligt. Varje HTTPS-anslutning på webben (miljarder per dag) måste skicka en kopia av ett certifikat, så varje byte räknas. Vi valde `lencr.org` på grund av dess likhet med vårt namn: **L**et's **ENCR**ypt. Vi uttalar det ungefär som den fiktiva regionen [Lancre][] i Terry Pratchetts _Discworld_-romaner.

[1]: https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html
[Lancre]: https://wiki.lspace.org/Lancre
