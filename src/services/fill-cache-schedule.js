var api = require("./nba-api");
var cache = require("./nba-api-cache");
var apiCacheCombined = require("./index");
var queue = require("../queue");
var schedule = require("node-schedule");

async function fillPlayerCache() {
  const players = await api.getAllPlayers();
  cache.setAllPlayers(players);
}

async function fillPlayerInformation() {
  console.log("FillCache::#fillPlayerInformation");
  const players = (await apiCacheCombined.getAllPlayers()).splice(0, 10);
  const fillInfoForPlayer = async player => {
    try {
      console.log(
        "FillCache::#fillPlayerInformation for id: " + player.playerId
      );
      const info = await api.getPlayerInformation(player.playerId);
      cache.setPlayerInformation(player.playerId, info);
    } catch (error) {
      console.error("ERROR - FillCache::#fillPlayerInformation", error);
    }
  };
  return queue.queueWithPause(players, fillInfoForPlayer, 10000);
}

async function fillSimplePlayerStats() {
  console.log("FillCache::#fillSimplePlayerStats");
  const players = (await apiCacheCombined.getAllPlayers()).splice(0, 10);
  const fillSimpleStatsForPlayer = async player => {
    try {
      console.log(
        "FillCache::#fillSimplePlayerStats for id: " + player.playerId
      );
      const stats = await api.getSimplePlayerStats(player.playerId);
      cache.setSimplePlayerStats(player.playerId, stats);
    } catch (error) {
      console.error("ERROR - FillCache::#fillSimplePlayerStats", error);
    }
  };
  return queue.queueWithPause(players, fillSimpleStatsForPlayer, 1000);
}

async function fillAdvancedPlayerStats() {
  console.log("FillCache::#fillAdvancedPlayerStats");
  const players = (await apiCacheCombined.getAllPlayers()).splice(0, 10);
  const fillSimpleStatsForPlayer = async player => {
    try {
      console.log(
        "FillCache::#fillAdvancedPlayerStats for id: " + player.playerId
      );
      const stats = await api.getAdvancedPlayerStats(player.playerId);
      cache.setAdvancedPlayerStats(player.playerId, stats);
    } catch (error) {
      console.error("ERROR - FillCache::#fillAdvancedPlayerStats", error);
    }
  };
  return queue.queueWithPause(players, fillSimpleStatsForPlayer, 5000);
}

// initial cache filling at startup
/*fillPlayerCache()
  .then(_ => fillPlayerInformation())
  .then(_ => fillSimplePlayerStats())
  .then(_ => fillAdvancedPlayerStats())
  .then(_ => console.)
  .catch(console.error);*/

async function initializeCache() {
  try {
    await fillPlayerCache();
    await fillPlayerInformation();
    await fillSimplePlayerStats();
    await fillAdvancedPlayerStats();
    console.log("Chace initiliziation is done");
  } catch (error) {
    console.error("ERROR - Cache initialization", error);
  }
}

initializeCache();

schedule.scheduleJob("10 4 * * *", async function() {
  console.log("Schedule::fillPlayerCache - Start cache update");
  await fillPlayerCache();
  console.log("Schedule::fillPlayerCache - Finish cache update");
});

schedule.scheduleJob("10 4 * * *", async function() {
  console.log("Schedule::fillPlayerInformation - Start cache update");
  await fillPlayerInformation();
  console.log("Schedule::fillPlayerInformation - Finish cache update");
});

schedule.scheduleJob("0 6 * * *", async function() {
  console.log("Schedule::fillSimplePlayerStats - Start cache update");
  await fillSimplePlayerStats();
  console.log("Schedule::fillSimplePlayerStats - Finish cache update");
});

schedule.scheduleJob("30 6 * * *", async function() {
  console.log("Schedule::fillAdvancedPlayerStats - Start cache update");
  await fillAdvancedPlayerStats();
  console.log("Schedule::fillAdvancedPlayerStats - Finish cache update");
});
