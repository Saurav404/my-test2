import "./featured.scss";
import { PlayArrow } from "@material-ui/icons";
import { InfoOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Featured = ({ type }) => {
  const [content, setContent] = useState({});
  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGZlMDZkOTBlZDJiNDdhMThiYzRlNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MjA0OTUxOCwiZXhwIjoxNjYyMTM1OTE4fQ.YT6rKRrRfrDb94FkuKlxa-HgTWr2n4qRV0ia72HC35Y",
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option> Genre</option>
            <option value="adventure"> Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="historical">Historical</option>
            <option value="sci-fi">sci-fi</option>
            <option value="magic">Magic</option>
            <option value="Thriller">Thriller</option>
            <option value="animation">Animation</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="" />
      <div className="info">
        <img src={content.imgTitle} alt="" />

        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <Link to="/watch" state={{ movie: content }} className="link">
            <button className="play">
              <PlayArrow />
              <span>Play</span>
            </button>
          </Link>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
