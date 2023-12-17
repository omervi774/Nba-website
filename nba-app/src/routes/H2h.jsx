import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisplayFiveLastGames from "../Components/DisplayFiveLastGames";
import ReactLoading from "react-loading";
export default function H2h() {
  const { firstId, secondId } = useParams();
  const [firstLast5, setFirstLast5] = useState([]);
  const [secondLast5, setSecondLast5] = useState([]);
  const [last5, setLast5] = useState([]);
  const [loader, setLoader] = useState(true);
  async function fetchAllDetails() {
    const firstTeamJason = await fetch(
      `http://localhost:8000/games/${firstId}`
    );
    const firstTeamGames = await firstTeamJason.json();
    setFirstLast5(firstTeamGames);

    const secondTeamJason = await fetch(
      `http://localhost:8000/games/${secondId}`
    );
    const secondTeamGames = await secondTeamJason.json();
    setSecondLast5(secondTeamGames);

    const gamesBetweenJason = await fetch(
      `http://localhost:8000/games/${firstId}/${secondId}`
    );
    const gamesBetween = await gamesBetweenJason.json();
    setLast5(gamesBetween);
    setLoader(false);
    console.log(firstTeamGames);
  }
  useEffect(() => {
    fetchAllDetails();
  }, []);
  return (
    <div className="teams-details-page-container pages-container">
      {loader ? (
        <div className="centerize-container">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#36D7B7"}
            height={50}
            width={50}
          />
          <h1 style={{ color: "#36D7B7", marginLeft: "0.3rem" }}>loading...</h1>
        </div>
      ) : (
        <>
          <DisplayFiveLastGames
            games={firstLast5}
            name={
              Number(firstId) === firstLast5[2].home.id
                ? firstLast5[2].home.name
                : firstLast5[2].visitors.name
            }
          />
          <DisplayFiveLastGames
            games={secondLast5}
            name={
              Number(secondId) === secondLast5[2].home.id
                ? secondLast5[2].home.name
                : secondLast5[2].visitors.name
            }
          />
          <DisplayFiveLastGames games={last5} />
        </>
      )}
    </div>
  );
}
