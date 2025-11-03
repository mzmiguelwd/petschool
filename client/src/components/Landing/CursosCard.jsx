const CursosPageCard = ({
  titulo,
  descripcion,
  precio,
  imagenUrl,
  textoBoton,
  onButtonClick,
}) => {
  const backgroundStyle = {
    backgroundImage: `url("${imagenUrl}")`,
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white/50  p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Columna de Imagen */}
      <div
        className="md:w-1/3 h-56 md:h-auto rounded-lg bg-cover bg-center"
        style={backgroundStyle}
      ></div>

      {/* Columna de Contenido */}
      <div className="flex flex-col justify-between md:w-2/3">
        <div>
          <h3 className="text-xl font-bold text-black ">{titulo}</h3>
          <p className="mt-2 text-black/70 ">{descripcion}</p>
        </div>

        {/* Detalles y Botón */}
        <div className="mt-4 flex items-center gap-4">
          <span className="text-sm text-black/50 ">{precio}</span>
          <button
            className="ml-auto bg-primary  font-bold text-sm px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
            onClick={onButtonClick} // Permite manejar la acción del botón
          >
            {textoBoton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CursosPageCard;
