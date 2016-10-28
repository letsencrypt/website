---
layout: page
title: Let's Encrypt Stats
permalink: /stats/
top_graphic: 3
excerpt: Let's Encrypt certificate statistics.
---

These statistics are updated daily.

<div class="figure">
  <h2>Let's Encrypt Growth</h2>
  <div id="activeUsage" title="Let's Encrypt Growth" class="statsgraph"></div>
</div>

<div class="figure">
  <h2>Percentage of Web Pages Loaded by Firefox Using HTTPS</h2>
  <p>(14-day moving average, source: <a href="https://wiki.mozilla.org/Telemetry/FAQ#Telemetry_and_User_Control:_FAQ">Firefox Telemetry</a>)</p>
  <div id="pageloadPercent" title="Percentage of Web Pages Loaded by Firefox Using HTTPS" class="statsgraph"></div>
</div>

<div class="figure">
  <h2>Let's Encrypt Certificates Issued Per Day</h2>
  <div id="issuancePerDay" title="Let's Encrypt Certificates Issued Per Day" class="statsgraph"></div>
</div>

## Code

- [ct-sql](https://github.com/jcjones/ct-sql) ingests data from Censys.io, CT logs, and Firefox Telemetry.
- [ct-sql-queries](https://github.com/jcjones/ct-sql-queries) contains the SQL queries run periodically to construct the data.

<script src="/js/stats.js" async></script>
<script src="/js/plotly-min.js" async></script>
