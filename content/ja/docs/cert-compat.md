---
title: 証明書の互換性
slug: certificate-compatibility
top_graphic: 1
date: 2016-12-05
lastmod: 2016-12-05
show_lastmod: 1
---


Let's Encrypt は、セキュリティを損なわずに、できるだけ多くのソフトウェアと互換性をもたせることを目指しています。Let's Encrypt の証明書を検証できるプラットフォームとなるかどうかの主な決定要因は、プラットフォームのトラストストアに IdenTrust の DST Root X3 証明書が含まれているかどうかです。第2の要因は、プラットフォームがモダンな [SHA-2](https://konklone.com/post/why-google-is-hurrying-the-web-to-kill-sha-1) 証明書をサポートしているかどうかです。Let's Encrypt のすべての証明書は SHA-2 を利用しているためです。

あなたの証明書が「互換性があるプラットフォーム」のどれかで検証ができたなら、ウェブブラウザの設定に問題がある可能性があります。モダンなプラットフォームで問題がある場合は、最もよくある原因は、正しい証明書チェーンを設定しなかったことです。Windows XP のような古いプラットフォーム上で問題がある場合は、最もよくある原因は、暗号スイートの設定の問題か、そのプラットフォームでサポートされている TLS のバージョンか、プラットフォームが Server Name Indication (SNI) をサポートしていないためです。あなたのサイトを [SSL Labs のサーバーテスト](https://www.ssllabs.com/ssltest/)でテストしてみてください。それでも問題が特定できなかった場合は、[コミュニティ・フォーラム](https://community.letsencrypt.org/)で質問してみてください。

互換性に関する情報については、[こちらのコミュニティ・フォーラムの議論](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/)が参考になるかもしれません。

# 互換性があるプラットフォーム

* Mozilla Firefox >= v2.0
* Google Chrome
* Windows XP SP3 以降の Internet Explorer
* Microsoft Edge
* Android OS >= v2.3.6
* macOS 上の Safari >= v4.0
* Safari on iOS >= v3.1
* Debian Linux >= v6
* Ubuntu Linux >= v12.04
* NSS Library >= v3.11.9
* Amazon FireOS (Silk Browser)
* Cyanogen > v10
* Jolla Sailfish OS > v1.1.2.16
* Kindle > v3.4.1
* Java 7 >= 7u111
* Java 8 >= 8u101
* Blackberry >= 10.3.3
* firmware >= 5.00 の PS4

# 互換性がないプラットフォーム

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* SP3 以前の Windows XP
  * SHA-2 の署名付き証明書が処理できない
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (ウェブメールではなく、2012 メールクライアント)
  * CRL がない証明書が処理できない
* PS3
* firmware < 5.00 の PS4
