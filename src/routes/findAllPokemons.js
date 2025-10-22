const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequelize");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5;
      const offset = parseInt(req.query.offset) || 0;

      // if (name.length < 2) {
      //   const message = "The name must be at least 2 characters long.";
      //   return res.status(400).json({ message }); // Bad request
      // }

      return Pokemon.findAndCountAll({
        // Use findAndCountAll to get both the count and the rows
        where: {
          name: {
            // We use Op.like to perform a case-insensitive search
            [Op.like]: `%${name}%`, // The % wildcard allows us to search for names that contain the query string anywhere
          },
        },
        order: ["name"], // Order the results by name
        limit: limit, // Limit the number of results
        offset: offset, // Skip the first 'offset' results
      }).then(({ count, rows }) => {
        // Destructure count and rows from the result
        const message = `${count} pokémon(s) found matching the name "${name}".`;
        res.json({ message, data: rows }); // Return only the rows (pokemons)
      });
    } else {
      Pokemon.findAll({ order: ["name"] }) // Order the results by name
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
