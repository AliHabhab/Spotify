import { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Card from "./Card";
import "./search.css";

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
            Authorization: `Bearer ${accessToken.access_token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.data || !response.data.artists) {
        throw new Error("No artists found.");
      }

      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div>
        {err && <h2>{err}</h2>}
        <div className="search-container">
          <input
            className="search-container input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Search for an artist..."
          />
          <button className="search-container button" onClick={handleClick}>
            Search
          </button>
        </div>

        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <div>
            {data.artists.items.map((artist) => (
              <Card key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
