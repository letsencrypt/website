---
title: "I certificati Let's Encrypt negli hosting GoDaddy"
slug: godaddy
top_graphic: 1
date: 2019-12-02
lastmod: 2019-12-02
show_lastmod: 1
---


Abbiamo ricevuto molte domande su come utilizzare Let's Encrypt su GoDaddy. Se usi un web hosting condiviso con GoDaddy, è attualmente molto difficile installare un certificato Let's Encrypt quindi non consigliamo attualmente di utilizzare i nostri certificati con GoDaddy. Questo perche GoDaddy non supporta [protocollo ACME](https://tools.ietf.org/html/rfc8555) per l'emissione e il rinnovo automatico del certificato. Invece, GoDaddy offre un rinnovo automatico con i propri certificati, che sono una [funzionalità aggiuntiva a pagamento](https://www.godaddy.com/web-security/ssl-certificate).

Non consigliamo di utilizzare Let's Encryot sui fornitori di hosting che non implementano direttamente il protocollo ACME, perché significa che non puoi automatizzare completamente i rinnovi. Pensiamo che i rinnovi automatici siano una parte molto importante per utilizzando i certificati. Utilizzare software per automatizzare il rinnovo rende molto meno probabile che il certificato scadrà senza essere sostituito. Se il tuo certificato scadrà, sarà molto frustrante per gli utenti che non potranno accedere al tuo sito.

Poiché crediamo fermamente nel rinnovo automatico, progettiamo i nostri certificati da utilizzare con l'automazione ACME. Un certificato Let's Encrypt deve essere rinnovato automaticamente dopo 60 giorni, e smetterà di funzionare dopo 90 giorni se non verrà rinnovato.

Se, dopo aver esaminato i problemi di cui sopra, hai deciso di provare a mantenere un certificato Let’s Encrypt su un hosting condiviso GoDaddy, GoDaddy [fornisce le istruzioni necessarie](https://www.godaddy.com/help/install-a-lets-encrypt-certificate-on-your-cpanel-hosting-account-28023). Tenete a mente, che seguire queste istruzioni richiede tempo, e dovete farlo ogni 60 giorni (non ogni 90 giorni come descritto nella pagina collegata).
