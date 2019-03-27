const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const eventSchema = new Schema ({
  time: {
    type: Number,
  },
  date: {
    type: String
  },
  location: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  usernotes: {
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
      user_id: ret.user._id,
			description: ret.description,
			title: ret.event_name,
      url: ret.event_url,
      venue: ret.venue,
      address: ret.street_address,
      time: ret.start_time,
      lat: ret.lat,
      lon: ret.lon
    }
    return returnJson;
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
