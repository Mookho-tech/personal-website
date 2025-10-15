// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');
const scrollProgress = document.getElementById('scroll-progress');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const dots = document.querySelectorAll('.dot');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const contactForm = document.querySelector('.contact-form');
const newsletterForm = document.querySelector('.newsletter-form');
const formMessage = document.querySelector('.form-message');
const skillBars = document.querySelectorAll('.skill-progress');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
    
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Initialize animations
    initScrollAnimations();
    
    // Initialize typing effect
    typeWriter();
    
    // Initialize particles
    initParticles();
    
    // Initialize matrix rain
    initMatrixRain();
    
    // Initialize floating binary
    createFloatingBinary();
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add glitch effect
    document.body.style.animation = 'glitch 0.3s';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 300);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// Scroll Events
window.addEventListener('scroll', () => {
    // Header scroll effect
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Scroll progress
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = `${scrollPercentage}%`;
    
    // Animate skill bars when in view
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = `${progress}%`;
        }
    });
});

// Back to Top
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Navigation
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Enhanced project filtering with animation
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects with staggered animation
        const filter = btn.getAttribute('data-filter');
        let delay = 0;
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, delay);
                
                delay += 100;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Add interactive hover effect to project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add a subtle glow effect
        card.style.boxShadow = '0 20px 60px rgba(0, 212, 255, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        // Reset the glow effect
        card.style.boxShadow = '';
    });
});

// Testimonial Slider
let currentSlide = 0;

function showSlide(index) {
    testimonialCards.forEach(card => {
        card.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-rotate testimonials
setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    showSlide(currentSlide);
}, 5000);

// Form Submissions
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate form submission
    showFormMessage('Message transmitted successfully!', 'success');
    contactForm.reset();
});

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(newsletterForm);
    const email = formData.get('email');
    
    // Simple validation
    if (!email) {
        showFormMessage('Please enter your email address', 'error');
        return;
    }
    
    // Simulate form submission
    showFormMessage('Subscription activated!', 'success');
    newsletterForm.reset();
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 4000);
}

// Typing Effect
function typeWriter() {
    const text = "Software Developer & Graphic Designer";
    const typingElement = document.getElementById('typing-text');
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                typingElement.textContent = '';
                index = 0;
                type();
            }, 2000);
        }
    }
    
    type();
}

// Initialize Particles
function initParticles() {
    const heroSection = document.querySelector('.hero-particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 3 + 1;
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.2;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = opacity;
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        particle.style.background = `hsl(${180 + Math.random() * 60}, 100%, 50%)`;
        particle.style.boxShadow = `0 0 10px currentColor`;
        
        heroSection.appendChild(particle);
    }
}

// Matrix Rain Effect
function initMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.05';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
    const matrixArray = matrix.split('');
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00d4ff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 35);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Create floating binary code animation
function createFloatingBinary() {
    const projectsSection = document.querySelector('.projects');
    
    setInterval(() => {
        const binary = document.createElement('div');
        binary.classList.add('floating-element', 'binary');
        binary.textContent = Math.random() > 0.5 ? '01101' : '10110';
        binary.style.left = Math.random() * 100 + '%';
        binary.style.top = Math.random() * 100 + '%';
        binary.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        projectsSection.appendChild(binary);
        
        // Remove the element after animation completes
        setTimeout(() => {
            binary.remove();
        }, 25000);
    }, 5000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
}

// Add particle styles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    .particle {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.5;
        }
        25% {
            transform: translateY(-30px) translateX(20px) scale(1.2);
            opacity: 0.8;
        }
        50% {
            transform: translateY(20px) translateX(-30px) scale(0.8);
            opacity: 0.3;
        }
        75% {
            transform: translateY(-20px) translateX(30px) scale(1.1);
            opacity: 0.6;
        }
    }
    
    @keyframes glitch {
        0%, 100% {
            transform: translate(0);
            filter: hue-rotate(0deg);
        }
        20% {
            transform: translate(-2px, 2px);
            filter: hue-rotate(90deg);
        }
        40% {
            transform: translate(-2px, -2px);
            filter: hue-rotate(180deg);
        }
        60% {
            transform: translate(2px, 2px);
            filter: hue-rotate(270deg);
        }
        80% {
            transform: translate(2px, -2px);
            filter: hue-rotate(360deg);
        }
    }
`;
document.head.appendChild(particleStyles);

// Add reveal animation for elements
const revealElements = document.querySelectorAll('section');
revealElements.forEach(element => {
    element.classList.add('fade-in');
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'T' to toggle theme
    if (e.key === 't' || e.key === 'T') {
        themeToggle.click();
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
    
    // Press 1-4 to filter projects
    if (e.key >= '1' && e.key <= '4') {
        const index = parseInt(e.key) - 1;
        if (filterBtns[index]) {
            filterBtns[index].click();
        }
    }
});