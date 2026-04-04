// Initialize app
window.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    initNavigation();
    initDynamicTitle();
    initScrollAnimations();
    initContactForm();
});

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!navbar || !mobileMenuBtn || !mobileMenu) {
        return;
    }

    let isMenuOpen = false;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    mobileMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenuBtn.innerHTML = '<i data-lucide="x"></i>';
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
        }

        lucide.createIcons();
    });

    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach((link) => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
        });
    });
}

function scrollToSection(targetId) {
    const element = document.querySelector(targetId);
    if (!element) {
        return;
    }

    const navbarHeight = 64;
    const elementPosition = element.offsetTop - navbarHeight;

    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

function initDynamicTitle() {
    const titleElement = document.getElementById('dynamic-text');
    if (!titleElement) {
        return;
    }

    const titles = [
        'Java (Spring Boot) • Python (FastAPI)',
        'APIs REST • Integração de Sistemas',
        'Automação de Processos • Arquitetura Backend',
        'PostgreSQL • Dados • Workflows com IA'
    ];

    let currentIndex = 0;
    setInterval(() => {
        titleElement.style.opacity = '0';

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % titles.length;
            titleElement.textContent = titles[currentIndex];
            titleElement.style.opacity = '1';
        }, 250);
    }, 3200);
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) {
        return;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const name = (formData.get('name') || '').toString().trim();
        const email = (formData.get('email') || '').toString().trim();
        const subject = (formData.get('subject') || '').toString().trim();
        const message = (formData.get('message') || '').toString().trim();

        const mailSubject = encodeURIComponent(subject || 'Contato via Portfólio - Mateus Cardoso');
        const mailBody = encodeURIComponent(
            `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`
        );

        window.location.href = `mailto:mateus7.cardosos@hotmail.com?subject=${mailSubject}&body=${mailBody}`;

        showToast(
            'Cliente de e-mail aberto',
            'Revise o e-mail no seu app padrão e finalize o envio.'
        );
    });
}

function showToast(title, description) {
    const toast = document.getElementById('toast');
    if (!toast) {
        return;
    }

    const titleEl = document.getElementById('toast-title');
    const descriptionEl = document.getElementById('toast-description');

    if (titleEl) {
        titleEl.textContent = title;
    }

    if (descriptionEl) {
        descriptionEl.textContent = description;
    }

    toast.classList.remove('hidden', 'hide');
    toast.classList.add('show');

    setTimeout(() => {
        hideToast();
    }, 4500);
}

function hideToast() {
    const toast = document.getElementById('toast');
    if (!toast) {
        return;
    }

    toast.classList.remove('show');
    toast.classList.add('hide');

    setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('hide');
    }, 300);
}

document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') {
        return;
    }

    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');

    if (mobileMenu && mobileMenuBtn && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
        lucide.createIcons();
    }

    const toast = document.getElementById('toast');
    if (toast && !toast.classList.contains('hidden')) {
        hideToast();
    }
});
