// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===== MOBILE MENU =====
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  const spans = mobileToggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(3.5px) rotate(45deg)';
    spans[1].style.transform = 'translateY(-3.5px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  }
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = mobileToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  });
});

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
reveals.forEach(el => revealObserver.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
counters.forEach(c => counterObserver.observe(c));

// ===== SERVICE CARD MOUSE GLOW =====
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--mx', '50%');
    card.style.setProperty('--my', '0%');
  });
});

// ===== IMAGE FALLBACKS =====
document.querySelectorAll('.team-avatar img').forEach(img => {
  const handler = function () {
    this.style.display = 'none';
    const fallback = this.nextElementSibling;
    if (fallback && fallback.classList.contains('avatar-fallback')) {
      fallback.style.display = 'flex';
    }
  };
  img.addEventListener('error', handler);
  if (img.complete && img.naturalWidth === 0) handler.call(img);
});

document.querySelectorAll('.work-card img').forEach(img => {
  img.addEventListener('error', function () {
    this.style.display = 'none';
    this.parentElement.style.background =
      'linear-gradient(135deg, #1a3a78, #0a1a3a)';
  });
});

// ===== PARALLAX ON HERO LOGO ORB =====
const orb = document.querySelector('.hero-logo-orb');
if (orb && window.matchMedia('(min-width: 720px)').matches) {
  let rafId = null;
  window.addEventListener('scroll', () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      const y = window.scrollY * 0.3;
      orb.style.transform = `translateY(${y}px)`;
      rafId = null;
    });
  }, { passive: true });
}
