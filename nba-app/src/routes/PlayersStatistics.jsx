import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import AppTable from "../Components/AppTable";

function PlayersStatistics(props) {
  const { gameId } = useParams();

  const [data, setData] = useState([]);

  const fetchPlayersStatistics = async () => {
    console.log(gameId);
    const jasonData = await fetch(
      `http://localhost:8000/players/statistics/${gameId}`
    );
    const data = await jasonData.json();
    console.log(data[0].team);
    setData(
      data.map((val) => {
        return {
          first: val.firstName + " " + val.lastName,
          second: val.team,
          third: val.points,
          forth: val.reb,
          fifth: val.assists,
        };
      })
    );
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
