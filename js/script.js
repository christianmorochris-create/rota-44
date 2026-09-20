// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.site-nav');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.site-nav ul li a');
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

    // GSAP and Three.js integration
    // Check for reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If reduced motion is enabled, we skip all animations
    if (reducedMotion) {
        return;
    }

    // GSAP registration
    gsap.registerPlugin(ScrollTrigger);

    // Hero parallax effect (only if hero-background exists)
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        gsap.to(heroBackground, {
            backgroundPositionY: '80%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // Reveal sections on scroll with premium staggered animation
    const sectionsToReveal = document.querySelectorAll('.sobre, .servicos, .gallery, .social-proof, .localizacao, .cta');
    sectionsToReveal.forEach((section, index) => {
        gsap.from(section, {
            opacity: 0,
            y: 80,
            duration: 1.2,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                end: 'top 60%',
                scrub: false,
                once: true
            }
        });
    });

    // Microinteractions for service items with premium feel
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                scale: 1.03,
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
                duration: 0.4,
                ease: 'power3.out'
            });
            gsap.to(item.querySelector('.service-image img'), {
                scale: 1.05,
                duration: 0.6,
                ease: 'power3.out'
            });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                duration: 0.4,
                ease: 'power3.in'
            });
            gsap.to(item.querySelector('.service-image img'), {
                scale: 1,
                duration: 0.6,
                ease: 'power3.in'
            });
        });
    });

    // Microinteractions for gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                scale: 1.02,
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
                duration: 0.3,
                ease: 'power2.out'
            });
            gsap.to(item.querySelector('img'), {
                scale: 1.03,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                duration: 0.3,
                ease: 'power2.in'
            });
            gsap.to(item.querySelector('img'), {
                scale: 1,
                duration: 0.5,
                ease: 'power2.in'
            });
        });
    });

    // Microinteractions for CTA buttons with premium glow
    const ctaButtons = document.querySelectorAll('.btn-cta');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.04,
                boxShadow: '0 8px 25px rgba(255, 107, 53, 0.5)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
                duration: 0.3,
                ease: 'power2.in'
            });
        });
    });

    // Three.js scene for hero - Enhanced with automotive element
    const threeContainer = document.getElementById('three-container');
    if (threeContainer) {
        // Initialize Three.js scene
        const scene = new THREE.Scene();
        scene.background = null; // Transparent background

        const camera = new THREE.PerspectiveCamera(45, threeContainer.clientWidth / threeContainer.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(threeContainer.clientWidth, threeContainer.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit for performance
        threeContainer.appendChild(renderer.domElement);

        // Create a stylized car wheel/rim design
        const wheelGroup = new THREE.Group();
        scene.add(wheelGroup);

        // Outer rim
        const rimGeometry = new THREE.TorusGeometry(1.2, 0.15, 16, 100);
        const rimMaterial = new THREE.MeshStandardMaterial({
            color: 0xff6b35,
            metalness: 0.8,
            roughness: 0.2
        });
        const outerRim = new THREE.Mesh(rimGeometry, rimMaterial);
        outerRim.rotation.x = Math.PI / 2;
        wheelGroup.add(outerRim);

        // Inner rim
        const innerRimGeometry = new THREE.TorusGeometry(0.8, 0.1, 12, 80);
        const innerRimMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            metalness: 0.9,
            roughness: 0.1
        });
        const innerRim = new THREE.Mesh(innerRimGeometry, innerRimMaterial);
        innerRim.rotation.x = Math.PI / 2;
        wheelGroup.add(innerRim);

        // Wheel spokes (5 premium spokes)
        const spokeCount = 5;
        for (let i = 0; i < spokeCount; i++) {
            const spokeGeometry = new THREE.BoxGeometry(0.02, 0.6, 0.1);
            const spokeMaterial = new THREE.MeshStandardMaterial({
                color: 0xff6b35,
                metalness: 0.7,
                roughness: 0.3
            });
            const spoke = new THREE.Mesh(spokeGeometry, spokeMaterial);

            const angle = (i / spokeCount) * Math.PI * 2;
            spoke.position.x = Math.cos(angle) * 0.5;
            spoke.position.y = Math.sin(angle) * 0.5;
            spoke.rotation.z = angle;
            spoke.rotation.x = Math.PI / 2;

            wheelGroup.add(spoke);
        }

        // Center hub
        const hubGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.05, 16);
        const hubMaterial = new THREE.MeshStandardMaterial({
            color: 0xff6b35,
            metalness: 0.8,
            roughness: 0.2
        });
        const hub = new THREE.Mesh(hubGeometry, hubMaterial);
        hub.rotation.z = Math.PI / 2;
        wheelGroup.add(hub);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // Add a subtle rim light
        const rimLight = new THREE.DirectionalLight(0xff6b35, 0.8);
        rimLight.position.set(-3, -3, 2);
        scene.add(rimLight);

        // Set camera position
        camera.position.z = 3.5;
        camera.position.y = 0.2;

        // Animation loop with premium slow rotation
        function animate() {
            requestAnimationFrame(animate);

            // Slow, luxurious rotation
            wheelGroup.rotation.y += 0.002;
            wheelGroup.rotation.z += 0.001;

            // Subtle breathing effect
            const time = Date.now() * 0.001;
            wheelGroup.scale.set(
                1 + Math.sin(time) * 0.02,
                1 + Math.sin(time) * 0.02,
                1 + Math.sin(time) * 0.02
            );

            renderer.render(scene, camera);
        }
        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            const width = threeContainer.clientWidth;
            const height = threeContainer.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });
    }

    // Add subtle hover effects to logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            gsap.to('.logo-icon', {
                scale: 1.2,
                rotation: 15,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
        logo.addEventListener('mouseleave', () => {
            gsap.to('.logo-icon', {
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    }

    // Add parallax effect to service images on scroll
    const serviceImages = document.querySelectorAll('.service-image img');
    serviceImages.forEach(img => {
        gsap.to(img, {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
                trigger: img,
                start: 'top bottom+=100',
                end: 'bottom top-=100',
                scrub: true
            }
        });
    });

    // Add entrance animation for service details
    gsap.utils.toArray('.service-details').forEach(details => {
        gsap.from(details, {
            opacity: 0,
            x: -30,
            duration: 0.8,
            scrollTrigger: {
                trigger: details,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
});