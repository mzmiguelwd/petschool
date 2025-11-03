import CourseCard1 from "../../assets/cards/course-card-1.png";
import CourseCard2 from "../../assets/cards/course-card-2.png";
import CourseCard3 from "../../assets/cards/course-card-3.png";
import ReviewCard1 from "../../assets/cards/review-card-1.png";
import ReviewCard2 from "../../assets/cards/review-card-2.png";
import ReviewCard3 from "../../assets/cards/review-card-3.png";
import CardImage1 from "../../assets/landing/cursos/imagen-1.png";
import CardImage2 from "../../assets/landing/cursos/imagen-2.png";
import CardImage3 from "../../assets/landing/cursos/imagen-3.png";
import EntrenadorImage1 from "../../assets/landing/entrenadores/entrenador-1.png";
import EntrenadorImage2 from "../../assets/landing/entrenadores/entrenador-2.png";
import EntrenadorImage3 from "../../assets/landing/entrenadores/entrenador-3.png";

// ========== LandingHeader: LINKS ==========

export const links = [
  {
    id: 1,
    titulo: "Inicio",
    link: "/",
  },
  {
    id: 2,
    titulo: "Cursos",
    link: "/cursos",
  },
  {
    id: 3,
    titulo: "Nuestro Equipo",
    link: "/equipo",
  },
  {
    id: 4,
    titulo: "Contacto",
    link: "/contacto",
  },
];

// ========== LandingHeader: SOCIALS ==========

export const socials = [
  {
    id: 1,
    titulo: "Instagram",
    link: "https://www.instagram.com",
    icon: "bi bi-instagram",
  },
  {
    id: 2,
    titulo: "Tiktok",
    link: "https://www.tiktok.com",
    icon: "bi bi-tiktok",
  },
];

// ========== InicioPage: CURSOS ==========

export const inicioCursos = [
  {
    img: CourseCard1,
    title: "Obediencia Básica",
    content:
      "Establece una base sólida de obediencia con comandos esenciales y técnicas de manejo.",
  },
  {
    img: CourseCard2,
    title: "Agilidad Canina",
    content:
      "Desarrolla la agilidad y la coordinación de tu perro con nuestros desafiantes cursos de agilidad.",
  },
  {
    img: CourseCard3,
    title: "Socialización",
    content:
      "Ayuda a tu perro a interactura de forma segura y positiva con otros perros y personas.",
  },
];

// ========== InicioPage: Testimomnios ==========

export const testimonios = [
  {
    name: "Sofía García",
    avatar: ReviewCard1,
    rating: 5,
    text: "PetSchool ha transformado a mi perro. Ahora es más obediente y seguro de sí mismo. ¡Lo recomiendo totalmente!",
  },
  {
    name: "Carlos López",
    avatar: ReviewCard2,
    rating: 4,
    text: "El curso de obediencia básica fue muy útil. Los instructores son pacientes y profesionales.",
  },
  {
    name: "Ana Martínez",
    avatar: ReviewCard3,
    rating: 5,
    text: "Mi perro disfrutó mucho el curso de socialización. Ahora juega feliz con otros perros en el parque.",
  },
];

// ========== CursosPage: CURSOS ==========

export const cursosCursos = [
  {
    id: 1,
    titulo: "Obediencia Básica",
    descripcion:
      "Este curso intensivo es el punto de partida ideal para cualquier dueño que desee establecer una comunicación clara y un control fiable sobre su perro, sin importar su edad o raza. Nos centraremos en comandos de supervivencia que promueven la seguridad y la convivencia. Aprenderás técnicas de refuerzo positivo para motivar a tu perro y corregir comportamientos no deseados de forma ética y efectiva.",
    precio: "$59.900 / mes",
    imagenUrl: CardImage1,
  },
  {
    id: 2,
    titulo: "Agilidad Canina",
    descripcion:
      "Diseñado para perros enérgicos y dueños que buscan un deporte divertido y dinámico. Este curso de iniciación se centra en la seguridad y la correcta ejecución de los obstáculos fundamentales. No solo es ejercicio, es una disciplina que mejora el enfoque, la concentración y la obediencia dinámica de tu perro, fortaleciendo la confianza mutua a través del juego y el movimiento.",
    precio: "$99.900 / mes",
    imagenUrl: CardImage2,
  },
  {
    id: 3,
    titulo: "Socialización",
    descripcion:
      "Enfocado en la etapa crítica de la socialización, este programa busca exponer al cachorro de forma controlada y positiva a una amplia gama de estímulos: sonidos (aspiradora, tormenta), texturas (metal, césped), personas (niños, ancianos, uniformes) y otros cachorros. El objetivo principal es construir una base de confianza que prevenga miedos, fobias y problemas de reactividad en la edad adulta. Incluye sesiones de juego supervisadas y manejo de recursos.",
    precio: "$79.900 / mes",
    imagenUrl: CardImage3,
  },
];

// ========== EquipoPage: ENTRENADORES ==========

export const entrenadores = [
  {
    nombre: "Sofía Ramírez",
    titulo:
      "Entrenadora principal con más de 10 años de experiencia en comportamiento canino.",
    imagenUrl: EntrenadorImage1,
  },
  {
    nombre: "Carlos López",
    titulo:
      "Entrenador certificado con amplia experiencia en obediencia básica y avanzada.",
    imagenUrl: EntrenadorImage2,
  },
  {
    nombre: "Ana García",
    titulo:
      "Entrenadora especializada en socialización y manejo de perros reactivos.",
    imagenUrl: EntrenadorImage3,
  },
];

// ========== EquipoPage: ENTRENADORES ==========

export const faqs = [
  {
    pregunta: "¿Qué tipo de entrenamiento ofrecen?",
    respuesta:
      "Ofrecemos una variedad de cursos, desde obediencia básica para cachorros hasta entrenamiento avanzado en agilidad y modificación de conducta. Todos nuestros programas se basan en el refuerzo positivo.",
  },
  {
    pregunta: "¿Cuáles son los precios de los cursos?",
    respuesta:
      "Los precios varían según el curso. Te invitamos a visitar nuestra página de cursos para ver el detalle de cada programa o contactarnos para una cotización personalizada.",
  },
  {
    pregunta: "¿Cómo puedo inscribir a mi perro?",
    respuesta:
      "Para inscribirte, primero debes registrarte o iniciar sesión en nuestra plataforma. Luego podrás acceder al formulario en línea en la página de cada curso o contactarnos directamente por teléfono o correo electrónico si tienes dudas.",
  },
];
