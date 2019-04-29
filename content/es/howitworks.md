---
title: Comenzando
slug: getting-started
top_graphic: 3
---

Para habilitar HTTPS en tu p&aacute;gina de web, tienes que obtener un certificado (un tipo de archivo) de una Autoridad de Certificaci&oacute;n (AC, o CA por sus siglas en ingl&eacute;s). Let's Encrypt es un AC. Para obtener un certificado para tu dominio de sitio web de Let's Encrypt, tienes que demonstrar control sobre ese dominio. Con Let's Encrypt, puedes hacer esto con software que usa el [protocolo ACME](https://ietf-wg-acme.github.io/acme/), el cual t&iacute;picamente corre en tu hospedeja de web.

Para averiguar cu&aacute;l m&eacute;todo funcionar&aacute; mejor para ti, tendr&aacute;s que saber si tienes [acceso shell](https://en.wikipedia.org/wiki/Shell_account) (tambi&eacute;n conocido como acceso SSH) a tu hospedaje de web. Si manejas tu sitio web enteramente mediante un panel de control como [cPanel](https://cpanel.com/), [Plesk](https://www.plesk.com/), o [WordPress](https://wordpress.org/), hay una buena posibilidad que no tienes acceso shell. Puedes preguntarle a tu proveedor de hospedaje para estar seguro.

# Con Acceso Shell

Recomendamos que la mayor&iacute;a de las personas con *acceso shell* usen el cliente ACME llamado [Certbot]. &Eacute;ste puede automatizar la emisi&oacute;n e instalaci&oacute;n de certificados con cero tiempo de inactivdad. Tambi&eacute;n tiene modos de expertos para personas que no quieren autoconfiguraci&oacute;n. Es f&aacute;cil de usar, funciona en muchos sistemas operativos, y tiene documentaci&oacute;n genial. [Visita la p&aacute;gina web de Certbot][Certbot] para conseguir instrucciones para tu sistema operativo y servidor de web.

Si [Certbot] no cumple con tus necesidades, o quisieras tratar otra cosa, [hay muchos otros clientes ACME para escoger](/docs/client-options/). Una vez hayas escogido un cliente ACME, ve la documentaci&oacute;n para ese cliente para proceder.

Si est&aacute;s experimentando con diferentes clientes ACME, usa nuestro [ambiente de *staging*](/docs/staging-environment/) para evitar que llegues a nuestros [limites de tarifa](/docs/rate-limits/).

[Certbot]: https://certbot.eff.org/  "Certbot"

# Sin Acceso Shell

La mejor forma de utilizar Let's Encrypt sin acceso *shell* es usando el soporte incorporado
de tu proveedor de hospedaje. Si tu proveedor de hospedaje ofrece soporte para Let's Encrypt,
pueden solicitar un certificado gratis en su nombre, instalarlo, y mantenerlo actualizado
autom&aacute;ticamente. Para algunos proveedores de hospedaje, esto es un ajuste de configuraci&oacute;n
que tienes que prender. Otros proveedores automaticamente solicitan e instalan certificados para
todos sus clientes.

[Revisa nuestra lista de proveedores de hospedaje](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920)
para ver si el tuyo est&aacute; en ella. Si lo est&aacute;, sigue su documentaci&oacute;n para configurar tu 
certificado de Let's Encrypt.

Si tu proveedor de hospedaje no tiene soporte para Let's Encrypt, puedes contactarlos para que lo soporten. Hacemos lo mejor que podemos para hacer f&aacute;cil a&ntilde;adir soporte para Let's Encrypt, y &iexcl;proveedores suelen estar felices de escuchar sugerencias de clientes!

Si tu proveedor de hospedaje no quiere integrar Let's Encrypt, pero s&iacute; tiene soporte
para subir certificados *custom*, puedes instalar Certbot en tu propia computadora y usarlo en [modo manual](https://certbot.eff.org/docs/using.html#manual). En modo manual, tu subes un archivo espec&iacute;fico a tu
sitio web para probar tu control. Certbot recuperar&aacute; un certificado que tu puedes subir a tu proveedor de hospedaje. No recomendamos esta opci&oacute;n porque es un contratiempo y necesitaras repetirlo varias veces durante el a&ntilde;o cuando tu certificado expira. Para la mayor&iacute;a de las personas es mejor solicitar soporte para Let's Encrypt de su proveedor de hospedaje, o cambiar de proveedor si no tienen planes de implementarlo.

# Obteniendo Ayuda

Si tienes preguntas sobre la selecci&oacute;n de clientes ACME, o sobre como usar un cliente en particular, or cualquier otra cosa relacionada a Let's Encrypt, por favor trata nuestros [foros comunitarios](https://community.letsencrypt.org/).
