/**
 * translations.ts — all UI strings in NL (default) and EN.
 * Mock data (requirements, sources, questions) stays in Dutch —
 * it represents real customer content, not UI chrome.
 *
 * @requirement *
 * @scope shell
 */
export type Lang = 'nl' | 'en'

export const translations = {
  nl: {
    // ── Shell / AppShell ──────────────────────────────────────────────────────
    shell: {
      demoAs: 'Demo als',
      footer: 'B4Code clickable demo — high-fidelity prototype · geen productie SaaS',
      wave01: 'Wave 01 — Kern',
      wave02: 'Wave 02 — Demo+',
      tagline: 'Specify before you build',
    },
    // ── Navigation labels ─────────────────────────────────────────────────────
    nav: {
      login:             'Login & toegang',
      workspaces:        'Workspace',
      customers:         'Klantomgeving',
      projects:          'Projectoverzicht',
      dashboard:         'Projectdashboard',
      classification:    'Classificatie',
      intake:            'Intake',
      sources:           'Waarheidsdossier',
      questions:         'Open vragen',
      requirements:      'Requirements',
      useCases:          'Use cases',
      traceability:      'Traceability',
      lfv:               'LFV',
      documents:         'Documenten',
      prototypeBriefing: 'Prototypebriefing',
      readiness:         'Readiness',
      settings:          'Routeprofiel',
      aiRun:             'AI-agent run',
      knowledgeVault:    'Knowledge Vault',
      handover:          'B4Ops Handover',
    },
    // ── Password / login gate ─────────────────────────────────────────────────
    gate: {
      access: 'Demo toegang',
      heading: 'Inloggen',
      subtitle: 'Deze demo is privé. Neem contact op met het B4Code team voor toegang.',
      userLabel: 'Gebruikersnaam',
      passLabel: 'Wachtwoord',
      userPlaceholder: 'b4code',
      passholder: '••••••••',
      submit: 'Inloggen →',
      error: 'Onjuiste gebruikersnaam of wachtwoord. Probeer opnieuw.',
    },
    // ── Login / persona selection ─────────────────────────────────────────────
    login: {
      tagline: 'AI-FIRST SPECIFICATIEFABRIEK',
      heading: 'Specify before you build.',
      subtitle: 'Kies een demo-rol om de Kerkleden-app case te bekijken vanuit jouw perspectief.',
      startBtn: (role: string) => `Start demo als ${role} →`,
      roles: {
        Consultant:   { label: 'Consultant',    desc: 'Voert intake uit en bouwt specificatieobjecten op.',           badge: 'Primaire persona' },
        Founder:      { label: 'Founder',       desc: 'Ziet SaaS-propositie, schaalbaarheid en bewijswaarde.',        badge: 'Demo view' },
        ProductOwner: { label: 'Product Owner', desc: 'Beheert scope, use cases en acceptatiecriteria.',             badge: 'Scope' },
        Investor:     { label: 'Investor',      desc: 'Ziet traceability, readiness en controlled AI.',              badge: 'Bewijs' },
      },
    },
    // ── Persona banner ────────────────────────────────────────────────────────
    persona: {
      Consultant:   '🛠 Consultant-view — je ziet de volledige intake- en specificatieworkflow.',
      Founder:      '🚀 Founder-view — focus op SaaS-propositie, schaalbaarheid en klantbewijs.',
      ProductOwner: '📋 Product Owner-view — focus op use cases, acceptatiecriteria en scope.',
      Investor:     '📊 Investor-view — focus op traceability, readiness score en controlled AI.',
    },
    // ── Common actions / labels ───────────────────────────────────────────────
    common: {
      openQuestions:    'Open vragen',
      nextBestAction:   'Next best action',
      aiProposed:       'AI voorgesteld',
      startIntake:      'Start intake →',
      viewQuestions:    'Bekijk open vragen →',
      viewTraceability: 'Bekijk volledige traceability →',
      viewDocuments:    'Bekijk documentgeneratie →',
      openLfv:          'Open LFV →',
      sources:          'Bronnen',
      requirements:     'Requirements',
      useCases:         'Use cases',
      documents:        'Documenten',
      readiness:        'Readiness',
      score:            'Score',
      blockers:         'blokkades',
      validated:        'gevalideerd',
      proposed:         'voorgesteld',
      draft:            'concept',
      blocked:          'geblokkeerd',
      ready:            'gereed',
    },
    // ── Screen: Workspaces (SCR-002) ──────────────────────────────────────────
    workspaces: {
      label:    'WORKSPACES',
      title:    'Kies een workspace',
      subtitle: 'Je actieve klantomgevingen en samenwerkingsprojecten.',
    },
    // ── Screen: Dashboard (SCR-005) ───────────────────────────────────────────
    dashboard: {
      label:    'PROJECTDASHBOARD',
      title:    'Kerkleden-app',
      subtitle: 'Centrale cockpit voor eerste bewijsroute: input → objecten → traceability → LFV → readiness.',
      panels: {
        consultant: {
          heading: '🛠 Workflow voortgang',
          steps: ['Intake sessie', 'Waarheidsdossier', 'Open vragen verwerken', 'Requirements valideren', 'Use cases opstellen', 'Traceability-light', 'LFV genereren', 'Readiness gate'],
        },
        founder: {
          heading: '🚀 Business case — Kerkleden-app',
          sub: 'Van ruwe klantinput naar gedocumenteerde specificatie in één sessie.',
          stats: [
            { label: 'Intake → Requirements', value: '2 uur', sub: 'vs. 2–3 dagen handmatig' },
            { label: 'Bronnen verwerkt',       value: '3',    sub: 'interviews + docs + mails' },
            { label: 'Requirements gegenereerd',value: '8',   sub: 'AI-first, human-validated' },
            { label: 'Traceability score',     value: '87%',  sub: 'volledig herleidbaar' },
          ],
          callout: '💡 Verkoopargument: klant ziet resultaat ná eerste sessie — nog vóór één regel code.',
        },
        po: {
          heading: '📋 Scope overzicht — use cases',
          footer: 'use cases totaal · AC = acceptatiecriteria',
        },
        investor: {
          heading: '📊 Governance checklist',
          checks: ['AI-run gelogd en traceerbaar', 'Elke requirement heeft een bron', 'Traceability matrix aanwezig', 'Open vragen geresolved', 'Readiness gate gepasseerd', 'LFV document gegenereerd'],
        },
      },
    },
    // ── Screen: Requirements (SCR-010) ────────────────────────────────────────
    requirements: {
      label:    'REQUIREMENTS',
      title:    'Van bron naar requirement',
      subtitle: 'Input vertalen naar herleidbare requirements.',
      highlights: {
        Consultant:   ['Elke requirement is herleidbaar naar een bron', 'AI-gegenereerd + handmatig gevalideerd'],
        Founder:      ['Requirements = bewijs dat de klant begrepen is', 'Versnelling vs handmatig uitschrijven'],
        ProductOwner: ['Status per requirement: voorgesteld → geaccepteerd → afgewezen', 'Directe koppeling met use cases'],
        Investor:     ['100% herleidbaar = auditeerbaar proces', 'AI-first methodiek, human in the loop'],
      },
    },
    // ── Screen: Traceability (SCR-012) ────────────────────────────────────────
    traceability: {
      label:    'TRACEABILITY LIGHT',
      title:    'Bron → Requirement → Use case → LFV',
      subtitle: 'Aantoonbare herleidbaarheid van klantinput tot output.',
      highlights: {
        Consultant:   ['Volledige keten van klantinput naar deliverable', 'Gebruik als kwaliteitscheck'],
        Founder:      ['Klantbewijs: elke beslissing is traceerbaar', 'Differentiator vs traditioneel requirements-traject'],
        ProductOwner: ['Scope impact: wat raakt wat?', 'Basis voor change management'],
        Investor:     ['End-to-end audit trail', 'Geen black-box AI: alles herleidbaar en verklaarbaar'],
      },
    },
    // ── Screen: Readiness (SCR-016) ───────────────────────────────────────────
    readiness: {
      label:    'PMO & READINESS',
      title:    'Demo decision gate',
      subtitle: 'Advies: GO voor clickable demo review; NO-GO voor build-ready SaaS-product.',
      highlights: {
        Consultant:   ['Check completeness voor demo-oplevering', 'Verwerk blokkades vóór de review'],
        Founder:      ['Readiness = verkoopbaar bewijs naar klanten', 'GO = klaar voor demo-presentatie'],
        ProductOwner: ['Scope volledigheid en acceptatiecriteriastatus', 'Blokkades die delivery raken'],
        Investor:     ['GO/ADJUST/BLOCK gate = gecontroleerde delivery', 'Score als bewijs voor methodische aanpak'],
      },
      gate: {
        heading:  'Demo decision gate advies',
        go:       'Clickable demo review',
        adjust:   'Open vragen afronden voor Wave 02',
        block:    'Build-ready SaaS — niet claimen',
        scope:    { title: 'Scope',      body: 'Wave 01 core compleet genoeg voor eerste review.' },
        ai:       { title: 'AI',         body: 'AI-run light of mock toegestaan mits gelabeld.' },
        build:    { title: 'Build-ready',body: 'Niet claimen; dit is prototypefase.' },
        cta:      'Bekijk documentgeneratie →',
      },
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // ENGLISH
  // ════════════════════════════════════════════════════════════════════════════
  en: {
    shell: {
      demoAs: 'Demo as',
      footer: 'B4Code clickable demo — high-fidelity prototype · not production SaaS',
      wave01: 'Wave 01 — Core',
      wave02: 'Wave 02 — Demo+',
      tagline: 'Specify before you build',
    },
    nav: {
      login:             'Login & access',
      workspaces:        'Workspace',
      customers:         'Customer overview',
      projects:          'Project overview',
      dashboard:         'Project dashboard',
      classification:    'Classification',
      intake:            'Intake',
      sources:           'Truth dossier',
      questions:         'Open questions',
      requirements:      'Requirements',
      useCases:          'Use cases',
      traceability:      'Traceability',
      lfv:               'LFV',
      documents:         'Documents',
      prototypeBriefing: 'Prototype briefing',
      readiness:         'Readiness',
      settings:          'Route profile',
      aiRun:             'AI agent run',
      knowledgeVault:    'Knowledge Vault',
      handover:          'B4Ops Handover',
    },
    gate: {
      access:          'Demo access',
      heading:         'Sign in',
      subtitle:        'This demo is private. Contact the B4Code team for access.',
      userLabel:       'Username',
      passLabel:       'Password',
      userPlaceholder: 'b4code',
      passholder:      '••••••••',
      submit:          'Sign in →',
      error:           'Incorrect username or password. Please try again.',
    },
    login: {
      tagline: 'AI-FIRST SPECIFICATION FACTORY',
      heading: 'Specify before you build.',
      subtitle: 'Choose a demo role to explore the Kerkleden-app case from your perspective.',
      startBtn: (role: string) => `Start demo as ${role} →`,
      roles: {
        Consultant:   { label: 'Consultant',    desc: 'Runs intake and builds specification objects.',              badge: 'Primary persona' },
        Founder:      { label: 'Founder',       desc: 'Sees SaaS proposition, scalability and proof of value.',   badge: 'Demo view' },
        ProductOwner: { label: 'Product Owner', desc: 'Manages scope, use cases and acceptance criteria.',        badge: 'Scope' },
        Investor:     { label: 'Investor',      desc: 'Sees traceability, readiness and controlled AI.',          badge: 'Evidence' },
      },
    },
    persona: {
      Consultant:   '🛠 Consultant view — you see the full intake and specification workflow.',
      Founder:      '🚀 Founder view — focus on SaaS proposition, scalability and customer proof.',
      ProductOwner: '📋 Product Owner view — focus on use cases, acceptance criteria and scope.',
      Investor:     '📊 Investor view — focus on traceability, readiness score and controlled AI.',
    },
    common: {
      openQuestions:    'Open questions',
      nextBestAction:   'Next best action',
      aiProposed:       'AI proposed',
      startIntake:      'Start intake →',
      viewQuestions:    'View open questions →',
      viewTraceability: 'View full traceability →',
      viewDocuments:    'View document generation →',
      openLfv:          'Open LFV →',
      sources:          'Sources',
      requirements:     'Requirements',
      useCases:         'Use cases',
      documents:        'Documents',
      readiness:        'Readiness',
      score:            'Score',
      blockers:         'blockers',
      validated:        'validated',
      proposed:         'proposed',
      draft:            'draft',
      blocked:          'blocked',
      ready:            'ready',
    },
    workspaces: {
      label:    'WORKSPACES',
      title:    'Choose a workspace',
      subtitle: 'Your active customer environments and collaboration projects.',
    },
    dashboard: {
      label:    'PROJECT DASHBOARD',
      title:    'Kerkleden-app',
      subtitle: 'Central cockpit for the first proof route: input → objects → traceability → LFV → readiness.',
      panels: {
        consultant: {
          heading: '🛠 Workflow progress',
          steps: ['Intake session', 'Truth dossier', 'Process open questions', 'Validate requirements', 'Draft use cases', 'Traceability-light', 'Generate LFV', 'Readiness gate'],
        },
        founder: {
          heading: '🚀 Business case — Kerkleden-app',
          sub: 'From raw customer input to documented specification in one session.',
          stats: [
            { label: 'Intake → Requirements', value: '2 hrs', sub: 'vs. 2–3 days manually' },
            { label: 'Sources processed',      value: '3',    sub: 'interviews + docs + emails' },
            { label: 'Requirements generated', value: '8',    sub: 'AI-first, human-validated' },
            { label: 'Traceability score',     value: '87%',  sub: 'fully traceable' },
          ],
          callout: '💡 Sales argument: customer sees results after the first session — before a single line of code.',
        },
        po: {
          heading: '📋 Scope overview — use cases',
          footer: 'use cases total · AC = acceptance criteria',
        },
        investor: {
          heading: '📊 Governance checklist',
          checks: ['AI run logged and traceable', 'Every requirement has a source', 'Traceability matrix present', 'Open questions resolved', 'Readiness gate passed', 'LFV document generated'],
        },
      },
    },
    requirements: {
      label:    'REQUIREMENTS',
      title:    'From source to requirement',
      subtitle: 'Translating input into traceable requirements.',
      highlights: {
        Consultant:   ['Every requirement is traceable to a source', 'AI-generated + manually validated'],
        Founder:      ['Requirements = proof the customer has been understood', 'Speed vs manual writing'],
        ProductOwner: ['Status per requirement: proposed → accepted → rejected', 'Direct link to use cases'],
        Investor:     ['100% traceable = auditable process', 'AI-first methodology, human in the loop'],
      },
    },
    traceability: {
      label:    'TRACEABILITY LIGHT',
      title:    'Source → Requirement → Use case → LFV',
      subtitle: 'Demonstrable traceability from customer input to output.',
      highlights: {
        Consultant:   ['Full chain from customer input to deliverable', 'Use as quality check'],
        Founder:      ['Customer proof: every decision is traceable', 'Differentiator vs traditional requirements'],
        ProductOwner: ['Scope impact: what touches what?', 'Foundation for change management'],
        Investor:     ['End-to-end audit trail', 'No black-box AI: everything traceable and explainable'],
      },
    },
    readiness: {
      label:    'PMO & READINESS',
      title:    'Demo decision gate',
      subtitle: 'Advice: GO for clickable demo review; NO-GO for build-ready SaaS product.',
      highlights: {
        Consultant:   ['Check completeness for demo delivery', 'Resolve blockers before the review'],
        Founder:      ['Readiness = sellable proof to customers', 'GO = ready for demo presentation'],
        ProductOwner: ['Scope completeness and acceptance criteria status', 'Blockers affecting delivery'],
        Investor:     ['GO/ADJUST/BLOCK gate = controlled delivery', 'Score as evidence of methodical approach'],
      },
      gate: {
        heading:  'Demo decision gate advice',
        go:       'Clickable demo review',
        adjust:   'Resolve open questions before Wave 02',
        block:    'Build-ready SaaS — do not claim',
        scope:    { title: 'Scope',       body: 'Wave 01 core complete enough for first review.' },
        ai:       { title: 'AI',          body: 'AI-run light or mock allowed if labelled.' },
        build:    { title: 'Build-ready', body: 'Do not claim; this is the prototype phase.' },
        cta:      'View document generation →',
      },
    },
  },
} as const

export type Translations = typeof translations.nl
