---
title: Law Enforcement Request Guidelines
slug: law-enforcement
lastmod: 2025-06-25
do_not_translate: 1
---

## Introduction and ISRG Mission

These guidelines are for law enforcement officials seeking records from Internet Security Research Group (ISRG) concerning users of our Let’s Encrypt service, in connection with an official investigation or proceeding.

ISRG is a California nonprofit corporation with a mission to reduce financial, technological, and educational barriers to secure communication over the Internet. As a privacy-focused organization, we carefully balance our commitment to user privacy with our legal obligations to respond to valid law enforcement requests.

Acceptance of legal process by any means discussed in these guidelines is for convenience only, and does not waive any objections, including lack of jurisdiction or proper service. 

## What We Can Provide

We don’t collect much information about our subscribers. Because our service is free, we do not collect legal identity or payment information.

What we do collect is described in our Privacy Policy: [https://letsencrypt.org/privacy/](/privacy/)

Mainly we can provide:

* Account registration date and time used to create an account.
* API transaction logs with domain names, IP addresses, and timestamps.
* Lists of TLS certificates issued.

## U.S. Legal Process

We disclose records solely in accordance with our terms of service, privacy policy, and applicable law, including the Stored Communications Act, 18 U.S.C. § 2701 et seq.

A valid subpoena issued in connection with an official criminal investigation is required for disclosure of basic subscriber records (as defined in 18 U.S.C. § 2703(c)(2)). A court order issued under 18 U.S.C. § 2703(d) or search warrant may be required for other information pertaining to a subscriber (not including the contents of communications). See 18 U.S.C. § 2703(c)(1).

We will take steps to preserve account records in connection with an official criminal investigation for 90 days pursuant to 18 U.S.C. § 2703(f), pending our receipt of formal legal process. You may submit a preservation request using the contact information below.

## International (Non-U.S.) Legal Process

ISRG and its Let’s Encrypt service are based in the United States. Generally, a Mutual Legal Assistance Treaty request or letter rogatory is required to compel the disclosure of user data to law enforcement agencies outside the United States. Due to resource limitations, we are generally not able to respond to requests from law enforcement agencies outside the United States that do not follow the MLAT process.

## Emergency Requests

In emergency situations involving imminent danger of death or serious physical injury to any person, or significant harm to critical infrastructure, ISRG may expedite its response to law enforcement requests.

For emergency requests:

1. Use the subject line "EMERGENCY DISCLOSURE REQUEST" when emailing law-enforcement@letsencrypt.org
2. Provide all information outlined in the "Delivering Requests" section
3. Include a detailed explanation of the nature of the emergency, the imminent harm, and why the information sought is necessary to prevent the harm
4. Provide contact information for a supervising officer who can verify the emergency nature of the request
5. Follow up with appropriate legal process as soon as practicable

ISRG will evaluate emergency requests on a case-by-case basis and may, at its discretion, provide information necessary to prevent the emergency harm while awaiting formal legal process.

## Data Retention And Availability

* Transaction Log Data: ISRG maintains searchable transaction log data for approximately 90 days. This includes API transaction logs with domain names, IP addresses, and timestamps.
* When crafting a subpoena or preservation request, please limit requests for transaction log data to the 90 days prior to retrieval. This is what we have active and searchable in our systems.
* Technical Limitations: To go back further than 90 days requires retrieval and review of off-site backups that are not reasonably accessible and involves substantial staff time and expense. Such requests may result in additional costs and significant delays.
* Persistent Account Data: Some account data, such as account registration information, remain active and searchable beyond 90 days and are included in reports limited to the past 90 days.
* Certificate Information: Information about issued certificates is publicly available through Certificate Transparency logs and is not subject to the 90-day limitation.
* Data Preservation: Upon receipt of a valid preservation request pursuant to 18 U.S.C. § 2703(f), we will preserve available account records for 90 days pending receipt of formal legal process.

## Nondisclosure Orders

Our policy is to notify subscribers about law enforcement requests if we plan to produce subscriber data (if we have contact information), unless we are prohibited from doing so by law. We may also provide delayed notice upon expiration of a specific nondisclosure period in a court order.

If you believe that notification would jeopardize an investigation, you should obtain an appropriate court order or other valid process establishing that notice is prohibited. If you need to extend a nondisclosure period, please submit a new court order before the current order expires.

## Delivering Requests

United States law enforcement agencies may send valid legal process or preservation requests in connection with an official criminal investigation to:

[law-enforcement@letsencrypt.org](mailto:law-enforcement@letsencrypt.org)

You may also mail the request to us at “Internet Security Research Group, ATTN: Law Enforcement Response Team, P.O. Box 18666, Minneapolis, MN 55418-0666”, but please note that you are likely to receive a quicker response if you send it by email.

Please identify requested records with particularity and include (1) the name of the issuing authority and agent; (2) an email address from a law enforcement domain; and (3) a direct contact phone number.

## Cost Reimbursement

ISRG reserves the right to seek reimbursement for costs in responding to requests for information as provided by law. We may charge additional fees for costs incurred in responding to unusual or burdensome requests.

## Transparency Reporting

ISRG publishes transparency reports every six months detailing the number and types of law enforcement requests received and how they were processed. All data in transparency reports is aggregated and does not identify specific investigations or requesting agencies. Current and past transparency reports are available at [https://letsencrypt.org/repository/](/repository/).
