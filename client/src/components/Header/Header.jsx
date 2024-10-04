import React, { useState } from "react";
import classes from "./Header.module.css";
import headerLogo from "../../assets/evangadi.png";
import { Link } from "react-router-dom";

function Header() {
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
          <Link to="/login" className={classes.join_btn}>
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
