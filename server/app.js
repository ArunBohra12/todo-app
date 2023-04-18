import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: './.env' });

import globalErrorHandlingMiddleware from './middlewares/globalErrorHandler.js';
import rootRouter from './routes/rootRouter.js';

const app = express();

// This is done because __dirname is not available in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// The body parser middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, './public')));

// CORS middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.use('/api', rootRouter);

app.use(globalErrorHandlingMiddleware);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't ${req.method} to ${req.path} on this server`,
  });
});

export default app;
