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

const addUser=async (user)=>{
    const data=getData();
    
    if(data.users.find(eu=>eu.id===user.id))
    {
        throw new Error('User already exists')
    }
    
    user.id=uuidv4();
    data.users.push(user);
    saveData(data);
    return user;
   
}

const getUsers=async ()=>{
    const data=getData();
    return data.users;
}

const getUserByName=async (name)=>{
    const data=getData();
    const user=data.users.find(user=>user.name===name);
    if(!user)
    {
        throw new Error('Invalid User');
    }
   return user;
}

const updatedUser=async (currentUserName,updatedUserName)=>{
    const data=getData();
    const user=data.users.findIndex(user=>user.name==currentUserName);
    if(user===-1)
    {
        throw new Error('Invalid User')
    }
    if(data.users.find(user=>user.name===updatedUserName))
    {
        throw new Error('User Name alreday exists!')
    }
    data.users[user].name=updatedUserName;
    saveData(data);
    return updatedUserName;

}

const deletedUser=async (name)=>{
    const data=getData();
    const user=data.users.findIndex(user=>user.name===name);
    if(user===-1)
    {
        throw new Error('Invalid User');
    }
   
    data.users.splice(user,1);
    saveData(data);
}

const updateUserPokemon=async(userr)=>{
    const data=getData();
    const user=data.users.findIndex(user=>user.name===userr.name);
    if(user===-1)
    {
        throw new Error('Invalid User')
    }
    data.users[user]=userr;
    saveData(data);


}


const userService={getData,saveData,addUser,getUsers,getUserByName,updatedUser,deletedUser,updateUserPokemon};

export default userService;