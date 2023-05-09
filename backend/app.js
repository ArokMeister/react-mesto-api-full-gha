const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const { handleError } = require('./utils/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('./constants/constants');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

// app.use((req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const requestHeaders = req.headers['access-control-request-headers'];

//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }

//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//   }

//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     return res.end();
//   }

//   next();
// });

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(PORT, () => {});
