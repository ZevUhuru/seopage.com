/* seopage.com's terms, privacy and cookie policies (2026-11-06; DRAFT for Zev's review, not legal
   advice). seopage.com had none. Written in the same plain voice as esy.com/terms, /privacy and
   /cookies (ESY LLC's other legal pages), adjusted for what SEOPage sells and collects.

   Zev's decisions (2026-11-06):
   - SEOPage is a division of ESY, LLC (Delaware; registered in Florida as ESY.COM LLC).
   - Buyers are businesses; 18+ and able to bind their business. Delaware law, 30 days of talks,
     then AAA arbitration, as on esy.com.
   - Payments are final: it's a digital product, and a by-the-page buyer sees the page before paying
     to remove the watermark. Refunds otherwise case by case, by email (no fixed grace period listed).
   - Changes cost credits: pages are AI-made, so you keep generating and editing as credits allow.
   - Monthly plans renew until cancelled and end at the end of the paid month; Managed has a 3-month
     minimum. Free trials come with the subscription launch.
   What the code shows today: Stripe Checkout (one-time card payments), Resend for email, Anthropic
   for writing, the intake and audit forms, and no analytics or advertising scripts on seopage.com. */

export const UPDATED = 'November 6, 2026';
export const SUPPORT = 'support@seopage.com';
export const COMPANY = { name: 'ESY, LLC', lines: ['8 The Green, STE B', 'Dover, DE 19901', 'United States'] };

export type Block = string | { list: string[] } | { address: true };
export type Section = { id: string; title: string; short: string; body: Block[] };
export type Doc = { kicker: string; title: string; promise: string; short: { title: string; text: string }[]; sections: Section[] };

// ── Terms ───────────────────────────────────────────────────────────────────

export const TERMS: Doc = {
  kicker: 'Terms of service',
  title: 'The terms, in plain words',
  promise: 'The deal for building, buying and publishing pages with SEOPage. Using it means you agree.',
  short: [
    { title: 'For businesses', text: 'You must be 18 or over and able to act for your business.' },
    { title: 'See it before you pay', text: 'Previews are free. Payments are final, because you’ve seen the page you’re buying.' },
    { title: 'Your page, once paid', text: 'You can use the page we make for you however you like. The SEOPage software stays ours.' },
    { title: 'You approve what goes live', text: 'Pages are written by AI from your brief. Check every claim before you publish.' },
    { title: 'No ranking promises', text: 'We build pages for Google and AI search; we can’t promise rankings, citations or leads.' },
    { title: 'Plans end when you say', text: 'Monthly plans renew until you cancel. Managed has a 3-month minimum.' },
  ],
  sections: [
    {
      id: 'agreement', title: 'This agreement',
      short: 'A contract between your business and ESY, LLC, which runs SEOPage.',
      body: [
        'SEOPage is a division of ESY, LLC, a Delaware limited liability company (registered to do business in Florida as ESY.COM LLC). These terms cover seopage.com, the SEOPage app at create.seopage.com, and the pages, plans and credits you buy (together, “SEOPage”).',
        'By using SEOPage you agree to these terms and to our privacy and cookie policies. If you don’t agree, please don’t use it.',
      ],
    },
    {
      id: 'who', title: 'Who can use SEOPage',
      short: 'Businesses, through someone 18 or over who can act for them.',
      body: ['SEOPage is for businesses. You must be at least 18 and allowed to accept these terms for your business; “you” means you and that business.'],
    },
    {
      id: 'how', title: 'How SEOPage works',
      short: 'You give us a brief; AI writes a page; you preview it free and pay to publish.',
      body: [
        'You describe your business and the search you want to win. SEOPage researches and writes a page for it with AI. You can preview it free; the preview carries a watermark until you pay. Prices are shown before you pay, and taxes may apply.',
      ],
    },
    {
      id: 'brief', title: 'Your brief and your claims',
      short: 'Tell us the truth, and only use what you have the right to.',
      body: [
        'You’re responsible for what you give us: your business details, logos, photos, prices, licences, reviews and anything else that ends up on your page. Make sure it’s accurate and that you have the right to use it. We don’t check your claims.',
      ],
    },
    {
      id: 'ai', title: 'AI-written pages',
      short: 'Check every page before it goes live. Publishing is your call.',
      body: [
        'Pages are written by AI and can contain mistakes, outdated facts or wording similar to pages made for others. Review every page before you publish it. You decide what goes live, and once it’s live you’re responsible for what it says.',
      ],
    },
    {
      id: 'ownership', title: 'Who owns what',
      short: 'Once paid, the page is yours to use. Previews and the software stay ours.',
      body: [
        'Once you’ve paid for a page, you may use, edit and publish its content however you like, anywhere. Until then, the preview is ours and you may not copy or publish it. SEOPage itself, its software, templates, designs and brand belong to ESY, LLC.',
      ],
    },
    {
      id: 'results', title: 'No ranking promises',
      short: 'We build for Google and AI search. They decide who ranks.',
      body: [
        'We design pages to be found in search and cited by AI assistants, but search engines and AI companies decide what they show. We don’t promise rankings, traffic, AI citations, calls or leads.',
      ],
    },
    {
      id: 'credits', title: 'Credits',
      short: 'Generating and editing uses credits. Plans include some; you can buy more.',
      body: [
        'Making and changing pages uses credits, so you can keep generating and editing sections as far as your credits allow. Plans include credits, and you can buy more. How many each plan includes, and whether they roll over, is shown on the pricing page. Credits have no cash value and can’t be refunded or transferred.',
      ],
    },
    {
      id: 'plans', title: 'Monthly plans and trials',
      short: 'Plans renew monthly until you cancel. Managed has a 3-month minimum.',
      body: [
        { list: [
          'Monthly plans renew automatically each month, charged to your card, until you cancel.',
          'Cancel anytime: your plan runs to the end of the month you’ve paid for, with no partial refunds.',
          'The Managed plan has a minimum of three months, billed monthly. After that it renews monthly until you cancel.',
          'If a plan starts with a free trial, it turns into a paid plan when the trial ends unless you cancel before then.',
          'If we change a plan’s price, we’ll tell you before your next renewal at the new price.',
        ] },
      ],
    },
    {
      id: 'payments', title: 'Payments and refunds',
      short: 'Payments are final. If something went wrong with a charge, email us.',
      body: [
        'Payments are handled by Stripe; we never see your full card number. Because SEOPage is a digital product and you can see a page before you pay, payments are final.',
        `If something went wrong with a charge, email ${SUPPORT} within 7 days and we’ll look at it. Where the law gives you rights to a refund, those rights still apply.`,
      ],
    },
    {
      id: 'connected', title: 'Connected accounts',
      short: 'If you connect Search Console, GA4 or Bing, we read your data to report on it.',
      body: [
        'If you connect Google Search Console, Google Analytics or Bing Webmaster Tools, you let us read that data to show you reports and suggestions in SEOPage. You can disconnect at any time. How we handle that data is in our privacy policy.',
      ],
    },
    {
      id: 'rules', title: 'Things you must not do',
      short: 'No illegal businesses, no misleading pages, no abuse.',
      body: [
        'Don’t use SEOPage to:',
        { list: [
          'Promote anything illegal, or break anyone’s rights',
          'Publish false or misleading claims, fake reviews, or pages that pretend to be another business',
          'Use other companies’ trademarks in a way that misleads people',
          'Get around security, rate limits or credits, or scrape or overload the service',
          'Copy, reverse-engineer or resell the SEOPage software',
        ] },
      ],
    },
    {
      id: 'ending', title: 'Changes and ending',
      short: 'We may change SEOPage. Either of us can end this.',
      body: [
        'We may change, pause or stop parts of SEOPage. You can stop using it and cancel a plan at any time, subject to the Managed minimum. We may suspend or end your access if you break these terms or put others at risk. Pages you’ve paid for stay yours.',
      ],
    },
    {
      id: 'disclaimers', title: 'Disclaimers',
      short: 'SEOPage comes as it is.',
      body: [
        'SEOPage is provided “as is” and “as available”. To the fullest extent the law allows, we make no promises or warranties, express or implied, including that it will be accurate, uninterrupted or error-free, or fit for a particular purpose.',
      ],
    },
    {
      id: 'liability', title: 'Limits on our liability',
      short: 'What we owe you is capped at what you paid us in the last 12 months.',
      body: [
        'To the fullest extent the law allows, ESY, LLC won’t be liable for indirect, incidental, special, consequential or punitive damages, or for lost profits, revenue, data or goodwill. Our total liability for any claim is limited to the greater of what you paid us for SEOPage in the 12 months before the claim, or $100. Where the law doesn’t allow these limits, they apply as far as it permits.',
      ],
    },
    {
      id: 'indemnity', title: 'Your responsibility to us',
      short: 'If your page or brief leads to a claim against us, you cover it.',
      body: ['You’ll defend and compensate ESY, LLC for claims, losses and reasonable legal costs that come from your brief, the claims on your pages, your misuse of SEOPage, or your breaking these terms or the law.'],
    },
    {
      id: 'disputes', title: 'Disputes',
      short: 'Talk first for 30 days; then binding arbitration under Delaware law.',
      body: [
        `If you have a dispute with us, email ${SUPPORT} first and describe it. We’ll both try to settle it informally for at least 30 days.`,
        'If that fails, it will be resolved by binding arbitration administered by the American Arbitration Association under its rules. This means you give up the right to sue in court and to a jury trial.',
        'These terms are governed by the laws of the State of Delaware, without regard to its conflict-of-law rules.',
      ],
    },
    {
      id: 'changes', title: 'Changes to these terms',
      short: 'We’ll date every change and tell customers about big ones.',
      body: ['When we change these terms, we update the date at the top. If a change is significant, we’ll email customers before it takes effect. Using SEOPage after that means you accept the new terms.'],
    },
    {
      id: 'general', title: 'The rest',
      short: 'The usual legal housekeeping.',
      body: ['These terms, with our privacy and cookie policies, are the whole agreement between us about SEOPage. If a part is unenforceable, the rest still applies. Not enforcing a term isn’t a waiver. You can’t transfer this agreement without our consent; we may transfer it in a merger or sale of the business. Nobody else has rights under it.'],
    },
    {
      id: 'contact', title: 'Contact',
      short: `${SUPPORT}, or by post.`,
      body: [`Questions about these terms: ${SUPPORT}, or by post:`, { address: true }],
    },
  ],
};

// ── Privacy ─────────────────────────────────────────────────────────────────

export const PRIVACY: Doc = {
  kicker: 'Privacy policy',
  title: 'Your information, in plain words',
  promise: 'We collect what it takes to build your page and run your account, we never sell it, and you can see, fix or delete it by emailing us.',
  short: [
    { title: 'Your brief builds your page', text: 'Business details you give us are used to write your page, nothing else.' },
    { title: 'We never sell it', text: 'We share data only with the services that run SEOPage for us.' },
    { title: 'Cards stay with Stripe', text: 'Stripe handles payments; we never see your full card number.' },
    { title: 'Connected data is read-only', text: 'Search Console, GA4 or Bing data is used only to report to you, and you can disconnect.' },
    { title: 'No ad trackers', text: 'seopage.com runs no analytics or advertising cookies today.' },
    { title: 'Ask us anything', text: `Copies, corrections or deletion: ${SUPPORT}.` },
  ],
  sections: [
    {
      id: 'who', title: 'Who we are',
      short: 'SEOPage is a division of ESY, LLC.',
      body: ['This policy covers seopage.com and the SEOPage app at create.seopage.com. “We” means ESY, LLC, which runs SEOPage. ESY’s other sites, esy.com and clip.art, have their own policies.', { address: true }],
    },
    {
      id: 'collect', title: 'What we collect',
      short: 'Your brief, your contact details, your account, and what you connect.',
      body: [
        { list: [
          'Your brief: business name, what you do, where you work, phone, website, the search you want to win, brand colour and who your customers are',
          'Your email, when you order, ask for an audit or subscribe to rank¹, the journal',
          'Your account and pages in the SEOPage app',
          'Payment details, collected by Stripe; we receive only the result and the last digits of your card',
          'Data from accounts you connect (Google Search Console, Google Analytics, Bing Webmaster Tools), only if you connect them',
          'Basic technical logs our hosting keeps to run and secure the site',
        ] },
      ],
    },
    {
      id: 'use', title: 'How we use it',
      short: 'To build your pages, run your account, and talk to you about them.',
      body: [
        { list: [
          'Research and write your pages, and keep them up to date',
          'Run your account, plans and credits, and take payments',
          'Send your audit, receipts, updates about your order and, if you subscribed, the journal',
          'Show you reports and suggestions from the accounts you connect',
          'Keep SEOPage secure and meet our legal obligations',
        ] },
        'We don’t use your information for advertising, and we don’t sell it.',
      ],
    },
    {
      id: 'google', title: 'Data from Google and Bing',
      short: 'Read-only, used only to report to you, never sold or used for ads.',
      body: [
        'If you connect Google Search Console or Google Analytics, we read that data only to show you reports and suggestions inside SEOPage. Our use of information received from Google APIs follows the Google API Services User Data Policy, including its Limited Use requirements. We don’t sell it, use it for advertising, or use it to train general AI models. The same goes for Bing Webmaster Tools. You can disconnect at any time, and we stop reading new data when you do.',
      ],
    },
    {
      id: 'share', title: 'Who we share it with',
      short: 'Only the services that run SEOPage for us.',
      body: [
        { list: [
          'Stripe: payments',
          'Resend: email',
          'Anthropic: writes your pages from your brief',
          'Our hosting providers',
        ] },
        'We may also share information if the law requires it, to protect people’s safety or our rights, or as part of a sale or merger of the business, in which case this policy keeps applying.',
      ],
    },
    {
      id: 'bases', title: 'Our legal bases',
      short: 'Our contract with you, your consent, or a legitimate interest you can object to.',
      body: ['If you’re in the UK, the EU or a place with similar laws, we rely on our contract with you to build pages and run your account, your consent for the journal and connected accounts, legitimate interests to keep SEOPage secure and improve it, and legal obligations where they apply.'],
    },
    {
      id: 'keep', title: 'How long we keep it',
      short: 'While you’re a customer, then only what the law requires.',
      body: ['We keep your brief, pages and account while you use SEOPage. After you close your account, we delete or anonymise them, except records the law requires us to keep, such as invoices. Connected-account data stops updating when you disconnect and is deleted when you close your account.'],
    },
    {
      id: 'rights', title: 'Your rights',
      short: 'See it, fix it, delete it, take it with you, or object.',
      body: [`Depending on where you live, you can ask us for a copy of your information, to correct or delete it, to send it to you in a portable format, to limit or stop using it, or to withdraw consent. Email ${SUPPORT}; we’ll answer within 30 days. If you’re in the UK or EU, you can also complain to your data protection authority. We don’t sell or share personal information as California law defines those terms.`],
    },
    {
      id: 'transfers', title: 'Where it’s stored',
      short: 'In the United States.',
      body: ['We and most of our providers are in the United States. If you’re elsewhere, your information is transferred there, under safeguards such as standard contractual clauses where they’re required.'],
    },
    {
      id: 'security', title: 'Keeping it safe',
      short: 'Encryption in transit, few people with access, trusted providers.',
      body: ['We use encryption in transit, limit who can access information, and choose providers with strong security. No system is perfectly secure, so we’ll tell you promptly if a breach affects you.'],
    },
    {
      id: 'children', title: 'Children',
      short: 'SEOPage is for businesses, not children.',
      body: ['SEOPage is for people 18 and over acting for a business. We don’t knowingly collect information from children.'],
    },
    {
      id: 'changes', title: 'Changes and contact',
      short: 'We date every change. Questions go to support.',
      body: [`When we change this policy, we update the date at the top and email customers about significant changes. Questions: ${SUPPORT}, or by post:`, { address: true }],
    },
  ],
};

// ── Cookies ─────────────────────────────────────────────────────────────────

export const COOKIES: Doc = {
  kicker: 'Cookie policy',
  title: 'Cookies, in plain words',
  promise: 'seopage.com doesn’t use analytics or advertising cookies. Here is the little it does store.',
  short: [
    { title: 'No trackers', text: 'No analytics or advertising cookies run on seopage.com today.' },
    { title: 'Only what’s needed', text: 'Signing in to the app and paying need a few essential cookies.' },
    { title: 'We’ll ask first', text: 'If we ever add analytics, we’ll ask for your OK first and update this page.' },
  ],
  sections: [
    {
      id: 'what', title: 'What cookies are',
      short: 'Small notes a site leaves in your browser.',
      body: ['Cookies, and your browser’s local storage, are small pieces of text a site saves so it can remember something between pages or visits.'],
    },
    {
      id: 'ours', title: 'What we store',
      short: 'Essential only: signing in, and payments on Stripe’s site.',
      body: [
        { list: [
          'seopage.com: no cookies of its own for tracking or advertising.',
          'The SEOPage app (create.seopage.com): essential cookies that keep you signed in and protect your session.',
          'Checkout: payments happen on Stripe’s secure page, which sets its own essential cookies to process the payment and prevent fraud.',
        ] },
      ],
    },
    {
      id: 'others', title: 'Other sites',
      short: 'Links you follow and accounts you connect have their own cookies.',
      body: ['When you connect Google or Bing, or follow a link to another site, that site’s cookies and policies apply there.'],
    },
    {
      id: 'choices', title: 'Your choices',
      short: 'Your browser can clear or block cookies.',
      body: ['You can clear or block cookies in your browser’s settings. Blocking essential ones will stop you signing in to the app or paying.'],
    },
    {
      id: 'changes', title: 'Changes and contact',
      short: 'We’ll update this page and ask first if anything new is added.',
      body: [`If what we store changes, we’ll update this page and its date, and ask for consent before any analytics run. Questions: ${SUPPORT}.`],
    },
  ],
};
