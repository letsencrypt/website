---
title: Bedste Praksis - Hold Port 80 Åben
slug: allow-port-80
date: 2019-01-24
lastmod: 2019-01-24
show_lastmod: 1
---


Vi får lejlighedsvis rapporter fra folk, der har problemer med at bruge HTTP-01 challenge typen, fordi de har en firewall, der spærrer port 80 til deres webserver. Vores anbefaling er, at alle servere beregnet til generel web- brug bør tilbyde både HTTP på port 80 og HTTPS på port 443. De bør også omdirigeringe alle port 80 anmodninger, og muligvis en HSTS header (på port 443 anmodninger).

At tillade port 80 ikke indføre en større angrebs flade på din server, fordi anmodninger om port 80 generelt er betjent af den samme software, som kører på port 443.

Lukning port 80 reducerer ikke risikoen for en person, som ved et uheld besøger din hjemmeside via HTTP. Under normale omstændigheder ville denne person modtage en omdirigering til HTTPS, og deres efterfølgende trafik vil være beskyttet. Hvis den pågældende person var underlagt et aktivt MITM, ville MITM svare på port 80, så dit websted aldrig ville have en chance for at besvare "forbindelse nægtet"

Endeligt, ved at holde port 80 åben for at udføre en omdirigering hjælper med at få personer til den rigtige version af dit websted (HTTPS-versionen). Der er forskellige situationer uden for din kontrol, der kan kort lander nogen på HTTP versionen af dit websted - for eksempel, automatisk linkning generering i e-mails, eller manuelt skrive et domænenavn. Det er bedre for dem at få en omdirigering end en fejl.

Desværre har du muligvis ikke altid kontrol over, om port 80 er blokeret for dit websted. Nogle (mest privatkunde) internetudbydere blokker port 80 af forskellige årsager. Hvis din internetudbyder gør dette, men du stadig gerne vil anvende certifikater fra Let's Encrypt, du har to muligheder: Du kan bruge DNS-01 challenges eller du kan bruge [en af de klienter, der understøtter TLS-ALPN-01 challenges](https://community.letsencrypt.org/t/which-client-support-tls-alpn-challenge/75859/2) (på port 443).
