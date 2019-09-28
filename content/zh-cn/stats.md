---
title: Let's Encrypt 统计数据
linkTitle: 统计数据
slug: stats
top_graphic: 3
excerpt: Let's Encrypt统计数据。
lastmod: 2019-08-22
menu:
  main:
    weight: 70
    parent: about
---


<div class="figure">
  <h2><a name="growth" href="#growth"
    >Let's Encrypt 增长趋势</a></h2>
  <div id="activeUsage" title="Let's Encrypt 增长趋势" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="percent-pageloads" href="#percent-pageloads"
    >使用 Firefox 加载的 HTTPS 网页的百分比</a></h2>
  <p>（14 日移动平均，数据来源：<a href="https://docs.telemetry.mozilla.org/datasets/other/ssl/reference.html">Firefox 遥测</a>）</p>
  <div id="pageloadPercent" title="使用 Firefox 加载的 HTTPS 网页的百分比" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="daily-issuance" href="#daily-issuance"
    >Let's Encrypt 每日颁发的证书数量</a></h2>
  <div id="issuancePerDay" title="Let's Encrypt 每日颁发的证书数量" class="statsgraph"></div>
</div>

{{< plotly >}}
