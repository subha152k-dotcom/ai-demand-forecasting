import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { getDatasetHistory } from "../services/datasetHistoryService";

function DatasetHistory() {

  const [search, setSearch] = useState("");

  const [datasets, setDatasets] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchDatasets();

  }, []);

  const fetchDatasets = async () => {

    try {

      const response =
        await getDatasetHistory();

      setDatasets(
        response.data.datasets || []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const filteredDatasets = datasets.filter(
    (item) =>
      item.file_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (

    <div className="page-layout">

      <Sidebar />

      <div className="page-content">

        <Navbar />

        <div className="mb-8">

          <h1 className="page-title">

            Dataset History

          </h1>

          <p className="page-subtitle">

            View uploaded dataset records

          </p>

        </div>

        <div className="card overflow-x-auto">

          <input
            type="text"
            placeholder="Search Dataset..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="mb-6"
          />

          {
            loading ? (

              <Loader />

            ) : filteredDatasets.length === 0 ? (

              <div className="bg-gray-50 rounded-2xl p-10 text-center">

                <h2 className="text-2xl font-bold">

                  No Dataset Found

                </h2>

                <p className="text-gray-500 mt-3">

                  Upload datasets to view history

                </p>

              </div>

            ) : (

              <table>

                <thead>

                  <tr>

                    <th>
                      File Name
                    </th>

                    <th>
                      Uploaded By
                    </th>

                    <th>
                      Uploaded At
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    filteredDatasets.map((item) => (

                      <tr key={item.id}>

                        <td>
                          {item.file_name}
                        </td>

                        <td>
                          {item.uploaded_by}
                        </td>

                        <td>
                          {
                            new Date(
                              item.uploaded_at
                            ).toLocaleString()
                          }
                        </td>

                        <td>

                          <div className="flex gap-3">

                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded-xl"
                            >

                              Delete

                            </button>

                            <button
                              className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
                            >

                              Download

                            </button>

                          </div>

                        </td>

                      </tr>
                    ))
                  }

                </tbody>

              </table>

            )
          }

        </div>
<br /><br /><br /><br /><br /><br />
        <Footer />

      </div>

    </div>
  );
}

export default DatasetHistory;