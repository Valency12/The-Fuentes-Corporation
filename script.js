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
        // Inicializa el estado
        title.classList.remove('animate-zoom');
        title.style.opacity = "0";
        title.style.transform = "scale(0.96)";
        // Bandera para controlar si ya se animó
        let hasAnimated = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    title.classList.add('animate-zoom');
                    hasAnimated = true; // Marca como animado
                    // Opcional: dejar de observar después de la animación
                    observer.unobserve(title);
                }
                // Eliminamos el else que quitaba la clase
            });
        }, { threshold: 0.5 });
        observer.observe(title);
    });
    // Selecciona todos los párrafos principales
    const paragraphs = document.querySelectorAll(
        '.about-paragraph, .card-paragraph, .proyectos-paragraph, .proyectos-paragraph-two, .aliados-paragraph, .misionvision-paragraph, .contacto-paragraph'
    );
    // Configura observadores para cada párrafo
    paragraphs.forEach(paragraph => {
        let hasAnimated = false; // Bandera de control
        paragraph.classList.remove('animate-paragraph-zoom');
        paragraph.style.opacity = "0";
        paragraph.style.transform = "translateY(60px)";
        const observerParagraph = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    paragraph.classList.add('animate-paragraph-zoom');
                    hasAnimated = true;
                    // observerParagraph.unobserve(paragraph); // Opcional para mejor rendimiento
                }
                // Eliminamos el else que reseteaba la animación
            });
        }, { threshold: 0.5 });
        observerParagraph.observe(paragraph);
    });
    // Animación para imágenes (fadeInRight)
    const aboutImages = document.querySelectorAll('.about-image img, .planta-imagen-1, .planta-imagen-2, .mapa-iframe');
    aboutImages.forEach(image => {
        let hasAnimated = false; // Control de animación única
        image.classList.remove('animate-image-fadeInRight');
        image.style.opacity = "0";
        image.style.transform = "translateX(60px)";
        const observerImage = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    image.classList.add('animate-image-fadeInRight');
                    hasAnimated = true;
                    // observerImage.unobserve(image); // Opcional para mejor rendimiento
                }
                // Eliminamos el else que reseteaba la animación
            });
        }, { threshold: 0.5 });
        observerImage.observe(image);
    });
    // Animación para mapa-frame (puedes usar fadeInUp, fadeIn, o cualquier otra)
    const mapaFrame = document.querySelector('.mapa-iframe');
    if (mapaFrame) {
        let hasAnimatedMap = false;
        mapaFrame.classList.remove('animate-map-fadeInRight');
        mapaFrame.style.opacity = "0";
        mapaFrame.style.transform = "translateY(40px)";
        const observerMap = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimatedMap) {
                    mapaFrame.classList.add('animate-map-fadeInRight');
                    hasAnimatedMap = true;
                    // observerMap.unobserve(mapaFrame); // Opcional para rendimiento
                }
            });
        }, { threshold: 0.5 });
        observerMap.observe(mapaFrame);
    }
    // Animación para video (fadeInLeft)
    const sectionVideoFile = document.querySelector('.section-video-file');
    if (sectionVideoFile) {
        let hasAnimatedVideo = false;
        sectionVideoFile.classList.remove('animate-video-fadeInLeft');
        sectionVideoFile.style.opacity = "0";
        sectionVideoFile.style.transform = "translateX(-60px)";
        const observerVideo = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimatedVideo) {
                    sectionVideoFile.classList.add('animate-video-fadeInLeft');
                    hasAnimatedVideo = true;
                    // observerVideo.unobserve(sectionVideoFile); // Opcional
                }
                // Eliminamos el else
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
            description: 'A través de la renovación de varias calles, hemos transformado caminos de tierra en vialidades modernas y duraderas. El trabajo incluyó la preparación del terreno y la instalación de una capa de concreto de alta resistencia, mejorando significativamente el acceso y la seguridad para peatones y vehículos. '
        },
        2: {
            Imagenes: [
                'Imagenes/tamazunchale/img1.jpeg',
                'Imagenes/tamazunchale/img2.jpeg',
                'Imagenes/tamazunchale/img3.jpeg',
                'Imagenes/tamazunchale/img4.jpeg'
            ],
            description: 'Este proyecto en Tamazunchale, un punto vital de la Huasteca Potosina, se enfoca en la ampliación y mejoramiento de una vialidad clave. Las obras consisten en el movimiento de tierra y la adecuación de la vía para expandir su capacidad y garantizar un flujo vehicular más ágil y seguro.'
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
            description: 'Este proyecto se centró en la habilitación y acabados interiores de una nueva sucursal, transformando un espacio en obra gris en una tienda moderna y completamente funcional. Las labores incluyeron la instalación de estructuras para plafones y muros de tabla roca, así como la colocación de un sistema de iluminación LED y la construcción de áreas de servicio. El trabajo finalizó con la integración de los elementos de diseño y mobiliario característicos de la marca, creando un ambiente ideal para la exhibición y venta de productos, listo para recibir a sus clientes.'
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
            description: 'En este proyecto se realizó una renovación urbana integral en la localidad de Cactus, combinando mejoras funcionales y estéticas. Por un lado, se instaló un colector pluvial y se pavimentaron las calles para prevenir inundaciones y mejorar la movilidad de los residentes. Por otro lado, se construyó un monumento moderno con la palabra "CACTUS" en una nueva plaza, sirviendo como un símbolo de identidad y progreso para la comunidad.'
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
            description: 'Este proyecto en Matías Romero, Oaxaca, se centra en la ampliación y construcción de nuevas vialidades para mejorar la conectividad y el flujo de tráfico en la zona.  El proyecto incluye la construcción de puentes y la adecuación de caminos, lo cual es fundamental para el progreso del sureste de México.'
        },
        9: {
            Imagenes: [
                'Imagenes/lasFlores/img1.jpeg',
                'Imagenes/lasFlores/img2.jpeg',
                'Imagenes/lasFlores/img3.jpeg',
                'Imagenes/lasFlores/img4.jpeg',
                'Imagenes/lasFlores/img5.jpeg'
            ],
            description: 'Este proyecto en la colonia Las Flores se enfoca en la construcción de una nueva carretera de principio a fin. Las labores incluyeron la preparación del terreno con trabajos de movimiento de tierra y compactación para asegurar una base sólida. La obra avanzó con la instalación de tuberías y servicios de drenaje, seguido de la aplicación de capas de material de base.'
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
});
    
 document.addEventListener('DOMContentLoaded', function () {
                const opiniones = [
                    {
                        //yap
                        nombre: "Jose Martin Tetumo",
                        titulo: "Gerente de maquinaria",
                        opinion: "Llevo laborando para esta gran empresa desde el 2013 y he visto cómo va evolucionando y creciendo laboralmente. De mi parte, como trabajador, he estado en las buenas y en las malas, porque así como hay días buenos, ¡los hay malos!. ¡Espero que, como empresa, se siga expandiendo más a diferentes partes de la República Mexicana!",
                        img: "Imagenes/Perfiles/perfil2.webp",
                        size: "medium",
                        highlight: true
                    },
                    {
                        //yap
                        nombre: "Mauro Alberto Ramos",
                        titulo: "Gerente de Sistemas",
                        opinion: "En el tiempo que he trabajado en The Fuentes Corporation, me ha sido grato laborar en la empresa. He podido crecer profesionalmente basándome en proyectos y nuevos retos que se presentan en el día a día.",
                        img: "Imagenes/icons/perfil1.png",
                        size: "large"
                    },
                    {
                        //yap
                        nombre: "Mauro Sánchez López",
                        titulo: "Gerente de Recursos Humanos",
                        opinion: "Es una empresa que apoya el talento joven, con capacitaciones y enseñanza diaria, sobrepasando siempre los retos que se presentan y sobre todo siempre viendo hacia el futuro. Como toda empresa ha tenido sus altibajos, pero hoy en día se podría decir que es una empresa sólida que está en expansión y que tiene buenos proyectos, con la mira de seguir creciendo mucho más.",
                        img: "Imagenes/Perfiles/perfil6.webp",
                        size: "medium",
                        highlight: true
                    },
                    {
                        //yap
                        nombre: "Luis Enrique Sanchez",
                        titulo: "Jefe de producción plantas de asfalto",
                        opinion: "Ha sido un constante aprendizaje a lo largo de estos meses en los que he desempeñado actividades en esta área por lo que puedo decir ha sido una gran experiencia laboral.",
                        img: "Imagenes/icons/perfil1.png",
                        size: "large"
                    },
                    {
                        //yap
                        nombre: "Thalía Arcelia Huerta",
                        titulo: "Auxiliar de calidad",
                        opinion: "El trato hacia mi persona siempre a sido excelente, siempre me han apoyado en dudas, económicamente y en cursos. Les estoy muy agraciada por la oportunidad. Considero que tiene muchas áreas de mejora y crecimiento, que con el apoyo ideal favorecerían mucho a la mejora continua ",
                        img: "Imagenes/Perfiles/perfil7.jpg",
                        size: "medium"
                    },
                    {
                        //yap
                        nombre: "Jose Socorro Roque",
                        titulo: "Cliente corporativo",
                        opinion: "Por el tiempo que llevo trabajando en esta empresa, me ha gustado el trabajo. Son puntuales en los pagos y hay buen ambiente laboral. La recomiendo para trabajar.",
                        img: "Imagenes/icons/perfil1.png",
                        size: "large"
                    },
                    {
                        //yap
                        nombre: "María del Carmen García",
                        titulo: "Encargada de Estimaciones de Obra",
                        opinion: "Trabajar en The Fuentes ha sido una experiencia enriquecedora tanto a nivel profesional como personal. La empresa ofrece un ambiente de trabajo colaborativo con oportunidades de crecimiento y aprendizaje constante. Sin embargo, también enfrentamos retos como mejorar la comunicación interna y la toma de decisiones. Considero este un lugar donde se puede construir una carrera sólida.",
                        img: "Imagenes/Perfiles/perfil3.webp",
                        size: "medium"
                    },
                    {
                        //yap
                        nombre: "Carlos Jonathan Zavaleta",
                        titulo: "Residente",
                        opinion: "Todo muy bien, buen ambiente laboral. Los gerentes apoyan mucho a todo el equipo de trabajo. Los campamentos están excelentes con excelentes servicios.",
                        img: "Imagenes/icons/perfil1.png",
                        size: "large",
                        highlight: true
                    },
                    {
                        //yap
                        nombre: "Carrillo Cruz",
                        titulo: "Auxiliar Administrativo",
                        opinion: "Me siento bien en esta empresa, donde hay crecimiento profesional y cada día se presenta un reto en el que puedes aprender más y aportar ideas. Siempre se aprende algo nuevo, tanto de cada trabajador como de los compañeros. Es una empresa que te da la oportunidad de aprender más de lo poco que sabes.",
                        img: "Imagenes/icons/perfil2.png",
                        size: "medium"
                    },
                    {
                        //yap
                        nombre: "Juan Eduardo Loredo",
                        titulo: "Velador",
                        opinion: "Ha sido muy buena, sin ningún problema. Hasta ahora no he tenido problemas con ningún miembro de la compañía. Me ha gustado mucho ser miembro del equipo.",
                        img: "Imagenes/icons/perfil1.png",
                        size: "large"
                    },
                    {
                        //yap
                        nombre: "Wilfredo Argueta",
                        titulo: "Gerente Administrativo",
                        opinion: "La empresa ha tenido varios cambios desde que entré a laborar. Se han mejorado temas como los controles de insumos, comodidades en los campamentos, entre otros.",
                        img: "Imagenes/Perfiles/perfil1.webp",
                        size: "large",
                        highlight: true
                    },
                    {
                        //yap
                        nombre: "Ricardo Linares",
                        titulo: "Gerente de Obra",
                        opinion: "La razón de ser líder conlleva una responsabilidad mayor. Es necesario predicar con el ejemplo y aplicar el conocimiento en las tareas programadas en la obra que se tiene a cargo. El deber ser es que las acciones laborales hablen por ti y te ayuden a crecer en tu vida laboral, agradeciendo siempre a la empresa por la oportunidad laboral hasta el momento.",
                        img: "Imagenes/icons/perfil1.png",
                        size: "medium"
                    },
                    {
                        //yap
                        nombre: "Maria De Jesus Ramos",
                        titulo: "Auxiliar de Estimaciones",
                        opinion: "Ha sido una experiencia agradable, ya que tenemos excelentes ingenieros de los cuales aprendemos más y contamos con un ambiente de trabajo agradable. Estamos en una buena empresa.",
                        img: "Imagenes/icons/perfil2.png",
                        size: "large"
                    },
                    {
                        //yap
                        nombre: "Jonny Daniel Xolo",
                        titulo: "Analista de costos",
                        opinion: "Una empresa que me ha dado mucho crecimiento profesional, muchas oportunidades de aprender cosas nuevas.",
                        img: "Imagenes/icons/perfil1.png",
                        size: "large"
                    },
                    {
                        //yap
                        nombre: "Luz Elena Pérez",
                        titulo: "Auxiliar Recursos Humanos",
                        opinion: "En mi experiencia en The Fuentes, participé en proyectos clave que me permitieron desarrollar nuevas habilidades y aportar valor en áreas estratégicas. Aunque el ambiente era generalmente positivo, en ocasiones surgían tensiones e incluso envidias entre colegas.",
                        img: "Imagenes/icons/perfil1.png",
                        size: "medium",
                        highlight: true
                    },
                    {
                        //yap
                        nombre: "Pedro Emiliano Gómez",
                        titulo: "Auxiliar jurídico",
                        opinion: "En general, todo bien. Llevo apenas un mes y tanto he aprendido como he aportado. Espero seguir aprendiendo, creciendo y aportando a mediano y largo plazo.",
                        img: "Imagenes/icons/perfil1.png",
                        size: "large"
                    },
                    {
                        //yap
                        nombre: "Inmer Ernesto Moya",
                        titulo: "Gerente de Control de Calidad",
                        opinion: "Orgulloso de formar parte de la gran familia de la empresa y aportar mi granito de arena desde mi área formativa y aplicada, de tal forma que los proyectos ejecutados cumplan con la calidad deseada y contratada. La idea es seguir en la empresa muchos años más, continuar construyendo obras a lo largo de todo México, que la empresa sea reconocida a nivel nacional y se vuelva un referente. ",
                        img: "Imagenes/icons/perfil1.png",
                        size: "small",
                        highlight: true
                    },
                    {
                        //yap
                        nombre: "Alondra Vázquez Gómez",
                        titulo: "Auxiliar de Calidad",
                        opinion: "Agradezco que me dieran la oportunidad de trabajar en esta empresa donde veo que sí se preocupan por sus trabajadores y valoran el esfuerzo que se hace para sacar adelante el trabajo. Me gusta lo que hago y espero seguir aportando y creciendo junto con esta empresa. Con los ingenieros, mis jefes inmediatos, no tengo ninguna queja; siempre me han ayudado y aportan conocimientos nuevos cada día.",
                        img: "Imagenes/icons/perfil2.png",
                        size: "small"
                    },
                ];

                const opinionesGrid = document.getElementById('opinionesGrid');
                const controlsContainer = document.getElementById('controls');

                // Variables para el carrusel
                let currentPage = 0;
                const opinionsPerPage = 6;
                const totalPages = Math.ceil(opiniones.length / opinionsPerPage);
                let autoCarouselInterval;

                // Función para renderizar opiniones
                function renderOpinions(page) {
                    opinionesGrid.innerHTML = '';
                    const startIdx = page * opinionsPerPage;
                    const endIdx = startIdx + opinionsPerPage;
                    const currentOpinions = opiniones.slice(startIdx, endIdx);

                    currentOpinions.forEach((opinion, idx) => {
                        const opinionCard = document.createElement('div');
                        let cardClasses = 'opinion-card';

                        // Añadir clases según el tamaño y si es destacado
                        if (opinion.size === 'large') cardClasses += ' opinion-large';
                        if (opinion.size === 'small') cardClasses += ' opinion-small';
                        if (opinion.highlight) cardClasses += ' opinion-highlight';

                        opinionCard.className = cardClasses;
                        opinionCard.innerHTML = `
                        <div class="opinion-header">
                            <img src="${opinion.img}" alt="${opinion.nombre}" class="profile-img">
                            <div class="user-info">
                                <span class="user-name">${opinion.nombre}</span>
                                <span class="user-title">${opinion.titulo}</span>
                            </div>
                        </div>
                        <p class="opinion-text">"${opinion.opinion}"</p>
                    `;

                        opinionesGrid.appendChild(opinionCard);

                        // Activar animación después de un pequeño retraso
                        setTimeout(() => {
                            opinionCard.classList.add('visible');
                        }, 100 * idx);
                    });

                    // Actualizar controles
                    updateControls();
                }

                // Función para crear los controles
                function createControls() {
                    controlsContainer.innerHTML = '';
                    for (let i = 0; i < totalPages; i++) {
                        const btn = document.createElement('button');
                        btn.className = `control-btn ${i === currentPage ? 'active' : ''}`;
                        btn.addEventListener('click', () => {
                            goToPage(i);
                        });
                        controlsContainer.appendChild(btn);
                    }
                }

                // Función para actualizar los controles
                function updateControls() {
                    const buttons = document.querySelectorAll('.control-btn');
                    buttons.forEach((btn, idx) => {
                        if (idx === currentPage) {
                            btn.classList.add('active');
                        } else {
                            btn.classList.remove('active');
                        }
                    });
                }

                // Función para ir a una página específica
                function goToPage(page) {
                    if (page < 0) page = totalPages - 1;
                    if (page >= totalPages) page = 0;

                    currentPage = page;
                    renderOpinions(currentPage);
                    resetAutoCarousel();
                }

                // Función para el carrusel automático
                function startAutoCarousel() {
                    autoCarouselInterval = setInterval(() => {
                        goToPage((currentPage + 1) % totalPages);
                    }, 8000); // Cambia cada 8 segundos
                }

                // Función para reiniciar el carrusel automático
                function resetAutoCarousel() {
                    clearInterval(autoCarouselInterval);
                    startAutoCarousel();
                }

                // Inicializar
                createControls();
                renderOpinions(currentPage);
                startAutoCarousel();

                // Hacer que las cards sean visibles al cargar
                setTimeout(() => {
                    const cards = document.querySelectorAll('.opinion-card');
                    cards.forEach(card => {
                        card.classList.add('visible');
                    });
                }, 500);

                // Pausar carrusel al hacer hover
                opinionesGrid.addEventListener('mouseenter', () => {
                    clearInterval(autoCarouselInterval);
                });

                // Reanudar carrusel al salir del hover
                opinionesGrid.addEventListener('mouseleave', () => {
                    resetAutoCarousel();
                });
        });

document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button[type="submit"]');
        const statusMsg = document.getElementById('form-msg'); // Cambiado a 'form-msg'
        const hideDelay = window.innerWidth < 768 ? 3000 : 5000;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        statusMsg.style.display = 'none';
        
        emailjs.sendForm(
            'service_mhuza8k',
            'template_rl5rrl6',
            this
        )
        .then(() => {
            statusMsg.innerHTML = `<svg>[ícono de check]</svg><span>¡Mensaje enviado con éxito!</span>`;
            statusMsg.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.';
            statusMsg.style.color = '#004e98';
            statusMsg.style.display = 'block';
            statusMsg.style.textAlign = 'center';
            this.reset();
        })
        .catch(err => {
            statusMsg.textContent = 'Error al enviar el mensaje. Por favor inténtalo nuevamente.';
            statusMsg.style.color = '#e63946';
            statusMsg.style.display = 'block';
            console.error('Error detallado:', err);
            if (err.response) {
                statusMsg.textContent += ` (Error ${err.response.status}: ${err.response.text})`;
            }
        })
        .finally(() => {
            submitBtn.textContent = 'Enviar'; // Cambiado a 'Enviar' para coincidir con el HTML
            submitBtn.disabled = false;
            setTimeout(() => { statusMsg.style.display = 'none'; }, hideDelay);
        });
    });

 document.addEventListener('DOMContentLoaded', function () {
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
                    { texto: "¿Cómo puedo contactar con ustedes?", clave: "contacto", tipo: "texto" }
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
            chatMessages.scrollTop = chatMessages.scrollHeight;

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
    // Reemplaza tu código actual con esta versión mejorada
otraBtn.addEventListener('click', () => {
    addUserMessage("Otra pregunta");
    
    // Obtener el número de WhatsApp (reemplaza con tu número real)
    const whatsappNumber = "529612718786"; // Ejemplo: 52 (México) + 1234567890
    const encodedMessage = encodeURIComponent(`¡Buen día! Me gustaría recibir información sobre sus servicios y proyectos. ¡Gracias!`);
    
    addBotMessage(
        `<div style="margin-bottom:15px;">
            <strong>¡Gracias por tu interés!</strong><br>
            Nuestro equipo recibirá tu consulta y te contactará lo antes posible.<br>
            Si prefieres atención inmediata, puedes escribirnos por WhatsApp:
        </div>
        <div style="text-align:center;">
            <a href="https://wa.me/${whatsappNumber}?text=${encodedMessage}" 
            target="_blank" 
            class="whatsapp-chat-button" 
            onclick="trackWhatsAppClick('${category.nombre}')">
                💬 Escribir por WhatsApp
            </a>
        </div>
        <div style="margin-top:15px; font-size:12px; color:#666;">
            <i>Te redirigiremos a la aplicación de WhatsApp</i>
        </div>`
    );
    
    currentQuestion = null;
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
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
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
    Una vez recibida la información, te proporcionaremos un presupuesto detallado en un plazo de <b>5 a 7 días hábiles</b>.`
        
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

        // Iniciar chat
        setTimeout(() => {
            chatIcon.classList.add('hidden');
            chatContainer.classList.remove('hidden');
            addBotMessage("¡Hola! Soy Step, el asistente virtual de The Fuentes Corporation.");
            showMainMenu();
        }, 1000);
});