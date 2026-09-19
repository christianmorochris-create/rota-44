// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });

    // Form submission for WhatsApp
    const orcamentoForm = document.getElementById('orcamento-form');
    if (orcamentoForm) {
        orcamentoForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const nome = document.getElementById('nome').value.trim();
            const veiculo = document.getElementById('veiculo').value.trim();
            const servico = document.getElementById('servico').value;
            const mensagem = document.getElementById('mensagem').value.trim();

            // Build WhatsApp message
            let whatsappMessage = `Olá! Gostaria de conhecer os serviços da Rota 44 e solicitar um orçamento.`;

            if (nome) {
                whatsappMessage += `%0a%0aNome: ${encodeURIComponent(nome)}`;
            }
            if (veiculo) {
                whatsappMessage += `%0aVeículo: ${encodeURIComponent(veiculo)}`;
            }
            if (servico) {
                whatsappMessage += `%0aServiço de interesse: ${encodeURIComponent(servico)}`;
            }
            if (mensagem) {
                whatsappMessage += `%0aMensagem: ${encodeURIComponent(mensagem)}`;
            }

            // WhatsApp URL
            const whatsappURL = `https://wa.me/5544991585602?text=${whatsappMessage}`;

            // Open WhatsApp
            window.open(whatsappURL, '_blank');

            // Reset form (optional)
            orcamentoForm.reset();
        });
    }

    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Add fade-in animation to elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Add placeholder text to gallery images
    const placeholderImages = document.querySelectorAll('.placeholder-image');
    placeholderImages.forEach((img, index) => {
        img.setAttribute('data-text', `Trabalho ${index + 1}`);
    });
});