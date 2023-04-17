import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: './.env' });

import globalErrorHandlingMiddleware from './middlewares/globalErrorHandler.js';
import rootRouter from './routes/rootRouter.js';

const app = express();

// The body parser middleware
app.use(express.json());

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
