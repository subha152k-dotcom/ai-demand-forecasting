import API from "./api";

const authHeader = () => {

  return {
    headers: {
      Authorization:
        `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

export const getDashboardAnalytics = async () => {

  return await API.get(
    "/dashboard-analytics",
    authHeader()
  );
};

export const getForecastInsights = async () => {

  return await API.get(
    "/forecast-insights",
    authHeader()
  );
};

export const getReportSummary = async () => {

  return await API.get(
    "/report-summary",
    authHeader()
  );
};