const express = require ('express');
const { verifyUser } = require ('../middleware/authMiddleware');
const router = express.Router ();

router.get("/check-auth", verifyUser, (req, res) => {
    res.json({ username: req.username, role: req.role });
});

module.exports = router;
