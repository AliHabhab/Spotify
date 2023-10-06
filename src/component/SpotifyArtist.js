import React from "react";

import { Link } from "react-router-dom";
import "../css/spotifyArtist.css";

const SpotifyArtist = ({ artist }) => {
  const imageSrc = artist.images && artist.images[0] && artist.images[0].url;

  return (
    <>
      <Link to={`/artist/${artist.id}`} className="link">
        <div className={`box ${!imageSrc ? "no-image" : ""}`}>
          <div
            className="image"
            style={{
              backgroundImage: `url(${imageSrc})`,
            }}
          ></div>
          <div className="info">
            <div className="name">{artist.name}</div>
            <div className="followers">Followers: {artist.followers.total}</div>
            <div className="rating">
              {Array.from({ length: artist.popularity / 20 }, (_, index) => (
                <div key={index} className="star">
                  ★
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SpotifyArtist;
