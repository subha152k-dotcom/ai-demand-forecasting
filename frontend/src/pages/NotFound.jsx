import { Link } from "react-router-dom";

function NotFound() {

  return (

    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-5">

      <h1 className="text-8xl font-bold text-black">
        404
      </h1>

      <p className="text-gray-500 mt-3 text-xl text-center">
        Page Not Found
      </p>

      <p className="text-gray-400 mt-2 text-center">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/dashboard"
        className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Go Dashboard
      </Link>

    </div>
  );
}

export default NotFound;