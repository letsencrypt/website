---
title: 即将推出的功能
slug: upcoming-features
lastmod: 2024-06-14
show_lastmod: 1
---

请在 Let's Encrypt 社群论坛的 [API Announcements](https://community.letsencrypt.org/c/api-announcements/18) 分类中查阅功能更新公告。

# 已实现的功能

## ECDSA根证书和中间证书

* 启用时间：2024 年 6 月 6 日

从现在起 ECDSA 叶证书将由我们的生产环境 ECDSA 中间证书签发。 请参阅[证书信任链](/certificates/)详细了解我们的 PKI 证书结构。

## ACME更新信息 (ARI)

* 启用时间: 2023 年 3 月 23 日

我们的 [ARI](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari.html) 系统已经上线，能够通过 API 提醒用户及时更新证书。

## 多视角验证

* 启用时间: 2020 年 2 月 19 日

我们已支持通过[多个网络视角](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html)对域名所有权进行验证。

## 证书透明化日志

* 启用时间：2019 年 5 月 15 日

我们的[证书透明化日志](/docs/ct-logs)系统已开始运作。

## 支持 TLS ALPN 验证

* 启用时间：2018 年 7 月 12 日

我们为被[出于安全原因停止使用](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811)的 TLS-SNI 验证方法制定并实现了一个[替代方法](https://tools.ietf.org/html/rfc8737)。 这个替代方法对于只想使用 443 端口进行验证的用户来说十分重要。

## 通配符证书

* 启用时间：2018 年 3 月 13 日

## ACME v2 API

* 启用时间：2018 年 3 月 13 日

## 完全 IPv6 支持

* 启用时间：2016 年 7 月 26 日
