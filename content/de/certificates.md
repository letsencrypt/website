---
title: Vertrauenskette
linkTitle: Vertrauenskette (Root- und Intermediate-Zertifikate)
slug: certificates
top_graphic: 5
lastmod: 2020-12-08
---

{{< lastmod >}}

[![ISRG-Zertifikatshierarchiediagramm, Stand Dezember 2020](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

# Wurzelzertifikate (Root-Zertifikate)

Unsere Wurzelzertifikate (Root-Zertifikate) werden sicher, vom Internet getrennt, aufbewahrt. Wir stellen Anwenderzertifikate aus, welche durch die in dem folgenden Abschnitt beschriebenen Zwischenzertifikate (Intermediate-Zertifikate) signiert wurden. Während wir unsere neue Root X2 verschiedenen Root-Programmen vorlegen, haben wir sie für zusätzliche Kompatibilität mit Root X2 quersigniert ("cross-signed").

* Aktiv
  * ISRG Root X1 (`RSA 4096, O = Internet Security Research Group, CN = ISRG Root X1`)
    * [Selbst-signiert](https://crt.sh/?id=9314791): [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
* Zukünftig
  * ISRG Root X2 (`ECDSA P-384, O = Internet Security Research Group, CN = ISRG Root X2`)
    * [Selbst-signiert](https://crt.sh/?id=3335562555): [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
    * [Quersigniert durch ISRG Root X1](https://crt.sh/?id=3334561878): [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)

Wir haben Webseiten zum Testen der Zertifikatsketten zu unseren aktiven Root-Zertifikaten erstellt.

* ISRG Root X1
  * [Gültig](https://valid-isrgrootx1.letsencrypt.org/)
  * [Widerrufen](https://revoked-isrgrootx1.letsencrypt.org/)
  * [Abgelaufen](https://expired-isrgrootx1.letsencrypt.org/)

# Zwischenzertifikate (Intermediate-Zertifikate)

Unter normalen Umständen kommen Zertifikate, die von Let’s Encrypt ausgestellt worden, von R3, einem RSA-Zwischenzertifikat. Wir haben auch ein neues ECDSA-Zwischenzertifikat ("E1") ausgestellt, mit welchem wir in Kürze ebenfalls signieren werden. Diese Seite wird aktualisiert, sobald die Umsetzung abgeschlossen wurde.

Unsere anderen Zwischenzertifikate ("R4" und "E2") sind für die Notfallwiederherstellung (Disaster-Recovery) vorgesehen und werden nur genutzt, wenn wir die Möglichkeit verlieren mit unseren primären Zwischenzertifikaten zu signieren. Wir nutzen die X1-, X2-, X3-, und X4-Zwischenzertifikate nicht mehr.

IdenTrust hat unsere RSA-Zwischenzertifikate für zusätzliche Kompatibilität quersigniert.

* Aktiv
  * Let's Encrypt R3 (`RSA 2048, O = Let's Encrypt, CN = R3`)
    * [Signiert durch ISRG Root X1](https://crt.sh/?id=3334561879): [der](/certs/lets-encrypt-r3.der), [pem](/certs/lets-encrypt-r3.pem), [txt](/certs/lets-encrypt-r3.txt)
    * [Quersigniert durch IdenTrust](https://crt.sh/?id=3479778542): [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt)
* Zukünftig
  * Let's Encrypt E1 (`ECDSA P-384, O = Let's Encrypt, CN = E1`)
    * [Signiert durch ISRG Root X2](https://crt.sh/?id=3334671964): [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem), [txt](/certs/lets-encrypt-e1.txt)
* Reserviert für Disaster-Recovery
  * Let's Encrypt R4 (`RSA 2048, O = Let's Encrypt, CN = R4`)
    * [Signiert durch ISRG Root X1](https://crt.sh/?id=3334561877): [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
    * [Cross-signiert durch IdenTrust](https://crt.sh/?id=3479778543): [der](/certs/lets-encrypt-r4-cross-signed.der), [pem](/certs/lets-encrypt-r4-cross-signed.pem), [txt](/certs/lets-encrypt-r4-cross-signed.txt)
  * Let's Encrypt E2 (`ECDSA P-384, O = Let's Encrypt, CN = E2`)
    * [Signiert durch ISRG Root X2](https://crt.sh/?id=3334671963): [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)
* Außer Betrieb
  * Let's Encrypt Authority X1 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X1`)
    * [Signiert durch ISRG Root X1](https://crt.sh/?id=9314792): [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
    * [Quersigniert durch IdenTrust](https://crt.sh/?id=10235198): [der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
  * Let's Encrypt Authority X2 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X2`)
    * [Signiert durch ISRG Root X1](https://crt.sh/?id=12721505): [der](/certs/letsencryptauthorityx2.der), [pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
    * [Quersigniert von IdenTrust](https://crt.sh/?id=10970235): [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)
  * Let's Encrypt Authority X3 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X3`)
    * [Signiert durch ISRG Root X1](https://crt.sh/?id=47997543): [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
    * [Quersigniert durch IdenTrust](https://crt.sh/?id=15706126): [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
  * Let's Encrypt Authority X4 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X4`)
    * [Signiert durch ISRG Root X1](https://crt.sh/?id=47997546): [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
    * [Quersigniert durch IdenTrust](https://crt.sh/?id=15710291): [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)

# Quersignaturen (Cross-Signaturen)

Jedes unserer Zwischenzertifikate besteht aus einem einzelnen Schlüsselpaar (öffentlich und privat, public / private). Der private Schlüssel generiert die Signatur für alle Anwenderzertifikate (auch bekannt als "Leaf"-Zertifikate), z. B. die Zertifikate, die wir für Ihren Server ausstellen.

Unsere RSA-Zwischenzertifikate (intermediate-Zertifikate) sind signiert durch ISRG Root X1. Dem ISRG Wurzelzertifikat (Root-Zertifikat) wird breitflächig vertraut, aber unsere RSA-Zwischenzertifikate werden immer noch durch IdenTrusts "[DST Root CA X3](https://crt.sh/?id=8395)" (heute "TrustID X3 Root") signiert um eine zusätzliche Kompatibilität zu erreichen. Das IdenTrust Wurzelzertifikat ist schon seit längerer Zeit gültig und hat daher eine höhere Kompatibilität mit älteren Geräten und Betriebssystemen (z. B. Windows XP und Android 7). Sie können ["TrustID X3 Root" von IdenTrust herunterladen](https://www.identrust.com/support/downloads) (oder alternativ können Sie [eine Kopie von uns herunterladen](/certs/trustid-x3-root.pem.txt)).

Cross-signieren bedeutet, dass jedes unserer RSA-Zwischenzertifikate zwei öffentliche Schlüssel hat, die beide für den selben privaten Schlüssel gelten. Einer ist durch DST Root CA X3 signiert und der andere durch ISRG Root X1. Der einfachste Weg, die zwei zu unterscheiden, ist in das Aussteller-Feld (Issuer-Feld) zu schauen.

Wenn ein Webserver konfiguriert wird, konfiguriert der Serverbetreiber nicht nur das Anwenderzertifikat, sondern auch eine Liste von Zwischenzertifikaten, um den Browsern eine Verifizierung der Vertrauenskette vom Anwenderzertifikat bis zum vertrauten Wurzelzertifikat zu vereinfachen. Fast alle Serverbetreiber werden eine Zertifikatskette mit dem Zwischenzertifikat "R3" und dem Aussteller "DST Root CA X3" auswählen. Die empfohlene Let's Encrypt Software, [Certbot](https://certbot.org), wird diese Konfiguration nahtlos vornehmen.

# OCSP-Signaturzertifikat

Dieses Zertifikat wird benutzt um OCSP-Antworten für die Let's Encrypt Authority Zwischenzertifikate zu signieren, damit wir das Wurzelzertifikat (Root-Zertifikat) nicht dafür online halten müssen. Eine Kopie dieses Zertifikats ist automatisch in jeder OCSP-Antwort enthalten, sodass Nutzer nichts weiter tun müssen. Es ist hier nur zu Informationszwecken enthalten.

* ISRG Root OCSP X1 ([Signiert durch ISRG Root X1](https://crt.sh/?id=2929281974)): [der](/certs/isrg-root-ocsp-x1.der), [pem](/certs/isrg-root-ocsp-x1.pem), [txt](/certs/isrg-root-ocsp-x1.txt)

Unsere neuen Zwischenzeritfikate haben keine OCSP URLs (ihre Widerrufsinformation wird stattdessen als CRL bereitgestellt), weshalb wir kein OCSP-Signaturzertifikat durch ISRG Root X2 erstellt haben.

# Certificate Transparency

Wir haben uns der Transparenz in unserem Betrieb und in den Zertifikaten, die wir ausstellen, verschrieben. Wir übermitteln alle Zertifikate an die [Certificate Transparency logs](https://www.certificate-transparency.org/), noch während wir sie ausstellen. Sie können sich alle Zertifikate, die von Let's Encrypt ausgestellt wurden, mit diesen Links ansehen:

* [Ausgestellt durch Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Ausgestellt durch Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)
* [Ausgestellt durch E1](https://crt.sh/?Identity=%25&iCAID=183283)
* [Ausgestellt durch R3](https://crt.sh/?Identity=%25&iCAID=183267)
