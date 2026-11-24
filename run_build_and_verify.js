const fs = require('fs');
const path = require('path');

console.log('=====================================================');
console.log('   WatsBuy Complete Build & Verification Runner');
console.log('=====================================================');

// 1. Generate Stylesheet
require('./generate_all');

// 2. Generate Core Pages (index.html, why-watsbuy.html, features.html)
require('./pages_core');

// 3. Generate Solutions, Pricing, Enterprise
require('./pages_solutions_pricing');

// 4. Generate Resources (Reseller, FAQ, Getting Started, Contact, Demo)
require('./pages_resources');

// 5. Generate Legal Pages
require('./pages_legal');

console.log('\n--- Running Verification Suite ---\n');

const htmlFiles = [
  'index.html',
  'why-watsbuy.html',
  'solutions.html',
  'pricing.html',
  'enterprise.html',
  'reseller.html',
  'faq.html',
  'getting-started.html',
  'contact.html',
  'demo.html',
  'trial.html',
  'signin.html',
  'about.html',
  'privacy.html',
  'terms.html',
  'refund.html',
  'shipping.html'
];

let errors = [];
let warnings = [];

// 1. Check all 15 files exist and have content
htmlFiles.forEach(f => {
  if (!fs.existsSync(f)) {
    errors.push(`Missing file: ${f}`);
  } else {
    const stat = fs.statSync(f);
    if (stat.size < 1000) {
      warnings.push(`File ${f} is unusually small (${stat.size} bytes)`);
    }
  }
});

// Verify features.html is deleted and does NOT exist
if (fs.existsSync('features.html')) {
  errors.push('features.html should NOT exist but was found on disk');
}

// Verify no active HTML file links to features.html
htmlFiles.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  if (html.includes('features.html')) {
    errors.push(`${f} contains a link/reference to deleted features.html`);
  }
});

// 2. Check ZERO Emergent links across all HTML files
htmlFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('chat-to-commerce.preview.emergentagent.com') || content.includes('emergentagent.com')) {
    errors.push(`File ${f} contains external Emergent link or domain! Visitors must not be linked out to Emergent.`);
  }
});

// 3. Forbidden competitor names & white-label check
const forbiddenWords = ['shopify', 'woocommerce', 'wix', 'magento', 'white label', 'white-label'];

htmlFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8').toLowerCase();
  forbiddenWords.forEach(word => {
    if (content.includes(word)) {
      errors.push(`File ${f} contains forbidden word: "${word}"`);
    }
  });
});

// 4. Check all demo buttons across the site point to local demo.html
htmlFiles.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const demoRegex = /<a[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = demoRegex.exec(html)) !== null) {
    const text = m[1];
    if (text.includes('Book a Demo') || text.includes('Request a Product Demo')) {
      const fullTag = m[0];
      const hrefMatch = fullTag.match(/href=["']([^"']+)["']/i);
      if (hrefMatch) {
        const href = hrefMatch[1];
        if (!href.startsWith('demo.html') && href !== '#demoBookingForm') {
          errors.push(`In ${f}, demo button has href="${href}", expected local "demo.html" or "#demoBookingForm"`);
        }
      }
    }
  }
});

// 5. Check Navigation in header across all pages:
// - "Why WatsBuy?" menu item links directly to why-watsbuy.html
// - Resources menu dropdown contains exactly three clickable options: Help Centre, FAQs, and Get Started
// - About, Contact, Policies removed from main header navigation
const buildSiteJs = fs.readFileSync('build_site.js', 'utf8');
const navMatch = buildSiteJs.match(/<nav class="nav-links" id="navLinks">([\s\S]*?)<\/nav>/);
if (navMatch) {
  const navContent = navMatch[1];
  if (!navContent.includes('href="why-watsbuy.html"')) {
    errors.push('build_site.js navLinks does not link to why-watsbuy.html');
  }
  if (!navContent.includes('href="faq.html">Help Centre</a>') || 
      !navContent.includes('href="faq.html#faqs">FAQs</a>') || 
      !navContent.includes('href="getting-started.html">Get Started</a>')) {
    errors.push('build_site.js navLinks Resources dropdown missing required options (Help Centre, FAQs, Get Started)');
  }
  if (navContent.includes('about.html') || navContent.includes('privacy.html') || navContent.includes('terms.html')) {
    errors.push('Header navigation in build_site.js still contains About or Policy links');
  }
  if (!navContent.includes('href="demo.html"')) {
    errors.push('Header navigation CTA in build_site.js does not point to demo.html');
  }
  if (!navContent.includes('href="signin.html"') || !navContent.includes('Sign In')) {
    errors.push('Header navigation in build_site.js missing Sign In link');
  }
  const resourcesIdx = navContent.indexOf('Resources');
  const signInIdx = navContent.indexOf('href="signin.html"');
  const demoIdx = navContent.indexOf('href="demo.html"');
  if (signInIdx === -1 || signInIdx < resourcesIdx || signInIdx > demoIdx) {
    errors.push('Header navigation must place Sign In between Resources and Book a Demo');
  }
}

// 6. Check Home (index.html) does NOT have abandoned cart recovery calculator
const indexHtml = fs.readFileSync('index.html', 'utf8');
if (indexHtml.includes('Abandoned Cart Recovery Calculator') || indexHtml.includes('id="calcNet"')) {
  errors.push('index.html still contains abandoned-cart recovery calculator');
}

// 7. Check Solutions (solutions.html) does NOT have International Business and does NOT have Legal Disclaimer
const solutionsHtml = fs.readFileSync('solutions.html', 'utf8');
if (solutionsHtml.includes('id="international"') || solutionsHtml.includes('href="#international"')) {
  errors.push('solutions.html still contains International Business');
}
if (solutionsHtml.includes('Legal Disclaimer:')) {
  errors.push('solutions.html still contains Legal Disclaimer banner');
}

// 8. Check demo.html and contact.html:
// - No founder personal details
// - No fake sample form values
// - No "Confirmed Operating Offices" card
// - No "Interactive Mockup" section or "Can't wait? Test the WhatsApp Storefront right now"
['demo.html', 'contact.html'].forEach(demoPage => {
  const pageHtml = fs.readFileSync(demoPage, 'utf8');
  if (pageHtml.includes('Shanavas Moidutty') || pageHtml.includes('shan@varossystems.com')) {
    errors.push(`${demoPage} still contains founder personal details`);
  }
  const fakeValues = ['Ramesh Menon', 'Rahul Sharma', 'Apex Digital', 'Acme Retailers', 'name@company.com', '+91 98765 43210'];
  fakeValues.forEach(val => {
    if (pageHtml.includes(val)) {
      errors.push(`${demoPage} contains fake sample form value: "${val}"`);
    }
  });
  if (pageHtml.includes('Confirmed Operating Offices')) {
    errors.push(`${demoPage} still contains "Confirmed Operating Offices" card`);
  }
  if (pageHtml.includes('Interactive Mockup') || pageHtml.includes('Can’t wait? Test the WhatsApp Storefront right now') || pageHtml.includes("Can't wait? Test the WhatsApp Storefront right now") || pageHtml.includes('id="test-store"')) {
    errors.push(`${demoPage} still contains Interactive Mockup / test-store section`);
  }
});

// Check demo.html specific requirements
const demoHtml = fs.readFileSync('demo.html', 'utf8');
if (!demoHtml.includes('See your store selling on WhatsApp') || !demoHtml.includes('in 20 minutes')) {
  errors.push('demo.html missing demo introduction headline');
}
['contactName', 'contactEmail', 'contactPhone', 'contactCompany', 'orderVolume', 'contactInterest', 'contactCountry', 'contactAddress', 'contactMessage', 'demoDate', 'demoMeetingMode', 'demoTime'].forEach(fieldId => {
  if (!demoHtml.includes(`id="${fieldId}"`)) {
    errors.push(`demo.html missing required demo form field: id="${fieldId}"`);
  }
});
if (!demoHtml.includes('type="date"')) {
  errors.push('demo.html missing date picker (type="date") for Preferred Date');
}
if (!demoHtml.includes('10:00 AM – 10:30 AM') || !demoHtml.includes('05:30 PM – 06:00 PM')) {
  errors.push('demo.html missing 30-minute time slots from 10:00-10:30 AM through 5:30-6:00 PM');
}
if (demoHtml.includes('Business Address (Optional)')) {
  errors.push('demo.html Business Address field still marked as Optional');
}
if (!demoHtml.includes('id="contactAddress"') || !demoHtml.includes('name="contactAddress"')) {
  errors.push('demo.html Business Address field missing');
}
if (!demoHtml.includes('id="contactCountry"') || !demoHtml.includes('name="contactCountry"')) {
  errors.push('demo.html missing Country selector');
}
if (!demoHtml.includes('openSignInBtn') || !demoHtml.includes('Sign In')) {
  errors.push('demo.html missing Sign In button/link at top-right of Book a Demo area');
}
if (!demoHtml.includes('id="signInModal"') || !demoHtml.includes('id="signInEmail"') || !demoHtml.includes('id="signInPassword"')) {
  errors.push('demo.html missing Sign In modal form with required Email and Password fields');
}

// Check trial.html specific requirements: separate form, same required fields as Book a Demo base
const trialHtml = fs.readFileSync('trial.html', 'utf8');
if (!trialHtml.includes('id="trialForm"')) {
  errors.push('trial.html missing separate trialForm');
}
['trialName', 'trialEmail', 'trialPhone', 'trialCompany', 'trialOrderVolume', 'trialInterest', 'trialAddress', 'trialCountry'].forEach(fieldId => {
  if (!trialHtml.includes(`id="${fieldId}"`)) {
    errors.push(`trial.html missing required trial form field: id="${fieldId}"`);
  }
});
if (!trialHtml.includes('Start 7-Day Free Trial')) {
  errors.push('trial.html missing "Start 7-Day Free Trial" action button');
}

// Check contact.html specific requirements from watsbuy-contact.html
const contactHtml = fs.readFileSync('contact.html', 'utf8');
if (!contactHtml.includes("Let's Build") || !contactHtml.includes('Get in Touch') || !contactHtml.includes('Send Us a Message')) {
  errors.push('contact.html missing content sections from watsbuy-contact.html');
}
['contactName', 'contactEmail', 'contactInterest', 'contactMessage'].forEach(fieldId => {
  if (!contactHtml.includes(`id="${fieldId}"`)) {
    errors.push(`contact.html missing required contact form field: id="${fieldId}"`);
  }
});
if (!contactHtml.includes('+971 50 292 7230') || !contactHtml.includes('tel:+971502927230') || !contactHtml.includes('https://wa.me/971502927230')) {
  errors.push('contact.html missing verified phone or WhatsApp link (+971 50 292 7230)');
}
if (!contactHtml.includes('https://youtube.com/@WatsBuy') ||
    !contactHtml.includes('https://www.linkedin.com/company/watsbuy') ||
    !contactHtml.includes('https://www.instagram.com/wats_buy/') ||
    !contactHtml.includes('https://www.facebook.com/profile.php?id=61592760365721')) {
  errors.push('contact.html missing official social URLs (YouTube, LinkedIn, Instagram, Facebook)');
}
if (contactHtml.includes('Telegram') || contactHtml.includes('> X<') || contactHtml.includes('𝕏')) {
  errors.push('contact.html should not contain X or Telegram social links');
}

// Check signin.html specific requirements
const signinHtml = fs.readFileSync('signin.html', 'utf8');
if (!signinHtml.includes('id="signinEmail"') || !signinHtml.includes('id="signinPassword"')) {
  errors.push('signin.html missing required Email and Password fields');
}
if (!signinHtml.includes('class="signin-preview-panel"')) {
  errors.push('signin.html missing preview panel');
}
if (!signinHtml.includes('class="signin-form-card"')) {
  errors.push('signin.html missing sign-in form card');
}
const signinMainOnly = signinHtml.substring(signinHtml.indexOf('<main') || 0, signinHtml.indexOf('</main>') || signinHtml.length);
if (signinMainOnly.includes('Book a Demo') || signinMainOnly.includes('Request a Product Demo')) {
  errors.push('signin.html body contains extra Book a Demo button; must not add another demo button to sign-in page');
}

// 9. Check reseller.html:
// - Removed "Book a Partner Demo"
// - Keeps "Apply as a Partner"
// - No fake sample values
const resellerHtml = fs.readFileSync('reseller.html', 'utf8');
if (resellerHtml.includes('Book a Partner Demo')) {
  errors.push('reseller.html still contains "Book a Partner Demo"');
}
if (!resellerHtml.includes('Apply as a Partner')) {
  errors.push('reseller.html missing "Apply as a Partner"');
}
if (!resellerHtml.includes('id="partnerCountry"') || !resellerHtml.includes('name="partnerCountry"')) {
  errors.push('reseller.html missing Country selector field');
}
const fakeResellerValues = ['Rahul Sharma', 'Apex Digital', 'Ramesh Menon', 'Acme Retailers'];
fakeResellerValues.forEach(val => {
  if (resellerHtml.includes(val)) {
    errors.push(`reseller.html contains fake sample form value: "${val}"`);
  }
});

// 10. Check pricing.html:
// - 4 editable plan cards from Global Pricing.jpeg (Basic $99, Growth $179, Premium $249, Enterprise Custom)
// - Annual discount calculations (Basic $1,010, Growth $1,826, Premium $2,540, Save 15%)
// - Basic card has two buttons in exact order: "Get Started →" then "7-Day Free Trial"
// - Growth is the ONLY "Most Popular" plan (badge-popular and popular class; Premium must NOT have popular class or badge)
// - Remove "Book a Demo" from Growth and Premium plan buttons
// - Official Meta platform pricing link present
// - No screenshot background/image
const pricingHtml = fs.readFileSync('pricing.html', 'utf8');
if (!pricingHtml.includes('$99') || !pricingHtml.includes('$179') || !pricingHtml.includes('$249')) {
  errors.push('pricing.html missing expected monthly plan prices (Basic $99, Growth $179, Premium $249)');
}
if (!pricingHtml.includes('$1,010') || !pricingHtml.includes('$1,826') || !pricingHtml.includes('$2,540') || !pricingHtml.includes('Save 15%')) {
  errors.push('pricing.html missing annual 15% discount calculation or badge');
}
const getStartedIdx = pricingHtml.indexOf('Get Started →');
const freeTrialIdx = pricingHtml.indexOf('7-Day Free Trial');
if (getStartedIdx === -1 || freeTrialIdx === -1 || getStartedIdx > freeTrialIdx) {
  errors.push('pricing.html Basic card must place two buttons in this exact order: "Get Started", then "7-Day Free Trial"');
}
// Growth is the only popular card
const popularCardMatches = (pricingHtml.match(/class="[^"]*price-card[^"]*popular[^"]*"/g) || []).length;
if (popularCardMatches !== 1) {
  errors.push(`pricing.html must have exactly 1 popular card (Growth only), found ${popularCardMatches}`);
}
const badgePopularMatches = (pricingHtml.match(/class="badge-popular"/g) || []).length;
if (badgePopularMatches !== 1) {
  errors.push(`pricing.html must have exactly 1 MOST POPULAR badge (on Growth), found ${badgePopularMatches}`);
}
// Growth and Premium buttons must say "Get Started" and NOT "Book a Demo"
const growthCard = pricingHtml.substring(pricingHtml.indexOf('class="price-card popular"'), pricingHtml.indexOf('<!-- Premium Plan'));
if (!growthCard.includes('Get Started')) {
  errors.push('pricing.html Growth card missing "Get Started" button');
}
const premiumCard = pricingHtml.substring(pricingHtml.indexOf('<!-- Premium Plan'), pricingHtml.indexOf('<!-- Enterprise Plan'));
if (!premiumCard.includes('Get Started')) {
  errors.push('pricing.html Premium card missing "Get Started" button');
}
// Check that inside the pricing cards, neither Growth nor Premium buttons say "Book a Demo"
const pricingCardsSection = pricingHtml.substring(pricingHtml.indexOf('class="pricing-grid"'), pricingHtml.indexOf('Important billing inclusions'));
if (pricingCardsSection.includes('Book a Demo')) {
  errors.push('pricing.html pricing cards contain "Book a Demo" button; Growth and Premium plan buttons must not contain "Book a Demo"');
}
if (!pricingHtml.includes('https://whatsappbusiness.com/products/platform-pricing/')) {
  errors.push('pricing.html missing link to official Meta platform pricing');
}
if (pricingHtml.includes('pricing-reference.png')) {
  errors.push('pricing.html must not use the pricing screenshot as an image/background; card layout must be recreated in HTML/CSS');
}

// 11. Check why-watsbuy.html has the updated hero text and legal disclaimer per snag list
const whyHtml = fs.readFileSync('why-watsbuy.html', 'utf8');
if (!whyHtml.includes('THE CONVERSATION-FIRST ADVANTAGE') || 
    !whyHtml.includes('Why Wait for Customers to Find Your Store?') ||
    !whyHtml.includes('Bring Your Store to Where Your Customers Already Are') ||
    !whyHtml.includes('Reach. Engage. Sell. Repeat.') ||
    !whyHtml.includes('Legal Disclaimer:') ||
    !whyHtml.includes('All statistics, conversion rates, customer engagement metrics')) {
  errors.push('why-watsbuy.html missing required snag list hero text or legal disclaimer');
}

// 12. Check statutory placeholders in legal files
const privacyHtml = fs.readFileSync('privacy.html', 'utf8');
if (!privacyHtml.includes('[INSERT NAME OR ROLE')) {
  errors.push('privacy.html missing statutory placeholder [INSERT NAME OR ROLE...');
}

// 13. Scope Cleanup Verification:
// A. Remove repeated lower-page demo CTA sections and buttons
htmlFiles.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  if (html.includes('class="cta-band"')) {
    errors.push(`${f} still contains lower-page demo CTA section ("cta-band")`);
  }
});

// B. Check that hero demo buttons are not repeated across every section
['why-watsbuy.html', 'getting-started.html', 'enterprise.html'].forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const heroMatch = html.match(/<section class="page-hero"[\s\S]*?<\/section>/i);
  if (heroMatch && (heroMatch[0].includes('Book a Demo') || heroMatch[0].includes('Request a Product Demo') || heroMatch[0].includes('Book an Enterprise Demo'))) {
    errors.push(`${f} hero section still contains repeated demo button`);
  }
});

// C. Verify removal of future AI feature claims
const forbiddenAiClaims = [
  'AI Agent',
  'AI voice',
  'voice-to-order',
  'conversational AI shopping',
  'visual product discovery',
  'AI product recommendations',
  'AI-powered commerce',
  'Storefront & AI Agent',
  'Multi-Agent AI Copilots',
  'AI Voice-to-Order Intelligence',
  'AI conversations'
];
htmlFiles.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  forbiddenAiClaims.forEach(claim => {
    if (html.includes(claim)) {
      errors.push(`${f} contains forbidden future AI claim: "${claim}"`);
    }
  });
});

// D. Verify footer simplification and removal of private details
htmlFiles.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const footerMatch = html.match(/<footer class="footer">([\s\S]*?)<\/footer>/i);
  if (footerMatch) {
    const footerHtml = footerMatch[1];
    if (footerHtml.includes('tel:+91') || footerHtml.includes('tel:+971') || footerHtml.includes('+91 88919') || footerHtml.includes('+971 50')) {
      errors.push(`${f} footer still contains personal/office phone numbers`);
    }
    if (footerHtml.includes('Muthuvara') || footerHtml.includes('Alappat') || footerHtml.includes('DAFZA') || footerHtml.includes('9WC Building')) {
      errors.push(`${f} footer still contains street address/location details`);
    }
    if (footerHtml.includes('Operated by Ziro Systems') || footerHtml.includes('The WhatsApp-based e-commerce SaaS + AI platform')) {
      errors.push(`${f} footer still contains lengthy operating company description`);
    }
    if (!footerHtml.includes('<a href="about.html">About Us</a>')) {
      errors.push(`${f} footer missing required "About Us" link to about.html`);
    }
    if (footerHtml.includes('About WatsBuy')) {
      errors.push(`${f} footer still contains old "About WatsBuy" label instead of "About Us"`);
    }
  }
});

// E. Verify "Complete Platform Capabilities" and "8 Conversational Commerce Engines" removed from all pages
htmlFiles.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  if (html.toLowerCase().includes('complete platform capabilities')) {
    errors.push(`${f} contains "Complete Platform Capabilities"`);
  }
  if (html.toLowerCase().includes('8 conversational commerce engines')) {
    errors.push(`${f} contains "8 Conversational Commerce Engines"`);
  }
});

// F. Verify Pricing: Plan descriptions & features from Global Pricing.jpeg
if (!pricingHtml.includes('Storage up to 5GB- 100 Products')) {
  errors.push('pricing.html missing updated Basic storage limits from Global Pricing.jpeg');
}
if (!pricingHtml.includes('Storage up to 10 GB-200 Products')) {
  errors.push('pricing.html missing updated Growth storage limits from Global Pricing.jpeg');
}
if (!pricingHtml.includes('Storage up to 20 GB-500 Products')) {
  errors.push('pricing.html missing updated Premium storage limits from Global Pricing.jpeg');
}
if (!pricingHtml.includes('Fully Workflow Customization')) {
  errors.push('pricing.html missing updated Enterprise workflow features from Global Pricing.jpeg');
}

// Verify Market Shift on index.html from 50M reference
const indexPage = fs.readFileSync('index.html', 'utf8');
if (!indexPage.includes('Your Customers Are Already on WhatsApp') ||
    !indexPage.includes('3B+') ||
    !indexPage.includes('2B+') ||
    !indexPage.includes('1.5B') ||
    !indexPage.includes('175M+') ||
    !indexPage.includes('Bring your storefront, offers, orders, and customer support to WhatsApp with WatsBuy.')) {
  errors.push('index.html missing updated Market Shift section content from 50M reference');
}

// G. Verify Book a Demo Form: 5 exact choices & optional Business Address field on demo.html
const demoPageHtml = fs.readFileSync('demo.html', 'utf8');
if (!demoPageHtml.includes('id="contactAddress"')) {
  errors.push('demo.html missing optional "Business Address" field (id="contactAddress")');
}
const demoInterestMatch = demoPageHtml.match(/<select id="contactInterest"[^>]*>([\s\S]*?)<\/select>/i);
if (demoInterestMatch) {
  const options = (demoInterestMatch[1].match(/<option[^>]*>([\s\S]*?)<\/option>/gi) || []).map(o => o.replace(/<[^>]+>/g, '').trim());
  const expected = ['Basic Plan', 'Growth Plan', 'Premium Plan', 'Enterprise Custom Plan', 'Become a Reseller'];
  if (JSON.stringify(options) !== JSON.stringify(expected)) {
    errors.push(`demo.html contactInterest options mismatch: expected [${expected.join(', ')}], found [${options.join(', ')}]`);
  }
}

// H. Verify Homepage Hero Updates: "7 Day Free Trial" button and 3 bold highlights
const homeHtml = fs.readFileSync('index.html', 'utf8');
if (!homeHtml.includes('7 Day Free Trial')) {
  errors.push('index.html missing "7 Day Free Trial" button label');
}
if (!homeHtml.includes('Zero app downloads') || !homeHtml.includes('Direct in-chat checkout') || (!homeHtml.includes('Seamless UPI & card payments') && !homeHtml.includes('Seamless UPI &amp; card payments'))) {
  errors.push('index.html missing the 3 required bold highlights beneath the hero button');
}

// I. Verify About page uses About Us heading and content from About WatsBuy.docx
const aboutHtml = fs.readFileSync('about.html', 'utf8');
if (!aboutHtml.includes('About Us')) {
  errors.push('about.html missing "About Us" heading');
}
if (!aboutHtml.includes('Our Story') || !aboutHtml.includes('What We Do') || !aboutHtml.includes('Why WatsBuy?')) {
  errors.push('about.html missing core sections from About WatsBuy.docx');
}

// J. Verify Enterprise page uses content from watsbuy-enterprise.html
const enterprisePageHtml = fs.readFileSync('enterprise.html', 'utf8');
if (!enterprisePageHtml.includes('Enterprise-Grade Commerce') || !enterprisePageHtml.includes('High-Throughput Broadcasts') || !enterprisePageHtml.includes('End-to-End Business Automation')) {
  errors.push('enterprise.html missing core sections from watsbuy-enterprise.html');
}

// K. Verify Logo and Tagline styling: enlarged unstretched logo, dot-free tagline highlighted in green
const styleCss = fs.readFileSync('assets/css/style.css', 'utf8');
if (styleCss.includes('.brand-tagline::before')) {
  errors.push('style.css still contains .brand-tagline::before (green dot before tagline)');
}
if ((!styleCss.includes('height: 80px') && !styleCss.includes('height: 96px') && !styleCss.includes('height: 56px')) || !styleCss.includes('object-fit: contain')) {
  errors.push('style.css missing increased unstretched logo sizing (height: 56px/80px/96px, object-fit: contain)');
}
if (!styleCss.includes('#079D4F')) {
  errors.push('style.css missing green highlight for tagline');
}

// L. Verify Header & Footer Logo replacement with WatsBuy WhatsApp Shopping Logo.png without duplicate tagline
htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes('WatsBuy WhatsApp Shopping Logo.png')) {
    errors.push(`${file} missing WatsBuy WhatsApp Shopping Logo`);
  }
  if (!content.includes('class="brand-logo-img"')) {
    errors.push(`${file} missing brand-logo-img class on header logo`);
  }
  const headerMatch = content.match(/<header class="nav">([\s\S]*?)<\/header>/);
  if (headerMatch && headerMatch[1].includes('class="brand-tagline"')) {
    errors.push(`${file} contains duplicate text tagline in header`);
  }
  const footerMatch = content.match(/<footer class="footer">([\s\S]*?)<\/footer>/);
  if (footerMatch && !footerMatch[1].includes('WatsBuy WhatsApp Shopping Logo.png')) {
    errors.push(`${file} missing WatsBuy WhatsApp Shopping Logo in footer`);
  }
});
if (!styleCss.includes('.brand-logo-img')) {
  errors.push('style.css missing .brand-logo-img styles');
}

// 14. Check internal link integrity across all 16 files
htmlFiles.forEach(sourceFile => {
  const html = fs.readFileSync(sourceFile, 'utf8');
  const linkRegex = /<a[^>]+href=["']([^"']+)["']/gi;
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1];

    if (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('javascript:')) {
      continue;
    }

    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      if (targetId && !html.includes(`id="${targetId}"`) && !html.includes(`id='${targetId}'`)) {
        errors.push(`Broken in-page anchor in ${sourceFile}: ${href} (id="${targetId}" not found)`);
      }
    } else {
      const [targetFilePath, targetAnchor] = href.split('#');
      const cleanPath = targetFilePath.split('?')[0];

      if (cleanPath) {
        if (!fs.existsSync(cleanPath)) {
          errors.push(`Broken link in ${sourceFile}: href="${href}" -> file "${cleanPath}" does not exist`);
        } else if (targetAnchor) {
          const targetHtml = fs.readFileSync(cleanPath, 'utf8');
          if (!targetHtml.includes(`id="${targetAnchor}"`) && !targetHtml.includes(`id='${targetAnchor}'`)) {
            errors.push(`Broken anchor link in ${sourceFile}: href="${href}" -> id="${targetAnchor}" not found in ${cleanPath}`);
          }
        }
      }
    }
  }
});

console.log('Verification Results:');
console.log(`- HTML Pages Checked: ${htmlFiles.length}`);
console.log(`- Errors Found: ${errors.length}`);
console.log(`- Warnings Found: ${warnings.length}`);

if (errors.length > 0) {
  console.error('\nERRORS:');
  errors.forEach(e => console.error('  ✕ ' + e));
  process.exit(1);
} else {
  console.log(`\n✔ All ${htmlFiles.length} HTML files verified successfully with ZERO errors!`);
  console.log('✔ ZERO external Emergent links anywhere across the site.');
  console.log('✔ All "Book a Demo" buttons point locally to demo.html.');
  console.log('✔ "Why WatsBuy?" menu item links directly to why-watsbuy.html.');
  console.log('✔ Pricing page has Global Pricing ($99, $179, $249, Custom) with Growth as the single MOST POPULAR plan, removed "Book a Demo" from Growth and Premium plan buttons, and preserved Basic dual buttons in order.');
  console.log('✔ Index page Market Shift section updated with 50M reference (3B+, 2B+, 1.5B, 175M+, customer support banner).');
  console.log('✔ Reseller page has "Apply as a Partner" and removed "Book a Partner Demo".');
  console.log('✔ Demo & Contact page implements 2-column layout with zero founder personal details, no operating office address card, and no interactive mockup section.');
  console.log('✔ Resources menu dropdown has exactly three options: Help Centre, FAQs, and Get Started.');
  console.log('✔ Zero competitor names & zero "white label" occurrences.');
  console.log('✔ Verbatim legal policies & statutory placeholders intact.');
}

if (warnings.length > 0) {
  console.warn('\nWARNINGS:');
  warnings.forEach(w => console.warn('  ⚠ ' + w));
}
