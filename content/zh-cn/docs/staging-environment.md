---
title: 测试环境
slug: staging-environment
date: 2018-01-05
lastmod: 2024-06-11
show_lastmod: 1
---


在使用我们的正式环境以前，我们强烈建议您使用我们的测试环境进行测试性部署， 这将允许您在颁发受信任的证书前确保一切正常，并且降低您受到速率限制的可能性。

我们的 [ACME v2 测试环境](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605)的网址为：

`https://acme-staging-v02.api.letsencrypt.org/directory`

如果您使用的是 Certbot，可以通过 `--test-cert` 或 `--dry-run` 命令行选项使用我们的测试环境。 如果您使用的是其他 ACME 客户端，请阅读他们有关使用我们的测试环境进行测试的说明。

# 速率限制

测试环境使用与[生产环境类似](/docs/rate-limits)的速率限制，但具体数据有所变化：

* **每个注册域名允许颁发的证书数量**限制为每周 30000 张。
* **重复证书**限制为每周 30000 张。
* 每小时允许 60 次**验证失败**。
* **每个 IP 地址注册账户数量**限制为每个 IP 每 3 小时允许注册 50 个账户。
* 对于 ACME v2，**新订单**限制为每个帐户每 3 小时 1500 个。

# 测试证书层次结构

测试环境的证书结构[与生产环境相似](/certificates)。 但测试证书的名称开头有 (STAGING) 字样，且命名方式也与生产环境中的证书截然不同，以示区分。

## 根证书颁发机构

测试环境目前启用了两份根证书“(STAGING) Pretend Pear X1”和“(STAGING) Bogus Broccoli X2”，这两份根证书**没有收录**至各类浏览器和客户端的证书库中。

如果您想在仅用作测试的客户端软件中信任测试环境的证书，可以将证书加入该客户端的证书库中。 **重要提示**：请勿将测试环境的根证书或中间证书加入您日常使用的证书库中，因为这些证书没有经过审计，安全标准也不及生产环境的根证书，用于测试以外的任何目的都是不安全的。

* **Pretend Pear X1**
  * 证书主体：`O = (STAGING) Internet Security Research Group, CN = (STAGING) Pretend Pear X1`
  * 密钥类型：`RSA 4096`
  * 证书详细信息：[der](/certs/staging/letsencrypt-stg-root-x1.der)、[pem](/certs/staging/letsencrypt-stg-root-x1.pem)、[txt](/certs/staging/letsencrypt-stg-root-x1.txt)
* **Bogus Broccoli X2**
  * 证书主体：`O = (STAGING) Internet Security Research Group, CN = (STAGING) Bogus Broccoli X2`
  * 密钥类型：`ECDSA P-384`
  * 证书详细信息（自签名版本）：[der](/certs/staging/letsencrypt-stg-root-x2.der)、[pem](/certs/staging/letsencrypt-stg-root-x2.pem)、[txt](/certs/staging/letsencrypt-stg-root-x2.txt)
  * 证书详细信息（Pretend Pear X1 交叉签名的版本）：[der](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.der)、[pem](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.pem)、[txt](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.txt)

## 中间证书颁发机构

测试环境的中间证书与生产环境类似，但由上述的不可信根证书签发。 和生产环境一样，并非所有中间证书都会同时投入使用。 当前所有的中间证书如下：

* (STAGING) Pseudo Plum E5
* (STAGING) False Fennel E6
* (STAGING) Puzzling Parsnip E7
* (STAGING) Mysterious Mulberry E8
* (STAGING) Fake Fig E9
* (STAGING) Counterfeit Cashew R10
* (STAGING) Wannabe Watercress R11
* (STAGING) Riddling Rhubarb R12
* (STAGING) Tenuous Tomato R13
* (STAGING) Not Nectarine R14

这些中间证书随时可能变更，任何系统都不应加以固定或信任。 一般而言，您可以认为测试环境的中间证书与生产环境中可信的中间证书一一对应。 如果确有必要，您还可以在[此处](https://github.com/letsencrypt/website/blob/main/static/certs/staging)获取详尽的证书信息。

# 证书透明化

测试环境中的准证书会录入 Let's Encrypt 的 [Sapling](/docs/ct-logs) 以及 Google 的 [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) 两套证书透明化日志测试系统，产生的 SCT 将包含在颁发的证书中。

# 持续集成/开发测试

测试环境具有允许进行测试的更高速率限制，但是不建议与开发环境或持续集成服务（CI）集成。  向外部服务器发出网络请求可能会导致网络不稳定，并且测试环境无法“伪造” DNS或强制其他验证成功通过，这会使测试设置更加复杂。

除了测试环境外，Let's Encrypt还提供了一个专用于CI和开发环境的小型ACME服务器，称为[Pebble](https://github.com/letsencrypt/pebble)。  您可以[快速而简单的](https://github.com/letsencrypt/pebble#docker)在开发机器或CI环境中运行Pebble。
