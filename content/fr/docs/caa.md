---
title: Certificate Authority Authorization (CAA)
slug: caa
top_graphic: 1
date: 2017-07-27
lastmod: 2017-07-27
show_lastmod: 1
---

CAA est un type d'enregistrement DNS qui permet aux propriétaires de site de spécifier quelles Autorités de Certificat (AC) sont autorisées à émettre des certificats contenant leurs noms de domaine. Il a été standardisé en 2013 par le [RFC 6844](https://tools.ietf.org/html/rfc6844) pour autoriser une AC à réduire le risque de délivrance de certificat imprévue. Par défaut, chaque AC publique est autorisée à émettre des certificats pour tout nom de domaine dans le DNS, à condition qu'ils valident le contrôle de ce nom de domaine. Cela signifie que s'il y a un bogue dans l'un des nombreux processus de validation des AC publics, chaque nom de domaine est potentiellement affecté. CAA fournit un moyen aux détenteurs de domaine de réduire ce risque.

# Utilisation du CAA

Si vous ne vous souciez pas de CAA, vous n'avez généralement rien à faire (mais voyez erreurs CAA ci-dessous). Si vous souhaitez utiliser CAA pour restreindre les Autorités de Certificat autorisées à émettre des certificats pour votre domaine, vous devrez utiliser un fournisseur DNS qui prend en charge la configuration des enregistrements CAA. Référez-vous à [la page CAA de SSLMate](https://sslmate.com/caa/support) pour une liste de ces fournisseurs. Si votre fournisseur est listé, vous pouvez utiliser [le générateur d'entrées CAA de SSLMate](https://sslmate.com/caa/) pour générer un ensemble d'entrées CAA qui liste les AC que vous souhaitez autoriser.

Le nom de domaine d'identification de Let's Encrypt pour CAA est `letsencrypt.org`. C'est officiellement documenté [dans notre Certification Practice Statement (CPS)](/repository).

## Où ajouter l'entrée

Vous pouvez définir des enregistrements CAA sur votre domaine principal, ou à n'importe quel niveau de sous-domaine. Par exemple, si vous avez `www.community.example.com`, vous pouvez définir des enregistrements CAA pour tout le domaine, ou pour `community.example.com`, ou pour `example.com`. Les AC vérifieront chaque version, de gauche à droite, et s'arrêteront dés qu'ils verront un enregistrement CAA. Donc par exemple, un enregistrement CAA pour `community.example.com` aura la priorité sur `example.com`. La plupart des gens qui ajoutent des enregistrements CAA voudront les ajouter sur leur domaine enregistré (`example.com`) afin qu'ils s'appliquent sur tous les sous-domaines. Veuillez noter également que les enregistrements CAA pour les sous-domaines ont la priorité sur leurs domaines parent, peu importe qu'ils soient plus permissifs ou plus restrictifs. Donc un sous-domaine peut assouplir une restriction mise en place par un domaine parent.

La validation CAA suit les CNAME, comme toutes les autres requêtes DNS. Si `www.community.example.com` est un CNAME vers `web1.example.net`, le AC demandera d'abord les enregistrements CAA pour `www.community.example.com`, puis constatant qu'il y a un CNAME pour ce nom de domaine au lieu d'enregistrements CAA, demandera plutôt les enregistrements CAA pour `web1.example.net`. Notez que si un nom de domaine a un enregistrement CNAME, il est interdit d'avoir d'autres enregistrements selon les standards DNS.

La [RFC CAA](https://tools.ietf.org/html/rfc6844) spécifie un comportement supplémentaire appelé "tree-climbing" qui nécessite que les AC vérifie également les domaines parents du résultat de la résolution CNAME. Ce comportement supplémentaire a été supprimé plus tard dans [un erratum](https://www.rfc-editor.org/errata/eid5065), donc Let's Encrypt et d'autres AC ne l'implémentent pas.

# Erreurs CAA

Depuis que Let's Encrypt vérifie les enregistrements CAA avant d'émettre un certificat, nous avons parfois des erreurs même pour les domaines qui n'ont pas défini d'enregistrement CAA. Quand nous avons une erreur, il n'y aucun moyen de dire si nous sommes autorisé à émettre pour le domaine affecté, car il peut y avoir des enregistrements CAA présents qui interdisent l'émission, mais qui ne sont pas visibles à cause de l'erreur.

Si vous avez des erreurs relatives à CAA, réessayez quelques fois avec notre [environnement de test](/docs/staging-environment) pour déterminer si ces erreurs sont temporaires ou permanentes. Si elles sont permanentes, vous devrez rapporter le problème au support de votre fournisseur DNS, ou changer de fournisseur. Si vous n'êtes certain de savoir qui est votre fournisseur DNS, demandez à votre hébergeur.

Certains fournisseurs DNS qui ne sont pas familiers avec CAA répondent initialement avec "Nous ne prenons pas en charge les enregistrements CAA". Votre fournisseur DNS n'a pas besoin de spécifiquement supporter les enregistrements CAA ; il a seulement besoin de répondre avec une réponse NOERROR aux types de requêtes inconnus (y compris CAA). Retourner d'autres opcodes, y compris NOTIMP, pour les qtypes non reconnus est une violation de la [RFC 1025](https://tools.ietf.org/html/rfc1035), et doit être corrigé.

# SERVFAIL

Une des erreurs les plus courantes que les gens rencontrent est SERVFAIL. Le plus souvent cela indique un échec de la validation DNSSEC. Si vous obtenez une erreur SERVFAIL, vous devriez en premier lieu utiliser un débogueur DNSSEC comme [dnsviz.net](http://dnsviz.net/). Si cela ne fonctionne pas, il est possible que vos serveurs de noms génèrent des signatures incorrectes uniquement quand la réponse est vide. Or les réponses CAA sont le plus souvent vides.  Par exemple, PowerDNS [a eu ce bug jusqu'à sa version 4.0.3](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha).

Si vous n'avez pas de DNSSEC activé et que vous obtenez un SERVFAIL, la seconde raison la plus probable est que votre serveurs de noms autorisé a retourné NOTIMP, qui, comme décrit plus haut, est une violation de la RFC 1035 ; elle devrait plutôt renvoyer NOERROR avec une réponse vide. Si c'est le cas, rapportez un bug ou ouvrez un ticket auprès du support de votre fournisseur DNS.

Enfin, SERVFAIL peut être causé par des pannes sur vos serveurs de noms autorisés. Vérifiez les enregistrements NS pour vos serveurs de noms et assurez-vous que chaque serveur est disponible.

# Timeout

Parfois, les requêtes CAA expirent. C'est-à-dire que le serveur de noms faisant autorité ne renvoie jamais de réponse, même après plusieurs tentatives. La plupart du temps ceci se produit lorsque votre serveur de noms a devant lui un pare-feu mal configuré qui ignore les requêtes DNS avec des qtypes inconnus. Ouvrez un ticket auprès du support de votre fournisseur DNS et demandez-leur s'ils ont un tel pare-feu.
