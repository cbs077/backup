const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
router.get('/', (req, res) => {
  res.send('Hello World1');

});
router.get('/hello', (req, res ) => {

  res.send('Can you hear me?');
});

router.get('/about', (req, res ) => {
  res.send('Hello World');
});
router.get('/:name', (req, res) => {
  User.find({ name: req.params.name }, (err, user) => {
    res.render('main', { user: user } );
  });
});
module.exports = router;
