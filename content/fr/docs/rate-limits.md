---
title: Limite d'utilisation
slug: rate-limits
top_graphic: 1
date: 2018-01-04
lastmod: 2021-10-05
show_lastmod: 1
---


Let's Encrypt inclut des limites d'utilisation pour assurer un usage équitable par le plus de personnes possible. Nous pensons que ces limites sont suffisamment élevées par défaut pour fonctionner pour la plupart des personnes. Nous les avons également conçus de sorte que le renouvellement d'un certificat n'atteint presque jamais une limite d'utilisation, et pour que les grandes organisations puissent progressivement augmenter le nombre de certificats qu'elles peuvent délivrer sans intervention de Let's Encrypt.

Si vous développez ou testez activement un client Let's Encrypt, veuillez utiliser notre [environnement de test](/docs/staging-environment) au lieu de l'API de production. Si vous travaillez à l'intégration de Let's Encrypt en tant que fournisseur ou avec un grand site web, veuillez [consulter notre Guide d'Intégration](/docs/integration-guide).

La principale limite est le nombre de <a id="certificates-per-registered-domain"></a>**certificats par domaine enregistré** (50 par semaine). Un domaine enregistré est, en général, la partie du domaine que vous avez acheté auprès de votre registraire de nom de domaine. Par exemple, dans le nom `www.example.com`, le domaine enregistré est `example.com`. Dans `new.blog.example.co.uk`, le domaine enregistré est `example.co.uk`. Nous utilisons la [liste de suffixes publiques](https://publicsuffix.org) pour calculer le domaine enregistré. Le dépassement de la limite de Certificats par Domaine Enregistré est signalé avec le message d'erreur `too many certificates already issued`, éventuellement avec des détails supplémentaires.

Vous pouvez créer un maximum de 300 <a
id="new-orders"></a>**nouvelles commandes** par compte toutes les 3 heures. Une nouvelle commande est créée chaque fois que vous demandez un certificat à l'AC Boulder, ce qui signifie qu'une nouvelle commande est produite dans chaque requête de certificat. Le dépassement de la limite des nouvelles commandes est signalé par le message d'erreur suivant `too many new orders recently`.

Vous pouvez combiner plusieurs noms d'hôtes dans un seul certificat, jusqu'à une limite de 100 <a id="names-per-certificate"></a>** noms par certificat**. Pour des raisons de performance et de fiabilité, il est préférable d'utiliser moins de noms par certificat chaque fois que vous le pouvez.  Un certificat avec plusieurs noms est souvent appelé un certificat SAN ou parfois un certificat UCC.

Les renouvellements font l'objet d'un traitement particulier : ils ne sont pas comptabilisés dans la limite de **certificats par domaine enregistré**, mais ils sont soumis à une limite de 5 [**certificats dupliqués**]( /docs/duplicate-certificate-limit) par semaine. Le dépassement de la limite de certificats dupliqués est signalé par le message d'erreur `too many certificates already issued for exact set of domains`.

Un certificat est considéré comme un renouvellement (ou un duplicata) d'un certificat antérieur s'il contient exactement le même ensemble de noms d'hôtes, sans tenir compte de la capitalisation et de l'ordre des noms d'hôtes.  Par exemple, si vous avez demandé un certificat pour les noms [`www.example.com`, `example.com`], vous pouvez demander quatre autres certificats pour [`www.example.com`, `example.com`]. Si vous modifiez l'ensemble des noms d'hôtes en ajoutant [`blog.example.com`], vous serez en mesure de demander des certificats supplémentaires.

Le traitement du renouvellement ignore la clé publique et les extensions demandées. Une émission de certificat peut être considérée comme un renouvellement même si vous utilisez une nouvelle clé.

**La révocation des certificats ne réinitialise pas les limites d'utilisation**, car les ressources utilisées pour délivrer ces certificats ont déjà été consommées.

Le nombre d<a id="failed-validations"></a>[**'échecs de validation**](/docs/failed-validation-limit) est limité à 5 par compte, par nom d'hôte et par heure. Cette limite est plus élevée sur notre [environnement de test](/docs/staging-environment), vous pouvez donc utiliser cet environnement pour déboguer les problèmes de connectivité. Le dépassement de la limite de validations échouées est signalé par le message d'erreur `too many failed authorizations recently`.

Les points d'accès "new-nonce", "new-account", "new-order" et "revoke-cert" de l'API ont une <a
id="overall-requests"></a>**limite globale** de 20 requêtes par seconde. Le point d'accès "/directory" et le répertoire & sous-répertoires "/acme" ont une limite globale de 40 requêtes par seconde.

Nous avons deux autres limites que vous avez très peu de chances de rencontrer.

Vous pouvez créer un maximum de 10 <a id="accounts-per-ip-address"></a>[**Comptes par adresse IP**](/docs/too-many-registrations-for-this-ip) par 3 heures. Vous pouvez créer un maximum de 500 **comptes par plage d'adresses IP** dans une zone IPv6 /48 par période de 3 heures. Le dépassement de l'une ou l'autre de ces limites est très rare, et nous recommandons aux grands intégrateurs de préférer une conception [utilisant un seul compte pour de nombreux clients](/docs/integration-guide). Le dépassement de ces limites est signalé par le message d'erreur `too many registrations for this IP` ou `too many registrations for this IP range`.

Vous pouvez avoir un maximum de 300 <a id="pending-authorizations"></a>**autorisations en attente** sur votre compte. Atteindre cette limite est rare, et se produit le plus souvent lors du développement de clients ACME. Cela signifie généralement que votre client crée des autorisations et ne les remplit pas. Veuillez utiliser notre [environnement de test](/docs/staging-environment) si vous développez un client ACME. Le dépassement de la limite des autorisations en attente est signalé par le message d'erreur `too many currently pending authorizations`.

# <a id="overrides"></a>Dépassement de limite

Si vous avez atteint une limite d'utilisation, nous n'avons aucun moyen de la réinitialiser temporairement. Vous devrez attendre que la limite d'utilisation expire au bout d'une semaine. Nous utilisons une période glissante, donc si vous avez émis 25 certificats le lundi et 25 autres le vendredi, vous pourrez en émettre de nouveau à partir du lundi. Vous pouvez obtenir une liste des certificats émis pour votre domaine enregistré [en effectuant une recherche sur crt.sh](https://crt.sh), qui utilise les journaux publics de [Certificate Transparency](https://www.certificate-transparency.org).

Si vous êtes un grand hébergeur ou une organisation travaillant sur une intégration Let's Encrypt, nous avons un [formulaire concernant les limites d'utilisation](https://isrg.formstack.com/forms/rate_limit_adjustment_request) qui peut être utilisé pour demander une limite d'utilisation supérieure. Le traitement des demandes prend quelques semaines. Ce formulaire n'est donc pas adapté si vous devez simplement réinitialiser une limite d'utilisation plus rapidement qu'elle ne le fait elle-même.

# <a id="clearing-pending"></a>Effacer les autorisations en attente

Si vous avez un grand nombre de demandes d'autorisation en attente et que vous obtenez une erreur de limite d'utilisation pour des demandes d'autorisation en attente, vous pouvez déclencher une tentative de validation pour ces demandes d'autorisation en soumettant un POST signé par JWS à l'un de ses challenges, comme décrit dans la [spécification ACME](https://tools.ietf.org/html/rfc8555#section-7.5.1). Les objets d'autorisation en attente sont représentés par des URL de la forme `https://acme-v02.api.letsencrypt.org/acme/authz/XYZ`, et devraient apparaître dans les journaux de vos clients. Notez que le fait que la validation réussisse ou échoue n'a aucune importance. L'un ou l'autre fera sortir l'autorisation de l'état "en attente". Si vous ne disposez pas de journaux contenant les URL d'autorisation pertinentes, vous devez attendre que la limite d'utilisation expire. Comme décrit ci-dessus, il y a une fenêtre glissante, donc cela peut prendre moins d'une semaine selon votre mode de délivrance.

Notez que le fait d'avoir un grand nombre d'autorisations en attente est généralement le résultat d'un client bogué. Si vous atteignez fréquemment cette limite d'utilisation, vous devez vérifier votre code client.
