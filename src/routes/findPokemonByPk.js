const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/pokemons/:id", (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null) {
          const message =
            "The pokemon requested doesn't not exist. Please try another pokemon.";
          return res.status(404).json({ message });
        }
        const message = "Un pokémon a bien été trouvé.";
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        const message =
          "The pokemon couldn't be fetched. Please try again later.";
        res.status(500).json({ message, data: error });
      });
  });
};
