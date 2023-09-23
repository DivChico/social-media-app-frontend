import React from "react";

function OnlineFriend({ user }) {
  return (
    <>
      <li className="rightbarFriend flex items-center gap-2 mb-2">
        <div className="rightbarFrienImg relative">
          <img
            src={user.profilePicture}
            alt=""
            className="rightbarProfileImg w-8 h-8 object-cover rounded-full"
          />
          <span className="rightbatOnline"></span>
        </div>
        <span className="rightbarUsername font-bold">{user.username}</span>
      </li>
    </>
  );
}

export default OnlineFriend;
