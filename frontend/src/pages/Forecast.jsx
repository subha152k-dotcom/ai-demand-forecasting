import { useState } from "react";

import toast from "react-hot-toast";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ForecastChart from "../components/ForecastChart";

import { generateForecast } from "../services/forecastService";

function Forecast() {

  const [prediction, setPrediction] = useState(null);

  const [history, setHistory] = useState([]);

  const [chartData, setChartData] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleForecast = async () => {

    try {

      setLoading(true);

      const response =
        await generateForecast();

      setPrediction(
        response.data
      );

      setHistory([
        ...history,
        response.data
      ]);

      setChartData([
        {
          month: "Current",
          sales: 30000,
        },
        {
          month: "Next",
          sales:
            response.data.predicted_sales,
        },
      ]);

      toast.success(
        "Forecast Generated"
      );

    } catch (error) {

      toast.error(
        "Forecast Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="page-layout">

      <Sidebar />

      <div className="page-content">

        <Navbar />

        <div className="mb-8">

          <h1 className="page-title">

            AI Forecast Prediction

          </h1>

          <p className="page-subtitle">

            Generate AI sales predictions

          </p>

        </div>

        <div className="card max-w-4xl">

          <button
            onClick={handleForecast}
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold"
          >

            {
              loading
                ? "Generating..."
                : "Generate Forecast"
            }

          </button>

          {
            prediction && (

              <>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

                  <div className="bg-gray-100 p-6 rounded-3xl min-h-[150px] flex flex-col justify-center items-center text-center">

                    <h2 className="text-gray-500 text-sm">

                      Forecast Month

                    </h2>

                    <p className="text-2xl font-bold mt-3">

                      {prediction.next_month}

                    </p>

                  </div>

                  <div className="bg-gray-100 p-6 rounded-3xl min-h-[150px] flex flex-col justify-center items-center text-center">

                    <h2 className="text-gray-500 text-sm">

                      Predicted Sales

                    </h2>

                    <p className="text-2xl font-bold mt-3">

                      ₹{
                        prediction.predicted_sales
                      }

                    </p>

                  </div>

                  <div className="bg-gray-100 p-6 rounded-3xl min-h-[150px] flex flex-col justify-center items-center text-center">

                    <h2 className="text-gray-500 text-sm">

                      Forecast Status

                    </h2>

                    <p className="text-2xl font-bold text-green-600 mt-3">

                      Success

                    </p>

                  </div>

                </div>

                <div className="mt-8">

                  <h2 className="text-2xl font-bold mb-5">

                    Prediction Result

                  </h2>

                  <div className="space-y-3 text-gray-700">

                    <p>

                      <span className="font-semibold">

                        File:

                      </span>{" "}

                      {
                        prediction.uploaded_file
                      }

                    </p>

                    <p>

                      <span className="font-semibold">

                        Next Month:

                      </span>{" "}

                      {prediction.next_month}

                    </p>

                    <p className="text-xl font-bold text-indigo-600">

                      Predicted Sales:

                      {" "}

                      ₹{
                        prediction.predicted_sales
                      }

                    </p>

                  </div>

                </div>

              </>

            )
          }
          

        </div>
        <br /><br /><br />

        {
          history.length > 0 && (

            <div className="card mt-8 overflow-x-auto">

              <h2 className="text-2xl font-bold mb-6">

                Forecast History

              </h2>

              <table>

                <thead>

                  <tr>

                    <th>
                      File
                    </th>

                    <th>
                      Month
                    </th>

                    <th>
                      Predicted Sales
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    history.map((item, index) => (

                      <tr key={index}>

                        <td>
                          {
                            item.uploaded_file
                          }
                        </td>

                        <td>
                          {item.next_month}
                        </td>

                        <td>
                          ₹{
                            item.predicted_sales
                          }
                        </td>

                      </tr>
                    ))
                  }

                </tbody>

              </table>

            </div>
          )
        } <br /><br /> 

        {
          chartData.length > 0 && (

            <div className="mt-8">

              <ForecastChart
                data={chartData}
              />

            </div>
          )
        }
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        <Footer />

      </div>

    </div>
  );
}

export default Forecast;