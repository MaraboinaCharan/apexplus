import express from 'express';
import pokemonController from '../controllers/pokemonController.js';

const pokemonRouter=express.Router();

pokemonRouter.post('/addPokemon',pokemonController.addPokemon);
pokemonRouter.get('/getPokemons',pokemonController.getPokemons);
pokemonRouter.patch('/updatePokemon/:id',pokemonController.updatePokemon);
pokemonRouter.delete('/deletePokemon/:id',pokemonController.deletePokemon);

export default pokemonRouter;