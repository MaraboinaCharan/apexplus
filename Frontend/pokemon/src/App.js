import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import AddPokemon from './components/addPokemon/addPokemon.js';
import PokemonList from './components/pokemonList/pokemonList.js';
import AddPokemonToUser from './components/userList/userList.js';
import Home from './components/Home/Home.js';
import Header from './components/Header/Header.js';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="app">
        <Routes>
          <Route path="/"  element={Home} />
          <Route path="/add-pokemon" element={AddPokemon} />
          <Route path="/pokemon-list" element={PokemonList} />
          <Route path="/add-pokemon-to-user" element={AddPokemonToUser} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
