const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequelize");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    if (req.query.name) {
      const name = req.query.name;

      if (name.length < 3) {
        const message = "The name must be at least 3 characters long.";
        return res.status(400).json({ message }); // Bad request
      }

      return Pokemon.findAll({
        where: {
          name: {
            // We use Op.like to perform a case-insensitive search
            [Op.like]: `%${name}%`, // The % wildcard allows us to search for names that contain the query string anywhere
          },
        },
      }).then((pokemons) => {
        const message = `La liste des pokémons avec le nom ${name} a bien été récupérée.`;
        res.json({ message, data: pokemons });
      });
    } else {
      Pokemon.findAll()
        .then((pokemons) => {
          const message = "La liste des pokémons a bien été récupérée.";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message =
            "The Pokemon's list couldn't be fetched. Please try again later.";
          res.status(500).json({ message, data: error });
        });
    }
  });
};
