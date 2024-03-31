import express, { json, urlencoded } from "express";
import indexRouter from "./routes/indexRouter.js";
import cors from "cors";


const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({extended: false}));


app.use('/api', indexRouter);


app.use((req, res, next) => {
  if (req.path.endsWith('/') && req.path !== '/') {
    res.redirect('/');
  } else {
    next();
  }
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
})

export default app;
