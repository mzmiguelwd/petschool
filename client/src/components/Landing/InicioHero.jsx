import { motion } from "motion/react";
import { slipeUp } from "./utils/animations";
import { Link } from "react-router-dom";
import { Button3 } from "../../components/Buttons";

import HeroFondo from "../../assets/hero-fondo.png";

const bgImage = {
  backgroundImage: `linear-gradient(rgba(25, 34, 16, 0.7) 0%, rgba(25, 34, 16, 0.7) 100%), url(${HeroFondo})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
};

const MotionLink = motion.create(Link);

const InicioHero = () => {
  return (
    <section
      style={bgImage}
      className="relative flex items-center justify-center overflow-hidden h-[80vh] mt-15"
    >
      <div className="w-3/4">
        {/* --- Title --- */}
        <motion.h1
          className=" text-[white] text-5xl font-extrabold"
          variants={slipeUp(0.3)}
          initial="initial"
          animate="animate"
        >
          Educación Canina de Élite: Más que un colegio, un futuro feliz para tu
          mascota.
        </motion.h1>

        {/* --- Paragraph --- */}
        <motion.p
          className="text-[white] text-xl font-medium pt-6 pb-4"
          variants={slipeUp(0.5)}
          initial="initial"
          animate="animate"
        >
          Ofrecemos cursos de entrenamiento personalizados para perros de todas
          las edades y razas. Nuestros instructores expertos utilizan métodos
          positivos y basados en recompensas para ayudar a tu perro a alcanzar
          su máximo potencial.
        </motion.p>

        {/* --- Button Container --- */}
        <div className="flex justify-around">
          <MotionLink
            to="/cursos"
            variants={slipeUp(0.7)}
            initial="initial"
            animate="animate"
          >
            <Button3 text="Ver Cursos" />
          </MotionLink>
        </div>
      </div>
    </section>
  );
};

export default InicioHero;
