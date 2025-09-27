---
title: Sådan fungerer det
linkTitle: Sådan virker Let's Encrypt
slug: how-it-works
lastmod: 2025-08-02
show_lastmod: 1
---

Formålet med Let's Encrypt og [ACME-protokollen](https://tools.ietf.org/html/rfc8555) er at gøre det muligt at oprette en HTTPS-server og automatisk få et browser-betroet certifikat, uden menneskelig indblanding. Dette opnås ved at køre en ACME-klient på en webserver.

For at forstå, hvordan teknologien fungerer, skal vi gå gennem processen med opsætning af `https://example.com/` med en ACME-klient.

Der er to trin i denne proces. For det første beviser ACME-klienten for [Certificate Authority](https://wikipedia.org/wiki/Certificate_authority) (CA) at webserveren styrer et domæne. Efter dette kan klienten anmode om eller tilbagekalde certifikater for dette domæne.

## Domæne Validering

Let's Encrypt ACME-klientsoftwaren ved [public key](https://wikipedia.org/wiki/Public-key_cryptography). Første gang ACME klienten interagerer med Let's Encrypt genereres et nyt nøglepar og beviser for Let's Encrypt CA at serveren styrer et eller flere domæner. Dette svarer til den traditionelle CA proces med at oprette en konto og tilføje domæner til denne konto.

For at starte processen, spørger agenten Let's Encrypt CA, hvad den skal gøre for at bevise, at det styrer `eksempel.com`. Let's Encrypt CA vil se på det domænenavn, der anmodes om, og udstede en eller flere sæt af udfordringer. Det er forskellige måder, hvorpå agenten kan bevise kontrol af domænet. For eksempel kan CA give klienten et valg af enten:

* Oprette en DNS-record under `example.com`, eller
* Oprette en HTTP ressource under en velkendt URI på `http://example.com/`

<div class="howitworks-figure">
<img alt="Anmoder om udfordringer til at validere example.com"
     src="/images/howitworks_challenge.png"/>
</div>

Klient software fuldender en af de givne sæt af udfordringer. Lad os antage, at den er i stand til at udføre den anden opgave ovenfor: der oprettes en fil på en bestemt sti på `http://example.com` webstedet. Når agenten har fuldført disse trin, underretter den CA, at den er klar til at fuldføre valideringen.

Derefter er det CA's opgave at kontrollere, at udfordringerne er blevet opfyldt fra [flere netværksperspektiver](/2020/02/19/multi-perspective-validation).

<div class="howitworks-figure">
<img alt="Anmoder om tilladelse til at agere for example.com"
     src="/images/howitworks_authorization.png"/>
</div>

Hvis udfordringen er gyldige, og klienten bekræftes, så tillades den agent, der er identificeret af den offentlige nøgle, at gøre certifikatstyring for `eksempel.c om`.

Bemærk, at denne proces ikke kan bruge HTTPS, hvilket gør den sårbar over for visse angreb. For at afbøde problemet, udfører Let's Encrypt faktisk flere valideringer parallelt fra forskellige netværksperspektiver. Dette gør det betydeligt sværere for en angriber til med held at undergrave valideringsprocessen.

## Certifikat udstedelse og tilbagekaldelse

Når agenten har et autoriseret nøglepar er anmodning, fornyelse, og tilbagekaldelse af certifikater bliver simpelt --send blot certifikat management beskeder og underskriv dem med det autoriserede nøgle par.

### Udstedelse

For at få et certifikat for domænet konstruerer agenten en PKCS#10 [Certifikatsigneringsanmodning](https://tools.ietf.org/html/rfc2986) (CSR), der beder Let'sEncrypt CA om at udstede et certifikat for `example.com` med en bestemt offentlig nøgle. Som sædvanlig indeholder CSR en underskrift fra den private nøgle, der svarer til den offentlige nøgle i CSR. Klienten underskriver også hele CSR med den autoriserede nøgle for `example.com`, så Let's Encrypt CA ved, at det er autoriseret.

Når Let's Encrypt CA modtager anmodningen, bekræfter den begge underskrifter. Hvis alt ser godt ud, udstedes et certifikat for `example.com` med den offentlige nøgle fra CSR og returnerer det til klienten. CA'en vil også indsende certifikatet til talrige offentlige Certifikat Transparency (CT) logs. Se [her](https://certificate.transparency.dev/howctworks/#pki) for flere detaljer.

<div class="howitworks-figure">
<img alt="Anmod om et certifikat til example.com"
     src="/images/howitworks_certificate.png"/>
</div>

Fornyelse af et certifikat på et senere tidspunkt betyder gentagelse af udstedelsesprocessen igen - udførelse af domænevalidering og derefter anmodning om et nyt certifikat.

### Tilbagekaldelse

Tilbagekaldelse virker på en lignende måde. Klienten underskriver en tilbagekaldelsesanmodning med nøgleparret godkendt for `example.com`, og Let's Encrypt CA bekræfter, at anmodningen er autoriseret. Hvis ja, så offentliggøres tilbagekaldelsesoplysninger via [Certificate Revocation List](https://en.wikipedia.org/wiki/Certificate_revocation_list) (CRL) så afhængige parter såsom browsere kan vide, at de ikke bør acceptere det tilbagekaldte certifikat.

<div class="howitworks-figure">
<img alt="Anmodning om tilbagekaldelse af et certifikat for example.com"
     src="/images/howitworks_revocation.png"/>
</div>
