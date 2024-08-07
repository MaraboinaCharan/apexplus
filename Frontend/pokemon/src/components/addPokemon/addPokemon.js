import React, { useState, useEffect } from 'react';
import { addPokemon } from '../../services/api.js';
// import './AddPokemon.css';

const AddPokemon = () => {
  const [pokemon, setPokemon] = useState({
    pokemonOwnerName: '',
    pokemonName: '',
    pokemonAbility: '',
    initialPositionX: 0,
    initialPositionY: 0,
    speed: 0,
    direction: ''
  });
  const [pokemonOptions, setPokemonOptions] = useState([]);

  useEffect(() => {
    const fetchPokemonOptions = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
      const data = await response.json();
      setPokemonOptions(data.results);
    };
    fetchPokemonOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPokemon(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addPokemon(pokemon);
    if (response.status === 'Success') {
      alert('Pokemon added successfully!');
    } else {
      alert('Failed to add Pokemon');
    }
  };

  const handlePokemonNameChange = async (e) => {
    const selectedName = e.target.value;
    setPokemon(prev => ({ ...prev, pokemonName: selectedName }));
    if (selectedName) {
      const selectedPokemon = pokemonOptions.find(p => p.name === selectedName);
      if (selectedPokemon) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon.name}`);
        const data = await response.json();
        setPokemon(prev => ({
          ...prev,
          pokemonAbility: data.abilities.length > 1 ? '' : data.abilities[0].ability.name
        }));
      }
    }
  };

  return (
    <div className="add-pokemon">
      <h2>Add Pokemon</h2>
      <form onSubmit={handleSubmit}>
        <label>Pokemon Owner Name:</label>
        <input type="text" name="pokemonOwnerName" value={pokemon.pokemonOwnerName} onChange={handleChange} required />
        
        <label>Pokemon Name:</label>
        <select name="pokemonName" value={pokemon.pokemonName} onChange={handlePokemonNameChange} required>
          <option value="">Select a Pokemon</option>
          {pokemonOptions.map(p => (
            <option key={p.name} value={p.name}>{p.name}</option>
          ))}
        </select>
        
        <label>Pokemon Ability:</label>
        <input type="text" name="pokemonAbility" value={pokemon.pokemonAbility} onChange={handleChange} />
        
        <label>Initial Position X:</label>
        <input type="number" name="initialPositionX" value={pokemon.initialPositionX} onChange={handleChange} required />
        
        <label>Initial Position Y:</label>
        <input type="number" name="initialPositionY" value={pokemon.initialPositionY} onChange={handleChange} required />
        
        <label>Speed:</label>
        <input type="number" name="speed" value={pokemon.speed} onChange={handleChange} required />
        
        <label>Direction:</label>
        <input type="text" name="direction" value={pokemon.direction} onChange={handleChange} required />
        
        <button type="submit">Add Pokemon</button>
      </form>
    </div>
  );
};

export default AddPokemon;
