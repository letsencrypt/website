---
title: Monitoring Service Options
slug: monitoring-options
lastmod: 2025-05-21
show_lastmod: 1
---

Being able to monitor TLS certificate status is helpful for many of our subscribers. Monitoring services can assist with things like expiration notifications and keeping an eye out for unwanted issuance.

Let’s Encrypt can recommend [Red Sift Certificates Lite (formerly Hardenize)](https://redsift.com/pulse-platform/certificates-lite). You can monitor up to 250 certificates for free through Red Sift.

There are a number of monitoring options out there, including:

* [Red Sift Certificates (formerly Hardenize)](https://redsift.com/pulse-platform/certificates-lite)
* [UptimeRobot](https://uptimerobot.com/ssl-monitoring/)
* [Datadog SSL Monitoring](https://www.datadoghq.com/monitoring/ssl-monitoring/)
* [TrackSSL](https://trackssl.com/)
* [Host-Tracker](https://www.host-tracker.com/)
* [Heii On-Call](https://heiioncall.com/guides/ssl-certificate-expiration-monitoring)

Please note that all of these services are unaffiliated with ISRG / Let's Encrypt.

If you prefer to write your own script for expiration notifications, please see [Barebone Scripts to Check SSL Certificate Expiration](https://heiioncall.com/blog/barebone-scripts-to-check-ssl-certificate-expiration), which contains minimal, cron-ready scripts in Bash, Python, Ruby, Node.js, Go, and Powershell. These examples show how to retrieve a certificate's expiration date, calculate the number of days remaining, and have an if-else block so you can take action before expiry.

The options listed on this page are provided for informational purposes only. ISRG does not endorse or guarantee the safety, reliability, or effectiveness of any particular service. Users are encouraged to conduct their own research and due diligence before selecting any option. ISRG is not responsible for any outcomes resulting from the use of these services.
