---
title: Utmaningstyper
slug: challenge-types
lastmod: 2026-02-12
show_lastmod: 1
---


När du får ett certifikat från Let’s Encrypt validerar våra servrar att du kontrollerar domännamnen i det certifikatet med hjälp av "utmaningar", enligt ACME-standarden. Oftast hanteras denna validering automatiskt av din ACME-klient, men om du behöver fatta mer komplexa konfigurationsbeslut är det bra att veta mer om dem. Om du är osäker, välj din klients standardinställningar eller HTTP-01.

# HTTP-01-utmaning

Detta är den vanligaste utmaningstypen idag. Let’s Encrypt ger en token till din ACME-klient, och din ACME-klient lägger en fil på din webbserver vid `http://<YOUR_DOMAIN>/.well-known/acme-challenge/<TOKEN>` . Den filen innehåller token, plus ett fingeravtryck av din kontonyckel. När din ACME-klient berättar för Let’s Encrypt att filen är klar, försöker Let’s Encrypt hämta den (potentiellt flera gånger från flera vinklar). Om våra valideringskontroller får rätt svar från din webbserver, anses valideringen vara lyckad och du kan gå vidare för att utfärda ditt certifikat. Om valideringskontrollerna misslyckas, måste du försöka igen med ett nytt certifikat.

Vår implementation av HTTP-01-utmaningen följer omdirigeringar, upp till 10 omdirigeringar djupt. Den accepterar endast omdirigeringar till “http:” eller “https:” och endast till portar 80 eller 443. När den omdirigeras till en HTTPS-URL, validerar den inte certifikat (eftersom denna utmaning är avsedd att starta giltiga certifikat, kan den stöta på självsignerade eller utgångna certifikat på vägen).

HTTP-01-utmaningen kan endast utföras på port 80. Att tillåta klienter att specificera godtyckliga portar skulle göra utmaningen mindre säker, och därför är det inte tillåtet enligt ACME-standarden.

Fördelar:

- Det är lätt att automatisera utan extra kunskap om en domäns konfiguration.
- Det tillåter webbhotell att utfärda certifikat för domäner som CNAME:as till dem.
- Det fungerar med standardwebbservrar.
- Det kan också användas för att validera IP-adresser.

Nackdelar:

- Det fungerar inte om din ISP blockerar port 80 (detta är ovanligt, men vissa privata ISPer gör det).
- Denna utmaning kan inte användas för att utfärda wildcard-certifikat.
- Om du har flera webbservrar måste du se till att filen finns på alla dem.

# DNS-01-utmaning

Denna utmaning ber dig bevisa att du kontrollerar DNS för ditt domännamn genom att sätta ett specifikt värde i en TXT-post under det domännamnet. Det är svårare att konfigurera än HTTP-01, men kan fungera i scenarier där HTTP-01 inte fungerar. Det tillåter dig också att utfärda wildcard-certifikat. Efter att Let’s Encrypt ger din ACME-klient en token, kommer din klient att skapa en TXT-post baserad på den token och ditt kontonyckel, och sätta den posten på `_acme-challenge.<YOUR_DOMAIN>`. Sedan kommer Let’s Encrypt att fråga DNS-systemet efter den posten. Om den hittar en match, kan du fortsätta med att utfärda ett certifikat!

Eftersom automatisering av utfärdande och förnyelser är mycket viktig, är det bara meningsfullt att använda DNS-01-utmaningar om din DNS-leverantör har ett API som du kan använda för att automatisera uppdateringar. Vår community har sammanställt en [lista över sådana DNS-leverantörer][dns-api-providers]. Din DNS-leverantör kan vara densamma som din registrar (företaget du köpte ditt domännamn från), eller så kan den vara en annan. Om du vill byta DNS-leverantör behöver du bara göra några små ändringar hos din registrar. Du behöver inte vänta tills din domän närmar sig utgång för att göra detta.

Observera att att lägga in dina fullständiga DNS API-uppgifter på din webbserver avsevärt ökar risken om webbservern blir hackad. Bästa praxis är att använda [mer begränsade API-uppgifter][securing-dns-credentials], eller utföra DNS-validering från en separat server och automatiskt kopiera certifikat till din webbserver.

Eftersom Let’s Encrypt följer DNS-standarderna när den söker efter TXT-poster för DNS-01-validering, kan du använda CNAME-poster eller NS-poster för att delegera svar på utmaningen till andra DNS-zoner. Detta kan användas för att [delegera underdomänen `_acme-challenge`][securing-dns-credentials] till en server eller zon som är avsedd för validering. Det kan också användas om din DNS-leverantör uppdaterar långsamt och du vill delegera till en server som uppdaterar snabbare.

De flesta DNS-leverantörer har en 'propagationstid' som avgör hur lång tid det tar från det att du uppdaterar en DNS-post tills den är tillgänglig på alla deras servrar. Det kan vara svårt att mäta detta eftersom de ofta också använder [anycast][], vilket betyder att flera servrar kan ha samma IP-adress, och beroende på var du befinner dig i världen kan du prata med en annan server (och få ett annat svar) än Let’s Encrypt. De bästa DNS-API:erna erbjuder ett sätt för dig att automatiskt kontrollera om en uppdatering är fullständigt utbredd. Om din DNS-leverantör inte har detta, måste du bara konfigurera din klient att vänta tillräckligt länge (ofta upp till en timme) för att säkerställa att uppdateringen är utbredd innan valideringen triggas.

Du kan ha flera TXT-poster på plats för samma namn. Till exempel kan detta hända om du validerar en utmaning för ett wildcard och ett icke-wildcard-certifikat samtidigt. Dock bör du se till att ta bort gamla TXT-poster, eftersom om svarsstorleken blir för stor kommer Let’s Encrypt börja avvisa det.

Fördelar:

- Du kan använda denna utmaning för att utfärda certifikat som innehåller wildcard-domännamn.
- Det fungerar bra även om du har flera webbservrar.
- Du kan använda denna utmaning för att validera domännamn vars webbservrar inte är tillgängliga på det offentliga internet.

Nackdelar:

- Att behålla API-uppgifter på din webbserver är riskabelt.
- Din DNS-leverantör kanske inte erbjuder något API.
- Ditt DNS-API kanske inte ger information om utbredningstider.
- Det kan inte användas för att validera IP-adresser.

# TLS-ALPN-01

Denna utmaning utvecklades efter att TLS-SNI-01 blev föråldrad och utvecklas nu som [en separat standard][tls-alpn]. Liksom TLS-SNI-01 utförs det via TLS på port 443. Den använder dock ett anpassat ALPN-protokoll för att säkerställa att endast servrar som känner till denna utmaningstyp svarar på valideringsförfrågningar. Detta möjliggör också valideringsförfrågningar för denna utmaningstyp att använda ett SNI-fält som matchar det domännamn som valideras, vilket gör det säkrare.

Denna utmaning är inte lämplig för de flesta. Det passar bäst för författare av TLS-terminerande omvända proxyer som vill utföra värdbaserad validering som HTTP-01, men som vill göra det helt på TLS-lagret för att kunna separera bekymmer. Just nu betyder det främst stora hostingleverantörer.

Fördelar:

- Det fungerar om port 80 inte är tillgänglig för dig.
- Det kan utföras enbart på TLS-lagret.
- Det kan också användas för att validera IP-adresser.

Nackdelar:

- ACME:s kundsupport är begränsad.
- Precis som HTTP-01, om du har flera servrar måste alla svara med samma innehåll.
- Denna metod kan inte användas för att validera wildcard-domäner.

# TLS-SNI-01

Denna utmaning definierades i utkastversioner av ACME. Den gjorde en TLS-handskakning på port 443 och skickade en specifik [SNI-][] header, där de letade efter ett certifikat som innehöll token. Det [togs bort i mars 2019][tls-sni-disablement] eftersom det inte var tillräckligt säkert.

[dns-api-providers]: https://community.letsencrypt.org/t/dns-providers-who-easily-integrate-with-lets-encrypt-dns-validation/86438
[securing-dns-credentials]: https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation
[securing-dns-credentials]: https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation
[anycast]: https://en.wikipedia.org/wiki/Anycast
[SNI-]: https://en.wikipedia.org/wiki/Server_Name_Indication
[tls-sni-disablement]: https://community.letsencrypt.org/t/march-13-2019-end-of-life-for-all-tls-sni-01-validation-support/74209
[tls-alpn]: https://tools.ietf.org/html/rfc8737
