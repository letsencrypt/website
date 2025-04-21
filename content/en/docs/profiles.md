---
title: Profiles
slug: profiles
date: 2025-02-05
lastmod: 2025-02-05
show_lastmod: false
---

A profile is a collection of characteristics that describe both the validation process required to get a certificate, and the final contents of that certificate. For the vast majority of Let's Encrypt subscribers, you should never have to worry about this: we automatically select the best profile for you, and ensure that it complies with all of the requirements and best practices that govern the Web PKI. But some people might be interested in proactively selecting a specific profile, so this page exists to provide the information necessary to make that choice.

# Our Profiles

Below are descriptions of each profile, including what effects they have on both the validation process and the contents of the issued certificate. Note that not all profiles are available in all environments: some may be available only in Staging or only in Production, and some may be (temporarily) locked behind an allowlist so we can roll them out slowly. The list of profiles advertised in the ACME Server's `directory` endpoint is the canonical list.

You can find detailed definitions of the properties discussed in each profile at the bottom of this page.

<div class="boxed">

## classic

The classic profile is the default profile selected for all orders which do not request a specific profile. The validation process and resulting certificate are the same as you're used to from the last several years of Let's Encrypt operation. We recommend using this profile for subscribers who are happy to let others try new things first.

| Property | Value |
| -------- | ----- |
| [Pending Authorization Lifetime](#pending-authorization-lifetime) | 7 days |
| [Authorization Reuse Period](#authorization-reuse-period) | 30 days |
| [Order Lifetime](#order-lifetime) | 7 days |
| [Certificate Common Name](#certificate-common-name) | Yes<sup>*</sup> |
| [Key Encipherment KU](#key-encipherment-key-usage) | Yes<sup>†</sup> |
| [TLS Client Auth EKU](#tls-client-authentication-extended-key-usage) | Yes |
| [Subject Key ID](#subject-key-identifier-extension) | Yes |
| [Validity Period](#validity-period) | 90 days |
| [Max Names](#max-names) | 100 |

<sup>\*</sup>: If the CSR submitted at finalize time requests a specific Common Name, that request is honored. If the the CSR does not request a specific Common Name, the first Subject Alternative Name requested will be promoted into the Subject Common Name. If either the requested name or the to-be-promoted name is too long to fit in the Common Name field (64+ characters), the Common Name will be left empty.

<sup>†</sup>: Only included for certificates with RSA public keys.

</div>
<div class="boxed">

## tlsserver

The tlsserver profile is a new profile which updates several of these validation and certificate properties in order to reflect the latest recommendations from the CA/Browser Forum Baseline Requirements, as well as general trends within the WebPKI community. We recommend selecting this profile for subscribers who want smaller certificates and who fully embrace automation.

The pending authorization lifetime has been reduced to further encourage automation: fully automated systems can complete a validation challenge within seconds, so a lifetime of just one hour is more than enough. The authorization reuse period has been reduced to seven hours. This is because the Baseline Requirements require that we re-check Certificate Authority Authorization (CAA) after eight hours, so limiting the reuse period means that we don't have to perform rechecks. The order lifetime has been reduced to the sum of two authorization lifetimes, because there is little purpose to having an order that outlives the authorizations it depends on.

The issued certificate no longer contains any of the fields discussed above. The Common Name has been omitted, as it is redundant with the Subject Alternative Names and is marked as NOT RECOMMENDED by the Baseline Requirements. The Key Encipherment key usage is omitted because it is only relevant when using non-forward-secret TLS cipher suites, which have been removed by all major browsers due to the importance of forward-secrecy. The TLS Client Auth extended key usage is omitted to comply with upcoming root program requirements that require "single-purpose" (i.e. single EKU) certificates. And the Subject Key ID extension is omitted because it serves no purpose in end-entity certificates and is NOT RECOMMENDED by the Baseline Requirements.

| Property | Value |
| -------- | ----- |
| [Pending Authorization Lifetime](#pending-authorization-lifetime) | 1 hour |
| [Authorization Reuse Period](#authorization-reuse-period) | 7 hours |
| [Order Lifetime](#order-lifetime) | 8 hours |
| [Certificate Common Name](#certificate-common-name) | No |
| [Key Encipherment KU](#key-encipherment-key-usage) | No |
| [TLS Client Auth EKU](#tls-client-authentication-extended-key-usage) | No |
| [Subject Key ID](#subject-key-identifier-extension) | No |
| [Validity Period](#validity-period) | 90 days |
| [Max Names](#max-names) | 25 |

</div>
<div class="boxed">

## shortlived

The shortlived profile is identical to the tlsserver profile, with one key distinction: the resulting certificate is only valid for 6ish days. This allows these certificates to qualify as "Short-Lived Subscriber Certificates" under the Baseline Requirements, which means they do not need to contain any revocation information. This means the certificates can be even smaller, and removes any possibility of a client accidentally trusting a certificate after it has been revoked.

We recommend this profile for those who fully trust their automation to renew their certificates on time. This profile is not for everyone. Because this profile results in much higher issuance volume (since certificates need to be renewed every few days, instead of every few months), it is currently locked behind an allowlist.

| Property | Value |
| -------- | ----- |
| [Pending Authorization Lifetime](#pending-authorization-lifetime) | 1 hour |
| [Authorization Reuse Period](#authorization-reuse-period) | 7 hours |
| [Order Lifetime](#order-lifetime) | 8 hours |
| [Certificate Common Name](#certificate-common-name) | No |
| [Key Encipherment KU](#key-encipherment-key-usage) | No |
| [TLS Client Auth EKU](#tls-client-authentication-extended-key-usage) | No |
| [Subject Key ID](#subject-key-identifier-extension) | No |
| [Validity Period](#validity-period) | 160 hours |
| [Max Names](#max-names) | 25 |

</div>

# Selecting a Profile

The process for selecting a profile is described in [this Internet-Draft](https://datatracker.ietf.org/doc/draft-aaron-acme-profiles/), which we plan to work with the IETF ACME Working Group to turn into a full RFC. Not all ACME Clients have implemented this draft, so the client you use may not yet be able to select a profile.

In general, if you want to select a profile, you should:

1. Read your ACME client's documentation to see if it support profile selection, and if it does, how to tell it which profile you want.
2. Fetch the Let's Encrypt [production](https://acme-v02.api.letsencrypt.org/directory) or [staging](https://acme-staging-v02.api.letsencrypt.org/directory) directory object to see which profiles are available.
3. Configure your desired profile within your ACME client.

# Glossary

## Validation Properties

Below are descriptions of the validation properties that can be controlled by our profiles.

### Pending Authorization Lifetime

This is how long an ACME client has to complete a domain control validation challenge. The clock starts when the ACME Authorization object is created (generally as a result of a new Order being created), and is represented by the [`expires` timestamp](https://datatracker.ietf.org/doc/html/rfc8555#section-7.1.4) in the pending Authorization object. This value is restricted to [at most 30 days](https://github.com/cabforum/servercert/blob/main/docs/BR.md#322419-agreed-upon-change-to-website---acme) by the Baseline Requirements.

### Authorization Reuse Period

This is how long an already-validated Authorization can be reused by new Orders containing the same identifier. The clock starts when a challenge is successfully fulfilled, and is represented by the [`expires` timestamp](https://datatracker.ietf.org/doc/html/rfc8555#section-7.1.4) in the valid Authorization object. This value is restricted to [at most 398 days](https://github.com/cabforum/servercert/blob/main/docs/BR.md#421-performing-identification-and-authentication-functions) by the Baseline Requirements.

### Order Lifetime

This is how long an ACME client has to complete the whole process of ordering a new certificate: placing a new Order, fulfilling any pending Authorizations, and finalizing that Order. The clock starts when the new Order object is created, and is represented by the [`expires` timestamp](https://datatracker.ietf.org/doc/html/rfc8555#section-7.1.3) in the Order object.

## Certificate Properties

Below are descriptions of the certificate properties that can be controlled by our profiles.

### Certificate Common Name

TLS Certificates can contain names (e.g. domain names or IP addresses) in two places: the [Subject Common Name field](https://datatracker.ietf.org/doc/html/rfc5280#section-4.1.2.6) and the [Subject Alternative Names extension](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.6). The Common Name used to be the most common place to put a domain name, and is displayed by many certificate-parsing tools. However, the Common Name can only hold one name, while many certificates want to contain multiple names (such as `example.com`, `www.example.com`, and `blog.example.com`). Today, the Common Name is largely redundant, as whatever name is contained in it is required to _also_ be contained in the Subject Alternative Names extension. Including this field in our certificates is now [NOT RECOMMENDED by the Baseline Requirements](https://github.com/cabforum/servercert/blob/main/docs/BR.md#71272-domain-validated).

### Key Encipherment Key Usage

TLS Certificates have a ["Key Usage" extension](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.3), which determines what sorts of cryptographic operations the key contained in the certificate is allowed to perform. All Let's Encrypt certificates contain the Digital Signature KU, which is necessary to perform TLS handshakes. The Key Encipherment KU was historically required by old versions of TLS to perform certain kinds of handshakes with RSA keys. However, those operations are now known to be insecure, and have been deprecated and removed from browsers for several years now. Including the Key Encipherment key usage is now [NOT RECOMMENDED by the Baseline Requirements](https://github.com/cabforum/servercert/blob/main/docs/BR.md#712711-subscriber-certificate-key-usage).

### TLS Client Authentication Extended Key Usage

In addition to the above, TLS Certificates also have an ["Extended Key Usage" extension](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.12), which provides an extra layer of granularity to the Key Usage extension described above. The two most common extended key usages are TLS Server Auth (which allows the certificate to be presented by a server during a TLS handshake) and TLS Client Auth (which allows the certificate to be presented by a _client_ during a TLS handshake). The latter is very rare, and root programs are [moving towards](https://www.chromium.org/Home/chromium-security/root-ca-policy/moving-forward-together/#phase-out-multi-purpose-roots-from-the-chrome-root-store) requiring that the TLS Client Auth EKU be omitted from certificates.

### Subject Key Identifier Extension

TLS Certificates can have a ["Subject Key Identifier" extension](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.2), which provides a short string that uniquely identifies the public key present in the certificate. This extension is very important for CA certificates, because it allows browsers to quickly find the CA certificate which issued the end-entity certificate being presented by a website. However, the extension serves no purpose in end-entity certificates, and including it is now NOT RECOMMENDED by the Baseline Requirements.

### Validity Period

This governs the amount of time between the [`notBefore` and `notAfter` timestamps](https://datatracker.ietf.org/doc/html/rfc5280#section-4.1.2.5) that are embedded in a TLS Certificate, in other words, how long the certificate will be trusted before it expires. This value is restricted to [at most 398 days](https://github.com/cabforum/servercert/blob/main/docs/BR.md#632-certificate-operational-periods-and-key-pair-usage-periods) by the Baseline Requirements.

### Max Names

This is the maximum number of ["Subject Alternative Names"](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.6) for which we will issue a certificate.