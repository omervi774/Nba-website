import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import AppTable from "../Components/AppTable";
import fetchingData from "../fetchingData";
import AppModal from "../Components/AppModal";
import useFetch from "../useFetch";

function PlayersStatistics(props) {
  const { gameId } = useParams();
  const [data, loader, error, open, handleClose] = useFetch(
    `https://wild-tan-codfish-shoe.cyclic.app/players/statistics/${gameId}`
  );

  return (
    <>
      {loader && <Loader />}
      {error && <AppModal open={open} handleClose={handleClose} />}
      {data && (
        <AppTable
          firstCell={"PLAYER"}
          secondCell={"TEAM"}
          thirdCell={"PTS"}
          forthCell={"REB"}
          fifthCell={"AST"}
          content={data}
        />
      )}
    </>
  );
}

export default PlayersStatistics;
