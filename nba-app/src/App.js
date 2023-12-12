import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./routes/Home.jsx";
import ErrorPage from "./routes/Error-page.jsx";
import Statistics from "./routes/Statistics.jsx";
import Live from "./routes/Live.jsx";
import FavoritesList from "./routes/FavoritesList.jsx";
import FavoritesId from "./routes/FavoritesId.jsx";
import FavoriteLayout from "./routes/FavoriteLayout.jsx";

function App() {
  return (
    <>
      <nav>
        <ul className="navbar">
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/statistics">statistics</Link>
          </li>
          <li>
            <Link to="/live">live</Link>
          </li>
          <li>
            <Link to="/favorites">favorites</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/statistics" element={<Statistics></Statistics>} />
        <Route path="/live" element={<Live></Live>} />

        <Route path="/favorites" element={<FavoriteLayout></FavoriteLayout>}>
          <Route index element={<FavoritesList></FavoritesList>} />
          <Route path=":id" element={<FavoritesId></FavoritesId>} />
          <Route path="new" element={<h1>new favorite</h1>} />
        </Route>

        <Route path="*" element={<h1>not fount</h1>} />
      </Routes>
    </>
  );
}

export default App;
