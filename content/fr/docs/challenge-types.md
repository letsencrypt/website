---
title: Types de défis
slug: challenge-types
top_graphic: 1
date: 2019-02-25
lastmod: 2020-02-24
---

{{< lastmod >}}

Lorsque vous recevez un certificat de Let's Encrypt, nos serveurs valident que vous contrôlez les noms de domaine dans ce certificat à l'aide de «défis» tel que défini par le standard ACME. La plupart du temps, cette validation est gérée automatiquement par votre client ACME, mais si vous devez faire certaines décisions de configuration plus complexes, il est utile d'en savoir plus à propos d'eux. Si vous n'êtes pas sûr de vous, choisissez les valeurs par défaut de votre client ou avec le défi HTTP-01.

# Défi HTTP-01

Il s'agit du type de défi le plus courant aujourd'hui. Let’s Encrypt donne un jeton à votre client ACME, et votre client ACME place un fichier sur votre serveur Web  à   `http://<YOUR_DOMAIN>/.well-known/acme-challenge/<TOKEN>`. Ce fichier contient le jeton, plus une empreinte numérique de la clef de votre compte. Une fois que votre client ACME indique à Let’s Encrypt que le fichier est prêt, Let’s Encrypt essaie de le récupérer (potentiellement plusieurs fois à partir de plusieurs points). Si nos contrôles de validation obtiennent les bonnes réponses de votre serveur web, la validation est considérée comme réussie et vous pouvez continuer à émettre votre certificat. Si les contrôles de validation échouent, vous devrez réessayer avec un nouveau certificat.

Notre implémentation du défi HTTP-01 suit les redirections, jusqu'à 10 niveaux. Il accepte uniquement les redirections vers "http:" ou "https:", et uniquement vers les ports 80 ou 443. Il n'accepte pas les redirections vers les adresses IP. Quand il est redirigé vers une URL HTTPS, il ne valide pas les certificats (car cela est destiné à amorcer des certificats valides, il peut rencontrer des certificats auto-signés ou expirés en cours de route).

Le défi HTTP-01 ne peut être effectué que sur le port 80. Permettre aux clients de spécifier des ports arbitraires rendrait le défi moins sûr, et donc il n'est pas autorisé par le standard ACME.

Pour:

  - Il est facile d'automatiser la configuration d'un domaine sans connaissances supplémentaires.
  - Il permet aux hébergeurs de délivrer des certificats pour les domaines  dont les CNAME pointent vers eux.
  - Il fonctionne avec des serveurs Web standard.

Contre:

  - Cela ne fonctionne pas si votre FAI bloque le port 80 (c'est rare, mais certains FAI résidentiels le font).
  - Let's Encrypt ne vous permet pas d'utiliser ce défi pour émettre des certificats génériques.
  - Si vous avez plusieurs serveurs Web, vous devez vous assurer que le fichier est disponible sur chacun d'eux.

# Défi DNS-01

Ce défi vous demande de prouver que vous contrôlez le DNS pour votre nom de domaine en placant une valeur spécifique dans un enregistrement de type TXT sous ce nom de domaine. Il est plus difficile à configurer que HTTP-01, mais peut fonctionner dans des scénarios que HTTP-01 ne gère pas. Il vous permet également d'émettre des certificats génériques. Après que Let’s Encrypt ai donné un jeton à votre client ACME, celui-ci va créer un enregistrement TXT dérivé de ce jeton et de votre clef de compte, via une entrée DNS  se nommant  `_acme-challenge. <YOUR_DOMAIN>`. Alors Let's Encrypt interrogera le système DNS pour cet enregistrement. S'il trouve une correspondance, vous pouvez réaliser la délivrance d'un certificat!

Étant donné que l'automatisation de l'émission et du renouvellement est très importante, il est logique d'utiliser les défis DNS-01 si votre fournisseur DNS dispose d'une API qu'il met à disposition pour automatiser les mises à jour. Notre communauté a commencé une [liste de ces fournisseurs de DNS ici][dns-api-providers]. Votre fournisseur DNS peut être le même que votre bureau d'enregistrement ( (registrar) la société auprès de laquelle vous avez acheté votre nom de domaine), ou pourrait être différent. Si vous souhaitez changer de fournisseur DNS, vous avez juste besoin de faire quelques petits changements chez votre registrar. Vous n'avez pas besoin d'attendre que votre domaine soit proche de l'expiration pour le faire.

Notez que la mise en place de vos informations d'identification API DNS sur votre serveur Web augmente considérablement l'impact si ce serveur Web est piraté. La bonne pratique consiste à utiliser [des informations d'identification d'API de portée plus étroite][securing-dns-credentials], ou de réaliser la validation DNS à partir d'un serveur distinct et copier automatiquement les certificats sur votre serveur Web.

Étant donné que Let’s Encrypt suit les normes DNS lors de la recherche de l'entrée TXT
pour la validation DNS-01, vous pouvez utiliser des enregistrements CNAME ou NS pour
déléguer la réponse  au défi à d'autres zones DNS. Cela peut être utilisé pour [déléguer le sous-domaine `_acme-challenge`][securing-dns-credentials] vers un serveur ou une zone spécifique à la validation. Il peut également être utilisé si votre fournisseur de DNS est lent à mettre à jour un changement et que vous souhaitez déléguer cette tâche à un serveur dont la mise à jour est plus rapide.

La plupart des fournisseurs DNS ont un «temps de propagation» qui régit la durée que prend la mise à jour d'un enregistrement DNS jusqu'à ce qu'il soit disponible sur tous les leurs serveurs. Il peut être difficile de mesurer cela car ils utilisent souvent [anycast], ce qui signifie que plusieurs serveurs peuvent avoir la même adresse IP, et selon l'endroit où vous vous trouvez dans le monde, vous pourriez parler à un serveur différent (et obtenez une réponse différente) que celui joint par Let’s Encrypt. La meilleure API DNS vous permet de vérifier automatiquement si une mise à jour a été entièrement propagée. Si votre fournisseur DNS n'en dispose pas, il vous suffit de configurer votre client pour qu'il attende assez longtemps (souvent au moins une heure) pour s'assurer que la mise à jour est propagée avant de déclencher la validation.

Vous pouvez avoir plusieurs enregistrements TXT en place pour le même nom.  Par exemple, cela peut se produire si vous validez un défi pour un certificat générique  et un non-générique en même temps. Cependant, vous devez vous assurer de nettoyer les anciens enregistrements TXT, car si la taille de la réponse devient trop grande. Let’s Encrypt la rejettera.

Pour:

  - Vous pouvez utiliser ce défi pour émettre des certificats contenant des noms de domaine génériques.
  - Cela fonctionne bien même si vous avez plusieurs serveurs Web.

Contre:

  - Conserver les informations d'identification de l'API sur votre serveur Web est risqué.
  - Votre fournisseur DNS peut ne pas proposer d'API.
  - Votre API DNS peut ne pas fournir d'informations sur les temps de propagation.

# TLS-SNI-01

Ce défi a été défini dans les versions préliminaires d'ACME. Il effectuait une négociation TLS sur le port 443 et envoyait un en-tête [SNI] spécifique, recherchant le certificat contenant le jeton. Il [a été désactivé en mars 2019][tls-sni-disablement] car il n'était pas suffisamment sécurisé.

# TLS-ALPN-01

Ce défi a été développé après que TLS-SNI-01 ai été devenu obsolète, et est en cours d'élaboration en tant que [norme distincte][tls-alpn]. Comme le TLS-SNI-01, ce défi est réalisé via TLS sur le port 443. Cependant, il utilise un protocole ALPN personnalisé pour garantir que seuls les serveurs qui connaissent ce type de défi répondront aux demandes de validation. Cela permet également des demandes de validation pour ce type de défi d'utiliser un champ SNI qui correspond au nom de domaine en cours de validation, ce qui le rend plus sûr.

Ce défi ne convient pas à la plupart des gens. Il est mieux adapté aux auteurs de proxys inverses à terminaison TLS qui souhaitent effectuer la validation basée sur l'hôte comme avec HTTP-01, mais qui veulent le faire entièrement au niveau de la couche TLS afin de séparer les problèmes. En ce moment, cela concerne principalement les grands hébergeurs, mais les serveurs web grand public comme Apache et Nginx pourrait un jour l'implémenter (et [Caddy le fait déjà][caddy-tls-alpn]).

Pour:

  - Cela fonctionne si le port 80 n'est pas disponible pour vous.
  - Il peut être effectué uniquement au niveau de la couche TLS.

Contre:

  - Il n'est pas pris en charge par Apache, Nginx ou Certbot, et ne le sera probablement pas bientôt.
  - Comme HTTP-01, si vous avez plusieurs serveurs, ils doivent tous répondre avec le même contenu.

[dns-api-providers]: https://community.letsencrypt.org/t/dns-providers-who-easily-integrate-with-lets-encrypt-dns-validation/86438
[securing-dns-credentials]: https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation
[anycast]: https://en.wikipedia.org/wiki/Anycast
[SNI]: https://en.wikipedia.org/wiki/Server_Name_Indication
[tls-sni-disablement]: https://community.letsencrypt.org/t/march-13-2019-end-of-life-for-all-tls-sni-01-validation-support/74209
[tls-alpn]: https://tools.ietf.org/html/rfc8737
[caddy-tls-alpn]: https://caddy.community/t/caddy-supports-the-acme-tls-alpn-challenge/4860
