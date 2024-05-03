---
title: Supporto IPv6
slug: ipv6-support
date: 2020-02-07
lastmod: 2020-02-07
show_lastmod: 1
---


Let's Encrypt supporta IPv6 sia per accedere all'API ACME utilizzando un client ACME, sia per le ricerche DNS e le richieste HTTP che facciamo durante la convalida del controllo del dominio.

## Validazione del dominio

Quando si effettuano richieste di convalida del dominio in uscita per un dominio con indirizzi IPv4 e IPv6 (ad es. entrambi i record `A` e `AAAA`) Let's Encrypt preferirà sempre gli indirizzi IPv6 per la connessione iniziale. Se la connessione IPv6 fallisce a livello di rete (ad es. c'è un timeout) e ci sono indirizzi IPv4 disponibili, riproveremo la richiesta con uno degli indirizzi IPv4.

## Indirizzi IPv6 non corretti

Spesso i proprietari dei domini non sono a conoscenza di un record `AAAA` per il loro dominio. Se l'indirizzo IPv6 nel record `AAAA` non è corretto, influenzerà il processo di convalida del dominio.

Solitamente l'indirizzo IPv6 è un server diverso dall'indirizzo IPv4 dove è in esecuzione il client ACME. Poiché il client ACME configura solo il server IPv4 per rispondere alla convalida del dominio la challenge fallirà quando viene utilizzato il server IPv6.

Nella maggior parte dei casi la soluzione corretta è quella di aggiornare l'indirizzo IPv6 per puntare al server su cui è in esecuzione il client ACME, o rimuovere il record `AAAA` se il dominio non è destinato a funzionare con IPv6. Non c'è un modo per richiedere a Let's Encrypt di crittografare preferendo IPv4, è necessario correggere la configurazione errata.

## Dettagli tentativi da IPv6 a IPv4

Il passaggio dei tentativi da IPv6 a IPv4 avviene solo in caso di timeout di connessione, non in caso di altri tipi di errore.

Per esempio nello scenario sopra indicato non avverrà nessun nuovo tentativo se c'è un webserver in ascolto sull'indirizzo IPv6 ma non è pronto a rispondere alla sfida ACME. In questo caso non ci sarà nessun timeout all'indirizzo IPv6 e la sfida fallirà senza ulteriori tentativi perché è stata restituita la risposta errata.

Per mantenere semplice il nostro software CA, eseguiamo solo un tentativo da IPv6 a IPv4 sulla prima richiesta quando si convalidano le sfide "http-01". Se utilizzi i reindirizzamenti, questi non otterranno un nuovo trattamento.

Ad esempio, se un nome di dominio ha un record `AAAA` che va sempre in timeout e un record `A` con un webserver che reindirizza da HTTP a HTTPS, allora il passaggio da IPv6 a IPv4 non funzionerà correttamente. La prima richiesta al dominio sarà correttamente migrata su IPv4, ricevendo un reindirizzamento da HTTP a HTTPS. La successiva richiesta di nuovo preferirà l'indirizzo IPv6 ma scadrà senza passare a IPv4. È possibile risolvere questa situazione correggendo la configurazione errata IPv6 o rimuovendo l'HTTP al reindirizzamento HTTPS per le richieste al percorso di sfida ACME HTTP-01.

## Ottenere aiuto

Se hai bisogno di aiuto per diagnosticare un problema relativo all'IPv6, visita il nostro [forum](https://community.letsencrypt.org).
