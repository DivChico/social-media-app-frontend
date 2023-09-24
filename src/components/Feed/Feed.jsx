import "./feed.css";
// Component
import Post from "../post/Post";
import Share from "../share/Share";

// data
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Oval from "react-spinners/ClipLoader";

export default function Feed({ profile, userId, homePage, user, posts }) {
  const [update, setUpdate] = useState(true);
  function updateFun(value) {
    setUpdate(value);
    console.log("called");
  }
  const HomePage = () => {
    let [loading, setLoading] = useState(true);

    const [userTimeline, setUserTimeline] = useState([]);

    useEffect(() => {
      setLoading(true);

      const fetchPosts = async () => {
        const res = await axios.get(
          `https://social-media-api-872f.onrender.com/api/posts/timeline/${user._id}`
        );
        setUserTimeline(res.data);
        setLoading(false);
      };
      fetchPosts();
    }, [update]);
    return (
      <>
        <Share homePage={homePage} user={user} updateFun={updateFun} />
        {loading ? (
          <div className=" flex justify-center items-center h-96	">
            <div className=" flex justify-between 	">
              <Oval
                ariaLabel="loading-indicator"
                size={150}
                strokeWidth={5}
                strokeWidthSecondary={1}
                color="#1b86ff"
                secondaryColor="black"
                className="w-full"
              />
            </div>
          </div>
        ) : null}

        {loading
          ? null
          : userTimeline.map((post) => {
              return (
                <Post
                  key={post._id}
                  postData={post}
                  posts={posts}
                  updateFundel={updateFun}
                />
              );
            })}
      </>
    );
  };
  const ProfilePage = () => {
    let [loading, setLoading] = useState(true);

    const [userProfilePosts, setUserProfilePosts] = useState([]);
    useEffect(() => {
      const fetchPosts = async () => {
        setLoading(true);
        const res = await axios.get(
          `https://social-media-api-872f.onrender.com/api/posts/user/${userId}`
        );
        setUserProfilePosts(res.data);
        setLoading(false);
      };
      fetchPosts();
    }, []);
    return (
      <>
        <Share homePage={homePage} user={user} />
        {loading ? (
          <div className=" flex justify-center items-center h-96	">
            <div className=" flex justify-between 	">
              <Oval
                ariaLabel="loading-indicator"
                size={150}
                strokeWidth={5}
                strokeWidthSecondary={1}
                color="#1b86ff"
                secondaryColor="black"
                className="w-full"
              />
            </div>
          </div>
        ) : null}
        {loading
          ? null
          : userProfilePosts.map((post) => {
              return (
                <Post
                  key={post._id}
                  postData={post}
                  posts={posts}
                  updateFun={updateFun}
                />
              );
            })}
      </>
    );
  };

  // let mutablePosts = [...posts];
  // mutablePosts.sort((p1, p2) => {
  //   return new Date(p2.createdAt) - new Date(p1.createdAt);
  // });

  return (
    <div className="feed ">
      <div className="p-4 h-full overflow-y-auto">
        {homePage ? <HomePage /> : <ProfilePage />}
      </div>
    </div>
  );
}
