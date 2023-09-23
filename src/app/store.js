import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postSlice";
import usersReducer from "../features/users/userSlice";
import LoginReducer from "../features/login/LoginSlice";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    login: LoginReducer,
  },
});
