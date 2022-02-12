import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'

import { CONFIG } from './src/constants/config';
import userRouter from './src/routes/user.router';
import busRouter from './src/routes/bus.router';
import createOrFindAdminAccount from './src/functions/createOrFindAdminAccount';

const port = CONFIG.PORT || 80;

const server = express();

mongoose.connect(CONFIG.DB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}, async err =>{
  if(err){
      console.log('Connection error:', err.message);
      return;
  }

  await init();
  await createOrFindAdminAccount();
})

const init = async() => {
    server.use(express.json());
    server.use(express.urlencoded({extended: true}));
    server.use(cors());

    server.use(`/users`, userRouter);
    server.use(`/bus`, busRouter);

    server.listen(port, () => {
        console.log(`Server listening at ${port}`);
    });
}