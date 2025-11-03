import { inicioCursos, testimonios } from "../../components/landing/data";

import LandingHeader from "../../components/landing/LandingHeader";
import LandingFooter from "../../components/landing/LandingFooter";
import InicioHero from "../../components/landing/InicioHero";
import InicioCourseCard from "../../components/landing/InicioCourseCard";
import InicioReviewCard from "../../components/landing/InicioReviewCard";

const InicioPage = () => {
  return (
    <div className="bg-gray-50">
      <LandingHeader />

      {/* ========== Sección: Hero ========== */}
      <InicioHero />

      {/* ========== Sección: Cursos ========== */}
      <section className="my-16">
        <div className="px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nuestros Cursos
          </h2>
          <div className="grid gap-10 px-5 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {inicioCursos.map((card, index) => (
              <InicioCourseCard key={index} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== Sección: Testimonios ========== */}
      <section className="my-28">
        <div className="px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Testimonios</h2>
          <div className="grid gap-10 px-5 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {testimonios.map((review, index) => (
              <InicioReviewCard key={index} review={review} />
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default InicioPage;
