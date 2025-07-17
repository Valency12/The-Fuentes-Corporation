document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const closeSidebar = document.getElementById('closeSidebar');

    // Alternar sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('show');
        sidebarOverlay.classList.toggle('show');

        // Cambiar icono de hamburguesa a X
        const isOpen = sidebar.classList.contains('show');
        if (isOpen) {
            sidebarToggle.innerHTML = '&times;';
            sidebarToggle.style.fontSize = '1.5rem';
            sidebarToggle.style.lineHeight = '1';
        } else {
            sidebarToggle.innerHTML = '<span class="navbar-toggler-icon"></span>';
        }
    }

    // Event listeners
    sidebarToggle.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);

    // Cerrar sidebar al hacer clic en un enlace (opcional)
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', toggleSidebar);
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
        menu.addEventListener('click', function () {
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

    const observer = new IntersectionObserver(function (entries, observer) {
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
        card.addEventListener('touchstart', function () {
            this.classList.add('hover-effect');
        });

        card.addEventListener('touchend', function () {
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

    // Datos de los proyectos (podrías obtenerlos de una API en un caso real)
    const projectsData = {
        1: {
            Imagenes: [
                'Imagenes/nuevaForesta/img1.jpeg',
                'Imagenes/nuevaForesta/img2.jpeg',
                'Imagenes/nuevaForesta/img3.jpeg',
                'Imagenes/nuevaForesta/img4.jpeg',
                'Imagenes/nuevaForesta/img5.jpeg',
                'Imagenes/nuevaForesta/img6.jpeg'
            ],
            description: 'Explora las épicas travesías de Luffy y su tripulación en busca del tesoro más grande del mundo, el One Piece. Sumérgete en un mundo de piratas, batallas y amistades inolvidables.'
        },
        2: {
            Imagenes: [
                'Imagenes/onepiece1.jpeg',
                'Imagenes/onepiece2.jpeg',
                'Imagenes/onepiece3.jpeg'
            ],
            description: 'Una aplicación móvil revolucionaria que cambia la forma en que interactúas con la tecnología. Diseño intuitivo y funcionalidades avanzadas.'
        },
        3: {
            Imagenes: [
                'Imagenes/nose/img1.jpeg',
                'Imagenes/nose/img2.jpeg',
                'Imagenes/nose/img3.jpeg',
                'Imagenes/nose/img4.jpeg',
                'Imagenes/nose/img5.jpeg',
                'Imagenes/nose/img6.jpeg'
            ],
            description: 'Un proyecto de construcción de carreteras que conecta comunidades y mejora el acceso a servicios esenciales.'
        },
        4: {
            Imagenes: [
                'Imagenes/cactus/img1.jpeg',
                'Imagenes/cactus/img2.jpeg',
                'Imagenes/cactus/img3.jpeg',
                'Imagenes/cactus/img4.jpeg',
                'Imagenes/cactus/img5.jpeg',
                'Imagenes/cactus/img7.jpeg'
            ],
            description: 'Un proyecto innovador para la construcción de vías públicas, mejorando la infraestructura urbana y la movilidad en las ciudades.'
        },
        6: {
            Imagenes: [
                'Imagenes/matiasRomero/img1.jpg',
                'Imagenes/matiasRomero/img2.jpeg',
                'Imagenes/matiasRomero/img3.jpeg',
                'Imagenes/matiasRomero/img4.jpeg',
                'Imagenes/matiasRomero/img5.jpeg',
                'Imagenes/matiasRomero/img6.jpeg'
            ],
            description: 'Un proyecto de construcción de carreteras que conecta comunidades y mejora el acceso a servicios esenciales.'
        },
        9: {
            Imagenes: [
                'Imagenes/lasFlores/img1.jpeg',
                'Imagenes/lasFlores/img2.jpeg',
                'Imagenes/lasFlores/img3.jpeg',
                'Imagenes/lasFlores/img4.jpeg',
                'Imagenes/lasFlores/img5.jpeg'
            ]
        }
    };

    // Seleccionar todos los botones de vista
    const viewButtons = document.querySelectorAll('.view-btn');

    // Configurar el modal de Bootstrap
    const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    const modalTitle = document.getElementById('projectModalLabel');
    const modalProjectTitle = document.getElementById('modalProjectTitle');
    const modalProjectSubtitle = document.getElementById('modalProjectSubtitle');
    const modalProjectDescription = document.getElementById('modalProjectDescription');
    const carouselInner = document.querySelector('#projectCarousel .carousel-inner');
    const carouselIndicators = document.querySelector('#projectCarousel .carousel-indicators');

    // Añadir evento click a cada botón
    viewButtons.forEach(button => {
        button.addEventListener('click', function () {
            const projectId = this.getAttribute('data-project');
            const projectTitle = this.getAttribute('data-title');
            const projectSubtitle = this.getAttribute('data-subtitle');

            // Actualizar la información del modal
            modalTitle.textContent = projectTitle;
            modalProjectTitle.textContent = projectTitle;
            modalProjectSubtitle.textContent = projectSubtitle;

            // Cargar las imágenes del proyecto seleccionado
            loadProjectImagenes(projectId);

            // Mostrar el modal
            projectModal.show();
        });
    });

    // Función para cargar las imágenes del proyecto
    function loadProjectImagenes(projectId) {
        // Limpiar carrusel existente
        carouselInner.innerHTML = '';
        carouselIndicators.innerHTML = '';

        const project = projectsData[projectId];

        if (!project) return;

        // Actualizar descripción
        modalProjectDescription.textContent = project.description;

        // Añadir imágenes al carrusel
        project.Imagenes.forEach((image, index) => {
            // Crear item del carrusel
            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;

            const img = document.createElement('img');
            img.src = image;
            img.className = 'd-block w-100';
            img.alt = `Imagen ${index + 1} del proyecto`;

            carouselItem.appendChild(img);
            carouselInner.appendChild(carouselItem);

            // Crear indicador
            const indicator = document.createElement('button');
            indicator.type = 'button';
            indicator.setAttribute('data-bs-target', '#projectCarousel');
            indicator.setAttribute('data-bs-slide-to', index);
            indicator.className = index === 0 ? 'active' : '';
            indicator.setAttribute('aria-label', `Slide ${index + 1}`);

            carouselIndicators.appendChild(indicator);
        });

        // Reiniciar el carrusel para asegurar que funcione correctamente
        const carousel = new bootstrap.Carousel(document.getElementById('projectCarousel'));
    }

    // Datos del chatbot
        const categorias = {
            "ubicacion": {
                nombre: "Ubicación",
                preguntas: [
                    { texto: "¿Dónde se encuentran ubicados?", clave: "ubicacion", tipo: "texto" },
                    { texto: "¿Tienen sucursales en otras ciudades?", clave: "sucursales", tipo: "booleano" },
                    { texto: "¿En qué zonas trabajan?", clave: "zonas", tipo: "texto" }
                ]
            },
            "experiencia": {
                nombre: "Experiencia",
                preguntas: [
                    { texto: "¿Cuántos años de experiencia tiene la empresa?", clave: "experiencia", tipo: "numero" },
                    { texto: "¿Cuántos empleados tiene la empresa?", clave: "empleados", tipo: "numero" },
                    { texto: "¿Pueden compartir referencias de clientes anteriores?", clave: "referencias", tipo: "booleano" }
                ]
            },
            "servicios": {
                nombre: "Servicios",
                preguntas: [
                    { texto: "¿Ofrecen servicios de construcción residencial?", clave: "residencial", tipo: "booleano" },
                    { texto: "¿Ofrecen servicios de construcción comercial?", clave: "comercial", tipo: "booleano" },
                    { texto: "¿Ofrecen servicios de remodelación?", clave: "remodelacion", tipo: "booleano" },
                    { texto: "¿Se pueden personalizar los proyectos según las necesidades del cliente?", clave: "personalizacion", tipo: "booleano" },
                    { texto: "¿Qué tipo de proyectos han realizado anteriormente?", clave: "proyectos", tipo: "texto" },
                    { texto: "¿Cuáles son los principales materiales que utilizan?", clave: "materiales", tipo: "texto" }
                ]
            },
            "contacto": {
                nombre: "Contacto",
                preguntas: [
                    { texto: "¿Cuál es el horario de atención?", clave: "horario", tipo: "texto" },
                    { texto: "¿Cómo puedo contactar con ustedes?", clave: "contacto", tipo: "texto" },
                    { texto: "¿Ofrecen atención post-venta o mantenimiento?", clave: "postventa", tipo: "booleano" }
                ]
            },
            "horarios": {
                nombre: "Horarios",
                preguntas: [
                    { texto: "¿Cuál es el tiempo estimado de entrega de una obra?", clave: "tiempo_entrega", tipo: "texto" },
                    { texto: "¿Trabajan fines de semana o días festivos?", clave: "dias_especiales", tipo: "booleano" }
                ]
            },
            "permisos": {
                nombre: "Certificaciones",
                preguntas: [
                    { texto: "¿Tienen certificaciones o licencias?", clave: "certificaciones", tipo: "booleano" },
                    { texto: "¿Ofrecen garantía en sus trabajos?", clave: "garantia", tipo: "booleano" },
                    { texto: "¿Cumplen con las normativas de seguridad y medio ambiente?", clave: "seguridad", tipo: "booleano" }
                ]
            },
            "costos": {
                nombre: "Costos",
                preguntas: [
                    { texto: "¿Cuál es el proceso para solicitar un presupuesto?", clave: "presupuesto", tipo: "texto" },
                    { texto: "¿Aceptan pagos en cuotas?", clave: "cuotas", tipo: "booleano" },
                    { texto: "¿Cuáles son los métodos de pago disponibles?", clave: "metodos_pago", tipo: "texto" },
                    { texto: "¿El presupuesto incluye todos los materiales y mano de obra?", clave: "incluye_todo", tipo: "booleano" }
                ]
            },
            "sostenibilidad": {
                nombre: "Sostenibilidad",
                preguntas: [
                    { texto: "¿Utilizan materiales sostenibles o ecológicos?", clave: "materiales_ecologicos", tipo: "booleano" },
                    { texto: "¿Tienen políticas de responsabilidad ambiental?", clave: "responsabilidad_ambiental", tipo: "booleano" }
                ]
            }
        };

        // Variables de estado
        let currentCategory = null;
        let currentQuestion = null;
        const respuestas = {};

        // Elementos del DOM
        const chatIcon = document.getElementById('chat-icon');
        const chatContainer = document.getElementById('chat-container');
        const chatMessages = document.getElementById('chat-messages');
        const userInput = document.getElementById('user-input');
        const sendBtn = document.getElementById('send-btn');
        const minimizeBtn = document.getElementById('minimize-btn');

        // Mostrar mensaje del bot
        function addBotMessage(text, isQuestion = false) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'bot-message');
            messageDiv.innerHTML = text;
            chatMessages.appendChild(messageDiv);
            if (isQuestion) {
                userInput.focus();
            }
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Mostrar mensaje del usuario
        function addUserMessage(text) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'user-message');
            messageDiv.textContent = text;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Mostrar opciones de categorías principales
        function showMainOptions() {
            const optionsContainer = document.createElement('div');
            optionsContainer.classList.add('options-container');

            // Agregar botones para cada categoría
            Object.keys(categorias).forEach(key => {
                const btn = document.createElement('button');
                btn.classList.add('option-btn');
                btn.textContent = categorias[key].nombre;
                btn.addEventListener('click', () => {
                    selectCategory(key);
                });
                optionsContainer.appendChild(btn);
            });

            // Botón de salir
            const exitBtn = document.createElement('button');
            exitBtn.classList.add('option-btn');
            exitBtn.textContent = "Salir";
            exitBtn.addEventListener('click', () => {
                addBotMessage("¡Gracias por usar nuestro servicio! Hasta luego.");
                setTimeout(() => toggleChat(), 2000);
            });
            optionsContainer.appendChild(exitBtn);

            chatMessages.appendChild(optionsContainer);
            chatMessages.scrollTop = 0;

            userInput.disabled = true; // bloquea el input hasta que se seleccione una categoría

        }

        // Mostrar preguntas de una categoría específica
        // Esta función muestra las preguntas de una categoría específica
        function showCategoryQuestions(categoryKey) {
            const category = categorias[categoryKey];
            const questions = category.preguntas;

            const optionsContainer = document.createElement('div');
            optionsContainer.classList.add('options-container');

            // Agregar todas las preguntas de la categoría con número
            questions.forEach((question, idx) => {
                const btn = document.createElement('button');
                btn.classList.add('option-btn');
                btn.textContent = `${idx + 1}. ${question.texto}`;

                btn.addEventListener('click', () => {
                    selectQuestion(question); // Al hacer clic, selecciona la pregunta
                });
                optionsContainer.appendChild(btn);
            })

            userInput.disabled = true; // Bloquea el input
            ;

            // Agregar la opción "Otra pregunta"
            const otraBtn = document.createElement('button');
            otraBtn.classList.add('option-btn');
            otraBtn.textContent = `${questions.length + 1}. Otra pregunta`;
            otraBtn.addEventListener('click', () => {
                addUserMessage("Otra pregunta");
                addBotMessage(
                    `<div style="margin-bottom:10px;">
                <strong>¡Gracias por tu interés!</strong><br>
                Nuestro equipo recibirá tu consulta y te contactará lo antes posible.<br>
                Si prefieres atención inmediata, puedes escribirnos por WhatsApp:
            </div>
            <a href="https://wa.me/521XXXXXXXXXX?text=Hola,%20tengo%20una%20consulta%20sobre%20${category.nombre}" 
            target="_blank" 
            style="display:inline-block;padding:10px 20px;background:#25D366;color:white;border-radius:20px;text-decoration:none;font-weight:bold;">
            WhatsApp
            </a>`
                );
                currentQuestion = null; // No espera respuesta

            });
            optionsContainer.appendChild(otraBtn);

            // Agregar botón de volver
            const backBtn = document.createElement('button');
            backBtn.classList.add('option-btn');
            backBtn.textContent = "Volver al menú principal";
            backBtn.addEventListener('click', showMainMenu);
            optionsContainer.appendChild(backBtn);

            // Mostrar las opciones en el chat
            chatMessages.appendChild(optionsContainer);
            chatMessages.scrollTop = 0;

        }

        // Seleccionar categoría
        function selectCategory(categoryKey) {
            currentCategory = categoryKey;
            addUserMessage(categorias[categoryKey].nombre);
            showCategoryQuestions(categoryKey);
        }

        // Seleccionar pregunta
        function selectQuestion(question) {
            currentQuestion = question;
            // Si existe respuesta fija, mostrarla y regresar al menú principal
            addUserMessage(question.texto); // Imprime la pregunta como mensaje del usuario
            chatMessages.scrollTop = chatMessages.scrollHeight; // <-- Desplaza al último mensaje
            if (respuestasFijas[question.clave]) {
                addBotMessage(respuestasFijas[question.clave].replace(/\n/g, '<br>'));
                setTimeout(() => showMainMenu(), 1500);
                userInput.disabled = true; // Bloquea el input
            } else {
                askQuestion(question); // Solo si no hay respuesta fija
            }
        }

        // Hacer pregunta
        function askQuestion(question) {
            userInput.disabled = false; // Habilita el input
            addBotMessage(question.texto, true);

            // Mostrar formato esperado si es necesario
            if (question.tipo === "booleano") {
                addBotMessage("(Por favor responde Sí o No)");
            } else if (question.tipo === "numero") {
                addBotMessage("(Por favor ingresa un número)");
            }
        }

        // Validar respuesta
        function validateAnswer(answer, type) {
            if (!answer) return false;

            if (type === "numero") {
                return !isNaN(answer);
            }
            if (type === "booleano") {
                return ["sí", "si", "no"].includes(answer.toLowerCase());
            }
            return true;
        }

        // Procesar respuesta booleana
        function processBooleanAnswer(answer) {
            const lowerAnswer = answer.toLowerCase();
            return lowerAnswer === "sí" || lowerAnswer === "si";
        }


        // Mostrar menú principal
        function showMainMenu() {
            currentCategory = null;
            currentQuestion = null;
            addBotMessage("¿En qué puedo ayudarte? Selecciona una categoría:");
            showMainOptions();
        };

        // Respuestas fijas para cada pregunta
        const respuestasFijas = {
            "ubicacion": `<strong>Nuestra sede principal</strong> se encuentra en <b>San Luis Potosí</b>.<br>
    <u>Sucursales:</u>
    <ul>
    <li><b>Ciudad de México</b></li>
    <li><b>San Salvador, El Salvador</b></li>
    <li><b>Hermosillo, Sonora</b></li>
    <li><b>Tuxtla Gutiérrez, Chiapas</b></li>
    </ul>
    <i>Para detalles y direcciones, visita la sección de contacto en nuestra página web oficial.</i>`,
            "sucursales": `<strong>Sí, contamos con sucursales en:</strong><br>
    <b>Ciudad de México</b>, <b>San Salvador (El Salvador)</b>, <b>Hermosillo (Sonora)</b> y <b>Tuxtla Gutiérrez (Chiapas)</b>.`,
            "zonas": `<strong>Operamos en diversas zonas del país</strong>, adaptándonos a la ubicación de cada proyecto.<br>
    Hemos realizado obras en localidades como <b>Cactus</b>, <b>Ahualulco</b>, <b>Acapulco</b> y <b>Matías Romero</b>.`,
            "experiencia": `Contamos con <strong>17 años de experiencia</strong> en el sector de la construcción.<br>
    <i>Nuestra filosofía es construir con calidad y confianza.</i>`,
            "empleados": `Nuestra empresa cuenta con un equipo de más de <strong>200 empleados</strong>, incluyendo <b>arquitectos</b>, <b>ingenieros</b> y <b>obreros especializados</b>.`,
            "referencias": `<strong>Sí, podemos proporcionar referencias</strong> de clientes anteriores para tu tranquilidad.`,
            "residencial": `<strong>Sí, ofrecemos servicios de construcción residencial</strong>, incluyendo <b>casas unifamiliares</b>, <b>departamentos</b> y <b>remodelaciones</b>.`,
            "comercial": `<strong>Sí, también ofrecemos servicios de construcción comercial</strong>, abarcando <b>oficinas</b>, <b>locales comerciales</b> y <b>edificios corporativos</b>.`,
            "remodelacion": `<strong>Sí, realizamos remodelaciones de todo tipo</strong>, desde <b>pequeñas reformas</b> hasta <b>grandes renovaciones</b> de espacios.`,
            "personalizacion": `<strong>Todos nuestros proyectos son personalizados</strong> según las <b>necesidades</b> y <b>preferencias</b> del cliente.`,
            "proyectos": `<strong>Hemos realizado una amplia variedad de proyectos:</strong><br>
    <ul>
    <li>Construcción de <b>viviendas unifamiliares</b></li>
    <li><b>Edificios comerciales</b> y <b>oficinas</b></li>
    <li>Remodelaciones de <b>espacios residenciales</b> y <b>comerciales</b></li>
    <li>Proyectos de <b>infraestructura pública</b></li>
    </ul>`,
            "materiales": `<strong>Utilizamos materiales de alta calidad</strong>, incluyendo:<br>
    <ul>
    <li><b>Concreto</b> y <b>acero</b> para estructuras</li>
    <li><b>Madera</b> y <b>acabados</b> para interiores</li>
    <li><b>Materiales sostenibles</b> y ecológicos cuando es posible</li>
    </ul>`,
            "horario": `<strong>Horario de atención:</strong><br>
    <b>Lunes a viernes:</b> 7:30am a 06:00pm<br>
    <b>Sábados:</b> 7:30am a 2:00pm<br>
    <i>También ofrecemos atención personalizada previa cita los fines de semana.</i>`,
            "contacto": `<strong>Puedes contactarnos a través de los siguientes medios:</strong><br>
    <b>Teléfono:</b> +52 123 456 7890<br>
    <b>Correo electrónico:</b> direccion@thefuentescorp.com.mx`,
            "postventa": `<strong>Sí, ofrecemos atención post-venta</strong> y <b>servicios de mantenimiento</b> para asegurar la satisfacción continua de nuestros clientes.`,
            "tiempo_entrega": `<strong>El tiempo estimado de entrega</strong> varía según el tipo y tamaño del proyecto.<br>
    Generalmente oscila entre <b>3 a 12 meses</b>. Para proyectos más grandes, como edificios comerciales, puede extenderse hasta <b>24 meses</b>.`,
            "dias_especiales": `<strong>Sí, trabajamos los fines de semana y días festivos</strong> según las necesidades del proyecto.<br>
    <i>Recomendamos coordinar con anticipación para asegurar la disponibilidad de nuestro equipo.</i>`,
            "certificaciones": `<strong>Sí, contamos con certificaciones y licencias</strong> necesarias para operar en el sector de la construcción.<br>
    <i>Estamos registrados ante las autoridades locales y cumplimos con todas las normativas vigentes.</i>`,
            "garantia": `<strong>Sí, ofrecemos garantía en nuestros trabajos.</strong><br>
    La duración varía según el tipo de proyecto, pero generalmente es de <b>1 a 5 años</b> dependiendo de la obra realizada.`,
            "seguridad": `<strong>Cumplimos con todas las normativas de seguridad y medio ambiente.</strong><br>
    <i>Implementamos medidas de seguridad en todos nuestros proyectos y trabajamos para minimizar el impacto ambiental.</i>`,
            "presupuesto": `<strong>Para solicitar un presupuesto</strong>, puedes contactarnos a través de nuestro sitio web o por teléfono.<br>
    <i>Necesitaremos detalles sobre el proyecto, como ubicación, tipo de construcción y especificaciones.</i><br>
    Una vez recibida la información, te proporcionaremos un presupuesto detallado en un plazo de <b>5 a 7 días hábiles</b>.`,
            "cuotas": `<strong>Sí, aceptamos pagos en cuotas.</strong><br>
    Ofrecemos <b>planes de financiamiento flexibles</b> para adaptarnos a las necesidades de nuestros clientes.<br>
    Puedes consultar las opciones de financiamiento con nuestro equipo de ventas.`,
            "metodos_pago": `<strong>Aceptamos diversos métodos de pago:</strong><br>
    <ul>
    <li>Transferencias bancarias</li>
    <li>Tarjetas de crédito y débito</li>
    <li>Efectivo</li>
    <li>Cheques</li>
    <li>Pagos en línea a través de nuestra plataforma segura</li>
    </ul>`,
            "incluye_todo": `<strong>Sí, el presupuesto incluye todos los materiales y mano de obra</strong> necesarios para completar el proyecto.<br>
    <i>Nos aseguramos de que no haya costos ocultos y que el cliente tenga claridad sobre lo que está pagando.</i>`,
            "materiales_ecologicos": `<strong>Sí, utilizamos materiales sostenibles y ecológicos</strong> siempre que es posible.<br>
    <i>Buscamos minimizar el impacto ambiental de nuestros proyectos y promover prácticas de construcción responsables.</i>`,
            "responsabilidad_ambiental": `<strong>Sí, tenemos políticas de responsabilidad ambiental</strong> que incluyen:<br>
    <ul>
    <li>Uso de materiales sostenibles</li>
    <li>Reducción de residuos en el sitio de construcción</li>
    <li>Implementación de prácticas de reciclaje</li>
    <li>Cumplimiento de normativas ambientales locales e internacionales</li>
    </ul>`
            // Puedes agregar más claves y respuestas aquí
        };

        // Manejar respuesta del usuario
        function handleUserAnswer() {
            const answer = userInput.value.trim();
            if (!answer && currentQuestion?.tipo !== "texto") return;

            addUserMessage(answer);
            userInput.value = '';

            if (currentQuestion) {
                if (validateAnswer(answer, currentQuestion.tipo)) {
                    // Procesar la respuesta según el tipo
                    let processedAnswer = answer;
                    if (currentQuestion.tipo === "booleano") {
                        processedAnswer = processBooleanAnswer(answer);
                    } else if (currentQuestion.tipo === "numero") {
                        processedAnswer = Number(answer);
                    }

                    respuestas[currentQuestion.clave] = processedAnswer;
                    addBotMessage("✓ Respuesta guardada");
                    // Mostrar respuesta fija si existe
                    if (respuestasFijas[currentQuestion.clave]) {

                        addBotMessage(respuestasFijas[currentQuestion.clave].replace(/\n/g, '<br>'));
                    }
                    setTimeout(() => showMainMenu(), 1000);
                } else {
                    addBotMessage("❌ Respuesta no válida. Por favor intenta de nuevo.");
                    askQuestion(currentQuestion);
                }
            } else {
                addBotMessage("Por favor selecciona una opción del menú.");

            }
        }

        // Alternar visibilidad del chat
        function toggleChat() {
            if (chatContainer.classList.contains('hidden')) {
                chatContainer.classList.remove('hidden');
                chatIcon.classList.add('hidden');
                // Limpiar el chat y mostrar menú principal al abrir
                chatMessages.innerHTML = '';
                addBotMessage("¡Hola! Soy Step, el asistente virtual de The Fuentes Corporation.");
                showMainMenu();
            } else {
                chatContainer.classList.add('hidden');
                chatIcon.classList.remove('hidden');
            }
        }

        // Event listeners
        chatIcon.addEventListener('click', toggleChat);
        minimizeBtn.addEventListener('click', toggleChat);
        sendBtn.addEventListener('click', handleUserAnswer);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserAnswer();
        });


});


