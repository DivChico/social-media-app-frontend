// components
import Home from "./pages/home/home.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Login from "./pages/login/Login.jsx";

// routing
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./pages/register/Register.jsx";

import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext.js";
import { loginCall } from "./apiCalls.js";

function App() {
  const { isFetching, error, dispatch, user } = useContext(AuthContext);
  useEffect(() => {
    if (
      localStorage.getItem("emailData") &&
      localStorage.getItem("passwordData")
    ) {
      console.log(localStorage.getItem("emailData"), "from app");
      loginCall(
        {
          email: localStorage.getItem("emailData"),
          password: localStorage.getItem("passwordData"),
        },
        dispatch
      );
    } else {
      console.log("no local ");
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          exact
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:userId"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
