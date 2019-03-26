const express = require('express');
const router = express.Router();
const axios = require('axios');
const Event = require('../models/event')

// Meetup API
function getMeetUps() {
  let url = `https://api.meetup.com/2/open_events/?category=13&key=${
    process.env.MEETUP_API_KEY
  }&zip=98102`;
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
      getMeetUps(),
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

router.post('/',  (req, res) => {
  let event = new Event({
    _id: req.body._id,
      time: req.body.time,
			date: req.body.date,
			location: req.body.location,
			title: req.body.title,
			description: req.body.description,
			usernotes: req.body.usernotes
  });
  event.save( (err, doc) => {
    res.json(doc);
  })
});

module.exports = router;
