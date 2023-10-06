import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

import "../css/login.css";

const Login = () => {
  const appId = process.env.REACT_APP_SPOTIFY_ID;
  let state = "nUdjLheEw6VsxUgb";

  const authorizationRedirect = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${appId}&response_type=token&redirect_uri=http://localhost:3000/search&state=${state}`;
  };

  return (
    <>
      <div className="login-container">
        <button
          className="login-container button"
          onClick={authorizationRedirect}
        >
          Login
          <div className="spotifyLogo-container">
            <FontAwesomeIcon
              className="spotifyLogo"
              icon={faSpotify}
              style={{ color: "#1ed760", display: "block" }}
            />
          </div>
        </button>
      </div>
    </>
  );
};

export default Login;
