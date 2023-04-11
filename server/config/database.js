import mongoose from 'mongoose';

const connectDB = async dbUrl => {
  try {
    await mongoose.connect(dbUrl);
    console.log('Connected to the DB');
  } catch (error) {
    console.log(error);
    console.log("Can't connect to the database");
  }
};

export default connectDB;
