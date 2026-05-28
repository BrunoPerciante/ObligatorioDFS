/*import dotenv from "dotenv";
dotenv.config();*/
import "dotenv/config";
import express from 'express';
import v1Router from './v1/v1.routes.js';
import {notFoundMiddleware} from './v1/middlewares/notFound.middleware.js';

import connectDB from './v1/config/db.config.js';


connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", v1Router);

app.use(notFoundMiddleware);

export default app;