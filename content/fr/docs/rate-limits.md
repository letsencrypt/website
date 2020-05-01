---
title: Limites d'utilisation
slug: rate-limits
top_graphic: 1
date: 2018-01-04
lastmod: 2020-03-05
---

{{< lastmod >}}

Let's Encrypt prévoit des limites d'utilisation pour garantir une utilisation équitable par autant de personnes que possible. Nous pensons que ces limites d'utilisation sont suffisamment élevées pour fonctionner par défaut avec la plupart des gens. Nous les avons également conçues pour qu'un renouvelement de certificat ne rencontre presque jamais la limite d'utilisation, et de sorte que les grands organisations puissent augmenter progressivement le nombre de certificats qu'elles peuvent délivrer sans nécessiter l'intervention de Let's Encrypt.

Si vous développez ou testez activement un client Let's Encrypt, veuillez utiliser notre [environnement de qualification](/docs/staging-environment) au lieu de l'API de production. Si vous travaillez sur l'intégration de Let's Encrypt en tant que fournisseur ou avec un grand site Web, veuillez [consulter notre Guide d'intégration](/docs/integration-guide).

La limite principale est  <a id="certificates-per-registered-domain"></a>**Certificats par domaines enregistrés** (50 par semaine). Un domaine enregistré est, de manière générale, la section du domaine que vous avez achetée auprès de votre bureau d'enregistrement de noms de domaine. Par exemple, dans le nom `www.example.com`, le domaine enregistré est `example.com`. Dans `new.blog.example.co.uk`, le domaine enregistré est `example.co.uk`. Nous utilisons la
[Liste des suffixes publics](https://publicsuffix.org) pour calculer le domaine enregistré. Le dépassement de la limite du nombre de certificats par domaine enregistré est signalé avec le
message d'erreur `too many certificates already issued` («trop de certificats déjà émis»), éventuellement avec des détails complémentaires.

Si vous avez beaucoup de sous-domaines, vous pouvez les combiner en un seul certificat, jusqu'à une limite de 100 <a id="names-per-certificate"> </a> **Noms par certificat**. Combiné avec la limite ci-dessus, cela signifie que vous pouvez émettre des certificats contenant jusqu'à 5 000 sous-domaines par semaine. Un certificat avec plusieurs noms est souvent appelé certificat SAN, ou parfois un certificat UCC. Remarque: pour les performances et pour des raisons de fiabilité, il est préférable d'utiliser moins de noms par certificat chaque fois que vous pouvez.

Les renouvellements sont traités spécialement: ils ne sont pas pris en compte dans votre limitede **Certificats par domaines enregistrés**, mais ils sont soumis à une limite de **certificat dupliqué** de 5 par semaine. Remarque: les renouvellements comptaient pour votre limite de Certificats par  domaine enregistré jusqu'en mars 2019, [mais ils ne le sont plus](https://community.letsencrypt.org/t/rate-limits-fixing-certs-per-name-rate-limit-order-of-operations-gotcha/88189).
Le dépassement de la limite de Certificat dupliqué est signalé avec le message d'erreur
`too many certificates already issued for exact set of domains` ("trop de certificats déjà émis pour un ensemble précis de domaines»).

Un certificat est considéré comme un renouvellement (ou une duplication) d'un certificat antérieur s'il contient exactement le même ensemble de noms d'hôtes, en ignorant la casse et l'ordre des noms d'hôtes. Par exemple, si vous avez demandé un certificat pour les noms [`www.example.com`, `example.com`], vous pouvez demander quatre certificats supplémentaires pour [`www.example.com`, `example.com`] pendant la semaine. Si vous avez changé l'ensemble des noms d'hôtes en ajoutant [`blog.example.com`], vous pourrez demander des certificats supplémentaires.

La gestion du renouvellement ignore la clef publique et les extensions demandées. Une délivrance de certificat peut être considéré comme un renouvellement même si vous utilisez une nouvelle clef.

**La révocation des certificats ne réinitialise pas les limites d'utilisation**, car les ressources utilisées pour émettre ces certificats ont déjà été consommés.

Il y a une limite d'<a id="failed-validations"> </a>**Échec de validation** de 5 échecs par compte, par nom d'hôte, par heure. Cette limite est plus élevée sur notre [environnement de qualification](/docs/staging-environment), vous pouvez donc utiliser cet environnement pour déboguer les problèmes de connectivité. Dépasser la limite d'échec de validations est signalée avec le message d'erreur `too many failed authorizations recently` ("Trop d'autorisations ayant échoué récemment").

Les points de terminaison "new-reg", "new-authz" et "new-cert" de l'API v1 et les points de terminaison "new-nonce", "new-account", "new-order" et "revoke-cert" de l'API v2 ont une limite de 20 <a id="overall-requests"></a> **Demandes globales** par seconde. Le point de terminaison "/directory" et les répertoires et sous-répertoires "/acme"  ont une limite de 40 requêtes par seconde.

Nous avons deux autres limites que vous ne rencontrerez probablement pas.

Vous pouvez créer un maximum de 10 <a id="accounts-per-ip-address"> </a> **Comptes par adresse IP** toutes les 3 heures. Vous pouvez créer un maximum de 500 **Comptes par plage IP** IPv6 /48 toutes les 3 heures. Il est très rare d'atteindre l'une ou l'autre des limites d'utilisation de compte, et nous recommandons que les grands intégrateurs préfèrent une architecture [utilisant un seul compte pour de nombreux clients](/docs/integration-guide). Le dépassement de ces limites est signalé avec le message d'erreur `too many registrations for this IP` («trop d'inscriptions pour cette IP») ou `too many registrations for this IP range` («trop d'enregistrements pour cette plage IP»).

Vous pouvez avoir un maximum de 300 <a id="pending-authorizations"> </a> **Autorisations en attente** sur votre compte. Atteindre cette limite d'utilisation est rare et se produit le plus souvent lors du développement de clients ACME. Cela signifie généralement que votre client crée des autorisations et ne les exécute pas. Veuillez utiliser notre [environnement de qualification](/docs/staging-environment) si vous développez un client ACME. Le dépassement de la limite des autorisations en attente est signalé avec le message d'erreur  `too many currently pending authorizations` («trop d'autorisations actuellement en attente»).

Pour les utilisateurs de l'API ACME v2, vous pouvez créer un maximum de 300 <a id ="new-Orders"> </a> **Nouvelles commande** par compte toutes les 3 heures. Une nouvelle commande est créée chaque fois que vous demandez un certificat à l'autorité de certification Boulder, ce qui signifie qu'une nouvelle commande est produite dans chaque demande de certificat. Dépasser la limite de Nouvelles commandes est signalé avec le message d'erreur `too many new orders recently` («trop de nouvelles commandes récemment»).

# <a id="overrides"></a>Overrides

Si vous avez atteint une limite d'utilisation, nous n'avons aucun moyen de la réinitialiser temporairement. Vous devez attendre que la limite d'utilisation expire au bout d'une semaine. Nous utilisons une fenêtre glissante, donc si vous avez émis 25 certificats le lundi et 25 autres certificats le vendredi, vous pourrez émettre à nouveau à partir de lundi. Vous pouvez obtenir une liste des certificats émis pour votre domaine enregistré via une [recherche sur crt.sh](https://crt.sh), qui utilise le journal public de [Transparence des certificats](https://www.certificate-transparency.org).

Si vous êtes un grand fournisseur d'hébergement ou une organisation travaillant sur l'intégration de Let's Encrypt, nous avons un [formulaire de limite d'utilisation](https://goo.gl/forms/plqRgFVnZbdGhE9n1) qui peut être utilisé pour demander une limite d'utilisation plus élevée. Le traitement des demandes prend quelques semaines, ce formulaire ne convient donc pas si vous avez juste besoin de réinitialiser une limite d'utilisation plus rapidement que cela ne se fait automatiquement.

Notez que la plupart des fournisseurs d'hébergement n'ont pas besoin d'augmenter la limite d'utilisation, car il n'y a pas de limite sur le nombre de domaines enregistrés distincts pour lesquels vous pouvez émettre. Tant que la plupart de vos clients n'ont pas plus de 2 000 sous-domaines sur un domaine enregistré, vous n'avez probablement pas besoin d'une augmentation. Consultez notre [Guide d'intégration](/docs/integration-guide) pour plus de conseils.

# <a id="clearing-pending"></a>Suppression des autorisations en attente

Si vous avez un grand nombre d'objets d'autorisation en attente et que vous obtenez une erreur de limite d'utilisation pour un trop grand nombre d'Autorisations en attente, vous pouvez déclencher une tentative de validation pour ces objets en soumettant un POST signé par JWS à l’un de ses défis, tel que décrit dans les [specifications d'ACME](https://tools.ietf.org/html/rfc8555#section-7.5.1). 
Ces objets en attente d'otorisation sont représentés par les URL du formulaire `https://acme-v02.api.letsencrypt.org/acme/authz/XYZ`, et devraient apparaître dans votre journal client. Notez que peu importe que la validation réussisse ou échoue.
L'un ou l'autre retirera l'autorisation de l'état «en attente». Si vous n'avez pas de journaux contenant les URL d'autorisation appropriées, vous devez attendre l'expiration de la limite. Comme décrit ci-dessus, il y a une fenêtre glissante, donc cela peut prendre moins d'une semaine en fonction de votre modèle d'émission.

Notez que le fait d'avoir un grand nombre d'autorisations en attente est généralement
résultat d'un client buggé. Si vous atteignez fréquemment cette limite d'utilisation, vous
devriez revérifier votre code client.
