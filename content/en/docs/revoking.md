---
title: Revoking Certificates
slug: revoking
date: 2017-06-08
lastmod: 2021-10-15
show_lastmod: 1
---


When a certificate is no longer safe to use, you should revoke it. This can happen for a few different reasons. For instance, you might accidentally share the private key on a public website; hackers might copy the private key off of your servers; or hackers might take temporary control over your servers or your DNS configuration, and use that to validate and issue a certificate for which they hold the private key.

When you revoke a Let's Encrypt certificate, Let's Encrypt will publish that revocation information through the [Online Certificate Status Protocol (OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol), and some browsers will check OCSP to see whether they should trust a certificate. Note that OCSP [has some fundamental problems](https://www.imperialviolet.org/2011/03/18/revocation.html), so not all browsers will do this check. Still, revoking certificates that correspond to compromised private keys is an important practice, and is required by Let's Encrypt's [Subscriber Agreement](/repository).

To revoke a certificate with Let's Encrypt, you will use the [ACME API](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md), most likely through an ACME client like [Certbot](https://certbot.eff.org/). You will need to prove to Let’s Encrypt that you are authorized to revoke the certificate. There are three ways to do this: from the account that issued the certificate, using a different authorized account, or using the certificate private key.

# Specifying a reason code

When revoking a certificate, Let's Encrypt subscribers should select a reason code as follows:

* No reason provided or `unspecified` (RFC 5280 CRLReason #0)
  - When the reason codes below do not apply to the revocation request, the subscriber must not provide a reason code other than "unspecified".
* `keyCompromise` (RFC 5280 CRLReason #1)
  - The certificate subscriber must choose the "keyCompromise" revocation reason when they have reason to believe that the private key of their certificate has been compromised, e.g. an unauthorized person has had access to the private key of their certificate.
  - If the revocation request is signed using the Certificate private key, rather than a Subscriber account private key, Let's Encrypt may ignore the revocation reason in the request and set the reason to "keyCompromise".
* `superseded` (RFC 5280 CRLReason #4)
  - The certificate subscriber should choose the "superseded" revocation reason when they request a new certificate to replace their existing certificate.
* `cessationOfOperation` (RFC 5280 CRLReason #5)
  - The certificate subscriber should choose the "cessationOfOperation" revocation reason when they no longer own all of the domain names in the certificate or when they will no longer be using the certificate because they are discontinuing their website.
  - If the revocation request is from a Subscriber account which did not order the certificate in question, but has demonstrated control over all identifiers in the certificate, Let's Encrypt may ignore the revocation reason in the request and set the reason to "cessationOfOperation".

Revocation requests that specify any reason code other than those detailed above will be rejected.

# From the account that issued the certificate

If you originally issued the certificate, and you still have control of the account you used to issue it, you can revoke it using your account credentials. Certbot will attempt this by default. Example:

```bash
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem
```

# Using a different authorized account

If someone issued a certificate after compromising your host or your DNS, you'll want to revoke that certificate once you regain control. In order to revoke the certificate, Let's Encrypt will need to ensure that you control the domain names in that certificate (otherwise people could revoke each other's certificates without permission)!

To validate this control, Let's Encrypt uses the same methods it uses to validate control for issuance: you can put a [value in a DNS TXT record](https://tools.ietf.org/html/rfc8555#section-8.4) or put a [file on an HTTP server](https://tools.ietf.org/html/rfc8555#section-8.3). Generally, an ACME client will handle these for you. Note that most ACME clients combine validation and issuance, so the only way to ask for validations is to attempt issuance. You can then revoke the resulting certificate if you don't want it, or simply destroy the private key.

If you want to avoid issuing a certificate at all, you can include a non-existent domain name in your command line, which will cause issuance to fail while still validating the other, existing domain names. Example:

```bash
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

And follow the instructions. If you'd prefer to validate using HTTP rather than DNS, replace the `--preferred-challenges` flag with `--preferred-challenges=http`.

Once you've validated control of all the domain names in the certificate you want to revoke, you can download the certificate from [crt.sh](https://crt.sh/), then proceed to revoke the certificate as if you had issued it:

```bash
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem
```

# Using the certificate private key

If you did not originally issue the certificate, but you have a copy of the corresponding private key, you can revoke by using that private key to sign the revocation request. For instance, if you see that a private key has accidentally been made public, you can use this method to revoke certificates that used that private key, even if you are not the person who originally issued those certificates.

To use this method, you will first need a copy of the private key in PEM format.

Then, if you don't already have it, download the certificate to be revoked. Let's Encrypt logs all certificates to [Certificate Transparency](https://www.certificate-transparency.org/) logs, so you can find and download certificates from a log monitor like [crt.sh](https://crt.sh/). Searching for a matching `SubjectPublicKeyInfo` (SPKI) field will find all certificates that use the private key. To extract the SPKI hash from a private key:
```bash
openssl pkey -outform DER -in /PATH/TO/privkey.pem -pubout | openssl sha256
```

Once you have the private key and certificate, you can revoke the certificate like so:

```bash
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/privkey.pem --reason keyCompromise
```
