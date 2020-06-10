const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv');
const verifyAdmin = require('../../middleware/verifyAdmin');

//@route    POST api/admin/appointments
//@desc     for the admin to post available times
//@access   Private
router.post('/appointments', verifyAdmin, async (request, response) => {
  response.send('hello admin');
});

//@route    GET api/admin/appointments
//@desc     for the admin to get all appointments
//@access   Private

module.exports = router;
