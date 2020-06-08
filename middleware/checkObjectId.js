const mongoose = require('mongoose');

//middleware to check for a valid onject id

const checkObjectId = (idToCheck) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck])) {
    return res.status(400).json({ msg: 'invalid ID' });
  }
  next();
};

module.exports = checkObjectId;
