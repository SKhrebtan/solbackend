const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const { userRouter } = require('./routes');

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? './env/production.env'
      : './env/development.env',
});

const app = express();

mongoose
  .connect('mongodb+srv://shrebtan:GTzJl8liaUhMQFs8@cluster0.7hbsw9g.mongodb.net/')
  .then((con) => {
    console.log('MongoDB is connected!');
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log('Hello from MW!!');
  req.time = new Date().toLocaleString('uk-UA');

  next();
});

app.get('/ping', (req, res) => {
  res.status(200).json({
    msg: 'pong!',
    data: req.time,
  });
});

const pathPrefix = '/api/v1';
app.use(`${pathPrefix}/users`, userRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    msg: 'Resource not found!',
  });
});

app.use((err, req, res, next) => {
  console.log(err);

  res.status(err.status ?? 500).json({
    msg: err.message,
  });
});

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
