const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const eventSchema = new Schema ({
  userId: {
    type: String,
  },
  start_time: {
    type: String,
  },
  lat: {
    type: Number
  },
  long: {
    type: Number
  },
  street_address: {
    type: String
  },
  venue: {
    type: String
  },
  description: {
    type: String
  },
  event_name: {
    type: String
  },
  event_url: {
    type: String
  }
})

/** Returns an object already parsed from JSON, no password
 * @param doc -> document, record, row to be converted
 * @param ret -> plain object representation already converted
 */
eventSchema.set('toObject', {
  transform: function(doc, ret, options) {
    let returnJson = {
      userId: ret.userId,
			description: ret.description,
			event_name: ret.event_name,
      event_url: ret.event_url,
      venue: ret.venue,
      street_address: ret.street_address,
      start_time: ret.start_time,
      lat: ret.lat,
      lon: ret.lon
    }
    return returnJson;
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
