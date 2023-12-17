import React from "react";
import DisplayGame from "./DisplayGame";

function DisplayFiveLastGames(props) {
  //   console.log(props.games[0].home.id);
  //   console.log(props.games[0].visitors.id);

  return (
    props.games.length > 0 && (
      <div className="column-container">
        <h1>
          {props.name ? `${props.name} last matches` : "head to head matches"}
        </h1>

        {props.games.map((game) => {
          return (
            <div
              className="game-container"
              style={{
                width: "100%",
                marginBottom: "3rem",
                border: "0.1rem solid rebeccapurple",
              }}
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
          );
        })}
      </div>
    )
  );
}

export default DisplayFiveLastGames;
