import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import app from './app.js';
import connectDB from './config/database.js';

connectDB(process.env.DATABASE_URL);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
