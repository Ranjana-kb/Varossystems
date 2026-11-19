# WatsBuy Help Center Website Package

## Included
- `index.html` — responsive Help Center front end, with embedded CSS and JavaScript.
- Searchable help articles and category cards.
- Article modal views for Meta integration, Meta verification, Meta billing, WhatsApp templates, payment gateways, catalogue, AI, campaigns, orders, analytics and security.
- A support request form mockup.
- `content/articles.json` — editable article content as JSON.
- `WatsBuy_Help_Center_Content_Guide.docx` — full Word content and implementation guide, if copied into this package.

## Preview locally
Open `index.html` in a modern browser. No build step is required. The Google Fonts import requires internet; fallback fonts are included.

## Before production launch
1. Replace the stylized WatsBuy `W` placeholder with the approved WatsBuy logo.
2. Verify all dashboard menu paths and features against the live WatsBuy product.
3. Confirm whether Meta billing is direct or managed by a solution provider; update the billing guide accordingly.
4. List only payment gateways that are actually implemented and tested.
5. Connect the support form to your ticketing system, CRM, email endpoint or backend. It currently does not transmit or store submissions.
6. Replace the placeholder policy links and support channels with verified live URLs and monitored contact details.
7. Connect system status to a real monitoring source before showing live uptime claims.
8. Add hosting, analytics, privacy consent and accessibility checks as appropriate.
9. Review Meta and payment-provider policies/pricing before publishing, since these may change.

## Suggested deployment
Upload `index.html` to your web host or deploy the folder as a static site. For a production knowledge base, the developer can later separate content into a CMS and add routing, article URLs, authentication or ticket integrations.

## Content caution
This is a front-end starter package, not a connected production support backend. The sample articles are drafts and must be checked against WatsBuy's actual integrations and current Meta/provider requirements.
