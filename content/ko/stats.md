---
title: 서비스 현황
linkTitle: 통계
slug: stats
top_graphic: 3
excerpt: Let's Encrypt 인증서 통계
menu:
  main:
    weight: 70
    parent: about
---

<div class="figure">
  <h2><a name="growth" href="#growth"
    >Let’s Encrypt 성장률</a></h2>
  <div id="activeUsage" title="Let's Encrypt 성장률" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="percent-pageloads" href="#percent-pageloads"
    >HTTPS를 이용하는 파이어폭스 브라우저가 불러온 웹 페이지 비율</a></h2>
  <p>(14일 이동 평균, 소스: <a href="https://docs.telemetry.mozilla.org/datasets/other/ssl/reference.html">Firefox Telemetry</a>)</p>
  <div id="pageloadPercent" title="HTTPS를 이용하는 파이어폭스 브라우저가 불러온 웹 페이지 비율<" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="daily-issuance" href="#daily-issuance"
    >Let’s Encrypt 인증서 일일 발행량</a></h2>
  <div id="issuancePerDay" title="Let’s Encrypt 인증서 일일 발행량" class="statsgraph"></div>
</div>

<script src="/js/stats.js" async></script>
<script src="/js/plotly-min.js" async></script>
