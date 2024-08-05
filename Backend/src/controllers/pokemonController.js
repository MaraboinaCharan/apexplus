import {sendResponse} from '../utils/utils.js'
import pokemonService from '../services/pokemonService.js'
import userService from '../services/userService.js';

const addPokemon=async (req,res,next)=>{
    try{
   const {ownerName,pokemonName,ability,positionX,positionY,speed,direction}=req.body;
   const user=await userService.getUserByName(ownerName);

   if(!user)
   {
    sendResponse(res,401,"Failed","Invalid User Or User Not found",null);
   }

  
   const pokemon={ownerName,pokemonName,ability,positionX,positionY,speed,direction};
   const newPokemon=await pokemonService.addPokemon(pokemon);

   if(!newPokemon)
   {
    sendResponse(res,403,"Failed","Failed to add Pokemon Retry again!",null);
   }
   delete newPokemon.ownerName;

   user.pokemons.push(newPokemon);
   await userService.updateUserPokemon(user);

   return sendResponse(res,201,"Success","Pokemon added succesfully!",newPokemon)

    }
    catch(err)
    {
        next(err);
    }

}


const getPokemons=async (req,res,next)=>{
    try{
  const pokemonsList=await pokemonService.getPokemons();
  if(!pokemonsList){
    sendResponse(res,404,"Failed","Failed to get Pokemons Or No Pokemons available",null);
  }
  return sendResponse(res,201,"Success","Fetched List of Pokemons",pokemonsList);
    }
    catch(err)
    {
        next(err);
    }
}


const updatePokemon=async (req,res,next)=>{
    try{
  const {id}=req.params;
  if(!id)
  {
    sendResponse(res,404,"failed","Invalid Pokemon Or No Pokemon Found",null);
  }
 
   const {pokemonName,ability,positionX,positionY,speed,direction}=req.body;
    const pokemon={id,pokemonName,ability,positionX,positionY,speed,direction};
     const updatedPokemon=await pokemonService.updatedPokemon(pokemon);
     //  console.log(updatedPokemon)
  const data=pokemonService.getData();
     //   console.log(data)
     data.users.forEach(el=>{
    const upi=el.pokemons.findIndex(pkn=>pkn.id==updatedPokemon.id)
    if(upi!=-1)
    {
        el.pokemons[upi]=updatedPokemon
    }
    })
   
     pokemonService.saveData(data);

   if(!updatedPokemon){
    sendResponse(res,401,"Failed","Failed to Update the Pokemon",null)
    }
    return sendResponse(res,201,"Success","Pokemon Details updated",updatePokemon);
    }
    catch(err)
    {
        next(err);
    }
}


const deletePokemon=async (req,res,next)=>{
    try{
  const {id}=req.params;
    if(!id)
    {
    sendResponse(res,404,"Failed","Invalid Pokemon Or No Pokemon found",null);
    }

     const data=pokemonService.getData();
     data.users.forEach(el => {
      el.pokemons=el.pokemons.filter(pkn=>pkn.id!=id)
      });

     pokemonService.saveData(data);

    await pokemonService.deletePokemon(id);

  return sendResponse(res,201,"Success","Pokemon deleted Succesfully!",null);
    }
    catch(err)
    {
        next(err);
    }
}

const pokemonController={addPokemon,getPokemons,updatePokemon,deletePokemon};

export default pokemonController;