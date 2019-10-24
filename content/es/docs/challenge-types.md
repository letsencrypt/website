---
slug: challenge-types
untranslated: 1
---
Cuando solicita un certificado a Let’s Encrypt, nuestros servidores comprueba que usted está autorizado o controla los nombres de dominio en ese certificado utilizando "desafíos", según lo define el estándar ACME. La mayoría de las veces, esta validación es manejada automáticamente por su cliente ACME, pero si necesita tomar algunas decisiones de configuración más complejas, es útil saber más sobre ellas. Si no está seguro, use los valores predeterminados de su cliente o HTTP-01.

HTTP-01 challenge

Este es el tipo de desafío más común en la actualidad. Let's Encrypt le da un token a su cliente ACME y su cliente ACME coloca un archivo en su servidor web en http://<YOUR_DOMAIN>/.well-known/acme-challenge/<TOKEN>. Ese archivo contiene el token más una huella digital de la clave de su cuenta. Una vez que su cliente ACME le dice a Let’s Encrypt que el archivo está listo, Let’s Encrypt intenta recuperarlo (potencialmente varias veces desde múltiples puntos de vista). Si nuestras comprobaciones de validación obtienen las respuestas correctas de su servidor web, la validación se considera exitosa y se procede a emitir su certificado. Si las comprobaciones de validación fallan, deberá volver a intentarlo con un nuevo certificado.
