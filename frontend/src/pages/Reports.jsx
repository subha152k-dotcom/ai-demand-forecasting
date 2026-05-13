import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Reports() {

  const downloadSalesReport = () => {

    window.open(
      "http://127.0.0.1:8000/download-report"
    );
  };

  const downloadForecastHistory = () => {

    window.open(
      "http://127.0.0.1:8000/export-forecast-history"
    );
  };

  return (

    <div className="page-layout">

      <Sidebar />

      <div className="page-content">

        <Navbar />

        <div className="mb-8">

          <h1 className="page-title">

            Reports Center

          </h1>

          <p className="page-subtitle">

            Download and manage AI reports

          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="card">

            <h2 className="text-2xl font-bold text-gray-800 mb-3">

              Sales Report

            </h2>

            <p className="text-gray-500 mb-6">

              Download monthly sales report
              in Excel format.

            </p>

            <button
              onClick={downloadSalesReport}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl font-semibold"
            >

              Download Report

            </button>

          </div>
         

          <div className="card">

            <h2 className="text-2xl font-bold text-gray-800 mb-3">

              Forecast History

            </h2>

            <p className="text-gray-500 mb-6">

              Export AI prediction history
              report.

            </p>

            <button
              onClick={downloadForecastHistory}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-3 rounded-xl font-semibold"
            >

              Export Forecast

            </button>

          </div>
<br />
        </div>

        <div className="card mt-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">

            Report Summary

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div className="bg-gray-100 p-5 rounded-2xl">

              <h3 className="text-gray-500 text-sm">

                Total Reports

              </h3>

              <p className="text-3xl font-bold mt-3">

                24

              </p>

            </div>

            <div className="bg-gray-100 p-5 rounded-2xl">

              <h3 className="text-gray-500 text-sm">

                Forecast Exports

              </h3>

              <p className="text-3xl font-bold mt-3">

                18

              </p>

            </div>

            <div className="bg-gray-100 p-5 rounded-2xl">

              <h3 className="text-gray-500 text-sm">

                Active Reports

              </h3>

              <p className="text-3xl font-bold mt-3">

                12

              </p>
              

            </div>

          </div>

        </div>
        <br /><br /><br /><br /><br />

        <Footer />

      </div>

    </div>
  );
}

export default Reports;