import {
  LayoutDashboard,
  BarChart3,
  Upload,
  Database,
  Brain,
  History,
  FileText,
  LogOut,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const location = useLocation();
  const role =
  localStorage.getItem("role");

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };

  const menuItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },

    {
  name: "Analytics",
  path: "/analytics",
  icon: <BarChart3 size={20} />,
  adminOnly: true,
},,

    {
      name: "Upload Dataset",
      path: "/upload-dataset",
      icon: <Upload size={20} />,
    },

    {
      name: "Dataset History",
      path: "/dataset-history",
      icon: <Database size={20} />,
    },

    {
      name: "Forecast",
      path: "/forecast",
      icon: <Brain size={20} />,
    },

    {
      name: "Forecast History",
      path: "/forecast-history",
      icon: <History size={20} />,
    },

    {
  name: "Reports",
  path: "/reports",
  icon: <FileText size={20} />,
  adminOnly: true,
},,
  ];
  <br />

  return (

    <aside className="sidebar">

      <div>

        <h1 className="text-3xl font-extrabold text-white mb-10">

          AI Forecast

        </h1>
        <br /><br /><br />

       <div className="flex flex-col gap-8 mt-4">

          {
            menuItems
  .filter(
    (item) =>
      !item.adminOnly ||
      role === "admin"
  )
  .map((item) => (

              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-7 px-5 py-4 rounded-xl text-[15px] font-medium transition-all duration-300 ${
                  location.pathname === item.path

                    ? "bg-white text-indigo-700"

                    : "text-white hover:bg-white/10"
                }`}
              >

                {item.icon}

                {item.name}

              </Link>
            ))
          }

        </div>

      </div>
<br /> <br /><br /><br /><br /><br /><br /><br /><br />
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-semibold"
      >

        <LogOut size={18} />

        Logout

      </button>

    </aside>
  );
}

export default Sidebar;