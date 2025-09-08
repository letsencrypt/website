---
title: Object Identifiers
slug: oids
lastmod: 2025-09-08
show_lastmod: false
---

An Object Identifier (OID) is a dotted-separated sequence of numbers used to uniquely identify various objects within the WebPKI. For example, every _extension_ within an X.509 certificate is identified by an OID, and the OID `2.5.29.15` is defined to represent the [Key Usage](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.3) extension.  Similarly, the OID `2.23.140.1.2.1` can be placed within the body of the [Certificate Policies](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.4) extension to indicate that the certificate was validated according to the [CA/Browser Forum's "Domain Validated" criteria](https://github.com/cabforum/servercert/blob/main/docs/BR.md#12-document-name-and-identification).

This page lists the OIDs used by Let's Encrypt, documents what each OID means, and points to where we use them.

* **1.3.6.1.4.1.44947**: Internet Security Research Group. Parent arc for all ISRG OIDs.
  * 1.3.6.1.4.1.44947.**1**: Let's Encrypt. Parent arc for all LE OIDs.
    * 1.3.6.1.4.1.44947.1.**1**: Certificate Policies.
      * 1.3.6.1.4.1.44947.1.1.**1**: Domain Validated. This OID is equivalent to 2.23.140.1.2.1, the CA/BF Domain Validated Certificate Policy OID. It [used to appear in our issuing intermediates](/certs/lets-encrypt-e1.txt), but we have stopped doing so to remove redundancy and reduce certificate size.
    * 1.3.6.1.4.1.44947.1.**2**: Issuers. Parent arc for all "trust anchors" ([CA keypairs](/certificates)), which can be used by the [Trust Anchor Identifiers](https://datatracker.ietf.org/doc/draft-ietf-tls-trust-anchor-ids/) and [Merkle Tree Certificates](https://datatracker.ietf.org/doc/draft-davidben-tls-merkle-tree-certs/) draft standards.
      * 1.3.6.1.4.1.44947.1.2.**1**: ISRG Root X1
        * 1.3.6.1.4.1.44947.1.2.1.**1**: Let's Encrypt R3
        * 1.3.6.1.4.1.44947.1.2.1.**2**: Let's Encrypt R4
        * 1.3.6.1.4.1.44947.1.2.1.**3**: Let's Encrypt R10
        * 1.3.6.1.4.1.44947.1.2.1.**4**: Let's Encrypt R11
        * 1.3.6.1.4.1.44947.1.2.1.**5**: Let's Encrypt R12
        * 1.3.6.1.4.1.44947.1.2.1.**6**: Let's Encrypt R13
        * 1.3.6.1.4.1.44947.1.2.1.**7**: Let's Encrypt R14
      * 1.3.6.1.4.1.44947.1.2.**2**: ISRG Root X2
        * 1.3.6.1.4.1.44947.1.2.2.**1**: Let's Encrypt E1
        * 1.3.6.1.4.1.44947.1.2.2.**2**: Let's Encrypt E2
        * 1.3.6.1.4.1.44947.1.2.2.**3**: Let's Encrypt E5
        * 1.3.6.1.4.1.44947.1.2.2.**4**: Let's Encrypt E6
        * 1.3.6.1.4.1.44947.1.2.2.**5**: Let's Encrypt E7
        * 1.3.6.1.4.1.44947.1.2.2.**6**: Let's Encrypt E8
        * 1.3.6.1.4.1.44947.1.2.2.**7**: Let's Encrypt E9
      * 1.3.6.1.4.1.44947.1.2.**3**: ISRG Root YE
        * 1.3.6.1.4.1.44947.1.2.3.**1**: Let's Encrypt YE1
        * 1.3.6.1.4.1.44947.1.2.3.**2**: Let's Encrypt YE2
        * 1.3.6.1.4.1.44947.1.2.3.**3**: Let's Encrypt YE3
      * 1.3.6.1.4.1.44947.1.2.**4**: ISRG Root YR
        * 1.3.6.1.4.1.44947.1.2.4.**1**: Let's Encrypt YR1
        * 1.3.6.1.4.1.44947.1.2.4.**2**: Let's Encrypt YR2
        * 1.3.6.1.4.1.44947.1.2.4.**3**: Let's Encrypt YR3
