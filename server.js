const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');
const axios = require('axios');
const User = require('./models/user');
const Event = require('./models/event');
const multer = require('multer');
const upload = multer({dest: './uploads/'});
const cloudinary = require('cloudinary');
const cloudinaryStorage = require("multer-storage-cloudinary");

require('dotenv').config();

const app = express();

let port = process.env.PORT || 3001;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "Citizenly",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit"}]
});

const parser = multer({ storage: storage })


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const loginLimiter = new RateLimit({
  windowMs: 5 * 60 * 1000, // 5mins
  max: 100,
  // delayMs: 0,
  message: 'Maximum login attemps exceeded!'
});

const signupLimiter = new RateLimit({
  windowMs: 60 * 60 * 1000, // 1hr
  max: 100,
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

// Meetup API call
function getMeetUps() {
  let url = `https://api.meetup.com/2/open_events/?category=13&key=${process.env.MEETUP_API_KEY}&zip=98102`
  return axios.get(url)
}
// Data.Seattle.Gov API Outreach Event call
function getOutreachEvents() {
  let url = 'https://data.seattle.gov/resource/OutreachEventCalendar.json'
    return axios.get(url)
}
// Data.Seattle.Gov API Council Event call 
function getCityCouncilEvents() {
  let url = 'https://data.seattle.gov/resource/mjjw-fp32.json'
   return axios.get(url)
}
// Getting data from all three API's.

app.get('/', (req, res) => {
  axios.all([getMeetUps(), getOutreachEvents(), getCityCouncilEvents()])
    .then(axios.spread( function(meetup, outreach, council){
      let events = meetup.data.results;
      const filteredEvents = events.filter(event => {event.description})

    res.json({
      meetup: events
      // outreach: outreach.data, 
      // council: council.data
    })
    }))
})

app.get('/UpdateProfile', (req, res) => {
  db.user.findOne({
  where: {userId: req.user.id}
  }).then(function(photo) {
  if (photo) {
      res.render('user/profile', {photo: photo.link});
  } else {
      res.render('user/profile', {photo: null});
  };
  });
});

app.post('/UpdateProfile', parser.single('myFile'), (req, res) => {
  const image = {};
  image.url = req.file.url;
  image.id = req.file.public_id;
  // Update user model with image url
  User.findByIdAndUpdate( req.body.userId, {
    $set: {image: req.file.secure_url}
  }, {new: true}, (err, user) => {
    if (err) console.log('ERROR: =====> ', err)
    //Save to DB
    user.save( () => {
      res.json(user)
    })
  }).catch(err => console.log(err))
});

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

module.exports = User;