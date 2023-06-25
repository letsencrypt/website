---
title: Limite d'utilisation
slug: rate-limits
top_graphic: 1
date: 2018-01-04
lastmod: 2021-07-12
show_lastmod: 1
---


Let's Encrypt inclut des limites d'utilisation pour assurer un usage équitable par le plus de personnes possible. Nous pensons que ces limites sont suffisamment élevées par défaut pour fonctionner pour la plupart des personnes. Nous les avons également conçus de sorte que le renouvellement d'un certificat n'atteint presque jamais une limite d'utilisation, et pour que les grandes organisations puissent progressivement augmenter le nombre de certificats qu'elles peuvent délivrer sans intervention de Let's Encrypt.

Si vous développez ou testez activement un client Let's Encrypt, veuillez utiliser notre [environnement de test](/docs/staging-environment) au lieu de l'API de production. Si vous travaillez à l'intégration de Let's Encrypt en tant que fournisseur ou avec un grand site web, veuillez [consulter notre Guide d'Intégration](/docs/integration-guide).

La principale limite est le nombre de <a id="certificates-per-registered-domain"></a>**certificats par domaine enregistré** (50 par semaine). Un domaine enregistré est, en général, la partie du domaine que vous avez acheté auprès de votre registraire de nom de domaine. Par exemple, dans le nom `www.example.com`, le domaine enregistré est `example.com`. Dans `new.blog.example.co.uk`, le domaine enregistré est `example.co.uk`. Nous utilisons la [liste de suffixes publiques](https://publicsuffix.org) pour calculer le domaine enregistré. Le dépassement de la limite de Certificats par Domaine Enregistré est signalé avec le message d'erreur `too many certificates already issued`, éventuellement avec des détails supplémentaires.

Si vous avez beaucoup de sous-domaines, vous pouvez les combiner en un seul certificat, jusqu'à une limite de 100 <a id="names-per-certificate"></a>**Noms par Certificat**. Combiné avec la limite indiquée plus haut, cela signifie que vous pouvez émettre des certificats contenant jusqu'à 5 000 sous-domaines uniques par semaine. Un certificat avec plusieurs noms est souvent appelé un certificat SAN, ou parfois un certificat UCC. Remarque : pour des raisons de performance et de fiabilité, il est préférable d'utiliser moins de Noms par Certificat chaque fois que vous le pouvez.

Les renouvellements font l'objet d'un traitement particulier : ils ne sont pas pris en compte dans la limite de vos **Certificats par Domaine Enregistré** mais ils sont soumis à une limite de 5 **duplicata de certificat** par semaine. Remarque : les renouvellements comptaient auparavant dans la limite de votre Certificat par Domaine Enregistré jusqu'en mars 2019, [mais ce n'est plus le cas](https://community.letsencrypt.org/t/rate-limits-fixing-certs-per-name-rate-limit-order-of-operations-gotcha/88189). Le dépassement de la limite de doublons est signalé par le message d'erreur `Trop de certificats déjà émis pour un ensemble exact de domaines`.

Un certificat est considéré comme un renouvellement (ou un double) d'un certificat antérieur s'il contient exactement le même ensemble de noms d'hôtes, sans tenir compte de la capitalisation et de l'ordre des noms d'hôtes.  Par exemple, si vous demandez un certificat pour les noms [`www.example.com`, `example.com`], vous pouvez demander quatre autres certificats pour [`www.example.com`, `example.com`] pendant la semaine. Si vous modifiez l'ensemble des noms d'hôtes en ajoutant [`blog.example.com`], vous pourrez demander des certificats supplémentaires.

Le traitement des renouvellements ne tient pas compte de la clé publique et des prolongations demandées. La délivrance d'un certificat peut être considérée comme un renouvellement même si vous utilisez une nouvelle clé.

**La révocation des certificats ne remet pas à zéro les limites de taux**, car les ressources utilisées pour émettre ces certificats ont déjà été consommées.

Il y a une limite de 5 <a id="failed-validations"></a>**échecs de validation** par compte, par nom d'hôte, par heure. Cette limite est plus élevée sur notre [environnement de pré-production](/docs/staging-environment), vous pouvez donc utiliser cet environnement pour déboguer les problèmes de connectivité. Le dépassement de la limite des validations échouées est signalé par le message d'erreur `Trop d'autorisations échouées récemment`.

Les points de terminaison "new-nonce", "new-account", "new-order" et "revoke-cert" de l'API ont une limite <a
id="overall-requests"></a>**globale de requêtes** de 20 par secondes. Le répertoire principal "/directory" et le répertoire "/acme" &amp ; les sous-répertoires ont une limite globale de 40 demandes par seconde.

Nous avons deux autres limites qu'il est très peu probable que vous rencontriez.

Vous pouvez créer un maximum de 10 <a id="accounts-per-ip-address"></a>**comptes par adresse IP** par tranche de 3 heures. Vous pouvez créer un maximum de 500 **comptes par plage d'IP** dans une IPv6 /48 par tranche de 3 heures. Il est très rare d'atteindre la limite de taux de l'un ou l'autre compte, et nous recommandons aux grands intégrateurs de préférer une conception utilisant [un seul compte pour de nombreux clients](/docs/integration-guide). Le dépassement de ces limites est signalé par le message d'erreur `too many registrations for this IP` ou `too many registrations for this IP range`.

Vous pouvez avoir un maximum de 300 <a id="pending-authorizations"></a>**autorisations en attente** sur votre compte. Il est rare d'atteindre cette limite d'utilisation, et cela arrive le plus souvent lors du développement des clients d'ACME. Cela signifie généralement que votre client crée des autorisations et ne les remplit pas. Veuillez utiliser notre [environnement de pré-production](/docs/staging-environment) si vous développez un client ACME. Le dépassement de la limite des autorisations en attente est signalé par le message d'erreur `too many currently pending authorizations`.

Vous pouvez créer un maximum de 300 <a
id="new-orders"></a>**nouvelles commandes** par compte toutes les 3 heures. Une nouvelle commande est créée chaque fois que vous demandez un certificat à l'AC Boulder, ce qui signifie qu'une nouvelle commande est produite dans chaque requête de certificat. Le dépassement de la limite des nouvelles commandes est signalé par le message d'erreur `too many new orders recently`.

# <a id="overrides"></a>Overrides

Si vous avez atteint une limite d'utilisation, nous n'avons aucun moyen de la réinitialiser temporairement. Vous devrez attendre que la limite d'utilisation expire au bout d'une semaine. Nous utilisons une période glissante, donc si vous avez émis 25 certificats le lundi et 25 autres le vendredi, vous pourrez en émettre de nouveau à partir du lundi. Vous pouvez obtenir une liste des certificats émis pour votre domaine enregistré [en effectuant une recherche sur crt.sh](https://crt.sh), qui utilise les journaux publics de [Certificate Transparency](https://www.certificate-transparency.org).

Si vous êtes un grand hébergeur ou une organisation travaillant sur une intégration Let's Encrypt, nous avons un [formulaire concernant les limites d'utilisation](https://isrg.formstack.com/forms/rate_limit_adjustment_request) qui peut être utilisé pour demander une limite d'utilisation supérieure. Le traitement des demandes prend quelques semaines. Ce formulaire n'est donc pas adapté si vous devez simplement réinitialiser une limite d'utilisation plus rapidement qu'elle ne le fait elle-même.

Notez que la plupart des hébergeurs n'ont pas besoin d'augmenter les limites d'utilisation, car il n'y a pas de limite au nombre de domaines enregistrés distincts pour lesquels vous pouvez émettre des certificats. Tant que la plupart de vos clients n'ont pas plus de 2 000 sous-domaines sur un domaine enregistré, vous n'avez probablement pas besoin d'une augmentation de la limite d'utilisation. Pour plus de conseils, consultez notre [guide d'intégration](/docs/integration-guide).

# <a id="clearing-pending"></a>Effacer les autorisations en attente

Si vous avez un grand nombre de demandes d'autorisation en attente et que vous obtenez une erreur de limite d'utilisation pour des demandes d'autorisation en attente, vous pouvez déclencher une tentative de validation pour ces demandes d'autorisation en soumettant un POST signé par JWS à l'un de ses challenges, comme décrit dans la [spécification ACME](https://tools.ietf.org/html/rfc8555#section-7.5.1). Les demandes d'autorisation en attente sont représentées par des URL de la forme `https://acme-v02.api.letsencrypt.org/acme/authz/XYZ`, devraient apparaître dans les fichiers journaux de vos clients. Notez qu'il n'est pas important que la validation réussisse ou échoue. Dans les deux cas, l'autorisation sera retirée de l'état "en attente". Si vous ne disposez pas des fichiers journaux contenant les URL d'autorisations correspondantes, vous devez attendre l'expiration de la limite d'utilisation. Comme décrit ci-dessus, il y a une période glissante, ce qui peut prendre moins d'une semaine selon votre mode de délivrance.

Notez que le fait d'avoir un grand nombre d'autorisations en attente est généralement le résultat d'un client bogué. Si vous atteignez fréquemment cette limite d'utilisation, vous devez vérifier votre code client.
