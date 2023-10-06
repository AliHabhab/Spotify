import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import "../css/artist.css";

function Artist() {
  const [artistAlbum, setArtistAlbum] = useState({ items: [] });
  const [artistName, setArtistName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { artistId } = useParams();

  const savedToken = window.localStorage.getItem("access_token");

  useEffect(() => {
    setIsLoading(true);
    const fetchingArtist = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${savedToken}`,
            },
          }
        );

        setArtistName(response.data.name);

        const albumsResponse = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}/albums?&access_token=${savedToken}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        setArtistAlbum(albumsResponse.data);

        if (!albumsResponse.data) {
          throw new Error("No Album found.");
        }
      } catch (err) {
        console.log({ err: err.message });
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchingArtist();
  }, [artistId, savedToken]);

  return (
    <>
      <h1 className="artistNameHeader">{artistName}</h1>
      <h3 className="artistAlbumsHeader">Albums</h3>
      {isLoading && <p>Loading...</p>}
      {error && <h2>{error}</h2>}
      <div className="album-container">
        {artistAlbum.items.map((album) => {
          return (
            <div key={album.id} className="album">
              <div className="album-image">
                <img src={album.images[0].url} alt="Album 1" />
              </div>
              <div className="album-details">
                <p className="album-name">{album.name}</p>
                <p className="artist-name">{album.artists[0].name}</p>
                <p className="album-date">{album.release_date}</p>
                <p className="track-info">{album.total_tracks} tracks</p>
                <Link
                  to={album.external_urls.spotify}
                  className="spotify-preview"
                >
                  Preview on Spotify
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Artist;
