import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

import {
  getDashboardAnalytics,
  getForecastInsights,
  getReportSummary,
} from "../services/advancedAnalyticsService";

function Analytics() {

  const [analytics, setAnalytics] = useState(null);

  const [insights, setInsights] = useState([]);

  const [summary, setSummary] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const analyticsResponse =
        await getDashboardAnalytics();

      const insightsResponse =
        await getForecastInsights();

      const summaryResponse =
        await getReportSummary();

      setAnalytics(
        analyticsResponse.data || {}
      );

      setInsights(
        insightsResponse.data?.insights || []
      );

      setSummary(
        summaryResponse.data?.report_summary || {}
      );

    } catch (error) {

      console.log(error);

      setAnalytics({
        forecast_accuracy: "94%",
        total_sales: "250000",
        top_products: ["Milk"],
      });

      setInsights([
        "Milk demand increased by 24%",
        "Rice sales stable this month",
        "Forecast accuracy improved",
      ]);

      setSummary({
        total_uploaded_datasets: 28,
        total_forecasts_generated: 45,
        forecast_accuracy: "94%",
        top_selling_product: "Milk",
      });

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (

      <div className="page-layout">

        <Sidebar />

        <div className="page-content">

          <Navbar />

          <Loader />

        </div>

      </div>
    );
  }

  return (

    <div className="page-layout">

      <Sidebar />

      <div className="page-content">

        <Navbar />

        <div className="mb-8">

          <h1 className="page-title">

            Advanced Analytics

          </h1>

          <p className="page-subtitle">

            AI insights and business analytics

          </p>

        </div>

        <div className="summary-grid">

          <SummaryCard
            title="Forecast Accuracy"
            value={
              analytics?.forecast_accuracy
            }
            color="bg-gradient-to-r from-indigo-500 to-purple-600"
          />

          <SummaryCard
            title="Monthly Revenue"
            value={`₹${analytics?.total_sales}`}
            color="bg-gradient-to-r from-pink-500 to-rose-500"
          />

          <SummaryCard
            title="Top Products"
            value={
              analytics?.top_products?.[0] ||
              "N/A"
            }
            color="bg-gradient-to-r from-cyan-500 to-blue-500"
          />

          <SummaryCard
            title="Demand Growth"
            value="28%"
            color="bg-gradient-to-r from-emerald-500 to-green-500"
          />

        </div>
        <br /><br />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

          <div className="card">

            <h2 className="text-2xl font-bold mb-5">

              Demand Insights

            </h2>

            <ul className="space-y-3 text-gray-600">

              {
                insights.map((item, index) => (

                  <li key={index}>

                    • {item}

                  </li>
                ))
              }

            </ul>

          </div>
          

          <div className="card">

            <h2 className="text-2xl font-bold mb-5">

              Inventory Suggestions

            </h2>

            <ul className="space-y-3 text-gray-600">

              <li>
                • Restock top selling products
              </li>

              <li>
                • Increase seasonal inventory
              </li>

              <li>
                • Reduce low-demand items
              </li>

            </ul>

          </div>

        </div>
<br /><br />
        <div className="card mt-8">

          <h2 className="text-2xl font-bold mb-6">

            KPI Metrics

          </h2>
          <br /><br />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">

            <div className="bg-gray-100 p-5 rounded-2xl">
              

              <h3 className="text-gray-500 text-sm">

                Total Products

              </h3>

              <p className="text-3xl font-bold mt-3">

                125

              </p>

            </div>
           

            <div className="bg-gray-100 p-5 rounded-2xl">

              <h3 className="text-gray-500 text-sm">

                Active Datasets

              </h3>

              <p className="text-3xl font-bold mt-3">

                {
                  summary?.total_uploaded_datasets
                }

              </p>

            </div>
            

            <div className="bg-gray-100 p-5 rounded-2xl">

              <h3 className="text-gray-500 text-sm">

                Forecast Models

              </h3>

              <p className="text-3xl font-bold mt-3">

                {
                  summary?.total_forecasts_generated
                }

              </p>

            </div>
           

            <div className="bg-gray-100 p-5 rounded-2xl">

              <h3 className="text-gray-500 text-sm">

                Success Rate

              </h3>

              <p className="text-3xl font-bold mt-3">

                {
                  summary?.forecast_accuracy
                }

              </p>

            </div>

            <div className="bg-gray-100 p-5 rounded-2xl">

              <h3 className="text-gray-500 text-sm">

                Growth Rate

              </h3>

              <p className="text-3xl font-bold mt-3">

                18%

              </p>

            </div>

          </div>

        </div>
<br /><br />
        <div className="card mt-8 overflow-x-auto">

          <h2 className="text-2xl font-bold mb-6">

            Top Products

          </h2>

          <table>

            <thead>

              <tr>

                <th>
                  Product
                </th>

                <th>
                  Sales
                </th>

                <th>
                  Demand Score
                </th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td>
                  Milk
                </td>

                <td>
                  1200
                </td>

                <td>
                  95
                </td>

              </tr>

              <tr>

                <td>
                  Rice
                </td>

                <td>
                  950
                </td>

                <td>
                  90
                </td>

              </tr>

            </tbody>

          </table>

        </div>

        <div className="card mt-8">

          <h2 className="text-2xl font-bold mb-6">

            Business Recommendations

          </h2>

          <div className="space-y-4">

            <div className="bg-gray-100 p-5 rounded-2xl">

              Increase Milk inventory

            </div>

            <div className="bg-gray-100 p-5 rounded-2xl">

              Promote seasonal products

            </div>

            <div className="bg-gray-100 p-5 rounded-2xl">

              Improve forecasting cycle

            </div>

          </div>

        </div>
<br /><br />
        <div className="bg-gradient-to-r from-indigo-950 to-purple-900 text-white p-8 rounded-[28px] shadow mt-8">

          <h2 className="text-2xl font-bold mb-8">

            Executive Summary

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div>

              <p className="text-gray-300 text-sm">

                Uploaded Datasets

              </p>

              <h3 className="text-2xl font-bold mt-2">

                {
                  summary?.total_uploaded_datasets
                }

              </h3>

            </div>

            <div>

              <p className="text-gray-300 text-sm">

                Forecast Accuracy

              </p>

              <h3 className="text-2xl font-bold mt-2">

                {
                  summary?.forecast_accuracy
                }

              </h3>

            </div>

            <div>

              <p className="text-gray-300 text-sm">

                Top Product

              </p>

              <h3 className="text-2xl font-bold mt-2">

                {
                  summary?.top_selling_product
                }

              </h3>

            </div>

            <div>

              <p className="text-gray-300 text-sm">

                Forecast Reports

              </p>

              <h3 className="text-2xl font-bold mt-2">

                {
                  summary?.total_forecasts_generated
                }

              </h3>

            </div>

          </div>

        </div>

        <Footer />

      </div>

    </div>
  );
}

export default Analytics;