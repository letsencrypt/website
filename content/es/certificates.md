---
title: Cadena de Confianza
slug: certificates
top_graphic: 5
aliases: [/certs]
---

# Certificados Ra&iacute;z

Nuestras ra&iacute;ces son seguramente mantenidas "offline". We issue end-entity certificates to subscribers from the intermediates in the next section.

* Activo
  * [ISRG Root X1 (autofirmado)](/certs/isrgrootx1.pem.txt)

Hemos configurado p&aacute;ginas de web para probar certificados encadenados a nuestras ra&iacute;ces.

* Certificado V&aacute;lido ISRG Root X1
  * [https://valid-isrgrootx1.letsencrypt.org/](https://valid-isrgrootx1.letsencrypt.org/)
* Certificado Revocado ISRG Root X1
  * [https://revoked-isrgrootx1.letsencrypt.org/](https://revoked-isrgrootx1.letsencrypt.org/)
* Certificado Expirado ISRG Root X1 
  * [https://expired-isrgrootx1.letsencrypt.org/](https://expired-isrgrootx1.letsencrypt.org/)

# Certificados Intermediarios

IdenTrust ha firmado (firma cruzada, *cross-signed* en ingl&eacute;s) nuestros intermediarios. Esto permite que nuestros certificados de fin sean aceptados por todos los navegadores grandes mientras nosotros propagamos nuestra propia ra&iacute;z.

Bajo circunstancias normales, certificados emitidos por Let's Encrypt vendran de "Let's Encrypt Authority X3". El otro intermediario, "Let's Encrypt Authority X4", est&aacute; reservado para recuperaci&oacute;n de desastre y solo se usar&aacute; si perdemos la abilidad de emitr con "Let's Encrypt Authority X3". Los intermediarios X1 y X2 fueron nuestra primera generaci&oacute; de intermediarios. Los hemos reemplazado con intermediarios que son m&aacute;s compatibles con Windows XP.

* Activo
  * [Let's Encrypt Authority X3 (Firmado por IdenTrust)](/certs/lets-encrypt-x3-cross-signed.pem.txt)
    * [Let's Encrypt Authority X3 (Firmado por ISRG Root X1)](/certs/letsencryptauthorityx3.pem.txt)
* Reserva
  * [Let's Encrypt Authority X4 (Firmado por IdenTrust)](/certs/lets-encrypt-x4-cross-signed.pem.txt)
    * [Let's Encrypt Authority X4 (Firmado por ISRG Root X1)](/certs/letsencryptauthorityx4.pem.txt)
* Retirados
  * [Let's Encrypt Authority X2 (Firmado por IdenTrust)](/certs/lets-encrypt-x2-cross-signed.pem.txt)
    * [Let's Encrypt Authority X2 (Firmado por ISRG Root X1)](/certs/letsencryptauthorityx2.pem.txt)
  * [Let's Encrypt Authority X1 (Firmado por IdenTrust)](/certs/lets-encrypt-x1-cross-signed.pem.txt)
    * [Let's Encrypt Authority X1 (Firmado por ISRG Root X1)](/certs/letsencryptauthorityx1.pem.txt)

# Firma cruzada

Our intermediate “Let’s Encrypt Authority X3” represents a single public/private
key pair. The private key of that pair generates the signature for all end-entity
certificates (also known as leaf certificates), i.e. the certificates we issue
for use on your server.

Our intermediate is signed by ISRG Root X1. However, since we are a very new
certificate authority, ISRG Root X1 is not yet trusted in most browsers. In
order to be broadly trusted right away, our intermediate is also cross-signed by
another certificate authority, IdenTrust, whose root is already trusted in all
major browsers. Specifically, IdenTrust has cross-signed our intermediate using their
[DST Root CA X3](https://www.identrust.com/certificates/trustid/root-download-x3.html).

That means there are two certificates available that both represent our
intermediate. One is signed by DST Root CA X3, and the other is signed by ISRG
Root X1. The easiest way to distinguish the two is by looking at their Issuer field.

When configuring a web server, the server operator configures not only the
end-entity certificate, but also a list of intermediates to help browsers verify
that the end-entity certificate has a trust chain leading to a trusted root
certificate. Almost all server operators will choose to serve a chain including
the intermediate certificate with Subject “Let’s Encrypt Authority X3” and
Issuer “DST Root CA X3.” The recommended Let's Encrypt software,
[Certbot](https://certbot.org), will make this configuration seamlessly.

The following picture explains the relationships between our certificates
visually:

<img src="/certs/isrg-keys.png" alt="ISRG Key relationship diagram">

# OCSP Signing Certificate

This certificate is used to sign OCSP responses for the Let's Encrypt Authority
intermediates, so that we don't need to bring the root key online in order to
sign those responses. A copy of this certificate is included automatically in
those OCSP responses, so Subscribers don't need to do anything with it. It is
included here for informational purposes only.

* [ISRG Root OCSP X1 (Firmado por ISRG Root X1)](/certs/isrg-root-ocsp-x1.pem.txt)

# Certificate Transparency

We are dedicated to transparency in our operations and in the certificates we
issue. We submit all certificates to [Certificate Transparency
logs](https://www.certificate-transparency.org/) as we issue them. You can view all
issued Let's Encrypt certificates via these links:

* [Emitido por Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Emitido por Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)

# M&aacute;s Informaci&oacute;n

Las llaves privadas para el AC ra&iacute;z ISRG y los AC intermediarios Let's Encrypt son almacenadas en m&oacute;dulos de seguridad de hardware (HSMs por sus siglas en ingl&eacute;s), lo que provee un alto grado de protecci&oacute; contra el robo de las llaves.

Todas las llaves ISRG son llaves RSA actualmente. Estamos [planeando generar llaves ECDSA](/es/upcoming-features/).
