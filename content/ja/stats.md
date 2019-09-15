---
title: Let's Encrypt の統計情報
linkTitle: 統計情報
slug: stats
top_graphic: 3
excerpt: Let's Encrypt の証明書の統計情報。
lastmod: 2019-08-22
menu:
  main:
    weight: 70
    parent: about
---

<div class="figure">
  <h2><a name="growth" href="#growth"
    >Let's Encrypt の成長</a></h2>
  <div id="activeUsage" title="Let's Encrypt の成長" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="percent-pageloads" href="#percent-pageloads"
    >Firefox 上で HTTPS で読み込まれたウェブページの割合</a></h2>
  <p>(14 日間の移動平均。ソース: <a href="https://docs.telemetry.mozilla.org/datasets/other/ssl/reference.html">Firefox Telemetry</a>)</p>
  <div id="pageloadPercent" title="Firefox 上で HTTPS で読み込まれたウェブページの割合</a></h2>
  <p>(14 日間の移動平均" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="daily-issuance" href="#daily-issuance"
    >Let's Encrypt の1日あたりの証明書発行数</a></h2>
  <div id="issuancePerDay" title="Let's Encrypt の1日あたりの証明書発行数" class="statsgraph"></div>
</div>

{{< plotly >}}
