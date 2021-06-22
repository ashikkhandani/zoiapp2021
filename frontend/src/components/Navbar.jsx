import React from "react";
import logo from "../imgs/logo.png";
import Navigation from "./Navigation";

const Navbar = () => {
  return (
    <div>
      <Navigation />
      <div className="header">
        <div className="logo-box">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="text-wrap">
          <h1 className="title-wrap">
            <span className="title">
              ZO<span>&xi;</span>
            </span>
            <span className="subTitle">
              <i>your life matters</i>
            </span>
          </h1>
        </div>
        <a href="#" className="button">
          Im a Doctor
        </a>
        <a href="#" className="button">
          Im a Patient
        </a>
      </div>
    </div>
  );
};

export default Navbar;
