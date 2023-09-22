---
title: Contatti
slug: contact
description: Come contattarci
top_graphic: 1
lastmod: 2023-09-22
menu:
  main:
    weight: 90
    parent: about
---

**Non forniamo supporto via email. Se hai una domanda, usa il nostro [forum della comunità](https://community.letsencrypt.org). Gli indirizzi email qui sotto sono solo per gli argomenti specifici descritti.**

## Ufficio stampa

Email: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## Sponsorizzazione

Email: [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## Iscriviti alla nostra newsletter <iframe src="https://outreach.abetterinternet.org/l/1011011/2023-02-16/6l51" height="200" style="width: 100%; border: 0"></iframe>

## Privacy

E-mail: [privacy@abetterinternet.org](mailto:privacy@abetterinternet.org)

## Sicurezza

**Non scrivere a questo indirizzo a meno che il messaggio non riguardi un problema di sicurezza con Let's Encrypt.**

<span id="email">Email: </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>

### Comunicazione Criptata

Per comunicare in modo sicuro con il Team di Sicurezza, utilizza la nostra chiave GPG. Consiste in diverse sottochiavi firmate da una chiave master offline. Qualsiasi versione recente di GnuPG supporta questo tipo di chiave ibride. La struttura attuale delle chiavi è:

```
pub rsa4096 2015-11-24 [CE] [Scadenza: 2025-09-25]
      0148 3B31 D8F9 DBA2 5D41 4DAA 718E 9F6D 10EC 230B
uid           [ultimate] ISRG Security Team (letsencrypt. rg) <security@letsencrypt.org>
sub rsa4096 2015-11-24 [E] [Scadenza: 2023-09-25]
sub rsa4096 2015-11-24 [A] [Scadenza: 2023-09-25]
sub rsa4096 2015-11-24 [S] [Scadenza: 2023-09-25]
```

Puoi scaricare la [chiave pubblica GPG](/security_letsencrypt.org-publickey.asc) qui, o utilizzare il tuo server di chiave preferita.

La chiave digitale deve corrispondere a `0148 3B31 D8F9 DBA2 5D41 4DAA 718E 9F6D 10EC 230B`.
