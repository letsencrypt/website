---
title: Certificados para localhost
permalink: /docs/certificates-for-localhost
top_graphic: 1
date: 2017-12-21
lastmod: 2017-12-21
---

{{< lastmod >}}

A veces personas desean obtener un certificado para el nombre de equipo "localhost",
ya sea para uso en desarrollo local, o para distribución con una aplicación
nativa que necesita comunicarse con una aplicació web. Let's Encrypt no puede
proveer certificados para "localhost" porque nadie lo posee de forma única, y no es
enraizado en un dominio de de nivel superior como ".com" ó ".net". Es posible configurar
tu propio nombre de dominio que se resuelve en `127.0.0.1` y obtener un certificado usando el reto DNS.
Sin embargo, esto es generalmente una mala idea y hay mejores opciones.

# Para desarrollo local

Si está desarrollando una aplicación web, es útil correr un servidor
web local como Apache ó Nginx, y acceder a él a través de `http://localhost:8000`
en tu navegador de web. Sin embargo, navegadores de web se comportan sutilmente diferentes en páginas HTTP vs. HTTPS.
La diferencia principal: En una página HTTPS, cualquier petición para cargar JavaScript de un URL HTTP será
bloqueada. Así que si estás desarrollando localmente usando HTTP,
podrías agregar un *script tag* que funcione bien en tu máquina de desarrollo,
pero se rompe cuando desplegas a tu sitio de producción HTTPS. Para capturar este tipo de problema,
es útil configurar HTTPS en tu servidor de web local. Sin embargo, no quieres ver la advertencia de certificado en tu servidor de web local. ¿Cómo se obtiene localmente el candado verde?

La mejor opción: Genera tu propio certificado, ya sea autofirmado ó firmado por una raíz local, y confiarla en el almacén de confianza de tu sistema operativo. Luego usa ese certificado
en tu servidor web local. Vea la documentación para má detalles.

# Para apps nativas hablando a apps de web

A veces desarrolladores desean ofrecer una aplicación nativa descargable que se puede usar junto
a un sitio web para ofrecer funciones adicionales. Por ejemplo, las aplicaciones de
Dropbox y Spotify pueden escanear en busca de archivos de toda tu máquina,
lo que una aplicación web no podría hacer. Un enfoque común
es que estas aplicaciones nativas ofrezcan un servicio web en localhost y hagan que la
aplicación web le haga solicitudes a través de XMLHTTPRequest (XHR) ó WebSockets.
La aplicación web casi siempre usa HTTPS, lo que significa que los navegadores le prohibirán
realizar solicitudes de XHR o WebSockets a URLs no seguras. Esto se llama *Mixed Content Blocking*.
Para comunicarse con la aplicación web, la aplicación nativa debe proporcionar un servicio
web seguro.

Afortunadamente, navegadores modernos [consideran][mcb-localhost] `http://127.0.0.1:8000/` ser
["potencialmente confiable"][secure-contexts] URL porque se refiere a una dirección *loopback*.
Tráfico enviado a 127.0.0.1 es garantizado que no va a salir de tu máquina, y es considerado automáticamente seguro contra intercepción de red. Esto significa que si tu aplicación de web es HTTPS, y ofreces un servicio web de aplicación nativa en `127.0.0.1`, los dos pueden comunicarse felizmente a través de XHR. Desafortunadamente, [localhost no recibe el mismo tratamiento][let-localhost]. Además, WebSockets no reciben este tratamiento para ya sea para cualquier nombre.

Puedes tener la tentación de evitar estas limitaciones configurando un nombre de dominio en el DNS global que se resuelve en `127.0.0.1` (por ejemplo, `localhost.example.com`), obteniendo un certificado para ese nombre de dominio, enviando ese certificado y la correspondiente llave privada con tu aplicación nativa, y diciendole a tu aplicación de web que de comunique con `https://localhost.example.com:8000/` en vez de `http://127.0.0.1:8000/`. *No hagas esto.* Esto pondrá a tus usuarios en riesgo, y tu certificado puede ser revocado.

Introduciendo un nombre de dominio en vez de una dirección IP, haces posible que un atacante "Man in the Middle (MitM)" la búsqueda DNS e inyectar una respuesta que apunta a una dirección IP diferente. El atacante puede pretender ser la apliación local y enviar respuestas falsas a la aplicación de web, lo cual puede comprometer tu cuenta en el lado de la aplicación de web, dependiendo que como es diseñada.

Un MitM exitoso en esta situación es posible porque para hacerlo funcionar, tienes que enviar la llave privada de tu certificado con tu aplicación nativa. Eso significa que que cualquiera que descarga tu aplicación nativa recibe una copia de tu llave privada, incluyendo el atacante. Esto es considerado un compromiso de tu llave privada, y tu es requerido de tu Autoridad de Certificación revocar tu certificado si se dan cuenta de ello. [Muchas aplicaciones nativas][mdsp1] han [tenido sus certificados][mdsp2] revocados por [enviar su llave privada][mdsp3].

Desafortunadamente, esto deja aplicaciones nativas sin muchas opciones seguras o buenas  para comunicarse con su sitio web correspondiente. Y la situación puede complicarse si en el futuro los navegadores se ajustan aún más para [restringir el acceso a localhost desde el web][tighten-access].

También nota que exportando un servicio web que ofrece APIs nativas privilegiadas es inherentemente arriesgado, porque sitios de web que no pretendías autorizar puede acceder a ellos. Si vas por esta ruta, asegúrate de leer sobre [Cross-Origin Resource Sharing][cors], usa Access-Control-Allow-Origin, y asegúrate de usar un analizador HTTP que sea *memory-safe*, porque hasta origines que no le das acceso pueden enviar *preflight requests*, los cuales pueden ser capaz de explotar errores en tu analizador.

# Realizando y confiando sus propios certificados

Cualquiera puede crear su propio certificado sin la ayuda de una AC.
La única diferencia es que certificados hechos por ti
mismo no van a ser confiados por nadie más.
Para desarrollo local, eso está bien.

La manera más sencilla para generar una llave privada
y un certificado autofirmado para localhost es con el siguiente comando openssl:

    openssl req -x509 -out localhost.crt -keyout localhost.key \
      -newkey rsa:2048 -nodes -sha256 \
      -subj '/CN=localhost' -extensions EXT -config <( \
       printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

A continuación, puedes configurar tu servidor con localhost.crt y localhost.key
e instalar localhost.crt en tu lista de raices confiadas localmente.

Si deseas un poco más de realismo en tus certificados de desarrollo, puedes usar [minica][minica]
para generar tu propio certificado raíz local, y emitir certificados
*end-entity* (también conocido como *leaf*) firmados por él. Entonces importaría
el certificado raíz en vez de un certificado *end-entity* autofirmado.

También puedes optar por utilizar un dominio con puntos en él, como `www.localhost`,
añadiendolo a /etc/hosts como un alias apuntando a `127.0.0.1`. Esto cambia sutilmente como navegadores
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
