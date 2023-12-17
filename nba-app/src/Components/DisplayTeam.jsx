import React from "react";

export default function DisplayTeam(props) {
  return (
    <div className="column-container centerize-container">
      <img src={props.logo}></img>
      <p>{props.name}</p>
      {props.score && <h2>{props.score}</h2>}
    </div>
  );
}
