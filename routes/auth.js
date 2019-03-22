const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');

//route for signup
router.post('/signup', (req, res) => {
  // see if email is already in db
  //- if found, return error
  //- if no, create user
  //-- sign token
  //-- return token

  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      res.json({ type: 'error', message: 'Email already exist' });
    } else {
      let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      user.save((err, user) => {
        if (err) {
          res.json({
            type: 'error',
            message: 'Database Error Creating User',
            error: err
          });
        } else {
          var token = jwt.sign(
            user.toObject(),
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
          );
          res
            .status(200)
            .json({
              type: 'success',
              user: user.toObject(),
              token
            });
        }
      });
    }
  });
});

//route for login
router.post('/login', (req, res) => {
  // find user in db
  //- if no, return error
  //- if user, check authenticated()
  //-- if authenticated, sign a token
  //-- return the token

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      res.json({ type: 'error', message: 'Account not found.' });
    } else {
      if (user.authenticated(req.body.password)) {
        var token = jwt.sign(
          user.toObject(),
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );
        res.json({
          type: 'success',
          message: 'You have logged in.',
          user: user.toObject(),
          token
        });
      } else {
        res.json({
          type: 'error',
          message: 'Authentication Failure'
        });
      }
    }
  });
});

//route for token validation
router.post('/me/from/token', (req, res) => {
  // make sure they sent us a token to check
  // if no token, return error
  // if token, verify
  // if invalid, retunr error
  // if token valid
  //-- look up user in the db
  //-- if user doesnt exist return error
  //-- if user exist, send user back to rReact

  let token = req.body.token;
  if (!token) {
    res.json({
      type: 'error',
      message: 'You must pass a valud token'
    });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.json({
          type: 'error',
          message: 'Invalid token. Please log in again'
        });
      } else {
        User.findById(user._id, (err, user) => {
          if (err) {
            res.json({
              type: 'error',
              message: 'Database error during validation'
            });
          } else {
            res.json({
              type: 'success',
              user: user.toObject(),
              token
            });
          }
        });
      }
    });
  }
});

module.exports = router;
