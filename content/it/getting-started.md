---
title: Per iniziare
slug: getting-started
date: 2020-02-11
---

Per abilitare l'HTTPS sul tuo sito web, devi ottenere un certificato (un tipo di file) da un'autorità di certificazione (CA). Let's Encrypt è una CA. Per ottenere un certificato per il dominio del tuo sito web da Let's Encrypt, devi dimostrare il controllo sul dominio. Con Let's Encrypt, lo puoi fare utilizzando un software che utilizza il protocollo [ACME](https://tools.ietf.org/html/rfc8555) che in genere viene eseguito sul tuo server web.

Per capire quale metodo funzionerà meglio per te, devi sapere se hai [accesso alla shell](https://en.wikipedia.org/wiki/Shell_account) (noto anche come accesso SSH) al tuo server web. Se gestisci il tuo sito web interamente attraverso un pannello di controllo come [cPanel](https://cpanel.net/), [Plesk](https://www.plesk.com/), o [WordPress](https://wordpress.org/), c'è una buona probabilità che tu non abbia accesso alla shell. Puoi chiedere al tuo fornitore di hosting per esserne sicuro.

# Con accesso alla shell

Consigliamo alla maggior parte delle persone con accesso alla shell di utilizzare il client ACME [Certbot](https://certbot.eff.org/ "Certbot"). Può automatizzare il rilascio e l'installazione di certificati senza tempi di inattività. Ha anche modalità avanzata per le persone che non vogliono l'auto-configurazione. È facile da usare, funziona su molti sistemi operativi e ha una buona documentazione. [Visita il sito Certbot](https://certbot.eff.org/ "Certbot") per ottenere istruzioni personalizzate per il tuo sistema operativo e server web.

Se [Certbot](https://certbot.eff.org/ "Certbot") non soddisfa le tue esigenze, o vuoi provare qualcos'altro, ci sono [molti altri client ACME tra cui scegliere](/docs/client-options).  Una volta scelto il software client ACME, consulta la documentazione per il client in questione.

Se stai sperimentando diversi client ACME, usa il nostro [ambiente di staging](/docs/staging-environment) per evitare di superare i nostri [limiti di velocità](/docs/rate-limits).

# Senza accesso alla shell

Il modo migliore per utilizzare Let's Encrypt senza accesso alla shell è utilizzare il supporto integrato dal tuo provider di hosting. Se il tuo provider di hosting offre il supporto Let's Encrypt, puoi richiedere un certificato gratuito autonomamente, installarlo, e tenerlo automaticamente aggiornato. Per alcuni provider di hosting, questa è un'impostazione di configurazione che è necessario attivare. Altri provider richiedono e installano automaticamente certificati per tutti i loro clienti.

[Controlla la nostra lista di hosting provider](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920) per vedere se il tuo è incluso. In tal caso, segui la documentazione per configurare il tuo certificato Let's Encrypt.

Se il tuo provider di hosting non supporta Let's Encrypt, puoi contattarlo per richiederne il supporto. Facciamo del nostro meglio per rendere molto facile aggiungere il supporto a Let's Encrypt, e spesso i fornitori sono felici di avere suggerimenti dai clienti!

Se il tuo provider di hosting non vuole integrare Let's Encrypt, ma supporta il caricamento di certificati personalizzati, puoi installare Certbot sul tuo computer e usarlo in [modalità manuale](https://certbot.eff.org/docs/using.html#manual). In modalità manuale, è necessario caricare un file specifico sul vostro sito web per dimostrare il controllo. Certbot creerà un certificato che puoi caricare sul tuo hosting provider. Non consigliamo questa opzione perché richiede molto tempo e dovrai ripeterla più volte all'anno alla scadenza del tuo certificato. Per la maggior parte delle persone è meglio richiedere il supporto di Let's Encrypt dal proprio hosting provider, o cambiare fornitore se non prevede di abilitarlo.

# Ottenere aiuto

Se hai domande sulla selezione di un client ACME o sull'utilizzo di un particolare client, o qualsiasi altra cosa correlata a Let's Encrypt, prova i nostri [utili forum della community](https://community.letsencrypt.org/).
