import React, { useEffect, useState } from "react";
import TodayGames from "../Components/TodayGames";
import fetchingData from "../fetchingData";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";
//ThemeProvider

export default function Home() {
  const [value, setValue] = useState(dayjs());

  const [games, setGames] = useState([]);

  async function fetchGames(currentDay, currentMonth, year) {
    let url = `games/${currentDay}/${currentMonth}/${year}`;

    const data = await fetchingData(url);
    setGames(data);
  }

  useEffect(() => {
    fetchGames(value.date(), value.month(), value.year());
  }, []);

  return (
    <div>
      <div className="game-page-container column-container pages-container">
        <div style={{ marginBottom: "3rem" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="pick a date"
                value={value}
                onChange={(newValue) => {
                  console.log(newValue.date());
                  setValue(newValue);
                  fetchGames(
                    newValue.date(),
                    newValue.month(),
                    newValue.year()
                  );
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <TodayGames games={games} />
      </div>
    </div>
  );
}
