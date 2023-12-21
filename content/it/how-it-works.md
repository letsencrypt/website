---
title: Come funziona
linkTitle: Come funziona Let's Encrypt
slug: how-it-works
top_graphic: 3
lastmod: 2019-10-18
show_lastmod: 1
---


L'obiettivo di Let's&nbsp;Encrypt e il protocollo [ACME](https://tools.ietf.org/html/rfc8555) è quello di consentire di configurare un server HTTPS e di ottenere automaticamente un certificato di fiducia del browser, senza alcun intervento umano.  Questo si ottiene eseguendo un agente di gestione dei certificati sul server web.

Per capire come funziona la tecnologia, seguiamo il processo di configurazione `https://esempio. om/` con un client che supporta Let's&nbsp;Encrypt.

Ci sono due fasi per questo processo.  Prima di tutto l'agente dimostra alla CA che il server web controlla un dominio.  Poi, l'agente può richiedere, rinnovare e revocare i certificati per quel dominio.

## Validazione del dominio

Let's&nbsp;Encrypt identifica l'amministratore del server con la chiave pubblica.  La prima volta che il client interagisce con Let's&nbsp;Encrypt, genera una coppia di chiavi e dimostra al Let's&nbsp;Encrypt CA che il server controlla uno o più domini.  Questo è simile al tradizionale processo CA di creazione di un account e l'aggiunta di domini a tale account.

Per dare via al processo, il client chiede alla CA Let's Encrypt cosa deve fare per dimostrare che controlla il dominio `example.com`.  La CA Let's Encrypt esaminerà il nome di dominio richiesto e emetterà una o più serie di sfide.   Ci sono diversi modi che l'agente può utilizzare per dimostrare il controllo del dominio.  Per esempio, la CA potrebbe dare all'agente una scelta tra:

* Aggiungere un record DNS al dominio `example.com`, o
* Aggiungere una risorsa HTTP sotto un noto URI su `http://example.com/`

Insieme alle sfide, il Let's Encrypt CA fornisce anche una nonce che l'agente deve firmare con la sua coppia di chiavi privata per dimostrare che controlla la coppia di chiavi.

<div class="howitworks-figure">
<img alt="Richiedere sfide per convalidare example.com"
     src="/images/howitworks_challenge.png"/>
</div>

Il software completa una delle serie di sfide fornite.   Ipotizziamo che è in grado di svolgere il secondo compito richiesto: crea un file su un percorso specificato nel sito `http://example.com`.  L'agente firma anche la nonce fornita con la sua chiave privata.  Una volta che il client ha completato questi passaggi, notifica alla CA che è pronto a completare la convalida.

Poi è compito della CA verificare che le sfide siano state soddisfatte.  La CA verifica la firma sulla nonce e tenta di scaricare il file dal server web e assicurarsi che abbia il contenuto previsto.

<div class="howitworks-figure">
<img alt="Richiesta di autorizzazione ad agire per esempio.com"
     src="/images/howitworks_authorization.png"/>
</div>

Se la firma sopra la nonce è valida e le sfide superate, l'agente identificato dalla chiave pubblica è autorizzato alla gestione dei certificati per `esempio.com`.  Chiamiamo la coppia di chiavi l'agente ha usato una "coppia di chiavi autorizzata" per `example.com`.


## Rilascio e revoca del certificato

Una volta che l'agente ha una coppia di chiavi autorizzata, richiedere, rinnovare e revocare i certificati è semplice, basta inviare messaggi di gestione dei certificati e firmarli con la coppia di chiavi autorizzata.

Per ottenere un certificato per il dominio, il client genera una [richiesta di firma del certificato PKCS#10](https://tools.ietf.org/html/rfc2986) con cui chiede a Let's&nbsp;Encrypt CA di rilasciare un certificato per `esempio.com` con una chiave pubblica specificata.  Come al solito, la CSR include una firma della chiave privata corrispondente alla chiave pubblica nella CSR.  Il client firma anche l'intero CSR con la chiave autorizzata per `example.com` in modo che il Let's&nbsp;Encrypt CA sappia che è autorizzato.

Quando la CA Let's&nbsp;Encrypt riceve la richiesta, verifica entrambe le firme.  Se tutto sembra regolare, rilascia un certificato per `example.com` con la chiave pubblica dal CSR e lo restituisce al client.

<div class="howitworks-figure">
<img alt="Richiesta di un certificato per esempio.com"
     src="/images/howitworks_certificate.png"/>
</div>

La revoca funziona in modo simile.  L'agente firma una richiesta di revoca con la coppia di chiavi autorizzata per `esempio.com` e la CA Let's&nbsp;Encrypt verifica che la richiesta sia autorizzata.  In caso affermativo, pubblica le informazioni sulla revoca nei normali canali di revoca (es. OCSP), in modo che le parti che fanno affidamento come i browsers possano sapere che non dovrebbero accettare il certificato revocato.

<div class="howitworks-figure">
<img alt="Richiesta della revoca di un certificato per esempio.com"
     src="/images/howitworks_revocation.png"/>
</div>

