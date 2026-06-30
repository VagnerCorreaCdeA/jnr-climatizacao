// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-active');
        navLinks.classList.toggle('active');
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-active');
        navLinks.classList.remove('active');
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Configuração de E-mail Dinâmico
const companyEmail = "vagnercorreafdealmeida@gmail.com";

function populateEmail() {
    // Insere o e-mail como texto
    document.querySelectorAll(".company-email").forEach(el => {
        el.textContent = companyEmail;
    });

    // Define o href para links de e-mail e insere o texto
    document.querySelectorAll(".company-email-link").forEach(el => {
        el.href = `mailto:${companyEmail}`;
        el.textContent = companyEmail;
    });

    // Adiciona o e-mail como placeholder de inputs
    document.querySelectorAll(".company-email-placeholder").forEach(el => {
        el.placeholder = companyEmail;
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", populateEmail);
} else {
    populateEmail();
}
