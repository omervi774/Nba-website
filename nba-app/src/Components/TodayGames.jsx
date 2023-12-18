import React from "react";
import DisplayGame from "./DisplayGame";

import AppNav from "./AppNav";
export default function TodayGames(props) {
  return (
    // Remove the curly braces around the condition
    props.games.length > 0 &&
    props.games.map((game, index) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          border: "0.1rem solid rebeccapurple",
          justifyContent: "center",
          marginBottom: "3rem",

          // alignItems: "center",
        }}
        key={index}
      >
        {game.status === "Finished" ? (
          <AppNav
            name={"navbar played-games-nav"}
            link1={`/games/${game.home.id}/${game.visitors.id},h2h`}
            link2={`/games/statistics/${game.gameId},player statistics`}
          />
        ) : (
          <AppNav
            name={"navbar played-games-nav"}
            link1={`/games/${game.home.id}/${game.visitors.id},h2h`}
            link2={`/statistics,player statistics`}
          />
        )}
        <div
          className="game-container"
          key={game.id} // Add a unique key for each element in the array
        >
          <DisplayGame
            homeLogo={game.home.logo}
            homeName={game.home.name}
            homeScore={game.home.score && game.home.score}
            time={game.time && game.time}
            visitorsLogo={game.visitors.logo}
            visitorsName={game.visitors.name}
            visitorsScore={game.visitors.score && game.visitors.score}
          />
        </div>
      </div>
    ))
  );
}
