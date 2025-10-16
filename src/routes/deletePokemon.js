const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  // Delete a pokemon
  app.delete("/api/pokemons/:id", (req, res) => {
    // Find the pokemon by its id
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        const pokemonDeleted = pokemon;
        // If the pokemon doesn't exist, return a 404 error
        if (pokemon === null) {
          const message =
            "The pokemon you requested couldn't be found. Please try again later.";
          return res.status(404).json({ message });
        }
        Pokemon.destroy({
          where: { id: pokemon.id },
        }).then((_) => {
          const message = `The pokemon with the id ${pokemonDeleted.id} has been deleted successfully.`;
          res.json({ message, data: pokemonDeleted });
        });
      })
      .catch((error) => {
        const message =
          "The pokemon couldn't be deleted. Please try again later.";
        res.status(500).json({ message, data: error });
      });
  });
};
