/*
README
- Edit every piece of copy (hero text, pricing, links, nav labels, etc.) in /assets/js/content.js.
- Adjust site-wide tokens (colors, fonts, spacing, shadows) inside /assets/css/theme.css.
- Add or replace media by dropping files in /assets/media/ and referencing them with relative paths (e.g., <img src="/assets/media/hero.jpg" alt="...">) inside the relevant HTML or JS renderers.
*/

const smoothHandled = new WeakSet();

(() => {
  const content = window.siteContent;
  if (!content) return;

  const navMount = document.querySelector('[data-mount="navbar"]');
  const footerMount = document.querySelector('[data-mount="footer"]');
  const navLinks = [];

  if (navMount && content.nav) {
    const nav = buildNav(content.nav, navLinks);
    navMount.replaceChildren(nav);
  }

  if (footerMount && content.footer) {
    const footer = buildFooter(content.footer);
    footerMount.replaceChildren(footer);
  }

  if (navLinks.length) {
    initSmoothScroll(navLinks);
    document.addEventListener('DOMContentLoaded', () => initSmoothScroll(navLinks));
    setActiveLinks(navLinks);
    window.addEventListener('hashchange', () => setActiveLinks(navLinks));
    window.addEventListener('popstate', () => setActiveLinks(navLinks));
  }
})();

function buildNav(navContent, navLinks) {
  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  if (navContent.accessibility?.navLabel) {
    nav.setAttribute('aria-label', navContent.accessibility.navLabel);
  }

  const inner = document.createElement('div');
  inner.className = 'nav-inner container';

  const brandLink = document.createElement('a');
  brandLink.className = 'logo';
  brandLink.href = navContent.brand.href;
  appendBrandVisuals(brandLink, navContent.brand);
  inner.appendChild(brandLink);

  const linksWrapper = document.createElement('div');
  linksWrapper.className = 'nav-links';

  navContent.links.forEach((item) => {
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.label;
    link.dataset.nav = 'link';
    linksWrapper.appendChild(link);
    navLinks.push(link);
  });

  const cta = document.createElement('a');
  cta.className = 'btn btn-primary';
  cta.href = navContent.cta.href;
  cta.textContent = navContent.cta.label;
  cta.dataset.nav = 'cta';
  navLinks.push(cta);

 
  inner.appendChild(cta);
  inner.appendChild(linksWrapper);
  nav.appendChild(inner);
  return nav;
}

function buildFooter(footerContent) {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  if (footerContent.accessibilityLabel) {
    footer.setAttribute('aria-label', footerContent.accessibilityLabel);
  }

  const container = document.createElement('div');
  container.className = 'container';

  const grid = document.createElement('div');
  grid.className = 'footer-grid';

  const brand = document.createElement('div');
  brand.className = 'footer-brand';
  const brandTitle = document.createElement('a');
  brandTitle.className = 'logo';
  const brandSource = window.siteContent?.nav?.brand;
  brandTitle.href = brandSource?.href || '/';
  appendBrandVisuals(brandTitle, brandSource);
  const motto = document.createElement('p');
  motto.textContent = footerContent.motto;
  brand.append(brandTitle, motto);

  const linksColumn = document.createElement('div');
  linksColumn.className = 'footer-links';
  const quickLabel = document.createElement('strong');
  quickLabel.textContent = footerContent.quickLinksLabel;
  linksColumn.appendChild(quickLabel);
  footerContent.quickLinks.forEach((link) => {
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = link.label;
    linksColumn.appendChild(anchor);
  });

  const otherColumn = document.createElement('div');
  otherColumn.className = 'footer-links';
  const otherLabel = document.createElement('strong');
  otherLabel.textContent = footerContent.otherLinksLabel;
  otherColumn.appendChild(otherLabel);
  footerContent.otherLinks.forEach((link) => {
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = link.label;
    otherColumn.appendChild(anchor);
  });

  const contactColumn = document.createElement('div');
  contactColumn.className = 'footer-contact';
  contactColumn.id = 'contact';
  const contactLabel = document.createElement('strong');
  contactLabel.textContent = footerContent.contact.label;
  const address = document.createElement('p');
  address.textContent = footerContent.contact.address;
  const emailLink = document.createElement('a');
  emailLink.href = `mailto:${footerContent.contact.email}`;
  emailLink.textContent = `${footerContent.contact.emailLabel}: ${footerContent.contact.email}`;
  contactColumn.append(contactLabel, address, emailLink);

  grid.append(brand, linksColumn, otherColumn, contactColumn);
  container.appendChild(grid);

  const legal = document.createElement('div');
  legal.className = 'footer-legal';
  footerContent.legalText.forEach((paragraph) => {
    const p = document.createElement('p');
    p.textContent = paragraph;
    legal.appendChild(p);
  });

  container.appendChild(legal);
  footer.appendChild(container);
  return footer;
}

function appendBrandVisuals(anchor, brand) {
  if (!anchor || !brand) return;
  if (brand.label) {
    anchor.setAttribute('aria-label', brand.label);
  }
  if (brand.logo?.src) {
    const logoImg = document.createElement('img');
    logoImg.src = brand.logo.src;
    logoImg.alt = brand.logo.alt || brand.label || 'Logo';
    anchor.appendChild(logoImg);
  }

  const text = document.createElement('span');
  text.className = 'sr-only';
  text.textContent = brand.label || '';
  anchor.appendChild(text);
}

function initSmoothScroll(navLinks) {
  const targets = ['#pricing', '#contact'];
  const anchors = Array.from(document.querySelectorAll('a')).filter((link) => {
    const url = new URL(link.href, window.location.origin);
    return targets.includes(url.hash) && url.pathname === window.location.pathname;
  });

  anchors.forEach((link) => attachSmoothScroll(link, navLinks));
}

function attachSmoothScroll(link, navLinks) {
  if (smoothHandled.has(link)) return;
  smoothHandled.add(link);

  const linkUrl = new URL(link.href, window.location.origin);
  const hash = linkUrl.hash;

  link.addEventListener('click', (event) => {
    const target = document.querySelector(hash);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    history.pushState({}, '', hash);
    if (Array.isArray(navLinks)) {
      setActiveLinks(navLinks);
    }
  });
}

function setActiveLinks(links) {
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;
  links.forEach((link) => {
    const linkURL = new URL(link.href, window.location.origin);
    const isSamePath = linkURL.pathname === currentPath;
    const matchesHash = linkURL.hash && linkURL.hash === currentHash;
    const shouldHighlight = (linkURL.hash ? matchesHash && isSamePath : isSamePath && !currentHash) || link.dataset.nav === 'cta' && linkURL.pathname === currentPath && linkURL.hash === '';

    if (shouldHighlight) {
      link.classList.add('is-active');
    } else {
      link.classList.remove('is-active');
    }
  });
}
