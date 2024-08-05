import {sendResponse} from "../utils/utils.js";
import userService from "../services/userService.js"; 


const addUser=async (req,res,next)=>{
    try{
  const {name}=req.body;
     if(!name)
    {
        sendResponse(res,401,"Failed","No user Name Provided",null);
     }
     const newData={name,pokemons:[]}
     const user=await userService.addUser(newData);
     if(!user)
     {
        sendResponse(res,401,"Failed","user Entry failed! Pls try again",null);
     }
     return sendResponse(res,201,"Success","User Added Succesfully!",user);
    }
    catch(err)
    {
        next(err);
    }

}

const getUsers=async (req,res,next)=>{
    try{
 const usersList=await userService.getUsers();
    if(!usersList)
   {
    sendResponse(res,403,"Failed","User List is Empty Or Failed to fetch data",null)
    }
  return sendResponse(res,201,"Success","List of Users Fetched",usersList);
    }
    catch(err)
    {
        next(err);
    }
}

const updateUser=async (req,res,next)=>{
    try{
    const {currentUserName}=req.params;
    // console.log(currentUserName);
    if(!currentUserName){
       return sendResponse(res,401,"Failed","Invalid User",null);
    }
    const {updatedName}=req.body;
    if(!updatedName){
       return sendResponse(res,401,"Failed","Please Provide user Name to be updated",null);
    }
    // console.log(req.body)
    const updatedUser=await userService.updatedUser(currentUserName,updatedName);
    if(!updatedUser){
        sendResponse(res,403,"Failed","Failed to update new User Name",null);
    }
   return sendResponse(res,201,"Sucess","New user Name updated",updateUser);
    }
    catch(err)
    {
        next(err);
    }
}

const deleteUser=async (req,res,next)=>{
    try{
        const {currentUserName}=req.params;
        if(!currentUserName){
          return  sendResponse(res,401,"Failed","Invalid User",null);
        }
        await userService.deletedUser(currentUserName);
        return sendResponse(res,201,"Success","User Deleted",null);
    }
    catch(err)
    {
        next(err);
    }
}

const userController={addUser,getUsers,updateUser,deleteUser};

export default userController;