import React from "react";
import TodayGames from "../Components/TodayGames";
import Loader from "../Components/Loader";
import AppModal from "../Components/AppModal";
import useFetch from "../useFetch";
export default function Live() {
  const [liveGames, loader, error, open, handleClose] = useFetch(
    `http://localhost:8000/games`
  );

  return (
    <div className="game-page-container column-container pages-container">
      {loader && <Loader />}
      {error && <AppModal open={open} handleClose={handleClose} />}
      {liveGames && <TodayGames games={liveGames} />}

      {!liveGames && !loader && !error && (
        <h1>No live games are currently available.</h1>
      )}
    </div>
  );
}
