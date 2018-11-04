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
  <div id="pageloadPercent" title="Percentage of Web Pages Loaded by Firefox Using HTTPS" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="daily-issuance" href="#daily-issuance"
    >Certificados Let's Encrypt Emitidos por D&iacute;a</a></h2>
  <div id="issuancePerDay" title="Certificados Let's Encrypt Emitidos por D&iacute;a" class="statsgraph"></div>
</div>

## C&oacute;digo
Desde el [cambio de metodolog&iacute;a de 2017-07-03](https://community.letsencrypt.org/t/adjustments-to-the-lets-encrypt-statistics-methodology/):

- [ct-mapreduce](https://github.com/jcjones/ct-mapreduce) ingiere data de los registros CT y produce estad&iacute;sticas sobre Let's Encrypt.
- Adopci&oacute; HTTPS proviene del *dataset* [Mozilla's Telemetry SSL Ratios](https://docs.telemetry.mozilla.org/datasets/other/ssl/reference.html).

Antes de 2017-07-03:

- [ct-sql](https://github.com/jcjones/ct-sql) ingiere data de Censys.io, registros CT, y Firefox Telemetry.
- [ct-sql-queries](https://github.com/jcjones/ct-sql-queries) contiene los queries SQL que corren periodicamente para construir la data.

<script src="/js/stats.js" async></script>
<script src="/js/plotly-min.js" async></script>
