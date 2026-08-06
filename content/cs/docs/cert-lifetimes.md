---
title: Důvody a plány týkající se doby platnosti certifikátů
slug: cert-lifetimes
lastmod: 2026-07-22
show_lastmod: 1
---

## Současná doba platnosti

Od svého spuštění v roce 2015 nabízí Let's Encrypt certifikáty s dobou platnosti 90 dní. Tato výchozí doba platnosti zůstává beze změny a naprostá většina námi vydávaných certifikátů má platnost 90 dní.

Všichni naši odběratelé si mohou zvolit také krátkodobé certifikáty s platností 6 dní.

Další informace najdete v naší [dokumentaci profilů certifikátů](/docs/profiles/).

## Budoucí plány

[Oborová pravidla](https://cabforum.org/working-groups/server/baseline-requirements/documents/) omezí dobu platnosti certifikátů na nejvýše 47 dní, a to od 15. března 2029. Proto [zkrátíme maximální dobu platnosti našich certifikátů na 45 dní nejpozději do února 2028](/2025/12/02/from-90-to-45.html).

## Proč kratší doba platnosti?

Někdy dostáváme dotazy, proč nabízíme pouze certifikáty s platností 90 dní nebo proč zavádíme ještě kratší dobu platnosti.

Kratší doba platnosti certifikátů má dvě hlavní výhody:

- Omezuje škody způsobené nesprávným vydáním certifikátu a kompromitací klíče. Nesprávně vydané certifikáty a certifikáty, jejichž klíče byly kompromitovány před vydáním nebo po něm, zůstávají platné po kratší dobu.
- Podporuje automatizaci, která je naprosto nezbytná pro snadné a spolehlivé používání. Po automatizaci správy certifikátů není kratší doba platnosti o nic méně pohodlná než delší.

Pro naši původní nabídku jsme zvolili platnost 90 dní, protože byla dostatečně krátká, aby výrazně podporovala automatizaci, ale zároveň dostatečně dlouhá, aby bylo možné postupovat ručně. Automatizaci jsme sice chtěli podporovat, tento cíl byl však podřízen možnosti zpřístupnit HTTPS všem. Automatizace tehdy nebyla tak běžná jako dnes, mimo jiné proto, že ekosystém potřebných nástrojů, například klientů ACME, byl teprve v počátcích. Dnes je situace zcela jiná: automatizace je mnohem běžnější a ekosystém potřebných nástrojů podstatně vyspělejší. Proto se dnes s nabídkou certifikátů s platností kratší než devadesát dní cítíme jistěji než tehdy.
