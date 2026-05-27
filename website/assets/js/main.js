(() => {
  const content = getSiteContent();
  if (!content) return;
  window.siteContent = content;

  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    if (page === 'home') {
      applySeo(content.pages.home);
      renderHome(content.pages.home);
    } else if (page === 'eligibility') {
      applySeo(content.pages.eligibility);
      renderEligibility(content.pages.eligibility);
    } else if (!document.title) {
      document.title = content.meta.defaultTitle;
    }
  });

  function applySeo(pageContent) {
    if (!pageContent) return;
    const title = pageContent.seo?.title || content.meta.defaultTitle;
    const description = pageContent.seo?.description || content.meta.description;
    document.title = title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', description);
    }
  }

  function renderHome(homeContent) {
    if (!homeContent) return;
    renderHero(homeContent.hero);
    renderHighlights(homeContent.highlights);
    renderFeatures(homeContent.features);
    renderEligibilityCallout(homeContent.eligibilityCallout);
    renderPricing(homeContent.pricing);
  }

  function renderHero(hero) {
    const target = document.querySelector('[data-section="hero"]');
    if (!target || !hero) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'hero-grid';

    if (hero.image) {
      const picture = document.createElement('picture');
      picture.className = 'hero-media';

      const mobileWebp = document.createElement('source');
      mobileWebp.media = '(max-width: 700px)';
      mobileWebp.type = 'image/webp';
      mobileWebp.srcset = hero.image.mobileWebp;

      const mobilePng = document.createElement('source');
      mobilePng.media = '(max-width: 700px)';
      mobilePng.type = 'image/png';
      mobilePng.srcset = hero.image.mobilePng;

      const desktopWebp = document.createElement('source');
      desktopWebp.type = 'image/webp';
      desktopWebp.srcset = hero.image.desktopWebp;

      const image = document.createElement('img');
      image.src = hero.image.desktopPng;
      image.alt = hero.image.alt || '';
      image.loading = 'eager';
      image.decoding = 'async';

      picture.append(mobileWebp, mobilePng, desktopWebp, image);
      wrapper.appendChild(picture);
    }

    const content = document.createElement('div');
    content.className = 'hero-content';

    if (hero.eyebrow) {
      const eyebrow = document.createElement('span');
      eyebrow.className = 'note-pill';
      eyebrow.textContent = hero.eyebrow;
      content.appendChild(eyebrow);
    }

    const title = document.createElement('h1');
    title.className = 'hero-title';
    title.textContent = hero.title;
    content.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'hero-subtitle';
    subtitle.textContent = hero.subtitle;
    content.appendChild(subtitle);

    const actions = document.createElement('div');
    actions.className = 'hero-actions';

    const primary = document.createElement('a');
    primary.className = 'btn btn-primary';
    primary.href = hero.primaryCta.href;
    primary.textContent = hero.primaryCta.label;
    actions.appendChild(primary);

    if (hero.secondaryCta) {
      const secondary = document.createElement('a');
      secondary.className = 'btn btn-secondary';
      secondary.href = hero.secondaryCta.href;
      secondary.textContent = hero.secondaryCta.label;
      actions.appendChild(secondary);
    }

    content.appendChild(actions);
    wrapper.appendChild(content);
    target.replaceChildren(wrapper);
  }

  function renderFeatures(features) {
    const target = document.querySelector('[data-section="features"]');
    if (!target || !Array.isArray(features)) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'features-section';

    const heading = document.createElement('div');
    heading.className = 'section-heading';
    const title = document.createElement('h2');
    title.textContent = 'What we offer';
    heading.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'feature-grid';

    features.forEach((feature) => {
      const card = document.createElement('article');
      card.className = 'feature-card';

      const icon = document.createElement('div');
      icon.className = 'feature-icon';
      icon.setAttribute('aria-hidden', 'true');
      const iconSvg = createFeatureIcon(feature.icon);
      if (iconSvg) {
        icon.appendChild(iconSvg);
      } else {
        icon.textContent = feature.title.charAt(0);
      }

      const title = document.createElement('h3');
      title.textContent = feature.title;

      const description = document.createElement('p');
      description.textContent = feature.description;

      card.append(icon, title, description);
      grid.appendChild(card);
    });

    wrapper.append(heading, grid);
    target.replaceChildren(wrapper);
  }

  function renderHighlights(highlights) {
    const target = document.querySelector('[data-section="highlights"]');
    if (!target || !highlights) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'highlights-section';

    const intro = document.createElement('div');
    intro.className = 'highlights-intro';

    if (highlights.eyebrow) {
      const eyebrow = document.createElement('span');
      eyebrow.className = 'note-pill';
      eyebrow.textContent = highlights.eyebrow;
      intro.appendChild(eyebrow);
    }

    if (highlights.title) {
      const heading = document.createElement('h2');
      heading.textContent = highlights.title;
      intro.appendChild(heading);
    }

    if (highlights.subtitle) {
      const copy = document.createElement('p');
      copy.textContent = highlights.subtitle;
      intro.appendChild(copy);
    }

    wrapper.appendChild(intro);

    if (Array.isArray(highlights.cards)) {
      const grid = document.createElement('div');
      grid.className = 'highlight-grid';

      highlights.cards.forEach((card) => {
        const cardEl = document.createElement('article');
        cardEl.className = 'highlight-card';

        const iconWrap = document.createElement('div');
        iconWrap.className = 'highlight-icon';
        const iconSvg = createHighlightIcon(card.icon);
        if (iconSvg) {
          iconWrap.appendChild(iconSvg);
        }

        const title = document.createElement('h3');
        title.textContent = card.title;

        const description = document.createElement('p');
        description.textContent = card.description;

        cardEl.append(iconWrap, title, description);
        grid.appendChild(cardEl);
      });

      wrapper.appendChild(grid);
    }

    target.replaceChildren(wrapper);
  }

  function renderEligibilityCallout(callout) {
    const target = document.querySelector('[data-section="eligibility-cta"]');
    if (!target || !callout) return;
    const card = document.createElement('div');
    card.className = 'cta-card';

    const heading = document.createElement('h2');
    heading.textContent = callout.heading;
    card.appendChild(heading);

    if (callout.body) {
      const body = document.createElement('p');
      body.textContent = callout.body;
      card.appendChild(body);
    }

    const button = document.createElement('a');
    button.className = 'btn btn-secondary';
    button.href = callout.cta.href;
    button.textContent = callout.cta.label;
    card.appendChild(button);

    target.replaceChildren(card);
  }

  function renderPricing(pricing) {
    const target = document.querySelector('[data-section="pricing"]');
    if (!target || !pricing) return;

    const heading = document.createElement('div');
    heading.className = 'section-heading';
    const title = document.createElement('h2');
    title.textContent = pricing.heading;
    heading.appendChild(title);

    if (pricing.subheading) {
      const sub = document.createElement('p');
      sub.className = 'hero-subtitle';
      sub.textContent = pricing.subheading;
      heading.appendChild(sub);
    }

    const grid = document.createElement('div');
    grid.className = 'pricing-grid';

    pricing.plans.forEach((plan) => {
      const card = document.createElement('article');
      card.className = 'pricing-card';
      if (plan.featured) card.classList.add('is-featured');

      const planTitle = document.createElement('div');
      planTitle.className = 'plan-title';
      planTitle.textContent = plan.name;

      const price = document.createElement('div');
      price.className = 'plan-price';
      price.textContent = `$${plan.price}`;

      const frequency = document.createElement('div');
      frequency.className = 'plan-frequency';
      frequency.textContent = plan.frequency;

      const description = document.createElement('p');
      description.textContent = plan.description;

      const features = document.createElement('ul');
      features.className = 'plan-features';
      plan.features.forEach((feature) => {
        const item = document.createElement('li');
        item.dataset.status = feature.included ? 'included' : 'excluded';
        item.textContent = feature.label;
        features.appendChild(item);
      });

      const button = document.createElement('a');
      button.className = plan.featured ? 'btn btn-primary' : 'btn btn-secondary';
      button.href = plan.cta.href;
      button.textContent = plan.cta.label;

      card.append(planTitle, price, frequency, description, features, button);
      grid.appendChild(card);
    });

    const note = document.createElement('p');
    note.className = 'pricing-note';
    note.textContent = pricing.note;

    target.replaceChildren(heading, grid, note);
  }

  function renderEligibility(eligibility) {
    if (!eligibility) return;
    initEligibilityFlow(eligibility.flow);
  }
})();

function getSiteContent() {
  if (window.siteContent) return window.siteContent;
  const script = document.getElementById('site-content');
  if (!script || !script.textContent) return null;
  try {
    return JSON.parse(script.textContent);
  } catch {
    return null;
  }
}

const ELIGIBILITY_RESULT_STORAGE_KEY = 'border_ai_eligibility_result';
const ELIGIBILITY_DRAFT_STORAGE_KEY = 'border_ai_eligibility_draft';
const ELIGIBILITY_ONLY_MODE = 'eligibility-only';

function normalizeFlowBranch(value) {
  return value === 'study' || value === 'work' || value === 'visit' ? value : null;
}

function readStoredEligibilityResult() {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(ELIGIBILITY_RESULT_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    return {
      ...parsed,
      branch: normalizeFlowBranch(parsed.branch)
    };
  } catch {
    return null;
  }
}

function readFlowRuntimeConfig() {
  if (typeof window === 'undefined') {
    return { mode: null, destination: null, branch: null, resume: null };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    mode: params.get('mode'),
    destination: params.get('destination'),
    branch: normalizeFlowBranch(params.get('branch')),
    resume: params.get('resume')
  };
}

function readStoredEligibilityDraft() {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(ELIGIBILITY_DRAFT_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return {
      visaAnswers: parsed.visaAnswers && typeof parsed.visaAnswers === 'object' ? parsed.visaAnswers : {},
      eligibilityAnswers: parsed.eligibilityAnswers && typeof parsed.eligibilityAnswers === 'object' ? parsed.eligibilityAnswers : {},
      visaBranch: normalizeFlowBranch(parsed.visaBranch),
      eligibilityBranch: normalizeFlowBranch(parsed.eligibilityBranch)
    };
  } catch {
    return null;
  }
}

function persistEligibilityDraft(state) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      ELIGIBILITY_DRAFT_STORAGE_KEY,
      JSON.stringify({
        visaAnswers: state.visaAnswers || {},
        eligibilityAnswers: state.eligibilityAnswers || {},
        visaBranch: state.visaBranch || null,
        eligibilityBranch: state.eligibilityBranch || null,
        createdAt: new Date().toISOString()
      })
    );
  } catch {
    // Ignore storage errors.
  }
}

function createHighlightIcon(type) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'var(--color-text)');
  svg.setAttribute('stroke-width', '1.35');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');

  const makeSvgEl = (tag, attrs = {}) => {
    const el = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
    return el;
  };

  if (type === 'target') {
    svg.append(
      makeSvgEl('circle', { cx: '12', cy: '12', r: '8.2', fill: 'var(--color-surface)' }),
      makeSvgEl('circle', { cx: '12', cy: '12', r: '5.2', stroke: 'var(--color-primary)' }),
      makeSvgEl('path', { d: 'M9.4 12.1l1.8 1.8 3.8-4.1', stroke: 'var(--color-primary)', 'stroke-width': '1.85' }),
      makeSvgEl('path', { d: 'M12 3.8V2.4M12 21.6v-1.4M3.8 12H2.4M21.6 12h-1.4', stroke: 'var(--color-muted)' }),
      makeSvgEl('path', { d: 'M17.8 6.2l1-1M5.2 18.8l1-1M6.2 6.2l-1-1M18.8 18.8l-1-1', stroke: 'var(--color-muted)' })
    );
  } else if (type === 'folder') {
    svg.append(
      makeSvgEl('path', { d: 'M3 1.9h11.4l5.8 5.8v14.4H3z', fill: 'var(--color-surface)' }),
      makeSvgEl('path', { d: 'M14.4 1.9v5.8h5.8', stroke: 'var(--color-text)' }),
      makeSvgEl('path', { d: 'M8 10.2h7.6M8 13.7h7.6M8 17.2h4.4', stroke: 'var(--color-muted)' }),
      makeSvgEl('path', { d: 'M5.9 10.2h.1M5.9 13.7h.1M5.9 17.2h.1', stroke: 'var(--color-primary)', 'stroke-width': '2.2' }),
      makeSvgEl('rect', { x: '15.4', y: '16.6', width: '6.2', height: '6.2', rx: '.9', fill: 'var(--color-surface)', stroke: 'var(--color-text)' }),
      makeSvgEl('path', { d: 'M16.7 19.7l1.3 1.3 2.5-2.8', stroke: 'var(--color-primary)', 'stroke-width': '1.75' })
    );
  } else if (type === 'graph') {
    svg.append(
      makeSvgEl('circle', { cx: '12', cy: '4.9', r: '3.5', fill: 'var(--color-surface)', stroke: 'var(--color-primary)' }),
      makeSvgEl('circle', { cx: '5.2', cy: '18.2', r: '3.5', fill: 'var(--color-surface)' }),
      makeSvgEl('circle', { cx: '18.8', cy: '18.2', r: '3.5', fill: 'var(--color-surface)' }),
      makeSvgEl('path', { d: 'M12 8.4v3.4M12 11.8H5.2v2.9M12 11.8h6.8v2.9', stroke: 'var(--color-muted)' }),
      makeSvgEl('path', { d: 'M10.8 4.9l.8.8 1.7-1.8', stroke: 'var(--color-primary)', 'stroke-width': '1.7' }),
      makeSvgEl('path', { d: 'M4 18.2l.8.8 1.7-1.8M17.6 18.2l.8.8 1.7-1.8', stroke: 'var(--color-primary)', 'stroke-width': '1.7' })
    );
  } else {
    svg.appendChild(makeSvgEl('circle', { cx: '12', cy: '12', r: '9', fill: 'var(--color-surface)' }));
  }

  return svg;
}

function createFeatureIcon(type) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'var(--color-text)');
  svg.setAttribute('stroke-width', '1.35');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');

  const makeSvgEl = (tag, attrs = {}) => {
    const el = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
    return el;
  };

  if (type === 'eligibility') {
    svg.append(
      makeSvgEl('circle', { cx: '12', cy: '12', r: '8.2', fill: 'var(--color-surface)' }),
      makeSvgEl('path', { d: 'M8.5 12l2.3 2.3 4.8-5.2', stroke: 'var(--color-primary)', 'stroke-width': '1.8' }),
      makeSvgEl('path', { d: 'M12 5.2v2M12 18.8v-2M5.2 12h2M18.8 12h-2', stroke: 'var(--color-muted)' })
    );
  } else if (type === 'advisor') {
    svg.append(
      makeSvgEl('circle', { cx: '8.5', cy: '10.3', r: '2.6', fill: 'var(--color-surface)' }),
      makeSvgEl('path', { d: 'M4.6 18.7a4.2 4.2 0 0 1 7.8 0', stroke: 'var(--color-text)' }),
      makeSvgEl('circle', { cx: '16.2', cy: '7.4', r: '2.2', fill: 'color-mix(in srgb, var(--color-primary) 14%, var(--color-surface))', stroke: 'var(--color-primary)' }),
      makeSvgEl('path', { d: 'M13.1 15.9a3.5 3.5 0 0 1 6.2 0', stroke: 'var(--color-primary)' })
    );
  } else if (type === 'checklist') {
    svg.append(
      makeSvgEl('rect', { x: '5.2', y: '3.5', width: '13.6', height: '17', rx: '2', fill: 'var(--color-surface)' }),
      makeSvgEl('path', { d: 'M9 2.6h6v2.7H9z', fill: 'color-mix(in srgb, var(--color-primary) 18%, var(--color-surface))', stroke: 'var(--color-primary)' }),
      makeSvgEl('path', { d: 'M8.2 10.4l.9.9 1.7-1.9M8.2 14l.9.9 1.7-1.9', stroke: 'var(--color-primary)', 'stroke-width': '1.65' }),
      makeSvgEl('path', { d: 'M12.5 10.3h3.6M12.5 14h3.6M8.2 17.4h7.9', stroke: 'var(--color-muted)' })
    );
  } else if (type === 'documents') {
    svg.append(
      makeSvgEl('path', { d: 'M4.1 6.2h5.6l1.5 1.7h6.6v9.4a1.5 1.5 0 0 1-1.5 1.5H5.6a1.5 1.5 0 0 1-1.5-1.5z', fill: 'var(--color-surface)', stroke: 'var(--color-text)' }),
      makeSvgEl('path', { d: 'M6.2 8.9h6l1.6 1.8h6.1v8.1a1.5 1.5 0 0 1-1.5 1.5H7.7a1.5 1.5 0 0 1-1.5-1.5z', fill: 'color-mix(in srgb, var(--color-primary) 14%, var(--color-surface))', stroke: 'var(--color-primary)' }),
      makeSvgEl('path', { d: 'M9.1 13.2h7.1M9.1 16h5', stroke: 'var(--color-muted)' })
    );
  } else if (type === 'status') {
    svg.append(
      makeSvgEl('circle', { cx: '12', cy: '12', r: '8.2', fill: 'var(--color-surface)' }),
      makeSvgEl('path', { d: 'M12 7.2v5.1l3.4 2', stroke: 'var(--color-text)', 'stroke-width': '1.55' }),
      makeSvgEl('path', { d: 'M6.3 12H4.8M19.2 12h-1.5M12 4.8V3.3', stroke: 'var(--color-muted)' }),
      makeSvgEl('path', { d: 'M7.3 18.1l-1.1 1.1M16.7 18.1l1.1 1.1', stroke: 'var(--color-primary)' }),
      makeSvgEl('circle', { cx: '12', cy: '12', r: '1', fill: 'var(--color-primary)', stroke: 'none' })
    );
  } else {
    return null;
  }

  return svg;
}

function initEligibilityFlow(flowContent) {
  const target = document.querySelector('[data-section="eligibility-flow"]');
  if (!target || !flowContent) return;
  const runtime = readFlowRuntimeConfig();
  const storedResult = readStoredEligibilityResult();
  const storedDraft = runtime.resume === 'review' ? readStoredEligibilityDraft() : null;
  const defaultBranch = runtime.branch || storedResult?.branch || 'visit';
  const isEligibilityOnlyMode = runtime.mode === ELIGIBILITY_ONLY_MODE;
  const hasReviewDraft = Boolean(
    storedDraft &&
    storedDraft.visaAnswers &&
    Object.keys(storedDraft.visaAnswers).length &&
    storedDraft.eligibilityAnswers &&
    Object.keys(storedDraft.eligibilityAnswers).length
  );

  const state = {
    stage: isEligibilityOnlyMode ? 'eligibility' : hasReviewDraft ? 'review' : 'visa',
    visaIndex: 0,
    eligibilityIndex: 0,
    visaAnswers: isEligibilityOnlyMode ? { intent: defaultBranch } : storedDraft?.visaAnswers || {},
    eligibilityAnswers: storedDraft?.eligibilityAnswers || {},
    visaBranch: isEligibilityOnlyMode ? defaultBranch : storedDraft?.visaBranch || null,
    eligibilityBranch: isEligibilityOnlyMode ? defaultBranch : storedDraft?.eligibilityBranch || null,
    resultData: null,
    eligibilityOnlyMode: isEligibilityOnlyMode,
    postResultDestination: runtime.destination === 'app' ? 'app' : 'signup'
  };

  const rerender = () => {
    target.replaceChildren(renderFlow(flowContent, state, rerender));
  };

  rerender();
}

function renderFlow(flowContent, state, rerender) {
  const wrapper = document.createElement('div');
  wrapper.className = 'eligibility-flow-wrapper';
  wrapper.appendChild(buildDualFlowProgress(flowContent, state));

  switch (state.stage) {
    case 'visa':
      wrapper.appendChild(buildVisaQuestionSection(flowContent, state, rerender));
      break;
    case 'visa-result':
      wrapper.appendChild(buildVisaResultCard(flowContent, state, rerender));
      break;
    case 'eligibility':
      wrapper.appendChild(buildEligibilityQuestionSection(flowContent, state, rerender));
      break;
    case 'review':
      wrapper.appendChild(buildReviewCard(flowContent, state, rerender));
      break;
    case 'result':
      wrapper.appendChild(buildResultPanel(flowContent, state, rerender));
      break;
    default:
      wrapper.appendChild(buildVisaQuestionSection(flowContent, state, rerender));
  }

  return wrapper;
}

function buildDualFlowProgress(flowContent, state) {
  const container = document.createElement('div');
  container.className = 'flow-progress-dual';

  const visaMetrics = getVisaProgressMetrics(flowContent, state);
  const eligibilityMetrics = getEligibilityProgressMetrics(flowContent, state);

  container.append(
    buildProgressItem('Visa match', visaMetrics.current, visaMetrics.total),
    buildProgressItem('Eligibility check', eligibilityMetrics.current, eligibilityMetrics.total)
  );
  return container;
}

function buildProgressItem(title, current, total) {
  const wrapper = document.createElement('div');
  wrapper.className = 'flow-progress-item';

  const count = document.createElement('p');
  count.className = 'flow-progress-count';
  count.textContent = `${current}/${total}`;

  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  const fill = document.createElement('div');
  fill.className = 'progress-bar-fill';
  fill.style.width = total ? `${(current / total) * 100}%` : '0%';
  bar.appendChild(fill);

  const sectionName = document.createElement('p');
  sectionName.className = 'flow-section-name';
  sectionName.textContent = title;

  wrapper.append(count, bar, sectionName);
  return wrapper;
}

function getVisaProgressMetrics(flowContent, state) {
  const { questions } = prepareVisaQuestions(flowContent.visaMatch, state.visaAnswers);
  const total = questions.length;
  if (!total) return { current: 0, total: 0 };
  if (state.eligibilityOnlyMode) return { current: total, total };

  const visaStages = ['visa', 'visa-result', 'eligibility', 'review', 'result'];
  if (!visaStages.includes(state.stage)) {
    return { current: 0, total };
  }

  if (state.stage === 'visa') {
    return { current: Math.min(state.visaIndex + 1, total), total };
  }

  return { current: total, total };
}

function getEligibilityProgressMetrics(flowContent, state) {
  const branch = state.eligibilityBranch || state.visaBranch || determineBranch(state.visaAnswers.intent);
  if (!branch) return { current: 0, total: 0 };

  const questions = prepareEligibilityQuestions(flowContent.eligibilityCheck, branch, state.eligibilityAnswers);
  const total = questions.length;
  if (!total) return { current: 0, total: 0 };

  if (state.stage === 'eligibility') {
    return { current: Math.min(state.eligibilityIndex + 1, total), total };
  }

  if (['review', 'result'].includes(state.stage)) {
    return { current: total, total };
  }

  return { current: 0, total };
}

function buildVisaQuestionSection(flowContent, state, rerender) {
  const section = document.createElement('section');
  section.className = 'eligibility-flow-section';

  const { questions, branch } = prepareVisaQuestions(flowContent.visaMatch, state.visaAnswers);
  const nextBranch = branch || determineBranch(state.visaAnswers.intent);
  if (state.visaBranch && nextBranch && state.visaBranch !== nextBranch) {
    clearBranchAnswers(state.visaAnswers);
    state.visaBranch = nextBranch;
    state.visaIndex = flowContent.visaMatch.introQuestions.length;
  } else if (!state.visaBranch && nextBranch) {
    state.visaBranch = nextBranch;
  }

  if (!questions.length) {
    return section;
  }

  if (state.visaIndex >= questions.length) {
    state.visaIndex = questions.length - 1;
  }

  const currentQuestion = questions[state.visaIndex];
  section.appendChild(
    buildQuestionCard({
      question: currentQuestion,
      currentIndex: state.visaIndex,
      total: questions.length,
      answers: state.visaAnswers,
      nextLabel: state.visaIndex === questions.length - 1 ? 'See visa match' : 'Continue',
      disablePrev: state.visaIndex === 0,
      onAnswer: (id, value) => {
        state.visaAnswers[id] = value;
        rerender();
      },
      onPrev: () => {
        if (state.visaIndex > 0) {
          state.visaIndex -= 1;
          rerender();
        }
      },
      onNext: () => {
        if (state.visaIndex < questions.length - 1) {
          state.visaIndex += 1;
          rerender();
        } else if (state.visaBranch) {
          state.stage = 'visa-result';
          rerender();
        }
      }
    })
  );

  return section;
}

function buildVisaResultCard(flowContent, state, rerender) {
  const branch = state.visaBranch || determineBranch(state.visaAnswers.intent);
  if (!branch || !flowContent.visaMatch.branches[branch]) {
    state.stage = 'visa';
    rerender();
    return document.createElement('div');
  }

  const branchContent = flowContent.visaMatch.branches[branch];
  const card = document.createElement('div');
  card.className = 'result-card';

  const eyebrow = document.createElement('p');
  eyebrow.className = 'result-eyebrow';
  eyebrow.textContent = branchContent.label;

  const title = document.createElement('h2');
  title.textContent = buildVisaTypeTitle(branch, state.visaAnswers);

  const helper = document.createElement('p');
  helper.textContent = branchContent.result.helper;

  const summary = buildAnswerSummary(
    'Your answers',
    computeVisaSummary(flowContent.visaMatch, state.visaAnswers, branch),
    { numbered: true }
  );

  card.append(eyebrow, title, helper, summary);

  const actions = document.createElement('div');
  actions.className = 'question-actions';

  const prevButton = document.createElement('button');
  prevButton.type = 'button';
  prevButton.className = 'btn btn-secondary';
  prevButton.textContent = flowContent.visaMatch.cta.secondaryLabel;
  prevButton.addEventListener('click', () => {
    state.stage = 'visa';
    state.visaIndex = Math.max(0, prepareVisaQuestions(flowContent.visaMatch, state.visaAnswers).questions.length - 1);
    rerender();
  });

  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.className = 'btn btn-primary';
  nextButton.textContent = flowContent.visaMatch.cta.primaryLabel;
  nextButton.addEventListener('click', () => {
    state.stage = 'eligibility';
    state.eligibilityIndex = 0;
    state.eligibilityBranch = branch;
    state.eligibilityAnswers = {};
    rerender();
  });

  actions.append(prevButton, nextButton);
  card.appendChild(actions);

  return card;
}

function buildEligibilityQuestionSection(flowContent, state, rerender) {
  const section = document.createElement('section');
  section.className = 'eligibility-flow-section';

  if (!state.eligibilityBranch) {
    state.eligibilityBranch = state.visaBranch || determineBranch(state.visaAnswers.intent) || 'visit';
  }

  const questions = prepareEligibilityQuestions(flowContent.eligibilityCheck, state.eligibilityBranch, state.eligibilityAnswers);
  if (!questions.length) {
    state.stage = 'review';
    rerender();
    return section;
  }

  if (state.eligibilityIndex >= questions.length) {
    state.eligibilityIndex = questions.length - 1;
  }

  const currentQuestion = questions[state.eligibilityIndex];
  section.appendChild(
    buildQuestionCard({
      question: currentQuestion,
      currentIndex: state.eligibilityIndex,
      total: questions.length,
      answers: state.eligibilityAnswers,
      nextLabel: state.eligibilityIndex === questions.length - 1 ? 'Review answers' : 'Continue',
      disablePrev: state.eligibilityOnlyMode && state.eligibilityIndex === 0,
      onAnswer: (id, value) => {
        state.eligibilityAnswers[id] = value;
        rerender();
      },
      onPrev: () => {
        if (state.eligibilityIndex > 0) {
          state.eligibilityIndex -= 1;
          rerender();
        } else if (state.eligibilityOnlyMode) {
          return;
        } else {
          state.stage = 'visa-result';
          rerender();
        }
      },
      onNext: () => {
        if (state.eligibilityIndex < questions.length - 1) {
          state.eligibilityIndex += 1;
          rerender();
        } else {
          state.stage = 'review';
          rerender();
        }
      }
    })
  );

  return section;
}

function buildReviewCard(flowContent, state, rerender) {
  const card = document.createElement('div');
  card.className = 'review-card';

  const title = document.createElement('h3');
  title.className = 'review-title';
  title.textContent = flowContent.review.title;

  const description = document.createElement('p');
  description.className = 'review-footer-note';
  description.textContent = flowContent.review.description;

  const visaSummary = buildAnswerSummary('Visa match answers', computeVisaSummary(flowContent.visaMatch, state.visaAnswers, state.visaBranch), { numbered: true });
  const eligibilitySummary = buildAnswerSummary('Eligibility answers', computeEligibilitySummary(flowContent, state), { numbered: true });

  card.append(title, visaSummary, eligibilitySummary);

  const actions = document.createElement('div');
  actions.className = 'question-actions';

  const editButton = document.createElement('button');
  editButton.type = 'button';
  editButton.className = 'btn btn-secondary';
  editButton.textContent = flowContent.review.editLabel;
  editButton.addEventListener('click', () => {
    resetFlowState(state);
    rerender();
  });

  const seeResultButton = document.createElement('button');
  seeResultButton.type = 'button';
  seeResultButton.className = 'btn btn-primary';
  seeResultButton.textContent = flowContent.review.primaryLabel;
  seeResultButton.addEventListener('click', () => {
    const result = computeResultData(state);
    state.resultData = result;
    const visaSummaryEntries = computeVisaSummary(flowContent.visaMatch, state.visaAnswers, state.visaBranch);
    const eligibilityQuestions = prepareEligibilityQuestions(flowContent.eligibilityCheck, state.eligibilityBranch, state.eligibilityAnswers);
    const summary = [
      ...buildSummaryEntries(prepareVisaQuestions(flowContent.visaMatch, state.visaAnswers).questions, state.visaAnswers, state.visaBranch),
      ...buildSummaryEntries(eligibilityQuestions, state.eligibilityAnswers, state.eligibilityBranch)
    ];
    const risks = computeRiskFlags(eligibilityQuestions, state.eligibilityAnswers);
    persistEligibilityDraft(state);

    persistEligibilityResult({
      ...result,
      visaSummary: visaSummaryEntries,
      summary,
      redFlags: risks.redFlags,
      yellowFlags: risks.yellowFlags
    });

    if (state.eligibilityOnlyMode || state.postResultDestination === 'app') {
      if (window.top && window.top !== window) {
        window.top.location.href = '/app/eligibilitycheck';
      } else {
        window.location.href = '/app/eligibilitycheck';
      }
      return;
    }

    window.location.href = '/app/plan/';
  });

  actions.append(editButton, seeResultButton);
  card.append(actions, description);

  return card;
}

function buildResultPanel(flowContent, state, rerender) {
  const data = state.resultData || computeResultData(state);
  const card = document.createElement('div');
  card.className = 'result-panel';

  const title = document.createElement('h3');
  title.textContent = flowContent.result.title;

  const visaLabel = document.createElement('p');
  visaLabel.className = 'visa-match-pill';
  visaLabel.textContent = data.visaLabel;

  const rate = document.createElement('div');
  rate.className = 'result-rate';
  rate.textContent = `${data.approval}%`;

  const note = document.createElement('p');
  note.textContent = 'Estimated approval chance based on your responses.';

  const summary = buildAnswerSummary('Highlights', computeVisaSummary(flowContent.visaMatch, state.visaAnswers, state.visaBranch));

  card.append(title, visaLabel, rate, note, summary);

  const actions = document.createElement('div');
  actions.className = 'question-actions';

  const resetButton = document.createElement('button');
  resetButton.type = 'button';
  resetButton.className = 'btn btn-secondary';
  resetButton.textContent = flowContent.result.resetLabel;
  resetButton.addEventListener('click', () => {
    resetFlowState(state);
    rerender();
  });

  const continueLink = document.createElement('a');
  continueLink.className = 'btn btn-primary';
  continueLink.textContent = flowContent.result.continueLabel;
  continueLink.href = flowContent.result.continueHref;

  actions.append(resetButton, continueLink);
  card.appendChild(actions);

  return card;
}

function buildQuestionCard({ question, currentIndex, total, answers, onAnswer, onPrev, onNext, nextLabel, disablePrev }) {
  const card = document.createElement('div');
  card.className = 'question-card';

  const copy = resolveQuestionCopy(question);

  let heading = null;
  if (copy.heading) {
    heading = document.createElement('p');
    heading.className = 'question-heading';
    heading.textContent = copy.heading;
  }

  const prompt = document.createElement('h3');
  prompt.className = 'question-prompt';
  prompt.textContent = `${currentIndex + 1}. ${copy.sentence}`;

  let subtext = null;
  if (copy.note) {
    subtext = document.createElement('p');
    subtext.className = 'question-subtext';
    subtext.textContent = copy.note;
  }

  const fieldWrapper = document.createElement('div');
  fieldWrapper.className = 'question-field';

  const currentValue = answers[question.id] || '';
  if (question.type === 'select') {
    const select = document.createElement('select');
    select.className = 'question-select';
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = question.placeholder || 'Select';
    select.appendChild(placeholderOption);
    question.options.forEach((option) => {
      const opt = document.createElement('option');
      if (typeof option === 'string') {
        opt.value = option;
        opt.textContent = option;
      } else {
        opt.value = option.value;
        opt.textContent = option.label;
      }
      select.appendChild(opt);
    });
    select.value = currentValue;
    select.addEventListener('change', (event) => {
      onAnswer(question.id, event.target.value);
    });
    fieldWrapper.appendChild(select);
  } else if (question.type === 'radio') {
    const list = document.createElement('div');
    list.className = 'option-list';
    question.options.forEach((option) => {
      const optionId = `${question.id}-${option.value}`;
      const label = document.createElement('label');
      label.className = 'option-card';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = question.id;
      input.id = optionId;
      input.value = option.value;
      input.checked = currentValue === option.value;
      input.addEventListener('change', () => {
        onAnswer(question.id, option.value);
      });

      const title = document.createElement('span');
      title.textContent = option.label;

      label.append(input, title);
      list.appendChild(label);
    });
    fieldWrapper.appendChild(list);
  } else if (question.type === 'checkbox') {
    const list = document.createElement('div');
    list.className = 'option-list';
    const selections = Array.isArray(currentValue) ? currentValue : [];
    question.options.forEach((option) => {
      const optionId = `${question.id}-${option.value}`;
      const label = document.createElement('label');
      label.className = 'option-card option-card-checkbox';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.name = question.id;
      input.id = optionId;
      input.value = option.value;
      input.checked = selections.includes(option.value);
      input.addEventListener('change', () => {
        const nextValues = new Set(Array.isArray(answers[question.id]) ? answers[question.id] : []);
        if (input.checked) {
          nextValues.add(option.value);
        } else {
          nextValues.delete(option.value);
        }
        onAnswer(question.id, Array.from(nextValues));
      });

      const title = document.createElement('span');
      title.textContent = option.label;

      label.append(input, title);
      list.appendChild(label);
    });
    fieldWrapper.appendChild(list);
  } else if (question.type === 'textarea') {
    const area = document.createElement('textarea');
    area.value = currentValue || '';
    area.rows = 4;
    area.addEventListener('input', (event) => {
      onAnswer(question.id, event.target.value);
    });
    fieldWrapper.appendChild(area);
  }

  const actions = document.createElement('div');
  actions.className = 'question-actions';

  const prevButton = document.createElement('button');
  prevButton.type = 'button';
  prevButton.className = 'btn btn-secondary';
  prevButton.textContent = 'Previous';
  const shouldDisablePrev = typeof disablePrev === 'boolean' ? disablePrev : currentIndex === 0;
  prevButton.disabled = shouldDisablePrev;
  prevButton.addEventListener('click', () => {
    onPrev();
  });

  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.className = 'btn btn-primary';
  nextButton.textContent = nextLabel || (currentIndex === total - 1 ? 'Continue' : 'Continue');
  const hasValue = () => {
    const value = answers[question.id];
    if (question.type === 'checkbox') {
      return Array.isArray(value) && value.length > 0;
    }
    if (question.type === 'textarea') {
      return typeof value === 'string' && value.trim().length > 0;
    }
    return Boolean(value);
  };

  nextButton.disabled = !hasValue();
  nextButton.addEventListener('click', () => {
    if (!hasValue()) return;
    onNext();
  });

  actions.append(prevButton, nextButton);
  if (heading) {
    card.appendChild(heading);
  }
  card.appendChild(prompt);
  if (subtext) {
    card.appendChild(subtext);
  }
  card.append(fieldWrapper, actions);
  return card;
}

function resolveQuestionCopy(question) {
  const label = (question.label || '').trim();
  const helper = (question.helper || '').trim();
  const heading = (question.heading || '').trim();
  const sentence = (question.question || '').trim();
  const note = (question.note || '').trim();

  if (sentence) {
    return { heading: heading || label, sentence, note: note || helper };
  }

  if (heading) {
    return { heading, sentence: label, note: note || helper };
  }

  const labelLooksLikeSentence = /[?.!]$/.test(label);
  if (helper && !labelLooksLikeSentence) {
    return { heading: label, sentence: helper, note };
  }

  return { heading: '', sentence: label, note: note || helper };
}

function prepareVisaQuestions(visaContent, answers) {
  const questions = visaContent.introQuestions.map((question) => ({ ...question }));
  const branch = determineBranch(answers.intent);
  if (branch && visaContent.branches[branch]) {
    visaContent.branches[branch].questions.forEach((question) => {
      questions.push({ ...question });
    });
  }
  return { questions, branch };
}

function determineBranch(intent) {
  if (intent === 'study') return 'study';
  if (intent === 'work') return 'work';
  return intent ? 'visit' : null;
}

function prepareEligibilityQuestions(eligibilityContent, branch, answers) {
  const branchContent = eligibilityContent.branches[branch];
  if (!branchContent) return [];
  return branchContent.questions.filter((question) => shouldShowQuestion(question, answers)).map((question) => ({ ...question }));
}

function shouldShowQuestion(question, answers) {
  if (!question.showWhen) return true;
  const value = answers[question.showWhen.field];
  if (question.showWhen.equals) {
    if (Array.isArray(value)) {
      return value.some((item) => question.showWhen.equals.includes(item));
    }
    return question.showWhen.equals.includes(value);
  }
  return true;
}

function buildAnswerSummary(title, entries, options = {}) {
  const block = document.createElement('div');
  block.className = 'answer-summary';

  const heading = document.createElement('h4');
  heading.textContent = title;
  block.appendChild(heading);

  entries.forEach((entry, index) => {
    const row = document.createElement('div');
    row.className = 'answer-row';

    const label = document.createElement('span');
    label.className = 'answer-label';
    label.textContent = options.numbered ? `${index + 1}. ${entry.label}` : entry.label;

    const value = document.createElement('span');
    value.className = 'answer-value';
    value.textContent = entry.value || 'Not answered';

    row.append(label, value);
    block.appendChild(row);
  });

  return block;
}

function buildVisaTypeTitle(branch, answers) {
  if (branch === 'visit') {
    return 'Your visa type is Canada Visitor Visa';
  }

  const permit = branch === 'study' ? 'Study Permit' : 'Work Permit';
  const situationKey = `${branch}-situation`;
  const locationKey = `${branch}-location`;
  const situationValue = answers[situationKey];
  const locationValue = answers[locationKey];

  const extensionPart = situationValue === 'extend' ? ' extend' : '';
  let locationPart = '';
  if (locationValue === 'inside') {
    locationPart = ' from inside Canada';
  } else if (locationValue === 'outside') {
    locationPart = ' from outside Canada';
  }

  return `Your visa type is Canada ${permit}${extensionPart}${locationPart}`;
}

function computeVisaSummary(visaContent, answers, branch) {
  const { questions } = prepareVisaQuestions(visaContent, answers);
  const relevantBranch = branch || determineBranch(answers.intent);
  return questions
    .filter((question) => {
      if (question.id.startsWith('study-')) {
        return relevantBranch === 'study';
      }
      if (question.id.startsWith('work-')) {
        return relevantBranch === 'work';
      }
      if (question.id.startsWith('visit-')) {
        return relevantBranch === 'visit';
      }
      return true;
    })
    .map((question) => ({
      label: question.label,
      value: formatAnswer(question, answers[question.id])
    }));
}

function computeEligibilitySummary(flowContent, state) {
  const questions = prepareEligibilityQuestions(flowContent.eligibilityCheck, state.eligibilityBranch, state.eligibilityAnswers);
  return questions.map((question) => ({
    label: question.label,
    value: formatAnswer(question, state.eligibilityAnswers[question.id])
  }));
}

function buildSummaryEntries(questions, answers, branch) {
  return questions
    .filter((question) => {
      if (question.id.startsWith('study-')) return branch === 'study';
      if (question.id.startsWith('work-')) return branch === 'work';
      if (question.id.startsWith('visit-')) return branch === 'visit';
      return true;
    })
    .map((question) => ({
      question: resolveQuestionCopy(question).sentence,
      answer: formatAnswer(question, answers[question.id])
    }));
}

function computeRiskFlags(questions, answers) {
  const redFlags = [];
  const yellowFlags = [];
  const redPattern = /(refused|overstay|denied|inconsistent|can't|cannot|weak ties|not meet|large\/unexplained)/i;
  const yellowPattern = /(not sure|unknown|maybe|partial|mostly|tight|unsure)/i;

  questions.forEach((question) => {
    const answer = formatAnswer(question, answers[question.id]);
    if (!answer || answer === 'Not answered') return;

    const sentence = resolveQuestionCopy(question).sentence;
    const detail = `${sentence}: ${answer}`;
    if (redPattern.test(answer)) {
      redFlags.push(detail);
    } else if (yellowPattern.test(answer)) {
      yellowFlags.push(detail);
    }
  });

  return {
    redFlags,
    yellowFlags
  };
}

function formatAnswer(question, value) {
  if (!value || (Array.isArray(value) && !value.length)) return 'Not answered';
  if (question.type === 'textarea') return value;
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        const option = (question.options || []).find((opt) => opt.value === item);
        return option ? option.label : item;
      })
      .join(', ');
  }
  if (question.type === 'select') {
    return value;
  }
  const option = (question.options || []).find((opt) => opt.value === value);
  return option ? option.label : value;
}

function clearBranchAnswers(answers) {
  Object.keys(answers).forEach((key) => {
    if (key.startsWith('study-') || key.startsWith('work-') || key.startsWith('visit-')) {
      delete answers[key];
    }
  });
}

function computeResultData(state) {
  const branch = state.visaBranch || determineBranch(state.visaAnswers.intent) || 'visit';
  const labelMap = {
    study: 'Study permit & visa',
    work: 'Work permit & visa',
    visit: 'Visitor visa'
  };
  const approval = computeApprovalScore(branch, state.eligibilityAnswers);
  return {
    branch,
    visaLabel: labelMap[branch] || 'Visa match',
    approval
  };
}

function persistEligibilityResult(result) {
  if (typeof window === 'undefined' || !result) return;
  try {
    window.localStorage.setItem(
      ELIGIBILITY_RESULT_STORAGE_KEY,
      JSON.stringify({
        ...result,
        createdAt: new Date().toISOString()
      })
    );
  } catch {
    // Ignore storage errors and continue navigation.
  }
}

function computeApprovalScore(branch, answers) {
  const baseScores = { study: 82, work: 78, visit: 74 };
  let score = baseScores[branch] || 76;

  const negativeTokens = ['no', 'none', 'inconsistent', 'overstay', 'denied', 'refused', 'extend'];
  const cautionTokens = ['maybe', 'unsure', 'unknown', 'partial', 'mostly'];

  Object.values(answers).forEach((value) => {
    if (!value) return;
    if (Array.isArray(value)) {
      if (value.includes('none')) score -= 6;
      if (value.includes('unsure')) score -= 3;
    } else if (typeof value === 'string') {
      if (negativeTokens.some((token) => value.includes(token))) {
        score -= 6;
      } else if (cautionTokens.some((token) => value.includes(token))) {
        score -= 3;
      }
    }
  });

  return Math.max(40, Math.min(95, Math.round(score)));
}

function resetFlowState(state) {
  const fallbackBranch = state.visaBranch || state.eligibilityBranch || 'visit';
  state.stage = state.eligibilityOnlyMode ? 'eligibility' : 'visa';
  state.visaIndex = 0;
  state.eligibilityIndex = 0;
  state.visaAnswers = state.eligibilityOnlyMode ? { intent: fallbackBranch } : {};
  state.eligibilityAnswers = {};
  state.visaBranch = state.eligibilityOnlyMode ? fallbackBranch : null;
  state.eligibilityBranch = state.eligibilityOnlyMode ? fallbackBranch : null;
  state.resultData = null;
}
