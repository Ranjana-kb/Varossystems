const fs = require('fs');
const { wrapPage, privacyBody, termsBody, refundBody, shippingBody, aboutBody } = require('./build_site');

console.log('Building Legal & Corporate Pages (About, Privacy, Terms, Refund, Shipping)...');

// 1. ABOUT.HTML
const aboutContent = `
  <section class="legal-hero">
    <div class="container">
      <span class="section-kicker" style="color:var(--mint-accent);display:inline-block;margin-bottom:8px;">ABOUT US</span>
      <h1 style="font-size:clamp(30px, 3.8vw, 44px);letter-spacing:-1.6px;margin:0 0 10px;">About Us</h1>
      <p style="font-size:16px;color:#CFE3EA;max-width:720px;margin:0 auto 12px;">Stop Waiting for Customers. Start Reaching Them.</p>
      <p style="font-size:12.5px;color:#8FA0AF;margin:0;">Operating Entity: Ziro Systems Private Limited (India) &amp; Varos System Fzco (UAE)</p>
    </div>
  </section>

  <main class="container" style="padding:48px 0;">
    <div class="policy-wrapper">
      <div class="policy-header">
        <h2>About Us</h2>
        <div class="policy-meta-pill"><span class="icon">🏢</span> Legal Entities: Ziro Systems Private Limited (India) &bull; Varos System Fzco (UAE)</div>
        <p class="policy-intro">
          WatsBuy is redefining how businesses connect with customers, showcase products, and convert conversations into sales. We are a conversational commerce and sales automation platform that helps businesses move beyond traditional websites and fragmented shopping experiences to a more direct, conversational, and effective way of selling.
        </p>
      </div>

      <div class="policy-content">
        <h3 class="policy-heading"><span class="num">1.</span> Our Story</h3>
        <p>Traditional e-commerce often depends on customers visiting a website, searching through products, navigating multiple pages, and completing several checkout steps before placing an order. Along the way, businesses can lose valuable sales opportunities.</p>
        <p>In a world where customers spend more time messaging, browsing social media, and interacting through digital channels, businesses need more than an online store. They need a smarter way to reach customers, engage them at the right moment, simplify purchasing, and build lasting relationships. That is where WatsBuy comes in.</p>
        <p>WatsBuy was built around a simple idea: <strong>Why wait for customers to visit your store when you can bring your store, products, and shopping experience directly to them?</strong></p>
        <p>By combining WhatsApp commerce, direct product discovery, native checkout flows, and sales automation, WatsBuy helps businesses create a more connected customer journey—from product discovery to purchase and beyond.</p>

        <div style="margin:24px 0 28px;border-radius:16px;overflow:hidden;border:1px solid var(--line);box-shadow:var(--shadow-sm);">
          <img src="assets/images/business-workspace.jpg" alt="Commerce specialist analyzing digital sales metrics and customer conversations on a laptop in an office" style="width:100%;max-height:420px;object-fit:cover;display:block;">
        </div>

        <h3 class="policy-heading"><span class="num">2.</span> What We Do</h3>
        <p>WatsBuy brings essential commerce, customer engagement, and sales automation capabilities together in one platform—helping businesses reach customers, simplify shopping, and turn conversations into sales.</p>
        <ul style="padding-left:20px;line-height:1.75;margin-bottom:20px;">
          <li><strong>WhatsApp Commerce:</strong> Showcase products, share catalogues, engage shoppers, and enable customers to browse products, add to cart, and place orders through conversational shopping experiences.</li>
          <li><strong>Automated Sales Engagement:</strong> Automate customer enquiries, personalised follow-ups, promotional journeys, abandoned-cart recovery, and repeat-purchase campaigns to improve customer engagement and sales opportunities.</li>
          <li><strong>Bulk WhatsApp Broadcasting &amp; Campaigns:</strong> Reach large customer segments with targeted promotional messages, product carousels, new-arrival announcements, special offers, seasonal campaigns, and personalised updates. Use customer segmentation and campaign management to deliver relevant messages at scale, subject to WhatsApp's messaging policies, approved templates, and applicable consent requirements.</li>
          <li><strong>Officially Approved WhatsApp Flows &amp; Message Templates:</strong> Create structured, interactive customer journeys using WhatsApp Flows and approved message templates through supported official WhatsApp Business Platform integrations. Simplify product enquiries, customer information collection, order updates, appointment requests, feedback, and other business interactions while maintaining compliance with Meta's applicable approval and messaging requirements.</li>
          <li><strong>Simplified Ordering &amp; Payments:</strong> Connect product selection, cart management, order processing, payment links, and supported payment gateways into a smoother purchasing journey—from product discovery to checkout and order fulfilment.</li>
          <li><strong>Customer Insights &amp; Analytics:</strong> Understand customer engagement, monitor campaign performance, identify abandoned sales opportunities, and gain actionable insights to improve conversions, customer retention, and business growth.</li>
        </ul>

        <h3 class="policy-heading"><span class="num">3.</span> Why WatsBuy?</h3>
        <p>We believe the future of commerce is not just about having an online store. It is about making shopping easier, conversations more meaningful, and customer engagement more effective. WatsBuy helps businesses:</p>
        <ul style="padding-left:20px;line-height:1.75;margin-bottom:20px;">
          <li>Reach customers where they already communicate.</li>
          <li>Reduce friction in product discovery and purchasing.</li>
          <li>Respond faster with automated customer engagement.</li>
          <li>Automate repetitive sales and support activities.</li>
          <li>Build stronger customer relationships through personalised interactions.</li>
          <li>Bring product discovery, conversations, and ordering closer together.</li>
        </ul>

        <h3 class="policy-heading"><span class="num">4.</span> Our Vision &amp; Mission</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:24px;">
          <div style="background:var(--grey-bg);border:1px solid var(--line);border-radius:12px;padding:18px;">
            <strong style="color:var(--navy);font-size:14px;display:block;margin-bottom:6px;">Our Vision</strong>
            <p style="font-size:13px;color:var(--slate);line-height:1.6;margin:0;">
              To make conversational commerce accessible to businesses worldwide—helping every business reach more customers, deliver better shopping experiences, and grow through direct messaging engagement.
            </p>
          </div>
          <div style="background:var(--grey-bg);border:1px solid var(--line);border-radius:12px;padding:18px;">
            <strong style="color:var(--navy);font-size:14px;display:block;margin-bottom:6px;">Our Mission</strong>
            <p style="font-size:13px;color:var(--slate);line-height:1.6;margin:0;">
              To simplify digital commerce by connecting businesses and customers through messaging, intelligent automation, and seamless purchasing experiences.
            </p>
          </div>
        </div>

        <h3 class="policy-heading"><span class="num">5.</span> Who We Serve</h3>
        <p>WatsBuy is designed for retailers, direct-to-consumer brands, wholesalers, distributors, and growing businesses that want to modernise the way they sell and communicate with customers.</p>
        <p>Whether you are launching your first digital storefront or expanding an established e-commerce operation, WatsBuy aims to help you create a more connected and scalable commerce experience.</p>

        <h3 class="policy-heading"><span class="num">6.</span> The Future of Commerce Is Conversational</h3>
        <div style="background:var(--grey-bg);border-left:4px solid var(--green);padding:18px 22px;border-radius:0 12px 12px 0;margin-bottom:24px;">
          <h4 style="margin:0 0 8px;font-size:16px;color:var(--navy);">Discover. Engage. Browse. Order. Pay. Support. Repeat.</h4>
          <p style="margin:0;font-size:13.5px;color:var(--slate);line-height:1.65;">
            With WatsBuy, every interaction can become an opportunity to serve a customer and build a lasting relationship.<br><br>
            <strong>WatsBuy — From Websites to Conversations to Modern Commerce.</strong>
          </p>
          <div style="font-weight:750;color:var(--green);font-size:13.5px;margin-top:10px;">
            Stop Waiting for Customers. Start Reaching Them.
          </div>
        </div>

        <h3 class="policy-heading"><span class="num">7.</span> Corporate Governance &amp; Operating Entities</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:14px;">
          <div style="background:var(--grey-bg);border:1px solid var(--line);border-radius:12px;padding:16px;">
            <strong style="color:var(--navy);font-size:13.5px;display:block;margin-bottom:6px;">Operating Entity (India)</strong>
            <p style="font-size:12px;color:var(--slate);margin:0;line-height:1.55;">
              <strong>Ziro Systems Private Limited</strong><br>
              Alappat Buildings, No. VII/27-E, Muthuvara, Puzhakkal (P.O), Thrissur, Kerala – 680553, India<br>
              Phone: +91 88919 42727<br>
              Email: sales@watsbuy.com
            </p>
          </div>
          <div style="background:var(--grey-bg);border:1px solid var(--line);border-radius:12px;padding:16px;">
            <strong style="color:var(--navy);font-size:13.5px;display:block;margin-bottom:6px;">International Entity (UAE)</strong>
            <p style="font-size:12px;color:var(--slate);margin:0;line-height:1.55;">
              <strong>Varos System Fzco</strong><br>
              129 9WC Building, 5th Floor, Office No. 523, Dubai Airport Freezone (DAFZA), Dubai, UAE<br>
              Phone: +971 50 292 7230<br>
              Email: sales@watsbuy.com
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
`;
fs.writeFileSync('about.html', wrapPage('About Us — WatsBuy Conversational Commerce', 'About Us: Redefining e-commerce with WhatsApp. Vision, mission, philosophy, and dual corporate operations in India and UAE.', 'about', aboutContent), 'utf8');
console.log('Saved about.html');

// 2. PRIVACY.HTML
const privacyContent = `
  <section class="legal-hero">
    <div class="container">
      <h1>Privacy Policy</h1>
      <p>Operating Entity: Ziro Systems Private Limited • Alappat Buildings, No. VII/27-E, Muthuvara, Puzhakkal (P.O), Thrissur, Kerala – 680553, India</p>
    </div>
  </section>

  <main class="container">
    ${privacyBody}
  </main>
`;
fs.writeFileSync('privacy.html', wrapPage('Privacy Policy — WatsBuy', 'Official Privacy Policy for WatsBuy, operated by Ziro Systems Private Limited.', 'privacy', privacyContent), 'utf8');
console.log('Saved privacy.html');

// 3. TERMS.HTML
const termsContent = `
  <section class="legal-hero">
    <div class="container">
      <h1>Terms of Service</h1>
      <p>Operating Entity: Ziro Systems Private Limited • Alappat Buildings, No. VII/27-E, Muthuvara, Puzhakkal (P.O), Thrissur, Kerala – 680553, India</p>
    </div>
  </section>

  <main class="container">
    ${termsBody}
  </main>
`;
fs.writeFileSync('terms.html', wrapPage('Terms of Service — WatsBuy', 'Official Terms of Service for WatsBuy, operated by Ziro Systems Private Limited.', 'terms', termsContent), 'utf8');
console.log('Saved terms.html');

// 4. REFUND.HTML
const refundContent = `
  <section class="legal-hero">
    <div class="container">
      <h1>Cancellation &amp; Refund Policy</h1>
      <p>Operating Entity: Ziro Systems Private Limited • Alappat Buildings, No. VII/27-E, Muthuvara, Puzhakkal (P.O), Thrissur, Kerala – 680553, India</p>
    </div>
  </section>

  <main class="container">
    ${refundBody}
  </main>
`;
fs.writeFileSync('refund.html', wrapPage('Cancellation & Refund Policy — WatsBuy', 'Official Cancellation & Refund Policy for WatsBuy, operated by Ziro Systems Private Limited.', 'refund', refundContent), 'utf8');
console.log('Saved refund.html');

// 5. SHIPPING.HTML
const shippingContent = `
  <section class="legal-hero">
    <div class="container">
      <h1>Shipping &amp; Delivery Policy</h1>
      <p>Operating Entity: Ziro Systems Private Limited • Alappat Buildings, No. VII/27-E, Muthuvara, Puzhakkal (P.O), Thrissur, Kerala – 680553, India</p>
    </div>
  </section>

  <main class="container">
    ${shippingBody}
  </main>
`;
fs.writeFileSync('shipping.html', wrapPage('Shipping & Delivery Policy — WatsBuy', 'Official Shipping & Delivery Policy for WatsBuy, operated by Ziro Systems Private Limited.', 'shipping', shippingContent), 'utf8');
console.log('Saved shipping.html');

