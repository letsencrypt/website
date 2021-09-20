---
title: Compatibilidade de Certificados
slug: certificate-compatibility
top_graphic: 1
date: 2016-12-05
lastmod: 2016-12-05
show_lastmod: 1
---


A Let's Encrypt almeja ser compatível com a maior quantidade de softwares possível sem comprometer a segurança. O principal fator que determina se uma plataforma pode validar os certificados da Let's Encrypt é se esta plataforma inclui o certificado IdenTrust's DST Root X3 e sua trust store. Um fator secundário é se a plataforma suporta os certificados modernos [SHA-2](https://konklone.com/post/why-google-is-hurrying-the-web-to-kill-sha-1) (Inglês), devido a todos os certificados da Let's Encrypt usarem SHA-2.

Se o seu certificado é validado em alguma das plataformas "Sabidamente Compatíveis" mas não em outras, o problema pode ser uma configuração incorreta do servidor web. Se você está tendo problemas com plataformas modernas, a causa mais comum é falha ao prover a cadeia de certificados. Se você está tendo problemas em plataformas antigas como Windows XP, as causas mais comuns são falha na configuração de uma suíte de cifras, versão TLS suportada pela plataforma ou que a plataforma não tem suporte a Server Name Indication (SNI). Teste o seu site com [Servidor de Testes da SSL Labs](https://www.ssllabs.com/ssltest/) (Inglês). Se isto não identificar o problema, peça ajuda nos nossos [Fóruns da Comunidade](https://community.letsencrypt.org/c/help/ajuda-em-portugues).

Talvez seja interessante visitar [esta thread em particular no fórum da comunidade](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/) (Inglês) para mais informações sobre compatibilidade.

# Sabidamente Compatíveis

* Mozilla Firefox >= v2.0
* Google Chrome
* Internet Explorer no Windows XP SP3 e superior
* Microsoft Edge
* Android OS >= v2.3.6
* Safari >= v4.0 no macOS
* Safari no iOS >= v3.1
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
* Console PS4 com o firmware versão >= 5.00

# Sabidamente Incompatíveis

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* Windows XP antes SP3
  * Incapaz de lidar com certificados assinados com SHA-2
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (cliente de e-mail de 2012 e não a versão web)
  * Incapaz de lidar com um certificado que não possui CRL
* Console PS3
* Console PS4 com o firmware versão < 5.00
