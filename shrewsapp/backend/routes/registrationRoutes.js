const express = require("express");
const { verifyUser } = require("../middleware/authMiddleware");
const { createNewUser } = require("../controllers/UserRegistrationController");

const router = express.Router();

router.post("/registerUser", verifyUser, (req, res) => {
    if (req.role !== "COOK") {
        return res.status(403).json({ message: "Access denied. Only cooks can register users." });
    }
    
    createNewUser(req, res); 
});

module.exports = router;
