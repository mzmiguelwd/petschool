const EntrenadorCard = ({ name, title, imageUrl }) => {
  return (
    <div className="text-center">
      <div
        className="mx-auto h-32 w-32 rounded-full bg-cover bg-center"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      ></div>
      <h3 className="mt-4 text-lg font-bold text-gray-900 ">{name}</h3>
      <p className="mt-1 text-sm text-gray-600 ">{title}</p>
    </div>
  );
};

export default EntrenadorCard;
