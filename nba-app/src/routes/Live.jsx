import React, { useEffect } from "react";
import { useState } from "react";
import TodayGames from "../Components/TodayGames";
export default function Live() {
  const [liveGames, setLiveGames] = useState([]);
  const fetchLiveGames = async () => {
    const jasonData = await fetch(`http://localhost:8000/games`);
    const data = await jasonData.json();
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
