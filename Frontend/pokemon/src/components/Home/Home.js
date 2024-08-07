import React, { useState, useEffect } from 'react';
import { fetchUsers, updatePokemonPosition, fleePokemon, freezePokemon } from '../../services/api.js';
// import getPokemonUsers
// import './Home.css';

const Home = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [pokemonUsers, setPokemonUsers] = useState([]);
  const [movingPokemons, setMovingPokemons] = useState({}); // To track moving Pokémon

  useEffect(() => {
    const fetchPokemonUsers = async () => {
      const data = await fetchUsers();
      setPokemonUsers(data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    // Update Pokémon positions periodically
    const interval = setInterval(() => {
      Object.keys(movingPokemons).forEach(async (pokemonId) => {
        const pokemon = movingPokemons[pokemonId];
        if (pokemon) {
          // Calculate new position based on speed and direction
          const newPositionX = pokemon.positionX + pokemon.speed * Math.cos(pokemon.direction);
          const newPositionY = pokemon.positionY + pokemon.speed * Math.sin(pokemon.direction);
          
          // Update position in the backend
          await updatePokemonPosition(pokemonId, { positionX: newPositionX, positionY: newPositionY });
          
          // Update state with new position
          setMovingPokemons(prev => ({
            ...prev,
            [pokemonId]: { ...pokemon, positionX: newPositionX, positionY: newPositionY }
          }));
        }
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [movingPokemons]);

  const handleGo = (pokemon) => {
    setMovingPokemons(prev => ({
      ...prev,
      [pokemon.id]: { ...pokemon, direction: Math.random() * 2 * Math.PI }
    }));
  };

  const handleFlee = async (pokemon) => {
    await fleePokemon(pokemon.id);
    setMovingPokemons(prev => {
      const newMovingPokemons = { ...prev };
      delete newMovingPokemons[pokemon.id];
      return newMovingPokemons;
    });
  };

  const handleCease = async (pokemon) => {
    await freezePokemon(pokemon.id);
    setMovingPokemons(prev => {
      const newMovingPokemons = { ...prev };
      delete newMovingPokemons[pokemon.id];
      return newMovingPokemons;
    });
  };

  return (
    <div className="home">
      <h2>Home Page</h2>
      <label>
        Select User:
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Select a user</option>
          {pokemonUsers.map(user => (
            <option key={user.id} value={user.id}>
              {user.pokemonOwnerName}
            </option>
          ))}
        </select>
      </label>
      <div className="pokemon-container">
        {pokemonUsers
          .filter(user => user.id === selectedUser)
          .map(user => (
            user.pokemons.map(pokemon => (
              <div key={pokemon.id} className="pokemon-item" style={{ left: `${pokemon.positionX}px`, top: `${pokemon.positionY}px` }}>
                <span>{pokemon.name}</span>
                <button onClick={() => handleGo(pokemon)}>Go</button>
                <button onClick={() => handleFlee(pokemon)}>Flee</button>
                <button onClick={() => handleCease(pokemon)}>Cease</button>
              </div>
            ))
          ))}
      </div>
    </div>
  );
};

export default Home;
