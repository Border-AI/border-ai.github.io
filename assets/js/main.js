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
    initEligibilityFlow(eligibility.flow);
  }
})();

const ELIGIBILITY_RESULT_STORAGE_KEY = 'border_ai_eligibility_result';

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

function initEligibilityFlow(flowContent) {
  const target = document.querySelector('[data-section="eligibility-flow"]');
  if (!target || !flowContent) return;

  const state = {
    stage: 'visa',
    visaIndex: 0,
    eligibilityIndex: 0,
    visaAnswers: {},
    eligibilityAnswers: {},
    visaBranch: null,
    eligibilityBranch: null,
    resultData: null
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
  title.textContent = flowContent.review.title;
  const description = document.createElement('p');
  description.textContent = flowContent.review.description;

  const visaSummary = buildAnswerSummary('Visa match answers', computeVisaSummary(flowContent.visaMatch, state.visaAnswers, state.visaBranch));
  const eligibilitySummary = buildAnswerSummary('Eligibility answers', computeEligibilitySummary(flowContent, state));

  card.append(title, description, visaSummary, eligibilitySummary);

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
    persistEligibilityResult(result);
    window.location.href = '/app/signup';
  });

  actions.append(editButton, seeResultButton);
  card.appendChild(actions);

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
  state.stage = 'visa';
  state.visaIndex = 0;
  state.eligibilityIndex = 0;
  state.visaAnswers = {};
  state.eligibilityAnswers = {};
  state.visaBranch = null;
  state.eligibilityBranch = null;
  state.resultData = null;
}
