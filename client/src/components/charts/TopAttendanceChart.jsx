import React from "react";
import Chart from "react-apexcharts";

const TopAttendanceChart = ({ data }) => {
  const options = {
    chart: { type: "bar" },
    xaxis: {
      categories: data.map((item) => item.nombre_canino),
      title: { text: "Canino" },
    },
    title: { text: "Top 5 Caninos con Mayor Asistencia" },
  };

  const series = [
    {
      name: "Asistencias",
      data: data.map((item) => item.total_asistencias),
    },
  ];

  return <Chart options={options} series={series} type="bar" height={300} />;
};

export default TopAttendanceChart;

