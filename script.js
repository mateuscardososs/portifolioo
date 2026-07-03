window.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }

    const year = document.getElementById('current-year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    initHeader();
    initMobileMenu();
});

function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) {
        return;
    }

    const updateHeader = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 12);
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
}

function initMobileMenu() {
    const button = document.getElementById('menu-button');
    const menu = document.getElementById('site-menu');

    if (!button || !menu) {
        return;
    }

    const closeMenu = () => {
        button.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        button.innerHTML = '<i data-lucide="menu"></i>';
        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    button.addEventListener('click', () => {
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!isOpen));
        menu.classList.toggle('is-open', !isOpen);
        button.innerHTML = !isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
        if (window.lucide) {
            window.lucide.createIcons();
        }
    });

    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}
