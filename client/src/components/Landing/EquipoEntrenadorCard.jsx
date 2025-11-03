const EntrenadorCard = ({ nombre, titulo, imagenUrl }) => {
  return (
    <div className="text-center">
      <div
        className="mx-auto h-32 w-32 rounded-full bg-cover bg-center"
        style={{ backgroundImage: `url("${imagenUrl}")` }}
      ></div>
      <h3 className="mt-4 text-lg font-bold text-gray-900 ">{nombre}</h3>
      <p className="mt-1 text-sm text-gray-600 ">{titulo}</p>
    </div>
  );
};

export default EntrenadorCard;
