---
title: 証明書を失効する
slug: revoking
date: 2017-06-08
lastmod: 2021-08-03
show_lastmod: 1
---


証明書に対応する秘密鍵が安全でなくなったときは、証明書を失効する必要があります。 これにはいくつかの理由があります。 たとえば、パブリックなウェブサイト上で誤って秘密鍵を公開してしまった場合、ハッカーが秘密鍵をサーバーからコピーした場合、ハッカーが一時的にサーバーや DNS の設定を操作した場合、取得した秘密鍵で証明書の検証や発行が行われた場合などがあります。

Let's Encrypt の証明書を失効すると、Let's Encrypt は失効情報を [Online Certificate Status Protocol (OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) を用いて公開します。一部のブラウザは OCSP をチェックして証明書が信頼するべきかどうか確認します。 ただし、OCSP には[いくつかの基礎的な問題](https://www.imperialviolet.org/2011/03/18/revocation.html)があるため、すべてのブラウザがチェックするわけではないことに注意してください。 それでも、侵害された秘密鍵に対応する証明書を失効することは重要です。また、Let's Encrypt の [Subscriber Agreement](/repository) でも義務づけられています。

Let's Encrypt で証明書を失効するには、[ACME API](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) を使用しますが、通常は [Certbot](https://certbot.eff.org/) などのACME クライアントを使用します。 証明書の失効をするには、Let's Encrypt に対して失効の権限があることを証明しなければなりません。 証明の方法は３つあります。

# 証明書を発行したアカウントから行う方法

もともと自分で証明書を発行し、現在でも発行に使用したアカウントがコントロール下にある場合、そのアカウントを使って証明書を失効できます。 Certbot はデフォルトでこの方法を試します。 以下は失効を行う例です。

```bash
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem --reason keycompromise
```

# 証明書の秘密鍵を使用する方法

もともと自分で証明書を発行したわけではなくても、証明書に対応する秘密鍵のコピーを持っている場合、その秘密鍵を使って失効リクエストに署名を行うことで失効を行えます。 たとえば、秘密鍵が意図せず公開されてしまった場合には、自分自身で証明書を発行したわけでなくても、この方法で秘密鍵を使用して発行した証明書を失効できます。

この方法を使うには、初めに失効する証明書をダウンロードする必要があります。 Let's Encrypt はすべての証明書のログを [Certificate Transparency](https://www.certificate-transparency.org/) logs に記録しています。そのため、[crt.sh](https://crt.sh/) などの log monitor から証明書を見つけてダウンロードできます。

また、PEM 形式の秘密鍵のコピーも必要です。 これらが準備できたら、以下のコマンドで証明書を失効できます。

```bash
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/key.pem --reason keycompromise
```

# 別の認証済みアカウントを使用する方法

ホストや DNS が不正アクセスを受けた後に誰かが証明書を発行した場合、コントロールを取り戻した時点でその証明書を失効させたいものです。 証明書を失効させるために、Let's Encrypt は、その証明書に含まれるドメイン名を管理していること (そうでなければ、人々が勝手に互いの証明書を失効させることができてしまいます) を確認する必要があります! このコントロールを検証するために、Let's Encrypt は発行用のコントロールを検証するのと同じ方法を使います。[DNS の TXT レコードの値](https://tools.ietf.org/html/rfc8555#section-8.4)を入れたり、[HTTP サーバーにファイルを置く](https://tools.ietf.org/html/rfc8555#section-8.3)ことが可能です。 通常、ACME クライアントがこれらを処理します。 ほとんどのACMEクライアントは、検証と発行を組み合わせているため、検証を求めるには発行を試みるしかないことに注意してください。 出来上がった証明書が不要な場合は失効させるか、単に秘密鍵を破棄すればよいのです。 証明書の発行を一切行わないようにしたい場合は、コマンドラインに存在しないドメイン名を記述することで、他の既存のドメイン名を検証しつつ、発行を失敗させることができます。 これを行うには、次を実行します。

```bash
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

そして、その指示に従ってください。 DNS ではなく HTTP で検証したい場合は、`--preferred-challenges` フラグを `--preferred-challenges=http` に置き換えてください。

失効させたい証明書に含まれるすべてのドメイン名の制御を確認したら、[crt.sh](https://crt.sh/) から証明書をダウンロードし、自分が発行したかのように証明書の失効作業を進めることが可能です。

```bash
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem --key-path /PATH/TO/ --reason keycompromise
```
