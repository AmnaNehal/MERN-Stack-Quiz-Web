import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MyResultpage from "./pages/MyResultpage";

// private protected route
function RequireÄuth({ children }) {
  const isLoggedIn = Boolean(localStorage.getItem("authToken"));
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/result"
        element={
          <RequireÄuth>
            <MyResultpage />
          </RequireÄuth>
        }
      />
    </Routes>
  );
};

export default App;
