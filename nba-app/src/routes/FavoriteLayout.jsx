import React from "react";
import { Link, Outlet } from "react-router-dom";
export default function FavoriteLayout() {
  return (
    <>
      <Link to="/favorites/1"> Favorite 1</Link>
      <br></br>
      <Link to="/favorites/2"> Favorite 2</Link>
      <br></br>
      <Link to="/favorites/new"> new</Link>
      <br></br>
      <Outlet />
    </>
  );
}
