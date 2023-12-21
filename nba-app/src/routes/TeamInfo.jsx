import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppTable from "../Components/AppTable";

function TeamInfo(props) {
  const { teamId, teamName } = useParams();
  const [team, setTeam] = useState([]);
  const getTeam = async () => {
    const jasonData = await fetch(`http://localhost:8000/teams/${teamId}`);
    const data = await jasonData.json();
    setTeam(data);
  };
  useEffect(() => {
    getTeam();
  }, [teamId]);
  return (
    <>
      {team.length > 0 && (
        <div
          className="column-container"
          style={{ flex: "1", alignItems: "center", marginTop: "2rem" }}
        >
          <h1>{teamName} stats:</h1>
          <AppTable
            style={{ width: "20rem" }}
            firstCell={"MP"}
            secondCell={"PTS"}
            thirdCell={"FGP"}
            forthCell={"AST"}
            fifthCell={"REB"}
            content={team}
          />
        </div>
      )}
    </>
  );
}

export default TeamInfo;
