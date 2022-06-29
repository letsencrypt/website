---
title: 即将推出的功能
slug: upcoming-features
top_graphic: 1
lastmod: 2021-09-16
show_lastmod: 1
---

## ACME更新信息 (ARI)

我们正在开发一个系统，使我们能够通过 API 通知订阅者需要更新证书。 这个系统将使我们能够通知订阅者，例如，他们需要在证书被吊销之前更新证书。

## ECDSA根证书和中间证书

我们正在从我们的生产环境中 [允许列出的账户](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679) 签发ECDSA证书。 不能确定何时取消白名单。

# 已实现的功能

## 多视角验证

* 启用时间: 2020 年 2 月 19 日

我们已通过[多个网络视角](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html)对域名所有权进行验证。

## 证书透明度（CT）日志

* 启用时间：2019 年 5 月 15 日

我们正在运作一个[证书透明度日志服务器](/docs/ct-logs).

## 支持 TLS ALPN 验证

* 启用时间：2018 年 7 月 12 日

我们为被[出于安全原因停止使用](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811)的 TLS-SNI 验证方法制定并实现了一个[替代方法](https://tools.ietf.org/html/rfc8737)。 这个替代方法对于只想使用 443 端口进行验证的用户来说十分重要。

## 通配符证书

* 启用时间：2018 年 3 月 13 日

## ACME v2 API

* 启用时间：2018 年 3 月 13 日

## 完全 IPv6 支持

* 启用时间：2016 年 7 月 26 日
