const MatriculaList = ({ matriculas, onEdit, onDelete }) => {
  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Mis Matrículas</h3>
      {matriculas.length === 0 ? (
        <p className="text-gray-600 text-center py-8">
          No tienes matrículas registradas
        </p>
      ) : (
        <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {matriculas.map((matricula) => (
            <div
              key={matricula.id}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-transform"
            >
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                {matricula.nombre_perro}
              </h4>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Raza:</span> {matricula.raza}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Edad:</span> {matricula.edad}{" "}
                años
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Servicio:</span>{" "}
                {matricula.servicio}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Estado:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                    matricula.estado === "aprobada"
                      ? "bg-green-100 text-green-800"
                      : matricula.estado === "rechazada"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {matricula.estado}
                </span>
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => onEdit(matricula)}
                  className="py-2 px-4 rounded-[6px] text-sm font-medium text-[var(--primary-button)] border-1 cursor-pointer transition-all duration-300 hover:bg-[var(--primary-button)]/10"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(matricula.id)}
                  className="py-2 px-4 rounded-[6px] text-sm font-medium text-red-600 border border-red-600 cursor-pointer transition-all duration-300 hover:bg-red-50"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatriculaList;
