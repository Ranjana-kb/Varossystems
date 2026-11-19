const fs = require('fs');
const { wrapPage, faqs } = require('./build_site');

console.log('Building Resources Pages (reseller.html, faq.html, getting-started.html, contact.html, demo.html)...');

const DEMO_URL = 'demo.html';

// ==========================================
// 7. RESELLER.HTML (Become a Reseller)
// ==========================================
const resellerBody = `
  <!-- Hero Section -->
  <section class="page-hero">
    <div class="container text-left" style="max-width:900px;margin:0 auto;text-align:center;">
      <div class="eyebrow"><span class="dot"></span> WHY BECOME A WATSBUY RESELLER?</div>
      <h1 style="font-size:clamp(32px,4vw,50px);line-height:1.1;letter-spacing:-2px;margin:16px 0 14px;font-weight:850;color:var(--navy);">
        Grow Your Business with <em class="text-green" style="font-style:normal;">Recurring SaaS Revenue.</em>
      </h1>
      <div style="font-size:18px;font-weight:750;color:var(--green);margin-bottom:14px;">
        Partner with WatsBuy. Expand Your Portfolio. Build Long-Term Revenue.
      </div>
      <p style="font-size:16px;line-height:1.65;color:var(--slate);max-width:740px;margin:0 auto 20px;">
        Join the next generation of conversational commerce as an authorized WatsBuy reseller. Offer businesses a powerful WhatsApp-based e-commerce platform without investing in software development, infrastructure, or ongoing product maintenance. Earn attractive commissions, generate recurring subscription revenue, and grow your customer portfolio with a ready-to-deploy SaaS solution backed by dedicated technical and onboarding support.
      </p>
      <div style="font-size:14px;font-weight:750;color:var(--navy);margin-bottom:24px;">
        One Partnership. Multiple Revenue Opportunities. Unlimited Growth Potential.
      </div>
      <div style="display:flex;justify-content:center;">
        <a class="btn btn-primary" href="#partnerForm">Apply as a Partner →</a>
      </div>
    </div>
  </section>

  <!-- Partner Value Proposition: 6 Core Benefits -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="section-kicker">PARTNER BENEFITS &amp; REVENUE OPPORTUNITIES</span>
        <h2>6 Reasons to Partner with WatsBuy.</h2>
        <p>Offer merchants an industry-leading conversational platform while building a sticky, predictable recurring income stream.</p>
      </div>

      <div class="cards-grid-3">
        <div class="feature-box">
          <div class="box-icon">💰</div>
          <h3>1. Recurring Commission Revenue</h3>
          <p>Earn recurring revenue from every successful merchant onboarding. Build a sustainable, long-term income stream as your customer portfolio grows, with ongoing commissions on active subscriptions.</p>
        </div>
        <div class="feature-box">
          <div class="box-icon">⚡</div>
          <h3>2. Ready-to-Deploy SaaS Platform</h3>
          <p>Offer a complete WhatsApp-based e-commerce solution without investing in software development or infrastructure. WatsBuy handles platform deployment, technical implementation, and merchant onboarding, allowing you to focus on customer acquisition and business growth.</p>
        </div>
        <div class="feature-box">
          <div class="box-icon">🛠️</div>
          <h3>3. Dedicated Reseller Demo Account</h3>
          <p>Access a fully functional WatsBuy Premium demo account throughout your active reseller agreement. Showcase WhatsApp storefronts, product catalogues, interactive shopping workflows, checkout, and order management to prospective merchants.</p>
        </div>
        <div class="feature-box">
          <div class="box-icon">📈</div>
          <h3>4. Enterprise Project Revenue</h3>
          <p>Unlock additional revenue through customized enterprise projects, advanced integrations, and business-specific solutions. WatsBuy provides technical expertise and project quotations, while resellers can earn additional margins on successfully executed enterprise projects.</p>
        </div>
        <div class="feature-box">
          <div class="box-icon">🎓</div>
          <h3>5. Sales Enablement &amp; Onboarding</h3>
          <p>Receive product demonstrations, sales presentations, marketing materials, platform training, and onboarding guidance. Our team supports you throughout the merchant acquisition and implementation process, helping you confidently introduce WatsBuy to new businesses.</p>
        </div>
        <div class="feature-box">
          <div class="box-icon">🤝</div>
          <h3>6. Dedicated Partner Support</h3>
          <p>Benefit from direct coordination with the WatsBuy technical team for merchant onboarding, WhatsApp Business API integration, Meta approval processes, troubleshooting, and platform-related assistance.</p>
        </div>
      </div>

      <div style="background:var(--mint);border:1px solid var(--mint-border);border-radius:14px;padding:22px;margin-top:28px;text-align:center;">
        <strong style="color:var(--navy);font-size:15px;display:block;margin-bottom:4px;">Your Customers. Our Technology. Shared Growth.</strong>
        <p style="font-size:13.5px;color:var(--slate);margin:0;max-width:700px;margin:0 auto;">
          Focus on acquiring merchants and building lasting customer relationships while WatsBuy provides the technology, platform infrastructure, and implementation support.
        </p>
      </div>
    </div>
  </section>

  <!-- Partner Application Form (No Interactive Demonstration Notice, No primary market required, includes Address & Location) -->
  <section class="section section-soft" id="partnerForm">
    <div class="container" style="max-width:800px;">
      <div class="section-head">
        <span class="section-kicker">BECOME A WATSBUY RESELLER</span>
        <h2>Become a WatsBuy Reseller.</h2>
        <p>Interested in partnering with WatsBuy? Submit your enquiry, and our partnership team will contact you to discuss reseller opportunities, recurring revenue benefits, and the onboarding process.</p>
      </div>

      <div class="form-card">
        <form id="resellerAppForm" onsubmit="handleResellerSubmit(event)">
          <div class="form-grid">
            <div class="field">
              <label for="partnerName">Full Name *</label>
              <input id="partnerName" type="text" required placeholder="Full Name">
            </div>
            <div class="field">
              <label for="agencyName">Agency / Company Name *</label>
              <input id="agencyName" type="text" required placeholder="Agency / Company Name">
            </div>
            <div class="field">
              <label for="partnerEmail">Business Email Address *</label>
              <input id="partnerEmail" type="email" required placeholder="Work Email Address">
            </div>
            <div class="field">
              <label for="partnerPhone">WhatsApp Phone Number *</label>
              <input id="partnerPhone" type="tel" required placeholder="WhatsApp Phone Number">
            </div>
            <div class="field full">
              <label for="partnerAddress">Business Address &amp; Location *</label>
              <input id="partnerAddress" name="partnerAddress" type="text" required placeholder="City, State / Region, Country">
            </div>
            <div class="field full">
              <label for="partnerMessage">Tell Us About Your Client Base &amp; Goals</label>
              <textarea id="partnerMessage" rows="4" placeholder="Describe your current client portfolio and partnership objectives..."></textarea>
            </div>
          </div>

          <div style="margin-top:20px;">
            <button type="submit" class="btn btn-primary" style="padding:12px 24px;font-size:13.5px;">
              Submit Partner Application →
            </button>
          </div>

          <div class="form-status" id="resellerStatus">
            ✓ <strong>Application received!</strong> Thank you for your interest in the WatsBuy Reseller Program. Our partnership team will contact you to discuss reseller opportunities, recurring revenue benefits, and the onboarding process.
          </div>
        </form>
      </div>
    </div>
  </section>
`;

const resellerScripts = `
  <script>
    function handleResellerSubmit(e) {
      e.preventDefault();
      const status = document.getElementById('resellerStatus');
      if (status) {
        status.style.display = 'block';
        status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      if (typeof showConfirmationModal === 'function') {
        showConfirmationModal(
          'Partner Application Received!',
          'Thank you for your interest in the WatsBuy Reseller Program. Our agency partnerships team has received your details and will contact you within 24 hours to discuss recurring revenue share and onboarding.',
          'APPLICATION RECEIVED'
        );
      }
    }
  </script>
`;

fs.writeFileSync('reseller.html', wrapPage('Become a Reseller Partner — WatsBuy', 'Join the WatsBuy Partner Enablement Program for digital agencies and e-commerce consultants. Earn recurring SaaS revenue deploying WhatsApp commerce.', 'reseller', resellerBody, '', resellerScripts), 'utf8');
console.log('Saved reseller.html');


// ==========================================
// 8. FAQ.HTML (Help Centre & FAQ)
// ==========================================
// Requirements:
// - Use Emergent reference URL (https://chat-to-commerce.preview.emergentagent.com/benefits) as the Help Centre & FAQ reference
// - Add accurate Meta verification FAQs using official Meta information
// - Destination for all "Book a Demo" buttons points to DEMO_URL
const categoriesSet = new Set(faqs.map(f => f.category));
const categories = ['All', ...Array.from(categoriesSet)];

let faqCardsHtml = '';
faqs.forEach((faq, index) => {
  faqCardsHtml += `
    <div class="faq-card" data-category="${faq.category}" data-search="${(faq.question + ' ' + faq.answer).toLowerCase().replace(/"/g, '&quot;')}">
      <button type="button" class="faq-question-btn" aria-expanded="false" onclick="toggleFaq(this)">
        <span>${faq.question}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer-body">
        <p>${faq.answer}</p>
        <div style="font-size:11px;color:var(--slate);margin-top:8px;text-transform:uppercase;letter-spacing:0.8px;">Category: ${faq.category}</div>
      </div>
    </div>
  `;
});

const faqBody = `
  <!-- Hero Section -->
  <section class="page-hero" id="help-centre">
    <div class="container text-left" style="max-width:900px;margin:0 auto;text-align:center;">
      <div class="eyebrow"><span class="dot"></span> KNOWLEDGE BASE &amp; HELP CENTRE</div>
      <h1 style="font-size:clamp(32px,4vw,50px);line-height:1.1;letter-spacing:-2px;margin:16px 0 14px;font-weight:850;color:var(--navy);">
        Frequently Asked Questions <br><em class="text-green" style="font-style:normal;">&amp; Help Centre.</em>
      </h1>
      <p style="font-size:16px;line-height:1.65;color:var(--slate);max-width:680px;margin:0 auto 24px;">
        Browse our verified knowledge base covering Meta Business Verification, official Cloud API setup, catalogue management, in-chat payments, WhatsApp Flows, and compliance.
      </p>

      <!-- Instant Search Input -->
      <div class="faq-search-wrapper">
        <input type="text" id="faqSearchInput" class="faq-search-input" aria-label="Search FAQs and Knowledge Base" placeholder="Search any question or keyword (e.g. 'Meta Verification', 'Green Tick', 'UPI', 'Cloud API')...">
      </div>

      <!-- Category Filter Pills -->
      <div class="faq-categories">
        ${categories.map((c, i) => `<button type="button" class="faq-cat-pill ${i === 0 ? 'active' : ''}" onclick="filterCategory('${c}', this)">${c}</button>`).join('')}
      </div>
    </div>
  </section>

  <!-- FAQ Accordion List -->
  <section class="section" id="faqs">
    <div class="container" style="max-width:860px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;font-size:12.5px;color:var(--slate);">
        <span id="faqCountDisplay">Showing all ${faqs.length} questions</span>
        <span>Click question to expand answer</span>
      </div>

      <div id="faqListContainer">
        ${faqCardsHtml}
      </div>

      <div id="noFaqResults" style="display:none;text-align:center;padding:40px 20px;background:var(--grey-bg);border:1px solid var(--line);border-radius:14px;">
        <div style="font-size:26px;margin-bottom:10px;">🔍</div>
        <h3 style="font-size:17px;margin:0 0 6px;color:var(--navy);">No matching questions found</h3>
        <p style="font-size:13.5px;color:var(--slate);margin:0 0 16px;">Try searching with different keywords or browse by category.</p>
        <button type="button" class="btn btn-outline btn-sm" onclick="resetFaqSearch()">Reset Search</button>
      </div>
    </div>
  </section>
`;

const faqScripts = `
  <script>
    let currentCategory = 'All';
    let searchQuery = '';

    function toggleFaq(btn) {
      const card = btn.closest('.faq-card');
      const isOpen = card.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    function filterFaqs() {
      const cards = document.querySelectorAll('.faq-card');
      let visibleCount = 0;

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const text = card.getAttribute('data-search');

        const matchesCat = (currentCategory === 'All' || cat === currentCategory);
        const matchesSearch = (!searchQuery || text.includes(searchQuery));

        if (matchesCat && matchesSearch) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      const countDisplay = document.getElementById('faqCountDisplay');
      if (countDisplay) {
        countDisplay.textContent = 'Showing ' + visibleCount + ' question' + (visibleCount === 1 ? '' : 's');
      }

      const noRes = document.getElementById('noFaqResults');
      if (noRes) {
        noRes.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }

    function filterCategory(cat, btn) {
      currentCategory = cat;
      document.querySelectorAll('.faq-cat-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterFaqs();
    }

    const searchInput = document.getElementById('faqSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterFaqs();
      });
    }

    function resetFaqSearch() {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      currentCategory = 'All';
      document.querySelectorAll('.faq-cat-pill').forEach((b, i) => {
        if (i === 0) b.classList.add('active');
        else b.classList.remove('active');
      });
      filterFaqs();
    }
  </script>
`;

fs.writeFileSync('faq.html', wrapPage('Help Centre & FAQ — WatsBuy', 'Verified knowledge base with accurate Meta Business Verification FAQs, WhatsApp Business API setup, payments, and compliance information.', 'faq', faqBody, '', faqScripts), 'utf8');
console.log('Saved faq.html');


// ==========================================
// 9. GETTING-STARTED.HTML (Get Started)
// ==========================================
const gettingStartedBody = `
  <!-- Hero Section -->
  <section class="page-hero">
    <div class="container text-left" style="max-width:900px;margin:0 auto;text-align:center;">
      <div class="eyebrow"><span class="dot"></span> ONBOARDING ROADMAP</div>
      <h1 style="font-size:clamp(32px,4vw,50px);line-height:1.1;letter-spacing:-2px;margin:16px 0 14px;font-weight:850;color:var(--navy);">
        Your 5-Step Journey to <br><em class="text-green" style="font-style:normal;">Launching Your WhatsApp Store with WatsBuy.</em>
      </h1>
      <p style="font-size:16px;line-height:1.65;color:var(--slate);max-width:720px;margin:0 auto 24px;">
        From Meta verification to your first customer order, WatsBuy simplifies the entire onboarding process with structured implementation and technical support.
      </p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <a class="btn btn-primary" href="faq.html">Browse Help Centre FAQs →</a>
        <a class="btn btn-outline" href="pricing.html">View Pricing Plans</a>
      </div>
    </div>
  </section>

  <!-- 5 Actionable Steps -->
  <section class="section">
    <div class="container">
      <div style="display:flex;flex-direction:column;gap:24px;max-width:880px;margin:0 auto;">
        <!-- Step 1 -->
        <div class="feature-box">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
            <div class="flow-num-badge" style="margin:0;">01</div>
            <div>
              <span class="section-kicker" style="margin:0;">Step One</span>
              <h3 style="font-size:19px;margin:0;color:var(--navy);">Meta WhatsApp API Verification</h3>
            </div>
          </div>
          <div style="font-size:14px;font-weight:700;color:var(--green);margin-bottom:6px;">Connect Your Business to the Official WhatsApp Platform.</div>
          <p style="font-size:13.5px;color:var(--slate);line-height:1.65;margin-bottom:12px;">
            Activate your business WhatsApp number through Meta's official WhatsApp Business Cloud API to enable secure, compliant, and interactive customer communication.
          </p>
          <ul style="padding-left:18px;margin:0;font-size:12.5px;color:var(--slate);line-height:1.65;">
            <li>Register a new or eligible existing WhatsApp Business number.</li>
            <li>Complete Meta Business Portfolio setup and required business verification.</li>
            <li>Configure your business display name, profile, logo, and business information.</li>
            <li>Activate WhatsApp Cloud API connectivity with WatsBuy.</li>
          </ul>
        </div>

        <!-- Step 2 -->
        <div class="feature-box">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
            <div class="flow-num-badge" style="margin:0;">02</div>
            <div>
              <span class="section-kicker" style="margin:0;">Step Two</span>
              <h3 style="font-size:19px;margin:0;color:var(--navy);">Design WhatsApp Flows &amp; Approve Templates</h3>
            </div>
          </div>
          <div style="font-size:14px;font-weight:700;color:var(--green);margin-bottom:6px;">Create Your Customer Shopping Experience.</div>
          <p style="font-size:13.5px;color:var(--slate);line-height:1.65;margin-bottom:12px;">
            Configure interactive WhatsApp shopping journeys and Meta-approved messaging templates to deliver a seamless customer experience.
          </p>
          <ul style="padding-left:18px;margin:0;font-size:12.5px;color:var(--slate);line-height:1.65;">
            <li>Design shopping flows for product discovery, checkout, and order confirmation.</li>
            <li>Configure My Account, My Orders, Offers, Support, and Contact Us menus.</li>
            <li>Create and submit WhatsApp message templates for Meta approval.</li>
            <li>Set up automated order notifications, promotional broadcasts, and customer engagement workflows.</li>
          </ul>
        </div>

        <!-- Step 3 -->
        <div class="feature-box">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
            <div class="flow-num-badge" style="margin:0;">03</div>
            <div>
              <span class="section-kicker" style="margin:0;">Step Three</span>
              <h3 style="font-size:19px;margin:0;color:var(--navy);">Product Catalogue Upload &amp; Store Configuration</h3>
            </div>
          </div>
          <div style="font-size:14px;font-weight:700;color:var(--green);margin-bottom:6px;">Bring Your Products to WhatsApp.</div>
          <p style="font-size:13.5px;color:var(--slate);line-height:1.65;margin-bottom:12px;">
            Set up your digital storefront with product information, categories, pricing, and inventory through the WatsBuy merchant dashboard.
          </p>
          <ul style="padding-left:18px;margin:0;font-size:12.5px;color:var(--slate);line-height:1.65;">
            <li>Upload products using Excel/CSV templates or manual entry.</li>
            <li>Configure product images, descriptions, pricing, and variants.</li>
            <li>Organize product categories and collections.</li>
            <li>Configure inventory, order management, and store settings.</li>
          </ul>
        </div>

        <!-- Step 4 -->
        <div class="feature-box">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
            <div class="flow-num-badge" style="margin:0;">04</div>
            <div>
              <span class="section-kicker" style="margin:0;">Step Four</span>
              <h3 style="font-size:19px;margin:0;color:var(--navy);">Third-Party API &amp; Payment Integrations</h3>
            </div>
          </div>
          <div style="font-size:14px;font-weight:700;color:var(--green);margin-bottom:6px;">Connect Your Essential Business Services.</div>
          <p style="font-size:13.5px;color:var(--slate);line-height:1.65;margin-bottom:12px;">
            Integrate supported payment gateways, delivery services, and business applications to streamline order processing and fulfilment.
          </p>
          <ul style="padding-left:18px;margin:0;font-size:12.5px;color:var(--slate);line-height:1.65;">
            <li><strong>Payment Gateways:</strong> Connect supported payment providers for digital transactions.</li>
            <li><strong>Delivery Partners:</strong> Integrate supported logistics and shipment tracking services.</li>
            <li><strong>Email &amp; Notifications:</strong> Configure email services and business alerts.</li>
            <li><strong>Custom API Integrations:</strong> Connect compatible third-party applications based on business requirements.</li>
          </ul>
          <p style="font-size:11.5px;color:var(--slate);margin:10px 0 0;line-height:1.5;">
            <em>Third-party integrations may require additional charges, provider approvals, and technical configuration.</em>
          </p>
        </div>

        <!-- Step 5 -->
        <div class="feature-box">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
            <div class="flow-num-badge" style="margin:0;">05</div>
            <div>
              <span class="section-kicker" style="margin:0;">Step Five</span>
              <h3 style="font-size:19px;margin:0;color:var(--navy);">Go-to-Market &amp; Store Launch</h3>
            </div>
          </div>
          <div style="font-size:14px;font-weight:700;color:var(--green);margin-bottom:6px;">Your WhatsApp Store Is Ready for Business.</div>
          <p style="font-size:13.5px;color:var(--slate);line-height:1.65;margin-bottom:12px;">
            Complete final testing, activate your storefront, and start reaching customers through WhatsApp.
          </p>
          <ul style="padding-left:18px;margin:0;font-size:12.5px;color:var(--slate);line-height:1.65;">
            <li>Test the complete customer journey, from product discovery to checkout and order confirmation.</li>
            <li>Verify payment functionality, order notifications, and customer support workflows.</li>
            <li>Launch your WhatsApp store and share your business number or QR code.</li>
            <li>Start Meta-approved promotional broadcasts to opted-in customers.</li>
            <li>Monitor orders, customer engagement, and campaign performance through your WatsBuy dashboard.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('getting-started.html', wrapPage('Get Started Guide — WatsBuy Onboarding', 'Step-by-step 5-stage guide to launching your WhatsApp storefront with WatsBuy: Meta API verification, Flows approval, catalog setup, payments, and launch.', 'getting-started', gettingStartedBody), 'utf8');
console.log('Saved getting-started.html');


// ==========================================
// 10. DEMO.HTML (Dedicated Book a Demo Page)
// ==========================================
// Requirements:
// - Design reference: references/Book-Demo-Reference.png
// - Clear two-column layout:
//   Left column: copy and benefits ("See your store selling on WhatsApp – in 20 minutes")
//   Right column: demo form for full name, business email, WhatsApp number, company, monthly orders, area of interest, and notes
// - Lower WhatsApp demo preview shown in reference ("Can't wait? Test the AI right now")
// - All buttons route to local pages, NO Emergent links
// - NO founder personal details displayed
// - NO fake sample form values (clean, descriptive placeholders)
// - Interactive demo notice clarifying the form validates locally without a backend
const demoBody = `
  <!-- Hero Section -->
  <section class="page-hero">
    <div class="container text-left" style="max-width:900px;margin:0 auto;text-align:center;">
      <div class="eyebrow"><span class="dot"></span> BOOK A LIVE PLATFORM DEMO</div>
      <h1 style="font-size:clamp(32px,4vw,50px);line-height:1.1;letter-spacing:-2px;margin:16px 0 14px;font-weight:850;color:var(--navy);">
        Experience Your Store on WhatsApp <br><em class="text-green" style="font-style:normal;">Before You Launch.</em>
      </h1>
      <p style="font-size:16px;line-height:1.65;color:var(--slate);max-width:680px;margin:0 auto 24px;">
        Schedule a 20-minute tailored platform walkthrough with our conversational commerce specialists to explore your store on WhatsApp.
      </p>
      <div style="display:flex;justify-content:center;">
        <a class="btn btn-primary" href="#demoBookingForm" style="padding:13px 28px;font-size:14px;">
          Schedule Your 20-Minute Demo Below ↓
        </a>
      </div>
    </div>
  </section>

  <!-- Two-Column Book a Demo Experience (references/Book-Demo-Reference.png) -->
  <section class="section" style="padding-top:10px;">
    <div class="container">
      <div class="demo-hero-grid">
        <!-- Left Column: Demo Introduction & Benefits -->
        <div class="demo-intro-card">
          <div class="eyebrow" style="margin-bottom:10px;"><span class="dot"></span> TAILORED 1-ON-1 DEMONSTRATION</div>
          <h2 style="font-size:clamp(28px, 3.2vw, 38px);line-height:1.15;letter-spacing:-1.2px;color:var(--navy);font-weight:850;margin:0 0 16px;">
            See your store selling on WhatsApp &ndash; in 20 minutes.
          </h2>
          <p style="font-size:14.5px;color:var(--slate);line-height:1.65;margin-bottom:20px;">
            Schedule a personalized walkthrough tailored to your brand's catalogue. Experience firsthand how WatsBuy converts your WhatsApp presence into a 24/7 revenue-generating storefront with zero app downloads, 2-tap Flow checkouts, and 45% completion rates.
          </p>

          <div class="demo-benefits-list">
            <div class="demo-benefit-item">
              <div class="demo-benefit-icon">🛍️</div>
              <div class="demo-benefit-text">
                <h4>Live WhatsApp Storefront Tour</h4>
                <p>See high-resolution catalogue browsing, category collections, and real-time inventory sync tailored to your business.</p>
              </div>
            </div>

            <div class="demo-benefit-item">
              <div class="demo-benefit-icon">⚡</div>
              <div class="demo-benefit-text">
                <h4>Native 2-Tap WhatsApp Flows Checkout</h4>
                <p>Experience the frictionless native checkout that keeps customers inside WhatsApp with zero slow browser redirects.</p>
              </div>
            </div>

            <div class="demo-benefit-item">
              <div class="demo-benefit-icon">📱</div>
              <div class="demo-benefit-text">
                <h4>Interactive WhatsApp Storefront &amp; Flows</h4>
                <p>Experience rich product catalogues, category navigation, and structured interactive purchasing workflows.</p>
              </div>
            </div>

            <div class="demo-benefit-item">
              <div class="demo-benefit-icon">💳</div>
              <div class="demo-benefit-text">
                <h4>In-Chat Instant Payment Settlement</h4>
                <p>Test frictionless UPI, credit/debit card, and netbanking payment flows integrated directly into WhatsApp chat.</p>
              </div>
            </div>

            <div class="demo-benefit-item">
              <div class="demo-benefit-icon">📈</div>
              <div class="demo-benefit-text">
                <h4>Automated Abandoned-Cart Recovery</h4>
                <p>Discover how automated conversational recovery messages reclaim up to 45% of lost checkouts within 15 minutes.</p>
              </div>
            </div>

            <div class="demo-benefit-item">
              <div class="demo-benefit-icon">🛡️</div>
              <div class="demo-benefit-text">
                <h4>Meta Cloud API Verification Roadmap</h4>
                <p>Receive step-by-step guidance for Meta Business Verification, official Green Tick application, and messaging tier scaling.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Demo Booking Form (No Fake Sample Values) -->
        <div class="form-card" id="demoBookingForm" style="box-shadow:var(--shadow-md);position:relative;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:18px;">
            <div>
              <h3 style="font-size:22px;color:var(--navy);font-weight:800;margin:0 0 6px;">Schedule Your Platform Demo</h3>
              <p style="font-size:13px;color:var(--slate);margin:0;">Submit your details to request a personalized WatsBuy demonstration. Our team will contact you to schedule a convenient session and walk you through the platform’s features and capabilities.</p>
            </div>
            <div style="flex-shrink:0;">
              <a href="#signInModal" class="btn btn-outline btn-sm" id="openSignInBtn" onclick="toggleSignInModal(true, event)" style="padding:7px 15px;font-size:12.5px;font-weight:700;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;border-radius:8px;">
                <span>🔐</span> Sign In
              </a>
            </div>
          </div>

          <div class="demo-preview-notice">
            <strong>Interactive Demonstration Notice:</strong> This booking form is ready for integration with your CRM or webhook endpoint. In this demonstration, demo requests are validated and confirmed locally.
          </div>

          <form id="contactDemoForm" onsubmit="handleContactSubmit(event)">
            <div class="form-grid">
              <div class="field">
                <label for="contactName">Full Name *</label>
                <input id="contactName" type="text" required placeholder="Full Name">
              </div>
              <div class="field">
                <label for="contactEmail">Business Email *</label>
                <input id="contactEmail" type="email" required placeholder="Work Email Address">
              </div>
              <div class="field">
                <label for="contactPhone">WhatsApp Number *</label>
                <input id="contactPhone" type="tel" required placeholder="WhatsApp Phone Number">
              </div>
              <div class="field">
                <label for="contactCompany">Company / Business Name *</label>
                <input id="contactCompany" type="text" required placeholder="Company / Business Name">
              </div>
              <div class="field">
                <label for="orderVolume">Monthly Orders *</label>
                <select id="orderVolume" required>
                  <option value="Under 500">Under 500 orders / month</option>
                  <option value="500 - 2,000">500 – 2,000 orders / month</option>
                  <option value="2,000 - 10,000">2,000 – 10,000 orders / month</option>
                  <option value="10,000+">10,000+ orders / month (Enterprise)</option>
                </select>
              </div>
              <div class="field">
                <label for="contactInterest">Area of Interest *</label>
                <select id="contactInterest" required>
                  <option value="Basic Plan">Basic Plan</option>
                  <option value="Growth Plan">Growth Plan</option>
                  <option value="Premium Plan">Premium Plan</option>
                  <option value="Enterprise Custom Plan">Enterprise Custom Plan</option>
                  <option value="Become a Reseller">Become a Reseller</option>
                </select>
              </div>
              <div class="field">
                <label for="demoDate">Preferred Date *</label>
                <input id="demoDate" name="demoDate" type="date" required>
              </div>
              <div class="field">
                <label for="demoMeetingMode">Meeting Mode *</label>
                <select id="demoMeetingMode" name="demoMeetingMode" required>
                  <option value="">Select Meeting Mode *</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
              <div class="field">
                <label for="demoTime">Preferred Time *</label>
                <select id="demoTime" name="demoTime" required>
                  <option value="">Select Preferred Time *</option>
                  <option value="10:00 AM - 10:30 AM">10:00 AM – 10:30 AM</option>
                  <option value="10:30 AM - 11:00 AM">10:30 AM – 11:00 AM</option>
                  <option value="11:00 AM - 11:30 AM">11:00 AM – 11:30 AM</option>
                  <option value="11:30 AM - 12:00 PM">11:30 AM – 12:00 PM</option>
                  <option value="12:00 PM - 12:30 PM">12:00 PM – 12:30 PM</option>
                  <option value="12:30 PM - 01:00 PM">12:30 PM – 01:00 PM</option>
                  <option value="01:00 PM - 01:30 PM">01:00 PM – 01:30 PM</option>
                  <option value="01:30 PM - 02:00 PM">01:30 PM – 02:00 PM</option>
                  <option value="02:00 PM - 02:30 PM">02:00 PM – 02:30 PM</option>
                  <option value="02:30 PM - 03:00 PM">02:30 PM – 03:00 PM</option>
                  <option value="03:00 PM - 03:30 PM">03:00 PM – 03:30 PM</option>
                  <option value="03:30 PM - 04:00 PM">03:30 PM – 04:00 PM</option>
                  <option value="04:00 PM - 04:30 PM">04:00 PM – 04:30 PM</option>
                  <option value="04:30 PM - 05:00 PM">04:30 PM – 05:00 PM</option>
                  <option value="05:00 PM - 05:30 PM">05:00 PM – 05:30 PM</option>
                  <option value="05:30 PM - 06:00 PM">05:30 PM – 06:00 PM</option>
                </select>
              </div>
              <div class="field">
                <label for="contactCountry">Country *</label>
                <select id="contactCountry" name="contactCountry" required>
                  <option value="">Select your country *</option>
                  <option value="India">India</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Oman">Oman</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Philippines">Philippines</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Spain">Spain</option>
                  <option value="Italy">Italy</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Ireland">Ireland</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Japan">Japan</option>
                  <option value="South Korea">South Korea</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Other">Other Country</option>
                </select>
              </div>
              <div class="field full">
                <label for="contactAddress">Business Address *</label>
                <input id="contactAddress" name="contactAddress" type="text" required placeholder="Office / Business Address, City, Region">
              </div>
              <div class="field full">
                <label for="contactMessage">Notes &amp; Requirements</label>
                <textarea id="contactMessage" rows="3" placeholder="Tell us about your product catalogue, sales channels, or specific requirements..."></textarea>
              </div>
            </div>

            <div style="margin-top:20px;">
              <button type="submit" class="btn btn-primary btn-block" style="padding:13px 24px;font-size:14px;font-weight:750;">
                Book a Demo →
              </button>
            </div>

            <div class="form-status" id="contactStatus">
              ✓ <strong>Demo request received!</strong> Submit your details to request a personalized WatsBuy demonstration. Our team will contact you to schedule a convenient session and walk you through the platform’s features and capabilities.
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Sign In Modal -->
  <div id="signInModal" class="modal-overlay" onclick="handleModalBackdropClick(event)">
    <span id="signin"></span>
    <div class="modal-card" onclick="event.stopPropagation()">
      <button type="button" onclick="toggleSignInModal(false)" aria-label="Close" style="position:absolute;top:16px;right:16px;background:none;border:none;font-size:22px;cursor:pointer;color:var(--slate);line-height:1;padding:4px;">&times;</button>
      
      <div style="margin-bottom:20px;">
        <div class="eyebrow" style="margin-bottom:8px;"><span class="dot"></span> MERCHANT LOGIN</div>
        <h3 style="font-size:22px;color:var(--navy);font-weight:850;margin:0 0 6px;">Sign In to WatsBuy</h3>
        <p style="font-size:13px;color:var(--slate);margin:0;">Access your WhatsApp store dashboard and merchant management console.</p>
      </div>

      <form id="signInForm" onsubmit="handleSignInSubmit(event)">
        <div class="field" style="margin-bottom:16px;">
          <label for="signInEmail" style="display:block;font-size:13px;font-weight:700;color:var(--navy);margin-bottom:6px;">Email Address *</label>
          <input id="signInEmail" type="email" required placeholder="merchant@yourbusiness.com" autocomplete="email" style="width:100%;padding:10px 14px;border:1px solid var(--line);border-radius:8px;font-size:14px;box-sizing:border-box;">
        </div>

        <div class="field" style="margin-bottom:20px;">
          <label for="signInPassword" style="display:block;font-size:13px;font-weight:700;color:var(--navy);margin-bottom:6px;">Password *</label>
          <input id="signInPassword" type="password" required placeholder="••••••••" autocomplete="current-password" style="width:100%;padding:10px 14px;border:1px solid var(--line);border-radius:8px;font-size:14px;box-sizing:border-box;">
        </div>

        <button type="submit" class="btn btn-primary btn-block" style="width:100%;padding:12px;font-size:14px;font-weight:750;">
          Sign In
        </button>

        <div id="signInStatus" style="display:none;margin-top:16px;padding:12px 14px;border-radius:8px;font-size:12.5px;line-height:1.5;"></div>
      </form>
    </div>
  </div>
      </div>
    </div>
  </section>
`;

// ==========================================
// 6. CONTACT.HTML (Contact Us)
// ==========================================
// Content from references/watsbuy-contact.html
const contactBody = `
  <!-- Hero Section -->
  <section class="page-hero">
    <div class="container text-left" style="max-width:900px;margin:0 auto;text-align:center;">
      <div class="eyebrow"><span class="dot"></span> LET'S CONNECT</div>
      <h1 style="font-size:clamp(32px,4vw,50px);line-height:1.1;letter-spacing:-2px;margin:16px 0 14px;font-weight:850;color:var(--navy);">
        Let's Build <em class="text-green" style="font-style:normal;">What's Next.</em>
      </h1>
      <p style="font-size:16px;line-height:1.65;color:var(--slate);max-width:680px;margin:0 auto 24px;">
        Have a question about WatsBuy? Whether you're exploring WhatsApp commerce, enterprise automation or a reseller partnership, our team is here to help.
      </p>
      <div style="display:flex;justify-content:center;">
        <a class="btn btn-primary" href="#enquiry" style="padding:13px 28px;font-size:14px;">
          Send Us a Message Below ↓
        </a>
      </div>
    </div>
  </section>

  <!-- Two-Column Contact Experience (from references/watsbuy-contact.html) -->
  <section class="section" style="padding-top:10px;">
    <div class="container">
      <div class="demo-hero-grid">
        <!-- Panel 1: Get in Touch -->
        <div class="form-card" style="box-shadow:var(--shadow-sm);">
          <h2 style="font-size:24px;color:var(--navy);font-weight:800;margin:0 0 8px;letter-spacing:-0.5px;">Get in Touch</h2>
          <p style="font-size:14px;color:var(--slate);line-height:1.6;margin:0 0 24px;">Connect with WatsBuy through your preferred channel.</p>

          <div style="display:flex;flex-direction:column;gap:18px;">
            <div class="contact-card-box">
              <div class="contact-glyph">✉</div>
              <div>
                <strong style="display:block;color:var(--navy);font-size:14px;margin-bottom:3px;">Business &amp; Sales Enquiries</strong>
                <span style="display:block;font-size:12.5px;color:var(--slate);line-height:1.5;margin-bottom:4px;">Use the enquiry form to request a demo, pricing or a custom solution.</span>
                <a href="mailto:sales@watsbuy.com" style="color:var(--green);font-size:12.5px;font-weight:700;">sales@watsbuy.com</a>
              </div>
            </div>

            <div class="contact-card-box">
              <div class="contact-glyph">☏</div>
              <div>
                <strong style="display:block;color:var(--navy);font-size:14px;margin-bottom:3px;">WhatsApp &amp; Phone</strong>
                <span style="display:block;font-size:12.5px;color:var(--slate);line-height:1.5;">Official business contact number to be added.</span>
              </div>
            </div>

            <div class="contact-card-box" style="border-bottom:none;">
              <div class="contact-glyph">◎</div>
              <div>
                <strong style="display:block;color:var(--navy);font-size:14px;margin-bottom:3px;">Website</strong>
                <a href="https://watsbuy.com" target="_blank" rel="noopener noreferrer" style="color:var(--green);font-size:12.5px;font-weight:700;">www.watsbuy.com</a>
              </div>
            </div>
          </div>

          <div style="margin-top:28px;padding-top:22px;border-top:1px solid var(--line);">
            <h3 style="font-size:16px;color:var(--navy);font-weight:750;margin:0 0 12px;">Follow WatsBuy</h3>
            <div class="social-links-grid">
              <span class="social-badge"><i>in</i> LinkedIn</span>
              <span class="social-badge"><i>f</i> Facebook</span>
              <span class="social-badge"><i>◎</i> Instagram</span>
              <span class="social-badge"><i>▶</i> YouTube</span>
              <span class="social-badge"><i>𝕏</i> X</span>
              <span class="social-badge"><i>➤</i> Telegram</span>
            </div>
            <p style="font-size:11.5px;color:var(--slate);margin:12px 0 0;line-height:1.5;">
              Social profiles will become clickable once the official URLs are configured.
            </p>
          </div>
        </div>

        <!-- Panel 2: Send Us a Message (#enquiry) -->
        <div class="form-card" id="enquiry" style="box-shadow:var(--shadow-md);">
          <div style="margin-bottom:18px;">
            <h3 style="font-size:22px;color:var(--navy);font-weight:800;margin:0 0 6px;">Send Us a Message</h3>
            <p style="font-size:13px;color:var(--slate);margin:0;">Tell us what you're looking for and we'll help you find the right WatsBuy solution.</p>
          </div>

          <form id="contactForm" onsubmit="handleContactSubmit(event)">
            <div class="form-grid">
              <div class="field">
                <label for="contactName">Full Name *</label>
                <input id="contactName" type="text" required placeholder="Your name">
              </div>
              <div class="field">
                <label for="contactEmail">Business Email *</label>
                <input id="contactEmail" type="email" required placeholder="you@company.com">
              </div>
              <div class="field">
                <label for="contactPhone">Phone / WhatsApp</label>
                <input id="contactPhone" type="tel" placeholder="+91 ...">
              </div>
              <div class="field">
                <label for="contactCompany">Company Name</label>
                <input id="contactCompany" type="text" placeholder="Your company">
              </div>
              <div class="field full">
                <label for="contactInterest">I'm Interested In *</label>
                <select id="contactInterest" required>
                  <option value="">Select enquiry type</option>
                  <option value="Book a Product Demo">Book a Product Demo</option>
                  <option value="Enterprise Solutions">Enterprise Solutions</option>
                  <option value="Workflow Automation">Workflow Automation</option>
                  <option value="ERP &amp; Custom Integration">ERP &amp; Custom Integration</option>
                  <option value="Reseller Partnership">Reseller Partnership</option>
                  <option value="Pricing &amp; Subscriptions">Pricing &amp; Subscriptions</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Other Enquiry">Other Enquiry</option>
                </select>
              </div>
              <div class="field full">
                <label for="contactMessage">How Can We Help? *</label>
                <textarea id="contactMessage" rows="4" required placeholder="Tell us about your requirements..."></textarea>
              </div>
            </div>

            <div style="font-size:11.5px;color:var(--slate);margin-top:14px;line-height:1.5;">
              By submitting, you agree to be contacted about your enquiry. Do not include passwords or payment card details.
            </div>

            <div style="margin-top:18px;">
              <button type="submit" class="btn btn-primary btn-block" style="padding:13px 24px;font-size:14px;font-weight:750;">
                Submit Enquiry →
              </button>
            </div>

            <div class="form-status" id="contactStatus">
              ✓ <strong>Enquiry received!</strong> Thank you for contacting WatsBuy. Our team will review your message and reach out to you promptly.
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA section from watsbuy-contact.html -->
  <section class="section section-soft" style="text-align:center;">
    <div class="container" style="max-width:760px;">
      <h2 style="font-size:clamp(26px,3.2vw,36px);color:var(--navy);letter-spacing:-1.2px;margin:0 0 12px;font-weight:850;">
        Ready to Grow with WatsBuy?
      </h2>
      <p style="font-size:15px;color:var(--slate);line-height:1.7;margin:0 auto 22px;">
        Discover how WhatsApp commerce and automated workflows can transform the way your business connects with customers.
      </p>
      <a class="btn btn-primary" href="#enquiry" style="padding:12px 28px;">Request a Consultation →</a>
    </div>
  </section>
`;

const demoScripts = `
  <script>
    function toggleSignInModal(show, e) {
      if (e && e.preventDefault) e.preventDefault();
      const modal = document.getElementById('signInModal');
      if (!modal) return;
      if (show) {
        modal.classList.add('open');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        const emailInput = document.getElementById('signInEmail');
        if (emailInput) setTimeout(() => emailInput.focus(), 100);
      } else {
        modal.classList.remove('open');
        modal.style.display = 'none';
        document.body.style.overflow = '';
        const status = document.getElementById('signInStatus');
        if (status) status.style.display = 'none';
        const pwd = document.getElementById('signInPassword');
        if (pwd) pwd.value = '';
      }
    }

    function handleModalBackdropClick(e) {
      if (e.target.id === 'signInModal') {
        toggleSignInModal(false);
      }
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        toggleSignInModal(false);
      }
    });

    if (window.location.hash === '#signin' || window.location.hash === '#signInModal') {
      window.addEventListener('DOMContentLoaded', () => toggleSignInModal(true));
    }

    function handleSignInSubmit(e) {
      e.preventDefault();
      const email = document.getElementById('signInEmail');
      const pwd = document.getElementById('signInPassword');
      const status = document.getElementById('signInStatus');

      // Clear password immediately so credentials are not retained in browser memory or DOM
      if (pwd) pwd.value = '';

      if (status) {
        status.style.display = 'block';
        status.style.background = '#FEF3F2';
        status.style.border = '1px solid #FECDCA';
        status.style.color = '#B42318';
        status.innerHTML = '<strong>Backend Authentication Required:</strong> This static demo does not connect to a live authentication service or database. Credentials were not stored or processed. A real sign-in requires an active backend server.';
      }
    }

    const demoDateInput = document.getElementById('demoDate');
    if (demoDateInput) {
      demoDateInput.min = new Date().toISOString().split('T')[0];
    }

    function handleContactSubmit(e) {
      e.preventDefault();
      const date = document.getElementById('demoDate');
      const mode = document.getElementById('demoMeetingMode');
      const time = document.getElementById('demoTime');
      const country = document.getElementById('contactCountry');
      const address = document.getElementById('contactAddress');

      if (date && !date.value.trim()) {
        date.focus();
        return;
      }
      if (mode && !mode.value.trim()) {
        mode.focus();
        return;
      }
      if (time && !time.value.trim()) {
        time.focus();
        return;
      }
      if (country && !country.value.trim()) {
        country.focus();
        return;
      }
      if (address && !address.value.trim()) {
        address.focus();
        return;
      }
      const status = document.getElementById('contactStatus');
      if (status) {
        status.style.display = 'block';
        status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      if (typeof showConfirmationModal === 'function') {
        showConfirmationModal(
          'Demo Walkthrough Scheduled!',
          'Thank you for booking a tailored walkthrough with WatsBuy. Our team has received your schedule preferences and will send a calendar invitation and meeting link to your email and WhatsApp shortly.',
          'DEMO CONFIRMED'
        );
      }
    }
  </script>
`;

const contactScripts = `
  <script>
    // Pre-fill interest dropdown from URL query parameter ?interest=...
    const urlParams = new URLSearchParams(window.location.search);
    const interestParam = urlParams.get('interest');
    if (interestParam) {
      const select = document.getElementById('contactInterest');
      if (select) {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].value.toLowerCase() === interestParam.toLowerCase() ||
              select.options[i].text.toLowerCase().includes(interestParam.toLowerCase())) {
            select.selectedIndex = i;
            break;
          }
        }
      }
    }

    function handleContactSubmit(e) {
      e.preventDefault();
      const status = document.getElementById('contactStatus');
      if (status) {
        status.style.display = 'block';
        status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      if (typeof showConfirmationModal === 'function') {
        showConfirmationModal(
          'Message Sent Successfully!',
          'Thank you for contacting WatsBuy. Your message has been received by our client team, and we will follow up with you promptly.',
          'MESSAGE SENT'
        );
      }
    }
  </script>
`;

fs.writeFileSync('demo.html', wrapPage('Book a Demo — WatsBuy Conversational Commerce', 'Book a tailored 20-minute conversational commerce walkthrough with WatsBuy and explore your store on WhatsApp.', 'demo', demoBody, '', demoScripts), 'utf8');
console.log('Saved demo.html');

// ==========================================
// 10B. TRIAL.HTML (Dedicated 7-Day Free Trial Landing Page)
// ==========================================
// Requirements:
// - Form is strictly hidden on initial page load.
// - Clicking any "7-Day Free Trial" button opens the trial registration form in a modal.
// - Modal opens the trial registration form, NOT a Sign In form.
// - Existing standard required trial fields: Full Name, Business Email, WhatsApp Number, Company/Business Name, Monthly Orders, Area of Interest, required Business Address, required Country.
// - Redesigned to match site theme.
// - Removed misplaced Sign In form, button, and security/demo notices from trial flow.
const trialBody = `
  <!-- Hero Section -->
  <section class="page-hero">
    <div class="container text-left" style="max-width:900px;margin:0 auto;text-align:center;">
      <div class="eyebrow"><span class="dot"></span> 7-DAY FREE TRIAL · INSTANT SETUP</div>
      <h1 style="font-size:clamp(32px,4vw,50px);line-height:1.1;letter-spacing:-2px;margin:16px 0 14px;font-weight:850;color:var(--navy);">
        Experience Your Store on WhatsApp <br><em class="text-green" style="font-style:normal;">Free for 7 Days.</em>
      </h1>
      <p style="font-size:16px;line-height:1.65;color:var(--slate);max-width:680px;margin:0 auto 24px;">
        Launch your WhatsApp catalogue, test interactive flows, and start engaging customers with full platform access for 7 days. No credit card required to start.
      </p>
      <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:20px;">
        <button type="button" class="btn btn-primary btn-lg" onclick="openTrialModal()" style="padding:14px 32px;font-size:15px;font-weight:750;">
          Start 7-Day Free Trial →
        </button>
        <a class="btn btn-outline" href="pricing.html" style="padding:14px 28px;font-size:15px;">
          View Pricing Plans →
        </a>
      </div>
      <div style="font-size:13px;color:var(--navy);display:flex;align-items:center;justify-content:center;gap:18px;flex-wrap:wrap;font-weight:700;">
        <span><strong class="text-green">✓</strong> No credit card required</span>
        <span><strong class="text-green">✓</strong> Full platform access</span>
        <span><strong class="text-green">✓</strong> Instant WhatsApp activation</span>
      </div>
    </div>
  </section>

  <!-- Platform Capabilities & Benefits Grid -->
  <section class="section" style="padding-top:10px;">
    <div class="container" style="max-width:1040px;">
      <div class="section-head text-center" style="margin-bottom:32px;">
        <div class="eyebrow"><span class="dot"></span> WHAT'S INCLUDED IN YOUR TRIAL</div>
        <h2 style="font-size:clamp(28px, 3.2vw, 36px);letter-spacing:-1px;color:var(--navy);font-weight:850;margin:10px 0;">
          Everything You Need to Sell on WhatsApp
        </h2>
        <p style="font-size:15px;color:var(--slate);max-width:620px;margin:0 auto;">
          Full access to every core feature during your 7-day trial with guided onboarding and zero commitment.
        </p>
      </div>

      <div class="cards-grid-3">
        <div class="card" style="padding:28px 24px;border-radius:18px;box-shadow:var(--shadow-sm);border:1px solid var(--line);">
          <div style="font-size:32px;margin-bottom:14px;">🛍️</div>
          <h3 style="font-size:18px;color:var(--navy);font-weight:800;margin:0 0 8px;">Digital Storefront &amp; Catalogue</h3>
          <p style="font-size:13.5px;color:var(--slate);line-height:1.6;margin:0;">
            Upload your product inventory, organize collections, and share interactive WhatsApp catalogues directly with shoppers.
          </p>
        </div>

        <div class="card" style="padding:28px 24px;border-radius:18px;box-shadow:var(--shadow-sm);border:1px solid var(--line);">
          <div style="font-size:32px;margin-bottom:14px;">⚡</div>
          <h3 style="font-size:18px;color:var(--navy);font-weight:800;margin:0 0 8px;">Native 2-Tap Checkout Flows</h3>
          <p style="font-size:13.5px;color:var(--slate);line-height:1.6;margin:0;">
            Experience frictionless WhatsApp Flows that let buyers review cart items and checkout in two taps with zero app downloads.
          </p>
        </div>

        <div class="card" style="padding:28px 24px;border-radius:18px;box-shadow:var(--shadow-sm);border:1px solid var(--line);">
          <div style="font-size:32px;margin-bottom:14px;">💳</div>
          <h3 style="font-size:18px;color:var(--navy);font-weight:800;margin:0 0 8px;">Integrated Instant Payments</h3>
          <p style="font-size:13.5px;color:var(--slate);line-height:1.6;margin:0;">
            Test secure payment processing with supported UPI, credit/debit cards, netbanking, and Cash on Delivery options.
          </p>
        </div>

        <div class="card" style="padding:28px 24px;border-radius:18px;box-shadow:var(--shadow-sm);border:1px solid var(--line);">
          <div style="font-size:32px;margin-bottom:14px;">📈</div>
          <h3 style="font-size:18px;color:var(--navy);font-weight:800;margin:0 0 8px;">Broadcasts &amp; Retargeting</h3>
          <p style="font-size:13.5px;color:var(--slate);line-height:1.6;margin:0;">
            Reach customers via Meta-approved promotional message templates, product announcements, and customer re-engagement.
          </p>
        </div>

        <div class="card" style="padding:28px 24px;border-radius:18px;box-shadow:var(--shadow-sm);border:1px solid var(--line);">
          <div style="font-size:32px;margin-bottom:14px;">🛒</div>
          <h3 style="font-size:18px;color:var(--navy);font-weight:800;margin:0 0 8px;">Abandoned-Cart Recovery</h3>
          <p style="font-size:13.5px;color:var(--slate);line-height:1.6;margin:0;">
            Automate conversational recovery reminders to re-engage prospective buyers and recover lost checkouts.
          </p>
        </div>

        <div class="card" style="padding:28px 24px;border-radius:18px;box-shadow:var(--shadow-sm);border:1px solid var(--line);">
          <div style="font-size:32px;margin-bottom:14px;">🛡️</div>
          <h3 style="font-size:18px;color:var(--navy);font-weight:800;margin:0 0 8px;">Dedicated Onboarding Support</h3>
          <p style="font-size:13.5px;color:var(--slate);line-height:1.6;margin:0;">
            Receive step-by-step guidance for Meta Business Verification, official Green Tick application, and WhatsApp API configuration.
          </p>
        </div>
      </div>

      <!-- Dedicated Trial Step Card -->
      <div class="form-card" style="max-width:760px;margin:48px auto 20px;text-align:center;box-shadow:var(--shadow);border-radius:20px;padding:36px 32px;">
        <div class="eyebrow" style="margin-bottom:10px;"><span class="dot"></span> READY TO GET STARTED?</div>
        <h2 style="font-size:clamp(24px, 3vw, 32px);line-height:1.2;letter-spacing:-1px;color:var(--navy);font-weight:850;margin:0 0 12px;">
          Begin your 7-day free trial in under 2 minutes.
        </h2>
        <p style="font-size:15px;color:var(--slate);line-height:1.6;max-width:560px;margin:0 auto 24px;">
          Click below to open the trial registration form. Fill in your business details and our onboarding team will prepare your store on WhatsApp.
        </p>
        <button type="button" class="btn btn-primary" onclick="openTrialModal()" style="padding:15px 36px;font-size:15.5px;font-weight:800;border-radius:10px;">
          7-Day Free Trial →
        </button>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('trial.html', wrapPage('7-Day Free Trial — WatsBuy Conversational Commerce', 'Start your 7-day free trial on WatsBuy. Experience your store on WhatsApp with zero risk and instant setup.', 'trial', trialBody, '', ''), 'utf8');
console.log('Saved trial.html');

fs.writeFileSync('contact.html', wrapPage('Contact Us — WatsBuy Conversational Commerce', 'Contact WatsBuy for demos, enterprise solutions, reseller partnerships and support.', 'contact', contactBody, '', contactScripts), 'utf8');
console.log('Saved contact.html');

// ==========================================
// 11. SIGNIN.HTML (Dedicated Merchant Sign In Page)
// ==========================================
// Requirements:
// - Two-column layout: sign-in form on the left, preview panel on the right
// - Responsive on mobile
// - Required Email and Password fields
// - Existing authentication behavior (clears password, displays backend authentication required notice, no fake success, no storing passwords)
// - Remove red-marked content beneath the Sign In button (no forgot password, no sign up, no social logins)
// - Remove AI-related wording, including "AI agent" and "AI conversations"
// - Zero invented dashboard metrics in the preview panel (uses only verified existing product capabilities)
// - Zero Book a Demo buttons or duplicate demo CTAs
const signinBody = `
  <section class="signin-section">
    <div class="container">
      <div class="signin-grid">
        <!-- Left Column: Sign-In Form -->
        <div class="signin-form-card">
          <div class="eyebrow" style="margin-bottom:8px;"><span class="dot"></span> MERCHANT LOGIN</div>
          <h1 style="font-size:clamp(26px,3vw,34px);font-weight:850;color:var(--navy);letter-spacing:-1px;margin:0 0 10px;">Sign in to your account</h1>
          <p style="font-size:14px;color:var(--slate);line-height:1.6;margin:0 0 28px;">Welcome back. Access your store dashboard, product catalog, and conversational orders.</p>

          <form id="merchantSignInForm" onsubmit="handleMerchantSignIn(event)">
            <div class="field" style="margin-bottom:18px;">
              <label for="signinEmail" style="display:block;font-size:13.5px;font-weight:700;color:var(--navy);margin-bottom:7px;">Business Email *</label>
              <input id="signinEmail" type="email" required placeholder="name@yourbusiness.com" autocomplete="email" style="width:100%;padding:12px 14px;border:1px solid var(--line);border-radius:9px;font-size:14px;box-sizing:border-box;">
            </div>

            <div class="field" style="margin-bottom:24px;">
              <label for="signinPassword" style="display:block;font-size:13.5px;font-weight:700;color:var(--navy);margin-bottom:7px;">Password *</label>
              <input id="signinPassword" type="password" required placeholder="••••••••" autocomplete="current-password" style="width:100%;padding:12px 14px;border:1px solid var(--line);border-radius:9px;font-size:14px;box-sizing:border-box;">
            </div>

            <button type="submit" class="btn btn-primary btn-block" style="width:100%;padding:14px;font-size:14.5px;font-weight:750;">
              Sign In →
            </button>

            <!-- Authentication Feedback Notice (No fake success, no storing passwords) -->
            <div id="signinStatus" style="display:none;margin-top:18px;padding:14px 16px;border-radius:10px;font-size:13px;line-height:1.55;"></div>
          </form>
        </div>

        <!-- Right Column: Preview Panel (Verified Existing Product Info, Zero Invented Metrics, Zero AI claims) -->
        <div class="signin-preview-panel">
          <div class="eyebrow" style="margin-bottom:8px;"><span class="dot"></span> PLATFORM CAPABILITIES</div>
          <h2 style="font-size:22px;color:var(--navy);font-weight:800;letter-spacing:-0.5px;margin:0 0 8px;">Unified Storefront Management</h2>
          <p style="font-size:13.5px;color:var(--slate);line-height:1.6;margin:0 0 20px;">Everything your business needs to sell, fulfill orders, and engage customers on WhatsApp.</p>

          <div class="preview-features-list">
            <div class="preview-feature-item">
              <span class="preview-icon">🛍️</span>
              <div>
                <strong>Dual-Platform Storefront</strong>
                <p>Synchronize product catalogues and inventory between your online store and WhatsApp.</p>
              </div>
            </div>

            <div class="preview-feature-item">
              <span class="preview-icon">⚡</span>
              <div>
                <strong>Native WhatsApp Flows Checkout</strong>
                <p>Provide frictionless 2-tap in-chat ordering without external web redirects.</p>
              </div>
            </div>

            <div class="preview-feature-item">
              <span class="preview-icon">💳</span>
              <div>
                <strong>Integrated Instant Payments</strong>
                <p>Accept seamless UPI, debit/credit cards, and netbanking settlements within WhatsApp.</p>
              </div>
            </div>

            <div class="preview-feature-item">
              <span class="preview-icon">📦</span>
              <div>
                <strong>Automated Order Notifications</strong>
                <p>Send real-time order confirmations, shipping updates, and abandoned-cart reminders.</p>
              </div>
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:10px;padding-top:20px;margin-top:24px;border-top:1px solid var(--line);font-size:12px;color:var(--slate);">
            <span style="color:var(--green);font-size:15px;font-weight:bold;">✓</span>
            <span>Official WhatsApp Business Cloud API &amp; Meta Business Verification Integration</span>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

const signinScripts = `
  <script>
    function handleMerchantSignIn(e) {
      e.preventDefault();
      const pwd = document.getElementById('signinPassword');
      const status = document.getElementById('signinStatus');

      // Clear password immediately so credentials are never retained in memory or browser storage
      if (pwd) pwd.value = '';

      if (status) {
        status.style.display = 'block';
        status.style.background = '#FEF3F2';
        status.style.border = '1px solid #FECDCA';
        status.style.color = '#B42318';
        status.innerHTML = '<strong>Backend Authentication Required:</strong> This static frontend demo does not connect to a live authentication server or database. Credentials were not stored or processed. A real sign-in requires an active backend server.';
      }
    }
  </script>
`;

fs.writeFileSync('signin.html', wrapPage('Merchant Sign In', 'Sign in to your WatsBuy merchant dashboard to manage your WhatsApp store, catalog, and orders.', 'signin', signinBody, '', signinScripts), 'utf8');
console.log('Saved signin.html');
