(() => {
  const body = document.body;
  const nav = document.querySelector('#site-nav');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const header = document.querySelector('#site-header');

  body.classList.add('js');

  const syncHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  const closeMenu = () => {
    if (!nav || !menuButton) return;
    nav.classList.remove('is-open');
    menuButton.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Menü öffnen');
  };

  if (nav && menuButton) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.classList.toggle('is-open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 830) closeMenu();
    });
  }

  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(contactForm);
      const value = (name) => String(data.get(name) || '').trim();
      const recipient = contactForm.dataset.recipient || '';
      const service = value('service') || 'Werkstatt-Service';
      const subject = `Anfrage ${service} | ${value('name')}`;
      const message = [
        `Name: ${value('name')}`,
        `E-Mail: ${value('email')}`,
        `Telefon: ${value('phone') || 'nicht angegeben'}`,
        `Service: ${service}`,
        '',
        value('message')
      ].join('\n');
      const status = contactForm.querySelector('[data-form-status]');
      if (status) status.textContent = 'Ihr E-Mail-Programm wird geöffnet.';
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px' });

  reveals.forEach((element) => observer.observe(element));
})();
