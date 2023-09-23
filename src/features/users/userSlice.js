import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: [
    {
      _id: "650a9586ba2277c0b84e5f02",
      profilePic: "/assets/person/2.jpg",
      coverPic: "",
      followers: [
        {
          _id: 1,
        },
        {
          _id: 2,
        },
      ],
      followins: [
        {
          _id: 2,
        },
      ],
      isAdmin: true,
      username: "abdullah",
      email: "abdullahhamdyalatawwna@gmail.com",
      password: "abd123456789",
      city: "new york",
      from: "gaza",
      status: "single",
      desc: "this is abdullah profile",
      createdAt: "2023-08-25",
      updatedAt: "2023-09-25",
      isOnline: true,
      __v: 0,
    },
    {
      _id: "650aacb5f130aeb73c3c3ea6",
      profilePic: "/assets/person/3.jpg",
      coverPic: "",
      followers: [
        {
          _id: 1,
        },
        {
          _id: 2,
        },
      ],
      followins: [
        {
          _id: 1,
        },
      ],
      isAdmin: false,
      username: "adam",
      email: "abdullah2001hamdy@gmail.com",
      password: "abd123456789",
      city: "new york",
      from: "gaza",
      status: "taken",
      desc: "this is adam profile",
      createdAt: "2023-08-25",
      updatedAt: "2023-09-25",
      isOnline: true,

      __v: 0,
    },
    {
      _id: "650aacbdf130aeb73c3c3ea9",
      profilePic: "/assets/person/4.jpg",
      coverPic: "",
      followers: [
        {
          _id: 1,
        },
        {
          _id: 2,
        },
      ],
      followins: [
        {
          _id: 1,
        },
      ],
      isAdmin: false,
      username: "space",
      email: "space@gmail.com",
      password: "abd123456789",
      city: "new york",
      from: "gaza",
      status: "taken",
      desc: "this is space profile",
      createdAt: "2023-08-25",
      updatedAt: "2023-09-25",
      isOnline: true,

      __v: 0,
    },
  ],
};
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value = [...state.value, action.payload.newUserData];
    },
    follow: (state, action) => {},
  },
});
export const { addUser, follow } = usersSlice.actions;
export default usersSlice.reducer;
