---
title: Comenzando
slug: getting-started
top_graphic: 3
date: 2018-04-12
---

Para habilitar HTTPS en tu página de web, tienes que obtener un certificado (un tipo de archivo) de una Autoridad de Certificación (AC, o CA por sus siglas en inglés). Let's Encrypt es una AC. Para obtener un certificado para tu dominio de sitio web de Let's Encrypt, tienes que demonstrar control sobre ese dominio. Con Let's Encrypt, puedes hacer esto con software que usa el [protocolo ACME](https://ietf-wg-acme.github.io/acme/), el cual típicamente corre en tu hospedaje de web.

Para averiguar cuál método funcionará mejor para ti, tendrás que saber si tienes [acceso shell](https://en.wikipedia.org/wiki/Shell_account) (también conocido como acceso SSH) a tu hospedaje de web. Si manejas tu sitio web enteramente mediante un panel de control como [cPanel](https://cpanel.com/), [Plesk](https://www.plesk.com/), o [WordPress](https://wordpress.org/), hay una buena posibilidad que no tienes acceso shell. Puedes preguntarle a tu proveedor de hospedaje para estar seguro.

# Con Acceso Shell

Recomendamos que la mayoría de las personas con *acceso shell* usen el cliente ACME llamado [Certbot]. Éste puede automatizar la emisión e instalación de certificados con cero tiempo de inactivdad. También tiene modos de expertos para personas que no quieren autoconfiguración. Es fácil de usar, funciona en muchos sistemas operativos, y tiene documentación genial. [Visita la página web de Certbot][Certbot] para conseguir instrucciones para tu sistema operativo y servidor de web.

Si [Certbot] no cumple con tus necesidades, o quisieras tratar otra cosa, [hay muchos otros clientes ACME para escoger]({{< relref "/docs/client-options.md" >}}). Una vez hayas escogido un cliente ACME, ve la documentación para ese cliente para proceder.

Si estás experimentando con diferentes clientes ACME, usa nuestro [ambiente de *staging*]({{< relref "/docs/staging-environment.md" >}}) para evitar que llegues a nuestros [limites de tarifa]({{< relref "/docs/rate-limits.md" >}}).

[Certbot]: https://certbot.eff.org/  "Certbot"

# Sin Acceso Shell

La mejor forma de utilizar Let's Encrypt sin acceso *shell* es usando el soporte incorporado
de tu proveedor de hospedaje. Si tu proveedor de hospedaje ofrece soporte para Let's Encrypt,
pueden solicitar un certificado gratis en su nombre, instalarlo, y mantenerlo actualizado
automáticamente. Para algunos proveedores de hospedaje, esto es un ajuste de configuración
que tienes que prender. Otros proveedores automaticamente solicitan e instalan certificados para
todos sus clientes.

[Revisa nuestra lista de proveedores de hospedaje](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920)
para ver si el tuyo está en ella. Si lo está, sigue su documentación para configurar tu
certificado de Let's Encrypt.

Si tu proveedor de hospedaje no tiene soporte para Let's Encrypt, puedes contactarlos para que lo soporten. Hacemos lo mejor que podemos para hacer fácil añadir soporte para Let's Encrypt, !y proveedores suelen estar felices de escuchar sugerencias de clientes!

Si tu proveedor de hospedaje no quiere integrar Let's Encrypt, pero sí tiene soporte
para subir certificados *custom*, puedes instalar Certbot en tu propia computadora y usarlo en [modo manual](https://certbot.eff.org/docs/using.html#manual). En modo manual, tu subes un archivo específico a tu
sitio web para probar tu control. Certbot recuperará un certificado que tu puedes subir a tu proveedor de hospedaje. No recomendamos esta opción porque es un contratiempo y necesitaras repetirlo varias veces durante el año cuando tu certificado expira. Para la mayoría de las personas es mejor solicitar soporte para Let's Encrypt de su proveedor de hospedaje, o cambiar de proveedor si no tienen planes de implementarlo.

# Obteniendo Ayuda

Si tienes preguntas sobre la selección de clientes ACME, o sobre como usar un cliente en particular, or cualquier otra cosa relacionada a Let's Encrypt, por favor trata nuestros [foros comunitarios](https://community.letsencrypt.org/).
