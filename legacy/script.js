// ===== MODERN JAVASCRIPT FOR MANHATTAN LEGAL ASSOCIATES =====

class ManhattanLegalApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.setupTestimonials();
        this.setupContactForm();
        this.setupScrollAnimations();
        this.setupAccessibility();
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Mobile navigation toggle (new navbar)
        const navToggle = document.getElementById('navToggle');
        const navDrawer = document.getElementById('navDrawer');
        if (navToggle && navDrawer) {
            navToggle.addEventListener('click', () => {
                const open = navToggle.getAttribute('aria-expanded') === 'true';
                navToggle.setAttribute('aria-expanded', String(!open));
                navDrawer.classList.toggle('open');
            });
            document.querySelectorAll('#navDrawer .nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navDrawer.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }

    // ===== NAVIGATION =====
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });

        // Active navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }


    // ===== TESTIMONIALS SLIDER =====
    setupTestimonials() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentSlide = 0;

        if (testimonialCards.length === 0) return;

        const showSlide = (index) => {
            testimonialCards.forEach((card, i) => {
                card.classList.toggle('active', i === index);
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            showSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
            showSlide(currentSlide);
        };

        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Auto-play testimonials
        setInterval(nextSlide, 5000);

        // Pause on hover
        const slider = document.querySelector('.testimonials-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => {
                clearInterval(this.testimonialInterval);
            });
            
            slider.addEventListener('mouseleave', () => {
                this.testimonialInterval = setInterval(nextSlide, 5000);
            });
        }
    }

    // ===== CONTACT FORM =====
    setupContactForm() {
        const form = document.getElementById('contact-form');
        const status = document.getElementById('form-status');

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!this.validateForm(data)) {
                return;
            }

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                // Simulate API call
                await this.simulateFormSubmission(data);
                
                // Show success message
                this.showFormStatus('success', 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
                form.reset();
                
            } catch (error) {
                // Show error message
                this.showFormStatus('error', 'Sorry, there was an error sending your message. Please try again or call us directly.');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    validateForm(data) {
        let isValid = true;
        const requiredFields = ['name', 'email', 'message'];
        
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!data[field] || data[field].trim() === '') {
                this.showFieldError(input, 'This field is required');
                isValid = false;
            } else if (field === 'email' && !this.isValidEmail(data[field])) {
                this.showFieldError(input, 'Please enter a valid email address');
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(input) {
        const value = input.value.trim();
        const fieldName = input.name;
        
        if (input.hasAttribute('required') && !value) {
            this.showFieldError(input, 'This field is required');
            return false;
        }
        
        if (fieldName === 'email' && value && !this.isValidEmail(value)) {
            this.showFieldError(input, 'Please enter a valid email address');
            return false;
        }
        
        this.clearFieldError(input);
        return true;
    }

    showFieldError(input, message) {
        this.clearFieldError(input);
        input.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc2626';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        input.parentNode.appendChild(errorDiv);
    }

    clearFieldError(input) {
        input.classList.remove('error');
        const errorDiv = input.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    showFormStatus(type, message) {
        const status = document.getElementById('form-status');
        if (status) {
            status.className = `form-status ${type}`;
            status.textContent = message;
            status.style.display = 'block';
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                status.style.display = 'none';
            }, 5000);
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async simulateFormSubmission(data) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate occasional failure for demo
        if (Math.random() < 0.1) {
            throw new Error('Simulated network error');
        }
        
        console.log('Form submitted:', data);
    }


    // ===== SCROLL ANIMATIONS =====
    setupScrollAnimations() {
        // Add animation classes to elements
        const elementsToAnimate = [
            '.service-card',
            '.testimonial-card',
            '.lawyer-profile',
            '.contact-form-container',
            '.info-card'
        ];

        elementsToAnimate.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, index) => {
                el.classList.add('animate-on-scroll');
                el.style.animationDelay = `${index * 0.1}s`;
            });
        });

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Observe all elements with animation class
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // ===== ACCESSIBILITY =====
    setupAccessibility() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Focus management for mobile menu
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    const firstLink = navMenu.querySelector('.nav-link');
                    if (firstLink) firstLink.focus();
                }
            });
        }

        // ARIA labels and roles
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
                button.setAttribute('aria-label', 'Button');
            }
        });
    }

    // ===== UTILITY METHODS =====
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the app
    new ManhattanLegalApp();
    
    // Set current year in footer
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Add loading class removal
    document.body.classList.add('loaded');
    
});

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    // Log performance metrics
    if (window.performance) {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ManhattanLegalApp;
}