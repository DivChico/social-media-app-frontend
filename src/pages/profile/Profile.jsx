import React, { useContext, useEffect, useState } from "react";
import "./profile.css";

import { useParams } from "react-router-dom";
// componets
import Topbar from "../../components/topbar/topbar";
import Leftbar from "../../components/leftbar/Leftbar.jsx";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

// material ui
import Button from "@mui/material/Button";

// data
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);

  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState({});
  const [update, setupdate] = useState(true);
  function updateFun() {
    setupdate(!update);
    console.log("called");
  }
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://social-media-api-872f.onrender.com/api/users/${userId}`
      );
      setProfileUser(res.data);
    };
    fetchUser();
  }, [userId, update]);

  return (
    <>
      <Topbar user={user} />
      <div className="homePageBody flex w-full p-2  ">
        <Leftbar user={user} />
        <div className="profileRight p-4  overflow-y-auto">
          <div className="profileRightTop h-96 relative mb-10 ">
            <img
              src={profileUser.coverPicture || "/assets/person/noCover.png"}
              alt="user coverPic"
              className=" w-full h-4/5 object-cover "
            />
            <img
              src={profileUser.profilePicture || "/assets/person/noAvatar.png"}
              alt="user profilePic"
              className="profileMildePicture w-52 h-52 rounded-full object-cover "
            />

            <span className="profileUsername absolute  text-3xl text-black font-bold">
              {profileUser.username}
            </span>
            <span className="profileDesc absolute   text-2xl text-black ">
              {profileUser.desc}
            </span>
          </div>
          <div className="profileRightBottom flex  ">
            <Feed userId={userId} user={user} profile />
            <Rightbar
              className="sticky top-0"
              profileUser={profileUser}
              updateFun={updateFun}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
