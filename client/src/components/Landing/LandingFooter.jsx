import { socials } from "../landing/data";

const LandingFooter = () => {
  return (
    <section className="flex items-center py-4 bg-gray-300/30 font-medium text-gray-500">
      <div className="flex-1"></div>
      {/* --- Center content --- */}
      <div className="flex-2 text-center">
        <p>© 2025 PetSchool. Todos los derechos reservados.</p>
      </div>

      {/* --- Right flexible container --- */}
      <div className="flex flex-1 justify-end">
        <ul className="flex space-x-4 mx-16">
          {socials.map((link) => {
            return (
              <li key={link.id}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={link.link}
                  className="inline-block transform transition-transform duration-300 hover:scale-125"
                >
                  <i
                    className={`${link.icon} text-lg sm:text-2xl text-gray-700 transition-all duration-300 hover:text-[var(--primary-color)]`}
                  ></i>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default LandingFooter;
