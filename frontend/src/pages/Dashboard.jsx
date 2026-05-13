import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import Charts from "../components/Charts";
import Loader from "../components/Loader";

import { getDashboardAnalytics } from "../services/analyticsService";

function Dashboard() {

  const [analytics, setAnalytics] =
    useState(null);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const response =
        await getDashboardAnalytics();

      setAnalytics(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="page-layout">

      <Sidebar />

      <div className="page-content">

        <Navbar />

        <div className="mb-8">

          <h1 className="page-title">

            Dashboard

          </h1>

          <p className="page-subtitle">

            Overview of your AI demand forecasting system

          </p>

        </div>

        {
          analytics ? (

            <>

              <div className="summary-grid">

                <SummaryCard
                  title="Total Sales"
                  value={`₹${analytics.total_sales}`}
                  color="bg-gradient-to-r from-indigo-500 to-purple-600"
                />

                <SummaryCard
                  title="Forecast Accuracy"
                  value={analytics.forecast_accuracy}
                  color="bg-gradient-to-r from-pink-500 to-rose-500"
                />

                <SummaryCard
                  title="Top Product"
                  value={analytics.top_products[0]}
                  color="bg-gradient-to-r from-cyan-500 to-blue-500"
                />

                <SummaryCard
                  title="Monthly Sales"
                  value={`₹${analytics.monthly_sales[0].sales}`}
                  color="bg-gradient-to-r from-emerald-500 to-green-500"
                />

              </div>
              <br /><br /><br />

              <div className="card mt-8">

                <Charts
                  data={analytics.monthly_sales}
                />

              </div>
<br /><br /><br /><br />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                <div className="card">

                  <h2 className="text-gray-500 text-sm font-medium">

                    Active Forecast Models

                  </h2>

                  <p className="text-4xl font-bold text-indigo-600 mt-4">

                    12

                  </p>

                </div>

                <div className="card">

                  <h2 className="text-gray-500 text-sm font-medium">

                    Uploaded Datasets

                  </h2>

                  <p className="text-4xl font-bold text-pink-600 mt-4">

                    28

                  </p>

                </div>

                <div className="card">

                  <h2 className="text-gray-500 text-sm font-medium">

                    Forecast Reports

                  </h2>

                  <p className="text-4xl font-bold text-green-600 mt-4">

                    45

                  </p>

                </div>

              </div>

            </>

          ) : (

            <Loader />

          )
        }

      </div>

    </div>
  );
}

export default Dashboard;