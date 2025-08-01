---
title: 测试环境
slug: staging-environment
date: 2018-01-05
lastmod: 2025-05-12
show_lastmod: 1
---


在使用我们的正式环境以前，我们强烈建议您使用我们的测试环境进行测试性部署， 这将允许您在颁发受信任的证书前确保一切正常，并且降低您受到速率限制的可能性。

我们的 [ACME v2 测试环境](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605)的网址为：

`https://acme-staging-v02.api.letsencrypt.org/directory`

如果您使用的是 Certbot，可以通过 `--test-cert` 或 `--dry-run` 命令行选项使用我们的测试环境。 如果您使用的是其他 ACME 客户端，请阅读他们有关使用我们的测试环境进行测试的说明。

# 速率限制

测试环境与[生产环境的速率限制](/docs/rate-limits)类似，但具体数值有所不同：

* **[单个 IP 地址注册限制](/docs/rate-limits/#new-registrations-per-ip-address)**为每 3 小时 50 次。
* **[单个 IPv6 子网注册限制](/docs/rate-limits/#new-registrations-per-ipv6-range)**为每 3 小时 500 次（与生产环境相同）。
* **[单个账户证书申请限制](/docs/rate-limits/#new-orders-per-account)**为每 3 小时 1500 次。
* **[单个注册域名证书申请限制](/docs/rate-limits/#new-certificates-per-registered-domain)**为每秒 30000 次。
* **[相同域名集合证书申请限制](/docs/rate-limits/#new-certificates-per-exact-set-of-hostnames)**为每周 30000 次。
* **[单个账户同一域名验证失败次数限制](/docs/rate-limits/#authorization-failures-per-hostname-per-account)**为每小时 200 次。
* **[单个账户同一域名连续验证失败次数限制](/docs/rate-limits/#consecutive-authorization-failures-per-hostname-per-account)**为每 6 小时 3600 次。

[整体请求频率限制](/docs/rate-limits/#overall-requests-limit)为：

| 接口                 | 单 IP 每秒请求上限 | 突发容量 |
| ------------------ | ----------- | ---- |
| /acme/new-nonce    | 20          | 10   |
| /acme/new-account  | 5           | 15   |
| /acme/new-order    | 20          | 40   |
| /acme/revoke-cert  | 10          | 100  |
| /acme/renewal-info | 1000        | 100  |
| /acme/*            | 20          | 20   |
| /directory         | 40          | 40   |

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

测试环境也有专门用于测试的证书透明化日志系统， 为测试环境签发的证书提供 SCT。 但由于该环境仅供测试，通过证书透明化系统追踪证书的签发流程并不可靠。

测试环境中的日志系统既包括 Let's Encrypt 自身运作的[测试日志](/docs/ct-logs#testing)，也包括其他团体运作的用于测试目的的证书透明化日志。

此外，测试环境还可能包含某些 [ct-test-srv](https://pkg.go.dev/github.com/letsencrypt/boulder/test/ct-test-srv) 日志，但这些日志并非真实的日志系统，也不会存储签发的证书。

# 持续集成/开发测试

测试环境的速率限制较为宽松，但并不适合用于软件开发或持续集成 (CI)。 向外部服务器发出网络请求可能会导致网络不稳定，并且测试环境无法“伪造” DNS或强制其他验证成功通过，这会使测试设置更加复杂。

除了测试环境外，Let's Encrypt还提供了一个专用于CI和开发环境的小型ACME服务器，称为[Pebble](https://github.com/letsencrypt/pebble)。  您可以[快速而简单的](https://github.com/letsencrypt/pebble#docker)在开发机器或CI环境中运行Pebble。
