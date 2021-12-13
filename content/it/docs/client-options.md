---
title: Implementazioni Client ACME
slug: client-options
top_graphic: 1
lastmod: 2020-12-18
---

{{< clientslastmod >}}

Let's Encrypt utilizza il protocollo ACME per verificare che si controlla un dato nome di dominio e per emettere certificati. Per ottenere un certificato Let's Encrypt è necessario scegliere un client ACME da utilizzare.

I clienti ACME qui di seguito elencati sono offerti da terzi. Let's Encrypt non controlla o revisiona client di terzi e non può fornire alcuna garanzia sulla loro sicurezza o affidabilità.

Alcuni client ACME all'interno del browser sono disponibili, ma non li elenchiamo qui perché incoraggiano un flusso di lavoro di rinnovo manuale che si traduce in una cattiva esperienza utente e aumenta il rischio di rinnovi mancati.

# Raccomandato: Certbot

Consigliamo alla maggior parte delle persone di iniziare con il client [Certbot](https://certbot.eff.org/). Può ottenere un certificato per voi e, se necessario, anche aiutarvi con l'installazione. È facile da usare, funziona su molti sistemi operativi e ha una buona documentazione.

Se Certbot non soddisfa le tue esigenze, o vuoi semplicemente provare qualcos'altro, ci sono altri client da scegliere in seguito, raggruppati per il linguaggio o per l'ambiente in cui vengono eseguiti.

# Altri client

Tutti i seguenti clienti supportano l'API ACMEv2 ([RFC 8555](https://tools.ietf.org/html/rfc8555)). Stiamo gradualmente eliminando il [supporto per ACMEv1](https://community.letsencrypt.org/t/end-of-life-plan-for-acmev1/88430/). Se stai già utilizzando uno dei client qui sotto, assicurati di aggiornarlo all'ultima versione. Se il client che stai usando non è elencato di seguito, potrebbe non supportare ACMEv2, in questo caso si consiglia di contattare i manutentori del progetto o di migrare a un altro client.

{{< clients libraries="Libraries" projects="Projects integrating with Let's Encrypt" >}}

Il modulo Python [acme](https://github.com/certbot/certbot/tree/master/acme) fa parte di Certbot, ma è anche utilizzato da un certo numero di altri clients ed è disponibile come pacchetto autonomo tramite [PyPI](https://pypi.python.org/pypi/acme), [Debian](https://packages.debian.org/search?keywords=python-acme), [Ubuntu](https://launchpad.net/ubuntu/+source/python-acme), [Fedora](https://bodhi.fedoraproject.org/updates/?packages=python-acme) e altre distribuzioni.

{{< /clients >}}

# Aggiungere un client/progetto

Se conosci un client ACME o un progetto che si è integrato con l'API ACMEv2 di Let's Encrypt che non è presente nella pagina precedente, invia una richiesta pull al nostro [repository](https://github.com/letsencrypt/website/) su GitHub, aggiornando il file `data/clients.json`.

Prima di inviare una richiesta di pull assicurati di:

1. Il client rispetta la [Let's Encrypt trademark policy](/trademarks).
1. Il client non è basato sul browser e supporta i rinnovi automatici.
1. Il tuo commit aggiunge il tuo client alla **fine** delle sezioni pertinenti (non dimenticare "acme_v2" se appropriato!).
1. Il tuo commit aggiorna la data `lastmod` nella parte superiore di `clients.json`.
