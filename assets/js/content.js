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
      { label: "Log in / sign up", href: "/app/?screen=login" }
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
      highlights: {
        eyebrow: "Clarity in minutes",
        title: "Instant guidance before you ever apply",
        cards: [
          {
            title: "Approval chance estimation",
            description: "AI scoring to gauge your readiness in seconds.",
            icon: "target"
          },
          {
            title: "Doc preparation",
            description: "Auto-organized forms, checklists, and evidence.",
            icon: "folder"
          },
          {
            title: "Data-based suggestions",
            description: "Guidance grounded in IRCC updates and case data.",
            icon: "graph"
          }
        ]
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
        description: "Preview your visa match, check your eligibility, and send yourself the full results."
      },
      flow: {
        visaMatch: {
          title: "1 · Visa match check",
          description: "Clarify which Canadian visa type aligns with your goals.",
          questions: [
            {
              id: "nationality",
              type: "select",
              label: "What is your nationality (based on the passport you want to apply with)?",
              placeholder: "Select a country",
              options: [
                "Afghanistan",
                "Albania",
                "Algeria",
                "Andorra",
                "Angola",
                "Antigua and Barbuda",
                "Argentina",
                "Armenia",
                "Australia",
                "Austria",
                "Azerbaijan",
                "Bahamas",
                "Bahrain",
                "Bangladesh",
                "Barbados",
                "Belarus",
                "Belgium",
                "Belize",
                "Benin",
                "Bhutan",
                "Bolivia",
                "Bosnia and Herzegovina",
                "Botswana",
                "Brazil",
                "Brunei",
                "Bulgaria",
                "Burkina Faso",
                "Burundi",
                "Cambodia",
                "Cameroon",
                "Canada",
                "Cape Verde",
                "Central African Republic",
                "Chad",
                "Chile",
                "China",
                "Colombia",
                "Comoros",
                "Congo",
                "Costa Rica",
                "Croatia",
                "Cuba",
                "Cyprus",
                "Czech Republic",
                "Denmark",
                "Djibouti",
                "Dominica",
                "Dominican Republic",
                "East Timor",
                "Ecuador",
                "Egypt",
                "El Salvador",
                "Equatorial Guinea",
                "Eritrea",
                "Estonia",
                "Ethiopia",
                "Fiji",
                "Finland",
                "France",
                "Gabon",
                "Gambia",
                "Georgia",
                "Germany",
                "Ghana",
                "Greece",
                "Grenada",
                "Guatemala",
                "Guinea",
                "Guinea-Bissau",
                "Guyana",
                "Haiti",
                "Honduras",
                "Hungary",
                "Iceland",
                "India",
                "Indonesia",
                "Iran",
                "Iraq",
                "Ireland",
                "Israel",
                "Italy",
                "Jamaica",
                "Japan",
                "Jordan",
                "Kazakhstan",
                "Kenya",
                "Kiribati",
                "North Korea",
                "South Korea",
                "Kosovo",
                "Kuwait",
                "Kyrgyzstan",
                "Laos",
                "Latvia",
                "Lebanon",
                "Lesotho",
                "Liberia",
                "Libya",
                "Liechtenstein",
                "Lithuania",
                "Luxembourg",
                "Macedonia",
                "Madagascar",
                "Malawi",
                "Malaysia",
                "Maldives",
                "Mali",
                "Malta",
                "Marshall Islands",
                "Mauritania",
                "Mauritius",
                "Mexico",
                "Micronesia",
                "Moldova",
                "Monaco",
                "Mongolia",
                "Montenegro",
                "Morocco",
                "Mozambique",
                "Myanmar",
                "Namibia",
                "Nauru",
                "Nepal",
                "Netherlands",
                "New Zealand",
                "Nicaragua",
                "Niger",
                "Nigeria",
                "Norway",
                "Oman",
                "Pakistan",
                "Palau",
                "Palestine",
                "Panama",
                "Papua New Guinea",
                "Paraguay",
                "Peru",
                "Philippines",
                "Poland",
                "Portugal",
                "Qatar",
                "Romania",
                "Russia",
                "Rwanda",
                "Saint Kitts and Nevis",
                "Saint Lucia",
                "Saint Vincent and the Grenadines",
                "Samoa",
                "San Marino",
                "Sao Tome and Principe",
                "Saudi Arabia",
                "Senegal",
                "Serbia",
                "Seychelles",
                "Sierra Leone",
                "Singapore",
                "Slovakia",
                "Slovenia",
                "Solomon Islands",
                "Somalia",
                "South Africa",
                "South Sudan",
                "Spain",
                "Sri Lanka",
                "Sudan",
                "Suriname",
                "Swaziland",
                "Sweden",
                "Switzerland",
                "Syria",
                "Taiwan",
                "Tajikistan",
                "Tanzania",
                "Thailand",
                "Togo",
                "Tonga",
                "Trinidad and Tobago",
                "Tunisia",
                "Turkey",
                "Turkmenistan",
                "Tuvalu",
                "Uganda",
                "Ukraine",
                "United Arab Emirates",
                "United Kingdom",
                "United States",
                "Uruguay",
                "Uzbekistan",
                "Vanuatu",
                "Vatican City",
                "Venezuela",
                "Vietnam",
                "Yemen",
                "Zambia",
                "Zimbabwe"
              ]
            },
            {
              id: "intent",
              type: "radio",
              label: "What do you plan to do in Canada?",
              options: [
                { value: "study", label: "Study" },
                { value: "work", label: "Work" },
                { value: "visit", label: "Visit family and friends / Tourism / Business visit" }
              ]
            },
            {
              id: "location",
              type: "radio",
              label: "Where will you apply from?",
              options: [
                { value: "outside", label: "Outside Canada" },
                { value: "inside", label: "Inside Canada" },
                { value: "unsure", label: "Not sure" }
              ]
            },
            {
              id: "situation",
              type: "radio",
              label: "Select the option that best matches your situation.",
              options: [
                { value: "first-permit", label: "I’m applying for my first study/work permit" },
                { value: "has-permit", label: "I have my first study/work permit" },
                { value: "extending", label: "I've extended or plan to extend my study/work permit" }
              ]
            }
          ],
          result: {
            heading: "Visa match result",
            detailIntro: "Based on your responses, here’s the visa category that currently fits your situation.",
            references: [
              {
                label: "IRCC study permits",
                href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html"
              },
              {
                label: "IRCC work permits",
                href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html"
              },
              {
                label: "IRCC visitor visas",
                href: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html"
              }
            ]
          },
          cta: {
            title: "Continue to check your eligibility and your chance of approval.",
            primaryLabel: "Check eligibility",
            secondaryLabel: "Previous"
          }
        },
        eligibilityCheck: {
          title: "2 · Eligibility check",
          description: "Estimate approval signals like documentation readiness, proof of funds, and ties to home country.",
          questions: [
            {
              id: "documents",
              type: "radio",
              label: "How ready are your supporting documents (IDs, transcripts, job letters, etc.)?",
              options: [
                { value: "ready", label: "Everything is organized and current" },
                { value: "partial", label: "Some items ready, some in progress" },
                { value: "starting", label: "Need guidance to understand what to prepare" }
              ]
            },
            {
              id: "funds",
              type: "radio",
              label: "Do you have proof of funds that meets IRCC requirements?",
              options: [
                { value: "fully", label: "Yes, and I can show bank statements or sponsorship" },
                { value: "working-on-it", label: "Partially — I’m arranging it now" },
                { value: "not-yet", label: "Not yet — I need help understanding the target" }
              ]
            },
            {
              id: "ties",
              type: "radio",
              label: "How strong are your ties to your home country?",
              options: [
                { value: "strong", label: "Strong: family, property, or ongoing job/studies" },
                { value: "moderate", label: "Moderate: a few ties but not all documented" },
                { value: "limited", label: "Limited ties — I will need coaching here" }
              ]
            }
          ],
          checklist: [
            "Follow the official document checklist for your visa class",
            "Double-check financial statements and currency conversions",
            "Collect translations or notarized copies where required"
          ]
        },
        summary: {
          title: "Send yourself the full result",
          description: "We’ll package the visa match summary, eligibility notes, and your personalized next steps into an email you can reference later.",
          emailLabel: "Email address",
          emailPlaceholder: "you@example.com",
          submitLabel: "Send my results",
          confirmation: "All set! Your full result is on its way. Check your inbox (and spam) for \"Border AI\".",
          disclaimer: "By submitting, you agree to receive a one-time email with your responses. Border AI never shares your data."
        }
      }
    }
  }
};
