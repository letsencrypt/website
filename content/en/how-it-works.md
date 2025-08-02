---
title: How It Works
linkTitle: How Let's Encrypt Works
slug: how-it-works
lastmod: 2025-08-02
show_lastmod: 1
---

The objective of Let's Encrypt and the [ACME protocol](https://tools.ietf.org/html/rfc8555) is to make it possible to set up an HTTPS server and have it automatically obtain a browser-trusted certificate, without any human intervention. This is accomplished by running an ACME client on the web server.

To understand how the technology works, let's walk through the process of setting up `https://example.com/` with an ACME client.

There are two steps to this process. First, the ACME client proves to the [Certificate Authority](https://simple.wikipedia.org/wiki/Certificate_authority) (CA) that the web server controls a domain. After that the client can request or revoke certificates for that domain.

## Domain Validation

Let's Encrypt identifies the ACME client software by [public key](https://simple.wikipedia.org/wiki/Public-key_cryptography). The first time the ACME client interacts with Let's Encrypt, it generates a new account key pair and proves to the Let's Encrypt CA that the operator controls one or more domains. This is similar to the traditional CA process of creating an account and adding domains to that account.

To kick off the process, the client asks the Let's Encrypt CA what it needs to do in order to prove that it controls `example.com`. The Let's Encrypt CA will look at the domain name being requested and issue one or more sets of challenges. There are different ways that the client can prove control of the domain. For example, the CA might give the client a choice of either:

* Provisioning a DNS record under `example.com`, or
* Provisioning an HTTP resource under a well-known URI on `http://example.com/`

<div class="howitworks-figure">
<img alt="Requesting challenges to validate example.com"
     src="/images/howitworks_challenge.png"/>
</div>

The client software completes one of the provided sets of challenges. Let's say it is able to accomplish the second task above: it creates a file on a specified path on the `http://example.com` site. Once the client has completed these steps, it notifies the CA that it's ready to complete validation.

Then, it's the CA's job to check that the challenges have been satisfied from [multiple network perspectives](/2020/02/19/multi-perspective-validation).

<div class="howitworks-figure">
<img alt="Requesting authorization to act for example.com"
     src="/images/howitworks_authorization.png"/>
</div>

If the challenges check out, then the client identified by the public key is authorized to do certificate management for `example.com`.


## Certificate Issuance and Revocation

Once the client is authorized, requesting, renewing, and revoking certificates is simple---just send certificate management messages and sign them with the authorized account key pair.

### Issuance

To obtain a certificate for the domain, the client constructs a PKCS#10 [Certificate Signing Request](https://tools.ietf.org/html/rfc2986) (CSR) that asks the Let's Encrypt CA to issue a certificate for `example.com` with a specified public key. As usual, the CSR includes a signature by the private key corresponding to the public key in the CSR. The client also signs the whole CSR with the authorized key for `example.com` so that the Let's Encrypt CA knows it's authorized.

When the Let's Encrypt CA receives the request, it verifies both signatures. If everything looks good, it issues a certificate for `example.com` with the public key from the CSR and returns it to the client. The CA will also submit the certificate to numerous public Certificate Transparency (CT) logs. See [here](https://certificate.transparency.dev/howctworks/#pki) for more details.

<div class="howitworks-figure">
<img alt="Requesting a certificate for example.com"
     src="/images/howitworks_certificate.png"/>
</div>

Renewing a certificate at a later time means repeating the issuance process over again - performing domain validation and then requesting a new certificate.

### Revocation

Revocation works in a similar manner. The client signs a revocation request with the account key pair authorized for `example.com`, and the Let's Encrypt CA verifies that the request is authorized. If so, it publishes revocation information via [Certificate Revocation List](https://en.wikipedia.org/wiki/Certificate_revocation_list) (CRL), so that relying parties such as browsers can know that they shouldn't accept the revoked certificate.

<div class="howitworks-figure">
<img alt="Requesting revocation of a certificate for example.com"
     src="/images/howitworks_revocation.png"/>
</div>
