---
title: Limite di registrazioni per IP
slug: too-many-registrations-for-this-ip
top_graphic: 1
lastmod: 2023-05-263
show_lastmod: false
untranslated: 0
---

# Descrizione

Gli abbonati possono registrare fino a 10 account per indirizzo IP ogni 3 ore. Quando si supera il limite di *registrazioni per IP*, si riceve il seguente messaggio di errore dal client ACME:

```
too many registrations for this IP: see https://letsencrypt.org/docs/too-many-registrations-for-this-ip/
```

Le 'registrazioni' a cui si riferisce questo errore sono le richieste inviate dal vostro indirizzo IP per registrare un nuovo account con l'API di Let's Encrypt. Questo errore indica che almeno 10 account sono già stati registrati da questo indirizzo IP nelle ultime 3 ore.

# Cause comuni

Gli utenti che raggiungono il limite di registrazioni per IP spesso lo fanno a causa di una configurazione errata del loro ambiente.

## Distribuzioni ripetute

Il raggiungimento del limite di registrazioni per IP come singolo abbonato è estremamente raro. È più probabile che si verifichi durante distribuzioni ripetute del sistema o dell'applicazione; il client ACME non riesce a memorizzare e riutilizzare le credenziali dell'account o il filesystem in cui dovrebbero essere memorizzate le credenziali viene distrutto tra le distribuzioni (container, macchine virtuali, istanze cloud). Quando si testa la distribuzione del sistema o dell'applicazione, assicurarsi di aver configurato il client ACME per utilizzare il nostro ambiente di staging. I limiti di velocità per il nostro ambiente di staging sono [significativamente più alti](/docs/staging-environment/#rate-limits).

## Troppi account

I fornitori di hosting e altri integratori di grandi dimensioni di solito raggiungono il limite di registrazioni per IP tentando di richiedere un account per cliente. Consigliamo ai grandi integratori di preferire uno sviluppo che utilizzi [un solo account per molti clienti](/docs/integration-guide/#one-account-or-many). Durante i test, assicuratevi di aver configurato la vostra implementazione ACME per utilizzare il nostro ambiente di staging. I limiti di velocità per il nostro ambiente di staging sono [significativamente più alti](/docs/staging-environment/#rate-limits).

# Richiesta di aiuto

Se non siete sicuri di come configurare il vostro client ACME per utilizzare il nostro ambiente di staging o se avete bisogno di aiuto per il debug, vi invitiamo a [chiedere aiuto sul forum della nostra community](https://community.letsencrypt.org/c/help/13).

# Richiesta di sovrascrittura

**Non** sono disponibili sovrascritture per il limite di registrazioni per IP.
