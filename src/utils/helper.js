const sucess = (message, data) => {
  return { status: "success", message, data };
};

const getUniqueId = (pokemons) => {
  const pokemonsIds = pokemons.map((pokemon) => pokemon.id);
  console.log("Pokemon Ids: " + pokemonsIds);
  const maxId = pokemonsIds.reduce((a, b) => Math.max(a, b), 0);
  console.log("Max Id: " + maxId);
  const uniqueId = maxId + 1;
  console.log("Unique ID: " + uniqueId);
  return uniqueId;
};

export { sucess, getUniqueId };
