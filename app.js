const express = require("express");
const { sucess, getUniqueId } = require("./src/utils/helper");
const morgan = require("morgan");
const favicon = require("serve-favicon");
let pokemons = require("./src/db/mock-pokemon");

const app = express();

const port = 3000;

app.get("/", (req, res) => res.send("Hello Express 🥳 2!"));

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(express.json());

app.get("/api/pokemons", (req, res) => {
  const message = `There is ${pokemons.length} pokemons in the pokedex at the moment`;
  res.json(sucess(message, pokemons));
});
app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message = "We found a Pokemon";
  res.json(sucess(message, pokemon));
});

app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId(pokemons);
  const createdPokemon = { ...req.body, ...{ id, created: new Date() } };
  pokemons.push(createdPokemon);
  const message = `The pokemon ${createdPokemon.name} has been created successfully`;
  res.json(sucess(message, createdPokemon));
});

app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedPokemon = { ...req.body, id, updated: new Date() };
  pokemons = pokemons.map((pokemon) =>
    pokemon.id === id ? updatedPokemon : pokemon
  );
  const message = `The pokemon ${updatedPokemon.name} has been updated successfully`;
  res.json(sucess(message, updatedPokemon));
});

app.delete("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const deletedPokemon = pokemons.find((pokemon) => pokemon.id === id);
  pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
  const message = `The pokemon ${deletedPokemon.name} has been deleted successfully`;
  res.json(sucess(message, deletedPokemon));
});

app.listen(port, () =>
  console.log(`Node app started on: http://localhost:${port}`)
);
