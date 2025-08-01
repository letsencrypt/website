---
title: 即将推出的功能
slug: upcoming-features
lastmod: 2025-05-13
show_lastmod: 1
---

如需及时获取未来的功能更新公告，请[订阅 Technical Updates 邮件通知](https://letsencrypt.org/opt-in/)，或关注 Let's Encrypt 社群论坛的 [API Announcements](https://community.letsencrypt.org/c/api-announcements/18) 分类。

# 即将推出的功能

## 停止发送临期证书提醒邮件

我们计划于 2025 年 6 月 4 日[关停临期证书提醒邮件服务](https://letsencrypt.org/2025/01/22/ending-expiration-emails/)，并从生产环境数据库中删除所有 ACME 账户关联的电子邮箱地址。

## 短期证书

我们计划于 2025 年末对所有支持 ACME 证书配置（见下）的客户端开放[“短期”证书的申请](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/)。 此类证书的有效期极短，因此不需要包含任何吊销相关的信息（如 OCSP，见下）。

## IP 地址证书

我们计划于 2025 年末允许所有申请短期证书（见上）的客户端在其主体备用名称中[包含 IP 地址](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/)， 其[验证方式](https://www.rfc-editor.org/rfc/rfc8738.html)与当下 DNS 域名的验证方式大体相同。

## 移除“TLS 客户端身份验证”扩展密钥用途

我们计划于 2026 年 2 月 11 日从我们的默认证书配置中[移除“TLS 客户端身份验证”扩展密钥用途 (EKU)](https://letsencrypt.org/2025/05/14/ending-tls-client-authentication/)。 在此之前，我们会临时提供另一种仍包含该 EKU 的证书配置，但这只是为无法及时迁移的客户端提供的过渡措施，并且将于 2026 年 5 月 13 日截止。

# 已实现的功能

## 移除 OCSP 网址

上线日期：[2025 年 5 月 7 日](https://letsencrypt.org/2024/12/05/ending-ocsp/)。

我们签发的证书已不再包含颁发机构信息访问 (AIA) 在线证书状态协议 (OCSP) 网址， 而是提供证书吊销列表 (CRL) 发布点 (CRLDP) 网址。 证书使用者可以通过 CRL 获取证书吊销状态信息，ACME 客户端则可以通过 ARI（见下）获取证书续期建议。

## ACME 证书配置

上线日期：[2025 年 1 月 9 日](https://letsencrypt.org/2025/01/09/acme-profiles/)。

支持 [ACME 证书配置扩展草案](https://www.ietf.org/archive/id/draft-aaron-acme-profiles-01.html)的客户端现在可以在申请证书时选择[我们所支持的任一证书配置](https://letsencrypt.org/docs/profiles/)。

## 静态证书透明化日志

上线日期：[2024 年 3 月 14 日](https://letsencrypt.org/2024/03/14/introducing-sunlight/)。

我们运作的证书透明化 (CT) 日志现已遵循新的[静态证书透明化接口规范](https://c2sp.org/static-ct-api)，由 [Sunlight](https://github.com/FiloSottile/sunlight) 软件提供服务。 考虑到多个 CT 日志项目都已更新其规则并接受此类日志，我们计划近期申请加入这些项目。

## ACME更新信息 (ARI)

上线日期：[2023 年 3 月 23 日](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari/)。

我们现已为签发的所有证书提供推荐的续期时间窗口，客户端可以通过 [ACME ARI 扩展](https://www.ietf.org/archive/id/draft-ietf-acme-ari-08.html)查询。
