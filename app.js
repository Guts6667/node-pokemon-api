const express = require("express");
const sequelize = require("./src/db/sequelize");
const morgan = require("morgan");
const favicon = require("serve-favicon");

const app = express();

const port = 3000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(express.json());

sequelize.initDb();

// API's Endpoints
require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);

// Adding routes handling errors
// 404 Not Found Express will execute this function if no route has been matched (i.e. no endpoint has been found).

app.use(({ res }) => {
  const message = "Cannot find this resource. Please try another URL.";
  res.status(404).json({ message });
});

app.listen(port, () =>
  console.log(`Node app started on: http://localhost:${port}`)
);
