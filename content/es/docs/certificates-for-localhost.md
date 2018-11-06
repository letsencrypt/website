---
title: Certificados para localhost
permalink: /docs/certificates-for-localhost
top_graphic: 1
date: 2017-12-21
lastmod: 2017-12-21
---

{{< lastmod >}}

A veces personas desean obtener un certificado para el nombre de equipo "localhost",
ya sea para uso en desarrollo local, o para distribuci&oacute;n con una aplicaci&oacute;n
nativa que necesita comunicarse con una aplicaci&oacute; web. Let's Encrypt no puede
proveer certificados para "localhost" porque nadie lo posee de forma &uacute;nica, y no es
enraizado en un dominio de de nivel superior como ".com" &oacute; ".net". Es posible configurar
tu propio nombre de dominio que se resuelve en 127.0.0.1 y obtener un certificado usando el reto DNS.
Sin embargo, esto es generalmente una mala idea y hay mejores opciones.

# Para desarrollo local

Si est&aacute; desarrollando una aplicaci&oacute;n web, es &uacute;til correr un servidor
web local como Apache &oacute; Nginx, y acceder a &eacute;l a trav&eacute;s de http://localhost:8000
en tu navegador de web. Sin embargo, navegadores de web se comportan sutilmente diferentes en p&aacute;ginas HTTP vs. HTTPS.
La diferencia principal: En una p&aacute;gina HTTPS, cualquier petici&oacute;n para cargar JavaScript de un URL HTTP ser&aacute;
bloqueada. As&iacute; que si est&aacute;s desarrollando localmente usando HTTP,
podr&iacute;as agregar un *script tag* que funcione bien en tu m&aacute;quina de desarrollo,
pero se rompe cuando desplegas a tu sitio de producci&oacute;n HTTPS. Para capturar este tipo de problema,
es &uacute;til configurar HTTPS en tu servidor de web local. Sin embargo, no quieres ver la advertencia de certificado en tu servidor de web local. &iquest;C&oacute;mo se obtiene localmente el candado verde?

La mejor opci&oacute;n: Genera tu propio certificado, ya sea autofirmado &oacute; firmado por una ra&iacute;z local, y confiarla en el almac&eacute;n de confianza de tu sistema operativo. Luego usa ese certificado
en tu servidor web local. Vea la documentaci&oacute;n para m&aacute; detalles.

# Para apps nativas hablando a apps de web

A veces desarrolladores desean ofrecer una aplicaci&oacute;n nativa descargable que se puede usar junto
a un sitio web para ofrecer funciones adicionales. Por ejemplo, las aplicaciones de
Dropbox y Spotify pueden escanear en busca de archivos de toda tu m&aacute;quina,
lo que una aplicaci&oacute;n web no podr&iacute;a hacer. Un enfoque com&uacute;n
es que estas aplicaciones nativas ofrezcan un servicio web en localhost y hagan que la
aplicaci&oacute;n web le haga solicitudes a trav&eacute;s de XMLHTTPRequest (XHR) &oacute; WebSockets.
La aplicaci&oacute;n web casi siempre usa HTTPS, lo que significa que los navegadores le prohibir&aacute;n
realizar solicitudes de XHR o WebSockets a URLs no seguras. Esto se llama *Mixed Content Blocking*.
Para comunicarse con la aplicaci&oacute;n web, la aplicaci&oacute;n nativa debe proporcionar un servicio
web seguro.

Afortunadamente, navegadores modernos [consideran][mcb-localhost] "http://127.0.0.1:8000/" ser
["potencialmente confiable"][secure-contexts] URL porque se refiere a una direcci&oacute;n *loopback*.
Tr&aacute;fico enviado a 127.0.0.1 es garantizado que no va a salir de tu m&aacute;quina, y es considerado autom&aacute;ticamente seguro contra intercepci&oacute;n de red. Esto significa que si tu aplicaci&oacute;n de web es HTTPS, y ofreces un servicio web de aplicaci&oacute;n nativa en 127.0.0.1, los dos pueden comunicarse felizmente a trav&eacute;s de XHR. Desafortunadamente, [localhost no recibe el mismo tratamiento][let-localhost]. Adem&aacuas;s, WebSockets no reciben este tratamiento para ya sea para cualquier nombre.

Puedes tener la tentaci&oacute;n de evitar estas limitaciones configurando un nombre de dominio en el DNS global que se resuelve en 127.0.0.1 (por ejemplo, localhost.example.com), obteniendo un certificado para ese nombre de dominio, enviando ese certificado y la correspondiente llave privada con tu aplicaci&oacute;n nativa, y diciendole a tu aplicaci&oacute;n de web que de comunique con https://localhost.example.com:8000/ en vez de http://127.0.0.1:8000/. *No hagas esto.* Esto pondr&aacute; a tus usuarios en riesgo, y tu certificado puede ser revocado.

Introduciendo un nombre de dominio en vez de una direcci&oacute;n IP, haces posible que un atacante "Man in the Middle (MitM)" la b&uacute;squeda DNS e inyectar una respuesta que apunta a una direcci&oacute;n IP diferente. El atacante puede pretender ser la apliaci&oacute;n local y enviar respuestas falsas a la aplicaci&oacute;n de web, lo cual puede comprometer tu cuenta en el lado de la aplicaci&oacute;n de web, dependiendo que como es dise&ntilde;ada.

Un MitM exitoso en esta situaci&oacute;n es posible porque para hacerlo funcionar, tienes que enviar la llave privada de tu certificado con tu aplicaci&oacute;n nativa. Eso significa que que cualquiera que descarga tu aplicaci&oacute;n nativa recibe una copia de tu llave privada, incluyendo el atacante. Esto es considerado un compromiso de tu llave privada, y tu es requerido de tu Autoridad de Certificaci&oacute;n revocar tu certificado si se dan cuenta de ello. [Muchas aplicaciones nativas][mdsp1] han [tenido sus certificados][mdsp2] revocados por [enviar su llave privada][mdsp3].

Desafortunadamente, esto deja aplicaciones nativas sin muchas opciones seguras o buenas  para comunicarse con su sitio web correspondiente. Y la situaci&oacute;n puede complicarse si en el futuro los navegadores se ajustan a&uacute;n m&aacute;s para [restringir el acceso a localhost desde el web][tighten-access].

Tambi&eacute;n nota que exportando un servicio web que ofrece APIs nativas privilegiadas es inherentemente arriesgado, porque sitios de web que no pretend&iacute;as autorizar puede acceder a ellos. Si vas por esta ruta, aseg&uacute;rate de leer sobre [Cross-Origin Resource Sharing][cors], usa Access-Control-Allow-Origin, y aseg&uacute;rate de usar un analizador HTTP que sea *memory-safe*, porque hasta origines que no le das acceso pueden enviar *preflight requests*, los cuales pueden ser capaz de explotar errores en tu analizador.

# Realizando y confiando sus propios certificados

Cualquiera puede crear su propio certificado sin la ayuda de una AC.
La &uacute;nica diferencia es que certificados hechos por ti
mismo no van a ser confiados por nadie m&aacute;s.
Para desarrollo local, eso est&aacute; bien.

La manera m&aacute;s sencilla para generar una llave privada
y un certificado autofirmado para localhost es con el siguiente comando openssl:

    openssl req -x509 -out localhost.crt -keyout localhost.key \
      -newkey rsa:2048 -nodes -sha256 \
      -subj '/CN=localhost' -extensions EXT -config <( \
       printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

A continuaci&oacute;n, puedes configurar tu servidor con localhost.crt y localhost.key
e instalar localhost.crt en tu lista de raices confiadas localmente.

Si deseas un poco m&aacute;s de realismo en tus certificados de desarrollo, puedes usar [minica][minica]
para generar tu propio certificado ra&iacute;z local, y emitir certificados
*end-entity* (tambi&eacute;n conocido como *leaf*) firmados por &eacute;l. Entonces importar&iacute;a
el certificado ra&iacute;z en vez de un certificado *end-entity* autofirmado.

Tambi&eacute;n puedes optar por utilizar un dominio con puntos en &eacute;l, como "www.localhost",
a&ntilde;adiendolo a /etc/hosts como un alias apuntando a 127.0.0.1. Esto cambia sutilmente como navegadores
manejan el almacenamiento de cookies.

[mcb-localhost]: https://bugs.chromium.org/p/chromium/issues/detail?id=607878
[secure-contexts]: https://www.w3.org/TR/secure-contexts/#is-origin-trustworthy
[let-localhost]: https://tools.ietf.org/html/draft-ietf-dnsop-let-localhost-be-localhost-02
[mdsp1]: https://groups.google.com/d/msg/mozilla.dev.security.policy/eV89JXcsBC0/wsj5zpbbAQAJ
[mdsp2]: https://groups.google.com/d/msg/mozilla.dev.security.policy/T6emeoE-lCU/-k-A2dEdAQAJ
[mdsp3]: https://groups.google.com/d/msg/mozilla.dev.security.policy/pk039T_wPrI/tGnFDFTnCQAJ
[tighten-access]: https://bugs.chromium.org/p/chromium/issues/detail?id=378566
[minica]: https://github.com/jsha/minica
[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
