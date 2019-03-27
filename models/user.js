const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'You must enter a name'],
    minlength: [1, 'Name must be between 1 and 99 characters'],
    maxlength: [99, 'Name must be between 1 and 99 characters']
  },
  password: {
    type: String,
    required: [true, 'You must enter a password'],
    minlength: [8, 'Password must be between 10 and 99 characters'],
    maxlength: [99, 'Password must be between 10 and 99 characters']
  },
  email: {
    type: String,
    required: [true, 'You must enter an email'],
    minlength: [5, 'Email must be between 5 and 99 characters'],
    maxlength: [99, 'Email must be between 5 and 99 characters']
  },
  city: {
    type: String,
    required: [false],
    minlength: [3],
    maxlength: [99]
  },
  state: {
    type: String,
    required: [false],
    minlength: [2, 'Please enter in two characters'],
    maxlength: [2, 'Please enter in two characters']
  },
  zipcode: {
    type: String,
    required: [false]
  },
  socialMedia: {
    type: String,
    required: [false],
    minlength: [0, 'Please enter a valid link'],
    maxlength: [99, 'Please enter a valid link']
  },
  image: {
    type: String
  },
  image_id: {
    type: String
  }
});

/** Returns an object already parsed from JSON, no password
 * @param doc -> document, record, row to be converted
 * @param ret -> plain object representation already converted
 */
userSchema.set('toObject', {
  transform: function(doc, ret, options) {
    let returnJson = {
      _id: ret._id,
      email: ret.email,
      name: ret.name,
      city: ret.city,
      state: ret.state,
      zipcode: ret.zipcode,
      image: ret.image
    };
    return returnJson;
  }
});

/** Compares typed password to hashed password */
userSchema.methods.authenticated = function(password) {
  return bcrypt.compareSync(password, this.password);
};

/** Lifecycle hook to before save */
userSchema.pre('save', function(next) {
  if (this.isNew) {
    let hash = bcrypt.hashSync(this.password, 12);
    this.password = hash;
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
