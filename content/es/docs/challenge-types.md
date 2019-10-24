---
slug: challenge-types
untranslated: 1
---
Cuando solicita un certificado a Let’s Encrypt, nuestros servidores comprueba que usted está autorizado o controla los nombres de dominio en ese certificado utilizando "desafíos", según lo define el estándar ACME. La mayoría de las veces, esta validación es manejada automáticamente por su cliente ACME, pero si necesita tomar algunas decisiones de configuración más complejas, es útil saber más sobre ellas. Si no está seguro, use los valores predeterminados de su cliente o HTTP-01.

HTTP-01 challenge

Este es el tipo de desafío más común en la actualidad. Let's Encrypt le da un token a su cliente ACME y su cliente ACME coloca un archivo en su servidor web en http://<YOUR_DOMAIN>/.well-known/acme-challenge/<TOKEN>. Ese archivo contiene el token más una huella digital de la clave de su cuenta. Una vez que su cliente ACME le dice a Let’s Encrypt que el archivo está listo, Let’s Encrypt intenta recuperarlo (potencialmente varias veces desde múltiples puntos de vista). Si nuestras comprobaciones de validación obtienen las respuestas correctas de su servidor web, la validación se considera exitosa y se procede a emitir su certificado. Si las comprobaciones de validación fallan, deberá volver a intentarlo con un nuevo certificado.

Nuestra implementación del desafío HTTP-01 sigue los redireccionamientos, hasta 10 niveles de redireccionamiento. Solo acepta redireccionamientos a "http:" o "https:" y solo a los puertos 80 o 443. No acepta redireccionamientos a direcciones IP. Cuando se redirige a una URL HTTPS, no valida los certificados (ya que este desafío tiene como objetivo iniciar certificados válidos, puede encontrar certificados autofirmados o caducados en el camino).

El desafío HTTP-01 solo se puede hacer en el puerto 80. Permitir que los clientes especifiquen puertos arbitrarios hará que el desafío sea menos seguro, por lo que el estándar ACME no lo permite.

Pros:

· Es fácil de automatizar sin un conocimiento adicional sobre la configuración de un dominio.
· Permite a los proveedores de hosting emitir certificados para dominios CNAMEd.
· Funciona con servidores web estándar.

Contras:

· No funciona si su ISP bloquea el puerto 80 (esto es raro, pero algunos ISP residenciales lo hacen).
· Let’s Encrypt no le permite utilizar este desafío para emitir certificados comodín.
· Si tiene varios servidores web, debe asegurarse de que el archivo esté disponible en todos ellos.

DNS-01 challenge

Este desafío consiste en que pruebe que usted controla el DNS para su nombre de dominio al poner un valor específico en un registro TXT bajo ese nombre de dominio. Es más difícil de configurar que HTTP-01, pero puede funcionar en escenarios que HTTP-01 no puede. También le permite emitir certificados comodín. Después de que Let’s Encrypt le dé a su cliente ACME un token, su cliente creará un registro TXT derivado de ese token y su clave de cuenta y deberá añadir ese registro DNS tipo TXT con el nombre _acme-challenge.<YOUR_DOMAIN>. Luego, Let's Encrypt consultará el sistema DNS para ese registro. Si encuentra una coincidencia, ¡puede proceder a emitir un certificado!

Dado que la automatización de la emisión y las renovaciones es realmente importante, solo tiene sentido usar los desafíos de DNS-01 si su proveedor de DNS tiene una API que puede usar para automatizar las actualizaciones. Nuestra comunidad ha comenzado una lista de dichos proveedores de DNS en https://community.letsencrypt.org/t/dns-providers-who-easily-integrate-with-lets-encrypt-dns-validation/86438 . Su proveedor de DNS puede ser el mismo que su registrador (la compañía a la que le compró su nombre de dominio), o puede ser diferente. Si desea cambiar su proveedor de DNS, solo necesita hacer algunos pequeños cambios en su registrador. No necesita esperar a que su dominio esté cerca del vencimiento para hacerlo.

Tenga en cuenta que poner sus credenciales de API DNS completamente en su servidor web aumenta significativamente el impacto si ese servidor web es pirateado. La mejor práctica es utilizar [more narrowly scoped API
credentials][securing-dns-credentials], o realizar la validación de DNS desde un servidor separado y copiar automáticamente los certificados a su servidor web.
