import React, { useState, useEffect } from 'react';
import { fetchPokemons, deletePokemon } from '../../services/api.js';
// import './PokemonList.css';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const loadPokemons = async () => {
      const response = await fetchPokemons();
      setPokemons(response.data.pokemons);
    };
    loadPokemons();
  }, []);

  const handleDelete = async (id) => {
    const response = await deletePokemon(id);
    if (response.status === 'Success') {
      setPokemons(pokemons.filter(pokemon => pokemon.id !== id));
      alert('Pokemon deleted successfully!');
    } else {
      alert('Failed to delete Pokemon');
    }
  };

  return (
    <div className="pokemon-list">
      <h2>Pokemon List</h2>
      <table>
        <thead>
          <tr>
            <th>Pokemon Owner Name</th>
            <th>Pokemon Name</th>
            <th>Pokemon Ability</th>
            <th>Initial Position X</th>
            <th>Initial Position Y</th>
            <th>Speed</th>
            <th>Direction</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map(pokemon => (
            <tr key={pokemon.id}>
              <td>{pokemon.pokemonOwnerName}</td>
              <td>{pokemon.pokemonName}</td>
              <td>{pokemon.pokemonAbility}</td>
              <td>{pokemon.initialPositionX}</td>
              <td>{pokemon.initialPositionY}</td>
              <td>{pokemon.speed}</td>
              <td>{pokemon.direction}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => handleDelete(pokemon.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonList;
