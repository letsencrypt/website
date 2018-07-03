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

At present, the "Percentage of Web Pages Loaded by Firefox Using HTTPS" graph is current. There is maintenance work underway and the "Let's Encrypt Growth" and "Let's Encrypt Certificates Issued Per Day" statistics are not up-to-date. We hope to have these graphs back up and running soon.

<div class="figure">
  <h2><a name="growth" href="#growth"
    >Let's Encrypt Growth</a></h2>
  <div id="activeUsage" title="Let's Encrypt Growth" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="percent-pageloads" href="#percent-pageloads"
    >Percentage of Web Pages Loaded by Firefox Using HTTPS</a></h2>
  <p>(14-day moving average, source: <a href="https://docs.telemetry.mozilla.org/datasets/other/ssl/reference.html">Firefox Telemetry</a>)</p>
  <div id="pageloadPercent" title="Percentage of Web Pages Loaded by Firefox Using HTTPS" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="daily-issuance" href="#daily-issuance"
    >Let's Encrypt Certificates Issued Per Day</a></h2>
  <div id="issuancePerDay" title="Let's Encrypt Certificates Issued Per Day" class="statsgraph"></div>
</div>

## Code
Since the [2017-07-03 methodology change](https://community.letsencrypt.org/t/adjustments-to-the-lets-encrypt-statistics-methodology/):

- [ct-mapreduce](https://github.com/jcjones/ct-mapreduce) ingests data from CT logs and produces statistics about Let's Encrypt.
- HTTPS adoption comes from [Mozilla's Telemetry SSL Ratios dataset](https://docs.telemetry.mozilla.org/datasets/other/ssl/reference.html).

Before 2017-07-03:

- [ct-sql](https://github.com/jcjones/ct-sql) ingests data from Censys.io, CT logs, and Firefox Telemetry.
- [ct-sql-queries](https://github.com/jcjones/ct-sql-queries) contains the SQL queries run periodically to construct the data.

<script src="/js/stats.js" async></script>
<script src="/js/plotly-min.js" async></script>
