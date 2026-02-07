import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import confetti from 'canvas-confetti';
import {
    createIcons,
    ArrowRight,
    ArrowUp,
    Download,
    ExternalLink,
    Github,
    Heart,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Moon,
    Send,
    Sun,
    Twitter,
    Award,
    Users,
    Code2,
    Coffee,
    Check,
    Briefcase,
    Rocket,
    CheckCircle
} from 'lucide/dist/esm/lucide/src/lucide';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

console.log("Portfolio script initialized!");

// Initialize Lucide Icons
const initIcons = () => {
    createIcons({
        icons: {
            ArrowRight,
            ArrowUp,
            Download,
            ExternalLink,
            Github,
            Heart,
            Instagram,
            Linkedin,
            Mail,
            MapPin,
            Moon,
            Send,
            Sun,
            Twitter,
            Award,
            Users,
            Code2,
            Coffee,
            Check,
            Briefcase,
            Rocket,
            CheckCircle
        }
    });
};

initIcons();

// --- PRELOADER ---
const preloader = document.querySelector('.preloader');
const preloaderProgress = document.querySelector('.preloader-progress');
const preloaderLogo = document.querySelectorAll('.preloader-logo span');

const runPreloader = () => {
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.to(preloader, {
                yPercent: -100,
                duration: 1,
                ease: 'power4.inOut',
                onComplete: () => {
                    preloader.style.display = 'none';
                    startHeroAnimation();
                }
            });
        }
    });

    tl.to(preloaderProgress, {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut'
    })
        .to(preloaderLogo, {
            opacity: 0,
            y: -10,
            stagger: 0.05,
            duration: 0.5,
            ease: 'power2.in'
        }, "-=0.2");
};

// --- CUSTOM CURSOR ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    // Center the elements
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorOutline, { xPercent: -50, yPercent: -50 });

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follow immediately
        gsap.to(cursorDot, {
            x: posX,
            y: posY,
            duration: 0
        });

        // Outline follow with delay
        gsap.to(cursorOutline, {
            x: posX,
            y: posY,
            duration: 0.15,
            ease: 'power3.out'
        });
    });
}

// Hover effect for cursor
const interactiveElements = document.querySelectorAll('a, button, .project-card, .about-card, .info-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursorOutline, {
            width: 80,
            height: 80,
            borderWidth: '0.5px',
            borderColor: 'rgba(255,255,255,0.2)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            duration: 0.3
        });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursorOutline, {
            width: 40,
            height: 40,
            borderWidth: '1px',
            borderColor: 'rgba(255,255,255,0.5)',
            backgroundColor: 'transparent',
            duration: 0.3
        });
    });
});

// --- FLOATING ORBS ---
const createOrbs = () => {
    const orbContainer = document.createElement('div');
    orbContainer.className = 'orb-container';
    document.body.appendChild(orbContainer);

    for (let i = 0; i < 3; i++) {
        const orb = document.createElement('div');
        orb.className = 'orb';
        orbContainer.appendChild(orb);

        gsap.set(orb, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 2 + 1,
            opacity: 0.1
        });

        // Floating animation
        gsap.to(orb, {
            x: '+=100',
            y: '+=100',
            duration: Math.random() * 10 + 10,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    window.addEventListener('mousemove', (e) => {
        gsap.to('.orb', {
            x: (i) => e.clientX * (0.02 * (i + 1)),
            y: (i) => e.clientY * (0.02 * (i + 1)),
            duration: 2,
            ease: 'power2.out'
        });
    });
};

createOrbs();

// --- MAGNETIC ELEMENTS ---
const magneticElements = document.querySelectorAll('.btn, .logo, #theme-toggle, .magnetic');
magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    el.addEventListener('mouseleave', () => {
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
        });
    });
});

// --- THEME TOGGLE ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');

    // Update icon
    if (isLight) {
        themeIcon.setAttribute('data-lucide', 'sun');
    } else {
        themeIcon.setAttribute('data-lucide', 'moon');
    }
    initIcons();

    // GSAP feedback animation
    gsap.fromTo(themeToggle, { scale: 0.8, rotate: -30 }, { scale: 1, rotate: 0, duration: 0.4, ease: 'back.out(2)' });
});

// --- TYPING EFFECT ---
const typingText = document.getElementById('typing-text');
const roles = ["Full Stack Developer", "Creative Problem Solver", "Scalable Systems Builder", "System Design Enthusiast", "Logical Thinker"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}
type();

// --- HERO ANIMATIONS ---
const startHeroAnimation = () => {
    const heroTl = gsap.timeline();

    gsap.set(".glass-nav", { y: -100, opacity: 0 });

    heroTl.from(".hero-greeting", { opacity: 0, y: 30, duration: 1, ease: 'expo.out' })
        .from(".hero-name", {
            opacity: 0,
            y: 80,
            duration: 1.8,
            ease: 'expo.out',
            clipPath: 'inset(0 0 100% 0)'
        }, "-=0.8")
        .from(".hero-role", { opacity: 0, y: 20, duration: 1 }, "-=1.2")
        .from(".hero-tagline", { opacity: 0, y: 20, duration: 1 }, "-=0.8")
        .from(".hero-btns .btn", { opacity: 0, y: 20, stagger: 0.2, duration: 1, ease: 'expo.out' }, "-=0.8")
        .to(".glass-nav", { y: 0, opacity: 1, duration: 1.5, ease: 'expo.out' }, "-=1.5")
        .from(".scroll-indicator", { opacity: 0, duration: 1 }, "-=1");

    // Parallax effect for hero name
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;

        gsap.to(".hero-name", {
            x: x,
            y: y,
            rotateX: -y * 0.5,
            rotateY: x * 0.5,
            duration: 1,
            ease: 'power2.out'
        });
    });
};

// Start Preloader
window.addEventListener('load', runPreloader);

// --- SCROLL PROGRESS ---
gsap.to(".scroll-progress", {
    width: "100%",
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
    }
});

// --- SECTION TITLE ANIMATIONS ---
document.querySelectorAll('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 90%",
        },
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'expo.out'
    });
});

// --- ABOUT SECTION ANIMATIONS ---
gsap.from(".about-card-wrapper", {
    scrollTrigger: {
        trigger: ".about-grid",
        start: "top 70%",
    },
    opacity: 0,
    x: -50,
    duration: 1.5,
    ease: 'expo.out'
});

gsap.from(".about-content > *", {
    scrollTrigger: {
        trigger: ".about-content",
        start: "top 75%",
    },
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 1,
    ease: 'expo.out'
});

// --- SKILLS PROGRESS BARS ---
document.querySelectorAll('.progress').forEach(progress => {
    const width = progress.getAttribute('data-width');
    gsap.to(progress, {
        scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 80%",
        },
        width: width,
        duration: 2,
        ease: 'expo.out'
    });
});

// --- PROJECT CARDS PERSPECTIVE SHIFT ---
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - y) / 20;
        const rotateY = (x - centerX) / 20;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// --- STATS COUNT-UP ---
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    gsap.to(stat, {
        scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 85%",
        },
        textContent: target,
        duration: 2.5,
        snap: { textContent: 1 },
        ease: 'expo.inOut'
    });
});

// --- TIMELINE ANIMATION ---
document.querySelectorAll('.timeline-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
        },
        opacity: 0,
        x: i % 2 === 0 ? -50 : 50,
        duration: 1.2,
        ease: 'expo.out'
    });
});

// --- PROJECT FILTERING ---
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                gsap.to(card, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    display: 'block',
                    ease: 'expo.out'
                });
            } else {
                gsap.to(card, {
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.6,
                    display: 'none',
                    ease: 'expo.out'
                });
            }
        });
    });
});

// --- CONTACT FORM SUBMISSION ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button');
        const originalContent = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span>EXECUTING...</span>';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = '<span>SUCCESS!</span> <i data-lucide="check"></i>';
            submitBtn.style.background = '#10b981';
            initIcons();

            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#8b5cf6', '#ec4899', '#06b6d4']
            });

            contactForm.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                initIcons();
            }, 3000);
        }, 2000);
    });
}

// --- SMOOTH SCROLL FOR NAV LINKS ---
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            gsap.to(window, {
                scrollTo: {
                    y: target,
                    offsetY: 100
                },
                duration: 1.5,
                ease: 'expo.inOut'
            });
        }
    });
});

// --- BACK TO TOP ---
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        gsap.to(window, {
            scrollTo: 0,
            duration: 1.5,
            ease: 'expo.inOut'
        });
    });

    // Hide/Show on scroll
    gsap.set(backToTop, { opacity: 0, y: 20, pointerEvents: 'none' });

    ScrollTrigger.create({
        start: 'top -500',
        onEnter: () => gsap.to(backToTop, { opacity: 1, y: 0, pointerEvents: 'all', duration: 0.4 }),
        onLeaveBack: () => gsap.to(backToTop, { opacity: 0, y: 20, pointerEvents: 'none', duration: 0.4 })
    });
}

// --- ACTIVE LINK ON SCROLL ---
window.addEventListener('scroll', () => {
    let current = "";
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});
