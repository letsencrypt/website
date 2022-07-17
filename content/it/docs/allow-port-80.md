---
title: Migliori pratiche - Mantenere aperta la porta 80
slug: allow-port-80
top_graphic: 1
date: 2019-01-24
lastmod: 2019-01-24
show_lastmod: 1
---


Occasionalmente riceviamo report da persone che hanno problemi a usare la HTTP-01 challenge perché hanno bloccato col firewall la porta 80 sul loro server web. La nostra raccomandazione è che tutti i web server offrano sia HTTP sulla porta 80 che HTTPS sulla porta 443. Dovrebbero anche inviare reindirizzamenti per tutte le richieste sulla porta 80 ed eventualmente un'intestazione HSTS (su richiesta porta 443).

Permettere la porta 80 non introduce nessun ulteriore rischio per la sicurezza del tuo server, perché le richieste sulla porta 80 sono generalmente servite dallo stesso software in uso per la porta 443.

La chiusura della porta 80 non riduce il rischio per una persona che accidentalmente visita il tuo sito web tramite HTTP. In circostanze normali, la persona riceverà un reindirizzamento verso HTTPS e il suo traffico successivo sarà protetto. Se tale persona fosse soggetta a un MITM attivo, il MITM avrebbe risposto sulla porta 80, così il tuo sito non avrebbe mai avuto la possibilità di rispondere "connessione rifiutata".

Infine, mantenere la porta 80 aperta serve per indirizzare le persone verso la versione giusta del tuo sito (la versione HTTPS). Ci sono varie situazioni al di fuori del tuo controllo che potrebbero indirizzare qualcuno alla versione HTTP del tuo sito. Per esempio: un collegamento automatico nelle e-mail oppure digitare manualmente un nome di dominio. In questi casi è meglio ricevere un reindirizzamento che un errore.

Sfortunatamente, potresti non avere questo controllo se la porta 80 è bloccata per il tuo sito. Alcuni ISP (principalmente residenziali) bloccano la porta 80 per vari motivi. Se il tuo ISP lo fa ma vorresti ancora ottenere i certificati da Let's Encrypt, hai due opzioni: Puoi usare le sfide DNS-01 o puoi usare [uno dei client che supportano TLS-ALPN-01](https://community.letsencrypt.org/t/which-client-support-tls-alpn-challenge/75859/2) (sulla porta 443).
