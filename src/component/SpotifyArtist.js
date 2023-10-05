import React from "react";

import "./spotifyArtist.css";

function SpotifyArtist({ imageSrc, name, followers, rating }) {
  return (
    <div className="box">
      <img src={imageSrc} alt="Album Cover" className="image" />
      <div className="name">{name}</div>
      <div className="followers">Followers: {followers}</div>
      <div className="rating">
        {Array.from({ length: rating }, (_, index) => (
          <div key={index} className="star">
            ★
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpotifyArtist;
