---
title: Account-IDs finden
slug: account-id
top_graphic: 1
date: 2016-08-10
lastmod: 2019-07-30
show_lastmod: 1
---


Wenn Sie Probleme melden, kann es hilfreich sein, Ihre Let's Encrypt-Account-ID anzugeben. In den meisten Fällen wird das Erstellen eines Kontos automatisch von der ACME-Clientsoftware ausgeführt, mit der Sie sich mit Let's Encrypt unterhalten. Wenn Sie ACME-Clients auf mehreren Servern ausführen, sind möglicherweise mehrere Konten konfiguriert.

Ihre Account-ID ist eine URL in der Form `https://acme-v02.api.letsencrypt.org/acme/reg/12345678`.

Wenn Sie Certbot benutzen, finden Sie Ihre Account-ID, wenn Sie in das "uri" Feld in`/etc/letsencrypt/accounts/acme-v02.api.letsencrypt.org/directory/*/regr.json` schauen.

Wenn Sie einen anderen ACME-Client benutzen, kann die Anleitung client-abhängig sein. Überprüfen Sie Ihre Logs auf URLs in der Form wie oben beschrieben. Wenn Ihr ACME-Client die Account-ID nicht aufzeichnet, können Sie sie mit einer Registrierungsabfrage mit demselben Schlüssel abfragen. Lesen Sie die [ACME-Spezifikation für mehr Details](https://tools.ietf.org/html/rfc8555#section-7.3). Sie können die nummerische Form von Ihrer ID auch im Boulder-Requester-Header in der Antwort zu jedem POST Ihres ACME-Clients finden.
