const searchParams = new URLSearchParams(window.location.search);
const captureMode = searchParams.has('capture');
document.documentElement.classList.add('js');
if (captureMode) {
    document.documentElement.classList.add('capture-mode');
}

window.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
    initHeader();
    initMobileMenu();
    initActiveNavigation();
    initCopyEmail();
    initScrollReveal();
    initHeroGlow();
    if (captureMode && window.location.hash) {
        document.querySelector(window.location.hash)?.scrollIntoView({ block: 'start' });
    }
});

function setCurrentYear() {
    const year = document.getElementById('current-year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }
}

function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) {
        return;
    }

    const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
}

function initMobileMenu() {
    const button = document.getElementById('menu-button');
    const menu = document.getElementById('site-menu');
    if (!button || !menu) {
        return;
    }

    const setMenuState = (isOpen) => {
        button.setAttribute('aria-expanded', String(isOpen));
        button.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
        menu.classList.toggle('is-open', isOpen);
    };

    button.addEventListener('click', () => {
        setMenuState(button.getAttribute('aria-expanded') !== 'true');
    });

    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
            setMenuState(false);
            button.focus();
        }
    });
}

function initActiveNavigation() {
    const links = [...document.querySelectorAll('[data-nav]')];
    if (!links.length || !('IntersectionObserver' in window)) {
        return;
    }

    const sections = links.map((link) => document.getElementById(link.dataset.nav)).filter(Boolean);

    const setActiveLink = (sectionId) => {
        links.forEach((link) => {
            if (link.dataset.nav === sectionId) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const observer = new IntersectionObserver((entries) => {
        const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visible) {
            setActiveLink(visible.target.id);
        }
    }, {
        rootMargin: '-24% 0px -62% 0px',
        threshold: [0, 0.2, 0.5]
    });

    sections.forEach((section) => observer.observe(section));
}

function initCopyEmail() {
    const button = document.getElementById('copy-email');
    const status = document.getElementById('copy-status');
    if (!button || !status) {
        return;
    }

    button.addEventListener('click', async () => {
        const email = button.dataset.email;
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(email);
            } else {
                copyWithFallback(email);
            }
            status.textContent = 'E-mail copiado.';
            button.textContent = 'Copiado';
        } catch {
            status.textContent = 'Não foi possível copiar. Selecione o endereço ao lado.';
        }
    });
}

function copyWithFallback(value) {
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();

    if (!copied) {
        throw new Error('Copy command failed');
    }
}

function initScrollReveal() {
    const elements = [...document.querySelectorAll('[data-reveal]')];
    if (!elements.length) {
        return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (captureMode || reducedMotion || !('IntersectionObserver' in window)) {
        elements.forEach((element) => element.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    elements.forEach((element) => observer.observe(element));
}

function initHeroGlow() {
    const panel = document.querySelector('.status-panel');
    if (!panel || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    panel.addEventListener('pointermove', (event) => {
        const bounds = panel.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        panel.style.setProperty('--glow-x', `${x.toFixed(1)}%`);
        panel.style.setProperty('--glow-y', `${y.toFixed(1)}%`);
    });

    panel.addEventListener('pointerleave', () => {
        panel.style.removeProperty('--glow-x');
        panel.style.removeProperty('--glow-y');
    });
}
