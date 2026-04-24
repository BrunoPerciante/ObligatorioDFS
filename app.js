import express from 'express';
import v1Router from './v1/v1.routes.js';
import {notFoundMiddleware} from './v1/middlewares/notFound.middleware.js';
import dotenv from "dotenv";
import connectDB from './v1/config/db.config.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", v1Router);

app.use(notFoundMiddleware);

export default app;