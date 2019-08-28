---
title: Let's Encrypt统计数据
linkTitle: 统计数据
slug: stats
top_graphic: 3
excerpt: Let's Encrypt统计数据。
menu:
  main:
    weight: 70
    parent: about
---


<div class="figure">
  <h2><a name="growth" href="#growth"
    >Let's Encrypt增长趋势</a></h2>
  <div id="activeUsage" title="Let's Encrypt增长趋势" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="percent-pageloads" href="#percent-pageloads"
    >使用Firefox加载的HTTPS网页的百分比</a></h2>
  <p>(14日均线，来源： <a href="https://docs.telemetry.mozilla.org/datasets/other/ssl/reference.html">Firefox遥测</a>)</p>
  <div id="pageloadPercent" title="使用Firefox加载的HTTPS网页的百分比" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="daily-issuance" href="#daily-issuance"
    >Let's Encrypt每日颁发的证书数量</a></h2>
  <div id="issuancePerDay" title="Let's Encrypt每日颁发的证书数量" class="statsgraph"></div>
</div>

<script src="/js/stats.js" async></script>
<script src="/js/plotly-min.js" async></script>
