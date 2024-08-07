import React from 'react';
import PropTypes from 'prop-types';
// import './PokemonItem.css';

const PokemonItem = ({ pokemon, onGo, onFlee, onCease }) => {
  return (
    <div className="pokemon-item" style={{ left: `${pokemon.positionX}px`, top: `${pokemon.positionY}px` }}>
      <div className="pokemon-info">
        <span className="pokemon-name">{pokemon.name}</span>
        <span className="pokemon-ability">Ability: {pokemon.ability}</span>
      </div>
      <div className="pokemon-actions">
        <button onClick={() => onGo(pokemon)}>Go</button>
        <button onClick={() => onFlee(pokemon)}>Flee</button>
        <button onClick={() => onCease(pokemon)}>Cease</button>
      </div>
    </div>
  );
};

PokemonItem.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ability: PropTypes.string.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    direction: PropTypes.number.isRequired
  }).isRequired,
  onGo: PropTypes.func.isRequired,
  onFlee: PropTypes.func.isRequired,
  onCease: PropTypes.func.isRequired
};

export default PokemonItem;
