# WatsBuy — Multi-Page Conversational Commerce Website

A modern, responsive, multi-page website for **WatsBuy** (operated by **Ziro Systems Private Limited** in India and **Varos System Fzco** in the UAE). WatsBuy turns WhatsApp into a 24/7 digital storefront, unifying catalogue discovery, conversational AI guidance, voice ordering, native WhatsApp Flows checkout, instant payments, and automated customer re-engagement.

Designed and aligned directly with **`references/WatsBuy_Full_Pitch_Deck-New.pptx`**, `references/Pricing.png`, `references/Book-Demo-Reference.png`, and the brand logo in `assets/images/watsbuy-logo.png`.

> [!NOTE]
> The Emergent URL in this README is retained strictly as a background design and content reference. Visitors are never routed off-site; all content, forms, simulations, and demo booking experiences are hosted natively within the local pages.

---

## 🚀 Quick Preview & Run Instructions

The website is a static multi-page website built with semantic HTML5, modern CSS3 (custom properties, flexbox, CSS grid, and responsive viewports), and lightweight vanilla JavaScript with zero external runtime dependencies.

### Option 1: Direct Browser Preview (Instant)
Simply open `index.html` or any page directly in your browser:
- **Windows (File Explorer):** Double-click `index.html` or right-click → **Open with** → Chrome / Edge / Firefox.
- **PowerShell / Terminal:**
  ```powershell
  Start-Process index.html
  ```

### Option 2: Local HTTP Server with Node.js
If you have Node.js installed, run a local development server:
```bash
# Using npx serve
npx serve .

# Or using http-server
npx http-server . -p 3000
```
Then open `http://localhost:3000` in your browser.

### Option 3: Python Built-in HTTP Server
```bash
# Python 3
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

---

## 🗺️ Website Architecture & Page Map (17 Pages)

The website is structured as a true **multi-page website** where each main navigation item opens its own dedicated `.html` page, sharing a consistent sticky header, design theme, and footer across all pages:

| Page File | Title / Route | Details & Scope |
| :--- | :--- | :--- |
| **`index.html`** | Home | High-impact overview: Platform hero with prominent "7 Day Free Trial" CTA and "Why WatsBuy? →", live merchant workspace preview, 5-Step WhatsApp Commerce Experience, 3 Product Suites, 8 Core Pillars of WatsBuy, and Closing CTA. |
| **`why-watsbuy.html`** | Why WatsBuy? | Accessible directly via "Why WatsBuy?" menu item. Hero: *"Why Wait for Customers to Find Your Store? Bring Your Store to Where Your Customers Already Are."*, *"Reach. Engage. Sell. Repeat."*, *"One WhatsApp Number. Your Entire Store. Unlimited Possibilities."* Includes core problem journey, pain points, comparison table, architectural advantages, enterprise trust pillars, and official legal disclaimer. |
| **`solutions.html`** | Solutions | Tailored solutions deep-dives with quick jump anchor tabs: Retail & D2C (`#retail`), Wholesalers & Distributors (`#wholesale`), Multi-Store Businesses (`#multi-store`), Growing SMBs (`#smb`), and Enterprise Scale (`#enterprise`). Action buttons link to dedicated enquiry and 7-day free trial flows. |
| **`pricing.html`** | Pricing Plans | Features 4 editable plan cards: Basic (₹4,999/mo), **Growth (₹7,999/mo — the ONLY "MOST POPULAR" plan)**, Premium (₹14,999/mo), and Enterprise Custom. Interactive tabs for "Monthly Billing" and "Annual Billing — Save 15%". Basic, Growth, and Premium cards feature "7-Day Free Trial" buttons linked directly to `trial.html`. |
| **`enterprise.html`** | Enterprise Scale | High-throughput broadcast infrastructure, custom ERP/CRM connectors (SAP, Oracle, Tally, Zoho), bespoke automation, guaranteed 99.95% uptime SLA, and Technical Account Management. |
| **`reseller.html`** | Become a Reseller | Partner enablement program: *"Grow Your Business with Recurring SaaS Revenue. Partner with WatsBuy. Expand Your Portfolio. Build Long-Term Revenue."* Includes partner benefits and application form. |
| **`faq.html`** | Help Centre & FAQ | Complete knowledge base with real-time keyword search, accessible category filter pills, accordion toggles, and verified Meta Business Verification FAQs. Resources dropdown contains Help Centre, FAQs, and Get Started. |
| **`getting-started.html`** | Get Started | Step-by-step 5-stage onboarding roadmap: 01. Meta WhatsApp API Verification, 02. Design WhatsApp Flows & Approve Templates, 03. Product Catalogue Upload & Store Configuration, 04. Third-Party API & Payment Integrations, 05. Go-to-Market & Store Launch. |
| **`demo.html`** | Book a Demo | Dedicated local Book a Demo experience: two-column layout with left-hand walkthrough introduction and 6 platform benefits; right-hand demo booking form with required fields including **Preferred Date (date picker)**, **Meeting Mode (Online or Offline)**, and **Preferred Time (30-minute slots from 10:00–10:30 AM through 5:30–6:00 PM)**. |
| **`trial.html`** | 7-Day Free Trial | Dedicated, separate 7-Day Free Trial form page: required fields matching Book a Demo base (Full Name, Business Email, WhatsApp Number, Company/Business Name, Monthly Orders, Area of Interest, Business Address, and Country). Kept completely separate from Book a Demo. |
| **`contact.html`** | Contact Us | Corporate contact and enquiry experience with standard enquiry flow. |
| **`signin.html`** | Sign In | Merchant authentication interface with password security and backend notice. |
| **`about.html`** | About Us | Company story, vision, what we do, and corporate overview. |
| **`privacy.html`** | Privacy Policy | Verbatim statutory policy document with DPDP Act & GDPR alignment and statutory placeholders intact. |
| **`terms.html`** | Terms of Service | Verbatim statutory terms document preserved verbatim. |
| **`refund.html`** | Cancellation & Refund | Verbatim refund policy document preserved verbatim. |
| **`shipping.html`** | Shipping & Delivery | Verbatim shipping policy document preserved verbatim. |

---

## 🎨 Design System & Refinements

- **Color Palette (Matching `WatsBuy_Full_Pitch_Deck-New.pptx`):**
  - **Deep Navy (`--navy`):** `#0A2337` (Primary text, dark sections, footer)
  - **Deep Slate/Teal (`--teal` / `--navy-light`):** `#02585C` / `#11364F` (Gradients, secondary accents)
  - **Emerald Green (`--green` / `--green-bright`):** `#079D4F` / `#16B04B` (Primary brand accent, CTAs, highlight badges, checkmarks)
  - **Soft Mint (`--mint` / `--mint-border`):** `#EEF8F2` / `#CFE8D9` (Pill backgrounds, cards, table highlights)
  - **Slate Gray (`--slate`):** `#5B6B7A` (Body text, subtext, subtle borders)
  - **Border & Line (`--line`):** `#E2E8ED` (Crisp container framing)

- **Enhanced Brand Identity:**
  - Noticeably enlarged, high-resolution WatsBuy logo (`assets/images/watsbuy-logo.png`) rendered at 56px height in the 84px sticky header while strictly preserving its proportions.
  - Polished, professional business tagline beneath the logo: **Your Store on WhatsApp** styled in semi-bold deep teal with a vibrant green live brand indicator dot.
  - Crisp favicon icon: `assets/images/watsbuy-mark.png`.

- **Optimized Vertical Rhythm:**
  - Clean vertical spacing between sections (48px) to minimize dead scrolling space without crowding content.
  - Compact hero margins and tighter card grids for improved readability and engagement.

- **High-Resolution Images:**
  - All images render at original resolution with `object-fit: contain;` without stretching or blurring.

---

## 🔗 Local Demo Architecture & Zero External Redirection

- **Local Booking & Demo Destination:** Every "Book a Demo" button across the entire website routes directly to the local [`demo.html`](file:///c:/Users/User/Desktop/WatsBuy_Website/demo.html) page.
- **Zero External Emergent Links:** No user-facing page or link routes visitors out to Emergent. All demo benefits, walkthrough copy, interactive preview cards, and Meta verification documentation are rendered locally within the site.
- **Simulated In-Chat Experience:** The lower section of `demo.html` (*"Can't wait? Test the AI right now"*) provides an authentic simulated WhatsApp conversation with a live product recommendation card and simulated 2-tap native Flow checkout, keeping visitors entirely within the local experience.

---

## 🛡️ Strict Compliance & Implementation Rules Met

1. **True Multi-Page Website:** Every primary navigation link loads its matching `.html` file. "Why WatsBuy?" menu item links directly to `why-watsbuy.html`.
2. **Navigation Structure:** The `Resources ▾` dropdown contains only **Help Centre & FAQ** and **Get Started**. Links to About, Contact, Privacy, Terms, Refund, and Shipping are organized cleanly in the footer.
3. **Zero Competitor Names:** Excluded all external competitor names (Shopify, WooCommerce, Wix, Magento, etc.) across all pages, comparing conceptually with "Traditional Web-First Platforms".
4. **Zero "White Label" References:** Strictly removed all "white label" or "white-label" terminology across the entire site, including partner and reseller pages.
5. **Growth as Sole "Most Popular" Plan:** Growth (₹9,999/mo) is the single plan highlighted with the `MOST POPULAR` badge and highlighted card styling. Premium is styled as a standard card.
6. **Pricing Buttons:** Growth features "Choose Growth →" and Premium features "Choose Premium →" (neither button contains "Book a Demo"). The Basic card features two buttons in exact order: 1) "Get Started →", 2) "7-Day Free Trial".
7. **Reseller Action:** Reseller page features "Apply as a Partner →" and excludes "Book a Partner Demo".
8. **No Fake Sample Form Values:** All form inputs (demo, contact, reseller) use neutral, professional placeholders (`Full Name`, `Work Email Address`, `WhatsApp Phone Number`, `Company / Business Name`, etc.) rather than fictional person/agency identities.
9. **No Founder Personal Details:** Corporate directories on `demo.html` and `contact.html` display official company desks in India and UAE without founder personal contact info.
10. **Meta Verification FAQs & Platform Pricing:** Verified FAQs in `faq.html` detail Meta Business Portfolio requirements, accepted legal documentation (GST/Trade License), review timelines, and Green Tick criteria. Pricing page links directly to official Meta documentation ([https://whatsappbusiness.com/products/platform-pricing/](https://whatsappbusiness.com/products/platform-pricing/)).
11. **Statutory Placeholders Preserved:** All legal pages (`privacy.html`, `terms.html`, `refund.html`, `shipping.html`, `about.html`) retain 100% of their text, clauses, and statutory placeholders intact.
12. **Responsive Mobile Navigation:** Hamburger menu toggles smoothly, accounts for sticky header offset, and automatically closes upon link selection, outside click, or pressing the Escape key.

---

## 🛠️ Build & Verification Tooling

To regenerate or verify the website at any time:
```bash
# Rebuild all 16 pages and run automated integrity validation
node run_build_and_verify.js
```
The test suite validates:
- Existence and content size of all 16 HTML pages
- Zero external Emergent links across all HTML files
- All "Book a Demo" buttons point locally to `demo.html`
- Header navigation integrity ("Why WatsBuy?" links to `why-watsbuy.html`, Resources dropdown has only FAQ and Get Started)
- Absence of forbidden competitor names and white-label wording
- Removal of abandoned-cart recovery calculator from Home
- Removal of International Business from Solutions
- Two-column Book a Demo layout and simulated WhatsApp AI preview
- Growth as the sole "Most Popular" plan on Pricing with correct buttons and 15% discount calculations
- Reseller page CTA ("Apply as a Partner") and removal of "Book a Partner Demo"
- Absence of fake sample form values and founder personal details
- In-page and cross-page anchor/link resolution across all 16 files

---

## 📌 Reference
<a href="https://chat-to-commerce.preview.emergentagent.com/benefits">https://chat-to-commerce.preview.emergentagent.com/benefits</a>
"# Varossystems" 
