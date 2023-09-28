---
title: Sertifikati za localhost
slug: certificates-for-localhost
top_graphic: 1
date: 2017-12-21
lastmod: 2017-12-21
show_lastmod: 1
---


U nekim slučajevima ljudi žele da dobiju sertifikat za svoje lokalno okruženje "localhost", najčešće za korišćenje tokom razvoja aplikacije na svojim lokalnim mašinama ili za distribuciju svojih "native" aplikacija koje moraju da komuniciraju sa nekim web servisom. Let's Encrypt ne može pružiti sertifikate za "localhost" iz razloga zato što niko jedinstven ne pruža pravo nad njegovim vlasništvom i zato što nije ukorenjen kao top level domen kao što je to slučaj sa npr ".com" ili ".net". Moguće je konfigurisati vaš domen lokalno da usmerava ka `127.0.0.1`, a zatim da za isti dobijete sertifikat koristeći DNS challenge sa vašeg lokalnog okruženja. Kako god, ovo je generalno loša ideja i na raspolaganju su bolje opcije.

# Za lokalna razvojna okruženja

Ukoliko razvijate web aplikaciju, korisno je pokretati je na lokalnom web serveru kao što je Apache ili Nginx i pristupati joj putem `http://localhost:8000/` u vašem web pregledaču. Svakako, web pregledači ponašaju se različito prema HTTP i HTTPS stranicama. Glavna razlika je ta da na HTTPS stranicama, svaki zahtev za učitavanjem JavaScript-a sa HTTP URL-a će u većini slučajeva biti blokiran. S toga, ukoliko razvijate lokalno koristeći HTTP vi tada možete dodati script tag koji će funkcionisati dobro na vašoj lokalnoj razvojnoj mašini, ali neće funkcionisati kada vašu aplikaciju postavite na HTTPS produkcioni sajt. Kako bi rešili ovaj problem izuzetno je korisno konfigurisati HTTPS na vašem lokalnom web serveru. Međutim, vi verovatno ne želete da viđate upozorenja o sertifikatu svo vreme. Kako zapravo dostići "zeleni" status sertifikata u vašem web pregledaču na vašem lokalnom okruženju?

Najbolja opcija: Generišite vaš lični sertifikat, bilo da je self-signed ili potpisan od strane lokalnog root-a, zatim mu dodelite trust na vašem operativnom sistemu. Nakon toga koristite taj isti sertifikat kako bi ste konfigurisali vaš lokalni web server. Pročitajte ispod za više detalja.

# Za native aplikacije koje komuniciraju sa web aplikacijama/servisima

Često programeri žele da ponude aplikaciju koja će moći da se preuzme i instalira na računarima korisnika a koja će se koristiti kao dodatak nekom web sajtu/servisu kako bih pružila neke dodatne mogućnosti. Na primer, Dropbox i Spotify dekstop aplikacije skeniraju fajlove kroz celu vašu mašinu, što svakako nije moguće u slučaju standardne web aplikacije. Jedan učestali pristup za ove "native" aplikacije jeste da ponude web servis na localhost-u a zatim delegirati da se svi zahtevi prave putem tog web servisa putem XMLHTTPRequest (XHR) ili putem WebSocket-a. Web aplikacije uglavnom uvek koriste HTTPS, što zapravo znači da web pregledači praktično odbijaju sve XHR ili WebSocket zahteve od strane ne zaštićenih URL-ova. Ova pojava nazvana je Mixed Content Blocking. Kako bi ste komunicirali sa web aplikacijom, native aplikacija mora da omogući osiguran web servis.

Srećom, moderni web pregledači  [uzimaju u obzir](https://bugs.chromium.org/p/chromium/issues/detail?id=607878) `http://127.0.0.1:8000/` kao da je ["potencijalno nepoverljivi"](https://www.w3.org/TR/secure-contexts/#is-origin-trustworthy) URL zato što se odnosi na povratnu (loopback) adresu. Saobraćaj poslat na `127.0.0.1` je garantovan da neće napustiti vašu mašinu, tako da je s obzirom na to automatski bezbedan od uticaja mrežnog presretanja paketa. To zapravo znači da ukoliko vaša web aplikacija je na HTTPS, a vi podesite vaš web servis unutar native aplikacije na `127.0.0.1`, oboje će nakon toga moći neometano da komuniciraju putem XHR. Sa druge strane, na žalost, [localhost ne uživa isti tretman](https://tools.ietf.org/html/draft-ietf-dnsop-let-localhost-be-localhost-02). Takođe, ni WebSocket-i ne uživaju isti tretman iz istog razloga.

Možda ćete biti u iskušenju da zaobiđete ove limitacije tako što ćete konfigurisati domen u globalni DNS što će nakon toga dovesti do toga da zahtev bude rešen kroz `127.0.0.1` (na primer, `localhost.example.com`), zatražiti sertifikat za taj domen, ugraditi dobijeni sertifikat za taj domen unutar vaše native aplikacije i konfigurisati vašu web aplikaciju da komunicira sa `https://localhost.example.com:8000/` umesto `http://127.0.0.1:8000/`. *Nemojte raditi ovo.*Ovaj način stavlja korisnike vaše aplikacije u svojevrsni rizik, a takođe dovodite mogućnost da vaš sertifikat bude otkazan.

Koristeći domen umesto IP adrese stvarate mogućnost potencijalnim napadačima za "Man in the Middle"  (MitM) upit u DNS i ugnježdavanje odgovora koji usmerava ka drugoj IP adresi. Napdač, u tom slučaju se može pretvarati da je lokalna aplikacija i da šalje lažne odgovore nazad u web aplikaciju, što može potencijalno dovesti do kompromizacije vašeg naloga sa strane web aplikacije, ili negde drugde u zavisnosti od toga kako je ista i dizajnirana.

Uspešni MitM u ovoj situaciji je moguć iz razloga zato što da bi ova solucija radila potrebno je da unutar vaše native aplikacije zapakujete i privatni ključ vašeg sertifikata. To znači da svako ko preuzme vašu native aplikaciju dobija i kopiju privatnog ključa, uključujući i potencijalnog napadača. Ovo je okarakterisano kao kompromizacija vašeg privatnog ključa, i vaše sertifikaciono telo (CA) je primorano da otkaže vaš sertifikat ukoliko budu došli do saznanja da je isti kompromitovan. [Mnoge native aplikacije](https://groups.google.com/d/msg/mozilla.dev.security.policy/eV89JXcsBC0/wsj5zpbbAQAJ) su [imale svoje sertifikate](https://groups.google.com/d/msg/mozilla.dev.security.policy/T6emeoE-lCU/-k-A2dEdAQAJ) povučene zbog [toga što su privatni ključ pakovali zajedno sa aplikacijom](https://groups.google.com/d/msg/mozilla.dev.security.policy/pk039T_wPrI/tGnFDFTnCQAJ).

Nažalost, ovo ostavlja native aplikacije bez mnogo dobrih sigurnosnih alternativa da sigurno komuniciraju sa njihovim korespodentnim web sajtovima/servisima. Takođe, situacija se može još više zakomplikovati u budućnosti ukoliko web pregledači ubuduće  [skrate pristup localhost-u sa web-a](https://bugs.chromium.org/p/chromium/issues/detail?id=378566).

Takođe, primite k znanju da je eksportovanje web servisa koji pruža privilegovane native API-ove jako rizično iz razloga zato što web sajtovi za koje niste imali nameru da autorizujete i dalje mogu da im pristupaju. Ukoliko želite da se više informišete na ovu temu, definitivno pročitajte [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), koristite Access-Control-Allow-Origin, i budite sigurni da uvek koristite memory-safe HTTP parser, iz razloga zato što origin koji vi ne autorizujete i dalje može slati takozvane "preflight" zahteve što će potencijalno moći da predstavlja sigurnosni problem u vašem parseru.

# Pravljenje i autorizovanje vaših ličnih sertifikata

Svako može da napravi svoje lične sertifikate bez ikakve pomoći od strane sertifikacionog tela (CA). Jedina razlika je da sertifikati koje napravite sami, neće biti autorizovani od strane nikoga drugog osim vas. Za lokalna razvojna okruženja, to je sasvim u redu.

Najjednostavniji način da generišete privatni ključ i self-signed sertifikat za potrebe localhost-a jeste putem openssl komande:

    openssl req -x509 -out localhost.crt -keyout localhost.key \
      -newkey rsa:2048 -nodes -sha256 \
      -subj '/CN=localhost' -extensions EXT -config <( \
       printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

Nakon toga možete konfigurisati vaš web server sa localhost.crt i localhost.key, zatim instalirati localhost.crt u listu lokalno poverljivih sertifikata.

Ukoliko želite više realnosti u vašem lokalnom razvojnom okruženju vezanog za sertifikate, možete koristiti [minica](https://github.com/jsha/minica) kako bi ste generisali vaš lokalni sertifikat, i izdali krajnji entitet (aka leaf) sertifikate potpisane njime. Nakon toga vi bi ste uvezli root sertifikat pre nego samo potpisani sertfikat.

Takođe, možete odabrati da koristite domen sa tačkama unutar istog, kao što je `www.localhost`, tako što ćete ga dodati u vaš /etc/hosts kao alias za `127.0.0.1`. Ovaj način suptilno menja kako web pregledači tretiraju skladištenje kolačića.
