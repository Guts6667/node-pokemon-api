const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemons");
const UserModel = require("../models/user");
const pokemons = require("./mock-pokemon");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize("pokedex", "root", "root", {
  host: "localhost",
  port: 8889,
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });

    bcrypt.hash("adminpassword", 10).then((hash) => {
      User.create({
        username: "admin",
        password: hash,
      }).then((user) => console.log(user.toJSON()));
    });

    console.log("Database initialized successfully!");
  });
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
