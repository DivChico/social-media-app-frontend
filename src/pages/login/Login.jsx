import React, { useContext, useEffect, useRef, useState } from "react";
import "./login.css";
// material ui
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// routing
import { Link } from "react-router-dom";
// data
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [validation, setValidation] = useState("");

  const { isFetching, dispatch, error } = useContext(AuthContext);
  const email = useRef();
  const password = useRef();
  useEffect(() => {
    if (
      localStorage.getItem("emailData") &&
      localStorage.getItem("passwordData")
    ) {
      console.log(localStorage.getItem("emailData"));
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

  function handleFormSub(event) {
    event.preventDefault();
    localStorage.setItem("emailData", `${email.current.value}`);
    localStorage.setItem("passwordData", `${password.current.value}`);

    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
    if (error) {
      setValidation("wrong email or password");
      console.log("wrong email or password");
    }
  }

  return (
    <div className="login w-screen h-screen flex items-center justify-center">
      <div className="w-4/5 h-4/5  flex">
        <div className="loginLeft p-4 flex-1 flex flex-col justify-center">
          <h3 className="loginLogo font-bold text-5xl mb-2  ">ChicoDiv</h3>
          <spna className="loginDesc text-2xl">
            Connect with Friends all around the world
          </spna>
        </div>
        <div className="loginright  p-4 flex-1 flex flex-col justify-center">
          <div className="loginBox  flex flex-col p-4 rounded-md bg-white gap-2 h-80 justify-between">
            <form
              onSubmit={handleFormSub}
              className="flex flex-col justify-between flex-1"
            >
              <input
                type="email"
                placeholder="Email"
                className="loginInput focus:outline-none pl-4 h-12 border-2 border-gray rounded-md text-xl p-1"
                ref={email}
                required
              />
              <input
                type="password"
                required
                minLength={"6"}
                placeholder="Password"
                className="loginInput focus:outline-none pl-4 h-12 border-2 border-gray rounded-md text-xl p-1"
                ref={password}
              />
              <Button
                variant="contained"
                className="loginBtn w-full "
                type="submit"
                disabled={isFetching}
              >
                {isFetching ? (
                  <>
                    <CircularProgress size={20} color="inherit" />
                    loading
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              <h4 className="self-center text-red-600	">{validation}</h4>
            </form>

            <Button variant="text" className="loginForgot ">
              Forgot Password?
            </Button>
            <Link className="flex items-center justify-center" to={"/register"}>
              <Button
                variant="contained"
                className="registerButton "
                color="success"
                disabled={isFetching}
              >
                {isFetching ? (
                  <>
                    <CircularProgress size={20} color="inherit" />
                    loading
                  </>
                ) : (
                  "Create a New Account"
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
