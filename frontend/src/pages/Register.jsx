import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import toast from "react-hot-toast";

import { registerUser } from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

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

      await registerUser(formData);

      toast.success("Registration Success");

      navigate("/");

    } catch (error) {

      toast.error(
        error.response?.data?.detail ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 px-5">

      <div className="w-full max-w-xl bg-white/90 backdrop-blur-lg rounded-[32px] shadow-2xl p-10 border border-white/40">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">

            Create Account

          </h1>

          <p className="text-gray-500 mt-3 text-md">

            Register to continue

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-purple-500 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-purple-500 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-purple-500 outline-none"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-purple-500 outline-none"
          >

            <option value="user">
              User
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >

            {
              loading
                ? "Registering..."
                : "Register"
            }

          </button>

        </form>

        <p className="text-center text-gray-500 mt-8">

          Already have an account?

          <Link
            to="/"
            className="text-purple-600 font-semibold ml-2 hover:underline"
          >

            Login

          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;