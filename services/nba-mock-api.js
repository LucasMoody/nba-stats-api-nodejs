const players = require("../mockedData/players.json");
const playersStats = require("../mockedData/playerStats.json");

async function getAllPlayers() {
  return Promise.resolve(players);
}

async function getSimplePlayerStats(id) {
  const player = playersStats.find(
    player => player.playerInformation.playerId == id
  );
  return Promise.resolve({
    points: player.playerStats.points,
    fieldGoalPercentage: player.playerStats.fieldGoalPercentage,
    threePointPercentage: player.playerStats.threePointPercentage,
    freeThrowPercentage: player.playerStats.freeThrowPercentage,
    rebounds: player.playerStats.points,
    assists: player.playerStats.assists,
    steals: player.playerStats.steals,
    turnovers: player.playerStats.turnovers,
    blocks: player.playerStats.blocks
  });
}

async function getAdvancedPlayerStats(id) {
  const player = playersStats.find(
    player => player.playerInformation.playerId == id
  );
  return Promise.resolve({
    offensiveRating: player.playerStats.offensiveRating,
    defensiveRating: player.playerStats.defensiveRating,
    netRating: player.playerStats.netRating,
    trueShootingPercentage: player.playerStats.trueShootingPercentage,
    effectiveFieldGoalPercentage:
      player.playerStats.effectiveFieldGoalPercentage
  });
}

async function getPlayerInformation(id) {
  const player = playersStats.find(
    player => player.playerInformation.playerId == id
  );
  return Promise.resolve(player.playerInformation);
}

module.exports = {
  getAllPlayers,
  getAdvancedPlayerStats,
  getSimplePlayerStats,
  getPlayerInformation
};
