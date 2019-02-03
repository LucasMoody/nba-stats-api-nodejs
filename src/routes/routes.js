const nbaApi = require("../services/");

var appRouter = function(app) {
  app.get("/", function(request, response) {
    response.status(200).send("Hello");
  });
  app.get("/players", async function(request, response) {
    try {
      const players = await nbaApi.getAllPlayers();
      response.status(200).json(players);
    } catch (error) {
      console.error(error);
      response.status(500);
    }
  });
  app.get("/players/:id", async function(request, response) {
    const id = request.params.id;
    try {
      const [
        playerInformation,
        simplePlayerStats,
        advancedPlayerStats
      ] = await Promise.all([
        nbaApi.getPlayerInformation(id),
        nbaApi.getSimplePlayerStats(id),
        nbaApi.getAdvancedPlayerStats(id)
      ]);
      response.status(200).json({
        playerInformation,
        playerStats: { ...simplePlayerStats, ...advancedPlayerStats }
      });
    } catch (exception) {
      console.error("/player/" + id, exception);
      response.status(500);
    }
  });
};

module.exports = appRouter;
