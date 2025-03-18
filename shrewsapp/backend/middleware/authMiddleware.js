const jwt = require ('jsonwebtoken');
const dotenv= require("dotenv");
dotenv.config({ path: "../.env" });


const verifyUser = (req, res, next) => {
    const token = req.cookies.token; // Get the token from cookies

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" }); // Use 401 for missing token
    }

    try {
        const decodedVal = jwt.verify(token, process.env.JWT_SECRET); // Verify token safely
        req.username = decodedVal.username;  // Attach user info to request
        req.role = decodedVal.role;          // Store user role (if needed)
        next(); // Proceed to the next middleware
    } catch (err) {
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" }); // Use 403 for invalid token
    }
};

module.exports = { verifyUser };
