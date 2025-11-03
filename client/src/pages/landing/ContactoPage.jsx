import { useState } from "react";
import { motion } from "framer-motion";
import LandingHeader from "../../components/landing/LandingHeader";
import LandingFooter from "../../components/landing/LandingFooter";
import { Facebook, Instagram, MessageCircle, Mail } from "lucide-react";
import emailjs from "@emailjs/browser";
import DogImage from "../../assets/dog-golden.png"; // puedes cambiarlo por otra imagen del proyecto
import { slipeUp } from "../../components/landing/utils/animations";

const ContactoPage = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Enviando...");

    emailjs
      .send(
        "service_2ef0esj", // <-- reemplaza con tu EmailJS Service ID
        "template_7x0wkro", // <-- reemplaza con tu Template ID
        formData,
        "nTi9hL3IK6u1_36H7" // <-- reemplaza con tu Public Key
      )
      .then(
        () => {
          setStatus("✅ Mensaje enviado con éxito");
          setFormData({ nombre: "", email: "", mensaje: "" });
        },
        () => {
          setStatus("❌ Error al enviar el mensaje. Intenta nuevamente.");
        }
      );
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <LandingHeader />

      {/* ========== Sección: Hero ========== */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            variants={slipeUp(0.3)}
            initial="initial"
            animate="animate"
            className="z-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ¡Contáctanos!
            </h1>
            <p className="text-lg text-gray-700">
              Si tienes preguntas sobre nuestros cursos o necesitas orientación
              personalizada, completa el formulario y te responderemos muy
              pronto 🐶💌
            </p>
          </motion.div>

          <motion.div
            variants={slipeUp(0.5)}
            initial="initial"
            animate="animate"
            className="flex justify-center md:justify-end"
          >
            <img
              src={DogImage}
              alt="Perro amigable"
              className="w-80 h-auto rounded-3xl shadow-md"
            />
          </motion.div>
        </div>
      </section>

      {/* ========== Sección: Formulario ========== */}
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg border border-gray-200"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Envíanos un mensaje
          </h2>

          <form onSubmit={sendEmail} className="space-y-5">
            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                Mensaje
              </label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none h-32 resize-none"
                placeholder="Cuéntanos tu consulta..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Enviar mensaje
            </button>
          </form>

          {status && (
            <p className="mt-4 text-center text-gray-700 font-medium">
              {status}
            </p>
          )}
        </motion.div>
      </main>

      {/* ========== Sección: Redes Sociales ========== */}
      <section className="bg-gray-900 text-white py-10">
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-lg font-semibold">
            También puedes contactarnos por:
          </h3>
          <div className="flex space-x-6">
            <a
              href="https://facebook.com/TU_PAGINA"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-400 transition-colors"
            >
              <Facebook size={28} />
            </a>
            <a
              href="https://instagram.com/TU_PAGINA"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-400 transition-colors"
            >
              <Instagram size={28} />
            </a>
            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-400 transition-colors"
            >
              <MessageCircle size={28} />
            </a>
            <a
              href="mailto:tucorreo@ejemplo.com"
              className="hover:text-green-400 transition-colors"
            >
              <Mail size={28} />
            </a>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default ContactoPage;
