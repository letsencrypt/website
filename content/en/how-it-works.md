---
title: How It Works
linkTitle: How Let's Encrypt Works
slug: how-it-works
lastmod: 2025-03-16
show_lastmod: 1
---

The objective of Let's Encrypt and the [ACME protocol](https://tools.ietf.org/html/rfc8555) is to make it possible to set up an HTTPS server and have it automatically obtain a browser-trusted certificate, without any human intervention. This is accomplished by running a certificate management agent on the web server.

To understand how the technology works, let's walk through the process of setting up `https://example.com/` with a certificate management agent that supports Let's Encrypt.

There are two steps to this process. First, the agent proves to the [Certificate Authority](https://simple.wikipedia.org/wiki/Certificate_authority) (CA) that the web server controls a domain. Then, the agent can request, renew, and revoke certificates for that domain.

## Domain Validation

Let's Encrypt identifies the server administrator by [public key](https://simple.wikipedia.org/wiki/Public-key_cryptography). The first time the agent software interacts with Let's Encrypt, it generates a new key pair and proves to the Let's Encrypt CA that the server controls one or more domains. This is similar to the traditional CA process of creating an account and adding domains to that account.

To kick off the process, the agent asks the Let's Encrypt CA what it needs to do in order to prove that it controls `example.com`. The Let's Encrypt CA will look at the domain name being requested and issue one or more sets of challenges. There are different ways that the agent can prove control of the domain. For example, the CA might give the agent a choice of either:

* Provisioning a DNS record under `example.com`, or
* Provisioning an HTTP resource under a well-known URI on `http://example.com/`

Along with the challenges, the Let's Encrypt CA also provides a [nonce](https://csrc.nist.gov/glossary/term/nonce) that the agent must sign with its [private key pair](https://simple.wikipedia.org/wiki/Public-key_cryptography) to prove that it controls the key pair.

<div class="howitworks-figure">
<img alt="Requesting challenges to validate example.com"
     src="/images/howitworks_challenge.png"/>
</div>

The agent software completes one of the provided sets of challenges. Let's say it is able to accomplish the second task above: it creates a file on a specified path on the `http://example.com` site. The agent also signs the provided nonce with its private key. Once the agent has completed these steps, it notifies the CA that it's ready to complete validation.

Then, it's the CA's job to check that the challenges have been satisfied from [multiple network perspectives](/2020/02/19/multi-perspective-validation). The CA verifies the signature on the nonce, and it attempts to download the file from the web server and make sure it has the expected content.

<div class="howitworks-figure">
<img alt="Requesting authorization to act for example.com"
     src="/images/howitworks_authorization.png"/>
</div>

If the signature over the nonce is valid, and the challenges check out, then the agent identified by the public key is authorized to do certificate management for `example.com`. We call the key pair the agent used an "authorized key pair" for `example.com`.


## Certificate Issuance and Revocation

Once the agent has an authorized key pair, requesting, renewing, and revoking certificates is simple---just send certificate management messages and sign them with the authorized key pair.

### Issuance

To obtain a certificate for the domain, the agent constructs a PKCS#10 [Certificate Signing Request](https://tools.ietf.org/html/rfc2986) (CSR) that asks the Let's Encrypt CA to issue a certificate for `example.com` with a specified public key. As usual, the CSR includes a signature by the private key corresponding to the public key in the CSR. The agent also signs the whole CSR with the authorized key for `example.com` so that the Let's Encrypt CA knows it's authorized.

When the Let's Encrypt CA receives the request, it verifies both signatures. If everything looks good, it issues a certificate for `example.com` with the public key from the CSR and returns it to the agent. The CA will also submit the certificate to numerous public Certificate Transparency (CT) logs. See [here](https://certificate.transparency.dev/howctworks/#pki) for more details.

<div class="howitworks-figure">
<img alt="Requesting a certificate for example.com"
     src="/images/howitworks_certificate.png"/>
</div>

### Revocation

Revocation works in a similar manner. The agent signs a revocation request with the key pair authorized for `example.com`, and the Let's Encrypt CA verifies that the request is authorized. If so, it publishes revocation information via [Certificate Revocation List](https://en.wikipedia.org/wiki/Certificate_revocation_list) (CRL), so that relying parties such as browsers can know that they shouldn't accept the revoked certificate.

<div class="howitworks-figure">
<img alt="Requesting revocation of a certificate for example.com"
     src="/images/howitworks_revocation.png"/>
</div>
