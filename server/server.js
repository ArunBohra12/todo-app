import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './.env' });

(async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to the DB');
  } catch (error) {
    console.log(error);
    console.log("Can't connect to the database");
  }
})();

import app from './app.js';

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
