---
title: Let's Encrypt Statistika
linkTitle: Statistika
slug: stats
top_graphic: 3
excerpt: Let's Encrypt certificate statistics.
lastmod: 2019-08-22
menu:
  main:
    weight: 70
    parent: about
---

<div class="figure">
  <h2><a name="growth" href="#growth"
    >Rast Let's Encrypt-a</a></h2>
  <div id="activeUsage" title="Let's Encrypt Growth" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="percent-pageloads" href="#percent-pageloads"
    >Procenat web stranica učitanih od strane Firefox-a koristeći HTTPS</a></h2>
  <p>(14-dnevni prosek, izvor: <a href="https://docs.telemetry.mozilla.org/datasets/other/ssl/reference.html">Firefox Telemetry</a>)</p>
  <div id="pageloadPercent" title="Percentage of Web Pages Loaded by Firefox Using HTTPS" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="daily-issuance" href="#daily-issuance"
    >Let's Encrypt sertifikati izdati po danu</a></h2>
  <div id="issuancePerDay" title="Let's Encrypt Certificates Issued Per Day" class="statsgraph"></div>
</div>

{{< plotly >}}