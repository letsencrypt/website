---
title: 서비스 현황
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
    >Let’s Encrypt 성장률</a></h2>
  <div id="activeUsage" title="Let's Encrypt Growth" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="percent-pageloads" href="#percent-pageloads"
    >HTTPS를 이용하는 파이어폭스 브라우저가 불러온 웹 페이지 비율</a></h2>
  <p>(14-day moving average, source: <a href="https://docs.telemetry.mozilla.org/datasets/other/ssl/reference.html">Firefox Telemetry</a>)</p>
  <div id="pageloadPercent" title="Percentage of Web Pages Loaded by Firefox Using HTTPS" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="daily-issuance" href="#daily-issuance"
    >Let’s Encrypt 인증서 일일 발행량</a></h2>
  <div id="issuancePerDay" title="Let's Encrypt Certificates Issued Per Day" class="statsgraph"></div>
</div>

## 코드
[2017년 7월 3일부터 변경된 방법론](https://community.letsencrypt.org/t/adjustments-to-the-lets-encrypt-statistics-methodology/)에 따라:

- [ct-mapreduce](https://github.com/jcjones/ct-mapreduce)가 CT 로그로부터 데이터를 수집하며, Let’s Encrypt에 관한 통계 정보를 수집합니다.
- HTTP 채택은 [Mozilla's Telemetry SSL Ratios dataset](https://docs.telemetry.mozilla.org/datasets/other/ssl/reference.html)에서 끌어옵니다.

2017-07-03 전에는:

- [ct-sql](https://github.com/jcjones/ct-sql)가 Censys.io, CT 로그, 파이어폭스 텔레메트리로부터 데이터를 수집하였습니다.
- [ct-sql-queries](https://github.com/jcjones/ct-sql-queries)가 데이터를 구축하기 위해 주기적으로 SQL 쿼리문을 실행하였습니다.

<script src="/js/stats.js" async></script>
<script src="/js/plotly-min.js" async></script>
