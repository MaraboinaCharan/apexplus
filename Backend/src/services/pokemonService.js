import fs from 'fs';
import { get } from 'https';
import path from 'path';
import {v4 as uuidv4} from 'uuid';
import {fileURLToPath} from 'url';

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const filePath=path.join(__dirname,'../data/file.json');

const getData=()=>{
    return JSON.parse(fs.readFileSync(filePath,'utf-8'));

}

const saveData=(data)=>{
  fs.writeFileSync(filePath,JSON.stringify(data,null,2),'utf-8');
}

const addPokemon=async (pokemon)=>{
    const data=getData();
    
    if(!pokemon.ownerName||!pokemon.ability||!pokemon.pokemonName||!pokemon.speed||!pokemon.positionX||!pokemon.positionY||!pokemon.direction)
    {
        throw new Error('Some Attributes are missing!')
    }
    pokemon.id=uuidv4();
    data.pokemons.push(pokemon);
    saveData(data);
    return pokemon;
   
}

const getPokemons=async ()=>{
    const data=getData();
    return data.pokemons;
}

const updatedPokemon=async (updatedPokemon)=>{
    const data=getData();
    const pokemon=data.pokemons.findIndex(pmn=>pmn.id===updatedPokemon.id);
    // console.log(pokemon);
    if(pokemon===-1)
    {
        throw new Error('Invalid Pokemon');
    }
    if(!updatedPokemon.ability||!updatedPokemon.pokemonName||!updatedPokemon.speed||!updatedPokemon.positionX||!updatedPokemon.positionY||!updatedPokemon.direction)
    {
        throw new Error('Some Attributes are missing!')
    }
   
    data.pokemons[pokemon]=updatedPokemon;
    saveData(data);
    return updatedPokemon;
}


const deletePokemon=async (id)=>{
    const data=getData();
    const pokemon=data.pokemons.findIndex(pmn=>pmn.id===id);
    if(pokemon===-1)
    {
        throw new Error('Invalid Pokemon');
    }
    
    data.pokemons.splice(pokemon,1);
    saveData(data);
}



const pokemonService={getData,saveData,addPokemon,getPokemons,updatedPokemon,deletePokemon};

export default pokemonService;