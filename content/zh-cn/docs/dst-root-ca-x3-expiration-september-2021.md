---
title: DST Root CA X3 到期(2021年9月)
slug: dst-root-ca-x3-expiration-september-2021
top_graphic: 1
lastmod: 2021-05-07
menu:
  main:
    weight: 30
    parent: about
show_lastmod: 1
---


2021年9月30日，旧浏览器和设备信任Let’s Encrypt 证书的方式会有一些微小的变化。 如果您运行的是一个常规的网站， 您不会注意到任何变化，绝大多数访客仍然会接受您的 Let’s Encrypt 证书。 如果您提供 API 或必须支持 IOT 设备，您可能需要 更多地关注这一变化。

Let’s Encrypt 有个名为 [ISRG Root X1][] 的"[根证书][]" 。 现代浏览器和设备信任您网站上安装的 Let’s Encrypt 证书，因为 它们在根证书列表中包含了 ISRG Root X1。 为了确保旧设备信任我们颁发的 证书。 我们也有一个来自旧根证书的 “交叉签名”：DST Root CA X3。

当我们开始时， 旧的根证书 (DST Root CA X3) 帮助我们从零开始 并立即得到几乎每个设备的信任。 较新的根证书 (ISRG Root X1) 现在也被广泛信任，但一些旧设备 不会信任它，因为它们没有获得软件更新 (例如 iPhone 4 或 HTC Dream)。 [点击这里查看哪些平台信任ISRG Root X1][compatibility]

DST Root CA X3 将于2021年9月30日到期。 这意味着那些不信任 ISRG Root X1 的旧设备在访问使用 Let’s Encrypt 证书的网站时将会得到证书过期警告。 有一个重要的 例外：旧的不信任 ISRG Root X1 的 Android 设备将能够继续正常访问使用 Let’s Encrypt 证书加密的网站， [感谢来自 DST Root CA X3][cross-sign] 的特殊交叉签名延长了该根证书的到期时间。 此例外仅适用于 Android 。

我应该怎么办？ 对于大多数人来说，什么都不用做！ 我们已经用有利于广泛兼容的方式设置了我们的 证书颁发服务，所以您的网站将在大多数情况下正常运行。 如果您提供 API 服务或必须支持 IoT 设备，则需要确保两件事：(1) API 服务的所有客户端都必须信任 ISRG Root X1 (而不仅仅信任 DST Root CA X3)，以及 (2) 如果您的 API 的客户端使用 OpenSSL，[它们必须使用 1.1.0 或更高版本][openssl]。 在 OpenSSL 1.0.x 版本中 ，证书验证时有个奇怪现象：当使用我们默认推荐的兼容 Android 的证书 链时，即使客户端信任 ISRG Root X1 ，也会出现证书错误。

如果你想要了解我们正在进行的生产环境证书链更改的更多信息， [请在我们的社区中查看这个帖子][production]

如果您对即将来临的证书过期有任何疑问， [请在我们的论坛的此话题下留言。][forum]

[根证书]: /docs/glossary/#def-root
[ISRG Root X1]: /certificates/
[cross-sign]: /2020/12/21/extending-android-compatibility.html
[openssl]: https://community.letsencrypt.org/t/openssl-client-compatibility-changes-for-let-s-encrypt-certificates/143816
[forum]: https://community.letsencrypt.org/t/help-thread-for-dst-root-ca-x3-expiration-september-2021/149190
[compatibility]: /docs/cert-compat/
[production]: https://community.letsencrypt.org/t/production-chain-changes/150739
