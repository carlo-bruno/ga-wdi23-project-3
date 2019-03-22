require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();

let port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const loginLimiter = new RateLimit({
  windowMs: 5 * 60 * 1000, // 5mins
  max: 3,
  // delayMs: 0,
  message: 'Maximum login attemps exceeded!'
});

const signupLimiter = new RateLimit({
  windowMs: 60 * 60 * 1000, // 1hr
  max: 3,
  // delayMs: 0,
  message: 'Maximum accounts created. Please try again later'
});

mongoose.connect('mongodb://localhost/jwt', {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.once('open', () => {
  console.log(`🔥 Connected to Mongo️ on ${db.host}:${db.port}`);
});
db.on('error', (error) => {
  console.log(`Database error:\n${error}`);
});

// app.get('/', (req, res) => {
//   res.send('🔥 Connected to server');
// });

app.use(helmet());
app.use('/auth/login', loginLimiter);
app.use('/auth/signup', signupLimiter);

app.use('/auth', require('./routes/auth'));
app.use(
  '/locked',
  expressJWT({ secret: process.env.JWT_SECRET }).unless({
    method: 'POST'
  }),
  require('./routes/locked')
);

app.listen(port, () =>
  console.log(`🔥 Listening on port ${port}...`)
);
