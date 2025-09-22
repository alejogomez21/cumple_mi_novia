document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const introMessage = document.querySelector('.intro-message');
    const slideshowContainer = document.getElementById('slideshowContainer');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const canvas = document.getElementById('starrySky');
    const ctx = canvas.getContext('2d');
    const slides = [
        {
            image: 'img/foto1.jpeg', // Reemplaza con tus fotos
            message: "La mujer de mi vida está cumpliendo 20 años el dia de hoy, te me creciste mi peque."
        },
        {
            image: 'img/foto2.jpeg', // Reemplaza con tus fotos
            message: "Se que te puede preocupar esta edad, pero a esta edad creeme que el 99% de las personas no saben ni para que vinieron al mundo, y te lo digo por experiencia amor."
        },
        {
            image: 'img/foto3.jpeg', // Reemplaza con tus fotos
            message: "pero me he dado cuenta que nosotros vinimos al mundo es a disfrutar, no a estresarnos pensando en como salir adelante o para que eres buena, o qué deberias estudiar, solo vivir pequeñas cosas que te hacen felíz, y de ahí creeme que sale todo lo demás."
        },
        {
            image: 'img/foto4.jpeg', // Reemplaza con tus fotos
            message: "Quiero que disfrutes estos años de aqui en adelante amor, que VIVAS realmente, que hagas cosas que realmente te gusten, por mas minimas que sean, serán el impulso que necesitas para que tu vida sea mas hermosa de lo que ya es."
        },
        {
            image: 'img/foto5.jpeg', // Reemplaza con tus fotos
            message: "Pero ojito que no vas a estar sola amor, asi como he estado estos 3 años a tu lado, seguiré estandolo para apoyarte en lo que sea que quieras hacer que te haga feliz mi vida, porque tu felicidad es mi felicidad."
        },
        {
            image: 'img/foto6.jpeg', // Reemplaza con tus fotos
            message: "Espero tomes esta nueva estapa con un positivismo tremendo, pensando en todo lo bueno q haz vivido y todo lo que vivirás, en la vida siempre hay bajones amor, pero creeme que lo que pasa más rapido en la vida son esos momentos, los buenos momentos son los que siempre se quedan en la mente y se viven con mas ganas, necesito es que estés pendiente en esos."
        },
        {
            image: 'img/foto7.jpeg', // Reemplaza con tus fotos
            message: "Porque al final de todo esto no nos llevaremos nada amor, entonces pa q preocuparnos por cosas malas, solo disfruta las cosas buenas que te da la vida y entiende que la existencia es un momento, la eternidad es el comienzo de recordar todo lo que se vivió, y debes llevarte muchos de esos buenos momentos para recordar que mas que una vida buena, tuviste una vida felíz, y que nunca te faltó disfrutar un momento por mas minimo que haya sido."
        },
    ];

    let currentSlideIndex = 0;
    let stars = [];
    let starSpeed = 0.5;

    // Configuración del canvas para las estrellas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Crear las estrellas
    function createStars() {
        stars = [];
        for (let i = 0; i < 500; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5,
                opacity: Math.random()
            });
        }
    }
    createStars();

    // Dibujar las estrellas
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
        });
    }

    // Mover las estrellas
    function moveStars() {
        stars.forEach(star => {
            star.x += starSpeed;
            if (star.x > canvas.width) {
                star.x = 0;
                star.y = Math.random() * canvas.height;
            }
        });
    }

    // Animación de las estrellas
    function animateStars() {
        requestAnimationFrame(animateStars);
        moveStars();
        drawStars();
    }
    animateStars();

    // Función para crear las diapositivas
    function createSlides() {
        slides.forEach((slide, index) => {
            const slideEl = document.createElement('div');
            slideEl.className = 'slide';
            slideEl.innerHTML = `
                <img src="${slide.image}" alt="Foto de recuerdo ${index + 1}">
                <p>${slide.message}</p>
            `;
            slideshowContainer.appendChild(slideEl);
        });
    }
    createSlides();

    // Iniciar la presentación
    function startSlideshow() {
        // Reproducir música
        backgroundMusic.play();
        
        // Esconder el mensaje inicial
        introMessage.classList.add('hidden');
        
        // Aumentar la velocidad de las estrellas
        starSpeed = 2;
        
        // Iniciar la secuencia de fotos
        setTimeout(() => {
            showNextSlide();
        }, 1500);
    }

    // Mostrar la siguiente diapositiva
    function showNextSlide() {
        const allSlides = document.querySelectorAll('.slide');
        if (currentSlideIndex > 0) {
            allSlides[currentSlideIndex - 1].classList.remove('active');
        }
        
        if (currentSlideIndex < allSlides.length) {
            allSlides[currentSlideIndex].classList.add('active');
            setTimeout(() => {
                currentSlideIndex++;
                if (currentSlideIndex <= allSlides.length) {
                    showNextSlide();
                }
            }, 20000); // Muestra cada diapositiva por 5 segundos
        // ...código anterior...

    } else {
        // Al terminar, esconde el contenedor de diapositivas
        slideshowContainer.style.opacity = '0';
        
        // Y muestra un mensaje final con un pequeño retraso
        setTimeout(() => {
            slideshowContainer.style.display = 'none';
            const finalMessage = document.createElement('div');
            finalMessage.className = 'intro-message'; // Reutilizamos la clase para el estilo
            finalMessage.innerHTML = '<h1>¡Feliz cumpleaños, Mi peque!</h1><p>Esta es solo una pequeña parte de nuestra historia. Estoy emocionado por cada nuevo capítulo que escribiremos juntos. Te amo con todo mi corazón.</p>';
            document.body.appendChild(finalMessage);
            finalMessage.style.opacity = '1';
        }, 300); // Un retraso para la animación
    }
}

    startButton.addEventListener('click', startSlideshow);
});
