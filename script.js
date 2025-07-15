document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Cerrar el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    });

    // Carrusel para la sección Nuestro Orgullo
    const slides = document.querySelectorAll('.orgullo-slide');
    const leftArrow = document.querySelector('.orgullo-arrow.left');
    const rightArrow = document.querySelector('.orgullo-arrow.right');
    let currentSlide = 0;

    function renderOrgulloIndicadores() {
        slides.forEach((slide, idx) => {
            const indicador = slide.querySelector('.orgullo-indicadores');
            if (!indicador) return;
            indicador.innerHTML = '';
            if (idx === currentSlide) {
                slides.forEach((_, i) => {
                    const dot = document.createElement('span');
                    dot.className = 'orgullo-dot' + (i === currentSlide ? ' active' : '');
                    dot.addEventListener('click', () => {
                        currentSlide = i;
                        showSlide(currentSlide);
                    });
                    indicador.appendChild(dot);
                });
                indicador.style.display = 'flex';
            } else {
                indicador.style.display = 'none';
            }
        });

    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        renderOrgulloIndicadores();
    }

    if (leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });

        rightArrow.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        // Inicializar
        showSlide(currentSlide);
    }

    // Carrusel de opiniones
    const opinionSlides = document.querySelectorAll('.opiniones-slide');
    const opinionLeft = document.querySelector('.opiniones-arrow.left');
    const opinionRight = document.querySelector('.opiniones-arrow.right');
    let opinionIndex = 0;
    let opinionInterval;

    function showOpinion(index) {
        opinionSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextOpinion() {
        opinionIndex = (opinionIndex + 1) % opinionSlides.length;
        showOpinion(opinionIndex);
    }

    function prevOpinion() {
        opinionIndex = (opinionIndex - 1 + opinionSlides.length) % opinionSlides.length;
        showOpinion(opinionIndex);
    }

    if (opinionLeft && opinionRight) {
        opinionLeft.addEventListener('click', () => {
            prevOpinion();
            resetOpinionInterval();
        });

        opinionRight.addEventListener('click', () => {
            nextOpinion();
            resetOpinionInterval();
        });

        function startOpinionInterval() {
            opinionInterval = setInterval(nextOpinion, 5000); // Cambia cada 5 segundos
        }

        function resetOpinionInterval() {
            clearInterval(opinionInterval);
            startOpinionInterval();
        }

        // Inicializar
        showOpinion(opinionIndex);
        startOpinionInterval();
    }

    // Valores acordeón autocerrable
    const valorMenus = document.querySelectorAll('.valor-menu');
    valorMenus.forEach(menu => {
        menu.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                this.classList.remove('active'); // Cierra si ya está abierto
            } else {
                valorMenus.forEach(m => m.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    // Abrir el primero por defecto
    if (valorMenus.length) {
        valorMenus[0].classList.add('active');
    }

    // Efecto de aparición al hacer scroll
    const valorCards = document.querySelectorAll('.valor-card');
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    valorCards.forEach(card => {
        observer.observe(card);
        // Resetear la opacidad para que funcione la animación
        card.style.opacity = 0;
    });
    
    // Efecto hover para dispositivos táctiles
    valorCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.add('hover-effect');
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('hover-effect');
            }, 300);
        });
    });

     // Selecciona todos los títulos principales
        const titles = document.querySelectorAll(
        '.about-title, .proyectos-title, .servicios-title, .misionvision-title, .mision-title, .vision-title, .aliados-title, .oficinas-title, .opiniones-title, .contacto-title');
    titles.forEach(title => {
        title.classList.remove('animate-zoom');
        title.style.opacity = "0";
        title.style.transform = "scale(0.96)";
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    title.classList.add('animate-zoom');
                } else {
                    title.classList.remove('animate-zoom');
                    title.style.opacity = "0";
                    title.style.transform = "scale(0.96)";
                }
            });
        }, { threshold: 0.5 });
        observer.observe(title);
    });

    // Animación para todos los párrafos principales (fadeInUp al entrar/salir)
    const paragraphs = document.querySelectorAll(
        '.about-paragraph, .card-paragraph, .proyectos-paragraph, .proyectos-paragraph-two, .aliados-paragraph, .misionvision-paragraph, .contacto-paragraph'
    );
    paragraphs.forEach(paragraph => {
        paragraph.classList.remove('animate-paragraph-zoom');
        paragraph.style.opacity = "0";
        paragraph.style.transform = "translateY(60px)";
        const observerParagraph = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    paragraph.classList.add('animate-paragraph-zoom');
                } else {
                    paragraph.classList.remove('animate-paragraph-zoom');
                    paragraph.style.opacity = "0";
                    paragraph.style.transform = "translateY(60px)";
                }
            });
        }, { threshold: 0.5 });
        observerParagraph.observe(paragraph);
    });

    const aboutImage = document.querySelector('.about-image img');
if (aboutImage) {
    aboutImage.classList.remove('animate-image-fadeInRight');
    aboutImage.style.opacity = "0";
    aboutImage.style.transform = "translateX(60px)";
    const observerImage = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutImage.classList.add('animate-image-fadeInRight');
            } else {
                aboutImage.classList.remove('animate-image-fadeInRight');
                aboutImage.style.opacity = "0";
                aboutImage.style.transform = "translateX(60px)";
            }
        });
    }, { threshold: 0.5 });
    observerImage.observe(aboutImage);
}

const sectionVideoFile = document.querySelector('.section-video-file');
if (sectionVideoFile) {
    sectionVideoFile.classList.remove('animate-video-fadeInLeft');
    sectionVideoFile.style.opacity = "0";
    sectionVideoFile.style.transform = "translateX(-60px)";
    const observerVideo = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sectionVideoFile.classList.add('animate-video-fadeInLeft');
            } else {
                sectionVideoFile.classList.remove('animate-video-fadeInLeft');
                sectionVideoFile.style.opacity = "0";
                sectionVideoFile.style.transform = "translateX(-60px)";
            }
        });
    }, { threshold: 0.5 });
    observerVideo.observe(sectionVideoFile);
}
const proyectosCards = document.querySelectorAll('.proyectos-cards-container .card');
proyectosCards.forEach(card => {
    card.classList.remove('animate-paragraph-zoom');
    card.style.opacity = "0";
    card.style.transform = "translateY(60px)";
    const observerCard = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                card.classList.add('animate-paragraph-zoom');
            } else {
                card.classList.remove('animate-paragraph-zoom');
                card.style.opacity = "0";
                card.style.transform = "translateY(60px)";
            }
        });
    }, { threshold: 0.5 });
    observerCard.observe(card);
});

const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    heroContent.classList.remove('animate-hero-fadeInUp');
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(60px)";
    const observerHero = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroContent.classList.add('animate-hero-fadeInUp');
            } else {
                heroContent.classList.remove('animate-hero-fadeInUp');
                heroContent.style.opacity = "0";
                heroContent.style.transform = "translateY(60px)";
            }
        });
    }, { threshold: 0.5 });
    observerHero.observe(heroContent);
}

});


