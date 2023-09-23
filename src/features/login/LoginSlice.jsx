import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    isLogin: true,
    userID: "1",
  },
};
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (State, actions) => {
      State.value = {
        isLogin: true,
        userID: actions.payload.userId,
      };
    },
    logout: (State, actions) => {
      State.value = {
        isLogin: false,
        userID: "",
      };
    },
  },
});
export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
