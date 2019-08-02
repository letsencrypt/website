---
title: 即将推出的功能
slug: upcoming-features
top_graphic: 1
lastmod: 2019-07-03
---

## 多视角（地点）验证

目前，Let's Encrypt从单一网络角度进行验证。 我们计划从多个网络角度开始验证。

## ECDSA根证书和中级证书

目前Let's Encrypt仅使用RSA中级证书签署终端证书。 我们将生成一个ECDSA根证书及中级证书，可用于签署终端证书。

# 已完成的功能

## 证书透明度日志

* 启用时间: 2019年5月15日

我们开始运营一个[证书透明度日志服务器]({{< ref "/docs/ct-logs.html" >}}).

## 支持TLS ALPN挑战

* 启用时间: 2018年7月12日

我们为被[出于安全原因停止](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811)的TLS-SNI验证方法制定并开启了[替换](https://datatracker.ietf.org/doc/draft-ietf-acme-tls-alpn/)方法。 对于只想使用443端口进行验证的用户来说，引入替换十分重要。

## 证书内置SCT记录

* 启用时间: 2018年3月29日

## 通配符（野卡）证书

* 启用时间: 2018年3月13日

## ACME v2 API

* 启用时间: 2018年3月13日

## IDN支持

* 启用时间: 2016年10月20日

Let's Encrypt现在支持对国际化域名（IDN）颁发证书。

## 完全的IPv6支持

* 启用时间: 2016年7月26日

最初，只有部分Let's Encrypt API基础架构可以通过IPv6进行通信。 这阻止了只有IPv6地址的系统与Let's Encrypt进行完全交互。 这已得到解决 - 已为所有功能启用了IPv6支持。

## Windows XP证书兼容

* 启用时间: 2016年3月25日

解决了我们的证书链在Windows XP浏览器无法被接受的问题。

## ECDSA签名支持

* 启用时间: 2016年2月10日

添加了Let's Encrypt使用RSA中级证书签署ECDSA密钥的功能。稍后将添加对具有完整ECDSA证书链的ECDSA密钥签名的支持。

## ACME DNS挑战支持

* 启用时间: 2016年1月20日

Let's Encrypt允许通过ACME规范中定义的DNS记录进行验证。

