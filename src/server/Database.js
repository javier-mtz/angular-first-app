import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Conectado a la base de datos")
  })
  .catch((err) => {
    console.error(err);
  });
