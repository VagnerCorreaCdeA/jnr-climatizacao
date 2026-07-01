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

// Formulário de Contato (Web3Forms AJAX)
const contactForm = document.getElementById('contact-form');
const formResult = document.getElementById('form-result');

if (contactForm && formResult) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = "Enviando...";
        
        formResult.style.display = "block";
        formResult.style.color = "var(--color-primary)";
        formResult.textContent = "Processando sua solicitação...";

        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let jsonRes = await response.json();
            if (response.status == 200) {
                formResult.style.color = "#28a745"; // Verde de sucesso
                formResult.innerHTML = '<i class="fa-solid fa-circle-check"></i> Mensagem enviada com sucesso! Retornaremos em breve.';
                contactForm.reset();
            } else {
                console.error(jsonRes);
                formResult.style.color = "#dc3545"; // Vermelho de erro
                formResult.textContent = jsonRes.message || "Ocorreu um erro ao enviar. Tente novamente.";
            }
        })
        .catch(error => {
            console.error(error);
            formResult.style.color = "#dc3545";
            formResult.textContent = "Erro de conexão. Verifique sua internet e tente novamente.";
        })
        .then(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            setTimeout(() => {
                formResult.style.display = "none";
            }, 6000);
        });
    });
}
