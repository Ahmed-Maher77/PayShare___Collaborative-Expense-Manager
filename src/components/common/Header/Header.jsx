import React from "react";
import "./Header.css";
import logo from "../../../assets/images/logo.svg";

const Header = () => {
  return (
    <header className="App-Header" role="banner" aria-label="PayShare header">
      <div className="App-Header-inner">
        <h1 className="brand">
          <img className="brand-logo" src={logo} alt="PayShare logo" />
          <span className="brand-name">
            Pay<span>Share</span>
          </span>
        </h1>

        <p className="tagline">
          Smart expense sharing made simple
        </p>
      </div>
    </header>
  );
};

export default Header;