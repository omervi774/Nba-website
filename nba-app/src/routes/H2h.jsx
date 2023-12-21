import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisplayFiveLastGames from "../Components/DisplayFiveLastGames";

import Loader from "../Components/Loader";
import fetchingData from "../fetchingData";
export default function H2h() {
  const { firstId, secondId } = useParams();
  const [firstLast5, setFirstLast5] = useState([]);
  const [secondLast5, setSecondLast5] = useState([]);
  const [last5, setLast5] = useState([]);
  const [loader, setLoader] = useState(true);
  async function fetchAllDetails() {
    const firstTeamGames = await fetchingData(`teams/games/${firstId}`);
    setFirstLast5(firstTeamGames);

    const secondTeamGames = await fetchingData(`teams/games/${secondId}`);
    setSecondLast5(secondTeamGames);

    const gamesBetween = await fetchingData(
      `teams/games/${firstId}/${secondId}`
    );
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
        <Loader />
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
