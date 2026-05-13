import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadDataset from "./pages/UploadDataset";
import Forecast from "./pages/Forecast";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import DatasetHistory from "./pages/DatasetHistory";
import ForecastHistory from "./pages/ForecastHistory";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload-dataset"
        element={
          <ProtectedRoute>
            <UploadDataset />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dataset-history"
        element={
          <ProtectedRoute>
            <DatasetHistory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/forecast"
        element={
          <ProtectedRoute>
            <Forecast />
          </ProtectedRoute>
        }
      />

      <Route
        path="/forecast-history"
        element={
          <ProtectedRoute>
            <ForecastHistory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default App;