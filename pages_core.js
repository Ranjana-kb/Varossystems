const fs = require('fs');
const path = require('path');
const { wrapPage } = require('./build_site');

console.log('Building Core Pages (index.html, why-watsbuy.html)...');

const DEMO_URL = 'demo.html';

// ==========================================
// 1. INDEX.HTML (Home)
// ==========================================
// Note: Abandoned-cart recovery calculator is removed completely per requirement.
const indexBody = `
  <!-- Hero Section -->
  <section class="page-hero">
    <div class="container hero-split-grid">
      <div>
        <div class="eyebrow"><span class="dot"></span> THE WHATSAPP-BASED E-COMMERCE SAAS PLATFORM</div>
        <h1 style="font-size:clamp(34px,4.2vw,54px);line-height:1.06;letter-spacing:-2.2px;margin:16px 0 14px;font-weight:850;color:var(--navy);">
          Transform WhatsApp into a <em class="text-green" style="font-style:normal;">Powerful Digital Storefront</em>
        </h1>
        <p style="font-size:16px;line-height:1.65;color:var(--slate);max-width:540px;margin:0 0 20px;">
          Transform WhatsApp into a powerful digital storefront with WatsBuy, your all-in-one conversational commerce platform. Enable customers to discover products, place orders, make payments, and track purchases—all within WhatsApp. Drive more sales with bulk broadcasting, smart retargeting campaigns, and automated customer engagement.
        </p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px;">
          <a class="btn btn-primary" href="trial.html" onclick="openTrialModal('', event)">7 Day Free Trial</a>
          <a class="btn btn-outline" href="why-watsbuy.html">Why WatsBuy? →</a>
        </div>
        <div style="font-size:13px;color:var(--navy);display:flex;align-items:center;gap:16px;flex-wrap:wrap;font-weight:700;">
          <span><strong class="text-green">✓</strong> <strong>Zero app downloads</strong></span>
          <span><strong class="text-green">✓</strong> <strong>Direct in-chat checkout</strong></span>
          <span><strong class="text-green">✓</strong> <strong>Seamless UPI &amp; card payments</strong></span>
        </div>
      </div>

      <div style="position:relative;">
        <div class="workspace-demo-container">
          <!-- Subtle Animated Floating Commerce Cards -->
          <div class="floating-commerce-card floating-product-card" aria-hidden="true">
            <div class="f-card-icon">🛍️</div>
            <div class="f-card-body">
              <span class="f-card-title">Live Storefront</span>
              <span class="f-card-meta">In-Chat Catalogue</span>
            </div>
            <span class="f-card-badge">Added to Cart ✓</span>
          </div>

          <div class="floating-commerce-card floating-order-indicator" aria-hidden="true">
            <span class="pulse-indicator-dot"></span>
            <div class="f-card-body">
              <span class="f-card-title">WhatsApp Order Confirmed</span>
              <span class="f-card-meta">2-Tap Flows Checkout</span>
            </div>
            <span class="f-card-tag">Live ⚡</span>
          </div>

          <!-- Simulated Cursor Contained Within Illustration -->
          <div class="simulated-cursor-track" aria-hidden="true">
            <div class="simulated-cursor">
              <svg class="cursor-pointer-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 3.5L11.5 21L14.8 14.2L21.5 11L4.5 3.5Z" fill="#0A1C44" stroke="#FFFFFF" stroke-width="1.75" stroke-linejoin="round"/>
              </svg>
              <span class="cursor-ripple"></span>
              <span class="cursor-label">Merchant Demo</span>
            </div>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line);padding-bottom:12px;margin-bottom:12px;">
            <div style="font-weight:800;font-size:13.5px;display:flex;align-items:center;gap:8px;">
              <span>🛍️</span> <span>WatsBuy Live Merchant Workspace</span>
            </div>
            <span style="font-size:10px;color:var(--green);background:var(--mint);padding:3px 8px;border-radius:20px;font-weight:750;">● DEMO PREVIEW</span>
          </div>

          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:12px;">
            <div style="background:var(--grey-bg);border:1px solid var(--line);border-radius:12px;padding:10px;">
              <small style="display:block;font-size:9.5px;color:var(--slate);font-weight:600;text-transform:uppercase;">Demo Orders</small>
              <strong style="display:block;font-size:19px;letter-spacing:-0.8px;margin:3px 0 1px;">248</strong>
              <span style="font-size:9.5px;color:var(--green);font-weight:700;">Sample data</span>
            </div>
            <div style="background:var(--grey-bg);border:1px solid var(--line);border-radius:12px;padding:10px;">
              <small style="display:block;font-size:9.5px;color:var(--slate);font-weight:600;text-transform:uppercase;">Illustrative Sales</small>
              <strong style="display:block;font-size:19px;letter-spacing:-0.8px;margin:3px 0 1px;">₹3.7L</strong>
              <span style="font-size:9.5px;color:var(--green);font-weight:700;">Modelled</span>
            </div>
            <div style="background:var(--grey-bg);border:1px solid var(--line);border-radius:12px;padding:10px;">
              <small style="display:block;font-size:9.5px;color:var(--slate);font-weight:600;text-transform:uppercase;">Avg. Order</small>
              <strong style="display:block;font-size:19px;letter-spacing:-0.8px;margin:3px 0 1px;">₹1.5k</strong>
              <span style="font-size:9.5px;color:var(--green);font-weight:700;">Average</span>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 0.95fr;gap:12px;">
            <div style="border:1px solid var(--line);border-radius:12px;padding:12px;background:#fff;">
              <div style="font-size:11px;font-weight:800;display:flex;justify-content:space-between;">
                <span>In-Chat Conversions</span> <span style="color:#81908c;font-weight:normal">Hourly demo</span>
              </div>
              <div style="height:80px;display:flex;align-items:flex-end;gap:5px;padding-top:10px;">
                <div style="flex:1;background:linear-gradient(180deg,#16B04B,#CFE8D9);height:35%;border-radius:3px;"></div>
                <div style="flex:1;background:linear-gradient(180deg,#16B04B,#CFE8D9);height:50%;border-radius:3px;"></div>
                <div style="flex:1;background:linear-gradient(180deg,#16B04B,#CFE8D9);height:42%;border-radius:3px;"></div>
                <div style="flex:1;background:linear-gradient(180deg,#16B04B,#CFE8D9);height:70%;border-radius:3px;"></div>
                <div style="flex:1;background:linear-gradient(180deg,#16B04B,#CFE8D9);height:58%;border-radius:3px;"></div>
                <div style="flex:1;background:linear-gradient(180deg,#16B04B,#CFE8D9);height:85%;border-radius:3px;"></div>
                <div style="flex:1;background:linear-gradient(180deg,#16B04B,#CFE8D9);height:75%;border-radius:3px;"></div>
                <div style="flex:1;background:linear-gradient(180deg,#16B04B,#CFE8D9);height:96%;border-radius:3px;"></div>
              </div>
            </div>

            <div style="border:1px solid var(--line);border-radius:12px;padding:12px;background:#fff;">
              <div style="font-size:11px;font-weight:800;margin-bottom:8px;">Recent Live Events</div>
              <div style="display:flex;align-items:center;gap:8px;font-size:11px;margin-bottom:6px;color:#536271;">
                <div style="width:22px;height:22px;border-radius:6px;background:var(--mint);color:var(--green);display:grid;place-items:center;font-size:10px;flex-shrink:0;">✓</div>
                <div><strong>Order confirmed</strong><div style="font-size:9.5px;color:#8090a0">WhatsApp Flow cart · just now</div></div>
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:11px;margin-bottom:6px;color:#536271;">
                <div style="width:22px;height:22px;border-radius:6px;background:var(--mint);color:var(--green);display:grid;place-items:center;font-size:10px;flex-shrink:0;">✦</div>
                <div><strong>Customer viewed catalogue</strong><div style="font-size:9.5px;color:#8090a0">Variant inquiry · 2m ago</div></div>
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:11px;color:#536271;">
                <div style="width:22px;height:22px;border-radius:6px;background:var(--mint);color:var(--green);display:grid;place-items:center;font-size:10px;flex-shrink:0;">↻</div>
                <div><strong>Cart recovery nudged</strong><div style="font-size:9.5px;color:#8090a0">Automated flow · 5m ago</div></div>
              </div>
            </div>
          </div>
          <div style="margin-top:10px;font-size:10px;color:var(--slate);text-align:right;">
            ILLUSTRATIVE PREVIEW · WORKSPACE DEMONSTRATION
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- Market Shift (50M Reference) -->
  <section class="section section-soft" id="market-shift">
    <div class="container">
      <div class="section-head" style="margin-bottom:28px;">
        <span class="section-kicker">Market Shift</span>
        <h2>Your Customers Are Already on WhatsApp</h2>
        <p>Reach shoppers, share your catalogue, and take orders in the app they already use.</p>
      </div>

      <div class="market-shift-grid">
        <div class="market-shift-card">
          <div class="market-shift-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          </div>
          <div class="market-shift-val">3B+</div>
          <div class="market-shift-desc">Monthly active WhatsApp users worldwide</div>
        </div>

        <div class="market-shift-card">
          <div class="market-shift-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div class="market-shift-val">2B+</div>
          <div class="market-shift-desc">People use WhatsApp every day</div>
        </div>

        <div class="market-shift-card">
          <div class="market-shift-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
          <div class="market-shift-val">1.5B</div>
          <div class="market-shift-desc">Daily users of WhatsApp Updates</div>
        </div>

        <div class="market-shift-card">
          <div class="market-shift-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><circle cx="8" cy="10" r="1" fill="currentColor"></circle><circle cx="12" cy="10" r="1" fill="currentColor"></circle><circle cx="16" cy="10" r="1" fill="currentColor"></circle></svg>
          </div>
          <div class="market-shift-val">175M+</div>
          <div class="market-shift-desc">People messaged a WhatsApp Business account daily</div>
        </div>
      </div>

      <div class="market-shift-banner">
        <div class="market-shift-banner-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        </div>
        <div class="market-shift-banner-text">
          Bring your storefront, offers, orders, and customer support to WhatsApp with WatsBuy.
        </div>
      </div>
    </div>
  </section>

  <!-- The 5-Step WhatsApp Commerce Experience (Customer Journey) -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="section-kicker">END-TO-END CUSTOMER JOURNEY</span>
        <h2>The 5-Step WhatsApp Commerce Experience.</h2>
        <p>From customer engagement to repeat purchases—WatsBuy simplifies the entire shopping journey within WhatsApp.</p>
      </div>

      <div class="flow-track-5">
        <div class="flow-step-card">
          <div class="flow-num-badge">01</div>
          <h4>Broadcast &amp; Engage</h4>
          <p>Reach opted-in customers through targeted bulk broadcasts, promotional offers, and Meta-approved WhatsApp message templates.</p>
        </div>
        <div class="flow-step-card">
          <div class="flow-num-badge">02</div>
          <h4>Discover &amp; Explore</h4>
          <p>Customers browse interactive product catalogues, explore categories, view product details, and select their preferred items directly within WhatsApp.</p>
        </div>
        <div class="flow-step-card">
          <div class="flow-num-badge">03</div>
          <h4>Cart &amp; Checkout</h4>
          <p>Simplify purchasing with WhatsApp Flows, enabling customers to review their cart, select product variants, and confirm delivery details without switching applications.</p>
        </div>
        <div class="flow-step-card">
          <div class="flow-num-badge">04</div>
          <h4>Payment &amp; Order Tracking</h4>
          <p>Accept payments through supported UPI, credit/debit cards, net banking, or Cash on Delivery. Provide automated order confirmations, status updates, and delivery notifications.</p>
        </div>
        <div class="flow-step-card">
          <div class="flow-num-badge">05</div>
          <h4>One WhatsApp Number</h4>
          <p>No need to revisit a website or download an app. Customers simply send “Hi” to explore products, access My Account, discover offers, track orders, get support, or contact your team.</p>
        </div>
      </div>

      <!-- 3 Product Suites -->
      <div class="cards-grid-3" style="margin-top:32px;">
        <div class="feature-box">
          <div class="box-icon">🛍️</div>
          <h3>1. WhatsApp Storefront &amp; Catalogue Suite</h3>
          <p>Transform your business WhatsApp number into a 24/7 digital storefront. Let customers explore products, browse categories, select variants, view offers, and access My Account—all within a single WhatsApp conversation, without visiting a website or installing an app.</p>
        </div>
        <div class="feature-box">
          <div class="box-icon">💳</div>
          <h3>2. Checkout, Payments &amp; Order Management Suite</h3>
          <p>Simplify shopping with interactive WhatsApp Flows for cart review, address confirmation, and order placement. Accept payments through supported Indian and international payment gateways, manage orders centrally, and keep customers informed with automated order updates.</p>
        </div>
        <div class="feature-box">
          <div class="box-icon">📈</div>
          <h3>3. Marketing, Retargeting &amp; Customer Engagement Suite</h3>
          <p>Reach customers directly through Meta-approved bulk broadcasts, targeted promotional campaigns, and abandoned-cart recovery. Build lasting customer relationships with personalized offers, automated notifications, order tracking, and integrated customer support—all through one WhatsApp number.</p>
        </div>
      </div>

    </div>
  </section>

  <!-- The 8 Core Pillars of WatsBuy -->
  <section class="section section-soft">
    <div class="container">
      <div class="section-head">
        <span class="section-kicker">One Platform. One WhatsApp Number. Complete Commerce.</span>
        <h2>The 8 Core Pillars of WatsBuy.</h2>
        <p>WatsBuy brings together everything businesses need to sell, manage orders, engage customers, and drive repeat purchases—all through WhatsApp, without requiring customers to visit a website or download an app.</p>
      </div>

      <div class="cards-grid-4">
        <div class="feature-box">
          <div class="box-icon">01</div>
          <h3>WhatsApp Digital Storefront</h3>
          <p>Transform your business WhatsApp number into a 24/7 interactive shopping destination. Customers can explore product categories, browse catalogues, view product details, and discover offers directly within WhatsApp.</p>
        </div>
        <div class="feature-box">
          <div class="box-icon">02</div>
          <h3>Catalogue &amp; Order Management</h3>
          <p>Manage products, pricing, variants, inventory, and customer orders from one centralized dashboard. Track order status, manage fulfilment, and send automated order notifications.</p>
        </div>
        <div class="feature-box">
          <div class="box-icon">03</div>
          <h3>Payments &amp; Checkout</h3>
          <p>Enable convenient purchasing through integrated payment gateways supporting UPI, credit/debit cards, net banking, and Cash on Delivery, subject to merchant and gateway availability.</p>
        </div>
        <div class="feature-box">
          <div class="box-icon">04</div>
          <h3>WhatsApp Flows &amp; Automation</h3>
          <p>Simplify customer interactions with Meta WhatsApp Flows and automated workflows for product selection, checkout, delivery details, order enquiries, and customer service.</p>
        </div>
        <div class="feature-box">
          <div class="box-icon">05</div>
          <h3>Bulk Broadcasting &amp; Campaigns</h3>
          <p>Reach opted-in customers through Meta-approved WhatsApp templates, promotional broadcasts, new arrivals, seasonal offers, and targeted marketing campaigns.</p>
        </div>
        <div class="feature-box">
          <div class="box-icon">06</div>
          <h3>My Account &amp; Customer Self-Service</h3>
          <p>Let customers simply send "Hi" to access My Account, explore products, view offers, track orders, request support, or contact your business—all through the same WhatsApp number.</p>
        </div>
        <div class="feature-box">
          <div class="box-icon">07</div>
          <h3>Customer Support &amp; Engagement</h3>
          <p>Manage customer enquiries, complaints, returns, and service requests through a centralized customer support dashboard, with conversation history and team collaboration.</p>
        </div>
        <div class="feature-box">
          <div class="box-icon">08</div>
          <h3>Retargeting &amp; Cart Recovery</h3>
          <p>Reconnect with potential buyers through abandoned-cart reminders, personalized promotions, customer segmentation, and targeted retargeting campaigns to encourage repeat purchases.</p>
        </div>
      </div>

    </div>
  </section>
`;

fs.writeFileSync('index.html', wrapPage('The WhatsApp-Based E-Commerce SaaS Platform', 'Turn WhatsApp into your complete digital storefront. Showcase catalogues, answer customer queries, and take in-chat orders.', 'home', indexBody), 'utf8');
console.log('Saved index.html');


// =========================================================================
// 2. WHY-WATSBUY.HTML (Why WatsBuy? — Unified Landing Page Theme)
// =========================================================================
const whyBody = `
  <!-- Hero Section -->
  <section class="page-hero" id="home">
    <div class="container hero-split-grid">
      <div>
        <div class="eyebrow"><span class="dot"></span> THE CONVERSATION-FIRST ADVANTAGE</div>
        <h1 style="font-size:clamp(32px,3.8vw,48px);line-height:1.1;letter-spacing:-1.8px;margin:16px 0 12px;font-weight:850;color:var(--navy);">
          Why Wait for Customers to Find Your Store?<br><em class="text-green" style="font-style:normal;">Bring Your Store to Where Your Customers Already Are.</em>
        </h1>
        <p style="font-size:17px;font-weight:750;color:var(--green);margin:0 0 12px;">
          Reach. Engage. Sell. Repeat.
        </p>
        <p style="font-size:15.5px;line-height:1.65;color:var(--slate);max-width:540px;margin:0 0 16px;">
          Move beyond traditional e-commerce. Stop waiting for website visits and start reaching customers directly on WhatsApp. Showcase products, launch targeted campaigns, simplify checkout, and turn everyday conversations into lasting customer relationships.
        </p>
        <div style="font-size:13.5px;color:var(--navy);font-weight:700;line-height:1.5;margin-bottom:20px;">
          One WhatsApp Number. Your Entire Store. Unlimited Possibilities.<br>
          <span class="text-green">Stop Waiting for Customers. Start Reaching Them.</span>
        </div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">
          <a class="btn btn-primary" href="pricing.html">View Pricing Plans →</a>
          <a class="btn btn-outline" href="solutions.html">Explore Solutions</a>
        </div>
        <div style="font-size:12px;color:var(--slate);display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
          <span>✓ Zero app downloads</span>
          <span>✓ Direct in-chat checkout</span>
          <span>✓ Conversational engagement</span>
        </div>
      </div>

      <div style="display:flex;justify-content:center;align-items:center;">
        <div style="background:#fff;border:1px solid var(--line);border-radius:20px;padding:16px;box-shadow:var(--shadow);max-width:560px;width:100%;">
          <img src="assets/images/why-watsbuy-visual.png" alt="WatsBuy WhatsApp conversational storefront interface with interactive catalogue, 2-tap flows checkout, and live order tracking" style="width:100%;height:auto;border-radius:12px;display:block;">
        </div>
      </div>

    </div>
  </section>

  <!-- Key Value Pillars -->
  <section class="section section-soft" id="key-pillars">
    <div class="container">
      <div class="metrics-row">
        <div class="metric-card">
          <div class="stat-val green" style="font-size:24px;">Direct</div>
          <div class="stat-label">Messaging Reach</div>
          <div class="stat-desc">Connect with shoppers in the messaging app they use every single day.</div>
        </div>
        <div class="metric-card">
          <div class="stat-val green" style="font-size:24px;">Native</div>
          <div class="stat-label">Flows Checkout</div>
          <div class="stat-desc">Fast, intuitive 2-tap in-chat order confirmation with zero web redirects.</div>
        </div>
        <div class="metric-card">
          <div class="stat-val green" style="font-size:24px;">Zero</div>
          <div class="stat-label">App Barrier</div>
          <div class="stat-desc">Customers purchase without installing new apps or creating new passwords.</div>
        </div>
        <div class="metric-card">
          <div class="stat-val green" style="font-size:24px;">Unified</div>
          <div class="stat-label">One Number Store</div>
          <div class="stat-desc">From discovery to checkout, payment, tracking, and ongoing support.</div>
        </div>
      </div>

    </div>
  </section>

  <!-- The Core Problem & 7 Touchpoints -->
  <section class="section">
    <div class="container">
      <div class="problem-split-grid">
        <div>
          <div class="eyebrow"><span class="dot"></span> THE CORE PROBLEM</div>
          <h2 style="font-size:clamp(28px,3.2vw,40px);line-height:1.15;letter-spacing:-1.4px;margin:14px 0 12px;font-weight:850;color:var(--navy);">
            Commerce Is Still<br><em class="text-green" style="font-style:normal;">Website-First.</em>
          </h2>
          <p style="font-size:15.5px;line-height:1.65;color:var(--slate);margin:0;">
            Traditional webstores force shoppers through a fragmented customer journey with 7 disconnected touchpoints — and 7 distinct places to lose the sale.
          </p>
        </div>

        <div class="journey-card">
          <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line);padding-bottom:12px;margin-bottom:12px;">
            <span style="font-size:11px;font-weight:800;letter-spacing:0.8px;color:var(--navy);text-transform:uppercase;">
              Fragmented Journey: 7 Disconnected Touchpoints
            </span>
            <span style="font-size:10px;color:#E11D48;background:#FFF0F3;padding:3px 8px;border-radius:20px;font-weight:750;">
              High Friction
            </span>
          </div>

          <div class="journey-track">
            <div class="journey-step">
              <div class="journey-icon">▣</div>
              <b>Website</b>
              <small>sees ad</small>
            </div>
            <div class="journey-step">
              <div class="journey-icon">⌕</div>
              <b>Search</b>
              <small>opens browser</small>
            </div>
            <div class="journey-step">
              <div class="journey-icon">▧</div>
              <b>Browse</b>
              <small>creates account</small>
            </div>
            <div class="journey-step">
              <div class="journey-icon">🛒</div>
              <b>Cart</b>
              <small>fills address</small>
            </div>
            <div class="journey-step">
              <div class="journey-icon">▤</div>
              <b>Payment</b>
              <small>fills payment</small>
            </div>
            <div class="journey-step highlight">
              <div class="journey-icon">◉</div>
              <b style="color:var(--green);">WhatsApp</b>
              <span style="display:inline-block;background:var(--mint);color:var(--green);font-size:11px;font-weight:800;padding:2px 6px;border-radius:6px;margin-bottom:3px;">Direct</span>
              <small style="color:var(--green);font-weight:600;">messages</small>
            </div>
            <div class="journey-step">
              <div class="journey-icon">☏</div>
              <b>Support</b>
              <span style="display:inline-block;background:#EBF3F8;color:var(--navy);font-size:11px;font-weight:800;padding:2px 6px;border-radius:6px;margin-bottom:3px;">Help</span>
              <small>assistance</small>
            </div>
          </div>
        </div>
      </div>

      <!-- 3 Pain Points Cards -->
      <div class="cards-grid-3" style="margin-top:28px;">
        <div class="feature-box" style="background:#FFF9FB;border-color:#FDE2E8;">
          <div class="box-icon" style="background:#FFE6EE;color:#E11D48;">⚠</div>
          <h3>High Friction &amp; Costs</h3>
          <p>Separate web domains, disconnected apps, clunky redirects, and rapidly escalating customer acquisition costs.</p>
        </div>
        <div class="feature-box" style="background:#FFF9FB;border-color:#FDE2E8;">
          <div class="box-icon" style="background:#FFE6EE;color:#E11D48;">☏</div>
          <h3>Fragmented Communication</h3>
          <p>Low repeat engagement, lost emails, and ineffective retention across siloed messaging tools and webstore logins.</p>
        </div>
        <div class="feature-box" style="background:#FFF9FB;border-color:#FDE2E8;">
          <div class="box-icon" style="background:#FFE6EE;color:#E11D48;">♧</div>
          <h3>SMB Technology Struggle</h3>
          <p>Merchant struggle with complex plugin stacks, slow website loading, and abandoned storefronts that fail to convert.</p>
        </div>
      </div>

    </div>
  </section>

  <!-- Head to Head Comparison -->
  <section class="section section-soft" id="comparison">
    <div class="container">
      <div class="section-head">
        <div class="eyebrow"><span class="dot"></span> HEAD TO HEAD COMPARISON</div>
        <h2 style="font-size:clamp(28px,3.2vw,40px);letter-spacing:-1.4px;font-weight:850;color:var(--navy);margin:14px 0 10px;">
          Webstore vs. SMS vs. <em class="text-green" style="font-style:normal;">WatsBuy.</em>
        </h2>
        <p style="font-size:15.5px;color:var(--slate);max-width:640px;margin:0 auto;">
          A direct comparison across channel capability, checkout friction, and engagement workflows.
        </p>
      </div>

      <div class="table-wrapper">
        <table class="comp-table">
          <thead>
            <tr>
              <th style="width:28%;">Capability</th>
              <th style="width:24%;">🌐 &nbsp;Traditional Webstore</th>
              <th style="width:22%;">💬 &nbsp;SMS Marketing</th>
              <th class="col-highlight" style="width:26%;">◉ &nbsp;WatsBuy (WhatsApp Commerce)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>◉ &nbsp;Where the sale happens</strong></td>
              <td>Browser redirect (new external tabs)</td>
              <td>Link to website (redirect)</td>
              <td class="col-highlight"><span class="text-green" style="font-weight:800;margin-right:6px;">✓</span> Inside the chat (Native storefront)</td>
            </tr>
            <tr>
              <td><strong>◉ &nbsp;Customer Experience</strong></td>
              <td>Disconnected web pages &amp; logins</td>
              <td>Text-only links (no visuals)</td>
              <td class="col-highlight"><span class="text-green" style="font-weight:800;margin-right:6px;">✓</span> Interactive product cards &amp; catalogues</td>
            </tr>
            <tr>
              <td><strong>▣ &nbsp;Checkout Flow</strong></td>
              <td>Multi-step checkout (forms, logins, redirects)</td>
              <td>External web redirect</td>
              <td class="col-highlight"><span class="text-green" style="font-weight:800;margin-right:6px;">✓</span> 2 taps (WhatsApp Flows)</td>
            </tr>
            <tr>
              <td><strong>◉ &nbsp;Product Guidance</strong></td>
              <td>External web search or plugin</td>
              <td>Not possible</td>
              <td class="col-highlight"><span class="text-green" style="font-weight:800;margin-right:6px;">✓</span> Built-in conversational catalogue assistance</td>
            </tr>
            <tr>
              <td><strong>▥ &nbsp;Product Broadcasting</strong></td>
              <td>Not supported natively</td>
              <td>Text-only messages (no visuals)</td>
              <td class="col-highlight"><span class="text-green" style="font-weight:800;margin-right:6px;">✓</span> Rich media catalogues &amp; collections</td>
            </tr>
            <tr>
              <td><strong>▣ &nbsp;Re-engagement &amp; Recovery</strong></td>
              <td>Email only (frequently filtered into spam)</td>
              <td>Generic blast (low response)</td>
              <td class="col-highlight"><span class="text-green" style="font-weight:800;margin-right:6px;">✓</span> Personalized in-chat recovery &amp; support</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Architectural Advantage Split Grid -->
      <div class="arch-split-grid" style="margin-top:36px;">
        <div>
          <div class="eyebrow"><span class="dot"></span> ARCHITECTURAL ADVANTAGE</div>
          <h2 style="font-size:clamp(26px,2.8vw,36px);letter-spacing:-1.2px;font-weight:850;color:var(--navy);margin:14px 0 10px;line-height:1.18;">
            Web-First vs. <em class="text-green" style="font-style:normal;">Conversation-First</em> Architecture.
          </h2>
          <p style="font-size:15px;line-height:1.65;color:var(--slate);margin:0;">
            Positioning: WatsBuy is designed around the conversation, not the website.
          </p>
        </div>

        <div class="table-wrapper" style="margin:0;">
          <table class="comp-table">
            <thead>
              <tr>
                <th style="width:40%;">Core Architectural Feature</th>
                <th style="width:30%;">Traditional Web-First Platforms</th>
                <th class="col-highlight" style="width:30%;">◉ &nbsp;WatsBuy (Conversation-First)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>🌐 Website commerce capability</strong></td>
                <td>✓ Standard web storefront</td>
                <td class="col-highlight"><span class="text-green" style="font-weight:800;margin-right:6px;">✓</span> Supported web catalogue integration</td>
              </tr>
              <tr>
                <td><strong>◉ WhatsApp-first architecture</strong></td>
                <td>✕ Not possible natively (requires external apps)</td>
                <td class="col-highlight"><span class="text-green" style="font-weight:800;margin-right:6px;">✓</span> Native WhatsApp architecture</td>
              </tr>
              <tr>
                <td><strong>◉ WhatsApp Flows native checkout</strong></td>
                <td>✕ Redirects to external mobile web browser</td>
                <td class="col-highlight"><span class="text-green" style="font-weight:800;margin-right:6px;">✓</span> Native multi-step checkout inside WhatsApp</td>
              </tr>
              <tr>
                <td><strong>♩ Broadcast marketing &amp; Meta templates</strong></td>
                <td>✕ Fragmented SMS/email with low open rates</td>
                <td class="col-highlight"><span class="text-green" style="font-weight:800;margin-right:6px;">✓</span> Direct WhatsApp broadcasts with high read rates</td>
              </tr>
              <tr>
                <td><strong>▣ Automated customer re-engagement</strong></td>
                <td>✕ Fragmented email &amp; SMS blasts</td>
                <td class="col-highlight"><span class="text-green" style="font-weight:800;margin-right:6px;">✓</span> Automated 2-way in-chat re-engagement</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style="margin-top:36px;border-radius:18px;overflow:hidden;border:1px solid var(--line);box-shadow:var(--shadow-sm);">
        <img src="assets/images/merchant-working.jpg" alt="Retail merchant managing WhatsApp catalogue inventory and customer orders on a laptop" style="width:100%;max-height:420px;object-fit:cover;display:block;">
      </div>

    </div>
  </section>

  <!-- Enterprise Trust & Governance -->
  <section class="section">
    <div class="container">
      <div style="background: linear-gradient(135deg, var(--navy) 0%, var(--teal) 100%); color: #FFFFFF; border-radius: 18px; padding: 28px 32px; margin-bottom: 24px; box-shadow: var(--shadow);">
        <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap;">
          <div style="width:48px;height:48px;border-radius:12px;background:rgba(255,255,255,0.12);display:grid;place-items:center;font-size:24px;flex-shrink:0;">⬡</div>
          <div style="flex:1;min-width:280px;">
            <div style="font-size:11px;font-weight:800;letter-spacing:1px;color:var(--mint-accent);text-transform:uppercase;margin-bottom:4px;">
              Enterprise Trust &amp; Governance
            </div>
            <h3 style="color:#FFFFFF;margin:0 0 6px;font-size:22px;letter-spacing:-0.6px;font-weight:850;">
              Meta Cloud API Compliance.
            </h3>
            <p style="color:#CFE3EA;margin:0;font-size:14.5px;line-height:1.55;">
              Built strictly according to Meta's Business Messaging guidelines to guarantee high deliverability and customer privacy.
            </p>
          </div>
        </div>
      </div>

      <div class="cards-grid-4">
        <div class="feature-box">
          <div class="box-icon">♙</div>
          <h3>End-to-End Encryption</h3>
          <p>Customer communications adhere to Meta's enterprise security protocols and cloud data standards.</p>
        </div>
        <div class="feature-box">
          <div class="box-icon">⬡</div>
          <h3>DPDP &amp; GDPR Aligned</h3>
          <p>Built with granular opt-in consent controls and privacy protection compliant with Indian and global laws.</p>
        </div>
        <div class="feature-box">
          <div class="box-icon">☁</div>
          <h3>Official Meta Cloud API</h3>
          <p>Zero risk of account bans from unauthorized scrapers. Direct verified connection with Meta.</p>
        </div>
        <div class="feature-box">
          <div class="box-icon">✓</div>
          <h3>Green Tick Verification</h3>
          <p>Full onboarding assistance to help eligible brand accounts achieve the official Meta verified badge.</p>
        </div>
      </div>

      <!-- Legal Disclaimer -->
      <div style="background:var(--grey-bg);border:1px solid var(--line);border-radius:14px;padding:22px;margin-top:32px;font-size:12px;color:var(--slate);line-height:1.65;">
        <strong style="color:var(--navy);">Legal Disclaimer:</strong> All statistics, conversion rates, customer engagement metrics, and performance comparisons are illustrative or based on third-party industry references and do not represent independently verified WatsBuy results or guaranteed outcomes. Actual performance may vary depending on business operations, customer behaviour, and market conditions. Platform features, Meta approvals, payment integrations, and service availability are subject to eligibility, technical limitations, and third-party policies. WatsBuy is not responsible for third-party disruptions or resulting business losses to the extent permitted by applicable law. All services are governed by our Terms of Service and applicable policies.
      </div>
    </div>
  </section>
`;

fs.writeFileSync('why-watsbuy.html', wrapPage('Why WatsBuy? — The Conversation-First Advantage', 'Why WatsBuy: Bring your store to where your customers already are on WhatsApp. Reach, engage, sell, and repeat with conversational commerce.', 'why-watsbuy', whyBody), 'utf8');
console.log('Saved why-watsbuy.html (unified with landing page theme)');

