---
layout: page
title: Let's Encrypt Stats
permalink: /stats/
top_graphic: 3
---

These statistics are updated periodically.

<div class="figure">
  <h2>Growth Timeline</h2>
  <div id="activeUsage" title="Growth Timeline" class="statsgraph"></div>
</div>

<div class="figure">
  <h2>Percentage of Pageloads that are Secure</h2>
  <p>(Calculated as a 14-day moving average)</p>
  <div id="pageloadPercent" title="Percent of Pageloads that are Secure" class="statsgraph"></div>
  <p>Source: <a href="https://telemetry.mozilla.org/">Firefox Telemetry</a></p>
</div>

<div class="figure">
  <h2>Certificates Issued Per Day</h2>
  <div id="issuancePerDay" title="Certificates Issued Per Day" class="statsgraph"></div>
</div>

<script src="/js/stats.js" async></script>
<script src="/js/plotly-min.js" async></script>
