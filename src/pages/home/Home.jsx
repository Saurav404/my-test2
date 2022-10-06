import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/list/List";
import "./home.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `/list${type ? "?type=" + type : ""}${
            type ? (genre ? "&genre=" + genre : "?genre=" + genre) : ""
          }`,
          {
            headers: {
              authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGZlMDZkOTBlZDJiNDdhMThiYzRlNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MjA0OTUxOCwiZXhwIjoxNjYyMTM1OTE4fQ.YT6rKRrRfrDb94FkuKlxa-HgTWr2n4qRV0ia72HC35Y",
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err, "THIS IS THE ERROR");
      }
    };
    getRandomLists();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
};

export default Home;
