import React from "react";

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: "#CDCDCD",
        padding: "5px",
        margin: "0",
        borderBottom: "1px solid #000",
      }}
    >
      <h1
        style={{
          fontSize: "15px",
          marginLeft: "30px",
        }}
      >
        Spotify Artist Search
      </h1>
    </header>
  );
};

export default Header;
