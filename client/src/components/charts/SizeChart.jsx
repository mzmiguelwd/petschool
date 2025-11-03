import React from "react";
import Chart from "react-apexcharts";

const SizeChart = ({ data }) => {
  const options = {
    chart: { type: "pie" },
    labels: data.map((item) => item.tamano || item.label),
    title: { text: "Matrículas por tamaño" },
  };

  const series = data.map((item) => item.total || item.count);

  return <Chart options={options} series={series} type="pie" height={300} />;
};

export default SizeChart;
