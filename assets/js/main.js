(() => {
  const content = window.siteContent;
  if (!content) return;

  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    if (page === 'home') {
      applySeo(content.pages.home);
      renderHome(content.pages.home);
    } else if (page === 'eligibility') {
      applySeo(content.pages.eligibility);
      renderEligibility(content.pages.eligibility);
    } else {
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

    if (hero.eyebrow) {
      const eyebrow = document.createElement('span');
      eyebrow.className = 'note-pill';
      eyebrow.textContent = hero.eyebrow;
      wrapper.appendChild(eyebrow);
    }

    const title = document.createElement('h1');
    title.className = 'hero-title';
    title.textContent = hero.title;
    wrapper.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'hero-subtitle';
    subtitle.textContent = hero.subtitle;
    wrapper.appendChild(subtitle);

    const actions = document.createElement('div');
    actions.className = 'hero-actions';

    const primary = document.createElement('a');
    primary.className = 'btn btn-primary';
    primary.href = hero.primaryCta.href;
    primary.textContent = hero.primaryCta.label;
    actions.appendChild(primary);

    const secondary = document.createElement('a');
    secondary.className = 'btn btn-secondary';
    secondary.href = hero.secondaryCta.href;
    secondary.textContent = hero.secondaryCta.label;
    actions.appendChild(secondary);

    wrapper.appendChild(actions);
    target.replaceChildren(wrapper);
  }

  function renderFeatures(features) {
    const target = document.querySelector('[data-section="features"]');
    if (!target || !Array.isArray(features)) return;
    const grid = document.createElement('div');
    grid.className = 'feature-grid';

    features.forEach((feature) => {
      const card = document.createElement('article');
      card.className = 'feature-card';

      const icon = document.createElement('div');
      icon.className = 'feature-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = feature.icon || feature.title.charAt(0);

      const title = document.createElement('h3');
      title.textContent = feature.title;

      const description = document.createElement('p');
      description.textContent = feature.description;

      card.append(icon, title, description);
      grid.appendChild(card);
    });

    target.replaceChildren(grid);
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
    renderEligibilityHero(eligibility.hero);
    initEligibilityFlow(eligibility.flow);
  }
})();

function createHighlightIcon(type) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.5');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const appendChild = (el) => svg.appendChild(el);

  if (type === 'target') {
    const circles = [10, 6, 3].map((radius) => {
      const circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('cx', '12');
      circle.setAttribute('cy', '12');
      circle.setAttribute('r', radius.toString());
      circle.setAttribute('stroke-opacity', radius === 3 ? '1' : '0.85');
      return circle;
    });
    circles.forEach(appendChild);
  } else if (type === 'folder') {
    const body = document.createElementNS(svgNS, 'path');
    body.setAttribute('d', 'M3 7h7l2 2h9v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z');
    const tab = document.createElementNS(svgNS, 'path');
    tab.setAttribute('d', 'M3 7V5a1 1 0 0 1 1-1h5l2 2h4');
    [body, tab].forEach(appendChild);
  } else if (type === 'graph') {
    const lines = [
      { x1: 5, y1: 12, x2: 5, y2: 19 },
      { x1: 10, y1: 9, x2: 10, y2: 19 },
      { x1: 15, y1: 5, x2: 15, y2: 19 },
      { x1: 20, y1: 14, x2: 20, y2: 19 }
    ];
    lines.forEach(({ x1, y1, x2, y2 }) => {
      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', x1.toString());
      line.setAttribute('y1', y1.toString());
      line.setAttribute('x2', x2.toString());
      line.setAttribute('y2', y2.toString());
      appendChild(line);
    });
  } else {
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', '12');
    circle.setAttribute('cy', '12');
    circle.setAttribute('r', '9');
    appendChild(circle);
  }

  return svg;
}

function renderEligibilityHero(hero) {
  const target = document.querySelector('[data-section="eligibility-hero"]');
  if (!target || !hero) return;

  const card = document.createElement('div');
  card.className = 'eligibility-hero-card';

  const title = document.createElement('h1');
  title.textContent = hero.title;

  const body = document.createElement('p');
  body.textContent = hero.body;

  const note = document.createElement('div');
  note.className = 'note-pill';
  note.textContent = hero.note || '';

  card.append(note, title, body);
  target.replaceChildren(card);
}

function initEligibilityFlow(flowContent) {
  const target = document.querySelector('[data-section="eligibility-flow"]');
  if (!target || !flowContent) return;

  const state = {
    stage: 'visa',
    visaIndex: 0,
    eligibilityIndex: 0,
    visaAnswers: {},
    eligibilityAnswers: {},
    email: '',
    emailStatus: 'idle'
  };

  const render = () => {
    target.replaceChildren(buildFlow(flowContent, state, render));
  };

  render();
}

function buildFlow(flowContent, state, rerender) {
  const wrapper = document.createElement('div');
  wrapper.className = 'eligibility-flow-wrapper';

  const visaSection = document.createElement('section');
  visaSection.className = 'eligibility-flow-section';
  visaSection.appendChild(buildSectionHeader(flowContent.visaMatch.title, flowContent.visaMatch.description));

  const activeVisaQuestions = getVisaQuestions(flowContent.visaMatch.questions, state.visaAnswers);
  if (state.visaIndex >= activeVisaQuestions.length) {
    state.visaIndex = Math.max(activeVisaQuestions.length - 1, 0);
  }

  if (state.stage === 'visa' && activeVisaQuestions.length) {
    visaSection.appendChild(
      buildQuestionCard({
        question: activeVisaQuestions[state.visaIndex],
        currentIndex: state.visaIndex,
        total: activeVisaQuestions.length,
        answers: state.visaAnswers,
        nextLabel: state.visaIndex === activeVisaQuestions.length - 1 ? 'See result' : 'Continue',
        onAnswer: (id, value) => {
          state.visaAnswers[id] = value;
          if (id === 'intent' && value === 'visit') {
            delete state.visaAnswers.situation;
          }
          rerender();
        },
        onPrev: () => {
          if (state.visaIndex > 0) {
            state.visaIndex -= 1;
            rerender();
          }
        },
        onNext: () => {
          const question = activeVisaQuestions[state.visaIndex];
          const currentValue = state.visaAnswers[question.id];
          if (!currentValue) return;
          if (state.visaIndex < activeVisaQuestions.length - 1) {
            state.visaIndex += 1;
            rerender();
          } else {
            state.stage = 'visa-result';
            rerender();
          }
        }
      })
    );
  } else {
    const resultCard = document.createElement('div');
    resultCard.className = 'result-card';
    const visaResult = computeVisaResult(state.visaAnswers);

    const heading = document.createElement('p');
    heading.className = 'result-eyebrow';
    heading.textContent = flowContent.visaMatch.result.heading;

    const title = document.createElement('h2');
    title.textContent = visaResult.title;

    const summary = document.createElement('p');
    summary.textContent = visaResult.summary;

    const choiceList = document.createElement('ul');
    choiceList.className = 'summary-list';
    visaResult.highlights.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      choiceList.appendChild(li);
    });

    const refList = document.createElement('div');
    refList.className = 'reference-links';
    flowContent.visaMatch.result.references.forEach((ref) => {
      const link = document.createElement('a');
      link.href = ref.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = ref.label;
      refList.appendChild(link);
    });

    resultCard.append(heading, title, summary, choiceList, refList);
    visaSection.appendChild(resultCard);
    visaSection.appendChild(
      buildStickyCta({
        copy: flowContent.visaMatch.cta.title,
        primaryLabel: flowContent.visaMatch.cta.primaryLabel,
        secondaryLabel: flowContent.visaMatch.cta.secondaryLabel,
        onPrimary: () => {
          state.stage = 'eligibility';
          state.eligibilityIndex = 0;
          rerender();
        },
        onSecondary: () => {
          state.stage = 'visa';
          state.visaIndex = Math.max(activeVisaQuestions.length - 1, 0);
          rerender();
        }
      })
    );
  }

  wrapper.appendChild(visaSection);

  if (state.stage === 'eligibility') {
    wrapper.appendChild(
      buildEligibilitySection(flowContent, state, rerender, false)
    );
  } else if (state.stage === 'summary') {
    wrapper.appendChild(
      buildEligibilitySection(flowContent, state, rerender, true)
    );
  }

  return wrapper;
}

function buildSectionHeader(title, description) {
  const header = document.createElement('div');
  header.className = 'eligibility-section-header';
  const label = document.createElement('p');
  label.className = 'section-eyebrow';
  label.textContent = title;
  const desc = document.createElement('p');
  desc.textContent = description;
  header.append(label, desc);
  return header;
}

function buildQuestionCard({ question, currentIndex, total, answers, onAnswer, onPrev, onNext, nextLabel, disablePrev }) {
  const card = document.createElement('div');
  card.className = 'question-card';

  const progress = document.createElement('div');
  progress.className = 'question-progress';
  const label = document.createElement('span');
  label.textContent = `Question ${total ? currentIndex + 1 : 0}/${total || 1}`;
  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  const fill = document.createElement('div');
  fill.className = 'progress-bar-fill';
  fill.style.width = total ? `${((currentIndex + 1) / total) * 100}%` : '0%';
  bar.appendChild(fill);
  progress.append(label, bar);

  const prompt = document.createElement('h3');
  prompt.textContent = question.label;

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
      opt.value = option;
      opt.textContent = option;
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
    if (currentIndex === 0) return;
    onPrev();
  });

  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.className = 'btn btn-primary';
  nextButton.textContent = nextLabel || (currentIndex === total - 1 ? 'Continue' : 'Continue');
  nextButton.disabled = !answers[question.id];
  nextButton.addEventListener('click', () => {
    if (!answers[question.id]) return;
    onNext();
  });

  actions.append(prevButton, nextButton);
  card.append(progress, prompt, fieldWrapper, actions);
  return card;
}

function buildStickyCta({ copy, primaryLabel, secondaryLabel, onPrimary, onSecondary }) {
  const cta = document.createElement('div');
  cta.className = 'cta-sticky';

  const text = document.createElement('p');
  text.textContent = copy;

  const actions = document.createElement('div');
  actions.className = 'question-actions';

  const prevButton = document.createElement('button');
  prevButton.type = 'button';
  prevButton.className = 'btn btn-secondary';
  prevButton.textContent = secondaryLabel;
  prevButton.addEventListener('click', onSecondary);

  const primaryButton = document.createElement('button');
  primaryButton.type = 'button';
  primaryButton.className = 'btn btn-primary';
  primaryButton.textContent = primaryLabel;
  primaryButton.addEventListener('click', onPrimary);

  actions.append(prevButton, primaryButton);
  cta.append(text, actions);
  return cta;
}

function buildEligibilitySection(flowContent, state, rerender, isSummary) {
  const section = document.createElement('section');
  section.className = 'eligibility-flow-section';
  section.appendChild(buildSectionHeader(flowContent.eligibilityCheck.title, flowContent.eligibilityCheck.description));

  const visaResult = computeVisaResult(state.visaAnswers);
  const visaBadge = document.createElement('div');
  visaBadge.className = 'visa-match-pill';
  visaBadge.textContent = visaResult.title;
  section.appendChild(visaBadge);

  if (!isSummary) {
    const eligibilityQuestions = flowContent.eligibilityCheck.questions;
    if (state.eligibilityIndex >= eligibilityQuestions.length) {
      state.eligibilityIndex = eligibilityQuestions.length - 1;
    }
    section.appendChild(
      buildQuestionCard({
        question: eligibilityQuestions[state.eligibilityIndex],
        currentIndex: state.eligibilityIndex,
        total: eligibilityQuestions.length,
        answers: state.eligibilityAnswers,
        nextLabel: state.eligibilityIndex === eligibilityQuestions.length - 1 ? 'See summary' : 'Continue',
        disablePrev: false,
        onAnswer: (id, value) => {
          state.eligibilityAnswers[id] = value;
          rerender();
        },
        onPrev: () => {
          if (state.eligibilityIndex > 0) {
            state.eligibilityIndex -= 1;
            rerender();
          } else {
            state.stage = 'visa-result';
            rerender();
          }
        },
        onNext: () => {
          const question = eligibilityQuestions[state.eligibilityIndex];
          if (!state.eligibilityAnswers[question.id]) return;
          if (state.eligibilityIndex < eligibilityQuestions.length - 1) {
            state.eligibilityIndex += 1;
            rerender();
          } else {
            state.stage = 'summary';
            rerender();
          }
        }
      })
    );
  } else {
    section.appendChild(buildSummaryCard(flowContent, state, rerender));
  }

  return section;
}

function buildSummaryCard(flowContent, state, rerender) {
  const card = document.createElement('div');
  card.className = 'summary-card';

  const title = document.createElement('h3');
  title.textContent = flowContent.summary.title;
  const description = document.createElement('p');
  description.textContent = flowContent.summary.description;

  const highlights = document.createElement('ul');
  highlights.className = 'summary-list';
  const visaResult = computeVisaResult(state.visaAnswers);
  visaResult.highlights.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    highlights.appendChild(li);
  });

  const checklist = document.createElement('div');
  checklist.className = 'checklist';
  flowContent.eligibilityCheck.checklist.forEach((item) => {
    const row = document.createElement('p');
    row.textContent = `• ${item}`;
    checklist.appendChild(row);
  });

  const form = document.createElement('form');
  form.className = 'email-form';
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateEmail(state.email)) {
      state.emailStatus = 'error';
      rerender();
      return;
    }
    state.emailStatus = 'sent';
    rerender();
  });

  const label = document.createElement('label');
  label.textContent = flowContent.summary.emailLabel;

  const input = document.createElement('input');
  input.type = 'email';
  input.placeholder = flowContent.summary.emailPlaceholder;
  input.value = state.email;
  if (state.emailStatus === 'error') {
    input.classList.add('input-error');
  }
  input.addEventListener('input', (event) => {
    state.email = event.target.value;
    if (state.emailStatus !== 'idle') {
      state.emailStatus = 'idle';
    }
    rerender();
  });

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'btn btn-primary';
  submit.textContent = flowContent.summary.submitLabel;

  const confirmation = document.createElement('p');
  confirmation.className = 'form-confirmation';
  if (state.emailStatus === 'sent') {
    confirmation.textContent = flowContent.summary.confirmation;
  } else if (state.emailStatus === 'error') {
    confirmation.textContent = 'Enter a valid email.';
  }

  const disclaimer = document.createElement('p');
  disclaimer.className = 'form-disclaimer';
  disclaimer.textContent = flowContent.summary.disclaimer;

  form.append(label, input, submit);
  card.append(title, description, highlights, checklist, form);
  if (confirmation.textContent) {
    card.appendChild(confirmation);
  }
  card.appendChild(disclaimer);

  const actions = document.createElement('div');
  actions.className = 'question-actions';
  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'btn btn-secondary';
  prev.textContent = 'Previous';
  prev.addEventListener('click', () => {
    state.stage = 'eligibility';
    state.eligibilityIndex = flowContent.eligibilityCheck.questions.length - 1;
    rerender();
  });
  actions.appendChild(prev);
  card.appendChild(actions);

  return card;
}

function getVisaQuestions(questions, answers) {
  const intent = answers.intent;
  return questions.filter((question) => {
    if (question.id === 'situation') {
      return intent === 'study' || intent === 'work';
    }
    return true;
  });
}

function computeVisaResult(answers) {
  const intent = answers.intent || 'visit';
  const location = answers.location || 'outside';
  let visaName = 'Visitor visa';
  if (intent === 'study') {
    visaName = 'Canada Study Permit';
  } else if (intent === 'work') {
    visaName = 'Canada Work Permit';
  }
  const locationText = location === 'inside' ? 'from inside Canada' : 'from outside Canada';
  const title = `${visaName} ${locationText}`;
  const highlights = [];
  if (answers.nationality) highlights.push(`Passport nationality: ${answers.nationality}`);
  if (intent) {
    const intentLabels = {
      study: 'Goal: Study in Canada',
      work: 'Goal: Work in Canada',
      visit: 'Goal: Visit / tourism'
    };
    highlights.push(intentLabels[intent] || '');
  }
  if (answers.situation) {
    const situationLabels = {
      'first-permit': 'First permit application',
      'has-permit': 'Already holds a permit',
      extending: 'Extending an existing permit'
    };
    highlights.push(situationLabels[answers.situation] || '');
  }
  const summary = 'These recommendations reflect recent IRCC guidance. Use them as a starting point before reviewing the official checklist.';
  return { title, summary, highlights: highlights.filter(Boolean) };
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
