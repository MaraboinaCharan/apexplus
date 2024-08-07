const API_URL = 'http://localhost:5600/api';

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users/getUsers`);
  return response.json();
};

export const fetchPokemons = async () => {
  const response = await fetch(`${API_URL}/pokemons/getPokemons`);
  return response.json();
};

export const addPokemon = async (pokemon) => {
  const response = await fetch(`${API_URL}/pokemons/addPokemon`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pokemon),
  });
  return response.json();
};

export const updatePokemon = async (id, updatedPokemon) => {
    const response = await fetch(`${API_URL}/pokemons/updatePokemon/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPokemon),
    });
    return response.json();
  };
  
  export const deletePokemon = async (id) => {
    const response = await fetch(`${API_URL}/pokemons/deletePokemon/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  };
  
export const addUser = async (user) => {
    const response = await fetch(`${API_URL}/users/addUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return response.json();
  };
  
  export const updateUser = async (currentUserName, updatedUser) => {
    const response = await fetch(`${API_URL}/users/updateUser/${currentUserName}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    });
    return response.json();
  };
  
  export const deleteUser = async (currentUserName) => {
    const response = await fetch(`${API_URL}/users/deleteUser/${currentUserName}`, {
      method: 'DELETE',
    });
    return response.json();
  };
  

  export const updatePokemonPosition = async (pokemonId, position) => {
    const response = await fetch(`/api/pokemon/${pokemonId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(position)
    });
    return response.json();
  };
  
  export const fleePokemon = async (pokemonId) => {
    const response = await fetch(`/api/pokemon/${pokemonId}/flee`, {
      method: 'POST'
    });
    return response.json();
  };
  
  export const freezePokemon = async (pokemonId) => {
    const response = await fetch(`/api/pokemon/${pokemonId}/freeze`, {
      method: 'POST'
    });
    return response.json();
  };
  