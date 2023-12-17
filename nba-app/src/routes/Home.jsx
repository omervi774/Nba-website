import React, { useEffect, useState } from "react";
import DateCarusel from "../Components/DateCarusel";

import TodayGames from "../Components/TodayGames";

const date = new Date();
const monthDay = date.getDate();

export default function Home() {
  const [day, setDay] = useState(monthDay);
  const [games, setGames] = useState([]);

  async function fetchGames(currentDay) {
    const jasonData = await fetch(`http://localhost:8000/${currentDay}`);
    const data = await jasonData.json();
    console.log(data);
    setGames(data);
  }

  useEffect(() => {
    fetchGames(monthDay);
  }, []);

  function clickedDay(newDay) {
    setDay(newDay);
    fetchGames(newDay);
  }
  return (
    <div className="game-page-container column-container pages-container">
      <DateCarusel changeDay={clickedDay} currentDay={day} />
      <TodayGames games={games} />
    </div>
  );
}
