import React, { useContext, useEffect, useState } from "react";
// components
import "./post.css";
import Commnet from "./Commnet";
// material ui.
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { format } from "timeago.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import VerifiedIcon from "@mui/icons-material/Verified";
function Post({ postData, updateFundel, setDisplay }) {
  const [post, setPost] = useState(postData);
  const { user } = useContext(AuthContext);
  const [postuser, setPostUser] = useState({});
  const [postCommnets, setPostComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [update, setUpdate] = useState(true);
  const [displayCommnets, setDisplayCommnets] = useState(false);

  const open = Boolean(anchorEl);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://social-media-api-872f.onrender.com/api/users/${post.userId}`
      );
      setPostUser(res.data);
    };
    fetchUser();
  }, []);
  useEffect(() => {
    const fetchPostComments = async () => {
      const res = await axios.get(
        `https://social-media-api-872f.onrender.com/api/comments/${postData._id}`
      );
      setPostComments(res.data);
    };
    fetchPostComments();
  }, [update]);

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
      await axios.delete(
        `https://social-media-api-872f.onrender.com/api/posts/${postData._id}`,
        {
          data: {
            userId: user._id,
          },
        }
      );

      handleClose();
      updateFundel(Math.random());
    } catch (err) {
      console.log(err);
    }
  }
  async function handleCommentSend(e) {
    e.preventDefault();
    if (newComment !== "") {
      await axios.post(
        "https://social-media-api-872f.onrender.com/api/comments",
        {
          userId: user._id,

          postId: postData._id,

          desc: newComment,
        }
      );
      setNewComment("");

      setUpdate(!update);
      setDisplayCommnets(true);
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function updateFun() {
    setUpdate(!update);
  }

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
              {postuser.username}{" "}
              {postuser.email === "mhanag651@gmail.com" ? (
                <VerifiedIcon htmlColor="#1976D2" />
              ) : null}
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
          <Button
            variant="text"
            className="postCommentText"
            onClick={() => {
              setDisplayCommnets(!displayCommnets);
            }}
          >
            <span className="text-black"> Comments </span>
          </Button>
        </div>
      </div>
      <div className="addComment">
        <form
          onSubmit={handleCommentSend}
          className="flex items-center mb-5 mt-5 gap-4"
        >
          <TextField
            id="outlined-basic"
            label="Comment"
            variant="outlined"
            className="w-full  "
            size="small"
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
          <Button variant="text " className="h-full" type="submit">
            send
          </Button>
        </form>
      </div>
      {/* comment section */}
      {displayCommnets
        ? postCommnets.map((comment) => {
            return (
              <Commnet
                commentDate={comment}
                key={comment._id}
                updateFun={updateFun}
                setDisplay={setDisplay}
              />
            );
          })
        : null}
    </div>
  );
}

export default Post;
