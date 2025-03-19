const express = require ("express");
const { makeBooking, updateBooking, getAndSetBookedMeals, checkBooking } = require ('../controllers/BookingPageController.js')
const { getBookingsByDate, getBookingsByUser } = require ('../controllers/DashboardController.js');

const router = express.Router();

router.post ('/booking', makeBooking);
router.post ('/booking/update', updateBooking);
router.get ('/booking/getSetMeals', getAndSetBookedMeals);
router.get ('/booking/check', checkBooking);
router.get ('/booking/getBookingsByDate', getBookingsByDate);
router.get ('/booking/getBookingsByUser', getBookingsByUser);

module.exports = router;