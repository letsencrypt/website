---
title: E-mails de Expiração
slug: expiration-emails
top_graphic: 1
date: 2016-07-02
lastmod: 2019-04-18
---

{{< lastmod >}}

# Inscrevendo-se

Se você forneceu um endereço de e-mail à Let's Encrypt durante a criação da sua
conta, vamos lhe enviar automaticamente notificações de expiração quando seu certificado
estiver próximo de uma renovação. Enviamos a primeira notificação 20 dias antes
da expiração do certificado, mais uma 10 dias antes e uma 1 dia antes da expiração.

# Quando Você Receberá E-mail de Expiração 

Se o seu certificado já estiver renovado, não lhe enviaremos uma notificação de expiração. Nós
consideramos um certificado renovado se houver um certificado mais recente 
com o mesmo conjunto de nomes de domínio, independente de qual conta tenha-o criado.
Se você criou um novo certificado que adiciona ou remove um nome relativo ao seu
certificado antigo, vamos lhe enviar um e-mail de expiração a respeito do seu certificado antigo.
Se ao checar o certificado atual do seu website ele exibir
a data de expiração correta, nenhuma outra ação é necessária.  

# Cancelando a Inscrição

O corpo do e-mail possui um link para se desinscrever de notificações futuras. Se você
clicar neste link você não receberá mais notificações de expiração pelo próximo ano.
A lista de "quem cancelou a inscrição" de notificações é diferente para os ambientes de Testes e
Produção, então você pode cancelar a inscrição no ambiente de Testes sem se preocupar
com os efeitos disso no ambiente de Produção.

Observe que o cancelamento de inscrição é válido por apenas um ano, então você
precisará renovar o cancelamento todos os anos.

Ainda não existe uma forma eficiente para que nós reativemos a sua inscrição
em caso de cancelamento. Nosso provedor de e-mail, Mandrill, [possui um mecanismo manual que ainda precisamos 
automatizar](https://mandrill.zendesk.com/hc/en-us/articles/205582947-About-Unsubscribes) (Inglês).

Entretanto, você pode mudar o endereço de e-mail associado à sua conta, isso irá
reinscrevê-lo automaticamente. Muitos serviços de e-mail tratam `seunome+1@example.com` como
sendo o mesmo que `seunome@example.com`. Dessa forma se você alterar seu endereço de e-mail para
`seunome+1@example.com`, você começará a receber e-mails de expiração novamente. Com o Certbot,
use:

`certbot update_account --email yourname+1@example.com`
