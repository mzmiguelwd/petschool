import CardImage1 from "../../assets/landing/cursos/imagen-1.png";
import CardImage2 from "../../assets/landing/cursos/imagen-2.png";
import CardImage3 from "../../assets/landing/cursos/imagen-3.png";
import EntrenadorImage1 from "../../assets/landing/entrenadores/entrenador-1.png";
import EntrenadorImage2 from "../../assets/landing/entrenadores/entrenador-2.png";
import EntrenadorImage3 from "../../assets/landing/entrenadores/entrenador-3.png";

// ========== CURSOS ==========

export const cursos = [
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

// ========== ENTRENADORES ==========

export const trainers = [
  {
    name: "Sofía Ramírez",
    title:
      "Entrenadora principal con más de 10 años de experiencia en comportamiento canino.",
    imageUrl: EntrenadorImage1,
  },
  {
    name: "Carlos López",
    title:
      "Entrenador certificado con amplia experiencia en obediencia básica y avanzada.",
    imageUrl: EntrenadorImage2,
  },
  {
    name: "Ana García",
    title:
      "Entrenadora especializada en socialización y manejo de perros reactivos.",
    imageUrl: EntrenadorImage3,
  },
];

export const faqs = [
  {
    question: "¿Qué tipo de entrenamiento ofrecen?",
    answer:
      "Ofrecemos una variedad de cursos, desde obediencia básica para cachorros hasta entrenamiento avanzado en agilidad y modificación de conducta. Todos nuestros programas se basan en el refuerzo positivo.",
  },
  {
    question: "¿Cuáles son los precios de los cursos?",
    answer:
      "Los precios varían según el curso. Te invitamos a visitar nuestra página de cursos para ver el detalle de cada programa o contactarnos para una cotización personalizada.",
  },
  {
    question: "¿Cómo puedo inscribir a mi perro?",
    answer:
      "Para inscribirte, primero debes registrarte o iniciar sesión en nuestra plataforma. Luego podrás acceder al formulario en línea en la página de cada curso o contactarnos directamente por teléfono o correo electrónico si tienes dudas.",
  },
];
