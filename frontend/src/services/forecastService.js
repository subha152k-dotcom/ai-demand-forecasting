import API from "./api";

export const generateForecast = async () => {

  return await API.post(
    "/forecast",
    {}
  );
};