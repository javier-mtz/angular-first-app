const mongoose = require('mongoose');
const uri = "mongodb+srv://pablo-admin:Chuchu20032907@carhistory.phlurbk.mongodb.net/Users";


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Conectado a la base de datos")
  })
  .catch((err) => {
    console.error(err);
  });
