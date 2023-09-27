import React, {
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./profile.css";

import { useParams } from "react-router-dom";
// componets
import Topbar from "../../components/topbar/topbar";
import Leftbar from "../../components/leftbar/Leftbar.jsx";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import VerifiedIcon from "@mui/icons-material/Verified";
import Oval from "react-spinners/ClipLoader";

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
  const [isHidden, setIsHidden] = useState(true);
  const mainArea = useMemo(
    () => <Feed userId={userId} user={user} profile />,
    []
  );

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
      <Topbar user={user} setIsHidden={setIsHidden} isHidden={isHidden} />
      <div className="homePageBody flex w-full p-2  ">
        <div className="hidden md:block f-full overflow-y-auto">
          <Leftbar user={user} />
        </div>

        <div
          className={`${
            isHidden ? "w-0" : "w-3/5"
          } md:hidden absolute bg-white z-10 h-full overflow-hidden overflow-y-auto transition-all `}
          onClick={(e) => {
            setIsHidden(true);
            e.stopPropagation();
          }}
        >
          <Leftbar user={user} className="" />
        </div>
        <div
          className="profileRight p-4  overflow-y-auto"
          onClick={(e) => {
            setIsHidden(true);
            e.stopPropagation();
          }}
        >
          <div className="profileRightTop h-96 relative mb-10 ">
            <img
              src={profileUser.coverPicture || "/assets/person/noCover.png"}
              alt="user coverPic"
              className=" w-full h-4/5 object-cover "
            />
            <img
              src={
                profileUser.profilePicture
                  ? profileUser.profilePicture
                  : "/assets/person/noAvatar.png"
              }
              alt="user profilePic"
              className="profileMildePicture w-52 h-52 rounded-full object-cover "
            />

            <span className="profileUsername absolute  text-3xl text-black font-bold">
              {profileUser.username}
              {profileUser?.verify ? (
                <VerifiedIcon htmlColor="#1976D2" />
              ) : null}
            </span>
            <span className="profileDesc absolute   text-2xl text-black ">
              {profileUser.desc}
            </span>
          </div>
          <div className="profileRightBottom flex flex-col md:flex-row">
            {/* samll */}
            <div className="block md:hidden mt-10">
              <Rightbar profileUser={profileUser} updateFun={updateFun} />
            </div>
            <div className="block md:hidden mt-10">
              <Feed userId={userId} user={user} profile />
            </div>

            {/* large */}
            <div className="hidden md:block w-4/5 ">
              <Feed userId={userId} user={user} profile />
            </div>
            <div className="hidden md:block sticky top-0 w-1/5 border-1 border-black ">
              <Rightbar profileUser={profileUser} updateFun={updateFun} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
