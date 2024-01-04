import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisplayFiveLastGames from "../Components/DisplayFiveLastGames";

import Loader from "../Components/Loader";
import fetchingData from "../fetchingData";
import useFetch from "../useFetch";
import AppModal from "../Components/AppModal";
export default function H2h() {
  const { firstId, secondId } = useParams();
  const [firstLast5, , error1, open, handleClose] = useFetch(
    `http://localhost:8000/teams/games/${firstId}`
  );
  const [secondLast5, , error2] = useFetch(
    `http://localhost:8000/teams/games/${secondId}`
  );
  const [last5, , error3] = useFetch(
    `http://localhost:8000/teams/games/${firstId}/${secondId}`
  );

  // const [loader, setLoader] = useState(true);

  return (
    <div
      className="teams-details-page-container pages-container"
      style={{ display: "flex" }}
    >
      {firstLast5 && secondLast5 && last5 ? (
        <>
          <DisplayFiveLastGames
            games={firstLast5}
            name={
              Number(firstId) === firstLast5[2].home.id
                ? firstLast5[2].home.name
                : firstLast5[2].visitors.name
            }
          />
          <DisplayFiveLastGames
            games={secondLast5}
            name={
              Number(secondId) === secondLast5[2].home.id
                ? secondLast5[2].home.name
                : secondLast5[2].visitors.name
            }
          />
          <DisplayFiveLastGames games={last5} />
        </>
      ) : error1 || error2 || error3 ? (
        <AppModal open={true} handleClose={handleClose} />
      ) : (
        <Loader />
      )}
    </div>
  );
}
