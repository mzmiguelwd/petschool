import React from "react";
import Chart from "react-apexcharts";

const PlanChart = ({ data }) => {
  const options = {
    chart: { type: "donut" },
    labels: data.map((item) => item.plan),
    title: { text: "Ocupación por plan (%)" },
  };

  const series = data.map((item) => item.porcentaje);

  return <Chart options={options} series={series} type="donut" height={300} />;
};

export default PlanChart;

