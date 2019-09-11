---
title: Let's Encrypt統計數據
linkTitle: 統計數據
slug: stats
top_graphic: 3
excerpt: Let's Encrypt統計數據。
lastmod: 2019-08-22
menu:
  main:
    weight: 70
    parent: about
---


<div class="figure">
  <h2><a name="growth" href="#growth"
    >Let's Encrypt增長趨勢</a></h2>
  <div id="activeUsage" title="Let's Encrypt增長趨勢" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="percent-pageloads" href="#percent-pageloads"
    >使用Firefox載入HTTPS網頁的百分比</a></h2>
  <p>(14日均線，來源： <a href="https://docs.telemetry.mozilla.org/datasets/other/ssl/reference.html">Firefox遙測</a>)</p>
  <div id="pageloadPercent" title="使用Firefox載入HTTPS網頁的百分比" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="daily-issuance" href="#daily-issuance"
    >Let's Encrypt每日頒發的憑證</a></h2>
  <div id="issuancePerDay" title="Let's Encrypt每日頒發的憑證" class="statsgraph"></div>
</div>

{{< plotly >}}
