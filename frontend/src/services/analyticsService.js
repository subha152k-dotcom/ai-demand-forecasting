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