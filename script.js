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

    // Smooth Scrolling Function
    function setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        const serviceButtons = document.querySelectorAll('.btn[href^="#"]');
        
        // Combine nav links and service buttons
        const scrollLinks = [...navLinks, ...serviceButtons];

        scrollLinks.forEach(link => {
            link.addEventListener('click', function(e) {
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

    // Contact Form Handling
    function setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic form validation
                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const message = document.getElementById('message');
                
                // Reset previous error states
                [name, email, message].forEach(field => {
                    field.classList.remove('error');
                });
                
                // Validate fields
                let isValid = true;
                
                if (name.value.trim() === '') {
                    name.classList.add('error');
                    isValid = false;
                }
                
                if (email.value.trim() === '' || !isValidEmail(email.value)) {
                    email.classList.add('error');
                    isValid = false;
                }
                
                if (message.value.trim() === '') {
                    message.classList.add('error');
                    isValid = false;
                }
                
                // If form is valid, submit or show success
                if (isValid) {
                    showSuccessNotification('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                }
            });
        }
    }

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

    // Initialize all functions
    function init() {
        createQuantumParticles();
        setupScrollAnimations();
        setupFormValidation();
        setupThemeToggle();
        setupTestimonialSlider();
        setupClientsBannerInteraction();
        setupSmoothScrolling();

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