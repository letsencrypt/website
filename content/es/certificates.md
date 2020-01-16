---
title: Cadena de Confianza
linkTitle: Cadena de Confianza (Certificados Raíz e Intermedios)
slug: certificates
top_graphic: 5
lastmod: 2018-09-20
---

{{< lastmod >}}

# Certificados Raíz

Nuestras raíces son seguramente mantenidas "offline". Emitimos certificados de entidad final a subscriptores de los siguientes intermedios.

* Activo
  * [ISRG Root X1 (autofirmado)](/certs/isrgrootx1.pem.txt)

Hemos configurado sitios web para probar certificados encadenados a nuestras raíces.

* Certificado Válido ISRG Root X1
  * [https://valid-isrgrootx1.letsencrypt.org/](https://valid-isrgrootx1.letsencrypt.org/)
* Certificado Revocado ISRG Root X1
  * [https://revoked-isrgrootx1.letsencrypt.org/](https://revoked-isrgrootx1.letsencrypt.org/)
* Certificado Expirado ISRG Root X1 
  * [https://expired-isrgrootx1.letsencrypt.org/](https://expired-isrgrootx1.letsencrypt.org/)

# Certificados Intermedios

IdenTrust ha firmado (firma cruzada, *cross-signed* en inglés) nuestros intermedios. Esto permite que nuestros certificados de fin sean aceptados por todos los navegadores grandes mientras propagamos nuestra propia raíz.

Bajo circunstancias normales, certificados emitidos por Let's Encrypt vendran de "Let's Encrypt Authority X3". El otro intermediario, "Let's Encrypt Authority X4", está reservado para recuperación de desastre y solo se usará si perdemos la abilidad de emitr con "Let's Encrypt Authority X3". Los intermedios X1 y X2 fueron nuestra primera generación de intermedios. Los hemos reemplazado con intermedios que son más compatibles con Windows XP.

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

Nuestro intermedio "Let's Encrypy Authority X3" representa un solo par de llaves publicas/privadas.
La llave privada de ese par genera la firma para todo certificado de entidad final (también conocidos
como certificados "leaf"), i.e. los certificados que emitimos para uso en tu servidor.

Nuestro intermedio es firmado por ISRG Root X1. Sin embargo, ya que somos una autoridad de certificación
muy nueva, ISRG Root X1 aún no es confiado en la mayoría de los navegadores.
A fin de que seamos ampliamente confiados de inmediato, nuestro intermedio es *cross-signed* por otra autoridad
de certificación, IdenTrust, cuya raíz ya está confiada en todos los navegadores.
Especificamente, IdenTrust ha *cross-signed* nuestro intermedio usando su "DST Root CA X3" (ahora llamado "TrustID X3 Root"). [Descarga "TrustID X3 Root" en identrust.com](https://www.identrust.com/support/downloads) (o, alternativamente, puedes descargar una copia aquí: [.pem](https://letsencrypt.org/certs/trustid-x3-root.pem.txt), [.p7b](https://letsencrypt.org/certs/trustid-x3-root.p7b)).

Eso significa que hay dos certificados disponibles que ambos representan nuestro
intermedio. Uno es firmado por DST Root CA X3, y el otro es firmado por ISRG Root X1.
La forma más fácil de distinguirlos es mirando el campo de tu Emisor.

Al configurar un servidor web, el operador del servidor configura no solamente
los certificados de entidad final, sino una lista de intermedios para ayudar los navegadores
verificar que los certificados de entidad final tengan una cadena confiada llevando a un
certificado raíz confiado. Casi todos los operadores de servidor eligirán servir
una cadena incluyendo certificados intermedio con Tema "Let's Encrypt Authority X3" y Emisor "DST Root CA X3".
El software recomendado por Let's Encrypt, [Certbot](https://certbot.org), hará esta
configuración perfectamente.

La siguiente imagen explica visualmente las relaciones entre nuestros certificados:

<img src="/certs/isrg-keys.png" alt="ISRG Key relationship diagram">

# Certificado firma OCSP

Este certificado es usado para firmar respuestas OCSP para los intermedios de la Autoridad
Let's Encrypt, para que no tengamos que la llave raíz en línea para firmar estas
respuestas. Una copia de este certificado es incluido automáticamente in esas
respuestas OCSP, por lo que Subscriptores no tienen que hacer nada con él. Es incluido aquí
solo para fines informativos.

* [ISRG Root OCSP X1 (Firmado por ISRG Root X1)](/certs/isrg-root-ocsp-x1.pem.txt)

# Certificate Transparency

Estamos dedicados a la transperencia en nuestras operaciones y en los certificados que emitimos.
Sometemos todos nuestros certificados a registros [Certificate Transperancy](https://www.certificate-transparency.org/)
cuando lo emitimos. Puedes ver todos los certificados Let's Encrypt emitidos mediante estos enlaces:

* [Emitido por Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Emitido por Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)

# Más Información

Las llaves privadas para el AC raíz ISRG y los AC intermedios Let's Encrypt son almacenadas en módulos de seguridad de hardware (HSMs por sus siglas en inglés), lo que provee un alto grado de protecció contra el robo de las llaves.

Todas las llaves ISRG son llaves RSA actualmente. Estamos [planeando generar llaves ECDSA]({{< relref "/upcoming-features.md" >}}).
