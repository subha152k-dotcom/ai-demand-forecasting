import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { getForecastHistory } from "../services/forecastHistoryService";

function ForecastHistory() {

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {

      const response =
        await getForecastHistory();

      setHistory(
        response.data.forecast_history || []
      );

    } catch (error) {

      console.log(error);

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

            Forecast History

          </h1>

          <p className="page-subtitle">

            View generated forecast reports

          </p>

        </div>

        <div className="card overflow-x-auto">

          {
            loading ? (

              <Loader />

            ) : history.length === 0 ? (

              <div className="bg-gray-50 rounded-2xl p-10 text-center">

                <h2 className="text-2xl font-bold">

                  No Forecast History

                </h2>

                <p className="text-gray-500 mt-3">

                  Generate forecasts to see history

                </p>

              </div>

            ) : (

              <table>

                <thead>

                  <tr>

                    <th>
                      Uploaded File
                    </th>

                    <th>
                      Forecast Month
                    </th>

                    <th>
                      Predicted Sales
                    </th>

                    <th>
                      Created At
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    history.map((item) => (

                      <tr key={item.id}>

                        <td>
                          {item.uploaded_file}
                        </td>

                        <td>
                          {item.forecast_month}
                        </td>

                        <td className="font-semibold text-indigo-600">

                          ₹{item.predicted_sales}

                        </td>

                        <td>

                          {
                            new Date(
                              item.created_at
                            ).toLocaleString()
                          }

                        </td>

                      </tr>
                    ))
                  }

                </tbody>

              </table>

            )
          }

        </div>
<br /><br /><br /><br /><br />
        <Footer />

      </div>

    </div>
  );
}

export default ForecastHistory;