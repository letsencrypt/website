---
title: Certifikat för localhost
slug: certificates-for-localhost
lastmod: 2025-07-31
show_lastmod: 1
---

Ibland vill folk skaffa ett certifikat för värdnamnet "localhost", antingen för att använda i lokal utveckling, eller för distribution med en native-applikation som behöver kommunicera med en webbapplikation. Let's Encrypt kan inte tillhandahålla certifikat för "localhost" eftersom ingen äger det unikt, och det är inte rotat i en toppdomän som ".com" eller ".net". Det är möjligt att sätta upp ditt eget domännamn som råkar peka på `127.0.0.1`, och få ett certifikat för det med hjälp av DNS-utmaningen. Detta är dock generellt en dålig idé och det finns bättre alternativ.

# För lokal utveckling

Om du utvecklar en webbapp är det användbart att köra en lokal webbserver som Apache eller Nginx, och komma åt den via `http://localhost:8000/` i din webbläsare. Webbläsare uppför sig dock på subtilt olika sätt på HTTP- respektive HTTPS-sidor. Huvudskillnaden: På en HTTPS-sida kommer alla förfrågningar att ladda JavaScript från en HTTP-URL att blockeras. Så om du utvecklar lokalt med HTTP kan du lägga till en script-tagg som fungerar bra på din utvecklingsmaskin, men som kraschar när du distribuerar till din HTTPS-produktionssida. För att upptäcka den här typen av problem är det användbart att sätta upp HTTPS på din lokala webbserver. Du vill dock inte se certifikatsvarningar hela tiden. Hur får man den gröna låsningen lokalt?

Det bästa alternativet: Generera ditt eget certifikat, antingen självsignerat eller signerat av en lokal root, och lita på det i ditt operativsystems betrodda lagringsutrymme. Använd sedan det certifikatet i din lokala webbserver. Se nedan för detaljer.

# För native-appar som kommunicerar med webbappar

Ibland vill utvecklare erbjuda en nedladdningsbar native-app som kan användas tillsammans med en webbplats för att erbjuda extra funktioner. Till exempel skannar Dropbox- och Spotify-skrivbordsappar efter filer på hela din maskin, vilket en webbapp inte skulle få göra. Ett vanligt tillvägagångssätt är att dessa native-appar erbjuder en webbtjänst på localhost, och att webbappen gör förfrågningar till den via XMLHttpRequest (XHR) eller WebSockets. Webbappen använder nästan alltid HTTPS, vilket innebär att webbläsare förbjuder den från att göra XHR- eller WebSockets-förfrågningar till icke-säkra URL:er. Detta kallas för Mixed Content-blockering. För att kommunicera med webbappen behöver den inhemska appen tillhandahålla en säker webbtjänst.

Lyckligtvis betraktar moderna webbläsare [][mcb-localhost] `http://127.0.0.1:8000/` som en ["potentiellt pålitlig"][secure-contexts] URL eftersom det hänvisar till en loopback-adress. Trafik som skickas till `127.0.0.1` garanteras att inte lämna din maskin och anses därför automatiskt vara säker mot nätverksavlyssning. Det betyder att om din webbapp är HTTPS och du erbjuder en inhemsk app-tjänst på `127.0.0.1`, kan de två kommunicera utan problem via XHR. Tyvärr får [localhost ännu inte samma behandling][let-localhost]. Dessutom får inte WebSockets denna behandling för något av namnen.

Du kanske frestas att kringgå dessa begränsningar genom att sätta upp ett domännamn i den globala DNS som råkar peka på `127.0.0.1` (till exempel `localhost.example.com`), skaffa ett certifikat för det domännamnet, leverera det certifikatet och motsvarande privata nyckel med din inhemska app och berätta för din webbapp att kommunicera med `https://localhost.example.com:8000/` istället för `http://127.0.0.1:8000/`. *Gör inte detta.* Det utsätter dina användare för risk och ditt certifikat kan bli återkallat.

Genom att införa ett domännamn istället för en IP-adress gör du det möjligt för en angripare att utföra en Man in the Middle (MitM)-attack på DNS-uppslaget och injicera ett svar som pekar på en annan IP-adress. Angriparen kan sedan låtsas vara den lokala appen och skicka falska svar tillbaka till webbappen, vilket kan kompromettera ditt konto på webbapp-sidan beroende på hur den är designad.

En lyckad MitM i denna situation är möjlig eftersom du för att få det att fungera var tvungen att leverera den privata nyckeln till ditt certifikat med din inhemska app. Det betyder att alla som laddar ner din inhemska app får en kopia av den privata nyckeln, inklusive angriparen. Detta anses vara ett intrång på din privata nyckel, och din certifikatutfärdare (CA) är skyldig att återkalla ditt certifikat om de blir medvetna om det. [Många inhemska appar][mdsp1] har [fått sina certifikat][mdsp2] återkallade för [att de levererade sina privata nycklar][mdsp3].

Tyvärr lämnar detta inhemska appar utan många bra, säkra alternativ för att kommunicera med deras motsvarande webbplats. Och situationen kan bli knepigare i framtiden om webbläsare ytterligare [skärpa åtkomsten till localhost från webben][tighten-access].

Observera också att det är riskabelt att exportera en webbtjänst som erbjuder privilegierade inbyggda API:er, eftersom webbplatser som du inte tänkte godkänna kan få tillgång till dem. Om du väljer denna väg, se till att läsa på om [Cross-Origin Resource Sharing][cors], använd Access-Control-Allow-Origin och använd en minnessäker HTTP-parser, eftersom även ursprung du inte tillåter åtkomst till kan skicka förhandsförfrågningar, vilket kan utnyttja buggar i din parser.

# Att skapa och lita på dina egna certifikat

Vem som helst kan skapa sina egna certifikat utan hjälp från en CA. Den enda skillnaden är att certifikat du själv gör inte kommer att litas på av någon annan. För lokal utveckling går det bra.

Det enklaste sättet att generera en privat nyckel och självsignerat certifikat för localhost är med detta openssl-kommando:

    openssl req -x509 -out localhost.crt -keyout localhost.key \
      -newkey rsa:2048 -nodes -sha256 \
      -subj '/CN=localhost' -extensions EXT -config <( \
       printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

Du kan sedan konfigurera din lokala webbserver med localhost.crt och localhost.key och installera localhost.crt i din lista över lokalt betrodda roots.

Om du vill ha lite mer realism i dina utvecklingscertifikat kan du använda [mkcert-][mkcert] för att generera ditt eget lokala rotcertifikat och utfärda endentity-certifikat (även kallat leaf) som är signerade av det. Du skulle då importera rotcertifikatet istället för ett självsignerat slutenhetscertifikat.

Du kan också välja att använda en domän med dots i, som `www.localhost` , genom att lägga till den i /etc/hosts som alias för att `127.0.0.1` . Detta förändrar subtilt hur webbläsare hanterar cookielagring.

[mcb-localhost]: https://bugs.chromium.org/p/chromium/issues/detail?id=607878

[mcb-localhost]: https://bugs.chromium.org/p/chromium/issues/detail?id=607878
[secure-contexts]: https://www.w3.org/TR/secure-contexts/#is-origin-trustworthy
[let-localhost]: https://tools.ietf.org/html/draft-ietf-dnsop-let-localhost-be-localhost-02
[mdsp1]: https://groups.google.com/d/msg/mozilla.dev.security.policy/eV89JXcsBC0/wsj5zpbbAQAJ
[mdsp2]: https://groups.google.com/d/msg/mozilla.dev.security.policy/T6emeoE-lCU/-k-A2dEdAQAJ
[mdsp3]: https://groups.google.com/d/msg/mozilla.dev.security.policy/pk039T_wPrI/tGnFDFTnCQAJ
[tighten-access]: https://bugs.chromium.org/p/chromium/issues/detail?id=378566
[mkcert]: https://github.com/FiloSottile/mkcert
[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
