import { cursos } from "../components/Landing/data";

import NavbarLanding from "../components/NavbarLanding";
import Footer from "../components/Footer";
import CursosPageCard from "../components/Landing/CursosPageCard";

const CursosPage = () => {
  return (
    <div className="bg-gray-50">
      <NavbarLanding />

      <main className="flex-grow mt-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            {/* Título y Subtítulo */}
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black ">
                Cursos y Programas
              </h2>
              <p className="mt-4 text-lg text-black/90 max-w-2xl mx-auto">
                Encuentra el entrenamiento perfecto para tu compañero canino.
              </p>
              <p className=" text-lg text-black/90 max-w-3xl mx-auto font-bold">
                <span className="text-[var(--primary-button)]">Regístrate</span>{" "}
                o{" "}
                <span className="text-[var(--primary-button)]">
                  inicia sesión
                </span>{" "}
                para matricular a tu canino en el curso de tu preferencia.
              </p>
            </div>

            {/* Lista de Cursos */}
            <div className="grid gap-8">
              {cursos.map((curso) => (
                <CursosPageCard
                  key={curso.id}
                  titulo={curso.titulo}
                  descripcion={curso.descripcion}
                  duracion={curso.duracion}
                  precio={curso.precio}
                  imagenUrl={curso.imagenUrl}
                  textoBoton={curso.textoBoton}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CursosPage;
