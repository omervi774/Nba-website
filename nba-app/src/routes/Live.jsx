import React, { useEffect } from "react";
import { useState } from "react";
import TodayGames from "../Components/TodayGames";
import fetchingData from "../fetchingData";
export default function Live() {
  const [liveGames, setLiveGames] = useState([]);
  const fetchLiveGames = async () => {
    const data = await fetchingData("games");
    setLiveGames(data);
  };
  useEffect(() => {
    fetchLiveGames();
  }, []);
  return (
    <div className="game-page-container column-container pages-container">
      {liveGames.length ? (
        <TodayGames games={liveGames} />
      ) : (
        <h1>No live games are currently available.</h1>
      )}
    </div>
  );
}
