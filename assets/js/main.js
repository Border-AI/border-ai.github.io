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
    const target = document.querySelector('[data-section="eligibility"]');
    if (!target || !eligibility) return;

    const card = document.createElement('section');
    card.className = 'eligibility-card';

    const heading = document.createElement('h1');
    heading.textContent = eligibility.heading;

    const body = document.createElement('p');
    body.textContent = eligibility.body;

    const actions = document.createElement('div');
    actions.className = 'hero-actions';

    const primary = document.createElement('a');
    primary.className = 'btn btn-primary';
    primary.href = eligibility.primaryCta.href;
    primary.textContent = eligibility.primaryCta.label;

    const secondary = document.createElement('a');
    secondary.className = 'btn btn-secondary';
    secondary.href = eligibility.secondaryCta.href;
    secondary.textContent = eligibility.secondaryCta.label;

    actions.append(primary, secondary);
    card.append(heading, body, actions);
    target.replaceChildren(card);
  }
})();
