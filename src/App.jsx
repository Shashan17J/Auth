import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";

import PrivateRoute from "./Auth/PrivateRoute";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
