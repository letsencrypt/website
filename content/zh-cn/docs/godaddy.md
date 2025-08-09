---
title: "在 GoDaddy 平台上使用 Let's Encrypt 证书"
slug: godaddy
lastmod: 2025-07-31
show_lastmod: 1
---

我们收到了很多关于如何在 GoDaddy 平台上使用 Let’s Encrypt 证书的问题。 目前我们不建议在 GoDaddy 上使用我们的证书，因为其操作流程复杂，且无法自动化实现。

GoDaddy 不支持通过 [ACME 协议](https://tools.ietf.org/html/rfc8555)自动完成证书的申请与续期， 而是提供了一项自动续期的[付费功能](https://www.godaddy.com/web-security/ssl-certificate)，只能用于由他们所签发的证书。

但我们认为，自动续期是证书管理中至关重要的一部分， 由软件实现的自动续期能够大幅降低证书过期失效的风险。

如果您在了解上述问题后仍决定在 GoDaddy 平台上使用 Let’s Encrypt 证书，可以参考 GoDaddy 提供的[操作说明](https://www.godaddy.com/help/install-a-lets-encrypt-certificate-on-your-cpanel-hosting-account-28023)， 但我们无法保证其信息的准确性。 请注意，该流程非常耗时，并且每次证书到期前都需要您手动执行。
