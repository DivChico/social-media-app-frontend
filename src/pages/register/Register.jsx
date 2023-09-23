import React, { useEffect, useRef } from "react";
import "./register.css";
// material ui
import Button from "@mui/material/Button";
// routing
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../features/users/userSlice";
import moment from "moment";
import axios from "axios";

function Register() {
  let Navigate = useNavigate();

  const regEmail = useRef();
  const regUsername = useRef();
  const regPassword = useRef();
  async function handleFormSub(e) {
    e.preventDefault();
    const newUser = {
      username: regUsername.current.value,
      email: regEmail.current.value,
      password: regPassword.current.value,
    };
    await axios.post(
      "https://social-media-api-872f.onrender.com/api/auth/register",
      newUser
    );
    Navigate("/login");
  }
  return (
    <div className="register w-screen h-screen flex items-center justify-center">
      <div className="w-4/5 h-4/5  flex">
        <div className="registerLeft p-4 flex-1 flex flex-col justify-center">
          <h3 className="registerLogo font-bold text-5xl mb-2  ">ChicoDiv</h3>
          <spna className="registerDesc text-2xl">
            Connect with Friends all around the world
          </spna>
        </div>
        <div className="registerright p-4 flex-1 flex flex-col justify-center">
          <form onSubmit={handleFormSub}>
            <div className="registerBox  flex flex-col p-4 rounded-md bg-white gap-2 h-80 justify-between">
              <input
                type="Email"
                placeholder="Email"
                className="registerInput focus:outline-none pl-4 h-12 border-2 border-gray rounded-md text-xl p-1"
                ref={regEmail}
              />
              <input
                type="text"
                placeholder="username"
                className="registerInput focus:outline-none pl-4 h-12 border-2 border-gray rounded-md text-xl p-1"
                ref={regUsername}
              />
              <input
                type="Password"
                placeholder="Password"
                className="registerInput focus:outline-none pl-4 h-12 border-2 border-gray rounded-md text-xl p-1"
                ref={regPassword}
              />
              <Button
                color="success"
                variant="contained"
                className="registerBtn "
                type="submit"
              >
                register
              </Button>
              <Link
                className="flex items-center justify-center w-full"
                to={"/login"}
              >
                <Button variant="contained" className="registerButton  w-full">
                  Login into an existing Account
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
