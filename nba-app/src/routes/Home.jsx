import React, { useState } from "react";
import TodayGames from "../Components/TodayGames";
import Loader from "../Components/Loader";
import AppModal from "../Components/AppModal";
import useFetch from "../useFetch";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";
//ThemeProvider

export default function Home() {
  const [value, setValue] = useState(dayjs());
  const [games, loader, error, open, handleClose] = useFetch(
    `https://wild-tan-codfish-shoe.cyclic.app/games/${value.date()}/${value.month()}/${value.year()}`
  );

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
                  setValue(newValue);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        {loader && <Loader />}
        {error && <AppModal open={open} handleClose={handleClose} />}
        {games && <TodayGames games={games} />}
      </div>
    </div>
  );
}
