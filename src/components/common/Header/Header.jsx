import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="App-Header" role="banner" aria-label="PayShare header">
      <div className="App-Header-inner">
        <h1 className="brand">
          Pay<span>Share</span>
        </h1>

        <p className="tagline">
          Smart expense sharing made simple
        </p>
      </div>
    </header>
  );
};

export default Header;