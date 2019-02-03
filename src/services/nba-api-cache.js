let cachedPlayers;
function getAllPlayers() {
  if (cachedPlayers) {
    console.log("Cache::#getAllPlayers: cached");
    return cachedPlayers;
  } else {
    console.log("Cache::#getAllPlayers - nothing in cache");
    return false;
  }
}
function setAllPlayers(players) {
  console.log("Cache::#setAllPlayers");
  cachedPlayers = players;
  return true;
}

let cachedPlayerSimpleStats = {};
function getSimplePlayerStats(id) {
  if (cachedPlayerSimpleStats && cachedPlayerSimpleStats[id]) {
    console.log("Cache::#getSimplePlayerStats - cached for id " + id);
    return cachedPlayerSimpleStats[id];
  } else {
    console.log("Cache::#getSimplePlayerStats - nothing in cache for id " + id);
    return false;
  }
}
function setSimplePlayerStats(id, stats) {
  if (cachedPlayerSimpleStats) {
    console.log("Cache::#setSimplePlayerStats - cached for id " + id);
    cachedPlayerSimpleStats[id] = stats;
    return true;
  } else {
    console.error(
      "Cache::#setSimplePlayerStats - cached for id " + id,
      "cachedPlayerSimpleStats is undefined"
    );
    return false;
  }
}

let cachedPlayerAdvancedStats = {};
function getAdvancedPlayerStats(id) {
  if (cachedPlayerAdvancedStats && cachedPlayerAdvancedStats[id]) {
    console.log("Cache::#getAdvancedPlayerStats - cached for id " + id);
    return cachedPlayerAdvancedStats[id];
  } else {
    console.log(
      "Cache::#cachedPlayerAdvancedStats - nothing in cache for id " + id
    );
    return false;
  }
}
function setAdvancedPlayerStats(id, stats) {
  if (cachedPlayerAdvancedStats) {
    console.log("Cache::#setAdvancedPlayerStats - cached for id " + id);
    cachedPlayerAdvancedStats[id] = stats;
    return true;
  } else {
    console.error(
      "Cache::#setAdvancedPlayerStats - cached for id " + id,
      "cachedPlayerAdvancedStats is undefined"
    );
    return false;
  }
}

let cachedPlayerInformation = {};
function getPlayerInformation(id) {
  if (cachedPlayerInformation && cachedPlayerInformation[id]) {
    console.log("Cache::#getPlayerInformation - cached for id " + id);
    return cachedPlayerInformation[id];
  } else {
    console.log(
      "Cache::#cachedPlayerInformation - nothing in cache for id " + id
    );
    return false;
  }
}
function setPlayerInformation(id, information) {
  if (cachedPlayerAdvancedStats) {
    console.log("Cache::#setPlayerInformation - cached for id " + id);
    cachedPlayerInformation[id] = information;
    return true;
  } else {
    console.error(
      "Cache::#setPlayerInformation - cached for id " + id,
      "cachedPlayerInformation is undefined"
    );
    return false;
  }
}

module.exports = {
  getAllPlayers,
  getAdvancedPlayerStats,
  getSimplePlayerStats,
  getPlayerInformation,
  setAllPlayers,
  setAdvancedPlayerStats,
  setSimplePlayerStats,
  setPlayerInformation
};
