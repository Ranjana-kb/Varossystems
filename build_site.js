const fs = require('fs');
const path = require('path');

// 1. Read existing policies to preserve verbatim content
function extractPolicy(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const m = content.match(/<div class="policy-wrapper"[\s\S]*?<\/div>\s*<\/main>/i);
  if (m) {
    return m[0].replace(/<\/main>/i, '');
  }
  const m2 = content.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (m2) return m2[1];
  return '';
}

const privacyBody = extractPolicy('privacy.html');
const termsBody = extractPolicy('terms.html');
const refundBody = extractPolicy('refund.html');
const shippingBody = extractPolicy('shipping.html');
const aboutBody = extractPolicy('about.html');

console.log('Extracted legal policies successfully:');
console.log('privacy:', privacyBody.length, 'terms:', termsBody.length, 'refund:', refundBody.length, 'shipping:', shippingBody.length, 'about:', aboutBody.length);

// 2. Read FAQ data from references/index.html & add Meta Verification FAQs
const refHtml = fs.readFileSync('references/index.html', 'utf8');
const faqMatch = refHtml.match(/const faqs\s*=\s*(\[[\s\S]*?\]);/);
let baseFaqs = [];
if (faqMatch) {
  const rawFaqs = eval(faqMatch[1]);
  baseFaqs = rawFaqs
    .filter(faq => {
      // Remove questions specifically asking about future unreleased AI agent and voice ordering features
      if (faq.question.includes('AI sales agent') || faq.question.includes('voice ordering')) {
        return false;
      }
      return true;
    })
    .map(faq => {
      let q = faq.question
        .replace(/, AI voice,/g, '')
        .replace(/AI voice and /g, '')
        .replace(/ and AI commerce/g, '');
      let a = faq.answer
        .replace(/, AI voice services,/g, '')
        .replace(/AI voice services and /g, '')
        .replace(/and AI commerce platform/g, 'platform')
        .replace(/selected AI and messaging services/g, 'selected messaging workflows')
        .replace(/and AI-powered sales solutions /g, '');
      return {
        category: faq.category === 'AI and Customer Privacy' ? 'Automation & Customer Privacy' : faq.category,
        question: q,
        answer: a
      };
    });
}

// Official Meta Verification FAQs based on Meta official business documentation & articles.json
const metaVerificationFaqs = [
  {
    category: 'Meta Business Verification & Compliance',
    question: 'What is Meta Business Verification and why is it needed for WhatsApp?',
    answer: 'Meta Business Verification is Meta\'s official process to confirm that a Meta Business Portfolio belongs to a legally registered organization. Completing verification increases your daily messaging limits (moving from the unverified 250 conversations/24h tier to Tier 1 [1,000], Tier 2 [10,000], Tier 3 [100,000], and unlimited daily conversations), protects your phone number from automated spam filtering, and is a strict prerequisite for requesting the official Meta Green Tick verified badge.'
  },
  {
    category: 'Meta Business Verification & Compliance',
    question: 'What official legal documents does Meta accept for business verification?',
    answer: 'Meta requires government-issued documents that clearly show your exact legal business name, physical operating address, and official business phone number. In India, Meta accepts GST Registration Certificates, Certificates of Incorporation, Udyam Aadhar, or recent utility bills/bank statements matching the registered business name. In the UAE and GCC, Meta accepts Trade Licenses and Commercial Register certificates. Ensure documents are clear, unaltered, and up-to-date.'
  },
  {
    category: 'Meta Business Verification & Compliance',
    question: 'How long does Meta Business Verification take?',
    answer: 'Meta typically reviews business verification submissions within 1 to 5 business days. You can monitor review status in real-time inside your Meta Business Manager under Settings > Security Centre. While WatsBuy provides complete guidance and document review to ensure your submission is accurate, review times and approval decisions are strictly governed by Meta.'
  },
  {
    category: 'Meta Business Verification & Compliance',
    question: 'What should I do if Meta Business Verification is delayed or rejected?',
    answer: 'If Meta requests additional information or rejects your verification, check for subtle discrepancies between your Meta Business Portfolio details and your legal documents (such as abbreviations, suite numbers, or different phone numbers). Ensure your website is live with an active domain email (e.g. name@yourcompany.com) rather than a generic Gmail or Yahoo address. You can update details and re-submit directly in Meta Business Manager.'
  },
  {
    category: 'Meta Business Verification & Compliance',
    question: 'Can I start using WatsBuy and selling on WhatsApp before Meta verification is approved?',
    answer: 'Yes! Under Meta\'s Cloud API onboarding framework, you can connect your dedicated WhatsApp Business phone number and immediately begin taking customer inquiries and receiving orders up to 250 business-initiated conversations every 24 hours. Completing Meta verification is only required when you want to scale daily broadcast marketing volumes.'
  },
  {
    category: 'Meta Business Verification & Compliance',
    question: 'How do I apply for the official Meta Green Tick (WhatsApp Verified Badge)?',
    answer: 'The Green Tick (Official Business Account badge) is granted directly by Meta to verified brands with proven authenticity and high public search interest/notability. Eligibility requires: 1) Completed Meta Business Verification, 2) Two-Factor Authentication enabled on your Business Manager, 3) Tier 2 or higher messaging limits, and 4) Organic news coverage or high brand recognition. Meta reviews badge requests independently without charging fees.'
  }
];

const faqs = [...metaVerificationFaqs, ...baseFaqs];
console.log('Total FAQs combined:', faqs.length);

// 3. Shared Header Navigation
function renderNav(activePage) {
  return `  <!-- Top Announcement -->
  <div class="announcement">
    <span><strong>THE WHATSAPP-BASED E-COMMERCE SAAS PLATFORM</strong> · Turn WhatsApp into your digital storefront</span>
  </div>

  <!-- Shared Header Navigation -->
  <header class="nav">
    <div class="container nav-inner">
      <a class="brand" href="index.html" aria-label="WatsBuy - Your Store on WhatsApp">
        <img src="references/WatsBuy WhatsApp Shopping Logo.png" alt="WatsBuy - Your Store on WhatsApp" class="brand-logo-img">
      </a>
      
      <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation menu" aria-expanded="false">☰</button>
      
      <nav class="nav-links" id="navLinks">
        <a href="why-watsbuy.html" class="${activePage === 'why-watsbuy' ? 'active' : ''}">Why WatsBuy?</a>
        <div class="nav-item">
          <button type="button" class="${activePage === 'solutions' ? 'active' : ''}">Solutions ▾</button>
          <div class="dropdown">
            <a href="solutions.html">All Solutions</a>
            <a href="solutions.html#retail">Retail &amp; D2C</a>
            <a href="solutions.html#wholesale">Wholesalers &amp; Distributors</a>
            <a href="solutions.html#multi-store">Multi-Store Businesses</a>
            <a href="solutions.html#smb">Growing SMBs</a>
            <a href="solutions.html#enterprise">Enterprise Scale</a>
          </div>
        </div>
        <a href="pricing.html" class="${activePage === 'pricing' ? 'active' : ''}">Pricing</a>
        <a href="enterprise.html" class="${activePage === 'enterprise' ? 'active' : ''}">Enterprise</a>
        <a href="reseller.html" class="${activePage === 'reseller' ? 'active' : ''}">Become a Reseller</a>
        <div class="nav-item">
          <button type="button" class="${['faq', 'getting-started'].includes(activePage) ? 'active' : ''}">Resources ▾</button>
          <div class="dropdown">
            <a href="faq.html">Help Centre</a>
            <a href="faq.html#faqs">FAQs</a>
            <a href="getting-started.html">Get Started</a>
          </div>
        </div>
        <a href="signin.html" class="${activePage === 'signin' ? 'active' : ''}">Sign In</a>
        <a class="btn btn-primary btn-sm" href="demo.html">Book a Demo →</a>
      </nav>
    </div>
  </header>`;
}

// 4. Shared Footer Navigation (Preserves All Legal, Company, Platform Links)
function renderFooter() {
  return `  <!-- Shared Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo-badge">
            <img src="references/WatsBuy WhatsApp Shopping Logo.png" alt="WatsBuy - Your Store on WhatsApp" class="footer-logo-img">
          </div>
        </div>

        <div>
          <h4>Solutions</h4>
          <a href="solutions.html#retail">Retail &amp; D2C</a>
          <a href="solutions.html#wholesale">Wholesalers &amp; Distributors</a>
          <a href="solutions.html#multi-store">Multi-Store Businesses</a>
          <a href="solutions.html#smb">Growing SMBs</a>
          <a href="solutions.html#enterprise">Enterprise Scale</a>
        </div>

        <div>
          <h4>Platform</h4>
          <a href="why-watsbuy.html">Why WatsBuy?</a>
          <a href="pricing.html">Pricing Plans</a>
          <a href="enterprise.html">Enterprise Workflows</a>
          <a href="reseller.html">Become a Reseller</a>
          <a href="getting-started.html">Get Started</a>
          <a href="faq.html">Help Centre &amp; FAQs</a>
        </div>

        <div>
          <h4>Company &amp; Contact</h4>
          <a href="about.html">About Us</a>
          <a href="contact.html">Contact Us</a>
          <a href="demo.html">Book a Demo</a>
        </div>

        <div>
          <h4>Policies &amp; Legal</h4>
          <a href="privacy.html">Privacy Policy</a>
          <a href="terms.html">Terms of Service</a>
          <a href="refund.html">Refund Policy</a>
          <a href="shipping.html">Shipping Policy</a>
        </div>
      </div>

      <div class="footer-bottom">
        <div>
          &copy; <span id="year"></span> WatsBuy. All rights reserved.
        </div>
        <div class="footer-bottom-links">
          <a href="privacy.html">Privacy Policy</a>
          <a href="terms.html">Terms of Service</a>
          <a href="refund.html">Refund Policy</a>
          <a href="shipping.html">Shipping Policy</a>
          <a href="about.html">About Us</a>
          <a href="contact.html">Contact Us</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Form Submission Confirmation Popup Modal -->
  <div class="confirmation-modal" id="confirmationModal" role="dialog" aria-modal="true" aria-labelledby="confirmationModalTitle" onclick="handleConfirmationBackdropClick(event)">
    <div class="confirmation-dialog">
      <button type="button" class="confirmation-close" onclick="closeConfirmationModal()" aria-label="Close confirmation">&times;</button>
      <div class="confirmation-icon-wrap">
        <span class="confirmation-check">✓</span>
      </div>
      <div class="confirmation-badge" id="confirmationBadge">SUBMISSION CONFIRMED</div>
      <h3 class="confirmation-title" id="confirmationModalTitle">Thank You!</h3>
      <p class="confirmation-message" id="confirmationModalMessage">
        Your enquiry has been successfully received. Our team will review your details and contact you shortly.
      </p>
      <div class="confirmation-actions">
        <button type="button" class="btn btn-primary" onclick="closeConfirmationModal()" style="min-width:140px;padding:11px 24px;">
          Done
        </button>
      </div>
    </div>
  </div>

  <!-- Shared Scripts -->
  <script>
    // Mobile navigation toggle & auto-close
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    function closeMobileMenu() {
      if (navLinks) {
        navLinks.classList.remove('open');
        if (menuToggle) {
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.textContent = '☰';
        }
      }
    }

    function toggleMobileMenu() {
      if (navLinks && menuToggle) {
        const isOpen = navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        menuToggle.textContent = isOpen ? '✕' : '☰';
      }
    }

    if (menuToggle) {
      menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
      });
    }

    if (navLinks) {
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          closeMobileMenu();
        });
      });
    }

    document.addEventListener('click', (e) => {
      if (navLinks && menuToggle && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    });

    // Dynamic current year
    const yr = document.getElementById('year');
    if (yr) yr.textContent = new Date().getFullYear();

    // Form Submission Confirmation Modal Handlers
    function showConfirmationModal(title, message, badgeText) {
      const modal = document.getElementById('confirmationModal');
      if (!modal) return;
      if (title) document.getElementById('confirmationModalTitle').textContent = title;
      if (message) document.getElementById('confirmationModalMessage').innerHTML = message;
      if (badgeText) document.getElementById('confirmationBadge').textContent = badgeText;
      modal.classList.add('open');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function closeConfirmationModal() {
      const modal = document.getElementById('confirmationModal');
      if (!modal) return;
      modal.classList.remove('open');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }

    function handleConfirmationBackdropClick(e) {
      if (e.target.id === 'confirmationModal') {
        closeConfirmationModal();
      }
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeConfirmationModal();
      }
    });
  </script>`;
}

// 5. Shared 7-Day Free Trial Modal (Hidden on initial load, opens registration form on button click)
function renderTrialModalMarkup() {
  return `  <!-- 7-Day Free Trial Modal (Opens trial registration form, hidden on initial load) -->
  <div class="trial-modal" id="trialModal" role="dialog" aria-modal="true" aria-labelledby="trialModalTitle" onclick="handleTrialBackdropClick(event)">
    <div class="trial-modal-dialog">
      <div class="trial-modal-header">
        <div>
          <div class="eyebrow" style="margin-bottom:6px;"><span class="dot"></span> 7-DAY FREE TRIAL · INSTANT SETUP</div>
          <h3 id="trialModalTitle" style="font-size:24px;font-weight:850;color:var(--navy);letter-spacing:-0.8px;margin:0 0 4px;">
            Start Your 7-Day Free Trial
          </h3>
          <p style="font-size:13.5px;color:var(--slate);margin:0;line-height:1.5;">
            Enter your business details below to activate your 7-day free trial. Full access, zero commitment.
          </p>
        </div>
        <button type="button" class="trial-modal-close" onclick="closeTrialModal()" aria-label="Close dialog">&times;</button>
      </div>

      <form id="trialForm" onsubmit="handleTrialSubmit(event)">
        <div class="form-grid">
          <div class="field">
            <label for="trialName">Full Name *</label>
            <input id="trialName" name="trialName" type="text" required placeholder="Full Name">
          </div>
          <div class="field">
            <label for="trialEmail">Business Email *</label>
            <input id="trialEmail" name="trialEmail" type="email" required placeholder="Work Email Address">
          </div>
          <div class="field">
            <label for="trialPhone">WhatsApp Number *</label>
            <input id="trialPhone" name="trialPhone" type="tel" required placeholder="WhatsApp Phone Number">
          </div>
          <div class="field">
            <label for="trialCompany">Company / Business Name *</label>
            <input id="trialCompany" name="trialCompany" type="text" required placeholder="Company / Business Name">
          </div>
          <div class="field">
            <label for="trialOrderVolume">Monthly Orders *</label>
            <select id="trialOrderVolume" name="trialOrderVolume" required>
              <option value="">Select Monthly Orders *</option>
              <option value="Under 500">Under 500 orders / month</option>
              <option value="500 - 2,000">500 – 2,000 orders / month</option>
              <option value="2,000 - 10,000">2,000 – 10,000 orders / month</option>
              <option value="10,000+">10,000+ orders / month (Enterprise)</option>
            </select>
          </div>
          <div class="field">
            <label for="trialInterest">Area of Interest *</label>
            <select id="trialInterest" name="trialInterest" required>
              <option value="">Select Area of Interest *</option>
              <option value="Basic Plan">Basic Plan</option>
              <option value="Growth Plan">Growth Plan</option>
              <option value="Premium Plan">Premium Plan</option>
              <option value="Retail & D2C Brands">Retail &amp; D2C Brands</option>
              <option value="Wholesalers & Distributors">Wholesalers &amp; Distributors</option>
              <option value="Enterprise Custom Plan">Enterprise Custom Plan</option>
              <option value="Become a Reseller">Become a Reseller</option>
            </select>
          </div>
          <div class="field full">
            <label for="trialCountry">Country *</label>
            <select id="trialCountry" name="trialCountry" required>
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
            <label for="trialAddress">Business Address *</label>
            <input id="trialAddress" name="trialAddress" type="text" required placeholder="Office / Business Address, City, Region">
          </div>
          <div class="field full">
            <label for="trialMessage">Notes &amp; Requirements</label>
            <textarea id="trialMessage" name="trialMessage" rows="2" placeholder="Tell us about your product catalogue, sales channels, or specific requirements..."></textarea>
          </div>
        </div>

        <div style="margin-top:20px;">
          <button type="submit" class="btn btn-primary btn-block" style="padding:13px 24px;font-size:14.5px;font-weight:750;">
            Start 7-Day Free Trial →
          </button>
        </div>

        <div class="form-status" id="trialStatus">
          ✓ <strong>7-Day Free Trial request received!</strong> We've received your business details. Our onboarding team will configure your trial environment and send your WhatsApp storefront credentials shortly.
        </div>
      </form>
    </div>
  </div>`;
}

function renderTrialModalScripts() {
  return `  <script>
    function openTrialModal(planInterest, e) {
      if (e && e.preventDefault) e.preventDefault();
      const modal = document.getElementById('trialModal');
      if (!modal) return;
      modal.classList.add('open');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      if (planInterest) {
        const select = document.getElementById('trialInterest');
        if (select) {
          for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value.toLowerCase().includes(planInterest.toLowerCase()) ||
                select.options[i].text.toLowerCase().includes(planInterest.toLowerCase())) {
              select.selectedIndex = i;
              break;
            }
          }
        }
      }
      const nameInput = document.getElementById('trialName');
      if (nameInput) setTimeout(() => nameInput.focus(), 100);
    }

    function closeTrialModal() {
      const modal = document.getElementById('trialModal');
      if (!modal) return;
      modal.classList.remove('open');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }

    function handleTrialBackdropClick(e) {
      if (e.target.id === 'trialModal') {
        closeTrialModal();
      }
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeTrialModal();
      }
    });

    (function initTrialParams() {
      const urlParams = new URLSearchParams(window.location.search);
      const planParam = urlParams.get('plan') || urlParams.get('interest');
      if (planParam) {
        const select = document.getElementById('trialInterest');
        if (select) {
          for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value.toLowerCase().includes(planParam.toLowerCase()) ||
                select.options[i].text.toLowerCase().includes(planParam.toLowerCase())) {
              select.selectedIndex = i;
              break;
            }
          }
        }
      }
      if (window.location.hash === '#openTrial' || window.location.hash === '#trialModal') {
        window.addEventListener('DOMContentLoaded', () => openTrialModal());
      }
    })();

    function handleTrialSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('trialName');
      const email = document.getElementById('trialEmail');
      const phone = document.getElementById('trialPhone');
      const company = document.getElementById('trialCompany');
      const volume = document.getElementById('trialOrderVolume');
      const interest = document.getElementById('trialInterest');
      const country = document.getElementById('trialCountry');
      const address = document.getElementById('trialAddress');

      if (name && !name.value.trim()) { name.focus(); return; }
      if (email && !email.value.trim()) { email.focus(); return; }
      if (phone && !phone.value.trim()) { phone.focus(); return; }
      if (company && !company.value.trim()) { company.focus(); return; }
      if (volume && !volume.value.trim()) { volume.focus(); return; }
      if (interest && !interest.value.trim()) { interest.focus(); return; }
      if (country && !country.value.trim()) { country.focus(); return; }
      if (address && !address.value.trim()) { address.focus(); return; }

      const status = document.getElementById('trialStatus');
      if (status) {
        status.style.display = 'block';
        status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      closeTrialModal();
      if (typeof showConfirmationModal === 'function') {
        showConfirmationModal(
          '7-Day Free Trial Activated!',
          'Thank you for signing up for the WatsBuy 7-Day Free Trial. Your business details have been received, and our onboarding team is setting up your WhatsApp storefront environment. You will receive your login credentials and setup guide shortly.',
          'TRIAL ACTIVATED'
        );
      }
    }
  </script>`;
}

function wrapPage(title, description, activePage, bodyContent, extraHead = '', extraScripts = '') {
  const needsTrialModal = ['trial', 'pricing', 'solutions', 'home'].includes(activePage);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} — WatsBuy</title>
  <meta name="description" content="${description}">
  <link rel="icon" type="image/png" href="assets/images/watsbuy-mark.png">
  <link rel="stylesheet" href="assets/css/style.css">
  ${extraHead}
</head>
<body>
${renderNav(activePage)}

${bodyContent}

${needsTrialModal ? renderTrialModalMarkup() : ''}

${renderFooter()}

${needsTrialModal ? renderTrialModalScripts() : ''}
${extraScripts}
</body>
</html>`;
}

module.exports = {
  wrapPage,
  renderNav,
  renderFooter,
  privacyBody,
  termsBody,
  refundBody,
  shippingBody,
  aboutBody,
  faqs
};
