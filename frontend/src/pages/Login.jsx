import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import toast from "react-hot-toast";

import { loginUser } from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {

      navigate("/dashboard");
    }

  }, [navigate]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await loginUser(formData);

      const token =
        response.data.access_token;

      localStorage.setItem(
        "token",
        token
      );

      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      localStorage.setItem(
        "role",
        payload.role || "user"
      );

      toast.success("Login Success");

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.detail ||
        "Login Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 px-5">

      <div className="w-full max-w-xl bg-white/90 backdrop-blur-lg rounded-[32px] shadow-2xl p-10 border border-white/40">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">

            AI Forecast

          </h1>

          <p className="text-gray-500 mt-3 text-lg">

            Login to continue

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="text-sm font-semibold text-gray-600 block mb-2">

              Email

            </label>

            <input
              type="email"
              name="username"
              placeholder="Enter your email"
              value={formData.username}
              onChange={handleChange}
              className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-purple-500 outline-none transition-all"
              required
            />

          </div>

          <div>

            <label className="text-sm font-semibold text-gray-600 block mb-2">

              Password

            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-purple-500 outline-none transition-all"
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >

            {
              loading
                ? "Logging in..."
                : "Login"
            }

          </button>

        </form>

        <p className="text-center text-gray-500 mt-8">

          Don’t have an account?

          <Link
            to="/register"
            className="text-purple-600 font-semibold ml-2 hover:underline"
          >

            Register

          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;