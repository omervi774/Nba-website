import React from "react";
import { Link } from "react-router-dom";

export default function AppNav({ name, ...rest }) {
  const myArray = Object.entries(rest);

  return (
    <nav>
      <ul className={name}>
        {myArray.map((val, index) => {
          return (
            <li key={index}>
              <Link to={val[1].split(",")[0]}>{val[1].split(",")[1]}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
