---
title: Hur det fungerar
linkTitle: Hur Let's Encrypt fungerar
slug: how-it-works
lastmod: 2025-08-02
show_lastmod: 1
---

Målet med Let's Encrypt och [ACME-protokollet](https://tools.ietf.org/html/rfc8555) är att göra det möjligt att ställa in en HTTPS-server och att automatiskt få certifikat som webbläsare litar på utan mänsklig inblandning. Detta uppnås genom att köra en ACME-klient på en webbserver.

För att förstå hur teknologin fungerar, låt oss gå igenom processen för att ställa in `https://example.com/` med en ACME-klient.

Denna process består av två steg. Först bevisar ACME-klienten för [Certificate Authority](https://wikipedia.org/wiki/Certificate_authority) (CA) att webbservern kontrollerar en domän. Efter det kan klienten begära eller återkalla certifikat för den domänen.

## Domänvalidering

Let's Encrypt identifierar ACME-klientprogramvaran med [offentlig nyckel](https://wikipedia.org/wiki/Public-key_cryptography). Första gången ACME-klienten interagerar med Let's Encrypt, genererar den ett nytt kontonyckelpar och bevisar för Let's Encrypt CA att operatören kontrollerar en eller flera domäner. Detta kan likställas med den traditionella CA-processen för att skapa ett konto och lägga till domäner till det kontot.

För att starta processen frågar klienten Let's Encrypt CA vad den behöver göra för att bevisa att den kontrollerar `example.com`. Let's Encrypt-CA:n kommer att titta på domännamnet som efterfrågas och utfärda en eller flera utmaningar. Det finns olika sätt som klienten kan bevisa kontroll över domänen. Till exempel kan CA ge klienten möjlighet att välja mellan:

* lägga till en DNS-post under `example.com` eller
* placera en HTTP-resurs under en välkänd URI på `http://example.com/`

<div class="howitworks-figure">
<img alt="Begäran om utmaningar för att validera example.com"
     src="/images/howitworks_challenge.png"/>
</div>

Klientprogramvaran slutför en av de tillhandahållna uppsättningarna av utmaningar. Låt oss anta att den kan genomföra den andra uppgiften ovan: den skapar en fil på en efterfrågad sökväg på sajten `http://example.com`. När klienten har slutfört dessa steg, meddelar den CA att den är redo att slutföra validering.

Sedan är det CA:s (Certification Authority) uppgift att kontrollera att utmaningarna har uppfyllts från [flera nätverksperspektiv](/2020/02/19/multi-perspective-validation).

<div class="howitworks-figure">
<img alt="Begäran av behörighet att agera för example.com"
     src="/images/howitworks_authorization.png"/>
</div>

Om utmaningarna stämmer, då är klienten identifierad med den offentliga nyckeln auktoriserad att hantera certifikat för `example.com`.

Observera att denna process inte kan använda HTTPS, vilket gör den sårbar för vissa attacker. För att mildra problemet utför Let's Encrypt faktiskt flera valideringar parallellt från olika nätverksperspektiv. Detta gör det avsevärt svårare för en angripare att framgångsrikt sabotera valideringsprocessen.

## Certifikatutfärdande och -återkallande

När klienten har auktoriserats är det enkelt att begära, förnya och återkalla certifikat: skicka meddelanden för certifikathantering och signera dem med det auktoriserade kontots nyckelpar.

### Utfärdande

För att erhålla ett certifikat för domänen konstruerar klienten en PKCS#10 [Certificate Signing Request](https://tools.ietf.org/html/rfc2986) (CSR) som ber Let's Encrypt CA att utfärda ett certifikat för `example.com` med en specificerad publik nyckel. Som vanligt inkluderar en CSR en signering av den privata nyckeln som hör till den publika nyckeln i CSR:en. Klienten signerar också hela CSR med den auktoriserade nyckeln för `example.com` så att Let's Encrypt CA vet att den är auktoriserad.

När Let's Encrypt CA mottar begäran verifierar den båda signaturerna. Om allt ser bra ut utfärdar den ett certifikat för `example.com` med den publika nyckeln från CSR och returnerar det till klienten. Certifikatutfärdaren skickar också certifikatet till flera offentliga Certificate Transparency-loggar (CT-loggar). Se [här](https://certificate.transparency.dev/howctworks/#pki) för mer detaljer.

<div class="howitworks-figure">
<img alt="Begäran av certifikat för example.com"
     src="/images/howitworks_certificate.png"/>
</div>

Att förnya ett certifikat vid ett senare tillfälle innebär att upprepa utfärdandeprocessen - utföra domänvalidering och sedan begära ett nytt certifikat.

### Återkallelse

Återkallande fungerar på ett liknande sätt. Klienten signerar en återkallelsebegäran med det konto-nyckelpar som är auktoriserat för `example.com`, och Let's Encrypt CA verifierar att begäran är auktoriserad. Om så är fallet publicerar den återkallelsesinformationen via [Certificate Revocation List](https://en.wikipedia.org/wiki/Certificate_revocation_list) (CRL), så att beroende parter som webbläsare kan veta att de inte ska acceptera det återkallade certifikatet.

<div class="howitworks-figure">
<img alt="Begäran av återkallande av certifikat för example.com"
     src="/images/howitworks_revocation.png"/>
</div>
