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

<div class="figure">
  <h2><a name="growth" href="#growth"
    >Crecimiento de Let's Encrypt</a></h2>
  <div id="activeUsage" title="Crecimiento de Let's Encrypt" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="percent-pageloads" href="#percent-pageloads"
    >Porcentaje de Páginas de Web Cargadas por Firefox Usando HTTPS</a></h2>
  <p>(media móvil de 14 días, fuente: <a href="https://docs.telemetry.mozilla.org/datasets/other/ssl/reference.html">Firefox Telemetry</a>)</p>
  <div id="pageloadPercent" title="Porcentaje de Páginas de Web Cargadas por Firefox Usando HTTPS" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="daily-issuance" href="#daily-issuance"
    >Certificados Let's Encrypt Emitidos por Día</a></h2>
  <div id="issuancePerDay" title="Certificados Let's Encrypt Emitidos por Día" class="statsgraph"></div>
</div>

{{< plotly >}}
