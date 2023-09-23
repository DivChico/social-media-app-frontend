import React, { useContext, useEffect, useState } from "react";
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
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `https://social-media-api-872f.onrender.com/api/posts/timeline/${user._id}`
      );
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Topbar user={user} />

      <div className="homePageBody flex w-full p-2  ">
        <Leftbar user={user} />
        <Feed homePage user={user} posts={posts} />
        <Rightbar profileUser={false} />
      </div>
    </>
  );
}

export default Home;
