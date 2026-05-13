function Navbar() {

  const currentDate =
    new Date();

  const role =
    localStorage.getItem("role") || "User";

  return (

    <div className="navbar">

      <div>

        <h1 className="text-[26px] font-bold text-gray-900">

          AI Demand Forecasting

        </h1>

        <p className="text-gray-500 text-sm mt-1">

          Analytics & Prediction System

        </p>

      </div>

      <div className="text-right">

        <span className="bg-indigo-700 text-white px-8 py-6 rounded-xl text-sm font-semibold">

          {role}

        </span>

        <p className="text-gray-400 text-sm mt-3">

          {
            currentDate.toLocaleDateString()
          }

        </p>

      </div>

    </div>
  );
}

export default Navbar;