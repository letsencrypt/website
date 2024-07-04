---
title: Registrierungen pro IP Limit
slug: too-many-registrations-for-this-ip
lastmod: 2022-08-15
show_lastmod: false
---


# Beschreibung

Abonnenten können alle 3 Stunden bis zu 10 Konten pro IP-Adresse registrieren. Sie sollten die folgende Fehlermeldung von Ihrem ACME-Client erhalten, wenn Sie das Limit für *Registrierungen pro IP* überschritten haben:

```
too many registrations for this IP: see https://letsencrypt.org/docs/too-many-registrations-for-this-ip/
```

Die 'Registrierungen', auf die sich diese Fehlermeldung bezieht, sind Anfragen, die von Ihrer IP-Adresse gesendet werden, um ein neues Konto bei der Let's Encrypt API zu registrieren. Dieser Fehler zeigt an, dass in den letzten 3 Stunden bereits mindestens 10 Konten von dieser IP-Adresse aus registriert worden sind.

# Häufige Ursachen

Abonnenten, die das Limit für Registrierungen pro IP-Adresse erreichen, tun dies oft aufgrund einer Fehlkonfiguration in ihrer Umgebung.

## Wiederholte Bereitstellungen

Das Erreichen des Limits "Registrierungen pro IP" als einzelner Abonnent ist äußerst selten. Dies tritt höchstwahrscheinlich bei wiederholten Bereitstellungen Ihres Systems oder Ihrer Anwendung auf; entweder kann Ihr ACME-Client die Anmeldedaten Ihres Kontos nicht speichern und wiederverwenden oder das Dateisystem, in dem die Anmeldedaten gespeichert werden sollten, wird zwischen den Bereitstellungen zerstört (Container, virtuelle Maschinen, Cloud-Instanzen). Wenn Sie die Bereitstellung Ihres Systems oder Ihrer Anwendung testen, stellen Sie sicher, dass Sie Ihren ACME-Client für die Verwendung unserer Staging-Umgebung konfiguriert haben. Die Ratengrenzen für unsere Staging-Umgebung sind [deutlich höher](/docs/staging-environment/#rate-limits).

## Zu viele Konten

Hosting-Anbieter und andere große Integratoren stoßen in der Regel an die Grenze für Registrierungen pro IP, wenn sie versuchen, ein Konto pro Kunde anzufordern. Wir empfehlen, dass große Integratoren ein Design mit [einem Konto für viele Kunden](/docs/integration-guide/#one-account-or-many) bevorzugen. Stellen Sie beim Testen sicher, dass Sie Ihre ACME-Implementierung für die Verwendung unserer Testumgebung konfiguriert haben. Die Ratengrenzen für unsere Staging-Umgebung sind [deutlich höher](/docs/staging-environment/#rate-limits).

# Anfordern von Hilfe

Wenn Sie nicht sicher sind, wie Sie Ihren ACME-Client für die Verwendung unserer Staging-Umgebung konfigurieren sollen oder wenn Sie Hilfe bei der Fehlersuche benötigen, können Sie in [unserem Community-Forum Hilfe anfordern](https://community.letsencrypt.org/c/help/13).

# Anforderung einer Überschreibung

Überschreibungen sind für das Limit Registrierungen pro IP **nicht** möglich.
