import express from 'express';
import pokemonRouter from './src/routes/pokemon-route.js';
import userRouter from './src/routes/user-route.js';
import {globalError} from '../Backend/src/utils/utils.js'
import cors from 'cors';
import bodyParser from 'body-parser'

const app=express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users',userRouter);
app.use('/api/pokemons',pokemonRouter);
app.use(globalError);

export default app;