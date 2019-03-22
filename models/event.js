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
      _id: ret._id,
      time: ret.time,
			date: ret.date,
			location: ret.location,
			title: ret.title,
			description: ret.description,
			usernotes: ret.usernotes
    };
    return returnJson;
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
