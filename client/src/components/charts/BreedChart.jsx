import React from "react";
import Chart from "react-apexcharts";

const BreedChart = ({ data }) => {
  const options = {
    chart: { type: "bar" },
    xaxis: {
      categories: data.map((item) => item.raza || item.label),
      title: { text: "Raza" },
    },
    title: { text: "Matrículas por raza" },
  };

  const series = [
    {
      name: "Cantidad",
      data: data.map((item) => item.total || item.count),
    },
  ];

  return <Chart options={options} series={series} type="bar" height={300} />;
};

export default BreedChart;

