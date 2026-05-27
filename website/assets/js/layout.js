/*
README
- Edit each page's content directly inside that page HTML in the inline `window.siteContent` block:
  - `/index.html` and `/website/index.html` for Home
  - `/eligibility-check/index.html` and `/website/eligibility-check/index.html` for Eligibility
- Adjust site-wide tokens (colors, fonts, spacing, shadows) inside /website/assets/css/theme.css.
- Add or replace media by dropping files in /website/assets/media/ and referencing them with relative paths (e.g., <img src="/website/assets/media/hero.jpg" alt="...">) inside the relevant HTML or JS renderers.
*/

const smoothHandled = new WeakSet();

(() => {
  const content = getSiteContent();
  if (!content) return;
  window.siteContent = content;

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

  const menuId = 'primary-nav-links';
  const linksWrapper = document.createElement('div');
  linksWrapper.className = 'nav-links';
  linksWrapper.id = menuId;
  const actionsWrapper = document.createElement('div');
  actionsWrapper.className = 'nav-actions';

  navContent.links.forEach((item) => {
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.label;
    link.dataset.nav = 'link';
    if (item.label === 'Log in / sign up') {
      link.classList.add('nav-action');
      actionsWrapper.appendChild(link);

      const mobileLink = link.cloneNode(true);
      mobileLink.classList.add('nav-action-mobile');
      linksWrapper.appendChild(mobileLink);
      navLinks.push(mobileLink);
    } else {
      linksWrapper.appendChild(link);
    }
    navLinks.push(link);
  });

  const menuToggle = document.createElement('button');
  menuToggle.className = 'nav-menu-toggle';
  menuToggle.type = 'button';
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  menuToggle.setAttribute('aria-controls', menuId);
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.innerHTML = '<span></span><span></span><span></span>';

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  inner.appendChild(linksWrapper);
  inner.appendChild(actionsWrapper);
  inner.appendChild(menuToggle);
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
    anchor.href = resolveSiteHref(link.href);
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
    anchor.href = resolveSiteHref(link.href);
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
  contactColumn.append(contactLabel, address);

  if (footerContent.contact.linkLabel && footerContent.contact.linkHref) {
    const contactLink = document.createElement('a');
    contactLink.href = resolveSiteHref(footerContent.contact.linkHref);
    contactLink.textContent = footerContent.contact.linkLabel;
    contactColumn.appendChild(contactLink);
  } else if (footerContent.contact.email) {
    const emailLink = document.createElement('a');
    emailLink.href = `mailto:${footerContent.contact.email}`;
    emailLink.textContent = `${footerContent.contact.emailLabel}: ${footerContent.contact.email}`;
    contactColumn.appendChild(emailLink);
  }

  grid.append(brand, linksColumn, otherColumn, contactColumn);
  container.appendChild(grid);

  const legal = document.createElement('div');
  legal.className = 'footer-legal';
  footerContent.legalText.forEach((paragraph) => {
    const p = document.createElement('p');
    appendLinkedLegalText(p, paragraph);
    legal.appendChild(p);
  });

  container.appendChild(legal);
  footer.appendChild(container);
  return footer;
}

function appendLinkedLegalText(container, text) {
  const linkedPhrases = [
    { text: 'Terms and Conditions of Use', href: '/terms/' },
    { text: 'Privacy Policy', href: '/privacy/' }
  ];
  const pattern = new RegExp(`(${linkedPhrases.map((item) => escapeRegExp(item.text)).join('|')})`, 'g');
  let lastIndex = 0;

  text.replace(pattern, (match, _phrase, index) => {
    if (index > lastIndex) {
      container.appendChild(document.createTextNode(text.slice(lastIndex, index)));
    }

    const linkedPhrase = linkedPhrases.find((item) => item.text === match);
    const anchor = document.createElement('a');
    anchor.href = resolveSiteHref(linkedPhrase.href);
    anchor.textContent = match;
    container.appendChild(anchor);
    lastIndex = index + match.length;
    return match;
  });

  if (lastIndex < text.length) {
    container.appendChild(document.createTextNode(text.slice(lastIndex)));
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function resolveSiteHref(href) {
  if (!href || !href.startsWith('/') || window.location.protocol !== 'file:') {
    return href;
  }

  const currentPath = window.location.pathname;
  const websiteIndex = currentPath.indexOf('/website/');
  const sitePrefix = websiteIndex > -1 ? '/website' : '';
  const rootPath = websiteIndex > -1 ? currentPath.slice(0, websiteIndex) : getRootPreviewPath(currentPath);
  const [pathPart, hash = ''] = href.split('#');
  const targetPath = pathPart === '/' ? '/index.html' : pathPart.endsWith('/') ? `${pathPart}index.html` : pathPart;
  return `file://${rootPath}${sitePrefix}${targetPath}${hash ? `#${hash}` : ''}`;
}

function getRootPreviewPath(pathname) {
  const sectionMatch = pathname.match(/\/(privacy|terms|eligibility-check|eligibilitycheck|app)\//);
  if (sectionMatch) {
    return pathname.slice(0, sectionMatch.index);
  }

  return pathname.slice(0, pathname.lastIndexOf('/'));
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
