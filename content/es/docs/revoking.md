---
title: Revocar un certificado
slug: revoking
top_graphic: 1
date: 2017-06-08
lastmod: 2017-06-08
---

{{< lastmod >}}

Cuando la clave privada correspondiente de un certificado ya no es segura, debe revocar el certificado. Esto puede suceder por diferentes razones. Por ejemplo, podría compartir accidentalmente la clave privada en un sitio web público, los piratas informáticos pueden copiar la clave privada de sus servidores o los piratas informáticos pueden tomar el control temporal de sus servidores o su configuración de DNS y usarlo para validar y emitir un certificado para el que poseen la clave privada.

Cuando revoca un certificado emitido por Let's Encrypt, Let's Encrypt publicará esa información de revocación a través del Protocolo de estado del certificado en línea [Online Certificate Status Protocol(OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol), algunos navegadores verificarán en un servidor OCSP para ver si deben confiar en el certificado. Tenga en cuenta que OCSP [tiene algunos problemas fundamentales](https://www.imperialviolet.org/2011/03/18/revocation.html), por lo que NO todos los navegadores harán esta comprobación. Aún así, revocar certificados que corresponden a claves privadas comprometidas es una práctica importante y es requerido por el [Acuerdo de Suscriptor]({{<relref "/repository.md">}}) de Let's Encrypt.

Para revocar un certificado con Let's Encrypt, utilizará el [API ACME](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md), probablemente a través de un cliente ACME como [Certbot](https://certbot.eff.org/).
Deberá demostrar a Let's Encrypt que está autorizado para revocar el certificado. Hay tres maneras de hacer esto:

# Desde la cuenta para la que se emitió el certificado

Si originalmente emitió el certificado y aún tiene el control de la cuenta que utilizó para emitirlo, puede revocarlo utilizando las credenciales de su cuenta. Certbot intentará esto por defecto. Ejemplo:

```
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem
```

# Usando la clave privada del certificado

Si originalmente no emitió el certificado, pero tiene una copia de la clave privada correspondiente, puede revocarla utilizando esa clave privada para firmar la solicitud de revocación. Por ejemplo, si ve que una clave privada se ha hecho pública accidentalmente, puede usar este método para revocar los certificados que usaron esa clave privada, incluso si usted no es la persona que emitió originalmente esos certificados.

Para usar este método, primero deberá descargar el certificado que se revocará. Let's Encrypt almacena los certificados en [Certificate Transparency](https://www.certificate-transparency.org/), para que pueda buscar y descargar los certificados desde un monitor de registro como puede ser [crt.sh](https://crt.sh/).

También necesitará una copia de la clave privada en formato PEM. Una vez que tenga ambos, puede revocar el certificado de la siguiente manera:

```
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/key.pem
```

# Usar una cuenta autorizada diferente

Si alguien emitió un certificado después de comprometer su host o su DNS, querrá revocar ese certificado una vez que recupere el control. Para revocar el certificado, Let's Encrypt deberá asegurarse de que controle los nombres de dominio en ese certificado (de lo contrario, las personas podrían revocar los certificados de los demás sin permiso)!. Para validar este control, Let's Encrypt utiliza los mismos métodos que utiliza para validar el control para la emisión: puede poner un [valor en un registro DNS tipo TXT](https://ietf-wg-acme.github.io/acme/#rfc.section.8.5),
poner un [archivo en el servidor HTTP](https://ietf-wg-acme.github.io/acme/#rfc.section.8.3),
u ofrecer un [Certificado TLS Especial](https://ietf-wg-acme.github.io/acme/#rfc.section.8.4).
Por lo general, un cliente ACME se encargará de esto por usted. Tenga en cuenta que la mayoría de los clientes de ACME combinan validación y emisión, por lo que la única forma de solicitar validaciones es intentar la emisión. Luego puede revocar el certificado resultante si no lo desea, o simplemente destruir la clave privada. Si desea evitar la emisión de un certificado, puede incluir un nombre de dominio inexistente en su línea de comando, lo que hará que la emisión falle y al mismo tiempo valide los otros nombres de dominio existentes. Para hacer esto, ejecute:

```
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

Y sigua las instrucciones. Si prefiere validar usando HTTP en lugar de DNS, reemplace el banderin `--preferred-challenges=dns` por este otro `--preferred-challenges=http`.

Una vez que haya validado el control de todos los nombres de dominio en el certificado que desea revocar, puede descargar el certificado desde [crt.sh](https://crt.sh/), luego proceda a revocar el certificado como si lo hubiera emitido:

```
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem
```
