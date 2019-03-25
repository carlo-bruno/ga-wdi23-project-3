const express = require('express');
const router = express.Router();
const axios = require('axios');

// Meetup API
function getMeetUps() {
  console.log('getting getMeetUps');
  let url = `https://api.meetup.com/2/open_events/?category=13&key=${
    process.env.MEETUP_API_KEY
  }&zip=98102`;
  return axios.get(url);
}
// Data.Seattle.Gov API
function getOutreachEvents() {
  console.log('getting getOutreachEvents');
  let url =
    'https://data.seattle.gov/resource/OutreachEventCalendar.json';
  return axios.get(url);
}
// Data.Seattle.Gov API
function getCityCouncilEvents() {
  console.log('getting getCityCouncilEvents');
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
              description: event.description
            };
            return meetup;
          });

        let outreaches = outreachData.data.map((event) => {
          let outreach = {
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
        });

        let councils = councilData.data.map((event) => {
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
        });

        let allData = meetups.concat(councils, outreaches);

        res.json({
          events: allData
        });
      })
    )
    .catch((err) => res.json({ err }));
});

module.exports = router;
