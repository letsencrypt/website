---
title: DST Root CA X3 Expiration (September 2021)
slug: dst-root-ca-x3-expiration-september-2021
top_graphic: 1
lastmod: 2021-04-06
show_lastmod: 1
---

El 30 de septiembre de 2021, habrá un pequeño cambio en la forma en que los navegadores y dispositivos más antiguos confían en los certificados Let's Encrypt. Si ejecuta un sitio web típico, no notará la diferencia: la gran mayoría de sus visitantes aún aceptarán su certificado Let's Encrypt. Si proporciona una API o tiene que admitir dispositivos de IoT, es posible que deba prestar un poco más de atención al cambio.

Let's Encrypt tiene un "[root certificate]" (Certificado raíz) llamado [ISRG Root X1]. Los navegadores y dispositivos modernos confían en el certificado Let's Encrypt instalado en su sitio web porque incluyen ISRG Root X1 en su lista de certificados raíz. Para asegurarnos de que los certificados que emitimos sean confiables en dispositivos más antiguos, también tenemos una "firma cruzada" de un certificado raíz anterior: DST Root CA X3.

Cuando comenzamos, ese certificado raíz más antiguo (DST Root CA X3) nos ayudó a despegar y a que casi todos los dispositivos confiaran en nosotros de inmediato. El certificado raíz más nuevo (ISRG Root X1) ahora también es ampliamente confiable, pero algunos dispositivos más antiguos nunca confiarán en él porque no reciben actualizaciones de software (por ejemplo, un iPhone 4 o un HTC Dream). [Haga clic aquí para obtener una lista de las plataformas que confían en ISRG Root X1][compatibility].

DST Root CA X3 vencerá el 30 de septiembre de 2021. Eso significa que aquellos dispositivos más antiguos que no confían en ISRG Root X1 comenzarán a recibir advertencias de certificados cuando visiten sitios que usen certificados Let's Encrypt. Hay una excepción importante: los dispositivos Android más antiguos que no confían en ISRG Root X1 seguirán funcionando con Let's Encrypt, [gracias a un signo cruzado especial de DST Root CA X3][cross-sign] que se extiende más allá del vencimiento de esa raíz. Esta excepción solo funciona para Android.

¿Qué deberías hacer? Para la mayoría de la gente, ¡nada en absoluto! Hemos configurado nuestra emisión de certificados para que su sitio web haga lo correcto en la mayoría de los casos, favoreciendo una amplia compatibilidad. Si proporciona una API o tiene que admitir dispositivos IoT, deberá asegurarse de dos cosas: (1) todos los clientes de su API deben confiar en ISRG Root X1 (no solo DST Root CA X3) y (2) si los clientes de su API están usando OpenSSL, [deben usar la versión 1.1.0 o posterior][openssl]. En OpenSSL 1.0.x, una peculiaridad en la verificación de certificados significa que incluso los clientes que confían en ISRG Root X1 fallarán cuando se les presente la cadena de certificados compatible con Android que recomendamos de forma predeterminada.

Si desea información adicional sobre nuestros cambios en la cadena de producción en curso, [consulte este hilo en nuestra comunidad][production].

Si tiene alguna pregunta sobre el próximo vencimiento, [publique en este hilo en nuestro foro.][forum]

[root certificate]: /docs/glossary/#def-root
[ISRG Root X1]: /certificates/
[cross-sign]: /2020/12/21/extending-android-compatibility.html
[openssl]: https://community.letsencrypt.org/t/openssl-client-compatibility-changes-for-let-s-encrypt-certificates/143816
[forum]: https://community.letsencrypt.org/t/help-thread-for-dst-root-ca-x3-expiration-september-2021/149190
[compatibility]: /docs/cert-compat/
[production]: https://community.letsencrypt.org/t/production-chain-changes/150739
