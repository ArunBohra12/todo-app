import express from 'express';

import globalErrorHandlingMiddleware from './middlewares/globalErrorHandler.js';
import rootRouter from './routes/rootRouter.js';

const app = express();

// The body parser middleware
app.use(express.json());

app.use('/api', rootRouter);

app.use(globalErrorHandlingMiddleware);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't ${req.method} to ${req.path} on this server`,
  });
});

export default app;
