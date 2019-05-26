---
title: Cómo Funciona
slug: how-it-works
top_graphic: 3
---

El objetivo de Let's&nbsp;Encrypt y el [protocolo ACME](https://ietf-wg-acme.github.io/acme/) es hacer posible la configuraci&oacute;n de un servidor HTTPS y hacer que obtenga autom&aacute;ticamente un certificado confiado por el navegador, sin ninguna intervenci&oacute;n humana. Esto se logra ejecutando un agente de manejamiento de certificados en un servidor de web.

Para entender c&oacute;mo esta tecnolog&iacute;a funciona, vamos a caminar a trav&eacute;s del proceso de configuraci&oacute;n de `https://example.com/` con un agente de manejamiento de certificados que soporta Let's&nbsp;Encrypt.

Hay dos pasos para este proceso. Primero, el agente le prueba al AC que el servidor de web controla el dominio. Luego, el agent puede pedir, renovar, y revokar certificados para ese dominio.

## Validaci&oacute;n de Dominio

Let's&nbsp;Encrypt indentifica el administrador del servidor por llave p&uacute;blica. La primera vez que el software del agente interact&uacute;a con Let's&nbsp;Encrypt, genera un nuevo par de llaves y demuestra al Let's&nbsp;Encrypt CA que el servidor controla uno o m&aacute;s dominios. Esto es similar al proceso tradicional de un AC de crear una cuenta y agregar dominios a esa cuenta.

Para iniciar el proceso, el agent le pregunta al Let's&nbsp;Encrypt CA lo que hay que hacer para demostrar que controla `example.com`. El Let's Encrypt CA mirar&aacute; el nombre de dominio que se solicita y emitir&aacute; uno o m&aacute;s conjuntos de retos. Estas son diferentes maneras que el agente puede demostrar control sobre el dominio. Por ejemplo, la AC puede darle al agente la opci&oacute; de:

* Provisionar un record DNS record bajo `example.com`, &oacute;
* Provisionar un recurso HTTP bajo un *well-known URI* en `https://example.com/`

Junto con los retos, el Let's Encrypt CA tambi&eacute;n provee un `nonce` que el agente debe firmar con su par de llave privada para demostrar que controla el par de llaves.

<div class="howitworks-figure">
<img alt="Solicitando retos para validar example.com"
     src="/images/howitworks_challenge.png"/>
</div>

El software de agente completa uno de los conjuntos de retos proveidos. Digamos que es capaz de realizar la segunda tarea anterior: crea un archivo en un *path* especifico en el site `https://example.com`. El agente tambi&eacute;n firma el `nonce` proveido con su llave privada. Una vez el agente ha completado estos pasos, notifica la AC que est&aacute; listo para completar la validaci&oacute;n.

Luego, es el trabajo de la AC verificar los que retos han sido satisfechos. La AC verifica la firma en el `nonce`, e intenta descargar un archivo del servidor web y hacerce seguro que recibi&oacute; el contenido esperado.

<div class="howitworks-figure">
<img alt="Solicitando autorizaci&oacute;n para actuar por example.com"
     src="/images/howitworks_authorization.png"/>
</div>

Si la firma sobre el `nonce` es v&aacute;lida, y los retos son v&aacute;lidos, entonces el agente identificado por su llave p&uacute;blica est&aacute; autorizado a realizar la gesti&oacute;n de certificados para `example.com`. Llamamos el par de llaves que el agente us&oacute; un "par de llaves autorizado" para `example.com`.


## Emici&oacute;n y Revocaci&oacute;n de Certificados

Una vez el agente tenga un par de llaves autorizado, solicitando, renovando, y revocando certificados es simple---solo envia mensajes de manejamiento de certificados y firmalos con el par de llaves autorizado.

Para obtener un certificado para un dominio, el agente construye un PKCS#10 [Certificate Signing Request](https://tools.ietf.org/html/rfc2986) que le pregunta al AC Let's Encrypt que emita un certificado para `example.com` con una llave p&uacute;blica espeficificada. Como siempre, el CSR incluye una firma por la llave privada correspondiente a la llave p&uacute;blica en el CSR. El agent tambi&eacute;n firma el CSR entero con la llave autorizada para `example.com` de manera que el Let's Encrypt CA sepa que est&aacute; autorizado.

Cuando el Let's Encrypt CA recibe una solicitud, verifica ambas firmas. Si todo se ve bien, emite un certificado para `example.com` con la llave p&uacute;blica del CSR y lo devuelve al agente.

<div class="howitworks-figure">
<img alt="Solicitando un certificado para example.com"
     src="/images/howitworks_certificate.png"/>
</div>

Revocaci&oacute;n funciona de una manera similar. El agent firma una solicitud de revocaci&oacute;n con el par de llaves autorizado para `example.com`, y el Let's Encrypt CA verifica que la solicitud es autorizada. Si lo es, publica informaci&oacute;n de revocaci&oacute;n a los canales normales de revocaci&oacute;n (i.e. OCSP), para que los confiados tales como navegadores pueden saber que no deben aceptar el certificado recovado.

<div class="howitworks-figure">
<img alt="Solicitando revocaci&oacute;n del certifiado para example.com"
     src="/images/howitworks_revocation.png"/>
</div>

