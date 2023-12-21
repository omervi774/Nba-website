import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import AppTable from "../Components/AppTable";
import fetchingData from "../fetchingData";

function PlayersStatistics(props) {
  const { gameId } = useParams();

  const [data, setData] = useState([]);

  const fetchPlayersStatistics = async () => {
    const data = await fetchingData(`players/statistics/${gameId}`);
    setData(data);
  };

  useEffect(() => {
    fetchPlayersStatistics();
  }, []);

  return (
    <>
      {data.length === 0 ? (
        <Loader />
      ) : (
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
