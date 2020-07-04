const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Review = require('../../models/reviews');

//@route    GET api/reviews
//@desc     get reviews from database
//@access   public
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.json(reviews);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/reviews
//@desc     get reviews from database
//@access   public
router.post(
  '/',
  [
    auth,
    check(
      ['userId', 'userFirstName', 'userLastName'],
      'please login to submit a review'
    )
      .not()
      .isEmpty(),
    check('reviewText', 'Please add a description of your experience')
      .isLength({ min: 1, max: 250 })
      .withMessage('Review body is required. Character limit is 250'),
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

    const {
      userId,
      userFirstName,
      userLastName,
      reviewText,
      stars,
      date,
    } = req.body;

    try {
      let review = new Review({
        userId,
        userFirstName,
        userLastName,
        reviewText,
        stars,
        date,
      });

      await review.save();
      res.send('Thank you for you review!');
    } catch (error) {
      console.error(error.message);
    }
  }
);

//@route    DELETE api/reviews/:id
//@desc     delete reviews from database
//@access   private
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    //check if review belongs to the user
    if (review.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    review.remove();

    res.json({ msg: 'Review removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
