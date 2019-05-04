---
title: Kette des Vertrauens
slug: certificates
top_graphic: 5
---

# Root Zertifikate

Unsere Root Zertifikate werden sicher offline gehalten. Im nächsten Abschnitt stellen wir
Endteilnehmerzertifikate aus den Zwischenzertifikaten für Abonnenten aus.

* Aktiv
  * [ISRG Root X1 (self-signed)](/certs/isrgrootx1.pem.txt)

Wir haben eine Webseite zum Testen der Zertifikatketten zu unseren Root Zertifikaten erstellt.

* ISRG Root X1 Valid Certificate
  * [https://valid-isrgrootx1.letsencrypt.org/](https://valid-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 Revoked Certificate
  * [https://revoked-isrgrootx1.letsencrypt.org/](https://revoked-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 Expired Certificate
  * [https://expired-isrgrootx1.letsencrypt.org/](https://expired-isrgrootx1.letsencrypt.org/)

# Zwischenzertifikate (Intermediate Certificates)

IdenTrust hat unsere Zwischenzertifikate quersigniert. Das erlaubt die Aktzeptanz all
unserer Endzertifkate bei allen Browsern, bei denen wir unser Root Zertifikat propagieren.

Unter normalen Umständen kommen Zertifikate, die von Let’s Encrypt ausgestellt worden, von
“Let’s Encrypt Authority X3”. Das andere Zwischenzerttifikat, “Let’s Encrypt Authority X4”,
ist reserviert für Notfallwiederherstellung und wird nur benutzt, wenn wir die Kontrolle
über “Let’s Encrypt Authority X3” verloren haben. Die X1 und X2 Zwischenzertfikate waren
unsere erste Generation von Zwischenzertifikaten. Wir haben sie mit neuen Zwischenzertifikaten
ersetzt, die mehr kompatibel mit Windows XP waren.

* Aktiv
  * [Let's Encrypt Authority X3 (IdenTrust cross-signed)](/certs/lets-encrypt-x3-cross-signed.pem.txt)
    * [Let's Encrypt Authority X3 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx3.pem.txt)
* Reserve
  * [Let's Encrypt Authority X4 (IdenTrust cross-signed)](/certs/lets-encrypt-x4-cross-signed.pem.txt)
    * [Let's Encrypt Authority X4 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx4.pem.txt)
* Ausser Betrieb
  * [Let's Encrypt Authority X2 (IdenTrust cross-signed)](/certs/lets-encrypt-x2-cross-signed.pem.txt)
    * [Let's Encrypt Authority X2 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx2.pem.txt)
  * [Let's Encrypt Authority X1 (IdenTrust cross-signed)](/certs/lets-encrypt-x1-cross-signed.pem.txt)
    * [Let's Encrypt Authority X1 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx1.pem.txt)

# Quersignierung

Unser Zwischenzertifikat “Let’s Encrypt Authority X3” repräsentiert ein einfaches
öffentlich/privates Schlüsselpaar. Der private Schlüssel generiert die Signatur
für alle Endzertifikate (auch bekannt als Leaf Zertifikate), z.B. die
Zertifikate, die wir für Ihren Server ausstellen.

Unser Zwischenzertifikat ist signiert von ISRG Root X1. Jedoch, da wir eine
recht neue Zertifizierungsstelle sind, ist ISRG Root X1 in den meisten Browsern
nicht vertrauenswürdig. Um eine breitere Sicherheit zu erreichen, ist unser
Zwischenzertifikat bei einer anderen Zertifizierungsstelle quersigniert, IdenTrust,
dessen Root Zertifikat in allen Browsern vertrauenswürdig ist. IdenTrust hat
unser Zwischenzertifikat quersigniert mit [DST Root CA X3](https://www.identrust.com/certificates/trustid/root-download-x3.html).

Das bedeutet, dass zwei Zertifikate verfügbar sind, die unsere Zwischenzertifikate
repräsentieren. Eines ist von DST Root CA X3 signiert und das andere von ISRG Root X1.
Der einfachste Weg, die zwei zu unterscheiden, ist in das Issuer Feld zu schauen.

Wenn ein Webserver konfiguriert wird, konfiguriert der Serveradministrator nicht nur
das Endkundenzertifikat, sondern auch eine Liste von Zwischenzertifikaten, um es
Browsern eine Verifizierung der Kette vom Endkundenzertifikat bis zum Root Zertifikat
zu ermöglichen. 
Fast alle Serverbetreiber wählen eine Kette incl. Zwischenzertifikat mit Subjekt
“Let’s Encrypt Authority X3” und Aussteller “DST Root CA X3.” Die empfohlene
Let's Encrypt software, [Certbot](https://certbot.org), wird die Konfiguration
nahtlos erstellen,

Das folgende Bild erklärt die Beziehungen zwischen unseren Zertifikaten:

<img src="/certs/isrg-keys.png" alt="ISRG Key relationship diagram">

# OCSP Signiertes Zertifikat

Dieses Zertifikat wird benutzt zum Signieren von OCSP Anfragen für die
Let's Encrypt Authority Zwischenzertifikate, sodass wir den Root Schlüssel
nicht zum Signieren online bringen müssen. Eine Kopie dieses Zertifikats
ist automatisch in der OCSP Anfrage inkludiert, sodass Abonnenten nichts
weiter tun müssen. Für informelle Zwecke ist es hier inkludiert.

* [ISRG Root OCSP X1 (Signiert von ISRG Root X1)](/certs/isrg-root-ocsp-x1.pem.txt)

# Zertifikattransparenz

Wir entschieden uns für Transparenz in unserem Betrieb und in den Zertifikaten,
die wir ausgestellt haben. Wir haben alle Zertifikate, die wir ausgestellt haben, zu
[Certificate Transparency logs](https://www.certificate-transparency.org/)
hochgeladen. Sie können sich alle Zertifikate, die von Let's Encrypt ausgestellt sind,
mit diesen Links ansehen:

* [Ausgestellt bei Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Ausgestellt bei Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)

# Mehr Informationen

Die privaten Schlüssel für die ISRG Root CA und die Let’s Encrypt Zwischenzertifikat
CA sind auf Hardware Sicherheitsmodulen (HSM) gespeichert, welche einen hohen
Grad an Schutz gegen Diebstahl der Schlüssel bieten.

Alle ISRG Schlüssel sind derzeit RSA Schlüssel. Wir [planen die Umstellung auf ECDSA Schlüssels](/de/upcoming-features/).
