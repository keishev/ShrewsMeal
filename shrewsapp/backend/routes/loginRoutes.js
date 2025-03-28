const express = require ("express");
const { login } = require ('../controllers/LoginPageController.js')
const { verifyUser } = require ('../middleware/authMiddleware.js')

const router = express.Router();

router.post('/login', login);
router.get ('/login', verifyUser, (req, res) => {
    return res.json ({ Status: "Success", username: req.username });
})

module.exports = router;