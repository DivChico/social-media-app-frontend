import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  value: [
    {
      _id: 1,
      likes: 10,
      userId: "1",
      desc: "hey is my fisrt",
      img: "/assets/post/1.jpg",
      createdAt: "2023-07-24",
      updatedAt: "2023-09-25",
      commentCount: 9,
      fav: false,
      comments: [
        {
          id: uuidv4(),
          by: 1,
          body: "hi",
          repliesCount: 0,
          replies: [
            {
              id: uuidv4(),
              by: 2,
              body: "hi to u",
              repliesCount: 0,
              replies: [],
            },
          ],
        },
      ],
    },
    {
      _id: 2,
      likes: 13,
      userId: "2",
      desc: "hey is my fisrt ",
      img: "/assets/post/2.jpg",
      createdAt: "2023-07-25",
      updatedAt: "2023-09-25",
      commentCount: 9,
      fav: false,
      comments: [
        {
          id: uuidv4(),
          by: 1,
          body: "hi",
          repliesCount: 0,
          replies: [
            {
              id: uuidv4(),
              by: 2,
              body: "hi to u",
              repliesCount: 0,
              replies: [],
            },
          ],
        },
      ],
    },
    {
      _id: 3,
      likes: 20,
      userId: "1",
      desc: "hey is my second",
      img: "/assets/post/3.jpg",
      createdAt: "2023-09-5",
      updatedAt: "2023-09-25",
      commentCount: 9,
      fav: false,
      comments: [
        {
          id: uuidv4(),
          by: 1,
          body: "hi",
          repliesCount: 0,
          replies: [
            {
              id: uuidv4(),
              by: 2,
              body: "hi to u",
              repliesCount: 0,
              replies: [],
            },
          ],
        },
      ],
    },
  ],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addLike: (state, action) => {
      state.value = [...state.value];
    },
    addPost: (state, action) => {
      return {
        ...state,
        value: [...state.value, action.payload.postData],
      };
    },
  },
});

export const { addLike, addPost } = postSlice.actions;
export default postSlice.reducer;
