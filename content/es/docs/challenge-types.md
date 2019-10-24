---
slug: challenge-types
untranslated: 1
---
<p>Cuando solicita un certificado a Let’s Encrypt, nuestros servidores comprueba que usted está autorizado o controla los nombres de dominio en ese certificado utilizando "desafíos", según lo define el estándar ACME. La mayoría de las veces, esta validación es manejada automáticamente por su cliente ACME, pero si necesita tomar algunas decisiones de configuración más complejas, es útil saber más sobre ellas. Si no está seguro, use los valores predeterminados de su cliente o HTTP-01.</p>

<h1><a id="user-content-http-01-challenge" class="anchor" aria-hidden="true" href="#http-01-challenge"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>HTTP-01 challenge</h1>

<p>Este es el tipo de desafío más común en la actualidad. Let's Encrypt le da un token a su cliente ACME y su cliente ACME coloca un archivo en su servidor web en <code>http://<YOUR_DOMAIN>/.well-known/acme-challenge/<TOKEN></code>. Ese archivo contiene el token más una huella digital de la clave de su cuenta. Una vez que su cliente ACME le dice a Let’s Encrypt que el archivo está listo, Let’s Encrypt intenta recuperarlo (potencialmente varias veces desde múltiples puntos de vista). Si nuestras comprobaciones de validación obtienen las respuestas correctas de su servidor web, la validación se considera exitosa y se procede a emitir su certificado. Si las comprobaciones de validación fallan, deberá volver a intentarlo con un nuevo certificado.</p>

<p>Nuestra implementación del desafío HTTP-01 sigue los redireccionamientos, hasta 10 niveles de redireccionamiento. Solo acepta redireccionamientos a "http:" o "https:" y solo a los puertos 80 o 443. No acepta redireccionamientos a direcciones IP. Cuando se redirige a una URL HTTPS, no valida los certificados (ya que este desafío tiene como objetivo iniciar certificados válidos, puede encontrar certificados autofirmados o caducados en el camino).</p>

<p>El desafío HTTP-01 solo se puede hacer en el puerto 80. Permitir que los clientes especifiquen puertos arbitrarios hará que el desafío sea menos seguro, por lo que el estándar ACME no lo permite.</p>

<p>Pros:</p>
<ul>
<li> Es fácil de automatizar sin un conocimiento adicional sobre la configuración de un dominio.</li>
<li> Permite a los proveedores de hosting emitir certificados para dominios CNAMEd.</li>
<li> Funciona con servidores web estándar.</li>
</ul>
<p>Contras:</p>
<ul>
<li> No funciona si su ISP bloquea el puerto 80 (esto es raro, pero algunos ISP residenciales lo hacen).</li>
<li> Let’s Encrypt no le permite utilizar este desafío para emitir certificados comodín.</li>
<li> Si tiene varios servidores web, debe asegurarse de que el archivo esté disponible en todos ellos.</li>
</ul>
<h1><a id="user-content-dns-01-challenge" class="anchor" aria-hidden="true" href="#dns-01-challenge"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>DNS-01 challenge</h1>

<p>Este desafío consiste en que pruebe que usted controla el DNS para su nombre de dominio al poner un valor específico en un registro TXT bajo ese nombre de dominio. Es más difícil de configurar que HTTP-01, pero puede funcionar en escenarios que HTTP-01 no puede. También le permite emitir certificados comodín. Después de que Let’s Encrypt le dé a su cliente ACME un token, su cliente creará un registro TXT derivado de ese token y su clave de cuenta y deberá añadir ese registro DNS tipo TXT con el nombre <code>http://&lt;YOUR_DOMAIN&gt;/.well-known/acme-challenge/&lt;TOKEN&gt;</code>. Luego, Let's Encrypt consultará el sistema DNS para ese registro. Si encuentra una coincidencia, ¡puede proceder a emitir un certificado!</p>

<p>Dado que la automatización de la emisión y las renovaciones es realmente importante, solo tiene sentido usar los desafíos de DNS-01 si su proveedor de DNS tiene una API que puede usar para automatizar las actualizaciones. Nuestra comunidad ha comenzado una lista de dichos proveedores de DNS <a href="https://community.letsencrypt.org/t/dns-providers-who-easily-integrate-with-lets-encrypt-dns-validation/86438">disponible en este enlace/a> . Su proveedor de DNS puede ser el mismo que su registrador (la compañía a la que le compró su nombre de dominio), o puede ser diferente. Si desea cambiar su proveedor de DNS, solo necesita hacer algunos pequeños cambios en su registrador. No necesita esperar a que su dominio esté cerca del vencimiento para hacerlo.</p>

<p>Tenga en cuenta que poner sus credenciales de API DNS completamente en su servidor web aumenta significativamente el impacto si ese servidor web es pirateado. La mejor práctica es utilizar utilizar <a href="https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation">credenciales de API de alcance más limitado</a>, o realizar la validación de DNS desde un servidor separado y copiar automáticamente los certificados a su servidor web.</p>

<p>Dado que Let's Encrypt sigue los estándares DNS cuando busca registros TXT para la validación DNS-01, puede usar registros CNAME o NS para delegar la respuesta del desafío a otras zonas DNS. Esto se puede usar para <a href="https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation">delegar el subdominio _acme-challenge</a> a un servidor o zona específica de validación. También se puede usar si su proveedor de DNS tarda en actualizarse y desea delegarlo en un servidor de actualización más rápida.</p>

<p>La mayoría de los proveedores de DNS tienen un "tiempo de propagación" que determina el tiempo que transcurre desde el momento en que actualiza un registro DNS hasta que está disponible en todos sus servidores. Puede ser difícil medir esto porque a menudo también usan <a href="https://en.wikipedia.org/wiki/Anycast">anycast</a>, lo que significa que varios servidores pueden tener la misma dirección IP y dependiendo de dónde se encuentre en el mundo, puede hablar con un servidor diferente (y obtener una respuesta diferente) de la que Let's Encrypt espera. Las mejores API de DNS le brindan una forma de verificar automáticamente si la actualización se propaga completamente. Si su proveedor de DNS no tiene esto, solo tiene que configurar su cliente para que espere lo suficiente (a menudo hasta una hora) para asegurarse de que la actualización se propague antes de activar la validación.</p>

<p>Puede tener múltiples registros TXT para el mismo nombre de dominio. Por ejemplo, esto podría suceder si está validando un desafío para un comodín y un certificado sin comodín al mismo tiempo. Sin embargo, debe asegurarse de limpiar los registros TXT antiguos, porque si el tamaño de la respuesta es demasiado grande, Let's Encrypt comenzará a rechazarlo.</p>

<p>Pros:</p>
<ul>
<li> Puede utilizar este desafío para emitir certificados que contengan nombres de dominio con comodín. ej: *.domain.ltd.</li>
<li> Funciona bien incluso si tiene varios servidores web.</li>
</ul>
<p>Contras:</p>
<ul>
<li> Mantener las credenciales de la API en su servidor web es arriesgado.</li>
<li> Su proveedor de DNS podría no ofrecer una API.</li>
<li> Es posible que su API de DNS no proporcione información sobre los tiempos de propagación.</li>
</ul>
<h1><a id="user-content-tls-sni-01" class="anchor" aria-hidden="true" href="#tls-sni-01"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>TLS-SNI-01</h1>

<p>Este desafío se definió en versiones preliminares de ACME. Hacía un apretón de manos TLS en el puerto 443 y enviaba un encabezado SNI específico, buscando un certificado que contuviera el token. Se <a href="https://community.letsencrypt.org/t/march-13-2019-end-of-life-for-all-tls-sni-01-validation-support/74209">desactivará en marzo de 2019</a> porque no es lo suficientemente seguro.</p>

<h1><a id="user-content-tls-alpn-01" class="anchor" aria-hidden="true" href="#tls-alpn-01"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>TLS-ALPN-01</h1>

<p>Este desafío se desarrolló después de que TLS-SNI-01 quedó en desuso y se está desarrollando como un <a href="https://tools.ietf.org/html/draft-ietf-acme-tls-alpn-01">estándar separado</a>. Al igual que TLS-SNI-01, se realiza a través de TLS en el puerto 443. Sin embargo, utiliza un protocolo ALPN personalizado para garantizar que solo los servidores que conocen este tipo de desafío responderán a las solicitudes de validación. Esto también permite que las solicitudes de validación para este tipo de desafío utilicen un campo SNI que coincida con el nombre de dominio que se valida, lo que lo hace más seguro.</p>

<p>Este desafío no es adecuado para la mayoría de las personas. Es más adecuado para los autores de proxys inversos con terminación TLS que desean realizar una validación basada en host como HTTP-01, pero desean hacerlo completamente en la capa TLS para evitar  preocupaciones. En este momento eso significa principalmente grandes proveedores de alojamiento, pero los servidores web convencionales como Apache y Nginx algún día podrían implementarlo (<a href="https://caddy.community/t/caddy-supports-the-acme-tls-alpn-challenge/4860">Caddy ya lo hace</a>).</p>

<p>Pros:</p>
<ul>
<li> Funciona si el puerto 80 no está disponible para usted.</li>
<li> Se puede realizar puramente en la capa TLS.</li>
</ul>
<p>Contras:</p>
<ul>
<li> No es compatible con Apache, Nginx o Certbot, y probablemente no lo será pronto.</li>
<li> Al igual que HTTP-01, si tiene varios servidores, todos deben responder con el mismo contenido.</li>
</ul>
