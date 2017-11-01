---
layout: page
title: Let's Encrypt Stats
permalink: /stats/
top_graphic: 3
excerpt: Let's Encrypt certificate statistics.
---

These statistics are updated daily.

<div class="figure">
  <h2><a name="growth" href="#growth"
    >Let's Encrypt Growth</a></h2>
  <div id="activeUsage" title="Let's Encrypt Growth" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="percent-pageloads" href="#percent-pageloads"
    >Percentage of Web Pages Loaded by Firefox Using HTTPS</a></h2>
  <p>(14-day moving average, source: <a href="https://wiki.mozilla.org/Telemetry/FAQ#Telemetry_and_User_Control:_FAQ">Firefox Telemetry</a>)</p>
  <div id="pageloadPercent" title="Percentage of Web Pages Loaded by Firefox Using HTTPS" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="daily-issuance" href="#daily-issuance"
    >Let's Encrypt Certificates Issued Per Day</a></h2>
  <div id="issuancePerDay" title="Let's Encrypt Certificates Issued Per Day" class="statsgraph"></div>
</div>

## Code
Since the [2017-07-03 methodology change](https://community.letsencrypt.org/t/adjustments-to-the-lets-encrypt-statistics-methodology/):
- [ct-mapreduce](https://github.com/jcjones/ct-mapreduce) ingests data from CT logs and Firefox Telemetry, and produces statistics about Let's Encrypt.

Before 2017-07-03:
- [ct-sql](https://github.com/jcjones/ct-sql) ingests data from Censys.io, CT logs, and Firefox Telemetry.
- [ct-sql-queries](https://github.com/jcjones/ct-sql-queries) contains the SQL queries run periodically to construct the data.

<script src="/js/stats.js" async></script>
<script src="/js/plotly-min.js" async></script>
