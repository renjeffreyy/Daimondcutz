const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt.js');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../../models/Users');

//@route    GET api/auth
//@desc     Authenticate
