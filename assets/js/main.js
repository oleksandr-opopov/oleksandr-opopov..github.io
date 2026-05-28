/* Navigation: add scrolled class */
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Mobile nav toggle */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });

  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });
}

/* Active nav link on scroll */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav__link[href*="#"]');

if (sections.length && navItems.length) {
  const observerOptions = { rootMargin: '-40% 0px -55% 0px' };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(item => {
          item.classList.toggle(
            'active',
            item.getAttribute('href').includes(`#${entry.target.id}`)
          );
        });
      }
    });
  }, observerOptions);

  sections.forEach(s => sectionObserver.observe(s));
}

/* Scroll reveal */
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));
}

/* Typing animation */
const typingEl = document.getElementById('typing-text');
if (typingEl) {
  const phrases = [
    'Full-Stack Developer',
    'API Architect',
    'Open-Source Contributor',
    'Performance Enthusiast',
    'Clean Code Advocate',
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pauseMs = 0;

  const type = () => {
    const current = phrases[phraseIdx];

    if (!deleting) {
      typingEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        pauseMs = 2000;
      } else {
        pauseMs = 60 + Math.random() * 40;
      }
    } else {
      typingEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        pauseMs = 400;
      } else {
        pauseMs = 30 + Math.random() * 20;
      }
    }

    setTimeout(type, pauseMs);
  };

  setTimeout(type, 800);
}

/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
