const { ValidationError } = require("sequelize");
const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/pokemons", (req, res) => {
    Pokemon.create(req.body)
      .then((pokemon) => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`;
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        // instanceof is a JavaScript operator that checks if an object is an instance of a specific class or constructor function.
        // ValidationError is a class provided by Sequelize that represents validation errors that occur when trying to create or update a model instance.
        // In other words, this line checks if the error that occurred during the creation of the Pokemon instance is specifically a validation error.
        // If it is, the code will handle it differently (by returning a 400 status code and the error message) compared to other types of errors (which will return a 500 status code).
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "The pokemon couldn't be created. Please try again later.";
        res.status(500).json({ message, data: error });
      });
  });
};
