import { landingCourses, landingReviews } from "../data/landingData";

import NavbarLanding from "../components/NavbarLanding";
import Hero from "../components/Hero";
import LandingCourseCard from "../components/LandingCourseCard";
import LandingReviewCard from "../components/LandingReviewCard";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="bg-gray-50">
      <NavbarLanding />
      <Hero />

      {/* --- Courses Section --- */}
      <section className="my-16">
        <div className="px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nuestros Cursos
          </h2>
          <div className="grid gap-10 px-5 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {landingCourses.map((card, index) => (
              <LandingCourseCard key={index} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* --- Testimonials Section --- */}
      <section className="my-28">
        <div className="px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Testimonios</h2>
          <div className="grid gap-10 px-5 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {landingReviews.map((review, index) => (
              <LandingReviewCard key={index} review={review} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
