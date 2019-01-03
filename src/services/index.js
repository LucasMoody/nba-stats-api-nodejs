const isMockApi = process.env.MOCK === "true";
let api;
if (isMockApi) {
  console.log("Mock API is used");
  api = require("./nba-mock-api");
} else {
  api = require("./nba-api");
  console.log("NBA API is used");
}

module.exports = api;
