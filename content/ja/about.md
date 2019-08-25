---
title: Let's Encrypt について
linkTitle: Let's Encrypt
slug: about
top_graphic: 1
lastmod: 2019-01-28
menu:
  main:
    weight: 10
    parent: about
---

Let's Encrypt は、公共の利益のために運営されている、フリーで自動化されたオープンな認証局 (certificate authority; CA) です。[インターネット・セキュリティ・研究グループ (Internet Security Research Group; ISRG)](https://www.abetterinternet.org/) がサービスを提供しています。

私たちは人々のために、ウェブサイトで HTTPS (SSL/TLS) を有効にするために必要なデジタル証明書を、無料で、私たちにできる最もユーザーフレンドリーな方法で発行しています。私たちがこのようなことをする理由は、よりセキュアでプライバシーを尊重するウェブを作りたいと願っているからです。

Let's Encrypt の背景にあるキーとなる原則は次のとおりです。

* <strong>無料:</strong> ドメイン名を持っている人なら誰でも、Let's Encrypt を利用して費用なしで信頼される証明書を取得することができる。
* <strong>自動化:</strong> ウェブサーバー上で Let's Encrypt と通信できるソフトウェアを動かすことで、証明書の取得や使用するためのセキュアな設定、更新の作業を簡単に行える。
* <strong>セキュア:</strong> Let's Encrypt は、それ自体が発展的な TLS セキュリティのベスト・プラクティスを実践するプラットフォームとして提供される。これは、CA サイドとサイトのオペレータがサーバーを適切にセキュアにすることによって成り立つ。
* <strong>透明性:</strong> 発行または無効化されたすべての証明書は、パブリックに記録され、だれでも検証に利用することができる。
* <strong>オープン:</strong> 自動的な発行・更新のプロトコルを、今後オープンスタンダートとして発行し、誰でも採用できるようにする。
* <strong>協力的:</strong> インターネットのプロトコル自体と同じように、Let's Encrypt はコミュニティに利益を与えるための協力的な努力のもとに成り立っており、いかなる組織のコントロールも受けない。

システムの動作のより詳細な情報については、[Let's Encrypt CA の動作の仕組み]({{< ref "/how-it-works.md" >}})を読んでください。
