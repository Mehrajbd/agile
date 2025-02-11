// Comprehensive Website Interactivity Script

document.addEventListener('DOMContentLoaded', () => {
    // Quantum Particle Background Animation
    function createQuantumParticles() {
        const particlesContainer = document.querySelector('.quantum-particles');
        if (!particlesContainer) return;

        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('quantum-particle');
            
            // Randomize particle properties
            particle.style.width = `${Math.random() * 10}px`;
            particle.style.height = particle.style.width;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Scroll-triggered Animations
    function setupScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-section');
                }
            });
        }, observerOptions);

        const slideInElements = document.querySelectorAll('.mission-card, .vision-card, .value-card, .service-card, .partner-card, .client-card');
        slideInElements.forEach(el => fadeInObserver.observe(el));
    }

    // Navigation Smooth Scrolling
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Interactive Partners Redirection
    function setupPartnersInteraction() {
        const partnersSection = document.querySelector('.partners-section');
        if (!partnersSection) return;

        const partnerCards = partnersSection.querySelectorAll('.partner-card');
        
        partnerCards.forEach(card => {
            card.addEventListener('click', () => {
                const logoImg = card.querySelector('.partner-logo');
                if (logoImg && logoImg.alt) {
                    // Map partner names to their websites
                    const partnerWebsites = {
                        'Gooseberry Innovation': 'https://gooseberryinnovation.com',
                        'Gooseberry BPO': 'https://gooseberrybpo.com',
                        'B-ADVANCY Certification Ltd.': 'https://b-advancy.com',
                        'iCrew Technologies': 'https://icrewtech.com'
                    };

                    const website = partnerWebsites[logoImg.alt];
                    if (website) {
                        window.open(website, '_blank');
                    }
                }
            });
        });
    }

    // Dynamic Skill Bars (for potential future use)
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = `${percentage}%`;
        });
    }

    // Form Validation and Submission
    function setupFormValidation() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                isValid = false;
                nameInput.classList.add('error');
            } else {
                nameInput.classList.remove('error');
            }
            
            if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('error');
            } else {
                emailInput.classList.remove('error');
            }
            
            if (messageInput.value.trim() === '') {
                isValid = false;
                messageInput.classList.add('error');
            } else {
                messageInput.classList.remove('error');
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                alert('Form submitted successfully!');
                contactForm.reset();
            }
        });
    }

    // Theme Toggle Functionality
    function setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });

        // Check saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }

    // Testimonial Slider
    function setupTestimonialSlider() {
        const testimonialContainer = document.querySelector('.testimonial-slider');
        if (!testimonialContainer) return;

        const testimonials = testimonialContainer.querySelectorAll('.testimonial');
        let currentTestimonial = 0;

        function showTestimonial(index) {
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            testimonials[index].classList.add('active');
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }

        // Auto-rotate testimonials
        setInterval(nextTestimonial, 5000);
    }

    // Clients Section Sliding Banner Interaction
    function setupClientsBannerInteraction() {
        const clientsBanner = document.querySelector('.slide-banner');
        const clientCards = document.querySelectorAll('.slide-item');

        // Pause animation on hover
        clientCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                clientsBanner.style.animationPlayState = 'paused';
            });

            card.addEventListener('mouseleave', () => {
                clientsBanner.style.animationPlayState = 'running';
            });
        });

        // Optional: Add click interaction to show more details
        clientCards.forEach(card => {
            card.addEventListener('click', () => {
                const clientName = card.getAttribute('data-client');
                const clientIndustry = card.querySelector('.client-industry').textContent;
                
                // Create a modal or toast notification
                const notification = document.createElement('div');
                notification.classList.add('client-notification');
                notification.innerHTML = `
                    <h4>${clientName}</h4>
                    <p>Industry: ${clientIndustry}</p>
                    <button class="close-notification">Close</button>
                `;
                
                document.body.appendChild(notification);
                
                // Close notification
                const closeBtn = notification.querySelector('.close-notification');
                closeBtn.addEventListener('click', () => {
                    document.body.removeChild(notification);
                });
            });
        });
    }

    // About Page Interactions
    function setupAboutPageInteractions() {
        const leaderCards = document.querySelectorAll('.leader-card');
        
        leaderCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const overlay = card.querySelector('.leader-overlay');
                if (overlay) {
                    overlay.style.opacity = '1';
                }
            });

            card.addEventListener('mouseleave', () => {
                const overlay = card.querySelector('.leader-overlay');
                if (overlay) {
                    overlay.style.opacity = '0';
                }
            });
        });
    }

    // Intersection Observer for Animated Sections
    function setupIntersectionObserver() {
        const sections = document.querySelectorAll('.terms-section, .policy-section');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Smooth Scroll to Anchor Links
    function setupSmoothScrollingToAnchors() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Mobile Navigation Toggle
    function setupMobileNavigationToggle() {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }

    // Form Validation
    function setupFormValidationHelper() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;

                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        field.classList.add('error');
                        isValid = false;
                    } else {
                        field.classList.remove('error');
                    }
                });

                if (!isValid) {
                    e.preventDefault();
                    const firstInvalidField = form.querySelector('.error');
                    firstInvalidField.focus();
                }
            });
        });
    }

    // Contact Form Submission
    function setupContactFormSubmission() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                if (validateForm(contactForm)) {
                    // Here you would typically send form data to a server
                    alert('Form submitted successfully!');
                    contactForm.reset();
                }
            });
        }
    }

    // Lazy Loading for Images
    function setupLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const lazyLoadOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px 50px 0px'
        };

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, lazyLoadOptions);

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Initialize all functions
    function init() {
        createQuantumParticles();
        setupScrollAnimations();
        setupFormValidation();
        setupThemeToggle();
        setupTestimonialSlider();
        setupClientsBannerInteraction();
        setupSmoothScrolling();
        setupIntersectionObserver();
        setupSmoothScrollingToAnchors();
        setupMobileNavigationToggle();
        setupFormValidationHelper();
        setupContactFormSubmission();
        setupLazyLoading();

        // Check if we're on specific pages
        if (document.body.classList.contains('about-page')) {
            setupAboutPageInteractions();
        }
        
        if (document.body.classList.contains('contact-page')) {
            setupContactForm();
        }
    }

    // Run initialization
    init();
});

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Success Notification
function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('success-notification');
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Responsive Image Lazy Loading
function setupResponsiveLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '0px 0px 50px 0px'
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Touch Device Detection and Optimization
function setupTouchDeviceOptimization() {
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
        
        // Enhance tap targets
        const tapTargets = document.querySelectorAll('.btn, .nav-link, .client-card');
        tapTargets.forEach(target => {
            target.style.minHeight = '44px';
            target.style.minWidth = '44px';
        });
    }
}

// Responsive Scroll Behavior
function setupResponsiveScrolling() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Responsive Form Validation
function setupResponsiveFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('invalid');
                    isValid = false;
                } else {
                    field.classList.remove('invalid');
                }
            });

            if (!isValid) {
                e.preventDefault();
                const firstInvalidField = form.querySelector('.invalid');
                firstInvalidField.focus();
            }
        });
    });
}

// Terms and Conditions Page Animations
function initTermsAndConditionsAnimations() {
    const sections = document.querySelectorAll('.terms-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Privacy Policy Page Animations
function initPrivacyPolicyAnimations() {
    const sections = document.querySelectorAll('.policy-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize page-specific animations when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for Terms and Conditions page
    if (document.querySelector('.terms-container')) {
        initTermsAndConditionsAnimations();
    }

    // Check for Privacy Policy page
    if (document.querySelector('.privacy-policy-container')) {
        initPrivacyPolicyAnimations();
    }
});