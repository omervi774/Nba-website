import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppTable from "../Components/AppTable";
import fetchingData from "../fetchingData";
import useFetch from "../useFetch";
import Loader from "../Components/Loader";
import AppModal from "../Components/AppModal";

function TeamInfo(props) {
  const { teamId, teamName } = useParams();
  const [team, loader, error, open, closeModal] = useFetch(
    `https://wild-tan-codfish-shoe.cyclic.app/teams/${teamId}`
  );

  return (
    <>
      {team && (
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

      {error && <AppModal open={open} handleClose={closeModal} />}
    </>
  );
}

export default TeamInfo;
