const jwt = require ('jsonwebtoken');
const dotenv= require("dotenv");
dotenv.config({ path: "../.env" });

const verifyUser = async (req, res, next) => {
    const token = req.cookies.token;        // get the token from the cookie

    // If token doesn't exist, then return with a error message
    if (!token) {
        return res.json ({ Error: "You are not authenticated" })
    } else {
        jwt.verify (token, process.env.JWT_SECRET, (err, decodedVal) => {
            if (err) {
                return res.json ({ Error: "Invalid token!" })
            } else {
                req.username = decodedVal.username;
                next ();
            }
        });
    }
};

module.exports = { verifyUser };