import express from 'express';
import userController from '../controllers/userController.js';

const userRouter=express.Router();

userRouter.post('/addUser',userController.addUser);
userRouter.get('/getUsers',userController.getUsers);
userRouter.patch('/updateUser/:currentUserName',userController.updateUser);
userRouter.delete('/deleteUser/:currentUserName',userController.deleteUser);

export default userRouter;