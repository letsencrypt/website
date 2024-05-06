---
title: Hur det fungerar
linkTitle: Hur Let's Encrypt fungerar
slug: how-it-works
lastmod: 2019-10-18
show_lastmod: 1
---


Meningen med Let's&nbsp;Encrypt och [ACME-protokollet](https://tools.ietf.org/html/rfc8555) är att göra det möjligt att sätta upp en HTTPS-server som automatiskt erhåller ett certifikat som webbläsare litar på utan någon mänsklig handpåläggning.  Detta görs genom att köra en certifikathanteringsagent på webbservern.

För att förstå hur tekniken fungerar så låt oss gå igenom processen för att sätta upp `https://example.com/` med en certifikathanteringsagent som stöder Let's&nbsp;Encrypt.

Denna process består av två steg.  Först och främst bevisar agenten för CA:n att webbservern kontrollerar domänen.  Sedan kan agenten begära, förnya och återkalla certifikat för den domänen.

## Domänvalidering

Let's&nbsp;Encrypt identifierar systemadministratören genom en publik nyckel.  Första gången agentmjukvaran interagerar med Let's&nbsp;Encrypt genererar den ett nyckelpar och bevisar för Let's&nbsp;Encrypt-CA:n att servern kontrollerar en eller flera domäner.  Detta kan likställas med den traditionella CA-processen för att skapa ett konto och lägga till domäner till det kontot.

För att påbörja processen frågar agenten Let's Encrypt-CA:n vad den behöver göra för att bevisa att den kontrollerar `example.com`.  Let's Encrypt-CA:n kommer att titta på domännamnet som efterfrågas och utfärda en eller flera utmaningar.   Det finns flera sätt som agenten kan bevisa kontroll över domänen.  Till exempel kan CA:n ge agenten ett val att antingen:

* lägga till en DNS-post under `example.com` eller
* placera en HTTP-resurs under en välkänd URI på `http://example.com/`

Tillsammans med utmaningen tillhandahåller Let's Encrypt-CA:n ett engångsvärde som agenten måste signera med sin privata nyckel för att bevisa att den kontrollerar nyckelparet.

<div class="howitworks-figure">
<img alt="Begäran om utmaningar för att validera example.com"
     src="/images/howitworks_challenge.png"/>
</div>

Agentmjukvaran utför en av de givna utmaningarna.   Låt oss anta att den kan genomföra den andra uppgiften ovan: den skapar en fil på en efterfrågad sökväg på sajten `http://example.com`.  Agenten signerar också det givna engångsvärdet med sin privata nyckel.  När agenten väl slutfört dessa steg meddelar den CA:n att den är redo att slutföra valideringen.

Sen är det CA:ns jobb att kontrollera att utmaningarna har blivit tillfredsställda.  CA:n verifierar engångsvärdets signatur och försöker ladda ner filen från webbservern och säkerställa att den har det förväntade innehållet.

<div class="howitworks-figure">
<img alt="Begäran av behörighet att agera för example.com"
     src="/images/howitworks_authorization.png"/>
</div>

Om engångsvärdets signatur är korrekt och utmaningarna överensstämmer är agenten, som är identifierad med den publika nyckeln, godkänd att utföra certifikathantering för `example.com`.  Vi kallar nyckelparet som agenten använde för "behörigt nyckelpar" för `example.com`.


## Certifikatutfärdande och -återkallande

Så fort agenten har ett behörigt nyckelpar är det lätt att begära, förnya och återkalla certifikat --- bara skicka certifikathanteringsmeddelanden och signera dem med det behöriga nyckelparet.

För att erhålla ett certifikat för domänen konstruerar agenten en [PKCS#10-begäran om certifikatutfärdande](https://tools.ietf.org/html/rfc2986) (CSR) som ber Let's&nbsp;Encrypt-CA:n att utfärda ett certifikat för `example.com` med en specifik publik nyckel.  Som vanligt inkluderar en CSR en signering av den privata nyckeln som hör till den publika nyckeln i CSR:en.  Agenten signerar även hela CSR:en med den behöriga nyckeln för `example.com` så att Let's&nbsp;Encrypt-CA:n vet att den är behörig.

När Let's&nbsp;Encrypt-CA:n tar emot förfrågan verifierar den båda signaturerna.  Om allt ser bra ut utfärdar den ett certifikat för `example.com` med den publika nyckeln från CSR:en och skickar tillbaka det till agenten.

<div class="howitworks-figure">
<img alt="Begäran av certifikat för example.com"
     src="/images/howitworks_certificate.png"/>
</div>

Återkallande fungerar på ett liknande sätt.  Agenten signerar en begäran om återkallelse med det behöriga nyckelparet för `example.com` och Let's&nbsp;Encrypt-CA:n verifierar att begäran är behörig.  I så fall publicerar den återkallelseinformation i de vanliga kanalerna för detta (såsom OCSP), så att de beroende parterna som webbläsare får reda på att de inte ska acceptera det återkallade certifikatet.

<div class="howitworks-figure">
<img alt="Begäran av återkallande av certifikat för example.com"
     src="/images/howitworks_revocation.png"/>
</div>



