import React from "react";
import Chart from "react-apexcharts";

const AttendanceChart = ({ data }) => {

  const categories = data.map((item) => item.nombre_canino);
  const asistencias = data.map((item) => item.total_asistencias);

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    title: {
      text: "Asistencias por canino",
      align: "center",
      style: { fontSize: "18px", fontWeight: "bold" },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
      },
    },
    xaxis: {
      categories,
      title: { text: "Número de asistencias" },
    },
    colors: ["#008FFB"],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
      },
    },
  };

  const series = [
    {
      name: "Asistencias",
      data: asistencias,
    },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default AttendanceChart;
