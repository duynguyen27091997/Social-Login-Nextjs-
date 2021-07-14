import express from 'express';

import mongoose from './database';
import authRouter from "./routes/acount.route";

const util = require('util')

const PORT = process.env.PORT || 4001;


const app = express();

app.use(express.json());
app.use(express.urlencoded());



app.use('/accounts', authRouter)


app.listen(PORT, () => {
    console.log("Server runs on port " + PORT);
})