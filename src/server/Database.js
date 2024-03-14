import mongoose from 'mongoose';
const uri = "mongodb+srv://pablo-admin:Chuchu20032907@carhistory.phlurbk.mongodb.net/CarHistory";


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Conectado a la base de datos")
  })
  .catch((err) => {
    console.error(err);
  });
