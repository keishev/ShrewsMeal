const jwt = require ('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;        // get the token from the cookie

    // If token doesn't exist, then return with a error message
    if (!token) {
        return res.json ({ Error: "You are not authenticated" })
    } else {
        jwt.verify (token, "this-is-the-secret-key", (err, decodedVal) => {
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