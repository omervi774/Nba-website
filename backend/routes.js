import express from "express";
import axios from "axios";

const router = express();
const url = "https://api-nba-v1.p.rapidapi.com";
const apiKey = "c582f7932fmsh94e4622ba1b5892p1cf3dbjsnae1e1e44c1ac";
const todayDate = new Date();
const whatMonth = todayDate.getMonth();

async function getData({ route, ...rest }) {
  console.log(rest);
  console.log(route);
  const response = await axios.get(`${url}/${route}`, {
    params: rest,

    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  });
  return response.data.response;
}
// getting game details and return obj with only the neceserly details
function setUpGames(game) {
  let obj = {};
  let homeTeam = {};
  let visitorsTeam = {};

  homeTeam.id = game.teams.home.id;
  homeTeam.name = game.teams.home.nickname;
  homeTeam.logo = game.teams.home.logo;

  visitorsTeam.id = game.teams.visitors.id;
  visitorsTeam.name = game.teams.visitors.nickname;
  visitorsTeam.logo = game.teams.visitors.logo;

  obj.gameId = game.id;
  obj.status = game.status.long;
  if (game.status.long === "Scheduled") {
    const utcDate = new Date(game.date.start);
    const localHour = utcDate.getHours();
    const localMin = utcDate.getMinutes();
    let localTime;
    if (localHour < 10 && localMin < 10) {
      localTime = `0${localHour}:0${localMin}`;
    } else if (localHour < 10 && localMin >= 10) {
      localTime = `0${localHour}:${localMin}`;
    } else if (localHour >= 10 && localMin < 10) {
      localTime = `${localHour}:0${localMin}`;
    } else {
      localTime = `${localHour}:${localMin}`;
    }
    obj.time = localTime;
  } else {
    homeTeam.score = game.scores.home.points;
    visitorsTeam.score = game.scores.visitors.points;
  }
  obj.home = homeTeam;
  obj.visitors = visitorsTeam;
  return obj;
}

function filteringFiveLastMatches(games) {
  const finishedGames = games.filter((val) => {
    return val.status.long === "Finished";
  });
  // return the last 5 games
  const length = finishedGames.length;

  return finishedGames
    .filter((val, index) => {
      return index + 5 >= length;
    })
    .map(setUpGames);
}

//getting all live games
router.get("/games", async (req, res) => {
  try {
    const data = await getData({ route: "games", live: "all" });
    res.status(200).json(data.map(setUpGames));
  } catch (e) {
    console.log(e);
  }
});

// getting all games acording to specific day.
router.get("/games/:day/:month/:year", async (req, res) => {
  console.log("omer");
  const { day, month, year } = req.params;
  console.log("mon", Number(month) + 1);
  console.log("day", day);
  // const year = date.getFullYear();
  // const month = date.getMonth();
  let correctDay;
  let correctMon;
  if (day.length === 1) {
    correctDay = `0${day}`;
  } else {
    correctDay = day;
  }

  if (month.length === 1) {
    correctMon = `0${Number(month) + 1}`;
  } else {
    correctMon = Number(month) + 1;
  }

  try {
    const data = await getData({
      route: "games",
      date: `${year}-${correctMon}-${correctDay}`,
    });
    res.status(200).json(data.map(setUpGames));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/teams", async (req, res) => {
  try {
    const data = await getData({ route: "teams" });
    res.status(200).json(
      data
        .filter((val) => {
          return val.logo !== null && val.nbaFranchise;
        })
        .map((val) => {
          return { id: val.id, logo: val.logo, name: val.name };
        })
    );
  } catch (e) {}
});
router.get("/teams/:teamId", async (req, res) => {
  const date = new Date();
  const year = date.getFullYear();
  const { teamId } = req.params;
  console.log(teamId);
  try {
    const data = await getData({
      route: "teams/statistics",
      id: teamId,
      season: whatMonth >= 0 && whatMonth < 9 ? `${year - 1}` : `${year}`,
    });
    console.log(data);
    res.status(200).json(
      data.map((val) => {
        return {
          first: val.games,
          second: val.points,
          third: val.fgp,
          forth: val.assists,
          fifth: val.totReb,
        };
      })
    );
  } catch (e) {}
});
//getting the last 5 games of specific team
router.get("/teams/games/:teamId", async (req, res) => {
  const teamId = req.params.teamId;
  const date = new Date();
  const year = date.getFullYear();
  try {
    const data = await getData({
      route: "games",
      season: whatMonth >= 0 && whatMonth < 9 ? `${year - 1}` : `${year}`,
      team: teamId,
    });
    const lastFiveMatches = filteringFiveLastMatches(data);
    res.status(200).json(lastFiveMatches);
  } catch (e) {
    console.log(e);
  }
});

//getting the last 5 games between 2 teams
router.get("/teams/games/:firstId/:secondId", async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const data = await getData({
      route: "games",
      h2h: `${firstId}-${secondId}`,
    });
    const lastFiveMatches = filteringFiveLastMatches(data);
    res.status(200).json(lastFiveMatches);
  } catch (e) {
    console.log(e);
  }
});

router.get("/players/statistics/:gameId", async (req, res) => {
  const gameId = req.params.gameId;

  try {
    const data = await getData({ route: "players/statistics", game: gameId });
    const filterArray = data.map((val) => {
      return {
        first: val.player.firstname + " " + val.player.lastname[0],
        second: val.team.name.slice(0, 3),
        third: val.points,
        forth: val.totReb,
        fifth: val.assists,
      };
    });
    res.status(200).json(filterArray);
  } catch (e) {
    console.log("whats up ");
  }
});

router.get("/standings", async (req, res) => {
  console.log("omer");
  const date = new Date();
  const year = date.getFullYear();
  try {
    const data = await getData({
      route: "standings",
      league: "standard",
      season: whatMonth >= 0 && whatMonth < 9 ? `${year - 1}` : `${year}`,
    });
    const nbaTeams = data.sort((a, b) => {
      const conferenceComparison = a.conference.name.localeCompare(
        b.conference.name
      );

      // If conferences are different, sort by conference
      if (conferenceComparison !== 0) {
        return conferenceComparison;
      }

      // If conferences are the same, sort by record (descending)
      return a.conference.rank - b.conference.rank;
    });
    res.status(200).json(
      nbaTeams.map((val) => {
        return {
          name: val.team.name,
          logo: val.team.logo,
          win: val.conference.win,
          loss: val.conference.loss,
          precentage: val.win.percentage,
        };
      })
    );
  } catch (e) {
    console.log(e);
  }
});
export default router;
