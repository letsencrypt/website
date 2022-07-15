---
title: Tilbagekald af certifikater
slug: revoking
top_graphic: 1
date: 2017-06-08
lastmod: 2021-08-03
show_lastmod: 1
---


Når et certifikats tilhørende private nøgle ikke længere er sikker, bør du tilbagekalde certifikatet. Dette kan ske for nogle få forskellige årsager. For eksempel, kan du ved et uheld dele den private nøgle på en offentlig hjemmeside; hackere kan kopiere den private nøgle fra dine servere; eller hackere kan tage midlertidig kontrol over dine servere eller din DNS-konfiguration, og brug den til validere og udstede et certifikat, som de har den private nøgle til.

Når du tilbagekalder et Let's Encrypt certifikat, vil Let's Encrypt vil offentliggøre denne tilbagekaldelse information via [Online Certificate Status Protocol (OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol), og nogle browsere vil tjekke OCSP, for at se, om de skal have tillid til et certifikat. Bemærk, at OCSP [har nogle grundlæggende problemer](https://www.imperialviolet.org/2011/03/18/revocation.html), så ikke alle browsere udfører denne kontrol. Alligevel er tilbagekaldelse af certifikater, der tilhører kompromitterede private nøgler en vigtig praksis og er påkrævet af Let's Encrypts [Abonnentaftale](/repository).

For at tilbagekalde et certifikat via Let's Encrypt, skal du bruge [ACME API](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md), sandsynligvis gennem en ACME-klient som [Certbot](https://certbot.eff.org/). Du bliver nødt til at bevise overfor Let's Encrypt, at du er autoriseret til at tilbagekalde certifikatet. Der er tre måder at gøre dette:

# Fra den konto, der har udstedt certifikatet

Hvis du oprindeligt udstedte certifikatet, og du stadig har kontrol over den konto, du plejede at udstede det, du kan tilbagekalde det ved hjælp af dine kontooplysninger. Certbot vil som standard forsøge dette. Eksempel:

```bash
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem --reason keycompromise
```

# Ved brug af certifikatets private nøgle

Hvis du ikke oprindeligt udstedte certifikatet, men du har en kopi af den tilsvarende private nøgle, du kan tilbagekalde ved at bruge den private nøgle til at underskrive tilbagekaldelsesanmodningen. For eksempel, hvis du ser, at en privat nøgle ved et uheld er blevet offenliggjort, kan du bruge denne metode til at tilbagekalde certifikater, der brugte den private-nøgle også selvom du ikke er den person, der oprindeligt udstedte disse certifikater.

For at bruge denne metode skal du først downloade certifikatet der skal tilbagekaldes. Let's Encrypt logger alle certifikater til [Certifikat Transparency](https://www.certificate-transparency.org/) logs, så du kan finde og downloade certifikater fra en log monitor som [crt. H](https://crt.sh/).

Du skal også bruge en kopi af den private nøgle i PEM-format. Når du har disse, kan du tilbagekalde certifikatet således:

```bash
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/key.pem --reason keycompromise
```

# Bruger en anden autoriseret konto

Hvis nogen udstedte et certifikat efter at have kompromitteret din vært eller dit DNS, vil du tilbagekalde certifikatet, når du genvundet kontrollen. For at tilbagekalde certifikatet vil Let's Encrypt sikre, at du kontrollerer domænenavnene i dette certifikat (ellers kan folk tilbagekalde hinandens certifikater uden tilladelse)! For at validere denne kontrol, Lad os kryptere bruger de samme metoder, som den bruger til at validere kontrollen til udstedelse: du kan sætte en [værdi i en DNS TXT -post](https://tools.ietf.org/html/rfc8555#section-8.4) eller sætte en [fil på en HTTP-server](https://tools.ietf.org/html/rfc8555#section-8.3). Generelt vil en ACME-klient håndtere disse for dig. Bemærk, at de fleste ACME-klienter kombinerer validering og udstedelse, så den eneste måde at bede om valideringer på er at forsøge udstedelse. Du kan derefter tilbagekalde det resulterende certifikat, hvis du ikke ønsker det, eller blot ødelægge den private nøgle. Hvis du vil undgå at udstede et certifikat overhovedet, kan du inkludere et ikke-eksisterende domænenavn i din kommandolinje, som vil få udstedelsen til at mislykkes, mens de stadig validerer de andre, eksisterende domænenavne. For at gøre dette, kør:

```bash
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

Og følg instruktionerne. Hvis du foretrækker at validere brugen af HTTP i stedet for DNS, skal du erstatte `--preferred-challenges` flaget med `--preferred-challenges=http`.

Når du har valideret kontrollen over alle domænenavne i det certifikat, du vil tilbagekalde, du kan downloade certifikatet fra [crt. h](https://crt.sh/), derefter fortsætte med at tilbagekalde certifikatet, som om du havde udstedt det:

```bash
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem --reason keycompromise
```
