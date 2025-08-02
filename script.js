// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize all functionality
    initNavigation();
    initDynamicTitle();
    initScrollAnimations();
    initContactForm();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    // Handle scroll for navbar background
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenuBtn.innerHTML = '<i data-lucide="x"></i>';
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
        }
        
        // Reinitialize icons after changing innerHTML
        lucide.createIcons();
    });

    // Close mobile menu when clicking on links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            isMenuOpen = false;
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
        });
    });
}

// Smooth scrolling functionality
function scrollToSection(targetId) {
    const element = document.querySelector(targetId);
    if (element) {
        const navbarHeight = 64; // 4rem = 64px
        const elementPosition = element.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Dynamic title functionality
function initDynamicTitle() {
    const titles = ['Desenvolvedor Back-End', 'Desenvolvedor Front-End', 'Desenvolvedor Full Stack'];
    const titleElement = document.getElementById('dynamic-text');
    let currentIndex = 0;

    function updateTitle() {
        titleElement.style.opacity = '0';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % titles.length;
            titleElement.textContent = titles[currentIndex];
            titleElement.style.opacity = '1';
        }, 300);
    }

    // Start the rotation
    setInterval(updateTitle, 3000);
}

// Scroll animations functionality
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

    // Observe all elements with fade-in-up class
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el) => observer.observe(el));
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        // Show loading state
        setSubmitButtonLoading(true);
        
        try {
            // Simulate form submission delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success toast
            showToast();
            
            // Reset form
            form.reset();
            
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setSubmitButtonLoading(false);
        }
    });
}

// Submit button loading state
function setSubmitButtonLoading(loading) {
    const submitBtn = document.getElementById('submit-btn');
    
    if (loading) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <div class="loading-spinner"></div>
            Enviando...
        `;
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
            <i data-lucide="send"></i>
            Enviar Mensagem
        `;
        // Reinitialize icons
        lucide.createIcons();
    }
}

// Toast notification functionality
function showToast() {
    const toast = document.getElementById('toast');
    
    // Show toast
    toast.classList.remove('hidden');
    toast.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideToast();
    }, 5000);
}

function hideToast() {
    const toast = document.getElementById('toast');
    
    toast.classList.remove('show');
    toast.classList.add('hide');
    
    setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('hide');
    }, 300);
}

// Utility functions for external links
function openExternalLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Download CV functionality (placeholder)
function downloadCV() {
    // This would typically trigger a download of a CV PDF file
    // For now, it just scrolls to contact section
    scrollToSection('#contato');
}

// Handle dynamic imports and fallbacks
function handleImageError(img) {
    // Fallback for broken images
    img.style.display = 'none';
    
    // You could set a fallback image here
    // img.src = 'path/to/fallback-image.jpg';
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
        }
        
        // Close toast with Escape key
        const toast = document.getElementById('toast');
        if (!toast.classList.contains('hidden')) {
            hideToast();
        }
    }
});

// Performance optimization - Lazy load GitHub stats images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Handle page visibility for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause any unnecessary animations when page is hidden
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when page is visible
        document.body.classList.remove('page-hidden');
    }
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    // Import smooth scroll polyfill if needed
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
    script.onload = function() {
        window.__forceSmoothScrollPolyfill__ = true;
        window.smoothscroll.polyfill();
    };
    document.head.appendChild(script);
}