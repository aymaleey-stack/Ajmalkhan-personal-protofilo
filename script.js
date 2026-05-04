// script.js

// Cursor Ambient Blob Follow
const cursorBlob = document.getElementById("cursor-blob");

if (cursorBlob) {
    document.body.onpointermove = event => {
        const { clientX, clientY } = event;
        // Using requestAnimationFrame for smoother performance
        requestAnimationFrame(() => {
            cursorBlob.style.left = `${clientX}px`;
            cursorBlob.style.top = `${clientY}px`;
        });
    };
}

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 3, 3, 0.9)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
            navbar.style.borderBottom = '1px solid rgba(255, 42, 42, 0.15)';
        } else {
            navbar.style.background = 'rgba(10, 3, 3, 0.7)';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid rgba(255, 42, 42, 0.08)';
        }
    });
}

// Scroll Reveal Animations (Intersection Observer with dynamic flow)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => {
    if (el.classList.contains('skills-grid') || el.classList.contains('project-showcase')) {
        Array.from(el.children).forEach((child, i) => {
            // Apply staggered delays for ultra-smooth cascade entry
            child.classList.add('hidden', 'slide-up');
            child.style.transitionDelay = `${i * 150}ms`;
            observer.observe(child);
        });
        el.classList.remove('hidden');
    } else {
        observer.observe(el);
    }
});

// Advanced Deep 3D Hover Tilt Effect
const tiltCards = document.querySelectorAll('.hover-3d');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = x / rect.width;
        const yPercent = y / rect.height;
        
        // Deep 3D tilt (up to 12 degrees)
        const xRotation = (yPercent - 0.5) * -12; 
        const yRotation = (xPercent - 0.5) * 12;
        
        // Dynamic lighting effect based on mouse position
        card.style.transform = `perspective(1200px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1.02, 1.02, 1.02)`;
        
        // Add dynamic shine effect inside if desired via pseudo element
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Advanced Mouse-Driven Parallax for Hero Elements
const heroSection = document.getElementById('home');
const profileImage = document.querySelector('.profile-img-wrapper');
const badge1 = document.querySelector('.badge-1');
const badge2 = document.querySelector('.badge-2');
const badge3 = document.querySelector('.badge-3');

if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 40;
        const y = (window.innerHeight / 2 - e.pageY) / 40;

        // Utilizing translate3d for hardware acceleration
        if (profileImage) profileImage.style.transform = `translate3d(${x * 0.5}px, ${y * 0.5}px, 0)`;
        if (badge1) badge1.style.transform = `translate3d(${x * 1.5}px, ${y * 1.5}px, 80px)`;
        if (badge2) badge2.style.transform = `translate3d(${x * -1.2}px, ${y * -1.2}px, 80px)`;
        if (badge3) badge3.style.transform = `translate3d(${x * 0.8}px, ${y * -0.8}px, 80px)`;
    });
    
    heroSection.addEventListener('mouseleave', () => {
        if (profileImage) profileImage.style.transform = `translate3d(0, 0, 0)`;
        if (badge1) badge1.style.transform = `translate3d(0, 0, 80px)`;
        if (badge2) badge2.style.transform = `translate3d(0, 0, 80px)`;
        if (badge3) badge3.style.transform = `translate3d(0, 0, 80px)`;
    });
}

// Typing Effect for Title
const typingSpan = document.querySelector(".gradient-orange");
if (typingSpan) {
    const words = ["Analytical", "Strategic", "Innovative", "Data-Driven"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 120; // slightly faster typing

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2500; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(typeEffect, typeSpeed);
    }
    
    setTimeout(typeEffect, 1500);
}

// Contact Form Submission Action
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm && successMessage) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        // Hide form and slide in the success message animation
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
    });
}
