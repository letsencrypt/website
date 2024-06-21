---
title: Revoca dei certificati
slug: revoking
date: 2017-06-08
lastmod: 2021-08-03
show_lastmod: 1
---


Quando la chiave privata di un certificato non è più sicura, dovresti revocare il certificato. Questo può accadere per alcune ragioni diverse. Per esempio, potresti condividere accidentalmente la chiave privata su un sito pubblico; gli hacker potrebbero copiare la chiave privata fuori dai tuoi server; o gli hacker potrebbero prendere il controllo temporaneo sui server o la configurazione DNS, e usarlo per convalidare e rilasciare un certificato per il quale sono in possesso della chiave privata.

Quando si revoca un certificato Let's Encrypt, Let's Encrypt pubblica le informazioni di revoca tramite il [Online Certificate Status Protocol (OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol), e alcuni browser controlleranno OCSP per vedere se possono fidarsi del certificato. Nota che OCSP [ha alcuni problemi fondamentali](https://www.imperialviolet.org/2011/03/18/revocation.html), quindi non tutti i browser eseguiranno questo controllo. Tuttavia, revocare i certificati che hanno le chiavi private compromesse è una pratica importante, ed è richiesto dal [contratto di Let's Encrypt](/repository).

Per revocare un certificato Let's Encrypt, si utilizzerà l'API [ACME](https://github.com/letsencrypt/boulder/blob/main/docs/acme-divergences.md) o, più probabilmente, un client ACME come [Certbot](https://certbot.eff.org/). Dovrai dimostrare a Let's Encrypt di essere autorizzato a revocare il certificato. Si può procedere in due modi:

# Dall'account che ha emesso il certificato

Se hai originariamente rilasciato il certificato e hai ancora il controllo dell'account che hai usato per emetterlo, puoi revocarlo utilizzando le credenziali del tuo account. Certbot tenterà questo metodo per impostazione predefinita. Esempio:

```bash
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem --reason keycompromise
```

# Usando la chiave privata del certificato

Se non hai originariamente emesso il certificato, ma hai una copia della corrispondente chiave privata, puoi revocarlo usando quella chiave privata per firmare la richiesta di revoca. Per esempio, se si scopre che una chiave privata è stata accidentalmente resa pubblica, puoi usare questo metodo per revocare i certificati che hanno utilizzato quella chiave anche se non sei la persona che ha originariamente rilasciato tali certificati.

Per utilizzare questo metodo, dovrai prima scaricare il certificato per essere revocato. Cifriamo i log di tutti i certificati utilizzando la [Certificate Transparency](https://www.certificate-transparency.org/), in modo da poter trovare e scaricare i certificati da un monitor di log come [crt. h](https://crt.sh/).

Sarà necessaria anche una copia della chiave privata in formato PEM. Una volta che li hai, puoi revocare il certificato in questo modo:

```bash
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/key.pem --reason keycompromise
```

# Utilizzando un altro account autorizzato

Se qualcuno ha rilasciato un certificato dopo aver compromesso il tuo host o il tuo DNS, bisognerà revocare tale certificato dopo che ne avrai riacquisito il controllo. Per revocare il certificato, Let's Encrypt dovrà controllare i nomi di dominio in quel certificato (altrimenti le persone potrebbero revocarsi reciprocamente i certificati senza permesso!) Per convalidare questo controllo, Let's Encrypt utilizza gli stessi metodi che utilizza per convalidare il rilascio: puoi mettere un [valore in un record DNS TXT ](https://tools.ietf.org/html/rfc8555#section-8.4) o mettere un file [su un server HTTP](https://tools.ietf.org/html/rfc8555#section-8.3). Generalmente un cliente ACME li gestirà automaticamente. Si noti che la maggior parte dei clienti ACME combinano convalida ed emissione, quindi l'unico modo per chiedere le validazioni è tentare di emettere il certificato. Puoi quindi revocare il certificato risultante se non lo vuoi o semplicemente distruggere la chiave privata. Se vuoi evitare di rilasciare un certificato, puoi includere un nome di dominio inesistente nella tua riga di comando, questo causerà il fallimento dell'emissione durante la convalida degli altri nomi di dominio esistenti. Per fare questo, esegui:

```bash
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

E segui le istruzioni. Se preferisci convalidare usando HTTP piuttosto che il metodo DNS, sostituisci il flag `--preferred-challenges` con `--preferred-challenges=http`.

Una volta convalidato il controllo di tutti i nomi di dominio nel certificato che si desidera revocare, puoi scaricare il certificato da [crt. h](https://crt.sh/), quindi procedere a revocare il certificato come se lo avessi rilasciato:

```bash
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem --reason keycompromise
```
