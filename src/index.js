var express = require("express");
var compression = require("compression");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var cors = require("cors");
var app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

routes(app);

const port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log("Example app listening on port %d!", port);
});

// init cache fill scheduling
require("./services/fill-cache-schedule");
