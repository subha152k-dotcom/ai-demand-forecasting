import { useState } from "react";

import toast from "react-hot-toast";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { uploadDataset } from "../services/datasetService";

function UploadDataset() {

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState([]);

  const [previewData, setPreviewData] = useState([]);

  const handleUpload = async () => {

    if (!file) {

      toast.error("Choose file");

      return;
    }

    try {

      setLoading(true);

      const response =
        await uploadDataset(file);

      toast.success(
        response.data.message
      );

      setHistory([
        ...history,
        {
          file_name:
            response.data.file_name,

          uploaded_by:
            response.data.uploaded_by
              ?.email || "Unknown",

          rows:
            response.data.rows,
        },
      ]);

      setPreviewData([
        {
          file:
            response.data.file_name,

          rows:
            response.data.rows,

          columns:
            response.data.columns,

          missing:
            response.data
              .missing_values_found,
        },
      ]);

      setFile(null);

    } catch (error) {

      toast.error(
        "Upload Failed"
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

            Upload Dataset

          </h1>

          <p className="page-subtitle">

            Upload datasets for AI demand forecasting

          </p>

        </div>

        <div className="card max-w-2xl">

          <input
            type="file"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full mt-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold"
          >

            {
              loading
                ? "Uploading..."
                : "Upload Dataset"
            }

          </button>

        </div>

        {
          loading && (

            <Loader />

          )
        }

        {
          previewData.length > 0 && (

            <div className="card mt-8 overflow-x-auto">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">

                Dataset Preview

              </h2>

              <table>

                <thead>

                  <tr>

                    <th>
                      File
                    </th>

                    <th>
                      Rows
                    </th>

                    <th>
                      Columns
                    </th>

                    <th>
                      Missing Values
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    previewData.map(
                      (item, index) => (

                        <tr key={index}>

                          <td>
                            {item.file}
                          </td>

                          <td>
                            {item.rows}
                          </td>

                          <td>
                            {item.columns}
                          </td>

                          <td>
                            {item.missing}
                          </td>

                        </tr>
                      )
                    )
                  }

                </tbody>

              </table>

            </div>
          )
        }

        {
          history.length > 0 && (

            <div className="card mt-8 overflow-x-auto">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">

                Upload History

              </h2>

              <table>

                <thead>

                  <tr>

                    <th>
                      File
                    </th>

                    <th>
                      Uploaded By
                    </th>

                    <th>
                      Rows
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    history.map(
                      (item, index) => (

                        <tr key={index}>

                          <td>
                            {item.file_name}
                          </td>

                          <td>
                            {item.uploaded_by}
                          </td>

                          <td>
                            {item.rows}
                          </td>

                        </tr>
                      )
                    )
                  }

                </tbody>

              </table>

            </div>
          )
        }
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <Footer />

      </div>

    </div>
  );
}

export default UploadDataset;