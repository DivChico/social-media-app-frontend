import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function RightbarProFriend({ userID }) {
  const [friend, setFriend] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://social-media-api-872f.onrender.com/api/users/${userID}`
      );
      setFriend(res.data);
      console.log(friend);
    };
    fetchUser();
  }, []);
  console.log();

  return (
    <Link to={`/profile/${userID}`}>
      <div className="rightbarFollowing mr-5 mb-2 cursor-pointer   font-bold  flex flex-col gap-2 items-center">
        <img
          src={friend.profilePicture || "/assets/person/noAvatar.png"}
          alt=""
          className="rightbarFollowingImg w-20 h-20 rounded-md object-cover"
        />
        <span className="rightbarFollowingName font-bold ">
          {friend.username}
        </span>
      </div>
    </Link>
  );
}

export default RightbarProFriend;
