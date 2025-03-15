const express = require ("express");
const { makeBooking, getAndSetBookedMeals, checkBooking } = require ('../controllers/BookingPageController.js')
const { verifyUser } = require ('../middleware/authMiddleware.js')

const router = express.Router();

router.post ('/booking', makeBooking);
router.get ('/booking/getSetMeals', getAndSetBookedMeals);
router.get ('/booking/check', checkBooking);

module.exports = router