---
title: Autorisation de l'autorité de certification (CAA)
slug: caa
top_graphic: 1
date: 2017-07-27
lastmod: 2017-07-27
show_lastmod: 1
---


CAA est un type d'enregistrement DNS qui permet aux propriétaires de sites de spécifier quelles autorités de certification (AC) sont autorisées à émettre des certificats contenant leurs noms de domaines. Il a été normalisé en 2013 par la [RFC 6844](https://tools.ietf.org/html/rfc6844) pour
permettre à une autorité de certification "de réduire le risque de délivrance involontaire de certificat". Par défaut, chaque autorité de certification publique est autorisée à émettre des certificats pour tout nom de domaine du DNS public, à condition qu'ils valident le contrôle de ce nom de domaine. 

Cela veut dire que s'il y a un bogue dans l'un des nombreux processus de validation des autorités de certification publiques, chaque nom de domaine est potentiellement affecté. CAA fournit aux détenteurs de domaine un moyen de réduire ce risque.

# Utilisation de CAA

Si vous ne vous souciez pas de la CAA, vous n'avez généralement rien à faire (mais voyez
Erreurs CAA ci-dessous). Si vous souhaitez utiliser CAA pour limiter les autorités de certification autorisées à émettre des certificats pour votre domaine, vous devrez utiliser un fournisseur DNS qui prend en charge la définition des enregistrements CAA. Vérifiez le CAA de la [page SSLMate](https://sslmate.com/caa/support) pour une liste de ces fournisseurs. Si votre
fournisseur est répertorié, vous pouvez utiliser le [générateur d'enregistrements CAA de SSLMate](https://sslmate.com/caa/) pour générer un ensemble d'enregistrements CAA répertoriant les autorités de certification que vous souhaitez autoriser.

Le nom de domaine d'identification de Let's Encrypt pour CAA est  `letsencrypt.org`. C'est
officiellement documenté [dans notre Énoncé des Pratiques de Certification  (CPS), section 4.2.1](/repository).

## Où placer l'enregistrement

Vous pouvez définir des enregistrements CAA sur votre domaine principal ou à n'importe quelle profondeur de sous-domaine. Par exemple, si vous aviez `www.community.example.com`, vous pourriez établir des enregistrements CAA pour le nom complet, ou pour `community.example.com`, ou pour `example.com`. Les autorités des certifications vérifieront chaque version, de gauche à droite, et s'arrêteront dès qu'elles verront un enregistrement CAA. Ainsi, par exemple, un enregistrement CAA sur `community.example.com` prendrait la priorité sur un enregsitrement au niveau de  `example.com`. La plupart des gens qui ajoutent des enregistrements CAA voudront les ajouter pour leur domaine (`example.com`) afin qu'ils s'appliquent à tous les sous-domaines. Notez également que les enregistrements CAA pour les sous-domaines ont priorité sur leurs domaines parents, qu'ils soient plus permissifs ou plus
contraignants. Un sous-domaine peut donc assouplir une restriction mise en place par un domaine parent.

La validation CAA suit les CNAME, comme toutes les autres requêtes DNS. Si `www.community.example.com` est un CNAME pointant vers ` web1.example.net`, l'autorité de certification va d'abord demander les enregistrements CAA pour `www.community.example.com`, puis voir qu'il y a un CNAME pour ce nom de domaine au lieu des enregistrements CAA, il demandera des enregistrements CAA pour `web1.example.net` à la place. Notez que si un nom de domaine a un enregistrement CNAME, il n'est pas autorisé à avoir d'autres enregistrements selon les normes DNS.

La [RFC CAA](https://tools.ietf.org/html/rfc6844) spécifie un comportement supplémentaire nommé "tree-climbing" qui oblige les autorités de certification à vérifier également le domaine parent du résultat de la résolution CNAME. Ce comportement supplémentaire a été supprimé, plus tard, par [un erratum](https://www.rfc-editor.org/errata/eid5065), en conséquence Let's et les autres autorités de certification ne l'implémentent pas.

# Erreurs de CAA

Étant donné que Let's Encrypt vérifie les enregistrements CAA avant chaque certificat que nous émettons, parfois nous recevons parfois des erreurs avec des domaines qui n'ont défini aucun enregistrement CAA. Quand nous obtenons une erreur, il n'y a aucun moyen de savoir si nous sommes autorisés à émettre pour le domaine affecté, car il pourrait y avoir des enregistrements CAA qui interdisent la délivrance, mais ne sont pas visibles en raison de l'erreur.

Si vous recevez des erreurs liées à l'entrée CAA, essayez à plusieurs reprises sur notre [environnement de qualification](/docs/staging-environment) pour vérifier si elles
sont temporaires ou permanents. Si elles sont permanentes, vous devrez ouvrir un incident  auprès de  votre fournisseur de DNS, ou de réseau. Si vous n'êtes pas certain de conaître votre fourniseur DNS, demandez conseil à votre hébergeur.

Certains fournisseurs DNS ne connaissant pas la norme CAA répondent initialement au problème
signalé par "Nous ne prenons pas en charge les enregistrements CAA". Votre fournisseur DNS n'a pas besoin de spécifiquement prendre en charge les enregistrements CAA; il suffit de répondre par un NOERROR pour les types de requête inconnus (y compris CAA).  Renvoyer d'autres
 OpCodes, y compris NOTIMP,  pour des qtypes non reconnus constituent une violation de la [RFC
1035](https://tools.ietf.org/html/rfc1035), et cela doit être corrigé.

# SERVFAIL

L'une des erreurs les plus courantes rencontrées par les utilisateurs est SERVFAIL. Cela indique le plus souvent, un échec de validation DNSSEC. Si vous obtenez une erreur SERVFAIL, votre
la première action doit être d'utiliser un débogueur DNSSEC tel que [dnsviz.net](http://dnsviz.net/). Si cela ne fonctionne pas, il est possible que votre serveur de noms génère des signatures incorrectes uniquement lorsque la réponse est vide. Et les réponses CAA sont le plus souvent vides. Par exemple, PowerDNS [avait ce bogue dans sa version 4.0.3 et antérieures](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha).

Si vous n'avez pas activé DNSSEC et obtenez un SERVFAIL, le seconde raison la plus probable est que votre serveur de noms faisant autorité a renvoyé NOTIMP, qui, comme décrit ci-dessus est une violation de la RFC 1035; il devrait à la place retourner NOERROR avec une réponse vide. Si tel est le cas, ouvrez un rapport de bogue ou  un ticket d'assistance auprès de votre fournisseur DNS.

Enfin, les SERVFAIL peuvent être causés par des pannes de vos serveurs de noms faisant autorité.
Vérifiez les enregistrements NS de vos serveurs de noms et assurez-vous que chaque serveur est
disponible.

# Timeout

Parfois, les requêtes CAA expirent. Autrement dit, le serveur de noms faisant autorité n'a jamais
répondu du tout, même après plusieurs tentatives. Le plus souvent, ceci se produit lorsque votre serveur de noms a devant lui un pare-feu mal configuré qui rejette les requêtes DNS avec des qtypes inconnus. Déposez un ticket d'assistance auprès de votre fournisseur de service DNS
et demandez-lui s'il a configuré un tel pare-feu.
