---
title: Estadísticas de Let's Encrypt
linkTitle: Estadísticas
slug: stats
top_graphic: 3
excerpt: Estadísticas de certificados Let's Encrypt.
menu:
  main:
    weight: 70
    parent: about
---

Al presente, la gr&aacute;fica "Porcentaje de P&aacute;ginas de Web Cargadas por Firefox Usando HTTPS" es actual. Hay trabajo de mantenimiento actualmente y las estad&iacute;sticas "Crecimiento de Let's Encrypt" y "Certificados Let's Encrypt Emitidos por D&iacute;a" no est&aacute; a actualizadas. Esperamos tener estas gr&aacute;ficas funcionando nuevamente pronto.

<div class="figure">
  <h2><a name="growth" href="#growth"
    >Crecimiento de Let's Encrypt</a></h2>
  <div id="activeUsage" title="Crecimiento de Let's Encrypt" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="percent-pageloads" href="#percent-pageloads"
    >Porcentaje de P&aacute;ginas de Web Cargadas por Firefox Usando HTTPS</a></h2>
  <p>(media m&oacute;vil de 14 d&iacute;as, fuente: <a href="https://docs.telemetry.mozilla.org/datasets/other/ssl/reference.html">Firefox Telemetry</a>)</p>
  <div id="pageloadPercent" title="Porcentaje de P&aacute;ginas de Web Cargadas por Firefox Usando HTTPS" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="daily-issuance" href="#daily-issuance"
    >Certificados Let's Encrypt Emitidos por D&iacute;a</a></h2>
  <div id="issuancePerDay" title="Certificados Let's Encrypt Emitidos por D&iacute;a" class="statsgraph"></div>
</div>

<script src="/js/stats.js" async></script>
<script src="/js/plotly-min.js" async></script>
