const isMockApi = process.env.MOCK === "true";
let api;
if (isMockApi) {
  console.log("Mock API is used");
  api = require("./nba-mock-api");
} else {
  const nbaApi = require("./nba-api");
  const apiCache = require("./nba-api-cache");
  api = {
    getAllPlayers: async function() {
      const cacheResponse = apiCache.getAllPlayers();
      if (cacheResponse) {
        return Promise.resolve(cacheResponse);
      } else {
        const response = await nbaApi.getAllPlayers();
        apiCache.setAllPlayers(response);
        return response;
      }
    },
    getAdvancedPlayerStats: async function(id) {
      const cacheResponse = apiCache.getAdvancedPlayerStats(id);
      if (cacheResponse) {
        return Promise.resolve(cacheResponse);
      } else {
        const response = await nbaApi.getAdvancedPlayerStats(id);
        apiCache.setAdvancedPlayerStats(id, response);
        return response;
      }
    },
    getSimplePlayerStats: async function(id) {
      const cacheResponse = apiCache.getSimplePlayerStats(id);
      if (cacheResponse) {
        return Promise.resolve(cacheResponse);
      } else {
        const response = await nbaApi.getSimplePlayerStats(id);
        apiCache.setSimplePlayerStats(id, response);
        return response;
      }
    },
    getPlayerInformation: async function(id) {
      const cacheResponse = apiCache.getPlayerInformation(id);
      if (cacheResponse) {
        return Promise.resolve(cacheResponse);
      } else {
        const response = await nbaApi.getPlayerInformation(id);
        apiCache.setPlayerInformation(id, response);
        return response;
      }
    }
  };
  console.log("NBA API is used");
}

module.exports = api;
