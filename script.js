// Always reset scroll position on refresh
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

//Pre-Loader
window.addEventListener("load", function () {
    const loader = document.getElementById("loader-wrapper");
    const mainContent = document.getElementById("mainContent");
    const pageContent = document.getElementById("page-wrapper");
    loader.classList.add("loader-fade");
    setTimeout(() => {
        loader.style.display = "none";
        mainContent.style.opacity = "1";
        pageContent.style.opacity = "1";

    }, 600);
});

// THEME TOGGLE
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
function setThemeIcon(dark) { themeIcon.className = dark ? 'fas fa-sun' : 'fas fa-moon'; }
function applyTheme(dark) {
    document.body.classList.toggle('dark-theme', dark);
    setThemeIcon(dark);
}
// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme) { applyTheme(savedTheme === 'dark'); } else { applyTheme(prefersDark); }
themeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-theme');
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// DropDown functionality
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function (e) {
        const dropdown = this.parentElement;
        const content = dropdown.querySelector('.dropdown-content');

        // Close any open dropdowns
        document.querySelectorAll('.dropdown-content').forEach(drop => {
            if (drop !== content) drop.style.display = 'none';
        });

        // Toggle current
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
        e.stopPropagation();
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-content').forEach(drop => {
        drop.style.display = 'none';
    });
});

// NAVIGATION FUNCTIONALITY
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
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
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// SMOOTH SCROLLING
const Links = document.querySelectorAll('.nav-link');
Links.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Only handle internal links like #about, #skills, etc.
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        }
    });
});

// Projects View All
const viewAllBtn = document.getElementById("viewAllBtn");
const toggleText = document.getElementById("toggleText");
const hiddenCards = document.querySelectorAll(".project-card.extra");
let isAnimating = false;

viewAllBtn.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;

    const expanded = toggleText.getAttribute("data-expanded") === "true";

    if (!expanded) {
        // Show hidden projects
        hiddenCards.forEach((card, i) => {
            setTimeout(() => card.classList.remove("hidden"), i * 100);
        });
        toggleText.textContent = "Hide";
        toggleText.setAttribute("data-expanded", "true");
    } else {
        // Hide projects
        [...hiddenCards].reverse().forEach((card, i) => {
            setTimeout(() => card.classList.add("hidden"), i * 100);
        });
        toggleText.textContent = "View All";
        toggleText.setAttribute("data-expanded", "false");
    }

    setTimeout(() => {
        isAnimating = false;
    }, hiddenCards.length * 100 + 400);
});



// SCROLL TO TOP BUTTON
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) scrollTopBtn.classList.add('visible');
    else scrollTopBtn.classList.remove('visible');
});
scrollTopBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });

// TYPING ANIMATION (HERO TITLE)
function typeWriter(element, text, speed = 100) {
    let i = 0; element.innerHTML = '';
    function type() { if (i < text.length) { element.innerHTML += text.charAt(i); i++; setTimeout(type, speed); } }
    type();
}
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => { typeWriter(heroTitle, originalText, 50); }, 500);
    }
});

// ACTIVE NAVIGATION HIGHLIGHTING
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) correspondingLink.classList.add('active');
        }
    });
});

// PARALLAX EFFECT FOR HERO SECTION
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    if (hero) hero.style.transform = `translateY(${rate}px)`;
});

// DYNAMIC YEAR IN FOOTER
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer p');
if (footerYear) footerYear.innerHTML = `&copy; ${currentYear} Deepak Patidar. All rights reserved.`;

// PERFORMANCE OPTIMIZATION
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => { clearTimeout(timeout); func(...args); };
        clearTimeout(timeout); timeout = setTimeout(later, wait);
    };
}
const debouncedScroll = debounce(() => { }, 10);
window.addEventListener('scroll', debouncedScroll);

// HERO FLIP EFFECT
const heroFlipCard = document.getElementById('heroFlipCard');
if (heroFlipCard) {
    // Allow touch flip for mobile devices
    let isFlipped = false;
    heroFlipCard.addEventListener('click', function (e) {
        // Only trigger on tap for small screens
        if (window.innerWidth < 900) {
            isFlipped = !isFlipped;
            if (isFlipped) heroFlipCard.classList.add('flipped');
            else heroFlipCard.classList.remove('flipped');
        }
    });
}

// AOS for scroll animations
AOS.init({
    duration: 1000,
    once: true,
    mirror: false
});

//Hero Designation title
document.addEventListener("DOMContentLoaded", function () {
    var typed = new Typed("#hero-typed", {
        strings: [
            "",
            "Full Stack Java Developer",
            "Backend Developer",
            "Problem Solver"
        ],
        typeSpeed: 30,
        backSpeed: 30,
        loop: true,
        cursorChar: " |"
    });
});

// CONSOLE WELCOME MESSAGE
console.log(`
        🚀 Welcome to Deepak Patidar's Portfolio!
        Thanks for checking out the code!
        Feel free to reach out if you have any questions.
        Email: deepupatidar1999@gmail.com
        LinkedIn: https://www.linkedin.com/in/deepak-patidar-545352194
        `);

//CONTACT Form Handling
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const modal = document.getElementById("form-alert");
    const modalText = document.getElementById("alertText");
    const closeModal = document.getElementById("closeModal");
    const modalBox = document.getElementById("modalMessage");
    const icon = document.getElementById("alertIcon");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = form.querySelector("#name").value.trim();
        const email = form.querySelector("#email").value.trim();
        const message = form.querySelector("#message").value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !message) {
            showModal("Please fill all required fields.", false);
            return;
        }

        if (!emailPattern.test(email)) {
            showModal("Please enter a valid email address.", false);
            return;
        }

        const formData = new FormData(form);

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        })
            .then((res) => {
                if (res.ok) {
                    showModal("Message sent successfully!", true);
                    form.reset();
                } else {
                    showModal("Message sending failed. Try again.", false);
                    form.reset();
                }
            })
            .catch(() => {
                showModal("An error occurred. Try again later.", false);
                form.reset();
            });
    });

    function showModal(message, success = true) {
        modal.classList.remove("hidden");
        modalBox.classList.remove("success", "error");
        modalBox.classList.add(success ? "success" : "error");

        icon.innerHTML = success
            ? '<i class="fas fa-check-circle"></i>'
            : '<i class="fas fa-times-circle"></i>';

        // Append fallback info on error
        modalText.textContent = message;

        // Show/hide fallback contact message
        const fallback = document.getElementById("fallbackMessage");
        fallback.style.display = success ? "none" : "block";

        // Re-animate icon
        icon.classList.remove("alert-icon");
        void icon.offsetWidth;
        icon.classList.add("alert-icon");

        closeModal.onclick = function () {
            modal.classList.add("hidden");
        };
    }
});