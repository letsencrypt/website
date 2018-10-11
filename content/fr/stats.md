---
title: Statistiques sur Let's Encrypt
linkTitle: Statistiques
slug: stats
top_graphic: 3
excerpt: Statistiques sur Let's Encrypt.
menu:
  main:
    weight: 70
    parent: about
---

Actuellement, le graphique "Pourcentage de pages Web chargées par Firefox utilisant HTTPS" est à jour. Des travaux de maintenance sont en cours et les statistiques "Croissance de Let's Encrypt" et "Certificats de Let's Encrypt délivrés par jour" ne sont pas à jour. Nous espérons que ces graphiques seront bientôt opérationnels.

<div class="figure">
  <h2><a name="growth" href="#growth"
    >Croissance de Let's Encrypt</a></h2>
  <div id="activeUsage" title="Croissance de Let's Encrypt" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="percent-pageloads" href="#percent-pageloads"
    >Pourcentage de pages Web chargées par Firefox utilisant HTTPS</a></h2>
  <p>(Moyenne mobile sur 14 jours, source: <a href="https://docs.telemetry.mozilla.org/datasets/other/ssl/reference.html">Firefox Telemetry</a>)</p>
  <div id="pageloadPercent" title="Pourcentage de pages Web chargées par Firefox à l'aide du protocole HTTPS" class="statsgraph"></div>
</div>

<div class="figure">
  <h2><a name="daily-issuance" href="#daily-issuance"
    >Certificats de Let's Encrypt délivrés par jour</a></h2>
  <div id="issuancePerDay" title="Certificats de Let's Encrypt délivrés par jour" class="statsgraph"></div>
</div>

## Code
Depuis le [changement de méthodologie du 2017-07-03](https://community.letsencrypt.org/t/adjustments-to-the-lets-encrypt-statistics-methodology/):

- [ct-mapreduce](https://github.com/jcjones/ct-mapreduce) acquière des données à partir des journaux de CT et produit des statistiques sur Let's Encrypt.
- Adoption du HTTPS d'après [les données de télémesure SSL de Mozilla](https://docs.telemetry.mozilla.org/datasets/other/ssl/reference.html).

Avant le 2017-07-03:

- [ct-sql](https://github.com/jcjones/ct-sql) acquière des données à partir de Censys.io, des journaux de CT et la télémesure de Firefox.
- [ct-sql-queries](https://github.com/jcjones/ct-sql-queries) contient les requêtes SQL exécutées périodiquement pour construire les données.

<script src="/js/stats.js" async></script>
<script src="/js/plotly-min.js" async></script>
