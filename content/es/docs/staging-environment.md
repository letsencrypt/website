---
title: entorno de prueba
slug: staging-environment
untranslated: 1
---

<p>Recomendamos encarecidamente realizar pruebas en nuestro entorno de ensayo antes de utilizar nuestro entorno de producción. Esto le permitirá hacer las cosas bien antes de emitir certificados de confianza y reducirá la posibilidad de que se enfrente a los límites de solicitudes.</p>

<p>La URL ACME del [entorno de prueba ACME v2](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) es:</p>

<p>`https://acme-staging-v02.api.letsencrypt.org/directory`</p>

<p>Si está utilizando Certbot, puede utilizar nuestro entorno de prueba con el indicador --dry-run. Para otros clientes de ACME, lea sus instrucciones para obtener información sobre las pruebas con nuestro entorno de prueba. Tenga en cuenta que el entorno de prueba v2 requiere un cliente ACME compatible con v2.</p>

<h1 id="rate-limits">Limites</h1>

<p>El entorno de prueba usa el mismo sistema de límites descritos para el <a href="https://letsencrypt.org/es/docs/rate-limits/">entorno de producción</a> con las siguientes excepciones:</p>

<ul>
<li>El límite de <strong>Certificados por Dominio Registrado</strong> es de 30,000 por semana.</li>
<li>El límite de <strong>Certificados Duplicados</strong> es de 30,000 per semana.</li>
<li>El límite de <strong>Validaciones Fallidas</strong> es de 60 por hora.</li>
<li>El límite de <strong>Cuentas por dirección IP</strong> es de 50 cuentas en un periodo de 3 horas por IP.</li>
<li>Para ACME v2, el límite de <strong>Nuevas Peticiones</strong> es de 1,500 solicitudes nuevas en un periodo de 3 horas por cuenta.</li>
</ul>

<h1 id="root-certificate">Root Certificate</h1>

<p>El certificado intermedio para el entorno de prueba (<a href="https://letsencrypt.org/certs/fakeleintermediatex1.pem">&ldquo;Fake LE Intermediate X1&rdquo;</a>) es emitido por un certificado raíz <strong>que no está presente</strong> en el almacen de certificados del navegador del cliente. Si desea modificar un cliente para confiar en el entorno de prueba con el fin de hacer tests, puede hacerlo agregando el certificado <a href="https://letsencrypt.org/certs/fakelerootx1.pem">&ldquo;Fake LE Root X1&rdquo;</a> a su almacen de certificados de confianza. Importante: No agregue la raíz provisional o intermedia a una tienda de confianza que use para la navegación ordinaria u otras actividades, ya que no se auditan ni cumplen con los mismos estándares que nuestras raíces de producción, por lo que no es seguro usarlas para nada más que las pruebas.</p>

<h1 id="certificate-transparency">Transparencia de certificado</h1>

<p>El entorno de prueba envía pre-certificados a Let's Encrypt <a href="https://letsencrypt.org/es/docs/ct-logs/">Testflume</a> y a Google <a href="http://www.certificate-transparency.org/known-logs#TOC-Test-Logs">testtube</a> CT test logs e incluye SCT devueltos en los certificados emitidos.</p>
