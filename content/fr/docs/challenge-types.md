---
title: Types de Challenges
slug: challenge-types
date: 2019-02-25
lastmod: 2023-02-13
show_lastmod: 1
---


Lorsque vous obtenez un certificat de Let's Encrypt, nos serveurs valident que vous contrôlez les noms de domaine dans ce certificat en utilisant des "challenges", comme défini par la norme ACME. La plupart du temps, cette validation est traitée automatiquement par votre client ACME, mais si vous devez prendre des décisions de configuration plus complexes, il est utile d'en savoir plus à leur sujet. Si vous n'êtes pas sûr, utilisez les paramètres par défaut de votre client ou le protocole HTTP-01.

# Challenge HTTP-01

C'est le type de challenge le plus courant aujourd'hui. Let's Encrypt donne un jeton à votre client ACME, et celui-ci place un fichier sur votre serveur web à l'adresse `http://<YOUR_DOMAIN>/.well-known/acme-challenge/<TOKEN>`. Ce fichier contient le jeton, ainsi qu'une empreinte de votre clé de compte. Une fois que votre client ACME indique à Let's Encrypt que le fichier est prêt, Let's Encrypt tente de le récupérer (potentiellement plusieurs fois à partir de plusieurs endroits). Si nos contrôles de validation obtiennent les bonnes réponses de votre serveur web, la validation est considérée comme réussie et vous pouvez continuer à délivrer votre certificat. Si les contrôles de validation échouent, vous devrez réessayer avec un nouveau certificat.

Notre implémentation du challenge HTTP-01 suit les redirections, jusqu'à 10 niveaux de redirections. Il n'accepte que les redirections vers "http :" ou "https :", et seulement vers les ports 80 ou 443. Il n'accepte pas les redirections vers des adresses IP. Lorsqu'il est redirigé vers une URL HTTPS, il ne valide pas les certificats (puisque ce challenge vise à amorcer les certificats valides, il peut rencontrer des certificats auto-signés ou expirés en cours de route).

Le challenge HTTP-01 ne peut se faire que sur le port 80. Permettre aux clients de spécifier des ports arbitraires rendrait le défi moins sûr, et ce n'est donc pas autorisé par la norme ACME.

Avantages :

 - Il est facile à automatiser sans connaissances supplémentaires sur la configuration d'un domaine.
 - Il permet aux hébergeurs de délivrer des certificats pour les domaines CNAME.
 - Il fonctionne avec des serveurs web prêts à l'emploi.

Inconvénients :

 - Cela ne fonctionne pas si votre FAI bloque le port 80 (c'est rare, mais certains FAI résidentiels le font).
 - Let's Encrypt ne vous permet pas d'utiliser ce défi pour délivrer des certificats de type "wildcard".
 - Si vous disposez de plusieurs serveurs web, vous devez vous assurer que le fichier est disponible sur chacun d'eux.

# Challenge DNS-01

Ce challenge vous demande de prouver que vous contrôlez le DNS pour votre nom de domaine en mettant une valeur spécifique dans un enregistrement TXT sous ce nom de domaine. Il est plus difficile à configurer que HTTP-01, mais peut fonctionner dans des scénarios où HTTP-01 ne peut pas. Il vous permet également de délivrer des certificats de type "wildcard". Après que Let's Encrypt ait donné un jeton à votre client ACME, votre client créera un enregistrement TXT dérivé de ce jeton et de votre clé de compte, et mettra cet enregistrement sous `_acme-challenge.<YOUR_DOMAIN>`. Ensuite, Let's Encrypt interrogera le système DNS pour cet enregistrement. Si il trouve une correspondance, vous pouvez procéder à la délivrance d'un certificat !

Comme l'automatisation de l'émission et des renouvellements est vraiment importante, il n'a de sens d'utiliser les challenges DNS-01 que si votre fournisseur de DNS dispose d'une API que vous pouvez utiliser pour automatiser les mises à jour. Notre communauté a commencé à dresser une [ liste de ces fournisseurs de DNS ici][dns-api-providers]. Votre fournisseur de DNS peut être le même que votre bureau d'enregistrement (la société à laquelle vous avez acheté votre nom de domaine), ou il peut être différent. Si vous souhaitez changer de fournisseur DNS, il vous suffit d'effectuer quelques petits changements auprès de votre bureau d'enregistrement. Vous n'avez pas besoin d'attendre que votre domaine soit proche de l'expiration pour le faire.

Notez que le fait de placer vos identifiants API DNS complets sur votre serveur web augmente considérablement l'impact en cas de piratage de ce serveur web. La meilleure pratique consiste à utiliser des [références API de portée plus étroite][securing-dns-credentials], ou à effectuer une validation DNS à partir d'un serveur séparé et à copier automatiquement les certificats sur votre serveur web.

Puisque Let's Encrypt suit les normes DNS lors de la recherche d'enregistrements TXT pour la validation DNS-01, vous pouvez utiliser les enregistrements CNAME ou NS pour déléguer la réponse au challenge à d'autres zones DNS. Cela peut être utilisé pour [déléguer le `_acme-challenge` sous-domaine][securing-dns-credentials] à un serveur ou une zone spécifique à la validation. Il peut également être utilisé si votre fournisseur de DNS est lent à se mettre à jour, et que vous souhaitez déléguer à un serveur de mise à jour plus rapide.

La plupart des fournisseurs de DNS ont un "temps de propagation" qui régit le temps qu'il faut entre le moment où vous mettez à jour un enregistrement DNS et celui où il est disponible sur tous leurs serveurs. Il peut être difficile de le mesurer car ils utilisent souvent aussi [anycast][], ce qui signifie que plusieurs serveurs peuvent avoir la même adresse IP, et selon l'endroit où vous vous trouvez dans le monde, vous pouvez parler à un serveur différent (et obtenir une réponse différente) que celle de Let's Encrypt. Les meilleures API DNS vous fournissent un moyen d’automatiquement vérifier si une mise à jour est pleinement propagée. Si votre fournisseur de DNS ne dispose pas de cette fonctionnalité, il vous suffit de configurer votre client pour qu'il attende suffisamment longtemps (souvent jusqu'à une heure) pour que la mise à jour se propage avant de déclencher la validation.

Vous pouvez avoir plusieurs enregistrements TXT en place pour le même nom. Par exemple, cela peut se produire si vous validez un challenge pour un certificat "wildcard" et un certificat "non-wildcard" en même temps. Cependant, vous devez veiller à nettoyer les anciens enregistrements TXT, car si la taille de la réponse devient trop importante, Let's Encrypt commencera à la rejeter.

Avantages :

 - Vous pouvez utiliser ce challenge pour délivrer des certificats contenant des noms de domaine "wildcard".
 - Ça fonctionne bien même si vous avez plusieurs serveurs web.

Inconvénients :

 - Il est risqué de conserver les identifiants API sur votre serveur web.
 - Il se peut que votre fournisseur de DNS ne propose pas d'API.
 - Votre API DNS peut ne pas fournir d'informations sur les délais de propagation.

# TLS-SNI-01

Ce challenge a été défini dans les versions préliminaires d'ACME. Il faisait un handshake TLS sur le port 443 et envoyait un en-tête spécifique [SNI][], à la recherche du certificat qui contenait le jeton. Il a été [désactivé en mars 2019][tls-sni-disablement] parce qu'il n'était pas assez sécurisé.

# TLS-ALPN-01

Ce challenge a été développé après que la norme TLS-SNI-01 soit devenue obsolète, et est développé en tant que [norme distincte][tls-alpn]. Comme TLS-SNI-01, il est effectué via TLS sur le port 443. Toutefois, elle utilise un protocole ALPN personnalisé pour garantir que seuls les serveurs qui sont informés de ce type de challenge répondront aux requêtes de validation. Cela permet également aux demandes de validation pour ce type de challenge d'utiliser un champ SNI qui correspond au nom de domaine en cours de validation, ce qui le rend plus sûr.

Ce challenge n'est pas adapté à la plupart des gens. Il est mieux adapté aux auteurs de "TLS-terminating reverse proxies" qui veulent effectuer une validation basée sur l'hôte comme HTTP-01, mais qui veulent le faire entièrement au niveau de la couche TLS afin de séparer les problèmes. Pour l'instant, il s'agit principalement de grands fournisseurs d'hébergement, mais les principaux serveurs web comme Apache et Nginx pourraient un jour mettre cela en œuvre (et [Caddy le fait déjà][caddy-tls-alpn]).

Avantages :

 - Il fonctionne si le port 80 n'est pas disponible pour vous.
 - Il peut être effectué uniquement au niveau de la couche TLS.

Inconvénients :

 - Il n'est pas supporté par Apache, Nginx ou Certbot, et ne le sera probablement pas de sitôt.
 - Comme pour HTTP-01, si vous avez plusieurs serveurs, ils doivent tous répondre avec le même contenu.
 - Cette méthode ne peut pas être utilisée pour valider les domaines génériques.

[dns-api-providers]: https://community.letsencrypt.org/t/dns-providers-who-easily-integrate-with-lets-encrypt-dns-validation/86438
[securing-dns-credentials]: https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation
[securing-dns-credentials]: https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation
[anycast]: https://en.wikipedia.org/wiki/Anycast
[SNI]: https://en.wikipedia.org/wiki/Server_Name_Indication
[tls-sni-disablement]: https://community.letsencrypt.org/t/march-13-2019-end-of-life-for-all-tls-sni-01-validation-support/74209
[tls-alpn]: https://tools.ietf.org/html/rfc8737
[caddy-tls-alpn]: https://caddy.community/t/caddy-supports-the-acme-tls-alpn-challenge/4860
