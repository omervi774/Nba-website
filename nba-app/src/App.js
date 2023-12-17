import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home.jsx";
import ErrorPage from "./routes/Error-page.jsx";
import Statistics from "./routes/Statistics.jsx";
import Live from "./routes/Live.jsx";
import FavoritesList from "./routes/FavoritesList.jsx";
import FavoritesId from "./routes/FavoritesId.jsx";
import FavoriteLayout from "./routes/FavoriteLayout.jsx";
import H2h from "./routes/H2h.jsx";
import AppNav from "./Components/AppNav.jsx";

function App() {
  return (
    <div className="container column-container">
      <AppNav
        name={"navbar"}
        link1={"/,home"}
        link2={"/statistics,statistics"}
        link3={"/live,live"}
        link4={"/favorites,favorites"}
      />
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/:firstId/:secondId" element={<H2h></H2h>} />

        <Route path="/statistics" element={<Statistics></Statistics>} />
        <Route path="/live" element={<Live></Live>} />

        <Route path="/favorites" element={<FavoriteLayout></FavoriteLayout>}>
          <Route index element={<FavoritesList></FavoritesList>} />
          <Route path=":id" element={<FavoritesId></FavoritesId>} />
          <Route path="new" element={<h1>new favorite</h1>} />
        </Route>

        <Route path="*" element={<h1>not fount</h1>} />
      </Routes>
    </div>
  );
}

export default App;
