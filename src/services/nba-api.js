const config = require("../config");
const fetch = require("node-fetch");

async function fetchNbaApi(path) {
  return fetch(config.NbaApiEndpoint + path, {
    timeout: 2000,
    redirect: "follow",
    headers: {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate",
      Connection: "keep-alive",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36"
    }
  })
    .then(response => response.json())
    .catch(error => {
      console.error(error);
      throw error;
    });
}

let cachedPlayers;
async function getAllPlayers() {
  console.log("#getAllPlayers");
  if (cachedPlayers) {
    console.log("#getAllPlayers: caching");
    return cachedPlayers;
  }
  try {
    console.log("#getAllPlayers: api");
    const SEASON = "2018-19";
    const players = await fetchNbaApi(
      "/commonallplayers?LeagueId=00&Season=" +
        SEASON +
        "&IsOnlyCurrentSeason=1"
    );

    const headers = players.resultSets[0].headers;
    const result = players.resultSets[0].rowSet.map(playerInfo => ({
      playerId: playerInfo[headers.indexOf("PERSON_ID")],
      name: playerInfo[headers.indexOf("DISPLAY_FIRST_LAST")],
      teamId: playerInfo[headers.indexOf("TEAM_ID")],
      teamCity: playerInfo[headers.indexOf("TEAM_CITY")],
      teamName: playerInfo[headers.indexOf("TEAM_NAME")]
    }));
    cachedPlayers = result;
    return result;
  } catch (exception) {
    console.error(exception);
  }
}

async function getSimplePlayerStats(id) {
  const playerInfoResponse = await fetchNbaApi(
    "/playerdashboardbyyearoveryear?" +
      "DateFrom=&" +
      "DateTo=&" +
      "GameSegment=&" +
      "LastNGames=0&" +
      "LeagueID=00&" +
      "Location=&" +
      "MeasureType=Base&" +
      "Month=0&" +
      "OpponentTeamID=0&" +
      "Outcome=&" +
      "PORound=0&" +
      "PaceAdjust=N&" +
      "PerMode=PerGame&" +
      "Period=0&" +
      "PlayerID=" +
      id +
      "&" +
      "PlusMinus=N&" +
      "Rank=N&" +
      "Season=2018-19&" +
      "SeasonSegment=&" +
      "SeasonType=Regular+Season&ShotClockRange=&" +
      "Split=yoy&" +
      "VsConference=&" +
      "VsDivision="
  );

  try {
    const headers = playerInfoResponse.resultSets[0].headers;
    return playerInfoResponse.resultSets[0].rowSet.map(playerInfo => ({
      points: playerInfo[headers.indexOf("PTS")],
      fieldGoalPercentage: playerInfo[headers.indexOf("FG_PCT")],
      threePointPercentage: playerInfo[headers.indexOf("FG3_PCT")],
      freeThrowPercentage: playerInfo[headers.indexOf("FT_PCT")],
      rebounds: playerInfo[headers.indexOf("REB")],
      assists: playerInfo[headers.indexOf("AST")],
      steals: playerInfo[headers.indexOf("STL")],
      turnovers: playerInfo[headers.indexOf("TOV")],
      blocks: playerInfo[headers.indexOf("BLK")]
    }))[0];
  } catch (exception) {
    console.error(exception);
  }
}

async function getAdvancedPlayerStats(id) {
  const playerInfoResponse = await fetchNbaApi(
    "/playerdashboardbyyearoveryear?" +
      "DateFrom=&" +
      "DateTo=&" +
      "GameSegment=&" +
      "LastNGames=0&" +
      "LeagueID=00&" +
      "Location=&" +
      "MeasureType=Advanced&" +
      "Month=0&" +
      "OpponentTeamID=0&" +
      "Outcome=&" +
      "PORound=0&" +
      "PaceAdjust=N&" +
      "PerMode=PerGame&" +
      "Period=0&" +
      "PlayerID=" +
      id +
      "&" +
      "PlusMinus=N&" +
      "Rank=N&" +
      "Season=2018-19&" +
      "SeasonSegment=&" +
      "SeasonType=Regular+Season&ShotClockRange=&" +
      "Split=yoy&" +
      "VsConference=&" +
      "VsDivision="
  );

  try {
    const headers = playerInfoResponse.resultSets[0].headers;
    return playerInfoResponse.resultSets[0].rowSet.map(playerInfo => ({
      offensiveRating: playerInfo[headers.indexOf("OFF_RATING")],
      defensiveRating: playerInfo[headers.indexOf("DEF_RATING")],
      netRating: playerInfo[headers.indexOf("NET_RATING")],
      trueShootingPercentage: playerInfo[headers.indexOf("TS_PCT")],
      effectiveFieldGoalPercentage: playerInfo[headers.indexOf("EFG_PCT")]
    }))[0];
  } catch (exception) {
    console.error(exception);
  }
}

let cachedPlayerInformation = {};
async function getPlayerInformation(id) {
  console.log("#getPlayerInformation");
  if (cachedPlayerInformation && cachedPlayerInformation[id]) {
    console.log("#getPlayerInformation: cached");
    return cachedPlayerInformation[id];
  }
  console.log("#getPlayerInformation: api");
  const playerInfoResponse = await fetchNbaApi(
    "/commonplayerinfo?PlayerId=" + id
  );

  try {
    const headers = playerInfoResponse.resultSets[0].headers;
    const playerInformation = playerInfoResponse.resultSets[0].rowSet.map(
      playerInfo => ({
        playerId: playerInfo[headers.indexOf("PERSON_ID")],
        firstName: playerInfo[headers.indexOf("FIRST_NAME")],
        lastName: playerInfo[headers.indexOf("LAST_NAME")],
        birthDate: playerInfo[headers.indexOf("BIRTHDATE")],
        height: playerInfo[headers.indexOf("HEIGHT")],
        weight: playerInfo[headers.indexOf("WEIGHT")],
        teamId: playerInfo[headers.indexOf("TEAM_ID")],
        teamCity: playerInfo[headers.indexOf("TEAM_CITY")],
        teamName: playerInfo[headers.indexOf("TEAM_NAME")]
      })
    )[0];
    cachedPlayerInformation[id] = playerInformation;
    return playerInformation;
  } catch (exception) {
    console.error(exception);
  }
}

module.exports = {
  getAllPlayers,
  getAdvancedPlayerStats,
  getSimplePlayerStats,
  getPlayerInformation
};
