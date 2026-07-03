window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initNavigation();
  initScrollAnimations();
});

function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 24);
  });

  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden', isOpen);
    mobileMenuBtn.innerHTML = isOpen ? '<i data-lucide="menu"></i>' : '<i data-lucide="x"></i>';
    if (window.lucide) lucide.createIcons();
  });

  mobileMenu.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
      if (window.lucide) lucide.createIcons();
    });
  });
}

function scrollToSection(targetId) {
  const element = document.querySelector(targetId);
  if (!element) return;
  const y = element.getBoundingClientRect().top + window.scrollY - 76;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

function initScrollAnimations() {
  const items = document.querySelectorAll('.fade-in-up');
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach((item) => observer.observe(item));
}

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  if (!mobileMenu || !mobileMenuBtn) return;
  mobileMenu.classList.add('hidden');
  mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
  if (window.lucide) lucide.createIcons();
});
