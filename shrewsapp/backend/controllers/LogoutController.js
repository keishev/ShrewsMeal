const dotenv = require("dotenv");

dotenv.config ({ path: "../.env" });

exports.logout = async (req, res) => {
    res.cookie('token', '', { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        samesite: "Strict",
        expires: new Date(0) // Expire immediately
    });
    res.json({ Status: "Success" });
}