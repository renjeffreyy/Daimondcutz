const jwt = require('jsonwebtoken');
require('dotenv');

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header('x-auth-token');

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    jwt.verify(token, process.env.jwtSecret, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
      }

      if (req.user.id !== process.env.adminId) {
        return res.status(401).json({ msg: 'unauthenticated' });
      }
      next();
    });
  } catch (error) {
    console.error('something went wrong with admin middleware');
    res.status(500).json({ msg: 'server error' });
  }
};
