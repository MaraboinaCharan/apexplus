import React, { useState, useEffect } from 'react';
import { addPokemon } from '../../services/api.js';
import { fetchUsers, fetchPokemons } from '../../services/api.js';
// import './AddPokemonToUser.css';

const AddPokemonToUser = () => {
  const [users, setUsers] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [pokemonAbility, setPokemonAbility] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      const response = await fetchUsers();
      setUsers(response.data.users);
    };
    loadUsers();
  }, []);

  useEffect(() => {
    const loadPokemons = async () => {
      const response = await fetchPokemons();
      setPokemons(response.data.pokemons);
    };
    loadPokemons();
  }, []);

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handlePokemonChange = async (e) => {
    setSelectedPokemon(e.target.value);
    if (e.target.value) {
      const selected = pokemons.find(p => p.name === e.target.value);
      setPokemonAbility(selected ? selected.ability : '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addPokemon({
      pokemonOwnerName: selectedUser,
      pokemonName: selectedPokemon,
      pokemonAbility: pokemonAbility,
    });
    if (response.status === 'Success') {
      alert('Pokemon added to user successfully!');
    } else {
      alert('Failed to add Pokemon to user');
    }
  };

  return (
    <div className="add-pokemon-to-user">
      <h2>Add Pokemon to User</h2>
      <form onSubmit={handleSubmit}>
        <label>Select User:</label>
        <select value={selectedUser} onChange={handleUserChange} required>
          <option value="">Select a User</option>
          {users.map(user => (
            <option key={user.name} value={user.name}>{user.name}</option>
          ))}
        </select>

        <label>Select Pokemon:</label>
        <select value={selectedPokemon} onChange={handlePokemonChange} required>
          <option value="">Select a Pokemon</option>
          {pokemons.map(pokemon => (
            <option key={pokemon.name} value={pokemon.name}>{pokemon.name}</option>
          ))}
        </select>

        <label>Pokemon Ability:</label>
        <input type="text" value={pokemonAbility} readOnly />

        <button type="submit">Add Pokemon to User</button>
      </form>
    </div>
  );
};

export default AddPokemonToUser;
