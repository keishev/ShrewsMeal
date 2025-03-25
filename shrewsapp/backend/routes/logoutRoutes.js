const express = require ("express");
const { logout } = require ('../controllers/LogoutController.js')

const router = express.Router();

router.post('/logout', logout);

module.exports = router;