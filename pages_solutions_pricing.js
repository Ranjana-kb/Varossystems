const fs = require('fs');
const { wrapPage } = require('./build_site');

console.log('Building Solutions, Pricing, and Enterprise Pages...');

const DEMO_URL = 'demo.html';

// ==========================================
// 4. SOLUTIONS.HTML (Solutions)
// ==========================================
// Note: "International Business" is removed from Solutions per requirement.
const solutionsBody = `
  <!-- Hero Section -->
  <section class="page-hero">
    <div class="container text-left" style="max-width:900px;margin:0 auto;text-align:center;">
      <div class="eyebrow"><span class="dot"></span> PURPOSE-BUILT COMMERCE SOLUTIONS</div>
      <h1 style="font-size:clamp(32px,4vw,50px);line-height:1.1;letter-spacing:-2px;margin:16px 0 14px;font-weight:850;color:var(--navy);">
        Conversational Commerce <br><em class="text-green" style="font-style:normal;">Tailored to How You Sell.</em>
      </h1>
      <p style="font-size:16px;line-height:1.65;color:var(--slate);max-width:680px;margin:0 auto 24px;">
        Whether you are a fast-growing D2C brand, a high-volume B2B wholesaler, a multi-outlet retailer, or an enterprise scale merchant, WatsBuy adapts to your sales model.
      </p>
      
      <!-- Anchor Navigation Bar (No International Business) -->
      <div class="solution-tabs-bar" style="justify-content:center;flex-wrap:wrap;">
        <a class="solution-tab-btn" href="#retail">Retail &amp; D2C</a>
        <a class="solution-tab-btn" href="#wholesale">Wholesalers &amp; Distributors</a>
        <a class="solution-tab-btn" href="#multi-store">Multi-Store Businesses</a>
        <a class="solution-tab-btn" href="#smb">Growing SMBs</a>
        <a class="solution-tab-btn" href="#enterprise">Enterprise Scale</a>
      </div>
    </div>
  </section>

  <!-- Section 1: Retail & D2C (#retail) -->
  <section class="section" id="retail">
    <div class="container">
      <div style="display:grid;grid-template-columns:1.05fr 0.95fr;gap:36px;align-items:center;">
        <div>
          <span class="section-kicker">Direct to Consumer</span>
          <h2 style="font-size:30px;letter-spacing:-1px;margin:0 0 10px;color:var(--navy);font-weight:850;">
            Retail &amp; D2C Brands.
          </h2>
          <div style="font-size:17px;font-weight:750;color:var(--green);margin-bottom:12px;">
            Turn Product Discovery into Purchases. All on WhatsApp.
          </div>
          <p style="font-size:14.5px;color:var(--slate);line-height:1.65;margin-bottom:18px;">
            Transform the way customers shop for fashion, beauty, electronics, food, and lifestyle products. Connect social media campaigns, product discovery, checkout, and customer support through one WhatsApp number—reducing dependence on traditional website visits.
          </p>
          <ul style="padding-left:18px;margin:0 0 16px;font-size:13.5px;color:var(--slate);line-height:1.7;">
            <li><strong>Interactive Product Showcase:</strong> Display collections, new arrivals, product variants, pricing, and special offers through rich WhatsApp catalogues and interactive product cards.</li>
            <li><strong>Seamless Shopping &amp; Checkout:</strong> Enable customers to browse products, select variants, confirm orders, and complete purchases through integrated WhatsApp shopping workflows.</li>
            <li><strong>Smart Retargeting &amp; Cart Recovery:</strong> Re-engage potential buyers with abandoned-cart reminders, personalized offers, and targeted promotional broadcasts using Meta-approved templates.</li>
            <li><strong>Social Media to WhatsApp Commerce:</strong> Convert Facebook and Instagram ad engagement into direct WhatsApp shopping conversations, connecting customer interest with product discovery and order placement.</li>
          </ul>
          <div style="font-weight:750;color:var(--navy);font-size:13.5px;margin-bottom:8px;">
            One WhatsApp Number. From First Discovery to Repeat Purchase.
          </div>
          <p style="font-size:11.5px;color:var(--slate);line-height:1.5;margin:0;">
            <em>Subject to Meta WhatsApp message template guidelines, business policy approvals, and payment gateway availability.</em>
          </p>
        </div>
        <div style="background:var(--grey-bg);border:1px solid var(--line);border-radius:18px;padding:24px;">
          <div style="font-weight:800;font-size:13.5px;margin-bottom:14px;display:flex;align-items:center;gap:8px;">
            <span>🛍️</span> <span>Conversational D2C Commerce Flow</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:#fff;border:1px solid var(--line);border-radius:12px;padding:12px 14px;">
              <strong style="color:var(--navy);font-size:13px;display:block;">1. Discovery &amp; Social Ads</strong>
              <span style="font-size:12px;color:var(--slate);">Click-to-WhatsApp ads route Instagram/FB shoppers directly into product cards.</span>
            </div>
            <div style="background:#fff;border:1px solid var(--line);border-radius:12px;padding:12px 14px;">
              <strong style="color:var(--navy);font-size:13px;display:block;">2. In-Chat Catalogues</strong>
              <span style="font-size:12px;color:var(--slate);">Shoppers view collections, variants, and real-time inventory without leaving chat.</span>
            </div>
            <div style="background:#fff;border:1px solid var(--line);border-radius:12px;padding:12px 14px;">
              <strong style="color:var(--navy);font-size:13px;display:block;">3. WhatsApp Flows Checkout</strong>
              <span style="font-size:12px;color:var(--slate);">Native 2-tap in-chat cart review, address confirmation, and instant payment settlement.</span>
            </div>
            <div style="background:#fff;border:1px solid var(--line);border-radius:12px;padding:12px 14px;">
              <strong style="color:var(--navy);font-size:13px;display:block;">4. Order Tracking &amp; Retention</strong>
              <span style="font-size:12px;color:var(--slate);">Automated dispatch updates, customer care, and personalized replenishment nudges.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Retail & D2C Actions -->
      <div style="display:flex;justify-content:flex-end;align-items:center;gap:12px;margin-top:28px;flex-wrap:wrap;">
        <a class="btn btn-primary" href="contact.html#enquiry">Get Started</a>
        <a class="btn btn-outline" href="trial.html?interest=Retail" onclick="openTrialModal('Retail &amp; D2C Brands', event)">7 Day Free Trial</a>
      </div>
    </div>
  </section>

  <!-- Section 2: Wholesalers & Distributors (#wholesale) -->
  <section class="section section-soft" id="wholesale">
    <div class="container">
      <div class="section-head" style="margin-bottom:28px;">
        <span class="section-kicker">B2B WHOLESALE COMMERCE</span>
        <h2>Wholesalers &amp; Distributors.</h2>
        <div style="font-size:18px;font-weight:750;color:var(--green);margin:6px 0 10px;">
          Simplify Bulk Ordering. Strengthen Dealer Relationships. All on WhatsApp.
        </div>
        <p style="max-width:760px;margin:0 auto;">
          Transform traditional wholesale ordering into a seamless digital experience. Enable dealers, retailers, distributors, and commercial buyers to browse product catalogues, place bulk orders, access special pricing, and track purchases—all through one WhatsApp number.
        </p>
      </div>

      <!-- B2B Wholesale Workflow -->
      <div style="margin-bottom:32px;">
        <h3 style="font-size:18px;color:var(--navy);margin:0 0 14px;display:flex;align-items:center;gap:8px;">
          <span>📋</span> B2B Wholesale Workflow
        </h3>
        <div class="cards-grid-4">
          <div style="background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px;">
            <div class="flow-num-badge" style="margin:0 0 10px 0;">01</div>
            <h4 style="font-size:14px;margin:0 0 6px;color:var(--navy);">Dealer-Specific Pricing</h4>
            <p style="font-size:12px;color:var(--slate);line-height:1.5;margin:0;">Offer customized product catalogues, wholesale rates, and volume-based pricing for different dealer categories.</p>
          </div>
          <div style="background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px;">
            <div class="flow-num-badge" style="margin:0 0 10px 0;">02</div>
            <h4 style="font-size:14px;margin:0 0 6px;color:var(--navy);">Quick Reordering</h4>
            <p style="font-size:12px;color:var(--slate);line-height:1.5;margin:0;">Allow returning buyers to access previous orders and conveniently reorder frequently purchased products through WhatsApp.</p>
          </div>
          <div style="background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px;">
            <div class="flow-num-badge" style="margin:0 0 10px 0;">03</div>
            <h4 style="font-size:14px;margin:0 0 6px;color:var(--navy);">Bulk Product Selection</h4>
            <p style="font-size:12px;color:var(--slate);line-height:1.5;margin:0;">Simplify multi-product ordering with interactive catalogues, product variants, quantity selection, and streamlined order confirmation.</p>
          </div>
          <div style="background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px;">
            <div class="flow-num-badge" style="margin:0 0 10px 0;">04</div>
            <h4 style="font-size:14px;margin:0 0 6px;color:var(--navy);">Order &amp; Payment Updates</h4>
            <p style="font-size:12px;color:var(--slate);line-height:1.5;margin:0;">Share order confirmations, invoices, payment details, and fulfilment notifications directly through WhatsApp.</p>
          </div>
        </div>
      </div>

      <!-- Key Platform Capabilities -->
      <div>
        <h3 style="font-size:18px;color:var(--navy);margin:0 0 14px;display:flex;align-items:center;gap:8px;">
          <span>⚙️</span> Key Platform Capabilities
        </h3>
        <div class="cards-grid-4">
          <div class="feature-box">
            <div class="box-icon">📦</div>
            <h3>Wholesale Catalogue &amp; Bulk Ordering</h3>
            <p>Showcase products, variants, wholesale pricing, and available quantities through an organized WhatsApp storefront.</p>
          </div>
          <div class="feature-box">
            <div class="box-icon">🏷️</div>
            <h3>Unified Wholesale Pricing</h3>
            <p>Offer dealers, retailers, and bulk buyers a standardized product catalogue with transparent, consistent pricing across all customers.</p>
          </div>
          <div class="feature-box">
            <div class="box-icon">🔔</div>
            <h3>Order Management &amp; Notifications</h3>
            <p>Centralize incoming wholesale orders, track fulfilment, and keep buyers informed through automated WhatsApp updates.</p>
          </div>
          <div class="feature-box">
            <div class="box-icon">📢</div>
            <h3>Broadcasting &amp; Dealer Engagement</h3>
            <p>Announce new stock arrivals, wholesale offers, seasonal promotions, and product updates through targeted Meta-approved WhatsApp broadcasts.</p>
          </div>
        </div>
      </div>

      <div style="text-align:center;margin-top:24px;">
        <div style="font-weight:800;color:var(--navy);font-size:15px;margin-bottom:4px;">
          One WhatsApp Number. Every Dealer. Every Order.
        </div>
        <p style="font-size:13px;color:var(--slate);margin:0;">
          Make wholesale purchasing faster, simpler, and more accessible with WatsBuy.
        </p>
        <p style="font-size:11.5px;color:var(--slate);line-height:1.5;margin:8px 0 0;">
          <em>Subject to Meta broadcast template approvals, ERP integration availability, and commercial credit verification terms.</em>
        </p>
      </div>

      <!-- Wholesalers & Distributors Actions -->
      <div style="display:flex;justify-content:flex-end;align-items:center;gap:12px;margin-top:28px;flex-wrap:wrap;">
        <a class="btn btn-primary" href="contact.html#enquiry">Get Started</a>
        <a class="btn btn-outline" href="trial.html?interest=Wholesale" onclick="openTrialModal('Wholesalers &amp; Distributors', event)">7 Day Free Trial</a>
      </div>
    </div>
  </section>

  <!-- Section 3: Multi-Store Businesses (#multi-store) -->
  <section class="section" id="multi-store">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:center;">
        <div>
          <span class="section-kicker">Franchises &amp; Retail Chains</span>
          <h2 style="font-size:30px;letter-spacing:-1px;margin:0 0 14px;color:var(--navy);font-weight:850;">
            Multi-Store &amp; Retail Chains.
          </h2>
          <p style="font-size:14.5px;color:var(--slate);line-height:1.65;margin-bottom:18px;">
            Operate dozens of retail outlets, regional branches, or franchise stores from a single unified WhatsApp brand presence. Intelligent routing assigns each shopper to their closest physical store.
          </p>
          <ul style="padding-left:18px;margin:0 0 20px;font-size:13.5px;color:var(--slate);line-height:1.7;">
            <li><strong>Location-Based Routing:</strong> Customers share their pin or city to route the conversation to the nearest branch.</li>
            <li><strong>Localized Inventory:</strong> Each branch maintains its own live stock availability and local dispatch schedules.</li>
            <li><strong>Click-and-Collect (BOPIS):</strong> Allow shoppers to order on WhatsApp and collect in-store within 30 minutes.</li>
            <li><strong>Centralized HQ Oversight:</strong> Corporate management monitors sales velocity and SLA response across all locations.</li>
          </ul>
        </div>

        <div style="background:var(--grey-bg);border:1px solid var(--line);border-radius:18px;padding:28px;">
          <div style="font-weight:800;font-size:13.5px;margin-bottom:12px;display:flex;align-items:center;gap:8px;">
            <span>🏬</span> <span>Smart Outlet Allocation</span>
          </div>
          <div style="background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px;margin-bottom:10px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <strong>Branch 01 — Downtown Flagship</strong>
              <span style="color:var(--green);font-size:11px;font-weight:800;background:var(--mint);padding:2px 7px;border-radius:10px;">LIVE</span>
            </div>
            <p style="font-size:12px;color:var(--slate);margin:4px 0 0;">Stock: 1,420 SKUs · Auto-routed orders today</p>
          </div>
          <div style="background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px;margin-bottom:10px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <strong>Branch 02 — Westside Mall</strong>
              <span style="color:var(--green);font-size:11px;font-weight:800;background:var(--mint);padding:2px 7px;border-radius:10px;">LIVE</span>
            </div>
            <p style="font-size:12px;color:var(--slate);margin:4px 0 0;">Stock: 980 SKUs · Auto-routed orders today</p>
          </div>
          <div style="background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <strong>Branch 03 — Suburban Hub</strong>
              <span style="color:var(--green);font-size:11px;font-weight:800;background:var(--mint);padding:2px 7px;border-radius:10px;">LIVE</span>
            </div>
            <p style="font-size:12px;color:var(--slate);margin:4px 0 0;">Stock: 740 SKUs · Auto-routed orders today</p>
          </div>
        </div>
      </div>

      <!-- Multi-Store & Retail Chains Actions -->
      <div style="display:flex;justify-content:flex-end;align-items:center;margin-top:28px;">
        <a class="btn btn-primary" href="enterprise.html#enquiry">Connect</a>
      </div>
    </div>
  </section>

  <!-- Section 4: Growing SMBs (#smb) -->
  <section class="section section-soft" id="smb">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:center;">
        <div style="background:#fff;border:1px solid var(--line);border-radius:18px;padding:28px;">
          <div style="font-weight:800;font-size:13.5px;margin-bottom:12px;display:flex;align-items:center;gap:8px;">
            <span>🚀</span> <span>Turnkey Onboarding in 48 Hours</span>
          </div>
          <p style="font-size:13px;color:var(--slate);line-height:1.6;margin-bottom:14px;">
            Growing businesses don't have months to hire developers, set up complex hosting, or debug plugins. WatsBuy delivers a working digital storefront connected directly to your WhatsApp Business number.
          </p>
          <div style="display:flex;flex-direction:column;gap:8px;font-size:12.5px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="color:var(--green);font-weight:800;">✓</span> No technical or coding experience required
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="color:var(--green);font-weight:800;">✓</span> Upload products via simple Excel or CSV spreadsheet
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="color:var(--green);font-weight:800;">✓</span> Ready-to-use payment integration with UPI and cards
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="color:var(--green);font-weight:800;">✓</span> Free Meta Business API verification assistance
            </div>
          </div>
          <div style="margin-top:16px;border-radius:12px;overflow:hidden;border:1px solid var(--line);">
            <img src="assets/images/merchant-working.jpg" alt="Small business owner managing WhatsApp store orders and catalog updates on a laptop" style="width:100%;max-height:220px;object-fit:cover;display:block;">
          </div>
        </div>

        <div>
          <span class="section-kicker">Fast Launch</span>
          <h2 style="font-size:30px;letter-spacing:-1px;margin:0 0 14px;color:var(--navy);font-weight:850;">
            Growing SMBs.
          </h2>
          <p style="font-size:14.5px;color:var(--slate);line-height:1.65;margin-bottom:18px;">
            Skip the complexity, cost, and high bounce rates of traditional web platforms. Start taking orders and collecting payments in the app where your customers already message you every day.
          </p>
          <ul style="padding-left:18px;margin:0 0 20px;font-size:13.5px;color:var(--slate);line-height:1.7;">
            <li><strong>Zero App Barrier:</strong> Customers never have to install another app or remember another password.</li>
            <li><strong>Automated Instant Replies:</strong> Never leave a customer waiting when they ask about price or availability.</li>
            <li><strong>Low Total Cost of Ownership:</strong> Transparent monthly pricing without surprise plugin fees.</li>
            <li><strong>Rapid Deployment:</strong> Go live quickly with guided onboarding and Meta verification support.</li>
          </ul>
        </div>
      </div>

      <!-- Growing SMBs Actions -->
      <div style="display:flex;justify-content:flex-end;align-items:center;margin-top:28px;">
        <a class="btn btn-primary" href="enterprise.html#enquiry">Connect</a>
      </div>
    </div>
  </section>

  <!-- Section 5: Enterprise Scale (#enterprise) -->
  <section class="section" id="enterprise">
    <div class="container">
      <div class="section-head">
        <span class="section-kicker">High-Throughput Scale</span>
        <h2>Enterprise Scale.</h2>
        <p>For high-volume retail conglomerates, nationwide brands, and institutional distributors requiring dedicated throughput, custom ERP connectors, and 99.95% uptime guarantees.</p>
      </div>

      <div class="cards-grid-3">
        <div class="feature-box">
          <div class="box-icon">⚡</div>
          <h3>High-Throughput Broadcasts</h3>
          <p>Send hundreds of thousands of personalized promotional broadcasts with sub-second delivery and dedicated Meta Cloud API tier limits.</p>
        </div>
        <div class="feature-box">
          <div class="box-icon">🔌</div>
          <h3>Custom ERP Integration</h3>
          <p>Bidirectional live synchronization with SAP, Oracle, Microsoft Dynamics, Tally, Zoho, and custom proprietary enterprise databases.</p>
        </div>
        <div class="feature-box">
          <div class="box-icon">🛡️</div>
          <h3>Dedicated SLA &amp; Support</h3>
          <p>99.95% uptime guarantee, 24/7 incident response desk, dedicated Technical Account Manager (TAM), and quarterly business reviews.</p>
        </div>
      </div>

      <!-- Enterprise Scale Actions -->
      <div style="display:flex;justify-content:flex-end;align-items:center;gap:12px;margin-top:28px;flex-wrap:wrap;">
        <a class="btn btn-outline" href="enterprise.html">Explore Dedicated Enterprise Architecture →</a>
        <a class="btn btn-primary" href="enterprise.html#enquiry">Connect</a>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('solutions.html', wrapPage('Conversational Commerce Solutions — WatsBuy', 'Explore WatsBuy solutions tailored for Retail & D2C, Wholesalers & Distributors, Multi-Store Businesses, Growing SMBs, and Enterprise Scale.', 'solutions', solutionsBody), 'utf8');
console.log('Saved solutions.html');


// ==========================================
// 5. PRICING.HTML (Pricing)
// ==========================================
// Content from references/Global Pricing.jpeg
const pricingBody = `
  <!-- Hero Section -->
  <section class="page-hero">
    <div class="container text-left" style="max-width:900px;margin:0 auto;text-align:center;">
      <div class="eyebrow"><span class="dot"></span> PRICING</div>
      <h1 style="font-size:clamp(32px,4vw,50px);line-height:1.1;letter-spacing:-2px;margin:16px 0 14px;font-weight:850;color:var(--navy);">
        WatsBuy subscription plans
      </h1>
      <p style="font-size:16px;line-height:1.65;color:var(--slate);max-width:680px;margin:0 auto 24px;">
        Every customer you onboard generates recurring monthly revenue.
      </p>

      <!-- Monthly / Annual Tabs with 15% discount -->
      <div class="pricing-toggle-wrap">
        <div class="pricing-toggle" role="tablist" aria-label="Billing frequency toggle">
          <button type="button" class="toggle-btn active" id="btnMonthly" role="tab" aria-selected="true">Monthly</button>
          <button type="button" class="toggle-btn" id="btnYearly" role="tab" aria-selected="false">Yearly <span class="annual-badge">Save 15%</span></button>
        </div>
      </div>
    </div>
  </section>

  <!-- 4 Plan Cards (from references/Global Pricing.jpeg) -->
  <section class="section" style="padding-top:10px;">
    <div class="container">
      <div class="pricing-grid">
        <!-- Basic Plan ($99) -->
        <div class="price-card">
          <div class="plan-name">Basic</div>
          <div class="price-box">
            <span class="price-val" id="priceBasic">$99</span>
            <span class="price-period" id="periodBasic">/month</span>
            <span class="price-annual-note" id="noteBasic" style="display:none;">$1,010 / year (save $178)</span>
          </div>
          <div class="plan-subtitle">Get Started</div>
          
          <ul class="plan-features">
            <li><span class="check">✓</span> <strong>Storage up to 5GB- 100 Products</strong></li>
            <li><span class="check">✓</span> <strong>WhatsApp Flows</strong></li>
            <li><span class="check">✓</span> <strong>Payments &amp; Orders</strong></li>
          </ul>

          <div style="margin-top:auto;display:flex;flex-direction:column;gap:8px;">
            <a class="btn btn-primary btn-block" href="getting-started.html">Get Started →</a>
            <a class="btn btn-outline btn-block" href="trial.html?plan=Basic" onclick="openTrialModal('Basic Plan', event)">7-Day Free Trial</a>
          </div>
        </div>

        <!-- Growth Plan ($179 - MOST POPULAR) -->
        <div class="price-card popular">
          <div class="badge-popular">MOST POPULAR</div>
          <div class="plan-name">Growth</div>
          <div class="price-box">
            <span class="price-val" id="priceGrowth">$179</span>
            <span class="price-period" id="periodGrowth">/month</span>
            <span class="price-annual-note" id="noteGrowth" style="display:none;">$1,826 / year (save $322)</span>
          </div>
          <div class="plan-subtitle">Most Popular</div>
          
          <ul class="plan-features">
            <li><span class="check">✓</span> <strong>Storage up to 10 GB-200 Products</strong></li>
            <li><span class="check">✓</span> <strong>WhatsApp Flows</strong></li>
            <li><span class="check">✓</span> <strong>Payments &amp; Orders</strong></li>
          </ul>

          <div style="margin-top:auto;display:flex;flex-direction:column;gap:8px;">
            <a class="btn btn-primary btn-block" href="getting-started.html">Get Started</a>
            <a class="btn btn-outline btn-block" href="trial.html?plan=Growth" onclick="openTrialModal('Growth Plan', event)" style="background:#E5A93C;color:#000000;border-color:#E5A93C;font-weight:750;">7-Day Free Trial</a>
          </div>
        </div>

        <!-- Premium Plan ($249) -->
        <div class="price-card">
          <div class="plan-name">Premium</div>
          <div class="price-box">
            <span class="price-val" id="pricePremium">$249</span>
            <span class="price-period" id="periodPremium">/month</span>
            <span class="price-annual-note" id="notePremium" style="display:none;">$2,540 / year (save $448)</span>
          </div>
          <div class="plan-subtitle">Full Power</div>
          
          <ul class="plan-features">
            <li><span class="check">✓</span> <strong>Storage up to 20 GB-500 Products</strong></li>
            <li><span class="check">✓</span> <strong>WhatsApp Flows</strong></li>
            <li><span class="check">✓</span> <strong>Payments &amp; Orders</strong></li>
          </ul>

          <div style="margin-top:auto;display:flex;flex-direction:column;gap:8px;">
            <a class="btn btn-outline btn-block" href="getting-started.html">Get Started</a>
            <a class="btn btn-outline btn-block" href="trial.html?plan=Premium" onclick="openTrialModal('Premium Plan', event)">7-Day Free Trial</a>
          </div>
        </div>

        <!-- Enterprise Custom Plan -->
        <div class="price-card" style="background:#FAFBFB;">
          <div class="plan-name">Enterprise</div>
          <div class="price-box">
            <span class="price-val">Custom</span>
          </div>
          <div class="plan-subtitle">Tailored</div>
          
          <ul class="plan-features">
            <li><span class="check">✓</span> <strong>Fully Workflow Customization</strong></li>
            <li><span class="check">✓</span> <strong>WhatsApp Flows</strong></li>
            <li><span class="check">✓</span> <strong>Payments &amp; Orders</strong></li>
          </ul>

          <div style="margin-top:auto;">
            <a class="btn btn-outline btn-block" href="contact.html?interest=Enterprise%20Solutions">Contact Enterprise Sales →</a>
          </div>
        </div>
      </div>

      <!-- Frequently Asked Questions from references -->
      <div style="margin-top:48px;">
        <div class="section-head" style="margin-bottom:28px;">
          <span class="section-kicker">PRICING FAQS</span>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div style="max-width:850px;margin:0 auto;display:flex;flex-direction:column;gap:14px;">
          <div style="background:#fff;border:1px solid var(--line);border-radius:14px;padding:20px;box-shadow:var(--shadow-sm);">
            <strong style="color:var(--navy);font-size:15px;display:block;margin-bottom:8px;">Do you offer annual billing discounts?</strong>
            <p style="color:var(--slate);font-size:13.5px;line-height:1.65;margin:0;">Yes. Save 15% with annual billing compared with paying monthly for 12 months. Annual subscriptions are billed upfront.</p>
          </div>
          <div style="background:#fff;border:1px solid var(--line);border-radius:14px;padding:20px;box-shadow:var(--shadow-sm);">
            <strong style="color:var(--navy);font-size:15px;display:block;margin-bottom:8px;">Do I get both an online storefront and WhatsApp storefront?</strong>
            <p style="color:var(--slate);font-size:13.5px;line-height:1.65;margin:0;">Yes. All standard plans include a dual-platform online and WhatsApp storefront with custom domain integration and centralized product, inventory and order management.</p>
          </div>
          <div style="background:#fff;border:1px solid var(--line);border-radius:14px;padding:20px;box-shadow:var(--shadow-sm);">
            <strong style="color:var(--navy);font-size:15px;display:block;margin-bottom:8px;">Are Meta messaging and payment processing fees included?</strong>
            <p style="color:var(--slate);font-size:13.5px;line-height:1.65;margin:0;">No. Applicable <a href="https://whatsappbusiness.com/products/platform-pricing/" target="_blank" rel="noopener" style="color:var(--green);font-weight:700;text-decoration:underline;">Meta charges</a>, payment gateway fees, taxes and optional add-on charges are separate.</p>
          </div>
          <div style="background:#fff;border:1px solid var(--line);border-radius:14px;padding:20px;box-shadow:var(--shadow-sm);">
            <strong style="color:var(--navy);font-size:15px;display:block;margin-bottom:8px;">Can I upgrade my plan?</strong>
            <p style="color:var(--slate);font-size:13.5px;line-height:1.65;margin:0;">Contact the WatsBuy team to discuss plan upgrades and billing adjustments.</p>
          </div>
        </div>
      </div>

      <!-- Important Billing Inclusions & Meta Fees (with official Meta Link) -->
      <div style="background:var(--grey-bg);border:1px solid var(--line);border-radius:18px;padding:26px;margin-top:36px;font-size:13px;color:var(--slate);line-height:1.65;">
        <h4 style="font-size:15px;color:var(--navy);margin:0 0 12px;display:flex;align-items:center;gap:8px;">
          <span>ℹ️</span> Important billing inclusions &amp; Meta fees
        </h4>
        <ul style="margin:0 0 16px;padding-left:18px;">
          <li style="margin-bottom:8px;"><strong>Platform SaaS Inclusions:</strong> All subscription plans include the WhatsApp Store, official WhatsApp Cloud API connectivity, WhatsApp Flows checkout, catalogue, cart and order management, standard payment functionality, bulk broadcasting, Meta-approved messaging workflows, customer management, and analytics.</li>
          <li style="margin-bottom:8px;"><strong>Premium Add-ons &amp; Custom Integrations:</strong> Custom ERP integrations, custom workflows, additional message templates, payment gateway integrations, third-party API integrations, and other business-specific customizations are available at additional cost, subject to technical feasibility and applicable provider approvals.</li>
          <li style="margin-bottom:8px;"><strong>Official Meta Conversation Fees:</strong> WhatsApp Business messaging fees are determined directly by Meta based on conversation categories (Marketing, Utility, Authentication, and Service) and the recipient country code. Because Meta messaging rates vary across global regions and may be updated periodically by Meta, WatsBuy does not mark up or invent messaging rates. Meta conversation fees are billed directly through your Meta Business Manager payment method or passed through strictly at actual Meta rates.</li>
          <li><strong>No Hidden Lock-In:</strong> Monthly subscriptions can be upgraded or adjusted at any billing cycle. Annual billing provides an upfront 15% discount across all standard tiers.</li>
        </ul>
        <div style="padding-top:12px;border-top:1px solid var(--line);">
          <a href="https://whatsappbusiness.com/products/platform-pricing/" target="_blank" rel="noopener" style="color:var(--green);font-weight:750;display:inline-flex;align-items:center;gap:6px;">
            <span>🌐</span> View Official Meta WhatsApp Business Platform Pricing Documentation ↗
          </a>
        </div>
      </div>
    </div>
  </section>
`;

const pricingScripts = `
  <script>
    // Monthly / Annual (Save 15%) billing toggle script
    const btnMonthly = document.getElementById('btnMonthly');
    const btnYearly = document.getElementById('btnYearly');
    const priceBasic = document.getElementById('priceBasic');
    const priceGrowth = document.getElementById('priceGrowth');
    const pricePremium = document.getElementById('pricePremium');
    const periodBasic = document.getElementById('periodBasic');
    const periodGrowth = document.getElementById('periodGrowth');
    const periodPremium = document.getElementById('periodPremium');
    const noteBasic = document.getElementById('noteBasic');
    const noteGrowth = document.getElementById('noteGrowth');
    const notePremium = document.getElementById('notePremium');

    function setMonthly() {
      btnMonthly.classList.add('active');
      btnMonthly.setAttribute('aria-selected', 'true');
      btnYearly.classList.remove('active');
      btnYearly.setAttribute('aria-selected', 'false');

      priceBasic.textContent = '$99';
      periodBasic.textContent = '/month';
      noteBasic.style.display = 'none';

      priceGrowth.textContent = '$179';
      periodGrowth.textContent = '/month';
      noteGrowth.style.display = 'none';

      pricePremium.textContent = '$249';
      periodPremium.textContent = '/month';
      notePremium.style.display = 'none';
    }

    function setYearly() {
      btnYearly.classList.add('active');
      btnYearly.setAttribute('aria-selected', 'true');
      btnMonthly.classList.remove('active');
      btnMonthly.setAttribute('aria-selected', 'false');

      // 15% discount calculation: monthly * 12 * 0.85
      // Basic: 99 * 12 * 0.85 = $1,010 / yr -> $84 / mo
      priceBasic.textContent = '$84';
      periodBasic.textContent = '/mo billed annually';
      noteBasic.textContent = '$1,010 / year (save $178)';
      noteBasic.style.display = 'block';

      // Growth: 179 * 12 * 0.85 = $1,826 / yr -> $152 / mo
      priceGrowth.textContent = '$152';
      periodGrowth.textContent = '/mo billed annually';
      noteGrowth.textContent = '$1,826 / year (save $322)';
      noteGrowth.style.display = 'block';

      // Premium: 249 * 12 * 0.85 = $2,540 / yr -> $212 / mo
      pricePremium.textContent = '$212';
      periodPremium.textContent = '/mo billed annually';
      notePremium.textContent = '$2,540 / year (save $448)';
      notePremium.style.display = 'block';
    }

    if (btnMonthly && btnYearly) {
      btnMonthly.addEventListener('click', setMonthly);
      btnYearly.addEventListener('click', setYearly);
    }
  </script>
`;

fs.writeFileSync('pricing.html', wrapPage('Transparent SaaS Pricing Plans — WatsBuy', 'Explore WatsBuy subscription plans: Basic $99/mo, Growth $179/mo, Premium $249/mo, and Enterprise Custom. Save 15% on annual billing.', 'pricing', pricingBody, '', pricingScripts), 'utf8');
console.log('Saved pricing.html');


// ==========================================
// 6. ENTERPRISE.HTML (Enterprise)
// ==========================================
// Content from references/watsbuy-enterprise.html
const enterpriseBody = `
  <!-- Hero Section -->
  <section class="page-hero">
    <div class="container text-left" style="max-width:900px;margin:0 auto;text-align:center;">
      <div class="eyebrow"><span class="dot"></span> WATSBUY ENTERPRISE SOLUTIONS</div>
      <h1 style="font-size:clamp(32px,4vw,50px);line-height:1.1;letter-spacing:-2px;margin:16px 0 14px;font-weight:850;color:var(--navy);">
        Enterprise-Grade Commerce. <br><em class="text-green" style="font-style:normal;">Built for Scale.</em>
      </h1>
      <p style="font-size:18px;font-weight:750;color:var(--green);margin:0 0 14px;">
        Unlimited Possibilities. Customized Solutions. Intelligent Automation.
      </p>
      <p style="font-size:16px;line-height:1.65;color:var(--slate);max-width:760px;margin:0 auto 24px;">
        Transform enterprise commerce with high-volume engagement, intelligent workflow automation, fully branded customer journeys, and integrations tailored to your business.
      </p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:12px;">
        <a class="btn btn-primary" href="#enquiry">Talk to Enterprise Team →</a>
        <a class="btn btn-outline" href="#capabilities">Explore Capabilities ↓</a>
      </div>
      <div style="font-size:12px;color:var(--slate);">
        Enterprise solutions are scoped and priced based on your requirements.
      </div>
    </div>
  </section>

  <!-- Complete Enterprise Capabilities -->
  <section class="section" id="capabilities">
    <div class="container">
      <div class="section-head">
        <span class="section-kicker">Complete Enterprise Capabilities</span>
        <h2>One Platform. <em class="text-green" style="font-style:normal;">Every Commerce Workflow.</em></h2>
        <p>Build a connected customer experience across marketing, shopping, fulfillment, support and analytics.</p>
      </div>

      <div class="cards-grid-3">
        <div class="feature-box">
          <div class="box-icon">⚡</div>
          <h3>High-Throughput Broadcasts</h3>
          <p style="margin-bottom:12px;">Reach large audiences through personalized WhatsApp campaigns and measurable engagement.</p>
          <ul style="margin:0;padding-left:18px;font-size:13px;color:var(--slate);line-height:1.65;">
            <li>Bulk and targeted promotional broadcasts</li>
            <li>Customer segmentation and retargeting</li>
            <li>Meta-approved templates and workflows</li>
            <li>Campaign engagement analytics</li>
            <li>Throughput subject to Meta limits and eligibility</li>
          </ul>
        </div>

        <div class="feature-box">
          <div class="box-icon">🔄</div>
          <h3>End-to-End Business Automation</h3>
          <p style="margin-bottom:12px;">Reduce repetitive tasks and connect every stage of the customer journey.</p>
          <ul style="margin:0;padding-left:18px;font-size:13px;color:var(--slate);line-height:1.65;">
            <li>Automated enquiry-to-order journeys</li>
            <li>Order, payment and delivery notifications</li>
            <li>Abandoned-cart follow-up workflows</li>
            <li>Support and complaint automation</li>
            <li>Event-triggered messages and business rules</li>
            <li>Escalation and human handoff</li>
          </ul>
        </div>

        <div class="feature-box">
          <div class="box-icon">🎨</div>
          <h3>Customized Design &amp; Custom Branding</h3>
          <p style="margin-bottom:12px;">Tailor the shopping experience and operational tools to your brand.</p>
          <ul style="margin:0;padding-left:18px;font-size:13px;color:var(--slate);line-height:1.65;">
            <li>Custom-branded storefront experiences</li>
            <li>Enterprise-specific UI/UX and dashboards</li>
            <li>Custom forms and customer journeys</li>
            <li>Multi-brand and multi-location setups</li>
            <li>Role-based access and reporting</li>
            <li>Custom branding options by agreement</li>
          </ul>
        </div>

        <div class="feature-box">
          <div class="box-icon">🔌</div>
          <h3>Custom ERP &amp; Third-Party Integration</h3>
          <p style="margin-bottom:12px;">Synchronize enterprise data and workflows through scoped integrations.</p>
          <ul style="margin:0;padding-left:18px;font-size:13px;color:var(--slate);line-height:1.65;">
            <li>SAP, Oracle and Microsoft Dynamics</li>
            <li>Tally, Zoho and proprietary systems</li>
            <li>Product, inventory and order synchronization</li>
            <li>API and webhook connectivity</li>
            <li>Payment gateway, logistics and CRM links</li>
            <li>Custom middleware where required</li>
          </ul>
        </div>

        <div class="feature-box">
          <div class="box-icon">📊</div>
          <h3>Advanced Analytics &amp; Intelligence</h3>
          <p style="margin-bottom:12px;">Monitor sales, customer engagement and operational performance.</p>
          <ul style="margin:0;padding-left:18px;font-size:13px;color:var(--slate);line-height:1.65;">
            <li>Sales and order dashboards</li>
            <li>Campaign conversion reporting</li>
            <li>Customer retention and behavior insights</li>
            <li>Custom KPIs and management reports</li>
            <li>Multi-location performance monitoring</li>
          </ul>
        </div>

        <div class="feature-box">
          <div class="box-icon">🛡️</div>
          <h3>Enterprise Security, SLA &amp; Support</h3>
          <p style="margin-bottom:12px;">Design a support model suited to business-critical operations with agreed service commitments.</p>
          <ul style="margin:0;padding-left:18px;font-size:13px;color:var(--slate);line-height:1.65;">
            <li>Custom SLA and escalation matrix</li>
            <li>Priority incident response options</li>
            <li>Dedicated technical account management options</li>
            <li>Role-based permissions and audit logging</li>
            <li>Data protection and configurable security controls</li>
            <li>Quarterly performance and service reviews</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Approach Banner -->
  <section class="section section-soft" id="approach">
    <div class="container">
      <div style="background:var(--navy);color:#fff;border-radius:22px;padding:48px 36px;text-align:center;box-shadow:var(--shadow-md);">
        <h2 style="font-size:clamp(26px,3.5vw,38px);color:#fff;letter-spacing:-1.2px;margin:0 0 14px;">
          Your Business. Your Workflows. <br><span class="text-green">One Unified Platform.</span>
        </h2>
        <p style="color:#C6D7DE;max-width:740px;margin:0 auto 24px;line-height:1.75;font-size:15.5px;">
          From customer engagement to custom enterprise integrations, WatsBuy helps bring sales, marketing, automation and operations together through WhatsApp.
        </p>
        <a class="btn btn-primary" href="#enquiry" style="padding:13px 28px;">Discuss Your Requirements →</a>
      </div>
    </div>
  </section>

  <!-- Integration Visual Architecture -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="section-kicker">Connected Ecosystem</span>
        <h2>Enterprise Integrations at Scale.</h2>
        <p>WatsBuy acts as the intelligent conversational layer connecting your legacy systems directly to the customer on WhatsApp.</p>
      </div>

      <div style="background:#fff;border:1px solid var(--line);border-radius:20px;padding:32px;box-shadow:var(--shadow-sm);max-width:960px;margin:0 auto;">
        <div style="display:grid;grid-template-columns:1fr auto 1.2fr auto 1fr;gap:14px;align-items:center;text-align:center;">
          <div style="background:var(--grey-bg);border:1px solid var(--line);border-radius:12px;padding:16px;">
            <div style="font-size:22px;margin-bottom:6px;">🏬</div>
            <strong style="display:block;font-size:13px;color:var(--navy);">Enterprise ERP / WMS</strong>
            <small style="color:var(--slate);font-size:10.5px;">SAP · Oracle · Tally · Zoho</small>
          </div>

          <div style="font-size:18px;color:var(--green);font-weight:800;">⇄</div>

          <div style="background:var(--navy);color:#fff;border-radius:14px;padding:20px;">
            <div style="font-size:22px;margin-bottom:6px;">⚡</div>
            <strong style="display:block;font-size:15px;color:#fff;">WatsBuy Enterprise Engine</strong>
            <small style="color:var(--mint-accent);font-size:11.5px;">Business Logic · Order Routing · Flows</small>
          </div>

          <div style="font-size:18px;color:var(--green);font-weight:800;">⇄</div>

          <div style="background:var(--grey-bg);border:1px solid var(--line);border-radius:12px;padding:16px;">
            <div style="font-size:22px;margin-bottom:6px;">📱</div>
            <strong style="display:block;font-size:13px;color:var(--navy);">WhatsApp Shopper</strong>
            <small style="color:var(--slate);font-size:10.5px;">2-Tap Flows · UPI · Support</small>
          </div>
        </div>

        <div style="border-top:1px solid var(--line);margin-top:24px;padding-top:20px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px;text-align:left;font-size:12.5px;color:var(--slate);">
          <div>
            <strong style="color:var(--navy);display:block;margin-bottom:4px;">1. Real-Time Stock Feeds</strong>
            Inventory balances synchronize instantly from your ERP so shoppers never see out-of-stock items.
          </div>
          <div>
            <strong style="color:var(--navy);display:block;margin-bottom:4px;">2. Automated Order Booking</strong>
            Confirmed WhatsApp orders are automatically posted into your ERP sales ledger without manual re-keying.
          </div>
          <div>
            <strong style="color:var(--navy);display:block;margin-bottom:4px;">3. Instant Dispatch Alerts</strong>
            Courier tracking updates and delivery confirmations trigger automated WhatsApp updates to the buyer.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Enterprise Lead Form Section (#enquiry) -->
  <section class="section section-soft" id="enquiry">
    <div class="container">
      <div style="display:grid;grid-template-columns:0.95fr 1.05fr;gap:40px;align-items:start;">
        <div>
          <div class="eyebrow" style="margin-bottom:10px;"><span class="dot"></span> LET'S BUILD YOUR SOLUTION</div>
          <h2 style="font-size:clamp(28px,3.2vw,38px);color:var(--navy);letter-spacing:-1.2px;margin:0 0 16px;">
            Talk to Our <em class="text-green" style="font-style:normal;">Enterprise Team.</em>
          </h2>
          <p style="font-size:15px;color:var(--slate);line-height:1.7;margin-bottom:16px;">
            Tell us about your business, existing systems and automation goals. We will review the requirements and discuss a suitable solution architecture, implementation scope and commercial proposal.
          </p>
          <div style="background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px;margin-bottom:20px;">
            <strong style="font-size:13.5px;color:var(--navy);display:block;margin-bottom:6px;">Custom solutions may include:</strong>
            <p style="font-size:13px;color:var(--slate);line-height:1.6;margin:0;">
              Bespoke shopping journeys, workflow automation, ERP integrations, enterprise dashboards and tailored support.
            </p>
          </div>
          <p style="font-size:12px;color:var(--slate);line-height:1.55;margin:0;">
            <em>Availability, integration scope, performance and service levels are confirmed through technical assessment and written agreement. WhatsApp messaging remains subject to Meta policies and platform availability.</em>
          </p>
        </div>

        <div class="form-card" style="box-shadow:var(--shadow-md);">
          <h3 style="font-size:20px;color:var(--navy);font-weight:800;margin:0 0 16px;">Enterprise Consultation Request</h3>
          <form id="enterpriseLeadForm" onsubmit="handleEnterpriseSubmit(event)">
            <div class="form-grid">
              <div class="field">
                <label for="enterpriseName">Full Name *</label>
                <input id="enterpriseName" type="text" required placeholder="Your name">
              </div>
              <div class="field">
                <label for="enterpriseCompany">Company Name *</label>
                <input id="enterpriseCompany" type="text" required placeholder="Company name">
              </div>
              <div class="field">
                <label for="enterpriseEmail">Business Email *</label>
                <input id="enterpriseEmail" type="email" required placeholder="you@company.com">
              </div>
              <div class="field">
                <label for="enterprisePhone">Phone / WhatsApp *</label>
                <input id="enterprisePhone" type="tel" required placeholder="+91 ...">
              </div>
              <div class="field">
                <label for="enterpriseCountry">Country</label>
                <input id="enterpriseCountry" type="text" placeholder="Country">
              </div>
              <div class="field">
                <label for="enterpriseVolume">Estimated Monthly Message Volume</label>
                <select id="enterpriseVolume">
                  <option value="Not sure yet">Not sure yet</option>
                  <option value="Under 10,000">Under 10,000</option>
                  <option value="10,000–100,000">10,000–100,000</option>
                  <option value="100,000–1 million">100,000–1 million</option>
                  <option value="Above 1 million">Above 1 million</option>
                </select>
              </div>
              <div class="field full">
                <label for="enterpriseRequirements">Primary Requirements *</label>
                <select id="enterpriseRequirements" required>
                  <option value="">Select your main requirement</option>
                  <option value="Full Business Automation">Full Business Automation</option>
                  <option value="Custom ERP / CRM Integration">Custom ERP / CRM Integration</option>
                  <option value="Custom Branding &amp; Storefront Design">Custom Branding &amp; Storefront Design</option>
                  <option value="High-Volume Broadcasts">High-Volume Broadcasts</option>
                  <option value="Complete Enterprise Solution">Complete Enterprise Solution</option>
                </select>
              </div>
              <div class="field full">
                <label for="enterpriseDetails">Tell Us About Your Project</label>
                <textarea id="enterpriseDetails" rows="3" placeholder="Existing platforms, workflows, desired integrations, timelines..."></textarea>
              </div>
            </div>

            <div style="margin-top:20px;">
              <button type="submit" class="btn btn-primary btn-block" style="padding:13px 24px;font-size:14px;font-weight:750;">
                Submit
              </button>
            </div>

            <div class="form-status" id="enterpriseStatus">
              ✓ <strong>Enterprise enquiry submitted!</strong> Our enterprise solutions team will review your requirements and reach out to discuss architecture, timeline, and commercial proposal.
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
`;

const enterpriseScripts = `
  <script>
    function handleEnterpriseSubmit(e) {
      e.preventDefault();
      const status = document.getElementById('enterpriseStatus');
      if (status) {
        status.style.display = 'block';
        status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      if (typeof showConfirmationModal === 'function') {
        showConfirmationModal(
          'Enterprise Enquiry Submitted!',
          'Thank you for contacting WatsBuy Enterprise Solutions. Our enterprise architecture team has received your details and will connect with you to review custom integrations, throughput requirements, and commercial SLA terms.',
          'ENQUIRY RECEIVED'
        );
      }
    }
  </script>
`;

fs.writeFileSync('enterprise.html', wrapPage('Enterprise Solutions — WatsBuy', 'Enterprise-grade conversational commerce solutions: high-throughput broadcasts, business automation, custom ERP integrations, and tailored branded experiences.', 'enterprise', enterpriseBody, '', enterpriseScripts), 'utf8');
console.log('Saved enterprise.html');
