import API from "./api";

export const registerUser = async (
  userData
) => {

  return await API.post(
    "/register",
    userData
  );
};

export const loginUser = async (
  formData
) => {

  const params =
    new URLSearchParams();

  params.append(
    "username",
    formData.username
  );

  params.append(
    "password",
    formData.password
  );

  return await API.post(
    "/login",
    params,
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  );
};