import React from "react";

const PetsChart = ({ data }) => {
  if (!data || data.length === 0)
    return <p className="mt-15">No hay datos disponibles</p>;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Canino
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Plan
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Inicio
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Vence
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
              Estado pago
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.map((item, idx) => (
            <tr key={idx} className={idx % 2 ? "bg-gray-50" : ""}>
              <td className="px-4 py-3 text-sm text-gray-800">
                {item.nombre_canino ?? "—"}
              </td>
              <td className="px-4 py-3 text-sm text-gray-800">
                {item.plan ?? "—"}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {item.fecha_inicio ?? "—"}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {item.fecha_vencimiento ?? "—"}
              </td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    (item.estado_pago || "pendiente").toLowerCase() === "pagado"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {item.estado_pago ?? "Pendiente"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetsChart;
