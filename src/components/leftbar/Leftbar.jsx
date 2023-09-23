import React, { useEffect, useState } from "react";

import "./leftbar.css";
// components
import Friend from "./friend";
// material ui
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import GroupIcon from "@mui/icons-material/Group";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import HelpIcon from "@mui/icons-material/Help";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// data
import Oval from "react-spinners/ClipLoader";

// routing
import { Link } from "react-router-dom";
import axios from "axios";

function Leftbar({ user }) {
  let [loading, setLoading] = useState(true);

  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    async function fun() {
      setLoading(true);
      const res = await axios.get(
        "https://social-media-api-872f.onrender.com/api/users"
      );
      setSuggestions(res.data);
      setLoading(false);
    }

    fun();
  }, []);
  const [show, setShow] = useState(false);

  const [open, setOpen] = useState(false);
  function handlwShow() {
    setShow(!show);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="leftbar">
      <div className="p-4 overflow-y-auto h-full">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link to={`/profile/${user._id}`}>
              <PersonIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Profile</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to={"/"}>
              <RssFeedIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </Link>
          </li>
          <li
            className="sidebarListItem cursor-pointer"
            onClick={handleClickOpen}
          >
            <ChatIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Chat</span>
          </li>
          {show ? (
            <>
              <li
                className="sidebarListItem cursor-pointer"
                onClick={handleClickOpen}
              >
                <PlayCircleIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Videos</span>
              </li>
              <li
                className="sidebarListItem cursor-pointer"
                onClick={handleClickOpen}
              >
                <GroupIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Groups</span>
              </li>
              <li
                className="sidebarListItem cursor-pointer"
                onClick={handleClickOpen}
              >
                <BookmarksIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Bookmarks</span>
              </li>
              <li
                className="sidebarListItem cursor-pointer"
                onClick={handleClickOpen}
              >
                <HelpIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Questions</span>
              </li>
              <li
                className="sidebarListItem cursor-pointer"
                onClick={handleClickOpen}
              >
                <WorkIcon className="sidebarIcon" />
                <span className="sidebarListItemText">jobs</span>
              </li>
              <li
                className="sidebarListItem cursor-pointer"
                onClick={handleClickOpen}
              >
                <EventIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Events</span>
              </li>
              <li
                className="sidebarListItem cursor-pointer"
                onClick={handleClickOpen}
              >
                <OndemandVideoIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Courses</span>
              </li>
            </>
          ) : null}
        </ul>
        <Button
          variant="contained"
          className="sidebarButn"
          onClick={handlwShow}
        >
          Show more
        </Button>
        <hr className="mt-4 mb-4" />
        <h4 className="mt-4 mb-4">Friends</h4>
        <ul className="sidebarFriendList  ">
          {user?.followings?.map((friend) => {
            return <Friend friendId={friend} key={friend} />;
          })}
        </ul>
        <h4 className="mt-4 mb-4">Suggestions</h4>
        <ul className="sidebarFriendList  ">
          {loading ? (
            <div className=" flex justify-center items-center 	">
              <div className=" flex justify-between 	">
                <Oval
                  ariaLabel="loading-indicator"
                  size={50}
                  strokeWidth={5}
                  strokeWidthSecondary={1}
                  color="#1b86ff"
                  secondaryColor="black"
                  className="w-full"
                />
              </div>
            </div>
          ) : null}
          {suggestions.map((friend) => {
            return <Friend friendId={friend._id} key={friend._id} />;
          })}
        </ul>
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Coming Soon"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              this Feature Coming Soon
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Okey</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Leftbar;
