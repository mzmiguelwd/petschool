import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // Obtiene la ubicación actual (pathname, search, hash, etc.)
  const { pathname } = useLocation();

  // useEffect se ejecuta cada vez que 'pathname' cambia
  useEffect(() => {
    // Esto desplaza la ventana a la parte superior (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]); // Dependencia: re-ejecutar cuando la ruta cambie

  // Este componente no renderiza nada visible, solo maneja el efecto
  return null;
};

export default ScrollToTop;
