---
title: Trovare l'ID account
slug: account-id
date: 2016-08-10
lastmod: 2019-07-30
show_lastmod: 1
---


Quando si segnalano problemi può essere utile fornire l'ID del tuo account Let's Encrypt. Solitamente il processo di creazione dell'account viene gestito automaticamente dal client ACME che usi per comunicare con Let's Encrypt, e potresti ritrovarti con account multipli configurati se esegui client ACME su più server.

Il tuo account ID è un URL nel formato `https://acme-v02.api.letsencrypt.org/acme/acct/12345678`.

Se stai usando Certbot, puoi trovare l'ID del tuo account guardando il campo "uri" all'interno del file `/etc/letsencrypt/accounts/acme-v02.api.letsencrypt.org/directory/*/regr.json`.

Se stai usando un altro client ACME, le istruzioni dipenderanno dal client. Controlla i tuoi log cercando gli URL nel formato descritto sopra. Se il tuo client ACME non memorizza l'ID account, puoi recuperarlo inviando una nuova richiesta di registrazione con la stessa chiave. Vedi la [specifica ACME](https://tools.ietf.org/html/rfc8555#section-7.3) per ulteriori dettagli. Puoi anche trovare il tuo ID nell'intestazione Boulder-Requester della risposta a ogni POST eseguita dal tuo client ACME.
