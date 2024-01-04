import React from "react";
import Loader from "../Components/Loader";
import { Link, Outlet } from "react-router-dom";
import useFetch from "../useFetch";
import AppModal from "../Components/AppModal";

function Teams() {
  const [teams, loader, error, open, closeModal] = useFetch(
    `http://localhost:8000/teams`
  );
  return (
    <div style={{ flexWrap: "wrap" }}>
      {teams &&
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
        })}
      {loader && <Loader />}
      {error && <AppModal open={open} handleClose={closeModal} />}
      <Outlet />
    </div>
  );
}

export default Teams;
