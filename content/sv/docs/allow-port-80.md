---
title: Bästa praxis - Håll hamnen 80 öppen
slug: allow-port-80
date: 2019-01-24
lastmod: 2019-01-24
show_lastmod: 1
---


Ibland får vi rapporter från personer som har problem med att använda sig utav HTTP-01 Challenge-typen eftersom de har brandväggarna inställda på att blockera port 80 till sin webbserver. Vår rekommendation är att alla servrar som är avsedda för allmän webb -användning ska erbjuda både HTTP på port 80 och HTTPS på port 443. De bör också skicka omdirigeringar för alla port 80 förfrågningar, och eventuellt en HSTS-header (på port 443 förfrågningar).

Att tillåta port 80 introducerar inte en större attackyta på din server, eftersom förfrågningar om port 80 i allmänhet betjänas av samma programvara som körs på port 443.

Att stänga port 80 minskar inte risken för en person som av misstag besöker din webbplats via HTTP. Under normala omständigheter skulle den personen få en omdirigering till HTTPS, och deras efterföljande trafik kommer att skyddas. Om den personen var utsatt för en aktiv MITM, så skulle MITMsvara på port 80, så din webbplats skulle aldrig ha en chans att svara "anslutning nekad."

Slutligen, att hålla port 80 öppen för att tjäna som en omdirigering hjälper personer till rätt version av din webbplats (HTTPS-version). Det finns olika situationer utanför din kontroll som kortfattat kan landa någon på HTTP-versionen av din webbplats - till exempel automatisk länkning i e-post, eller manuellt skriva ett domännamn. Det är bättre för dem att få en omdirigering än ett fel.

Tyvärr kanske du inte har kontroll över om port 80 är blockerad för din webbplats. Vissa (mestadels bostäder) Internetleverantörer blockerar port 80 av olika skäl. Om din ISP gör detta men du skulle fortfarande villja få certifikat från Let's Encrypt, så har du två alternativ: Du kan använda DNS-01 utmaningar eller så kan du använda [en av klienter som stöder TLS-ALPN-01 utmaningar](https://community.letsencrypt.org/t/which-client-support-tls-alpn-challenge/75859/2) (på port 443).
