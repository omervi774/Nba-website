import React from "react";

export default function DaysOfWeek(props) {
  return (
    <div
      onClick={() => {
        props.changeDay(props.monthDay);
      }}
      className="week-days-container column-container centerize-container"
      style={{ color: props.chosenDay ? props.chosenDay : null }}
    >
      <p> {props.weekDay}</p>
      <h2> {props.monthDay}</h2>
    </div>
  );
}
