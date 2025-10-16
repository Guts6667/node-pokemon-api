const { Pokemon } = require("../db/sequelize");

// Export a function that takes the Express app as an argument and sets up the route to update a pokemon
module.exports = (app) => {
  // Update a pokemon
  app.put("/api/pokemons/:id", (req, res) => {
    // Get the id from the URL
    const id = req.params.id;
    // Update the pokemon with the data in req.body
    Pokemon.update(req.body, {
      // Where the id is equal to the id in the URL
      where: { id: id },
    })
      // If the update is successful, find the pokemon by its id
      .then((_) => {
        // Return the updated pokemon
        return Pokemon.findByPk(id).then((pokemon) => {
          // If the pokemon doesn't exist, return a 404 error
          if (pokemon === null) {
            const message =
              "The pokemon requested does not exist. Please try another pokemon.";
            return res.status(404).json({ message });
          }

          // Return a success message and the updated pokemon
          const message = `The pokemon ${pokemon.name} has been updated successfully.`;
          res.json({ message, data: pokemon });
        });
      })
      // If there is an error, return a 500 error
      .catch((error) => {
        const message =
          "The pokemon couldn't be updated. Please try again later.";
        res.status(500).json({ message, data: error });
      });
  });
};
