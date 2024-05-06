---
title: Certifikater til localhost
slug: certificates-for-localhost
date: 2017-12-21
lastmod: 2017-12-21
show_lastmod: 1
---


Nogle gange ønsker folk at få et certifikat for værtsnavnet "localhost", enten til brug i lokal udvikling, eller til distribution med en lokal applikation, som har brug for at kommunikere med en webapplikation. Lad os kryptere kan ikke levere certifikater til "localhost", fordi ingen entydigt ejer det, og det har ikke rod i et top level domæne som ".com" eller ".net". Det er muligt at opsætte dit eget domænenavn, der tilfældigvis peger på `127.. 0.1`, og få et certifikat til det ved hjælp af DNS-udfordringen. Dette er dog generelt en dårlig idé, og der findes bedre alternativer.

# Til lokaludvikling

Hvis du udvikler en webapp, er det nyttigt at køre en lokal webserver som Apache eller Nginx og få adgang til det via `http://localhost: 8000/` i din webbrowser. Men, webbrowsere opfører sig på subtilt forskellige måder på HTTP vs HTTPS sider. Den væsentligste forskel: På en HTTPS-side, vil alle anmodninger om at indlæse JavaScript fra en HTTP URL blive blokeret. Så hvis du udvikler lokalt ved hjælp af HTTP, kan du tilføje et script tag, der fungerer fint på din udviklingsmaskine, men pauser når du implementerer til dit HTTPS-produktionswebsted. For at fange denne form for problem, er det nyttigt at konfigurere HTTPS på din lokale webserver. Du ønsker imidlertid ikke at se certifikatadvarsler hele tiden. Hvordan får du den grønne lås lokalt?

Den bedste mulighed: Generer dit eget certifikat, enten selvsigneret eller signeret af en lokal root, og stol på det i dit operativsystems trust store. Brug derefter dette certifikat på din lokale webserver. Se nedenfor for yderligere oplysninger.

# Til programmer, der kalder web-apps

Nogle gange ønsker udviklere at tilbyde et program til download, der kan bruges sammen med en hjemmeside til at tilbyde ekstra funktioner. For eksempel, Dropbox og Spotify desktop apps scanne efter filer fra hele din maskine, hvilket en webapp ikke vil have lov til at gøre. En fælles tilgang er, at disse programmer til at tilbyde en webservice på localhost, og få web app til at fremsætte kald til det via XMLHTTPRequest (XHR) eller WebSockets. Web-app'en bruger næsten altid HTTPS, hvilket betyder, at browsere vil forbyde det at gøre XHR eller WebSockets anmodninger til ikke-sikre URL'er. Dette kaldes Blandet Indhold Blokering (Mixed Content Blocking). For at kommunikere med web-appen, skal programmet levere en sikker webtjeneste.

Heldigvis antager [moderne browsere][mcb-localhost] `http://127.0.0.:8000/` for at være en ["potentielt tillidsværdig"][secure-contexts] URL fordi den henviser til en loopback adresse. Trafik sendt til `127.0.0.1` er garanteret ikke at forlade din maskine, og betragtes derfor automatisk sikker mod netværksaflytning. Det betyder, hvis din web-app er HTTPS, og du tilbyder en indfødt app webservice på `127.. 0.1`, de to kan med glæde kommunikere via XHR. Desværre behandles [localhost endnu ikke på samme vis][let-localhost]. Ligeledes får WebSockets ikke denne behandling for nogle af navnene.

Du kan blive fristet til at arbejde omkring disse begrænsninger ved at oprette et domænenavn i det globale DNS, der tilfældigvis løser `127.0.0.1` (f.eks. `localhost.example om`), få et certifikat for det domænenavn, forsendelse af certifikatet og tilsvarende privat nøgle med din oprindelige app, og fortæller din web-app til at kommunikere med `https://localhost. xample.com:8000/` i stedet for ` http://127.0.0.1:8000/`. *Gør ikke dette.* Det vil bringe dine brugere i fare, og dit certifikat kan blive tilbagekaldt.

Ved at indføre et domænenavn i stedet for en IP-adresse du gør det muligt for en angriber at udføre "Man in the Middle" (MitM) DNS-opslag og injicere et svar, som peger på en anden IP-adresse. Angriberen kan derefter foregive at være den lokale app og sende falske svar tilbage til web-appen, hvilket kan kompromittere din -konto på webappsiden, afhængigt af hvordan den er designet.

Den vellykkede MitM i denne situation er mulig, fordi for at få det til at virke, du var nødt til at sende den private nøgle til dit certifikat med din oprindelige app. Det betyder, at enhver, der downloader din native app får en kopi af den private nøgle, herunder angriberen. Dette betragtes som et kompromitering af din private nøgle, og din certifikatmyndighed (CA) er forpligtet til at tilbagekalde dit certifikat, hvis de bliver opmærksomme på det. [Mange "native apps"][mdsp1] har [haft deres certifikater][mdsp2] tilbagekaldt for [at dele deres private nøgle][mdsp3].

Desværre, dette efterlader "native apps" uden en masse gode, sikre muligheder for at kommunikere med deres tilsvarende hjemmeside. Og situationen kan blive vanskeligere i fremtiden, hvis browsere yderligere [stramme adgangen til localhost fra web][tighten-access].

Bemærk også, at eksport af en webtjeneste, der tilbyder privilegerede "nativeAPI'er" er i sig selv risikabelt, fordi websteder, som du ikke har til hensigt at godkende, kan tilgå dem. Hvis du går denne rute, skal du sørge for at læse op på [Cross-Origin Resource Sharing][cors], anvend Access-Control-Allow-Origin, og sørg for at bruge en hukommelsessikker HTTP parser, fordi selv oprindelser du ikke tillader adgang til kan sende anmodninger om forhåndstilladelse, som kan udnytte fejl i din parser.

# Lav og stol på dine egne certifikater

Enhver kan lave deres egne certifikater uden bistand fra en CA. Den eneste forskel er, at certifikater, som du selv laver, vil ikke blive stolet på af nogen andre. For lokale udviklingsmiljøer er dette fint.

Den simpleste måde at generere en privat nøgle og et selv-signeret certifikat for localhost er med følgende openssl kommando:

    openssl req -x509 -out localhost.crt -keyout localhost.key \
      -newkey rsa:2048 -nodes -sha256 \
      -subj '/CN=localhost' -extensions EXT -config <( \
       printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

Du kan så konfigurere din lokale web server med localhost.crt og localhost.key, og så installere localhost.crt i din liste af lokalt betroede "roots".

Hvis du ønsker lidt mere realisme i din udviklingscertifikater, så kan du anvende [minica][minica] til at generere din egen lokale root certifikat og udsteede slut-bruger (kendt som leaf) certifikater, der er signet af denne. Du vil da skulle importere root certifikatet i stedet for det selv-signerede slut certifikat.

Kan kan også vælge at anvende et domæne med punktum i det, såsom `www.localhost`, ved at tilføje det til /etc/hosts som et alias til `127.0.0.1`. Dette ændrer subtilt hvordan browsere håndterer lagring af cookies.

[mcb-localhost]: https://bugs.chromium.org/p/chromium/issues/detail?id=607878
[secure-contexts]: https://www.w3.org/TR/secure-contexts/#is-origin-trustworthy
[let-localhost]: https://tools.ietf.org/html/draft-ietf-dnsop-let-localhost-be-localhost-02
[mdsp1]: https://groups.google.com/d/msg/mozilla.dev.security.policy/eV89JXcsBC0/wsj5zpbbAQAJ
[mdsp2]: https://groups.google.com/d/msg/mozilla.dev.security.policy/T6emeoE-lCU/-k-A2dEdAQAJ
[mdsp3]: https://groups.google.com/d/msg/mozilla.dev.security.policy/pk039T_wPrI/tGnFDFTnCQAJ
[tighten-access]: https://bugs.chromium.org/p/chromium/issues/detail?id=378566
[minica]: https://github.com/jsha/minica
[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
