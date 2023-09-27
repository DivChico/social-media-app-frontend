import axios from "axios";
import { useEffect } from "react";

export const loginCall = async (userCredentils, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      "https://social-media-api-872f.onrender.com/api/auth/login",

      userCredentils
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
