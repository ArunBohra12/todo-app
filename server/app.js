import express from 'express';
import authRouter from './routes/authRouter.js';

const app = express();

// The body parser middleware
app.use(express.json());

app.use('/api', authRouter);

export default app;
