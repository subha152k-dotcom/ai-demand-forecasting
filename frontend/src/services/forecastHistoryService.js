import API from "./api";

export const getForecastHistory = async () => {

  return await API.get(
    "/forecast-history"
  );
};