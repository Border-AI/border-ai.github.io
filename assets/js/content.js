window.siteContent = {
  meta: {
    siteName: "Border AI",
    defaultTitle: "Border AI · Your AI visa assistant and advisor",
    description: "Personalized pathways, crystal-clear requirements, and AI-powered prep for Canadian visas."
  },
  nav: {
    brand: {
      label: "Border AI",
      href: "/",
      logo: {
        src: "/border-ai-logo.svg",
        alt: "Border AI logo"
      }
    },
    accessibility: { navLabel: "Primary navigation" },
    links: [
      { label: "Pricing", href: "/#pricing" },
      { label: "Contact us", href: "/#contact" },
      { label: "Log in / sign up", href: "/app/" }
    ],
    cta: { label: "Eligibility check", href: "/eligibility-check/" }
  },
  footer: {
    accessibilityLabel: "Site footer",
    motto: "[Motto]",
    quickLinksLabel: "Quick links",
    otherLinksLabel: "Other pages",
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "Eligibility check", href: "/eligibility-check/" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Contact", href: "/#contact" }
    ],
    otherLinks: [
      { label: "Terms", href: "/terms/" },
      { label: "Privacy", href: "/privacy/" }
    ],
    contact: {
      label: "Contact",
      address: "[Address]",
      emailLabel: "Email",
      email: "[Email]"
    },
    legalText: [
      "Border AI, Inc. is not a law firm or lawyer referral service. The services and information provided are not legal advice and do not substitute the same level of advice, opinion, guidance or recommendation that a licensed immigration attorney can provide. Border AI is not affiliated with IRCC. The purchase price of services does not include IRCC government filing fees. Use of our products and services is governed by our Terms and Conditions of Use and Privacy Policy.",
      "ATTORNEY ADVERTISEMENT: The contents of this website may contain attorney advertising under the laws or ethical rules of various states. Attorneys advertised on this website are independent attorneys. See our attorney network. Prior results achieved by independent attorneys do not guarantee a similar outcome. The information you provide to Border AI is not protected by attorney-client privilege."
    ]
  },
  pages: {
    home: {
      seo: {
        title: "Border AI · Your AI visa assistant and advisor",
        description: "Find visa pathways, understand requirements, and prep faster with Border AI."
      },
      hero: {
        eyebrow: "AI visa co-pilot",
        title: "Your AI visa assistant and advisor",
        subtitle: "Personalized pathways, crystal-clear requirements, and AI-powered prep for Canadian visas.",
        primaryCta: { label: "Eligibility check", href: "/eligibility-check/" },
        secondaryCta: { label: "Pricing", href: "#pricing" }
      },
      features: [
        {
          title: "Visa Eligibility check",
          description: "Answer guided questions and instantly see the programs you can pursue along with confidence signals."
        },
        {
          title: "Visa advisor Marketplace",
          description: "Match with vetted professionals for second opinions or full-service representation when you need it."
        },
        {
          title: "Personalized checklist",
          description: "Generate a living checklist that clarifies every document, form, and timeline tied to your profile."
        },
        {
          title: "Document organization",
          description: "Keep uploads, drafts, and version history tidy with secure storage that travels with your case."
        },
        {
          title: "Status tracking",
          description: "Monitor application progress, milestone reminders, and IRCC updates in one glance."
        }
      ],
      eligibilityCallout: {
        heading: "Find your visa match, check your eligibility and chance for visa.",
        body: "Preview the intake experience and unlock tailored recommendations in minutes.",
        cta: { label: "Eligibility check", href: "/eligibility-check/" }
      },
      pricing: {
        heading: "Pricing",
        subheading: "Simple plans for individuals and teams",
        note: "Prices in USD. Taxes may apply.",
        plans: [
          {
            name: "Basic",
            price: "19",
            frequency: "per month",
            description: "Solo applicants validating their pathway.",
            featured: false,
            cta: { label: "Get Basic", href: "/eligibility-check/" },
            features: [
              { label: "AI-powered eligibility snapshot", included: true },
              { label: "Personalized visa checklist", included: true },
              { label: "Document organization hub", included: true },
              { label: "Weekly status reminders", included: true },
              { label: "Advisor marketplace access", included: false },
              { label: "1:1 strategy session", included: false }
            ]
          },
          {
            name: "Pro",
            price: "99",
            frequency: "per month",
            description: "Power users and consultants guiding multiple applicants.",
            featured: true,
            cta: { label: "Get Pro", href: "/eligibility-check/" },
            features: [
              { label: "Everything in Basic", included: true },
              { label: "Advisor marketplace priority", included: true },
              { label: "Unlimited document workspaces", included: true },
              { label: "Real-time status insights", included: true },
              { label: "Collaboration seats", included: true },
              { label: "Dedicated success manager", included: true }
            ]
          }
        ]
      }
    },
    eligibility: {
      seo: {
        title: "Eligibility check · Border AI",
        description: "Preview the Border AI eligibility flow."
      },
      heading: "Eligibility check",
      body: "This page will host the eligibility experience. Coming soon.",
      primaryCta: { label: "Go to app", href: "/app/" },
      secondaryCta: { label: "Back to home", href: "/" }
    }
  }
};
