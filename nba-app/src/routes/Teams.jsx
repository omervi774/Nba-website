import React, { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import { Link, Outlet } from "react-router-dom";

function Teams() {
  const [teams, setTeams] = useState([]);

  const getTeams = async () => {
    const jasonData = await fetch(`http://localhost:8000/teams`);
    const data = await jasonData.json();
    console.log(data);
    setTeams(data);
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <div style={{ flexWrap: "wrap" }}>
      {teams.length ? (
        teams.map((val, index) => {
          return (
            <Link
              to={`/teams/${val.id}/${val.name}`}
              key={index}
              style={{ padding: "49.6" }}
            >
              <img
                src={val.logo}
                style={{
                  marginRight: "0.1rem",
                  height: "1.rem",
                  width: "3rem",
                }}
              ></img>
            </Link>
          );
        })
      ) : (
        <Loader />
      )}
      <Outlet />
    </div>
  );
}

export default Teams;
