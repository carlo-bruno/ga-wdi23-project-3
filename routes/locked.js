const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.send('Locked DATA');
});

module.exports = router;
