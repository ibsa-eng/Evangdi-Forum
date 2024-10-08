import React from "react";
import classes from "./Header.module.css";
import headerLogo from "../../assets/evangadi.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const userExist = localStorage.getItem("user");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <header>
      <div className={classes.header__container}>
        <div className={classes.logo}>
          <a href="#">
            <img src={headerLogo} alt="logo" />
          </a>
        </div>
        <div className={classes.header__links}>
          <a href="#">Home</a>
          <a href="#">How it works</a>
          {userExist ? (
            <div className={classes.log__out} onClick={handleLogout}>
              Log Out
            </div>
          ) : (
            <div className={classes.join_btn}>Sign In</div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
