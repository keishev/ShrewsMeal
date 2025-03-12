const express = require ("express");
const { login } = require ('../controllers/LoginPageController.js')
const { verifyUser } = require ('../middleware/authMiddleware.js')

const router = express.Router();

// router.post ('/booking', createBooking)

module.exports = router