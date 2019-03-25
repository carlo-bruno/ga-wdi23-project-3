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
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const geocodingClient = mbxGeocoding({
//     accessToken: process.env.MAP_BOX_KEY
//     });
require('dotenv').config();

const app = express();

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

let port = process.env.PORT || 3001;

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

// Meetup API
function getMeetUps() {
  console.log('getting getMeetUps')
  let url = `https://api.meetup.com/2/open_events/?category=13&key=${process.env.MEETUP_API_KEY}&zip=98102`
    return axios.get(url)
}
// Data.Seattle.Gov API
function getOutreachEvents() {
  console.log('getting getOutreachEvents')
  let url = 'https://data.seattle.gov/resource/OutreachEventCalendar.json'
    return axios.get(url)
}
// Data.Seattle.Gov API
function getCityCouncilEvents() {
  console.log('getting getCityCouncilEvents')
  let url = 'https://data.seattle.gov/resource/mjjw-fp32.json'
  return axios.get(url)
}
// Getting data from all three API's.

app.get('/', (req, res) => {
  axios.all([getMeetUps(), getOutreachEvents(), getCityCouncilEvents()])
    .then(axios.spread(function (meetupData, outreachData, councilData) {

      let meetups = meetupData.data.results
      .filter((event) => event.venue)
      .map((event) => {
        let meetup = {
          event_name: event.name, 
          venue: event.venue.name,
          street_address: event.venue.address_1,
          start_time: new Date(event.time),
          event_url: event.event_url,
          lat: event.venue.lat,
          lon: event.venue.lon,
          description: event.description
        };
        return meetup;
      });
  
      let outreaches = outreachData.data.map(event => {
        let outreach= {
          event_name: event.event, 
          venue: event.venue,
          street_address: event.street_address,
          start_time: event.start_time,
          event_url: event.event_info_url,
          lat: event.latitude, 
          lon: event.longitude,
          description: event.event_description_agenda
        };
        return outreach;
      })

      let councils = councilData.data.map(event => {
        let council = {
          event_name: event.event,
          venue: event.venue,
          street_address: event.street_address,
          start_time: event.start_time,
          event_url: event.event_info_url,
          lat: event.latitude,
          lon: event.longitude,
          description: event.event_desription_agenda
        };
        return council;
      })

      let allData = meetups.concat(councils, outreaches);

      res.json({
        events: allData
      })
    })).catch( err => res.json({err}))
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
  console.log("LINNNNKKKKKKKK", req.file.secure_url) // Returned img info
  const image = {};
  image.url = req.file.url;
  image.id = req.file.public_id;
  console.log("USER ID++++++++:",req.body.userId)
  User.findByIdAndUpdate( req.body.userId, {
    $set: {
      image: req.file.secure_url
    }
  }, {new: true}, (err, user) => {
    console.log("USER     ",user)
    if (err) console.log('ERROR: =====> ')
    user.save( () => {
      res.json(user)
    })
  }) //Save to DB
.catch(err => console.log(err))
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