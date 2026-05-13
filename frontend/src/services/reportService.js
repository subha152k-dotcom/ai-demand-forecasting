import API from "./api";

export const downloadSalesReport = async () => {

  return await API.get(
    "/download-report",
    {
      responseType: "blob",
    }
  );
};

export const exportForecastHistory = async () => {

  return await API.get(
    "/export-forecast-history",
    {
      responseType: "blob",
    }
  );
};