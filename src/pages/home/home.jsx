import React, { useContext, useEffect, useMemo, useState } from "react";
import "./home.css";
// componets
import Topbar from "../../components/topbar/topbar";
import Leftbar from "../../components/leftbar/Leftbar.jsx";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
// material ui

import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function Home() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `https://social-media-api-872f.onrender.com/api/posts/timeline/${user._id}`
      );
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  const mainArea = useMemo(
    () => <Feed homePage user={user} posts={posts} />,
    []
  );

  return (
    <>
      <Topbar user={user} setIsHidden={setIsHidden} isHidden={isHidden} />

      <div className="homePageBody flex w-full p-2 relative ">
        <div className="hidden md:block">
          <Leftbar user={user} className="" />
        </div>
        <div
          className={`${
            isHidden ? "w-0" : "w-3/5"
          } md:hidden absolute bg-white z-10 h-full overflow-hidden overflow-y-auto transition-all  `}
          onClick={(e) => {
            setIsHidden(true);
            e.stopPropagation();
          }}
        >
          <Leftbar user={user} className="" />
        </div>
        <div
          className="w-screen overflow-x-hidden "
          onClick={(e) => {
            setIsHidden(true);
            e.stopPropagation();
          }}
        >
          {mainArea}
        </div>
        <div className="hidden lg:block ">
          <Rightbar profileUser={false} />
        </div>
      </div>
    </>
  );
}

export default Home;
