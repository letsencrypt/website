---
title: E-mail di scadenza
slug: expiration-emails
date: 2016-07-02
lastmod: 2020-10-28
show_lastmod: 1
---


# Iscrizione

Se fornisci un indirizzo e-mail a Let's Encrypt quando crei il tuo account, ti invieremo automaticamente degli avvisi quando il tuo certificato sarà in scadenza. Inviamo la prima notifica a 20 giorni dalla scadenza del tuo certificato, e poi avvisi a 10 giorni e 1 giorno prima della scadenza.

# Quando ricevi un'e-mail di scadenza

Se il tuo certificato è già stato rinnovato, non invieremo le notifiche di scadenza. Noi consideriamo un certificato da rinnovare se c'è un nuovo certificato con lo stesso esatto insieme di nomi, indipendentemente da quale account lo ha creato. Se hai rilasciato un nuovo certificato che aggiunge o rimuove un nome relativo al tuo vecchio certificato, otterrai le e-mail di scadenza sul tuo vecchio certificato. Se controlli il certificato attualmente in esecuzione sul tuo sito web, e mostra la data corretta, non sono necessarie ulteriori azioni.

# Annullare l'iscrizione

Il testo dell'e-mail ha un link per annullare l'iscrizione alle future notifiche. Premendo quel link, non otterrai alcun avviso di scadenza per il prossimo anno. L'elenco "who's unsubscribed" è indipendente per gli avvisi di Staging e gli Avvisi di produzione, così puoi sentirti libero di annullare l'iscrizione allo Staging senza che influenzi il tuo stato di produzione.

Nota che il tuo annullamento è valido solo per un anno, quindi dovrai rinnovarlo ogni anno.

Non c'è ancora un modo per noi di riscriverti in modo efficiente se annulli l'iscrizione. Il nostro provider e-mail, Mandrill, [ha un meccanismo manuale che dobbiamo ancora automatizzare](https://mandrill.zendesk.com/hc/en-us/articles/360039299913).

Tuttavia, è possibile modificare l'indirizzo e-mail del tuo account, in modo da iscriverti nuovamente. Molti servizi di posta elettronica trattano `yourname+1@example.com` lo stesso come `yourname@example.com`. Quindi, se aggiorni il tuo indirizzo e-mail a `yourname+1@example.com`, puoi iniziare a ricevere nuovamente gli avvisi di scadenza. Con Certbot, utilizza il comando:

`certbot update_account --email yourname+1@example.com`
