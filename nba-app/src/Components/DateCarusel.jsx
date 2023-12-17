import React, { useState } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import DaysOfWeek from "./DaysOfWeek";
// import DatePicker from "react-datepicker";
// import { forwardRef } from "react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const date = new Date();
const weekDay = date.getDay();

export default function DateCarusel(props) {
  const [week, setWeek] = useState(() => {
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push(props.currentDay - weekDay + i);
    }
    return arr;
  });

  return (
    <div className="carusel-container centerize-container">
      <SlArrowLeft
        onClick={() => {
          setWeek(week.map((val) => val - 7));
        }}
      />
      {week.map((val, index) => {
        return (
          <DaysOfWeek
            weekDay={days[index]}
            monthDay={val}
            chosenDay={props.currentDay === val && "red"}
            changeDay={props.changeDay}
            key={index}
          />
        );
      })}
      <SlArrowRight
        onClick={() => {
          setWeek(week.map((val) => val + 7));
        }}
      />
    </div>
  );
}
