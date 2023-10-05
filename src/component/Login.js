import React from "react";
import Header from "../component/Header";

const Login = () => {
  let state = "nUdjLheEw6VsxUgb";

  const authorizationRedirect = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=ff6fd228fc8c46afba0e6979d3877c8a&response_type=token&redirect_uri=http://localhost:3000/search&state=${state}`;
  };

  return (
    <>
      <Header />
      <button onClick={authorizationRedirect}>Login</button>
    </>
  );
};

export default Login;
