---
title: Let's Encrypt Stats
linkTitle: Statistics
slug: stats
top_graphic: 3
excerpt: Let's Encrypt certificate statistics.
menu:
  main:
    weight: 70
    parent: about
---

<div class="figure">
  <h2><a name="growth" href="#growth"
    >Let's Encrypt的发展历程</a></h2>
  <div id="activeUsage" title="Let's Encrypt Growth" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="percent-pageloads" href="#percent-pageloads"
    >Firefox使用HTTPS加载的网页百分比</a></h2>
  <p>(14日均线, 来源: <a href="https://docs.telemetry.mozilla.org/datasets/other/ssl/reference.html">Firefox Telemetry</a>)</p>
  <div id="pageloadPercent" title="Percentage of Web Pages Loaded by Firefox Using HTTPS" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="daily-issuance" href="#daily-issuance"
    >Let's Encrypt每天颁发的证书数量</a></h2>
  <div id="issuancePerDay" title="Let's Encrypt Certificates Issued Per Day" class="statsgraph"></div>
</div>

<script src="/js/stats.js" async></script>
<script src="/js/plotly-min.js" async></script>
