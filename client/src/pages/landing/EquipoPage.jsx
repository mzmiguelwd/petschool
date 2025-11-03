import { motion } from "motion/react";
import { slipeUp, slipeDown } from "../../components/landing/utils/animations";
import { entrenadores, faqs } from "../../components/landing/data";

import LandingHeader from "../../components/landing/LandingHeader";
import LandingFooter from "../../components/landing/LandingFooter";
import EntrenadorCard from "../../components/landing/EquipoEntrenadorCard";
import FAQItem from "../../components/landing/EquipoFAQItem";
import DogImage from "../../assets/landing/nuestro-equipo-image.png";

const EquipoPage = () => {
  return (
    <div className="bg-gray-50">
      <LandingHeader />

      <main className="flex-grow mt-15">
        {/* ========== Sección: Nuestro Equipo ========== */}
        <section className="max-w-5xl mx-auto bg-background-light py-16 sm:py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={slipeUp(0.3)}
              initial="initial"
              animate="animate"
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-5xl font-bold tracking-tight text-gray-900">
                Nuestro Equipo
              </h2>
              <p className="mt-4 text-gray-800 ">
                Conoce a nuestros apasionados entrenadores, expertos en
                comportamiento canino y dedicados a ayudar a cada perro a
                alcanzar su máximo potencial.
              </p>
            </motion.div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* ========== Lista de Entrenadores ========== */}
              {entrenadores.map((entrenador, index) => (
                <motion.div
                  variants={slipeDown(0.3)}
                  initial="initial"
                  animate="animate"
                >
                  <EntrenadorCard key={index} {...entrenador} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== Sección: Filosofía de Entrenamiento ========== */}
        <section className="py-8 sm:py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold tracking-tight text-gray-900 ">
                  Filosofía de Entrenamiento
                </h3>
                <p className="text-gray-800">
                  Nuestro enfoque se basa en el refuerzo positivo, utilizando
                  recompensas, elogios y juegos para motivar a tu perro a
                  aprender y comportarse de la mejor manera. Evitamos el uso de
                  métodos aversivos, ya que creemos que pueden dañar la relación
                  y generar miedo o ansiedad en tu mascota. Nos enfocamos en
                  crear un ambiente de aprendizaje divertido y seguro, donde tu
                  perro pueda prosperar y alcanzar su máximo potencial.
                </p>
              </div>
              <div
                className="h-64 rounded-xl bg-cover bg-center"
                style={{
                  backgroundImage: `url(${DogImage})`,
                }}
              ></div>
            </div>
          </div>
        </section>

        {/* ========== Sección: Nuestra Misión ========== */}
        <section className="mt-6 flex items-center justify-center">
          <div className=" max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Nuestra Misión
            </h2>
            <p className="mt-4 mx-auto text-base font-semibold md:text-lg text-gray-700">
              En PetSchool, nos dedicamos a fortalecer el vínculo entre tú y tu
              perro a través de un entrenamiento positivo y personalizado.
              Creemos en el poder de la comunicación y la comprensión mutua para
              crear una relación armoniosa y feliz.
            </p>
          </div>
        </section>

        {/* ========== Sección: Preguntas Frecuentes ========== */}
        <section className="py-8 sm:py-12">
          <div className="max-w-5xl mx-auto ">
            <div className="mx-auto">
              <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900">
                Preguntas Frecuentes
              </h2>
              <div className="mt-8 space-y-4 max-w-2xl mx-auto">
                {/* ========== Lista de Preguntas ========== */}
                {faqs.map((faq, index) => (
                  <FAQItem key={index} {...faq} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
};

export default EquipoPage;
