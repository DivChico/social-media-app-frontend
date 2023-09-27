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
import { AuthContext } from "../../context/AuthContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import VerifiedIcon from "@mui/icons-material/Verified";
function Commnet({ commentDate, updateFun }) {
  const [commentUser, setCommnetUser] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchuser = async () => {
      const res = await axios.get(
        `https://social-media-api-872f.onrender.com/api/users/${commentDate.userId}`
      );
      setCommnetUser(res.data);
    };
    fetchuser();
  }, []);

  async function deletecomment() {
    console.log("start del");

    try {
      await axios.delete(
        `https://social-media-api-872f.onrender.com/api/comments/${commentDate._id}/delete`,
        {
          data: {
            userId: user._id,
          },
        }
      );
      updateFun(true);
      console.log("end del");
    } catch (err) {}
  }
  async function handleCommnetLike() {
    try {
      await axios.put(
        `https://social-media-api-872f.onrender.com/api/comments/${commentDate._id}/like`,
        {
          userId: user._id,
        }
      );
      updateFun(false);
    } catch (err) {}
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
    <>
      <div className="commentSection p-5 shadow-md mb-5 ">
        <div className="postTop flex items-center justify-between">
          <Link to={`/profile/${commentDate.userId}`}>
            <div className="postTopLeft flex gap-2 items-center ">
              {/* add user image  */}
              <img
                src={
                  commentUser.profilePicture || "/assets/person/noAvatar.png"
                }
                alt=""
                className="PostProfileImg w-8 h-8 rounded-full object-cover"
              />
              {/* add username */}
              <span className="postUsername text-md font-bold">
                {commentUser.username}{" "}
                {commentUser?.verify ? (
                  <VerifiedIcon htmlColor="#1976D2" />
                ) : null}
              </span>
              <span className="postDate text-sm">
                {format(commentDate.createdAt)}
              </span>
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
              {user._id === commentDate.userId ? (
                <MenuItem onClick={deletecomment}>Delet comment</MenuItem>
              ) : null}
              <MenuItem>report</MenuItem>
            </Menu>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="postCenter mt-4 mb-4">
            <span className="postText">{commentDate?.desc}</span>
          </div>
          <div className="postBottom mt-2 flex items-center justify-between">
            <div className="postBottomLeft flex">
              <div className="interactionOption ">
                <Button
                  aria-label="more"
                  className="flex items-center gap-2"
                  onClick={handleCommnetLike}
                >
                  <FavoriteIcon
                    htmlColor={
                      commentDate.likes.includes(user._id) ? "red" : "#1976d2"
                    }
                    className="favIcon"
                  />
                  <span className="favCounter text-black">
                    {commentDate.likes.length}
                  </span>
                </Button>
              </div>
            </div>
            <div className="postBottomRight">
              {/* comment section
            <Button variant="text" className="postCommentText">
              <span className="text-black"> replay </span>
            </Button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Commnet;
