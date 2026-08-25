---
title: Varför alla webbplatser bör använda HTTPS
slug: why-all-https
lastmod: 2025-08-03
show_lastmod: 1
---

Vissa serveroperatörer har historiskt hävdat att de inte har något känsligt på sin webbplats och därmed inget behov av sekretess. Detta är dock inte ett starkt argument, och vi anser att alla webbplatser bör använda HTTPS av följande skäl:

## Vanlig HTTP-trafik kan ses under överföring

När trafiken inte är krypterad är den synlig under överföring. Detta innebär att allt innehåll som går i båda riktningarna på en anslutning, inklusive allt känsligt, kan ses av vilken enhet som helst på nätverksvägen. Detta är ett uppenbart sekretessproblem, likt att skicka brev fram och tillbaka utan kuvert.

Även om en serveroperatör tror att det inte finns något känsligt på deras webbplats, gör människor ibland misstag. Kanske _borde_ ingen känslig information skickas, men det betyder inte att det inte kommer att finnas. HTTPS hjälper till att säkerställa att misstag inte blir sekretessbrott.

Dessutom kontrollerar en serveroperatör inte all trafik till och från deras webbplats: det finns inget de kan göra för att förhindra att besökare av misstag _skickar_ känslig information som en del av en begäran, kanske via ett formulär eller en felkonfiguration i klientprogramvara. Att förvänta sig att de aldrig gör det är en orimligt hög förväntning.

Slutligen kan själva handlingen att besöka en webbplats ibland vara känslig information, särskilt för personer som lever under förtryckande regimer. HTTPS stöder en utökning som kallas [Encrypted Client Hello (ECH)](https://en.wikipedia.org/wiki/Server_Name_Indication#Encrypted_Client_Hello) som kan dölja den informationen, men det extra skyddslagret är inte tillgängligt på webbplatser som använder HTTP.

## Vanlig HTTP-trafik kan modifieras under överföring

Ännu värre, när trafiken inte är krypterad kan den modifieras under överföring. Detta innebär att ingen kan vara säker på att det som skickades är det som tas emot, i båda riktningarna. Anslutningen saknar inte bara sekretess, den saknar _integritet_.

Ett vanligt exempel på detta är injektion av annonser och/eller skadlig programvara i serverns svar. Om en webbplats inte aktiverar HTTPS utsätter den sina besökare för denna risk, oavsett det faktiska innehållet på webbplatsen.
