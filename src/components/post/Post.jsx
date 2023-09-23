import React, { useContext, useEffect, useState } from "react";
// components
import "./post.css";
// material ui.
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";

// data

// timeago.js
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
function Post({ postData, updateFun }) {
  const [post, setPost] = useState(postData);
  const { user } = useContext(AuthContext);
  const [postuser, setPostUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://social-media-api-872f.onrender.com/api/users/${post.userId}`
      );
      setPostUser(res.data);
    };
    fetchUser();
  }, []);
  async function handleFavClick(e) {
    await axios.put(
      `https://social-media-api-872f.onrender.com/api/posts/${post._id}/like`,
      {
        userId: user._id,
      }
    );
    try {
      const res = await axios.get(
        `https://social-media-api-872f.onrender.com/api/posts/${postData._id}`
      );
      setPost(res.data);
    } catch (err) {}
  }
  async function deletePost() {
    try {
      console.log("try delet post");
      await axios.delete(
        `https://social-media-api-872f.onrender.com/api/posts/${postData._id}`,
        {
          data: {
            userId: user._id,
          },
        }
      );

      handleClose();
      updateFun();
    } catch (err) {
      console.log(err);
    }
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="post p-4 shadow-lg w-full rounded-md mt-5 mb-5">
      <div className="postTop flex items-center justify-between">
        <Link to={`/profile/${post.userId}`}>
          <div className="postTopLeft flex gap-2 items-center ">
            <img
              src={postuser.profilePicture || "/assets/person/noAvatar.png"}
              alt=""
              className="PostProfileImg w-12 h-12 rounded-full object-cover"
            />
            <span className="postUsername text-lg font-bold">
              {postuser.username}
            </span>
            <span className="postDate text-sm">{format(post.createdAt)}</span>
          </div>
        </Link>

        <div className="postTopright">
          <IconButton aria-label="more" onClick={handleClick}>
            <MoreVertIcon htmlColor="black" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {user._id === postData.userId ? (
              <MenuItem onClick={deletePost}>Delet Post</MenuItem>
            ) : null}
            <MenuItem onClick={handleClose}>Save post</MenuItem>
          </Menu>
        </div>
      </div>
      <div className="postCenter mt-4 mb-4">
        <span className="postText">{post?.desc}</span>
        {post.image ? (
          <img
            src={post.image}
            alt="post"
            className="postImg w-full mt-4 max-h-110 object-contain "
          />
        ) : null}
      </div>
      <div className="postBottom mt-2 flex items-center justify-between">
        <div className="postBottomLeft flex">
          <div className="interactionOption ">
            <Button
              aria-label="more"
              className="flex items-center gap-2"
              onClick={handleFavClick}
            >
              <FavoriteIcon
                htmlColor={post.likes.includes(user._id) ? "red" : "#1976d2"}
                className="favIcon"
              />
              <span className="favCounter text-black">{post.likes.length}</span>
            </Button>
          </div>
        </div>
        <div className="postBottomRight">
          {/* comment section */}
          {/* <Button variant="text" className="postCommentText">
            <span className="text-black"> Comments soon </span>
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default Post;
