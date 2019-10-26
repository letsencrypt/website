---
title: Compatibilidad de Certificados
slug: certificate-compatibility
untranslated: 1
date: 2016-12-05
---

<p>Let's Encrypt pretende ser compatible con la mayor cantidad de software posible sin comprometer la seguridad. El principal factor determinante para determinar si una plataforma puede validar los certificados Let’s Encrypt es si esa plataforma incluye el certificado DST Root X3 de IdenTrust en su almacén de confianza. Un factor secundario es si la plataforma admite dispositivos modernos [SHA-2](https://konklone.com/post/why-google-is-hurrying-the-web-to-kill-sha-1) ya que todos los certificados Let's Encrypt usan SHA-2.</p>

<p>Si su certificado se valida en algunas de las plataformas "compatibles conocidas" pero no en otras, el problema puede ser una configuración incorrecta del servidor web. Si tiene un problema con las plataformas modernas, la causa más común suele ser que no se proporciona la cadena de certificados correcta. Si tiene un problema con plataformas más antiguas como Windows XP, las causas más comunes son la falta de configuración de una versión de cifrado o TLS que sea compatible con la plataforma o que la plataforma no sea compatible con la Indicación de Nombre del Servidor (SNI). Pruebe su sitio en [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/). Si eso no identifica el problema, solicite ayuda en los [Foros de la Comunidad](https://community.letsencrypt.org/).</p>

<p>Es posible que desee visitar [esta discusión en particular en el foro de la comunidad Let's Encrypt](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/) para obtener más información sobre la compatibilidad.</p>

<h1 id="known-compatible">Navegadores o Dispositivos compatibles</h1>

<p>
<ul>
<li>Mozilla Firefox &gt;= v2.0</li>
<li>Google Chrome</li>
<li>Internet Explorer on Windows XP SP3 y superiores</li>
<li>Microsoft Edge</li>
<li>Android OS &gt;= v2.3.6</li>
<li>Safari &gt;= v4.0 on macOS</li>
<li>Safari on iOS &gt;= v3.1</li>
<li>Debian Linux &gt;= v6</li>
<li>Ubuntu Linux &gt;= v12.04</li>
<li>NSS Library &gt;= v3.11.9</li>
<li>Amazon FireOS (Silk Browser)</li>
<li>Cyanogen &gt; v10</li>
<li>Jolla Sailfish OS &gt; v1.1.2.16</li>
<li>Kindle &gt; v3.4.1</li>
<li>Java 7 &gt;= 7u111</li>
<li>Java 8 &gt;= 8u101</li>
<li>Blackberry &gt;= 10.3.3</li>
<li>PS4 consola de juego con firmware &gt;= 5.00</li>
</ul>
</p>

<h1 id="known-incompatible">No son compatibles</h1>

<p>
<ul>
<li>Blackberry &lt; v10.3.3</li>
<li>Android &lt; v2.3.6</li>
<li>Nintendo 3DS</li>
<li>Windows XP anterior a SP3
  <dl>
  <dd>( no puede manejar certificados firmados con SHA-2 )</dd>
  </dl>
</li>
<li>Java 7 &lt; 7u111</li>
<li>Java 8 &lt; 8u101</li>
<li>Windows Live Mail (2012 programa cliente de correo, no webmail)
  <dl>
  <dd>( no puede manejar certificados sin una CRL )</dd>
  </dl>
</li>
<li>PS3 consola de juego</li>
<li>PS4 consola de juego con firmware &lt; 5.00</li>
</ul>
</p>
