import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Friend({ friendId }) {
  const [friend, setFriend] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://social-media-api-872f.onrender.com/api/users/${friendId}`
      );
      setFriend(res.data);
    };

    fetchUser();
  }, []);

  return (
    <>
      <Link to={`/profile/${friend._id}`}>
        <li className="sidebarFriend">
          <img
            src={friend.profilePicture || "/assets/person/noAvatar.png"}
            alt=""
            className="sidebarFriendImg h-8 w-8 rounded-full object-cover"
          />
          <span className="sidebarFriendName">{friend.username} </span>
        </li>
      </Link>
    </>
  );
}

export default Friend;
