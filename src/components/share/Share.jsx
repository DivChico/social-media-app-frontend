import React, { useRef, useState } from "react";
import "./share.css";

// material ui
import PermMediaIcon from "@mui/icons-material/PermMedia";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Button from "@mui/material/Button";
import LabelIcon from "@mui/icons-material/Label";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";

import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../../features/posts/postSlice";
import moment from "moment";
import axios from "axios";

function Share({ profile, homePage, user, updateFun }) {
  const dispatch = useDispatch();
  const postDesc = useRef();
  const [postUrl, setPostUrl] = useState("");
  const [display, setdisplay] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleUrlType(e) {
    setPostUrl(e.target.value);
  }
  async function handleshare() {
    const newPost = {
      userId: user._id,
      desc: postDesc.current.value,
      image: postUrl,
    };
    await axios.post(
      "https://social-media-api-872f.onrender.com/api/posts",
      newPost
    );

    postDesc.current.value = "";
    setPostUrl("");
    setdisplay(false);
    updateFun(Math.random());
  }

  return (
    <>
      {profile ? (
        <div className="share p-4 w-full  rounded-md shadow-lg">
          <div className="shareTop flex  items-center ">
            <div>
              <img
                src={user.profilePicture || "/assets/person/noAvatar.png"}
                className="shareProfileImg mr-2 object-cover w-12 h-12 rounded-full"
                alt=""
              />
            </div>

            <input
              type="text"
              placeholder={`What is on your mind ${user.username}?`}
              className="p-1 shareInput focus:outline-none w-4/5 rounded-full"
              autoFocus
              ref={postDesc}
            />
          </div>
          <hr className="mt-4 mb-4" />
          <div className="mb-2 relative">
            {display ? (
              <>
                <img src={postUrl} alt="" className=" " />
                <div
                  className="absolute top-2 right-2 "
                  onClick={() => {
                    setPostUrl("");
                    setdisplay(false);
                  }}
                >
                  <IconButton aria-label="delete">
                    <CancelIcon />
                  </IconButton>
                </div>
              </>
            ) : null}
          </div>
          <div className="shareBottom flex items-center justify-between gap-2 ">
            <div className="shareOptions flex-1 flex items-center justify-between">
              <Button
                className="shareOption flex items-center gap-2 mr-4 "
                onClick={handleClickOpen}
              >
                <PermMediaIcon htmlColor="tomato" />
                <span className="shareOptionText text-black">
                  Photo or Video
                </span>
              </Button>
              <Button className="shareOption flex items-center gap-2 mr-4 ">
                <LabelIcon htmlColor="green" />
                <span className="shareOptionText text-black">Tag</span>
              </Button>
              <Button className="shareOption flex items-center gap-2 mr-4 ">
                <FmdGoodIcon htmlColor="blue" />
                <span className="shareOptionText text-black">Location</span>
              </Button>
              <Button className="shareOption flex items-center gap-2 mr-4 ">
                <EmojiEmotionsIcon htmlColor="#FFA500" />
                <span className="shareOptionText text-black">Feelings</span>
              </Button>
              <Button variant="contained" onClick={handleshare}>
                share
              </Button>
            </div>
          </div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Image Url</DialogTitle>
            <DialogContent>
              <DialogContentText>
                We curently dont have a back end server for image upload , for
                now provide a image url
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="url"
                label="URL"
                type="url"
                fullWidth
                variant="standard"
                value={postUrl}
                onChange={handleUrlType}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setdisplay(false);

                  handleClose();
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setdisplay(true);

                  handleClose();
                }}
              >
                submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : null}
      {homePage ? (
        <div className="share p-4 w-full  rounded-md shadow-lg">
          <div className="shareTop flex  items-center ">
            <div>
              <img
                src={user.profilePicture || "/assets/person/noAvatar.png"}
                className="shareProfileImg mr-2 object-cover w-12 h-12 rounded-full"
                alt=""
              />
            </div>

            <input
              type="text"
              placeholder={`What is on your mind ${user.username}?`}
              className="p-1 shareInput focus:outline-none w-4/5 rounded-full"
              autoFocus
              ref={postDesc}
            />
          </div>
          <hr className="mt-4 mb-4" />
          <div className="mb-2 relative">
            {display ? (
              <>
                <img src={postUrl} alt="" className=" " />
                <div
                  className="absolute top-2 right-2 "
                  onClick={() => {
                    setPostUrl("");
                    setdisplay(false);
                  }}
                >
                  <IconButton aria-label="delete">
                    <CancelIcon />
                  </IconButton>
                </div>
              </>
            ) : null}
          </div>
          <div className="shareBottom flex items-center justify-between gap-2 ">
            <div className="shareOptions flex-1 flex items-center justify-between">
              <Button
                className="shareOption flex items-center gap-2 mr-4 "
                onClick={handleClickOpen}
              >
                <PermMediaIcon htmlColor="tomato" />
                <span className="shareOptionText text-black">
                  Photo or Video
                </span>
              </Button>
              <Button className="shareOption flex items-center gap-2 mr-4 ">
                <LabelIcon htmlColor="green" />
                <span className="shareOptionText text-black">Tag</span>
              </Button>
              <Button className="shareOption flex items-center gap-2 mr-4 ">
                <FmdGoodIcon htmlColor="blue" />
                <span className="shareOptionText text-black">Location</span>
              </Button>
              <Button className="shareOption flex items-center gap-2 mr-4 ">
                <EmojiEmotionsIcon htmlColor="#FFA500" />
                <span className="shareOptionText text-black">Feelings</span>
              </Button>
              <Button variant="contained" onClick={handleshare}>
                share
              </Button>
            </div>
          </div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Image Url</DialogTitle>
            <DialogContent>
              <DialogContentText>
                We curently dont have a back end server for image upload , for
                now provide a image url
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="url"
                label="URL"
                type="url"
                fullWidth
                variant="standard"
                value={postUrl}
                onChange={handleUrlType}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setdisplay(false);

                  handleClose();
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setdisplay(true);

                  handleClose();
                }}
              >
                submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : null}
    </>
  );
}

export default Share;
