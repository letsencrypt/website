---
title: Privacy Considerations for IP Certs
slug: ip-cert-privacy
lastmod: 2025-10-22
show_lastmod: true
---

# Privacy Considerations for Home Use of IP Address Certificates

Since [July 2025](https://letsencrypt.org/2025/07/01/issuing-our-first-ip-address-certificate), Let’s Encrypt has been able to issue certificates for IP addresses, in addition to its traditional certificates covering domain names.

Issuing IP address certificates for a service or device in one’s home can have privacy implications because it creates a public record, via [Certificate Transparency](https://certificate.transparency.dev/), of what IP address one was using at a particular time. Those privacy implications are different from those associated with our traditional certificates that cover only domain names. This is particularly worth considering for manufacturers of devices such as network-attached storage (NAS), home servers, or home automation devices that can obtain Let’s Encrypt certificates automatically.

Users who are manually requesting IP address certificates for their home network devices may also want to consider the material below.

## Certificate Transparency background

The [Certificate Transparency system](https://certificate.transparency.dev/) creates a public log of the full content of every publicly-trusted certificate. All certificates from Let’s Encrypt, as well as from every other publicly-trusted certificate authority, are logged in Certificate Transparency. This includes IP address certificates. Certificate Transparency helps all participants in the certificate ecosystem ensure that trusted certificate authorities aren’t issuing inaccurate certificates.

The Certificate Transparency logs are permanent and are publicly searchable and downloadable.

## Consequences for IP address certificates

Subscribers may request IP address certificates from Let’s Encrypt for many purposes. They may be used with public services with a static IP address, such as DNS servers which are specifically intended to be known and accessed by that IP address.

Some subscribers may also use IP address certificates in order to access devices on their home networks when they’re away from home. For example, a network-attached storage (NAS) device that’s attached to a home network and stores files can also be accessed remotely over the Internet. Many products like this have previously used Let’s Encrypt certificates with a domain name, whether that name was provided by the customer or by the device maker. With IP address certificates, it’s possible to securely access such a device, or another similar home-network device, over the Internet via HTTPS, even without a domain name, as long as its IP address remains stable.

Let’s Encrypt will automatically publish such a certificate in Certificate Transparency. For a certificate that only covers an IP address, the existence of the logged certificate isn’t usually a major privacy risk, because Let’s Encrypt certificates don’t contain any additional identifying information about the subscriber, beyond the subject identifiers (in this case, IP addresses) that inherently must be listed in order for the certificate to work at all.

### Strangers may attempt to connect to the listed addresses

As with other kinds of certificates, the Certificate Transparency listing allows the general public to become aware of the existence of all the identifiers included in the certificate, by monitoring Certificate Transparency logs. Although services on IPv4 addresses are commonly also discoverable through port-scanning surveys that attempt to connect to every IPv4 address, IPv6 addresses may be too numerous to guess. Creating a publicly-trusted certificate that covers an IPv6 address means that the public will learn that some kind of Internet service may exist there; various entities may attempt to connect to that address as a result. For some IPv6 addresses, that might not have happened otherwise.

### Certificates listing both names and addresses reveal that both were used by the same person or organization

A broader privacy concern arises when obtaining a single certificate that covers both a domain name and an IP address, and when that IP address is on a home network. This is because it becomes easier to use the contents of that certificate to associate the owner of that domain name with other kinds of online activity involving that same IP address, whether in real-time or long after the fact.

For example, suppose Janet Nominal is issued the addresses 198.51.100.42 and 2001:DB8:9D71:54E7:7F00:42E0:59E4:CD0E by her residential broadband ISP, and she’s also reserved the subdomain janetnominal.example.com from her device maker to use with a network-attached storage device. If her device requests a single Let’s Encrypt certificate covering the IP addresses and the subdomain name, that certificate will be logged in Certificate Transparency and permanently reveal that the owner of the name was also the user of that IP address as of a specific date and time.

<img src="/images/2025.10.22.ip-cert-privacy.png" alt="Diagram showing a certificate covering both a DNS name and two IP addresses">

This simulated certificate lists both DNS and IP address identifiers side-by-side, causing them to be permanently publicly associated with each other (and with the date of issuance of the certificate, further increasing the potential privacy risk).

If Janet has browsed anywhere online anonymously, operators of the sites she visited who logged her browser’s IP address could later check Certificate Transparency and figure out that those visits came from the same network where the janetnominal.example.com device was operating—presumably, Janet’s home.

Of course, this isn’t the only possible way to identify who was using a particular IP address, and operating public Internet services from one’s home always creates some risk that others will be able to connect those services with other online activity, whether or not any certificates are involved. Nonetheless, we encourage makers of devices that use Let’s Encrypt certificates not to create a new way to draw that connection easily.

## Recommendations for device manufacturers

When integrating Let’s Encrypt certificate support on a device that’s meant to be used in a home, try to avoid automatically

* requesting a single certificate for both a domain name and an IP address,
* requesting separate certificates for a domain name and an IP address that both refer to the same subject public key, or
* requesting certificates for a domain name and an IP address in immediate succession, or with a predictable delay in between.

Instead, if your device automatically issues certificates for domain names and IP addresses, try to issue these as **separate certificates, with a random delay**, and including **two different subject public keys**, so that it won’t be obvious to someone viewing the certificates later on that they were used by the same device. (Typically, sharing the same subject public key implies that two certificates are used on the same device, since there’s no common way that public keys would be shared between devices.)

If the end user of a device meant to be used in the home asks the device to obtain a combined certificate covering both names and IP addresses, we suggest that, before requesting such a certificate, the device should warn the user that this course of action may have privacy implications.

Using the same [Let’s Encrypt account](/docs/account-id) for both certificates is less of a privacy concern, because Let’s Encrypt does not publicly reveal which certificates were issued by which accounts. That information is also not published via Certificate Transparency.

## Probably not a concern for public services in colocation facilities or cloud hosting

If you’re operating a public Internet service from a server in a data center, the fact that you or your organization are responsible for that service, and the details of where it’s hosted, may be public information. In that case, there’s typically no problem with using a Let’s Encrypt certificate that covers both your domain name(s) and IP address(es). You typically won’t object to the public knowing that the IP addresses were used by you, that information is very easy for anyone to observe when using your service, and those addresses usually have almost none of your other online activity associated with them. (For example, you probably don’t often browse to other web sites directly from your own hosted web server.)
