import API from "./api";

const authHeader = () => {

  return {
    headers: {
      Authorization:
        `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

export const getDatasetHistory = async () => {

  return await API.get(
    "/dataset-history",
    authHeader()
  );
};