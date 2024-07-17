---
title: Sådan fungerer det
linkTitle: Sådan virker Let's Encrypt
slug: how-it-works
lastmod: 2024-06-26
show_lastmod: 1
---


Formålet med Let's&nbsp;Encrypt og [ACME-protokollen](https://tools.ietf.org/html/rfc8555) er at gøre det muligt at oprette en HTTPS-server og automatisk få et browser-betroet certifikat, uden menneskelig indblanding.  Dette opnås ved at køre et certifikat management agent på webserveren.

For at forstå, hvordan teknologien virker, lad os gå gennem processen med at oprette `https://eksempel. om/` med et certifikat management agent, der understøtter Let's&nbsp;Encrypt.

Der er to trin i denne proces.  For det første viser agenten til CA at webserveren kontrollerer et domæne.  Derefter kan agenten anmode om, forny og tilbagekalde certifikater for dette domæne.

## Domæne Validering

Let's&nbsp;Encrypt identificerer serveradministratoren ved offentlig nøgle.  Første gang agent softwaren interagerer med Let's&nbsp;Encrypt genereres et nyt nøglepar og beviser for Let's&nbsp;Encrypt CA at serveren styrer et eller flere domæner.  Dette svarer til den traditionelle CA proces med at oprette en konto og tilføje domæner til denne konto.

For at starte processen, spørger agenten Let's Encrypt CA, hvad den skal gøre for at bevise, at det styrer `eksempel. om`.  Let's Encrypt CA vil se på det domænenavn, der anmodes om, og udstede en eller flere sæt af udfordringer.   Det er forskellige måder, hvorpå agenten kan bevise kontrol af domænet.  For eksempel kan CA give agenten et valg af enten:

* Oprette en DNS-record under `example.com`, eller
* Oprette en HTTP ressource under en velkendt URI på `http://example.com/`

Sammen med udfordringerne Let's Encrypt CA giver også en nonce at agenten skal underskrive med sin private nøgle par for at bevise, at det styrer nøglen parret.

<div class="howitworks-figure">
<img alt="Anmoder om udfordringer til at validere example.com"
     src="/images/howitworks_challenge.png"/>
</div>

Agent software fuldender en af de leverede sæt af udfordringer.   Lad os antage, at den er i stand til at udføre den anden opgave ovenfor: der oprettes en fil på en bestemt sti på `http://example.com` webstedet.  Agenten underskriver også den medfølgende nonce med sin private nøgle.  Når agenten har fuldført disse trin, underretter den CA, at den er klar til at fuldføre valideringen.

Derefter er det CA's opgave at kontrollere, at udfordringerne er blevet opfyldt fra [flere netværksperspektiver](/2020/02/19/multi-perspective-validation).  CA verificerer underskriften på nonce, og det forsøger at hente filen fra webserveren og bekræfter at den har det forventede indhold.

<div class="howitworks-figure">
<img alt="Anmoder om tilladelse til at agere for example.com"
     src="/images/howitworks_authorization.png"/>
</div>

Hvis underskriften over nonce er gyldig, og udfordringerne bekræftes, så tillades den agent, der er identificeret af den offentlige nøgle, at gøre certifikatstyring for eksempel `. om`.  Vi kalder nøgleparret, agenten brugte et "autoriseret nøglepar" for `example.com`.


## Certifikat udstedelse og tilbagekaldelse

Når agenten har et autoriseret nøglepar er anmodning, fornyelse, og tilbagekaldelse af certifikater simpel --send blot certifikat management beskeder og signer dem med den autoriserede nøgle par.

For at få et certifikat for domænet konstruerer agenten en PKCS#10 [Certifikatsigneringsanmodning](https://tools.ietf.org/html/rfc2986), der beder Let's&nbsp;Encrypt CA om at udstede et certifikat for `. om` med en bestemt offentlig nøgle.  Som sædvanlig indeholder CSR en underskrift fra den private nøgle, der svarer til den offentlige nøgle i CSR.  Agenten underskriver også hele CSR med den autoriserede nøgle for `example.com`, så Let's&nbsp;Encrypt CA ved, at det er autoriseret.

Når Let's&nbsp;Encrypt CA modtager anmodningen, verificerer den begge underskrifter.  Hvis alt ser godt ud, udsteder det et certifikat for `example.com` med den offentlige nøgle fra CSR og returnerer det til agenten. CA'en vil også indsende certifikatet til talrige offentlige Certifikat Transparency (CT) logs. Se [her](https://certificate.transparency.dev/howctworks/#pki) for flere detaljer.

<div class="howitworks-figure">
<img alt="Anmod om et certifikat til example.com"
     src="/images/howitworks_certificate.png"/>
</div>

Tilbagekaldelse virker på en lignende måde.  Agenten underskriver en tilbagekaldelsesanmodning med nøgleparret godkendt for `eksempel.com`, og Let's&nbsp;Encrypt CA bekræfter, at anmodningen er autoriseret.  I så fald offentliggør den tilbagekaldelsesoplysninger i de normale tilbagekaldelseskanaler (dvs. OCSP), således at afhængige parter såsom browsere kan vide, at de ikke bør acceptere det tilbagekaldte certifikat.

<div class="howitworks-figure">
<img alt="Anmodning om tilbagekaldelse af et certifikat for example.com"
     src="/images/howitworks_revocation.png"/>
</div>

