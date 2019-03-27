const express = require('express');
const router = express.Router();
const axios = require('axios');
const Event = require('../models/event');

// Meetup API
function getMeetUps(query) {
  let url = `https://api.meetup.com/2/open_events/?category=13&key=${
    process.env.MEETUP_API_KEY
  }&zip=${query}`;
  return axios.get(url);
}
// Data.Seattle.Gov API
function getOutreachEvents() {
  let url =
    'https://data.seattle.gov/resource/OutreachEventCalendar.json';
  return axios.get(url);
}
// Data.Seattle.Gov API
function getCityCouncilEvents() {
  let url = 'https://data.seattle.gov/resource/mjjw-fp32.json';
  return axios.get(url);
}
// Getting data from all three API's.
router.get('/', (req, res) => {
  axios
    .all([
      getMeetUps(98102),
      getOutreachEvents(),
      getCityCouncilEvents()
    ])
    .then(
      axios.spread(function(meetupData, outreachData, councilData) {
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
              description: event.description.replace(
                /(<([^>]+)>)/gi,
                '\n'
              )
            };
            return meetup;
          });

        let outreaches = outreachData.data.map((event) => {
          let outreach = {
            event_name: event.event,
            venue: event.venue,
            street_address: event.street_address,
            start_time: new Date(event.start_time),
            event_url: event.event_info_url,
            lat: event.latitude,
            lon: event.longitude,
            description: event.event_description_agenda
          };
          return outreach;
        });

        let councils = councilData.data.map((event) => {
          let council = {
            event_name: event.event,
            venue: event.venue,
            street_address: event.street_address,
            start_time: new Date(event.start_time),
            event_url: event.event_info_url,
            lat: event.latitude,
            lon: event.longitude,
            description: event.event_description_agenda
          };
          return council;
        });

        let allData = meetups
          .concat(councils, outreaches)
          .filter(
            (event) => Date.now() < event.start_time.getTime()
          )
          .sort((a, b) => {
            return a.start_time > b.start_time
              ? 1
              : a.start_time < b.start_time
              ? -1
              : 0;
          });

        allData.forEach((event, i) => {
          Object.assign(event, { id: i });
        });

        res.json({
          events: allData
        });
      })
    )
    .catch((err) => res.json({ err }));
});

router.get('/:zip', (req, res) => {
  let url = `https://api.meetup.com/2/open_events/?category=13&key=${
    process.env.MEETUP_API_KEY
  }&zip=${req.params.zip}`;
  axios
    .get(url)
    .then(function(meetupData) {
      console.log('IN SECOND AXIOS QUERYYYYYY');
      var meetups = meetupData.data.results
        .filter((event) => event.venue && event.description)
        .map((event) => {
          console.log('EVENT', event);
          let meetup = {
            event_name: event.name,
            venue: event.venue.name,
            street_address: event.venue.address_1,
            start_time: new Date(event.time),
            event_url: event.event_url,
            lat: event.venue.lat,
            lon: event.venue.lon,
            description: event.description.replace(
              /(<([^>]+)>)/gi,
              '\n'
            )
          };
          console.log('OBJ', meetup);
          return meetup;
        });

      console.log('MEETOPS', meetups);
      let allData = meetups
        .filter((event) => Date.now() < event.start_time.getTime())
        .sort((a, b) => {
          return a.start_time > b.start_time
            ? 1
            : a.start_time < b.start_time
            ? -1
            : 0;
        });
      console.log('ALLLLLLL DATA', allData);
      allData.forEach((event, i) => {
        Object.assign(event, { id: i });
      });
      console.log('KENGTH', allData.length);
      res.json({
        events: allData
      });
    })
    .catch((err) => res.json({ err }));
});

router.post('/saved', (req, res) => {
  let event = new Event({
    userId: req.body.userId,
    start_time: req.body.event.start_time,
    venue: req.body.event.venue,
    event_name: req.body.event.event_name,
    description: req.body.event.description,
    event_url: req.body.event.event_url,
    lat: req.body.event.lat,
    lon: req.body.event.lon,
    street_address: req.body.event.street_address
  });
  event.save((err, doc) => {
    res.json(doc);
  });
});

router.get('/saved/:userId', (req, res) => {
  //Mongoose query here
  console.log("IN AXIOS GETTTTTT, BABAY!")
  Event.find({userId: req.params.userId}, (err, docs )=> {
    console.log(docs)
  })
  // 
})

module.exports = router;
