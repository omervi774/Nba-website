import React, { useEffect, useState } from "react";
import AppTable from "../Components/AppTable";
import Loader from "../Components/Loader";
import fetchingData from "../fetchingData";
export default function Standings() {
  const [standings, setStandings] = useState({
    east: [],
    west: [],
  });

  const genericPropsname = (val) => {
    const mp = val.win + val.loss;
    return {
      first: { logo: val.logo, name: val.name },
      second: mp,
      third: val.win,
      forth: val.loss,
      fifth: val.precentage,
    };
  };
  const fetchTeamsStanding = async () => {
    const data = await fetchingData("standings");
    setStandings({
      east: data.slice(0, 15).map(genericPropsname),
      west: data.slice(15).map(genericPropsname),
    });
  };
  useEffect(() => {
    fetchTeamsStanding();
  }, []);
  return (
    <div className="pages-container" style={{ display: "flex", gap: "1.5rem" }}>
      {standings.east.length ? (
        <>
          <AppTable
            firstCell={"EAST CONFERENCE"}
            secondCell={"MP"}
            thirdCell={"W"}
            forthCell={"L"}
            fifthCell={"PCT"}
            content={standings.east}
          />
          <AppTable
            firstCell={"WEST CONFERENCE"}
            secondCell={"MP"}
            thirdCell={"W"}
            forthCell={"L"}
            fifthCell={"PCT"}
            content={standings.west}
          />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
