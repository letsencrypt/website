---
title: Justification et Projets concernant la Durée de Validité des Certificats
slug: cert-lifetimes
lastmod: 2026-07-22
show_lastmod: 1
---

## Durées de Validité Actuelles

Depuis notre lancement initial en 2015, Let's Encrypt a offert des certificats avec une durée de validité de 90 jours. Ceci reste la durée de validité par défaut, et la vaste majorité des certificats que nous délivrons ont une durée de validité de 90 jours.

Des certificats de courte durée avec une durée de validité de 6 jours sont disponibles pour tous nos abonnés.

Voir notre [documentation sur les profils de certificats](/docs/profiles/) pour plus d'informations.

## Projets futurs

[Les règles de l'industrie](https://cabforum.org/working-groups/server/baseline-requirements/documents/) limitera la durée de validité des certificats à un maximum de 47 jours à compter du 15 mars 2029. À ce titre, nous aller [réduire la durée maximale de validité de nos certificats à 45 jours d'ici février 2028](/2025/12/02/from-90-to-45.html).

## Pourquoi des durées de validité plus courtes ?

On nous demande parfois pourquoi nous n'offrons que des certificats avec des durées de validité de 90 jours, ou pourquoi nous mettons en place des durées de validité encore plus courtes.

Il y a deux avantages principaux à des durées de validité de certificat plus courtes :

- Elles limitent les dommages liés aux erreurs d'émission et à la compromission des clés. Les certificats émis par erreurs et les certificats dont les clés sont compromises, avant ou après l'émission, sont valides pour une durée plus courte.
- Ils encouragent l'automatisation, ce qui est absolument essentiel pour la facilité d'utilisation et la fiabilité. Lorsque la gestion de certificats est automatisée, les durées de validité plus courtes ne sont pas moins pratiques que les validités plus longues.

Nous avons choisi des durées de validité de 90 jours pour notre offre initiale car 90 jours sont suffisamment courts pour fortement encourager l'automatisation et suffisamment longs pour permettre de faire les choses manuellement. Bien que nous voulions encourager l'automatisation, cet objectif était subordonné au fait de permettre à chacun d'activer HTTPS. À l'époque, l'automatisation n'était pas aussi courante qu'aujourd'hui, en partie parce que l'écosystème des outils la permettant (ex. clients ACME) était jeune. Aujourd'hui les choses sont très différentes - l'automatisation est bien plus courante et l'écosystème des outils pour la permettre est bien plus mature. À ce titre, nous sommes plus à l'aise avec des offres plus courtes que 90 jours maintenant que nous ne l'étions à l'époque.
