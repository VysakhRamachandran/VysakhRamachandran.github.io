// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Theme toggle (light/dark, persisted) =====
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  if (theme === 'light' || theme === 'dark') {
    root.setAttribute('data-theme', theme);
  } else {
    root.removeAttribute('data-theme');
  }
}

const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const current = root.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Contact form (only present on contact.html) =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    const endpoint = contactForm.getAttribute('action');

    // Formspree endpoint not configured yet: fall back to opening the user's email client.
    if (!endpoint || endpoint.includes('YOUR_FORM_ID')) {
      const subject = encodeURIComponent(`Message from ${name} via website`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:vysakhchandran02@gmail.com?subject=${subject}&body=${body}`;
      formStatus.textContent = 'Opening your email client…';
      return;
    }

    formStatus.textContent = 'Sending…';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(contactForm),
      });

      if (response.ok) {
        formStatus.textContent = 'Thanks! Your message has been sent.';
        contactForm.reset();
      } else {
        formStatus.textContent = 'Something went wrong. Please email me directly instead.';
      }
    } catch (err) {
      formStatus.textContent = 'Network error. Please email me directly instead.';
    }
  });
}
