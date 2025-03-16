const express = require ("express");
const { createNewUser } = require ('../controllers/UserRegistrationController.js');
const router = express.Router();


router.post ('/registerUser', createNewUser);

module.exports = router;