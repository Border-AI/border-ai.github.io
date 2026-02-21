const COUNTRIES = [
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
];

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
      { label: "Log in / sign up", href: "/app/signup" }
    ],
    cta: { label: "Eligibility check", href: "/eligibility-check/" }
  },
  footer: {
    accessibilityLabel: "Site footer",
    motto:"",
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
      address: "Canada, BC",
      emailLabel: "Email",
      email: "zrazavi97@gmail.com"
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
        description: "Preview your visa match, check your eligibility, and review next steps."
      },
      flow: {
        visaMatch: {
          title: "1 · Visa match check",
          description: "",
          introQuestions: [
            {
              id: "nationality",
              type: "select",
              label: "What is your nationality (based on the passport you want to apply with)?",
              placeholder: "Select a country",
              options: COUNTRIES
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
            }
          ],
          branches: {
            study: {
              label: "Study permit flow",
              questions: [
                {
                  id: "study-situation",
                  type: "radio",
                  label: "Select the option that best matches your situation.",
                  options: [
                    { value: "first", label: "I’m applying for my first study permit" },
                    { value: "has", label: "I have my first study permit" },
                    { value: "extend", label: "I've extended or plan to extend my study permit" }
                  ]
                },
                {
                  id: "study-location",
                  type: "radio",
                  label: "Where will you apply from?",
                  options: [
                    { value: "outside", label: "Outside Canada" },
                    { value: "inside", label: "Inside Canada" },
                    { value: "unsure", label: "Not sure" }
                  ]
                },
                {
                  id: "study-program-length",
                  type: "radio",
                  label: "How long is your program in Canada?",
                  helper: "A study permit is generally for programs longer than 6 months.",
                  options: [
                    { value: "long", label: "More than 6 months" },
                    { value: "short", label: "6 months or less" },
                    { value: "unknown", label: "Not sure yet" }
                  ]
                }
              ],
              result: {
                title: "Your visa type is Canada Study Permit",
                helper: "Answer the rest of the questions to see whether you are eligible and what is your chance of approval."
              }
            },
            work: {
              label: "Work permit flow",
              questions: [
                {
                  id: "work-situation",
                  type: "radio",
                  label: "Select the option that best matches your situation.",
                  options: [
                    { value: "first", label: "I’m applying for my first work permit" },
                    { value: "has", label: "I have my first work permit" },
                    { value: "extend", label: "I've extended or plan to extend my work permit" }
                  ]
                },
                {
                  id: "work-location",
                  type: "radio",
                  label: "Where will you apply from?",
                  options: [
                    { value: "outside", label: "Outside Canada" },
                    { value: "inside", label: "Inside Canada" },
                    { value: "unsure", label: "Not sure" }
                  ]
                }
              ],
              result: {
                title: "Your visa type is Canada Work Permit",
                helper: "Answer the rest of the questions to see whether you are eligible and what is your chance of approval."
              }
            },
            visit: {
              label: "Visitor visa flow",
              questions: [
                {
                  id: "visit-purpose",
                  type: "radio",
                  label: "What is the main purpose of your trip?",
                  helper: "You’ll normally support this with an itinerary / bookings / explanation letter.",
                  options: [
                    { value: "tourism", label: "Tourism (vacation, sightseeing)" },
                    { value: "family", label: "Visiting family or friends" },
                    { value: "event", label: "Attending an event (conference, wedding, etc.)" },
                    { value: "business", label: "Short business visit (meetings)" },
                    { value: "other", label: "Other (explain)" }
                  ]
                }
              ],
              result: {
                title: "Your visa type is Canada Visitor Visa",
                helper: "Answer the rest of the questions to see whether you are eligible and what is your chance of approval."
              }
            }
          },
          cta: {
            title: "Continue to check your eligibility and your chance of approval.",
            primaryLabel: "Eligibility check",
            secondaryLabel: "Previous"
          }
        },
        eligibilityCheck: {
          title: "2 · Eligibility check",
          description: "",
          branches: {
            study: {
              questions: [
                {
                  id: "study-travel-history",
                  type: "checkbox",
                  label: "Travel history (last 10 years)",
                  helper: "Have you previously held a visa or entry permission for any of the following: Canada / USA / UK / Schengen?",
                  options: [
                    { value: "canada", label: "Yes, I had a Canada visa" },
                    { value: "usa", label: "Yes, I had a USA visa" },
                    { value: "uk", label: "Yes, I had a UK visa" },
                    { value: "schengen", label: "Yes, I had a Schengen visa" },
                    { value: "none", label: "No, I have not had any of these" },
                    { value: "unsure", label: "I’m not sure / I don’t remember" }
                  ]
                },
                {
                  id: "study-refusals",
                  type: "radio",
                  label: "Previous refusals or immigration issues",
                  options: [
                    { value: "none", label: "No, never refused, never overstayed" },
                    { value: "refused", label: "Yes, my visa/permit was refused (Canada or another country)" },
                    { value: "overstay", label: "Yes, I overstayed / violated conditions in any country" },
                    { value: "denied-entry", label: "Yes, I was denied entry at a border" }
                  ]
                },
                {
                  id: "study-loa",
                  type: "radio",
                  label: "Letter of Acceptance (LOA) from a DLI",
                  options: [
                    { value: "has", label: "Yes, I have an LOA from a DLI" },
                    { value: "unsure", label: "I have an LOA but I’m not sure if the school is a DLI" },
                    { value: "no", label: "No, I don’t have an LOA yet" }
                  ]
                },
                {
                  id: "study-province",
                  type: "radio",
                  label: "Province/territory of study",
                  helper: "If you study in Quebec, you also need a CAQ.",
                  options: [
                    { value: "quebec", label: "Quebec" },
                    { value: "other", label: "Other province/territory (not Quebec)" },
                    { value: "unknown", label: "Not decided yet" }
                  ]
                },
                {
                  id: "study-pal",
                  type: "radio",
                  label: "Provincial/Territorial Attestation Letter (PAL/TAL)",
                  helper: "Most study permit applicants must include a PAL/TAL.",
                  options: [
                    { value: "has", label: "Yes, I have a PAL/TAL" },
                    { value: "pending", label: "Not yet, but my school will provide it" },
                    { value: "exempt", label: "I’m exempt (I can provide proof of exemption)" },
                    { value: "unknown", label: "I don’t know" }
                  ]
                },
                {
                  id: "study-plan-fit",
                  type: "radio",
                  label: "Study plan fit",
                  options: [
                    { value: "aligned", label: "The program clearly matches my previous education/work and goals" },
                    { value: "somewhat", label: "Somewhat related, I can explain the reason for the change" },
                    { value: "not-aligned", label: "Not clearly related, I will need a strong explanation" }
                  ]
                },
                {
                  id: "study-family",
                  type: "radio",
                  label: "Accompanying family members",
                  helper: "Funds are assessed for you and accompanying family members.",
                  options: [
                    { value: "alone", label: "No, I’m applying alone" },
                    { value: "spouse", label: "Yes, spouse/partner" },
                    { value: "children", label: "Yes, child(ren)" },
                    { value: "family", label: "Yes, spouse/partner + child(ren)" }
                  ]
                },
                {
                  id: "study-funds-capacity",
                  type: "radio",
                  label: "Proof of funds, minimum living expenses guideline (outside Quebec)",
                  helper: "For applications on or after Sep 1, 2025, required living expenses (excluding tuition + travel) start at CAD 22,895/year for one person.",
                  options: [
                    { value: "yes", label: "Yes, I can meet/exceed the required amount (plus tuition + travel)" },
                    { value: "maybe", label: "Maybe, but it will be tight" },
                    { value: "no", label: "No, I can’t meet it" }
                  ]
                },
                {
                  id: "study-fund-proof",
                  type: "checkbox",
                  label: "Proof of funds documents",
                  helper: "Which proofs can you provide?",
                  options: [
                    { value: "bank", label: "Bank statements for the past 4 months" },
                    { value: "fees", label: "Proof of tuition and housing fees paid" },
                    { value: "gic", label: "GIC (Guaranteed Investment Certificate)" },
                    { value: "loan", label: "Student/education loan approval" },
                    { value: "scholarship", label: "Scholarship / funded program proof" },
                    { value: "sponsor", label: "Sponsor letter + sponsor’s proof of funds" },
                    { value: "other", label: "Other (explain)" }
                  ]
                },
                {
                  id: "study-fund-consistency",
                  type: "radio",
                  label: "Consistency of funds",
                  options: [
                    { value: "consistent", label: "Yes, deposits and spending match my income/source" },
                    { value: "mostly", label: "Mostly yes, but I can explain exceptions with documents" },
                    { value: "inconsistent", label: "No, there are large/unexplained deposits or inconsistencies" }
                  ]
                }
              ]
            },
            work: {
              questions: [
                {
                  id: "work-travel-history",
                  type: "checkbox",
                  label: "Travel history (last 10 years)",
                  options: [
                    { value: "canada", label: "Yes, I had a Canada visa" },
                    { value: "usa", label: "Yes, I had a USA visa" },
                    { value: "uk", label: "Yes, I had a UK visa" },
                    { value: "schengen", label: "Yes, I had a Schengen visa" },
                    { value: "none", label: "No, I have not had any of these" },
                    { value: "unsure", label: "I’m not sure / I don’t remember" }
                  ]
                },
                {
                  id: "work-refusals",
                  type: "radio",
                  label: "Previous refusals or immigration issues",
                  options: [
                    { value: "none", label: "No, never refused, never overstayed" },
                    { value: "refused", label: "Yes, my visa/permit was refused (Canada or another country)" },
                    { value: "overstay", label: "Yes, I overstayed / violated conditions in any country" },
                    { value: "denied-entry", label: "Yes, I was denied entry at a border" }
                  ]
                },
                {
                  id: "work-flow",
                  type: "radio",
                  label: "Which work permit pathway applies to you?",
                  options: [
                    { value: "employer", label: "Employer-specific (Closed) work permit" },
                    { value: "owp", label: "Open Work Permit (OWP)" },
                    { value: "pgwp", label: "Post-Graduation Work Permit (PGWP)" },
                    { value: "iec", label: "International Experience Canada (IEC)" }
                  ]
                },
                {
                  id: "employer-offer",
                  type: "radio",
                  label: "Job offer / contract",
                  showWhen: { field: "work-flow", equals: ["employer"] },
                  options: [
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" }
                  ]
                },
                {
                  id: "employer-lmia",
                  type: "radio",
                  label: "LMIA status",
                  showWhen: { field: "work-flow", equals: ["employer"] },
                  options: [
                    { value: "lmia", label: "I have a positive LMIA from my employer" },
                    { value: "exempt", label: "My job is LMIA-exempt, and my employer will provide an Offer of Employment number" },
                    { value: "unsure", label: "Not sure" }
                  ]
                },
                {
                  id: "employer-offer-number",
                  type: "radio",
                  label: "Offer of Employment number",
                  showWhen: { field: "work-flow", equals: ["employer"] },
                  options: [
                    { value: "has", label: "Yes, I already have it" },
                    { value: "pending", label: "They will submit it and share it with me" },
                    { value: "no", label: "No / employer can’t do it" }
                  ]
                },
                {
                  id: "owp-pathway",
                  type: "radio",
                  label: "OWP pathway",
                  showWhen: { field: "work-flow", equals: ["owp"] },
                  options: [
                    { value: "spouse", label: "Spouse/common-law partner of an international student" },
                    { value: "family-worker", label: "Family member of a foreign worker in Canada" },
                    { value: "bowp", label: "Bridging Open Work Permit (BOWP), PR in process" },
                    { value: "vulnerable", label: "Vulnerable worker open work permit" },
                    { value: "other", label: "Other open work permit category / Not sure" }
                  ]
                },
                {
                  id: "owp-student-program",
                  type: "radio",
                  label: "Is the student enrolled in an eligible program?",
                  showWhen: { field: "owp-pathway", equals: ["spouse"] },
                  options: [
                    { value: "masters", label: "Master’s degree 16 months or longer" },
                    { value: "phd", label: "Doctoral (PhD) program" },
                    { value: "professional", label: "Professional degree program" },
                    { value: "unsure", label: "Not sure" }
                  ]
                },
                {
                  id: "owp-worker-eligibility",
                  type: "radio",
                  label: "Does the foreign worker meet the eligibility rules?",
                  showWhen: { field: "owp-pathway", equals: ["family-worker"] },
                  options: [
                    { value: "yes", label: "Yes (eligible occupation category) and at least 16 months remaining" },
                    { value: "unsure", label: "Not sure" },
                    { value: "no", label: "No" }
                  ]
                },
                {
                  id: "owp-bowp",
                  type: "radio",
                  label: "Are you eligible for a Bridging Open Work Permit?",
                  showWhen: { field: "owp-pathway", equals: ["bowp"] },
                  options: [
                    { value: "yes", label: "I’m in Canada with valid or maintained status" },
                    { value: "proof", label: "I applied for PR and can provide proof" },
                    { value: "unsure", label: "Not sure" }
                  ]
                },
                {
                  id: "owp-explain",
                  type: "textarea",
                  label: "Explain your open work permit category",
                  helper: "Briefly describe your OWP situation.",
                  showWhen: { field: "owp-pathway", equals: ["vulnerable", "other"] },
                  required: true
                },
                {
                  id: "pgwp-program-eligibility",
                  type: "radio",
                  label: "Did you complete a PGWP-eligible program at a PGWP-eligible DLI?",
                  showWhen: { field: "work-flow", equals: ["pgwp"] },
                  options: [
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                    { value: "unsure", label: "Not sure" }
                  ]
                },
                {
                  id: "pgwp-program-length",
                  type: "radio",
                  label: "What was your program length?",
                  showWhen: { field: "work-flow", equals: ["pgwp"] },
                  options: [
                    { value: "eight-plus", label: "At least 8 months" },
                    { value: "short", label: "Less than 8 months" },
                    { value: "unsure", label: "Not sure" }
                  ]
                },
                {
                  id: "pgwp-timing",
                  type: "radio",
                  label: "Will you apply within 180 days of confirmation you completed your program?",
                  showWhen: { field: "work-flow", equals: ["pgwp"] },
                  options: [
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                    { value: "unsure", label: "Not sure" }
                  ]
                },
                {
                  id: "pgwp-field",
                  type: "radio",
                  label: "Field of study requirement (if applicable)",
                  showWhen: { field: "work-flow", equals: ["pgwp"] },
                  options: [
                    { value: "meet", label: "I meet it" },
                    { value: "not-meet", label: "I don’t meet it" },
                    { value: "unsure", label: "Not sure" }
                  ]
                },
                {
                  id: "iec-category",
                  type: "radio",
                  label: "Are you applying under IEC?",
                  showWhen: { field: "work-flow", equals: ["iec"] },
                  options: [
                    { value: "holiday", label: "Working Holiday (open work permit)" },
                    { value: "young", label: "Young Professionals (employer-specific)" },
                    { value: "coop", label: "International Co-op (Internship)" },
                    { value: "unsure", label: "Not sure" }
                  ]
                }
              ]
            },
            visit: {
              questions: [
                {
                  id: "visit-travel-history",
                  type: "checkbox",
                  label: "Travel history (last 10 years)",
                  options: [
                    { value: "canada", label: "Yes, I had a Canada visa" },
                    { value: "usa", label: "Yes, I had a USA visa" },
                    { value: "uk", label: "Yes, I had a UK visa" },
                    { value: "schengen", label: "Yes, I had a Schengen visa" },
                    { value: "none", label: "No, I have not had any of these" },
                    { value: "unsure", label: "I’m not sure / I don’t remember" }
                  ]
                },
                {
                  id: "visit-refusals",
                  type: "radio",
                  label: "Previous refusals or immigration issues",
                  options: [
                    { value: "none", label: "No, never refused, never overstayed" },
                    { value: "refused", label: "Yes, my visa was refused (Canada or another country)" },
                    { value: "overstay", label: "Yes, I overstayed / violated conditions in any country" },
                    { value: "denied-entry", label: "Yes, I was denied entry at a border" }
                  ]
                },
                {
                  id: "visit-invitation",
                  type: "radio",
                  label: "Invitation letter",
                  helper: "Can you provide a letter of invitation?",
                  options: [
                    { value: "citizen", label: "Yes, from a Canadian citizen or Permanent Resident" },
                    { value: "temporary", label: "Yes, from a person with temporary status in Canada" },
                    { value: "business", label: "Yes, from a business/organization in Canada" },
                    { value: "no", label: "No, I won’t provide an invitation letter" }
                  ]
                },
                {
                  id: "visit-accommodation",
                  type: "radio",
                  label: "Accommodation plan",
                  options: [
                    { value: "hotel", label: "Hotel / Airbnb for all nights (I can provide reservations)" },
                    { value: "host", label: "With a host (family/friend) + invitation letter + host status proof" },
                    { value: "mixed", label: "Mixed (some hotel + some host)" },
                    { value: "not-decided", label: "Not decided yet" }
                  ]
                },
                {
                  id: "visit-status",
                  type: "radio",
                  label: "Current status",
                  options: [
                    { value: "employed", label: "Employed (salary)" },
                    { value: "self", label: "Self-employed / business owner / freelancer" },
                    { value: "student", label: "Student" },
                    { value: "retired", label: "Retired" },
                    { value: "home", label: "Homemaker" },
                    { value: "unemployed", label: "Unemployed / between jobs" }
                  ]
                },
                {
                  id: "visit-status-docs",
                  type: "radio",
                  label: "Employment / study documents",
                  options: [
                    { value: "strong", label: "Yes, I can provide strong supporting documents" },
                    { value: "partial", label: "Some, I have partial documents" },
                    { value: "none", label: "No, I can’t provide these documents" }
                  ]
                },
                {
                  id: "visit-ties",
                  type: "radio",
                  label: "Ties to your country of residence",
                  options: [
                    { value: "strong", label: "Strong ties (job/business, family, assets, commitments)" },
                    { value: "medium", label: "Medium ties (some attachments)" },
                    { value: "weak", label: "Weak ties (few attachments)" }
                  ]
                },
                {
                  id: "visit-income-proof",
                  type: "radio",
                  label: "Income proof (last 2–3 months)",
                  options: [
                    { value: "yes", label: "Yes, I have proof of regular income" },
                    { value: "no", label: "No, I don’t have clear income proof" }
                  ]
                },
                {
                  id: "visit-bank-history",
                  type: "radio",
                  label: "Bank statements / account history",
                  options: [
                    { value: "six", label: "Yes, at least 6 months of account details" },
                    { value: "three", label: "Yes, 1–3 months of statements" },
                    { value: "none", label: "No, I can’t provide bank statements" }
                  ]
                },
                {
                  id: "visit-funds-consistency",
                  type: "radio",
                  label: "Consistency of funds",
                  options: [
                    { value: "consistent", label: "Yes, deposits and spending match my income" },
                    { value: "mostly", label: "Mostly yes, with explainable items" },
                    { value: "inconsistent", label: "No, there are large/unexplained deposits" }
                  ]
                }
              ]
            }
          }
        },
        review: {
          title: "Review complete",
          description: "Sign up to see your eligibility check result.",
          editLabel: "Edit answers",
          primaryLabel: "See your result"
        },
        result: {
          title: "Result ready",
          resetLabel: "Reset and repeat",
          continueLabel: "Continue",
          continueHref: "/app/dashboard"
        }
      }
    }
  }
};
