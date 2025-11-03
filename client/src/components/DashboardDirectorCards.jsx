const DashboardCards = ({ stats }) => {
  const cards = [
    { title: "Total Matrículas", value: stats.totalMatriculas || 0 },
    { title: "Razas Registradas", value: stats.totalRazas || 0 },
    { title: "Planes Activos", value: stats.totalPlanes || 0 },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 my-6">
      {cards.map((c, i) => (
        <div key={i} className="bg-white shadow-md rounded-xl p-4 text-center">
          <h3 className="text-gray-600">{c.title}</h3>
          <p className="text-2xl font-bold text-blue-600">{c.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
