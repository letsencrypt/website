---
title: Começando a Usar
slug: getting-started
top_graphic: 3
date: 2019-12-21
---

{{< lastmod >}}

Para ativar o HTTPS em seu site, você precisa obter um certificado (um tipo de arquivo) 
provido por uma Autoridade Certificadora (AC). A Let's Encrypt é uma AC. Para obter um
certificado da Let's Encrypt para o domínio do seu website você precisa demonstrar
controle sobre o domínio. Com a Let's Encrypt, você pode fazer isso usando um software
que usa o [protocolo ACME](https://ietf-wg-acme.github.io/acme/), que normalmente é 
executado no seu servidor web.

Para identificar qual método vai funcionar melhor para você, você precisa determinar
se possui [acesso ao shell](https://en.wikipedia.org/wiki/Shell_account) (também conhecido
como acesso SSH) no seu serviço de hospedagem. Se você gerencia completamente o seu site através de um
painel de controle como o [cPanel](https://cpanel.net/), [Plesk](https://www.plesk.com/) ou 
[WordPress](https://wordpress.org/) então há uma boa chance de que você não tem acesso 
ao shell. Você pode perguntar ao seu provedor de hospedagem para ter certeza.

# Com Acesso ao Shell

Recomendamos às pessoas que possuem acesso ao shell utilizar o cliente ACME [Certbot].
Ele pode automatizar a emissão de certificado e instalações sem a necessidade de interromper o serviço.
Ele também possui um modo expert para pessoas que não querem autoconfiguração. É fácil de usar,
funciona com muitos sistemas operacionais e possui uma ótima documentação. [Visite o
site do Certbot][Certbot] para obter instruções indicadas para o seu sistema operacional e servidor web.

Se o [Certbot] não suprir suas necessidades ou você prefere usar outra coisa, existem
{{<link "muitos outros clientes ACME para se usar" "/docs/client-options" >}}. Uma vez que você tenha escolhido um cliente ACME
, veja a documentação do cliente escolhido para prosseguir.

Se você está experimentando diferentes clientes ACME, use nosso 
{{<link "ambiente de testes" "/docs/staging-environment" >}} para evitar atingir
nossos {{<link "limites de uso" "/docs/rate-limits" >}}.

[Certbot]: https://certbot.eff.org/  "Certbot"

# Sem Acesso ao Shell

A melhor forma de usar a Let's Encrypt sem acesso ao shell é usando o suporte embutido
provido pelo seu serviço de hospedagem. Se o seu serviço de hospedagem oferece a Let's Encrypt
então eles podem requisitar em seu nome um certificado gratuito, instalá-lo e 
mantê-lo atualizado automaticamente. Em alguns serviços de hospedagem esta é
uma configuração que você precisa ativar. Outros serviços 
solicitam e instalam certificados para todos os seus usuários automaticamente.

[Confira nossa lista de provedores de hospedagem](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920)
para ver se o seu está nela. Se estiver, siga a documentação dele para configurar
o seu certificado da Let's Encrypt.

Se o seu provedor de hospedagem não suportar a Let's Encrypt, você pode entrar em contato com eles
para solicitar o suporte. Nós fazemos nosso melhor para tornar muito fácil adicionar o suporte à
Let's Encrypt e provedores normalmente gostam muito de ouvir sugestões dos seus usuários!

Se o seu provedor de hospedagem não quiser integrar a Let's Encrypt, mas
suporta o upload de certificados personalizados, você pode instalar o Certbot no seu próprio
computador e usá-lo no [modo manual](https://certbot.eff.org/docs/using.html#manual).
No modo manual, você faz o upload de um arquivo específico no seu servidor para provar 
o seu controle. O Certbot então receberá um certificado que você poderá enviar para o seu
provedor de hospedagem. Nós não recomendamos esta opção porque ela demanda tempo 
e você precisará repeti-la algumas vezes por ano à medida que seu certificado
expirar. Para a maioria das pessoas é melhor solicitar ao provedor de hospedagem o suporte à Let's Encrypt, 
ou trocar de provedor caso eles não planejem implementá-lo.

# Obtendo Ajuda

Se você possui questões sobre a escolha de clientes ACME ou sobre como usar um cliente em particular, ou 
qualquer outra coisa relacionada à Let's Encrypt, por favor experimente usar nossos [úteis fóruns da comunidade](https://community.letsencrypt.org/c/help/ajuda-em-portugues).
