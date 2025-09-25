---
title: Object Identifiers
slug: oids
lastmod: 2025-09-08
show_lastmod: false
---

An Object Identifier (OID) is a dotted-separated sequence of numbers used to uniquely identify various objects within the WebPKI. For example, every _extension_ within an X.509 certificate is identified by an OID, and the OID `2.5.29.15` is defined to represent the [Key Usage](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.3) extension.  Similarly, the OID `2.23.140.1.2.1` can be placed within the body of the [Certificate Policies](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.4) extension to indicate that the certificate was validated according to the [CA/Browser Forum's "Domain Validated" criteria](https://github.com/cabforum/servercert/blob/main/docs/BR.md#12-document-name-and-identification).

This page lists the OIDs used by Let's Encrypt, documents what each OID means, and points to where we use them.

| OID | Description |
| --- | ----------- |
| <code><b>1.3.6.1.4.1.44947</b></code> | Internet Security Research Group. Parent arc for all ISRG OIDs. |
| <code>1.3.6.1.4.1.44947.<b>1</b></code> | Let's Encrypt. Parent arc for all LE OIDs. |
| <code>1.3.6.1.4.1.44947.1.<b>1</b></code> | Certificate Policies. |
| <code>1.3.6.1.4.1.44947.1.1.<b>1</b></code> | Domain Validated. This OID is equivalent to 2.23.140.1.2.1, the CA/BF Domain Validated Certificate Policy OID. It [used to appear in our issuing intermediates](/certs/lets-encrypt-e1.txt), but we have stopped doing so to remove redundancy and reduce certificate size. |
| <code>1.3.6.1.4.1.44947.1.<b>2</b></code> | Issuers. Parent arc for all "trust anchors" ([CA keypairs](/certificates)), which can be used by the [Trust Anchor Identifiers](https://datatracker.ietf.org/doc/draft-ietf-tls-trust-anchor-ids/) and [Merkle Tree Certificates](https://datatracker.ietf.org/doc/draft-davidben-tls-merkle-tree-certs/) draft standards. |
| <code>1.3.6.1.4.1.44947.1.2.<b>1</b></code>   | ISRG Root X1            |
| <code>1.3.6.1.4.1.44947.1.2.1.<b>1</b></code> | Let's Encrypt R3        |
| <code>1.3.6.1.4.1.44947.1.2.1.<b>2</b></code> | Let's Encrypt R4        |
| <code>1.3.6.1.4.1.44947.1.2.1.<b>3</b></code> | Let's Encrypt R10       |
| <code>1.3.6.1.4.1.44947.1.2.1.<b>4</b></code> | Let's Encrypt R11       |
| <code>1.3.6.1.4.1.44947.1.2.1.<b>5</b></code> | Let's Encrypt R12       |
| <code>1.3.6.1.4.1.44947.1.2.1.<b>6</b></code> | Let's Encrypt R13       |
| <code>1.3.6.1.4.1.44947.1.2.1.<b>7</b></code> | Let's Encrypt R14       |
| <code>1.3.6.1.4.1.44947.1.2.<b>2</b></code>   | ISRG Root X2            |
| <code>1.3.6.1.4.1.44947.1.2.2.<b>1</b></code> | Let's Encrypt E1        |
| <code>1.3.6.1.4.1.44947.1.2.2.<b>2</b></code> | Let's Encrypt E2        |
| <code>1.3.6.1.4.1.44947.1.2.2.<b>3</b></code> | Let's Encrypt E5        |
| <code>1.3.6.1.4.1.44947.1.2.2.<b>4</b></code> | Let's Encrypt E6        |
| <code>1.3.6.1.4.1.44947.1.2.2.<b>5</b></code> | Let's Encrypt E7        |
| <code>1.3.6.1.4.1.44947.1.2.2.<b>6</b></code> | Let's Encrypt E8        |
| <code>1.3.6.1.4.1.44947.1.2.2.<b>7</b></code> | Let's Encrypt E9        |
| <code>1.3.6.1.4.1.44947.1.2.<b>3</b></code>   | ISRG Root YE            |
| <code>1.3.6.1.4.1.44947.1.2.3.<b>1</b></code> | Let's Encrypt YE1       |
| <code>1.3.6.1.4.1.44947.1.2.3.<b>2</b></code> | Let's Encrypt YE2       |
| <code>1.3.6.1.4.1.44947.1.2.3.<b>3</b></code> | Let's Encrypt YE3       |
| <code>1.3.6.1.4.1.44947.1.2.<b>4</b></code>   | ISRG Root YR            |
| <code>1.3.6.1.4.1.44947.1.2.4.<b>1</b></code> | Let's Encrypt YR1       |
| <code>1.3.6.1.4.1.44947.1.2.4.<b>2</b></code> | Let's Encrypt YR2       |
| <code>1.3.6.1.4.1.44947.1.2.4.<b>3</b></code> | Let's Encrypt YR3       |
