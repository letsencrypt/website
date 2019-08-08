---
title: Upcoming Features
slug: upcoming-features
top_graphic: 1
lastmod: 2019-07-03
---

## 多视角验证（Multi-Perspective Validation）

目前Let's Encrypt只从单个网络视角进行验证。我们打算开始实施多视角验证。

## 应用ECDSA的根与中介（ECDSA Root and Intermediates）

目前Let's Encrypt仅使用RSA中介签署终端实体证书。 Let's Encrypt将生成一个ECDSA（椭圆曲线数字签名算法）根和中介，用于签署最终实体证书。

# 已完成的特性

## 证书透明度日志（Certificate Transparency Log）

* 启用于: May 15, 2019

我们正在启用一个[证书透明度日志]({{< ref "/docs/ct-logs.html" >}})。

## TLS ALPN Challenge 支持（TLS ALPN Challenge Support）

* 启用于: July 12, 2018

我们挑选并实现了对 [出于安全原因而停止](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811) 的TLS-SNI认证方法的[替换](https://datatracker.ietf.org/doc/draft-ietf-acme-tls-alpn/) 。对于只想使用 443 端口进行验证的用户，引入一个替换是很重要的。

## 证书中内嵌SCT收据（Embed SCT receipts in certificates）

* 启用于: March 29, 2018

## 通配符证书（Wildcard Certificates）

* 启用于: March 13, 2018

## ACME v2 API

* 启用于: March 13, 2018

## 国际化域名支持（IDN Support）

* 启用于: October 20, 2016

Let's Encrypt现在支持国际化域名(IDNs)的发布。

## 完全的IPv6支持（Full IPv6 Support）

* 启用于: July 26, 2016

一开始只有部分Let's Encrypt的API基础设施可以通过IPv6交流。这阻止了IPv6-only系统与Let's Encrypt进行完全交互的可能。现在这个问题解决了——所有功能（functionality）都启用了IPv6支持。

## Windows XP证书兼容性（Windows XP Certificate Compatibility）

* 启用于: March 25, 2016

解决了一个与我们的信任链有关的，阻止Windows XP上的浏览器接受Let's Encrypt证书的问题。

## ECDSA签名支持（ECDSA Signing Support）

* 启用于: February 10, 2016

使Let's Encrypt可以使用Let's Encrypt的RSA中介签名ECDSA密钥。关于使用一个完全由ECDSA链签名ECDSA密钥的支持，将在不久后添加。

## ACME DNS验证支持（ACME DNS Challenge Support）

* 启用于: January 20, 2016

Let's Encrypt允许通过符合ACME规范的DNS Challenge进行验证。