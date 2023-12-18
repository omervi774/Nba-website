import express from "express";
import axios from "axios";

const router = express();

const url = "https://api-nba-v1.p.rapidapi.com";
const apiKey = "c582f7932fmsh94e4622ba1b5892p1cf3dbjsnae1e1e44c1ac";

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
  if (game.status.long !== "Finished") {
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

// getting all games acording to specific day.
router.get("/games/:day", async (req, res) => {
  console.log("omer");
  const date = new Date();
  const day = req.params.day;
  const year = date.getFullYear();
  const month = date.getMonth();

  const response = await axios.get(`${url}/games`, {
    params: {
      date: `${year}-${month + 1}-${day}`,
    },
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  });

  res.status(200).json(response.data.response.map(setUpGames));
});

//getting the last 5 games of specific team
router.get("/teams/games/:teamId", async (req, res) => {
  const teamId = req.params.teamId;
  const date = new Date();
  const year = date.getFullYear();

  const response = await axios.get(`${url}/games`, {
    params: {
      season: year.toString(),
      team: teamId,
    },
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  });

  const lastFiveMatches = filteringFiveLastMatches(response.data.response);
  res.status(200).json(lastFiveMatches);
});

//getting the last 5 games between 2 teams
router.get("/teams/games/:firstId/:secondId", async (req, res) => {
  const { firstId, secondId } = req.params;

  const response = await axios.get(`${url}/games`, {
    params: {
      h2h: `${firstId}-${secondId}`,
    },
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  });

  //taking only the games that has been finished
  const lastFiveMatches = filteringFiveLastMatches(response.data.response);
  res.status(200).json(lastFiveMatches);
});

router.get("/players/statistics/:gameId", async (req, res) => {
  const gameId = req.params.gameId;

  try {
    const response = await axios.get(`${url}/players/statistics`, {
      params: {
        game: gameId,
      },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      },
    });
    const filterArray = response.data.response.map((val) => {
      return {
        team: val.team.name.slice(0, 3),
        firstName: val.player.firstname,
        lastName: val.player.lastname[0],
        points: val.points,
        reb: val.totReb,
        assists: val.assists,
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
    const response = await axios.get(`${url}/standings`, {
      params: {
        league: "standard",
        season: year.toString(),
      },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      },
    });
    //console.log(response.data.response);

    const nbaTeams = response.data.response.sort((a, b) => {
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
