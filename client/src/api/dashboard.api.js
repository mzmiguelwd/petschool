import axios from "axios";

const API_URL = "http://localhost:8000/api/dashboard"; 

export const getDashboardData = async () => {
  const response = await axios.get(`${API_URL}/director/`);
  return response.data;
};

export const downloadCSV = async (tipo) => {
  const response = await axios.get(`${API_URL}/reporte/${tipo}/`, {
    responseType: "blob", // importante para descargas
  });

  // Crear descarga
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `reporte_${tipo}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
