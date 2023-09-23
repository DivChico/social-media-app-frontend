import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
// data

// Component
import RightbarProFriend from "./rightbarProFriend";
// material ui
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function Rightbar({ profileUser, updateFun }) {
  const { user } = useContext(AuthContext);
  const [profilePicture, setprofilePicture] = useState(user.profilePicture);
  const [profileCover, setprofileCover] = useState(user.coverPicture);
  const [city, setcity] = useState(user.city);
  const [from, setfrom] = useState(user.from);
  const [relation, setrelation] = useState(user.relation);

  const [follow, setFollow] = useState(
    user.followings.includes(profileUser._id)
  );
  useEffect(() => {
    setFollow(user.followings.includes(profileUser._id));
  }, [profileUser._id]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const HomePage = () => {
    return (
      <>
        <div className="birthDayContainer mb-4 flex gap-2 items-center">
          <img src="/assets/gift.png" alt="" className="birthDayImg w-8 h-8" />
          <span className="birthDayText">
            Today is <b>Read</b> and <b>3 others </b> birthday
          </span>
        </div>
        <img
          src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/ad.png?raw=true"
          alt=""
          className="rightbarAd w-full rounded-md mb-4 "
        />
      </>
    );
  };
  const ProfilePage = () => {
    async function handleUnfollow() {
      await axios.put(
        `https://social-media-api-872f.onrender.com/api/users/${profileUser._id}/unfollow`,
        {
          _id: user._id,
        }
      );
      setFollow(!follow);
    }
    async function handleFollow() {
      await axios.put(
        `https://social-media-api-872f.onrender.com/api/users/${profileUser._id}/follow`,
        {
          _id: user._id,
        }
      );
      setFollow(!follow);
    }

    return (
      <>
        {profileUser._id === user._id ? (
          <Button variant="contained" onClick={handleClickOpen}>
            edit profile
          </Button>
        ) : (
          <Button variant="contained" className="">
            {follow ? (
              <>
                <div onClick={handleUnfollow}>
                  Unfollow
                  <RemoveIcon />
                </div>
              </>
            ) : (
              <>
                <div onClick={handleFollow}>
                  follow
                  <AddIcon />
                </div>
              </>
            )}
          </Button>
        )}

        <h4 className="rightbarTitle font-bold mb-2 mt-2 text-2xl ">
          User Info
        </h4>
        <div className="rightbarInfo mb-4">
          <div className="rightbarInfoItem mb-2 ">
            <span className="rightbarInfoKey font-bold mr-2 ">City:</span>
            <span className="rightbarInfoValue">{profileUser.city}</span>
          </div>
          <div className="rightbarInfoItem mb-2">
            <span className="rightbarInfoKey font-bold mr-2 ">From:</span>
            <span className="rightbarInfoValue">{profileUser.from}</span>
          </div>
          <div className="rightbarInfoItem mb-2">
            <span className="rightbarInfoKey font-bold mr-2">
              relationship:
            </span>
            <span className="rightbarInfoValue">
              {profileUser.relation === 0
                ? "single"
                : profileUser.relation === 1
                ? "engaged"
                : profileUser.relation === 2
                ? "married"
                : profileUser.relation === 3
                ? "private"
                : null}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle font-bold text-2xl mb-2">User Friends</h4>
        <div className="rightbarFollowings flex  flex-wrap  ">
          {profileUser?.followings?.map((friend) => {
            return <RightbarProFriend key={friend} userID={friend} />;
          })}
        </div>
      </>
    );
  };
  async function handleSubmit() {
    const newInfo = {
      _id: user._id,
      profilePicture: profilePicture,
      coverPicture: profileCover,
      city: city,
      from: from,
      relation: relation,
    };
    await axios.put(
      `https://social-media-api-872f.onrender.com/api/users/${user._id}`,
      newInfo
    );
    handleClose();
    updateFun();
  }
  return (
    <div className="rightbar p-4 ">
      {profileUser ? <ProfilePage /> : <HomePage />}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Eit you profile</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Profile Picture URL"
              className="registerInput focus:outline-none pl-4 h-12 border-2 border-gray rounded-md text-xl p-1"
              value={profilePicture}
              onChange={(e) => {
                setprofilePicture(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Profile Cover URL"
              className="registerInput focus:outline-none pl-4 h-12 border-2 border-gray rounded-md text-xl p-1"
              value={profileCover}
              onChange={(e) => {
                setprofileCover(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="city"
              className="registerInput focus:outline-none pl-4 h-12 border-2 border-gray rounded-md text-xl p-1"
              value={city}
              onChange={(e) => {
                setcity(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="from"
              className="registerInput focus:outline-none pl-4 h-12 border-2 border-gray rounded-md text-xl p-1"
              value={from}
              onChange={(e) => {
                setfrom(e.target.value);
              }}
            />
            <form className="flex justify-around ">
              <div>
                <input
                  type="radio"
                  id="relation1"
                  name="relation"
                  value={0}
                  onChange={(e) => {
                    setrelation(e.target.value);
                  }}
                />
                <label for="relation1"> single</label>
                <br></br>
                <input
                  type="radio"
                  id="relation2"
                  name="relation"
                  value={1}
                  onChange={(e) => {
                    setrelation(e.target.value);
                  }}
                />
                <label for="relation2"> engaged</label>
                <br></br>
              </div>
              <div>
                <input
                  type="radio"
                  id="relation3"
                  name="relation"
                  value={2}
                  onChange={(e) => {
                    setrelation(e.target.value);
                  }}
                />
                <label for="relation3"> married</label>
                <br></br>
                <input
                  type="radio"
                  id="relation4"
                  name="relation"
                  value={3}
                  onChange={(e) => {
                    setrelation(e.target.value);
                  }}
                />
                <label for="relation4"> private</label>
                <br></br>
              </div>
            </form>

            {/* <input
              type="text"
              placeholder="relationship"
              className="registerInput focus:outline-none pl-4 h-12 border-2 border-gray rounded-md text-xl p-1"
              ref={relationship}
              value={relationship.current}
            /> */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
