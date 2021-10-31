---
title: 测试环境
slug: staging-environment
top_graphic: 1
date: 2018-01-05
lastmod: 2020-01-21
show_lastmod: 1
---


在使用我们的正式环境以前，我们强烈建议您使用我们的测试环境进行测试性部署，这将允许您在颁发受信任的证书前确保一切正常，并且降低您受到速率限制的可能性。

我们的 [ACME V2 测试环境](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605)为：

`https://acme-staging-v02.api.letsencrypt.org/directory`

如果您使用的是 Certbot，则可以通过 `--dry-run` 命令行标志来使用我们的测试环境。如果您使用的使其他 ACME 客户端，请阅读他们有关使用我们的测试环境进行测试的说明。请注意，只有兼容 ACME v2 的客户端才能使用 v2 测试环境。

# 速率限制

测试环境使用与[生产环境类似](/docs/rate-limits)的速率限制，但具体数据有所变化：

* **每个注册域名允许颁发的证书数量**限制为每周 30000 张。
* **重复证书**限制为每周 30000 张。
* 每小时允许 60 次**验证失败**。
* **每个 IP 地址注册账户数量**限制为每个 IP 每 3 小时允许注册 50 个账户。
* 对于 ACME v2，**新订单**限制为每个帐户每 3 小时 1500 个。

# 根证书

测试环境的中间证书（[“(STAGING) Artificial Apricot R3”](/certs/staging/letsencrypt-stg-int-r3.pem)）由**不在**浏览器/客户端的受信证书存储内的根证书颁发。如果您希望仅用于测试的客户端信任测试环境颁发的证书，您可以手动添加[“(STAGING) Pretend Pear X1”](/certs/staging/letsencrypt-stg-root-x1.pem)至该客户端的受信证书存储中。请注意：请不要将测试环境的根证书或中间证书安装进日常使用的受信证书存储中，因为这些证书没有受到 Let's Encrypt 的审计，也没有达到我们生产环境证书的标准，因此将其用于非测试环境可能会造成安全隐患。

# 证书透明度日志

测试环境将准证书提交给 Let's Encrypt 的测试用证书透明度日志 [Testflume](/docs/ct-logs) 和Google 的测试用证书透明度日志 [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs)，并在颁发的证书中包含其返回的 SCT。

# 持续集成/开发测试

测试环境具有允许进行测试的更高速率限制，但是不建议与开发环境或持续集成服务（CI）集成。 向外部服务器发出网络请求可能会导致网络不稳定，并且测试环境无法“伪造” DNS或强制其他验证成功通过，这会使测试设置更加复杂。

除了测试环境外，Let's Encrypt还提供了一个专用于CI和开发环境的小型ACME服务器，称为[Pebble](https://github.com/letsencrypt/pebble)。 您可以[快速而简单的](https://github.com/letsencrypt/pebble#docker)在开发机器或CI环境中运行Pebble。