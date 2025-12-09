import React, { useMemo } from "react";
import Chart from "react-apexcharts";

const UsersChart = ({ data = [] }) => {
  const formatted = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  if (formatted.length === 0) {
    return (
      <section className="w-full p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Usuarios por rol</h3>
        <p className="text-sm text-gray-600">No hay datos disponibles</p>
      </section>
    );
  }

  // Datos formateados
  const roles = formatted.map((item) => item.role);
  const counts = formatted.map((item) => item.count);
  const colors = formatted.map((item) => item.color || "#82ca9d");

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true, // Permite color por barra
      },
    },
    colors: colors,
    xaxis: {
      categories: roles,
      labels: { style: { colors: "#333", fontSize: "14px" } },
    },
    yaxis: {
      labels: { style: { colors: "#333", fontSize: "14px" } },
      decimalsInFloat: 0,
    },
    tooltip: {
      y: {
        formatter: (value) => `${value} usuarios`,
      },
    },
    legend: { show: false }, // Cada barra tiene color distinto, no se usa legend
    grid: {
      borderColor: "#e0e0e0",
      strokeDashArray: 3,
    },
  };

  const series = [
    {
      name: "Total Usuarios",
      data: counts,
    },
  ];

  return (
    <section className="w-full bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Usuarios por rol</h3>

      <Chart
        options={chartOptions}
        series={series}
        type="bar"
        height={300}
      />
    </section>
  );
};

export default UsersChart;
