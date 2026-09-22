---
title: IPv6-stöd
slug: ipv6-support
lastmod: 2026-08-04
show_lastmod: 1
---


Let's Encrypt stöder IPv6 både för åtkomst till ACME API med en ACME-klient och för de DNS-uppslag och HTTP-förfrågningar vi gör när vi validerar din kontroll över domännamn.

## Domänvalidering

När vi gör utgående domänvalideringsförfrågningar för en domän som har både IPv4- och IPv6-adresser (t.ex. både `A`- och `AAAA`-poster) kommer Let's Encrypt alltid att föredra IPv6-adresser för den initiala anslutningen. Om IPv6-anslutningen misslyckas på nätverksnivå (t.ex. det uppstår en timeout) och IPv4-adresser finns tillgängliga kommer vi att försöka igen med en av IPv4-adresserna.

## Felaktiga IPv6-adresser

Ofta är domänägare inte medvetna om en `AAAA`-post för sin domän. Om IPv6-adressen i `AAAA`-posten är felaktig kommer det att påverka domänvalideringsprocessen.

Vanligtvis kommer IPv6-adressen att vara en annan server än IPv4-adressen där ACME-klienten körs. Eftersom ACME-klienten endast konfigurerar IPv4-servern för att svara på utmaningen kommer domänvalideringen att misslyckas när IPv6-servern används.

I de flesta fall är den korrekta lösningen att uppdatera IPv6-adressen så att den pekar på servern där ACME-klienten körs, eller att ta bort `AAAA`-posten om domänen inte är avsedd att fungera med IPv6. Det finns inget sätt att begära att Let's Encrypt föredrar IPv4, du måste åtgärda felkonfigurationen.

## Detaljer om IPv6 till IPv4-omförsök

IPv6 till IPv4-omförsök sker endast vid anslutningstidsgränser, inte vid andra typer av fel.

Till exempel i scenariot ovan sker ingen omförsök om det finns en webbserver som lyssnar på IPv6-adressen, men den webbservern är inte redo att svara på ACME-utmaningen. I det här fallet skulle det inte bli någon tidsgräns för anslutning till IPv6-adressen och utmaningen misslyckas utan omförsök eftersom felaktigt svar returnerades.

För att hålla vår CA-programvara enkel utför vi endast ett IPv6 till IPv4-omförsök vid den första begäran när vi validerar "http-01"-utmaningar. Om du använder omdirigeringar kommer omdirigeringarna inte att få omförsöksbehandling.

Till exempel, om ett domännamn har en `AAAA`-post som alltid överskrider tidsgränsen och en `A`-post med en webbserver som omdirigerar från HTTP till HTTPS, kommer IPv6 till IPv4-fallbacken inte att fungera korrekt. Den första begäran till domänen faller korrekt tillbaka till IPv4 och mottar en omdirigering från HTTP till HTTPS. Den efterföljande begäran kommer igen att föredra IPv6-adressen men kommer att överskrida tidsgränsen utan att falla tillbaka till IPv4. Du kan lösa denna situation antingen genom att åtgärda felkonfigurationen av IPv6 eller ta bort HTTP till HTTPS-omdirigeringen för begärningar till ACME HTTP-01-utmaningsvägen.

## Få hjälp

Om du behöver hjälp med att diagnostisera ett IPv6-relaterat problem, vänligen besök vårt [-communityforum](https://community.letsencrypt.org).
