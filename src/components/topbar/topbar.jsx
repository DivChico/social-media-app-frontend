import React, { useContext, useState } from "react";
import "./topbar.css";

// material ui
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GitHubIcon from "@mui/icons-material/GitHub";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// reactRouter
import { Link } from "react-router-dom";
import { logout } from "../../features/login/LoginSlice";
import { AuthContext } from "../../context/AuthContext";

function Topbar({ user }) {
  const { dispatch } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    localStorage.setItem("emailData", ``);
    localStorage.setItem("passwordData", ``);
  }
  return (
    <div className="topbarContainer sticky top-0 items-center  w-full bg-blue-600  flex ">
      <div className="topbarLeft flex ">
        <Link to={"/"}>
          <span className="logo text-2xl ml-5 font-bold text-white 	cursor-pointer	 ">
            ChicoDiv
          </span>
        </Link>
      </div>
      <div className="topbarCenter    ">
        <div className="searchbar w-full h-8 bg-white rounded-full flex items-center">
          <SearchIcon className="searchIcon ml-2" />
          <input
            type="text"
            className="searchInput w-full rounded-full  focus:outline-none p-1"
            placeholder="search..."
          />
        </div>
      </div>
      <div className="topbarRight flex items-center  justify-end  text-white gap-10 pr-10 ">
        {/* <div className="topbarLinks">
          <Link to={"/"}>
            <span className="topbarLink text-xl ">Home</span>
          </Link>
          <span className="topbarLink text-xl" onClick={handleLogout}>
            logout
          </span>
        </div> */}
        <a
          href="https://github.com/DivChico/social-media-app-frontend"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon />
        </a>
        {/* <div className="topbarIcons flex">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <ChatIcon />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">3</span>
          </div>
        </div> */}

        <img
          src={user.profilePicture || "/assets/person/noAvatar.png"}
          alt=""
          className="h-8 w-8 rounded-full object-cover cursor-pointer"
          onClick={handleClick}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Link to={`/profile/${user._id}`}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
          </Link>

          <MenuItem
            onClick={() => {
              handleLogout();
              handleClose();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Topbar;
