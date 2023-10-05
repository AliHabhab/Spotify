import React from "react";
import list from "../constants/artists";
import Header from "../component/Header";
import SpotifyArtist from "./SpotifyArtist";

const Card = () => {
  return (
    <>
      <Header />
      <div className="container">
        {list.map((artist) => (
          <>
            <SpotifyArtist
              imageSrc={artist.imageSrc}
              name={artist.artName}
              followers={artist.followers}
              rating={artist.rating}
            />
          </>
        ))}
      </div>
    </>
  );
};

export default Card;
