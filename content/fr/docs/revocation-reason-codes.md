---
title: Codes des motifs de révocation
slug: revocation-reason-codes
top_graphic: 1
date: 2022-06-23
lastmod: 2022-07-06
show_lastmod: 1
---

Lors de la révocation d'un certificat, les abonnés de Let's Encrypt doivent sélectionner un code comme suit :

* Aucune raison fournie ou `non spécifiée` (RFC 5280 CRLReason #0)
  - Lorsque les codes ci-dessous ne s'appliquent pas à la demande de révocation, l'abonné ne doit pas fournir un code autre que "non spécifié".
* `keyCompromise` (RFC 5280 CRLReason #1)
  - L'abonné au certificat doit choisir le motif de révocation "keyCompromise" lorsqu'il a des raisons de croire que la clé privée de son certificat a été compromise, par exemple lorsqu'une personne non autorisée a eu accès à la clé privée de son certificat.
  - Si la demande de révocation est signée en utilisant la clé privée du certificat, plutôt qu'une clé privée du compte de l'abonné, Let's Encrypt peut ignorer la raison de la révocation dans la demande et définir la raison comme étant "keyCompromise".
* `superseded` (RFC 5280 CRLReason #4)
  - L'abonné au certificat doit choisir le motif de révocation "superseded" lorsqu'il demande un nouveau certificat pour remplacer son certificat existant.
* `cessationOfOperation` (RFC 5280 CRLReason #5)
  - L'abonné au certificat doit choisir le motif de révocation "cessationOfOperation" lorsqu'il ne possède plus tous les noms de domaine du certificat ou lorsqu'il n'utilisera plus le certificat en raison de la fermeture de son site Web.
  - Si la demande de révocation provient d'un compte d'abonné qui n'a pas demandé le certificat en question, mais qui a démontré qu'il contrôlait tous les identifiants du certificat, Let's Encrypt peut ignorer la raison de la révocation dans la demande et définir la raison comme "cessationOfOperation".

Les demandes de révocation qui spécifient un code autre que ceux détaillés ci-dessus seront rejetées.
