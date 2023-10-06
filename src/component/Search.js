import { useState } from "react";
import SpotifyArtist from "./SpotifyArtist";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../css/search.css";

function Search() {
  const [name, setName] = useState("");
  const [data, setData] = useState({ artists: { items: [] } }); // Initialize data structure to match Spotify API response
  const [isLoading, setIsLoading] = useState(false);
  const [err, setError] = useState("");

  const accessToken = window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      if (item) {
        const parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=artist:${encodeURIComponent(
          name
        )}&type=artist&access_token=${accessToken.access_token}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.data || !response.data.artists) {
        throw new Error("No artists found.");
      }

      window.localStorage.setItem("access_token", accessToken.access_token);

      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        {err && <h2 className="error-message">{err}</h2>}
        <div className={"search-container search-container-center"}>
          <div className="search-field">
            <div className="search-input-container">
              <input
                className="input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Search for an artist..."
              />
              <button className="button" onClick={handleClick}>
                <FontAwesomeIcon
                  icon={faSearch}
                  size="1x"
                  style={{ color: "#c4c4c4" }}
                />
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <h2 className="loading-message">Loading...</h2>
        ) : (
          <div className="container">
            {data.artists.items.map((artist) => (
              <SpotifyArtist key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
