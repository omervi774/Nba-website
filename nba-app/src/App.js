import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./routes/Home.jsx";
import ErrorPage from "./routes/Error-page.jsx";
import Standings from "./routes/Standings.jsx";
import Live from "./routes/Live.jsx";
import FavoritesList from "./routes/FavoritesList.jsx";
import FavoritesId from "./routes/FavoritesId.jsx";
import FavoriteLayout from "./routes/FavoriteLayout.jsx";
import H2h from "./routes/H2h.jsx";
import AppNav from "./Components/AppNav.jsx";
import PlayersStatistics from "./routes/PlayersStatistics.jsx";
import Teams from "./routes/Teams.jsx";
import TeamInfo from "./routes/TeamInfo.jsx";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the home component after the website finishes loading
    navigate("/games");
  }, []);
  return (
    <div className="container column-container">
      <AppNav
        name={"navbar"}
        link1={"/games,home"}
        link2={"/Standings,Standings"}
        link3={"/live,live"}
        link4={"/teams,teams"}
      />
      <Routes>
        <Route path="/">
          <Route path="games">
            <Route index element={<Home />} />
            <Route path=":firstId/:secondId" element={<H2h />} />
            <Route path="statistics/:gameId" element={<PlayersStatistics />} />
          </Route>
        </Route>

        <Route path="/Standings" element={<Standings />} />
        <Route path="/live" element={<Live />} />

        <Route path="/teams" element={<Teams />}>
          <Route path=":teamId/:teamName" element={<TeamInfo />} />
        </Route>

        <Route path="*" element={<h1>not fount</h1>} />
      </Routes>
    </div>
  );
}

export default App;
