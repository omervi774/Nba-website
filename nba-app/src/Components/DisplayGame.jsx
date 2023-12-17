import React from "react";
import DisplayTeam from "./DisplayTeam";

export default function DisplayGame(props) {
  return (
    <>
      <DisplayTeam
        logo={props.homeLogo}
        name={props.homeName}
        score={props.homeScore && props.homeScore}
      />
      {props.time && (
        <h1>
          {props.time}
          {props.time[0] === "0" ? "AM" : "PM"}
        </h1>
      )}

      <DisplayTeam
        logo={props.visitorsLogo}
        name={props.visitorsName}
        score={props.visitorsScore && props.visitorsScore}
      />
    </>
  );
}
