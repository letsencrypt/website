---
title: Tilbagekaldelse af certifikater
slug: revoking
top_graphic: 1
date: 2017-06-08
lastmod: 2021-10-15
show_lastmod: 1
---


Når et certifikat ikke længere er sikkert at bruge, bør du tilbagekalde det. Dette kan ske for et par forskellige årsager. Du har, som eksempel, ved et uheld have fået delt den private nøgle på et offenligt website; hackere kan have kopieret den private nøgle fra dine servere; eller hackere har måske midlertidigt fået kontrol over dine servere eller DNS opsætning, og brugt det til at validere og udsteede et certifikat til hvilket de har den private nøgle.

Når du tilbagekalder et Let's Encrypt certifikat, vil Let's Encrypt vil offentliggøre denne tilbagekaldelseinformation via [Online Certificate Status Protocol(OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol), og nogle browsere vil tjekke OCSP, for at se, om de bør have tillid til et certifikat. Bemærk, at OCSP [har nogle grundlæggende problemer](https://www.imperialviolet.org/2011/03/18/revocation.html), så ikke alle browsere udfører denne kontrol. Alligevel er tilbagekaldelse af certifikater, der tilhører kompromitterede private nøgler en vigtig praksis og er påkrævet af Let's Encrypts [Abonnentaftale](/repository).

For at tilbagekalde et certifikat via Let's Encrypt, skal du bruge [ACME API](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md), sandsynligvis gennem en ACME-klient som [Certbot](https://certbot.eff.org/). Du bliver nødt til at bevise overfor Let's Encrypt, at du er autoriseret til at tilbagekalde certifikatet. Der er tre måder at gøre dette: fra den konto, der udstedte certifikatet, ved hjælp af en anden autoriseret konto, eller ved hjælp af certifikatets private nøgle.

# Angivelse af en årsagskode

Når du tilbagekalder et certifikat, skal vi kryptere abonnenter vælge en årsagskode på følgende måde:

* Ingen grund angivet eller `uspecificeret` (RFC 5280 CRLReason #0)
  - Hvis nedenstående årsagskoder ikke gælder for tilbagekaldelsesanmodningen, må abonnenten ikke angive en anden årsagskodekode end "uspecificeret".
* `keyCompromise` (RFC 5280 CRLReason #1)
  - Certifikatabonnenten skal vælge "keyCompromise" tilbagekaldelsesårsagen, når de har grund til at tro, at den private nøgle i deres certifikat er blevet kompromitteret, f.eks. en uautoriseret person har haft adgang til den private nøgle til deres certifikat.
  - Hvis tilbagekaldelsesanmodningen er underskrevet ved hjælp af certifikatets private nøgle, i stedet for en privatnøgle til abonnentkonto, så kan Let's Encrypt vælge at ignorere tilbagekaldelsesårsagen i forespørgslen og angive årsagen til "keyCompromise".
* `superseded` (RFC 5280 CRLReason #4)
  - Certifikatabonnenten bør vælge den "superseeded" (erstatttet) tilbagekaldelsesårsag, når de anmoder om et nyt certifikat til erstatning for deres eksisterende certifikat.
* `cessationOfOperation` (RFC 5280 CRLReason #5)
  - Certifikatabonnenten bør vælge "cessationOfOperation" (ophørsbegrænsning) tilbagekaldelsesårsagen, når de ikke længere ejer alle domænenavne i certifikatet, eller når de ikke længere vil bruge certifikatet, fordi de ophører deres websted.
  - Hvis tilbagekaldelsesanmodningen er fra en abonnentkonto, som ikke bestilte det pågældende certifikat, men har påvist kontrol med alle identifikatorer i certifikatet Let's Encrypt kan ignorere tilbagekaldelsesårsagen i forespørgslen og angive årsagen til "cessationOfOperation" (ophørshandling).

Tilbagekaldelsesanmodninger, der angiver en anden årsagskode, end de ovenfor beskrevne vil blive afvist.

# Fra den konto, der har udstedt certifikatet

Hvis du oprindeligt udstedte certifikatet, og du stadig har kontrol over den konto, du plejede at udstede det, du kan tilbagekalde det ved hjælp af dine kontooplysninger. Certbot vil forsøge dette som standard. Eksempel:

```bash
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem
```

# Bruger en anden autoriseret konto

Hvis nogen udstedte et certifikat efter at have kompromitteret din vært eller dit DNS, vil du kunne tilbagekalde certifikatet, når du genvundet kontrollen. For at tilbagekalde certifikatet vil Let's Encrypt sikre, at du kontrollerer domænenavnene i dette certifikat (ellers kan folk tilbagekalde hinandens certifikater uden tilladelse)!

For at validere denne kontrol, bruger Let's Encrypt de samme metoder, som den bruger til at validere kontrollen til udstedelse: du kan sætte en [værdi i en DNS TXT-post](https://tools.ietf.org/html/rfc8555#section-8.4) eller sætte en [fil på en HTTP-server](https://tools.ietf.org/html/rfc8555#section-8.3). Generelt vil en ACME-klient håndtere dette for dig. Bemærk, at de fleste ACME-klienter kombinerer validering og udstedelse, så den eneste måde at bede om valideringer på er at forsøge udstedelse. Du kan derefter tilbagekalde det resulterende certifikat, hvis du ikke ønsker det, eller blot ødelægge den private nøgle.

Hvis du vil undgå at udstede et certifikat overhovedet, kan du inkludere et ikke-eksisterende domænenavn i din kommandolinje, som vil få udstedelsen til at mislykkes, mens de stadig validerer de andre, eksisterende domænenavne. Eksempel:

```bash
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

Og følg instruktionerne. Hvis du foretrækker at validere brugen af HTTP i stedet for DNS, skal du erstatte `--preferred-challenges` flaget med `--preferred-challenges=http`.

Når du har valideret kontrollen over alle domænenavne i det certifikat, du vil tilbagekalde, du kan downloade certifikatet fra [crt. h](https://crt.sh/), derefter fortsætte med at tilbagekalde certifikatet, som om du havde udstedt det:

```bash
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem
```

# Ved brug af certifikatets private nøgle

Hvis du ikke oprindeligt udstedte certifikatet, men du har en kopi af den tilsvarende private nøgle, du kan tilbagekalde ved at bruge den private nøgle til at underskrive tilbagekaldelsesanmodningen. For eksempel, hvis du ser, at en privat nøgle ved et uheld er blevet offenliggjort, kan du bruge denne metode til at tilbagekalde certifikater, der brugte den private-nøgle også selvom du ikke er den person, der oprindeligt udstedte disse certifikater.

For at bruge denne metode skal du først have en kopi af den private nøgle i PEM-format.

Derefter, hvis du ikke allerede har det, download certifikatet, der skal tilbagekaldes. Let's Encrypt logger alle certifikater til [Certifikat Transparency](https://www.certificate-transparency.org/) logs, så du kan finde og downloade certifikater fra en log monitor som [crt.sh](https://crt.sh/). Søgning efter et matchende `SubjectPublicKeyInfo` (SPKI) felt vil finde alle certifikater, der bruger den private nøgle. For at udtrække SPKI hash fra en privat nøgle:
```bash
openssl pkey -outform DER -in /PATH/TO/privkey.pem -pubout | openssl sha256
```

Når du har den private nøgle og certifikat, kan du tilbagekalde certifikatet således:

```bash
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/privkey.pem --reason keyCompromise
```
