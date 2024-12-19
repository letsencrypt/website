---
author: Aaron Gable
date: 2024-12-19T00:00:00Z
slug: acme-profiles
title: "Announcing Certificate Profile Selection"
excerpt: "New extension makes it possible for site operators and ACME clients to select new profile options for Let's Encrypt certificates."
display_default_footer: true
---

## Announcing Certificate Profile Selection

We are excited to announce a new extension to Let's Encrypt's implementation of the ACME protocol that we are calling "profile selection." This new feature will allow site operators and ACME clients to opt in to the next evolution of Let's Encrypt.

As of today, the [staging environment](https://letsencrypt.org/docs/staging-environment/) is advertising a new field in its directory resource:

```bash
GET /directory HTTP/1.1
HTTP/1.1 200 OK
Content-Type: application/json

{
    ...
    "meta": {
        "profiles": {
            "classic": "The same profile you're accustomed to",
            "tlsserver": "https://letsencrypt.org/2024/12/20/acme-profiles/"
        }
    }
}
```

Here, the keys are the names of new "profiles", and the values are human-readable descriptions of those profiles. A profile describes a collection of attributes about the certificate that will be issued, such as what extensions it will contain, how long it will be valid for, and more.

For example, the "classic" profile is exactly what it sounds like: certificates issued under the classic profile will look exactly the same as those that we have always issued, valid for 90 days.

But certificates issued under the "tlsserver" profile will have a number of differences tailored specifically towards TLS server usage:

- No Common Name field (including a CN has been [NOT RECOMMENDED](https://github.com/cabforum/servercert/blob/main/docs/BR.md#71272-domain-validated) by the Baseline Requirements for several years now)
- No Subject Key Identifier (including a SKID is [NOT RECOMMENDED](https://github.com/cabforum/servercert/blob/main/docs/BR.md#71276-subscriber-certificate-extensions) by the Baseline Requirements)
- No TLS Client Auth Extended Key Usage (root programs are [moving towards requiring "single-purpose" issuance hierarchies](https://www.chromium.org/Home/chromium-security/root-ca-policy/moving-forward-together/#focusing-on-simplicity), where every certificate has only a single EKU)
- No Key Encipherment Key Usage for certificates with RSA public keys (this KU was used by older RSA-based TLS cipher suites, but is fully unnecessary in TLS 1.3)

Additionally, in the near future we will offer a "shortlived" profile which will be identical to the "tlsserver" profile but with a validity period of only 6 days. This profile isn't available in Staging just yet, so keep an eye out for further announcements regarding short-lived certificates and why we think they're exciting.

An ACME client can supply a desired profile name in a new-order request:

```bash
POST /acme/new-order HTTP/1.1
Host: example.com
Content-Type: application/jose+json

{
    "protected": base64url(...),
    "payload": base64url({
    "profile": "tlsserver",
        "identifiers": [
            { "type": "dns", "value": "www.example.org" },
            { "type": "dns", "value": "example.org" }
        ],
    }),
    "signature": "H6ZXtGjTZyUnPeKn...wEA4TklBdh3e454g"
}
```

If the new-order request is accepted, then the selected profile name will be reflected in the Order object when it is returned, and the resulting certificate after finalization will be issued with the selected profile. If the new-order request does not specify a profile, then the server will select one for it.

### Guidance for ACME clients and users

If you are an ACME client author, we encourage you to introduce support for this new field in your client. A simple implementation might allow the user to configure a static profile name and include that name in all new-order requests. For a better user experience, check the configured name against the list of profiles advertised in the directory, to ensure that changes to the available profiles don't result in invalid new-order requests. For clients with a user interface, such as a control panel or interactive command line interface, an implementation could fetch the list of profiles and their descriptions to prompt the user to select one on first run. It could also use a notification mechanism to inform the user of changes to the list of available profiles. We'd also love to hear from you about your experience implementing and deploying this new extension.

If you are a site operator or ACME client user, we encourage you to keep an eye on your ACME client of choice to see when they adopt this new feature, and update your client when they do. We also encourage you to try out the "modern" profile in Staging, and let us know what you think of the changes we've made to the certificates issued under that profile.

### What's next?

Obviously there is more work to be done here. We are in the process of writing a formal specification of this ACME extension, and have [submitted it to the IETF ACME Working Group](https://datatracker.ietf.org/doc/draft-aaron-acme-profiles/) for standardization. Over the coming weeks and months we will also be providing more information about when we enable profile selection in our production environment, and what our production profile options will be.

Thank you for coming along with us on this journey into the future of the Web PKI. We look forward to your testing and feedback!