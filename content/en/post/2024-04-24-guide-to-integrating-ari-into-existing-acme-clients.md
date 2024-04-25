---
author: Samantha Frank
date: 2024-04-25T00:00:00Z
slug: guide-to-integrating-ari-into-existing-acme-clients
title: "An Engineer’s Guide to Integrating ARI into Existing ACME Clients"
excerpt: "Six steps developers can take to integrate ARI into an existing ACME client."
---

Following our [previous](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari) post on the foundational benefits of ACME Renewal Information ([ARI](https://datatracker.ietf.org/doc/draft-ietf-acme-ari/)), this one offers a detailed technical guide for incorporating ARI into existing ACME clients.

Since its introduction in March 2023, ARI has significantly enhanced the resiliency and reliability of certificate revocation and renewal for a growing number of Subscribers. To extend these benefits to an even broader audience, incorporating ARI into more ACME clients is essential.

To foster wider adoption, we're excited to announce a new compelling incentive: certificate renewals that utilize ARI will now be exempt from all [rate limits](https://letsencrypt.org/docs/rate-limits/). To capitalize on this benefit, renewals must occur within the ARI-suggested renewal window, and the request must clearly indicate which existing certificate is being replaced. To learn how to request a suggested renewal window, select an optimal renewal time, and specify certificate replacement, continue reading!

## Integrating ARI Into an Existing ACME Client

In May 2023, we contributed a [pull request](https://github.com/go-acme/lego/pull/1912) to the [Lego](https://go-acme.github.io/lego/usage/cli/) ACME client, adding support for draft-ietf-acme-ari-01. In December 2023 and February 2024, we contributed two follow-up pull requests ([2066](https://github.com/go-acme/lego/pull/2066), [2114](https://github.com/go-acme/lego/pull/2114)) adding support for changes made in draft-ietf-acme-ari-02 and 03. These experiences provided valuable insight into the process of integrating ARI into an existing ACME client. We've distilled these insights into six steps, which we hope will be useful for other ACME client developers.

*Note:* the code snippets in this post are written in Golang. We've structured and contextualized them for clarity, so that they might be easily adapted to other programming languages as well.

### **Step 1: Detecting support for ARI**

While Let's Encrypt first enabled ARI in [Staging](https://letsencrypt.org/docs/staging-environment/) and Production environments in March 2023, many ACME clients are used with a variety of CAs, so it's crucial to ascertain if a CA supports ARI. This can be easily determined: if a 'renewalInfo' endpoint is included in the CA's directory object, then the CA supports ARI.

In most any client you'll find a function or method that is responsible for parsing the JSON of the ACME directory object. If this code is deserializing the JSON into a defined type, it will be necessary to modify this type to include the new 'renewalInfo' endpoint.

In Lego, we added a 'renewalInfo' field to the Directory struct, which is accessed by the GetDirectory method:

```
type Directory struct {
    NewNonceURL    string `json:"newNonce"`
    NewAccountURL  string `json:"newAccount"`
    NewOrderURL    string `json:"newOrder"`
    NewAuthzURL    string `json:"newAuthz"`
    RevokeCertURL  string `json:"revokeCert"`
    KeyChangeURL   string `json:"keyChange"`
    Meta           Meta   `json:"meta"`
    RenewalInfo    string `json:"renewalInfo"`
}
```

As we discussed above, not all ACME CAs currently implement ARI, so before we attempt to make use of the 'renewalInfo' endpoint we should ensure that this endpoint is actually populated before calling it:

```
func (c *CertificateService) GetRenewalInfo(certID string) (*http.Response, error) {
  if c.core.GetDirectory().RenewalInfo == "" {
    return nil, ErrNoARI
  }
}
```

### **Step 2: Determining where ARI fits into the renewal lifecycle of your client**

The next step involves selecting the optimal place in the client's workflow to integrate ARI support. ACME clients can either run persistently or be executed on-demand. ARI is particularly beneficial for clients that operate persistently or for on-demand clients that are scheduled to run at least daily.

In the case of Lego, it falls into the latter category. Its renew command is executed on-demand, typically through a job scheduler like cron. Therefore, incorporating ARI support into the renew command was the logical choice. Like many ACME clients, Lego already has a mechanism to decide when to renew certificates, based on the certificate's remaining validity period and the user's configured renewal timeframe. Introducing calls to ARI should take precedence over this mechanism, leading to a modification of the renew command to consult ARI before resorting to the built-in logic.

### **Step 3: Constructing the ARI CertID**

The composition of the ARI CertID is a crucial part of the ARI specification. This identifier, unique to each certificate, is derived by combining the base64url encoded bytes of the certificate's Authority Key Identifier (AKI) extension and its Serial Number, separated by a period. The approach of combining AKI and serial number is strategic: the AKI is specific to an issuing intermediate certificate, and a CA may have multiple intermediates. A certificate's serial number is required to be unique per issuing intermediate, but serials can be reused between intermediates. Thus the combination of AKI and serial uniquely identifies a certificate. With this covered, let's move on to constructing an ARI CertID using only the contents of the certificate being replaced.

Suppose the 'keyIdentifier' field of the certificate's Authority Key Identifier (AKI) extension has the hexadecimal bytes `69:88:5B:6B:87:46:40:41:E1:B3:7B:84:7B:A0:AE:2C:DE:01:C8:D4` as its ASN.1 Octet String value. The base64url encoding of these bytes is `aYhba4dGQEHhs3uEe6CuLN4ByNQ=`. Additionally, the certificate's Serial Number, when represented in its DER encoding (excluding the tag and length bytes), has the hexadecimal bytes `00:87:65:43:21`. This includes a leading zero byte to ensure that the serial number is interpreted as a positive integer, as necessitated by the leading `1` bit in `0x87`. The base64url encoding of these bytes is `AIdlQyE=`. After stripping the trailing padding characters ("=") from each encoded part and concatenating them with a period as a separator, the ARI CertID for this certificate is `aYhba4dGQEHhs3uEe6CuLN4ByNQ.AIdlQyE`.

In the case of Lego, we implemented the above logic in the following function:

```
// MakeARICertID constructs a certificate identifier as described in
// draft-ietf-acme-ari-03, section 4.1.

func MakeARICertID(leaf *x509.Certificate) (string, error) {
  if leaf == nil {
    return "", errors.New("leaf certificate is nil")
  }

  // Marshal the Serial Number into DER.
  der, err := asn1.Marshal(leaf.SerialNumber)
  if err != nil {
    return "", err
  }

  // Check if the DER encoded bytes are sufficient (at least 3 bytes: tag,
  // length, and value).
  if len(der) < 3 {
    return "", errors.New("invalid DER encoding of serial number")
  }

  // Extract only the integer bytes from the DER encoded Serial Number
  // Skipping the first 2 bytes (tag and length). The result is base64url
  // encoded without padding.
  serial := base64.RawURLEncoding.EncodeToString(der[2:])

  // Convert the Authority Key Identifier to base64url encoding without
  // padding.
  aki := base64.RawURLEncoding.EncodeToString(leaf.AuthorityKeyId)

  // Construct the final identifier by concatenating AKI and Serial Number.
  return fmt.Sprintf("%s.%s", aki, serial), nil
}
```

Note: In the provided code, we utilize the RawURLEncoding, which is the unpadded base64 encoding as defined in [RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648#section-5). This encoding is similar to URLEncoding but excludes padding characters, such as "=". Should your programming language's base64 package only support URLEncoding, it will be necessary to remove any trailing padding characters from the encoded strings before combining them.

### **Step 4: Requesting a suggested renewal window**

With the ARI CertID in hand, we can now request renewal information from the CA. This is done by sending a GET request to the 'renewalInfo' endpoint, including the ARI CertID in the URL path.

```
GET https://example.com/acme/renewal-info/aYhba4dGQEHhs3uEe6CuLN4ByNQ.AIdlQyE
```

The ARI response is a JSON object that includes a 'suggestedWindow', with 'start' and 'end' timestamps indicating the recommended renewal period, and optionally, an 'explanationURL' providing additional context about the renewal suggestion.

```
{
  "suggestedWindow": {
    "start": "2021-01-03T00:00:00Z",
    "end": "2021-01-07T00:00:00Z"
  },
  "explanationURL": "https://example.com/docs/ari"
}
```

The 'explanationURL' is optional. However, if it's provided, it's recommended to display it to the user or log it. For instance, in cases where ARI suggests an immediate renewal due to an incident that necessitates revocation, the 'explanationURL' might link to a page explaining the incident.

Next, we'll cover how to use the 'suggestedWindow' to determine the best time to renew the certificate.

### **Step 5: Selecting a specific renewal time**

[draft-ietf-acme-ari](https://datatracker.ietf.org/doc/draft-ietf-acme-ari/) provides a suggested algorithm for determining when to renew a certificate. This algorithm is not mandatory, but it is recommended.

1. Select a uniform random time within the suggested window.

2. If the selected time is in the past, attempt renewal immediately.

3. Otherwise, if the client can schedule itself to attempt renewal at exactly the selected time, do so.

4. Otherwise, if the selected time is before the next time that the client would wake up normally, attempt renewal immediately.

5. Otherwise, sleep until the next normal wake time, re-check ARI, and return to "1."

For Lego, we implemented the above logic in the following function:

```
func (r *RenewalInfoResponse) ShouldRenewAt(now time.Time, willingToSleep time.Duration) *time.Time {

  // Explicitly convert all times to UTC.
  now = now.UTC()
  start := r.SuggestedWindow.Start.UTC()
  end := r.SuggestedWindow.End.UTC()

  // Select a uniform random time within the suggested window.
  window := end.Sub(start)
  randomDuration := time.Duration(rand.Int63n(int64(window)))
  rt := start.Add(randomDuration)

  // If the selected time is in the past, attempt renewal immediately.
  if rt.Before(now) {
    return &now
  }

  // Otherwise, if the client can schedule itself to attempt renewal at exactly the selected time, do so.
  willingToSleepUntil := now.Add(willingToSleep)
  if willingToSleepUntil.After(rt) || willingToSleepUntil.Equal(rt) {
    return &rt
  }

  // TODO: Otherwise, if the selected time is before the next time that the client would wake up normally, attempt renewal immediately.

  // Otherwise, sleep until the next normal wake time.

  return nil

}
```

### **Step 6: Indicating which certificate is replaced by this new order**

To signal that a renewal was suggested by ARI, a new 'replaces' field has been added to the ACME Order object. The ACME client should populate this field when creating a new order, as shown in the following example:
```
{
  "protected": base64url({
    "alg": "ES256",
    "kid": "https://example.com/acme/acct/evOfKhNU60wg",
    "nonce": "5XJ1L3lEkMG7tR6pA00clA",
    "url": "https://example.com/acme/new-order"
  }),
  "payload": base64url({
    "identifiers": [
      { "type": "dns", "value": "example.com" }
    ],
    "replaces": "aYhba4dGQEHhs3uEe6CuLN4ByNQ.AIdlQyE"
  }),
  "signature": "H6ZXtGjTZyUnPeKn...wEA4TklBdh3e454g"
}
```

Many clients will have an object that the client deserializes into the JSON used for the order request. In the Lego client, this is the Order struct. It now includes a 'replaces' field, accessed by the NewWithOptions method:

```
// Order the ACME order Object.
// - https://www.rfc-editor.org/rfc/rfc8555.html#section-7.1.3

type Order struct {
  ...
  // replaces (optional, string):
  // a string uniquely identifying a previously-issued
  // certificate which this order is intended to replace.
  // - https://datatracker.ietf.org/doc/html/draft-ietf-acme-ari-03#section-5
  Replaces string `json:"replaces,omitempty"`
}

...

// NewWithOptions Creates a new order.
func (o *OrderService) NewWithOptions(domains []string, opts *OrderOptions) (acme.ExtendedOrder, error) {
  ...
  if o.core.GetDirectory().RenewalInfo != "" {
    orderReq.Replaces = opts.ReplacesCertID
  }
}
```

When Let's Encrypt processes a new order request featuring a 'replaces' field, several important checks are conducted. First, it's verified that the certificate indicated in this field has not been replaced previously. Next, we ensure that the certificate is linked to the same ACME account that's making the current request. Additionally, there must be at least one domain name shared between the existing certificate and the one being requested. If these criteria are met and the new order request is submitted within the ARI-suggested renewal window, the request qualifies for exemption from all rate limits. Congratulations!

## Moving Forward

The integration of ARI into more ACME clients isn't just a technical upgrade, it's the next step in the evolution of the ACME protocol; one where CAs and clients work together to optimize the renewal process, ensuring lapses in certificate validity are a thing of the past. The result is a more secure and privacy-respecting Internet for everyone, everywhere.

As always, we're excited to engage with our community on this journey. Your insights, experiences, and [feedback](https://community.letsencrypt.org/c/client-dev/14) are invaluable as we continue to push the boundaries of what's possible with ACME.

We're grateful to be partnering with Princeton University on our ACME Renewal Information work, thanks to generous support from the [Open Technology Fund](https://www.opentech.fund/).

[Internet Security Research Group (ISRG)](https://abetterinternet.org/) is the parent organization of [Let's Encrypt](http://letsencrypt.org/), [Prossimo](http://memorysafety.org/), and [Divvi Up](http://divviup.org/). ISRG is a 501(c)(3) nonprofit. If you'd like to support our work, please consider [getting involved](https://www.abetterinternet.org/getinvolved/), [donating](https://www.abetterinternet.org/donate/), or encouraging your company to [become a sponsor](https://www.abetterinternet.org/sponsor/).