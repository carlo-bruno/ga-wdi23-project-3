require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');
const axios = require('axios');
const User = require('./models/user');
const Event = require('./models/event');
const cloudinary = require('cloudinary');

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

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.once('open', () => {
  console.log(`🔥 Connected to Mongo️ on ${db.host}:${db.port}`);
});
db.on('error', (error) => {
  console.log(`Database error:\n${error}`);
});

// Meetup API
function getMeetUps() {
  let url = `https://api.meetup.com/2/open_events/?category=13&key=${process.env.MEETUP_API_KEY}&zip=98102`
  return axios.get(url)
}
// Data.Seattle.Gov API
function getOutreachEvents() {
  let url = 'https://data.seattle.gov/resource/OutreachEventCalendar.json'
    return axios.get(url)
}
// Data.Seattle.Gov API
function getCityCouncilEvents() {
  let url = 'https://data.seattle.gov/resource/mjjw-fp32.json'
   return axios.get(url)
}
// Getting data from all three API's.
app.get('/', (req, res) => {
  axios.all([getMeetUps(), getOutreachEvents(), getCityCouncilEvents()])
    .then(axios.spread( function(meetup, outreach, council){
      res.json({
        one: meetup.data, 
        two: outreach.data, 
        three: council.data})
    }))
})

// app.post('/profile', upload.single('myFile'), (req, res) => {
//   cloudinary.uploader.upload(req.file.path, (result) => {
//   db.user.findOrCreate({
//       where: {
//       userId: parseInt(req.user.dataValues.id)
//       },
//       defaults: {profilePhoto: result.url}
//   }).spread(function(photo, created) {
//       res.redirect('/profile');
//   });
//   });
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
