---
title: lencr.org
slug: lencr.org
date: 2021-11-30
lastmod: 2022-09-30
show_lastmod: 1
---


# Was ist `lencr.org`?

`lencr.org` ist ein Domänenname im Besitz von Let's Encrypt. Wir verwenden es, um Daten zu hosten, die in den von uns ausgestellten Zertifikaten referenziert werden.

# Warum ruft mein Computer diese Daten ab? Ist es bösartig?

Nein, die Daten auf `lencr.org` sind niemals bösartig. Wenn ein Gerät eine Verbindung zu `lencr.org` herstellt, liegt das daran, dass eine Client-Software auf diesem Gerät (z. B. ein Webbrowser oder eine App) eine Verbindung zu einer anderen Website hergestellt hat, ein Let's Encrypt-Zertifikat gesehen hat und versucht, dessen Gültigkeit zu überprüfen. Für viele Clients ist dies Routine.

Wir können nicht sagen, ob die *andere Website*, zu der eine Verbindung besteht, bösartig ist. Wenn Sie Netzwerkaktivitäten untersuchen, die Ihnen ungewöhnlich erscheinen, dann sollten Sie sich auf die Verbindung konzentrieren, die kurz vor der Verbindung zu `lencr.org` begonnen hat.

Das Muster der Verbindungen der Clients zu `lencr.org` könnte ungewöhnlich oder unregelmäßig aussehen. Es kann sein, dass die Clients diese Daten nie abrufen, nur Teilmengen davon abrufen oder einige Daten aus Effizienzgründen "zwischenspeichern", so dass sie nur manchmal darauf zugreifen (wenn sie sie zum ersten Mal benötigen und wenn die Daten möglicherweise abgelaufen sind).

# Wofür genau sind diese Daten gedacht?

Wenn eine Client-Software (z. B. ein Webbrowser oder eine Anwendung) eine Verbindung zu einer Website herstellt und diese Website ein Zertifikat vorlegt, sollte der Client überprüfen, ob das Zertifikat authentisch und gültig ist. Diese Daten helfen den Clients dabei in mehrfacher Hinsicht.

* Unter `o.lencr.org` stellen wir Daten des Online Certificate Status Protocol (OCSP) zur Verfügung. Ein Client kann diese Daten verwenden, um festzustellen, ob ein einzelnes, noch nicht abgelaufenes Zertifikat, das wir ausgestellt haben, noch gültig ist oder widerrufen wurde. (Dies gilt nur für "End-Entity"- oder "Leaf"-Zertifikate, die wir aus einem unserer Zwischenzertifikate für Abonnenten ausgestellt haben.)

* Unter `c.lencr.org` stellen wir Certificate Revocation Lists (CRLs) zur Verfügung, in denen alle nicht abgelaufenen Zertifikate aufgeführt sind, die wir ausgestellt und später widerrufen haben.

* Unter `i.lencr.org` stellen wir Kopien unserer "Aussteller"-Zwischenzertifikate zur Verfügung, die entweder von einem unserer Stammzertifikate signiert oder von einer anderen Zertifizierungsstelle (CA) "cross-signed" sind. Ein Client kann diese Daten verwenden, um die "Vertrauenskette" von dem zu überprüfenden Endteilnehmerzertifikat über einen oder mehrere Zwischenschritte zu einem anerkannten und vertrauenswürdigen Stammzertifikat zu bestätigen.

# Warum werden Verbindungen zu `o.lencr.org` über unsicheres HTTP hergestellt?

OCSP-Antworten werden immer über HTTP übermittelt. Würden sie über HTTPS bereitgestellt, gäbe es ein Problem mit einer "Endlosschleife": Um das Zertifikat des OCSP-Servers zu überprüfen, müsste der Client OCSP verwenden.

Die OCSP-Antwort selbst ist mit einem Zeitstempel versehen und kryptografisch signiert, so dass die Anti-Manipulationseigenschaften von TLS in diesem Fall nicht erforderlich sind.

# Warum "`lencr.org`"?

Wir haben längere URLs wie `http://ocsp.int-x3.letsencrypt.org/` verwendet. Aber als wir unsere [neuen Root- und Zwischenzertifikate][1] ausstellten, wollten wir sie so klein wie möglich machen. Jede HTTPS-Verbindung im Internet (Milliarden pro Tag) muss eine Kopie eines Zertifikats senden, daher ist jedes Byte wichtig. Wir haben `lencr.org` wegen der Ähnlichkeit mit unserem Namen gewählt: **L**et's **ENCR**ypt. Wir sprechen es ähnlich wie die fiktive Region von [Lancre][] in Terry Pratchetts _Discworld_-Romanen aus.

[1]: https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html
[Lancre]: https://wiki.lspace.org/Lancre
