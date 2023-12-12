import React from "react";
import { useParams } from "react-router-dom";
export default function FavoritesId() {
  const { id } = useParams();
  return <h1> Favorites with an id {id}</h1>;
}
