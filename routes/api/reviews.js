const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Review = require('../../models/reviews');

//@route    GET api/reviews
//@desc     get reviews from database
//@access   public
router.get('/', (req, res) => {
  res.send('these are the reviews');
});

//@route    GET api/reviews
//@desc     get reviews from database
//@access   public
router.post(
  '/',
  [
    auth,
    check(
      'reviewText',
      'Please add a description of your experience'
    ).isLength({ min: 1, max: 250 }),
    check('stars', 'Please rate your experience on a 1 to 5 scale').isInt({
      min: 1,
      max: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user, reviewText, stars, date } = req.body;

    try {
      let review = new Review({
        user,
        reviewText,
        stars,
        date,
      });
      //   console.log(review);
      await review.save();
      res.send('Thank you for you review!');
    } catch (error) {
      console.error(error.message);
    }
  }
);

module.exports = router;
