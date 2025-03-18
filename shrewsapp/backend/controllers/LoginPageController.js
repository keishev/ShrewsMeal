const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const dotenv = require("dotenv");

dotenv.config ({ path: "../.env" });

const { findByUsername }  = require ('../entity/user')

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await findByUsername (username);
        
        if (!user) {
            return res.status (401).json ({ Error: "Invalid credentials!" });
        }

        bcrypt.compare (password, user.userPassword, (err, response) => {
            if (err) { return res.json ({ Error: "Error comparing passwords during hashing" }) };
            if (response) {
                // Generate a token with our username and role, then store it inside a cookie
                const username = user.username;
                const role = user.role;
                const token = jwt.sign ({ username: username, role: role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.cookie ('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",   // Ensures secure cookies in production
                    samesite: "Strict",     // Prevent CSRF attacks
                    maxAge: 60 * 60 * 1000  // 1 hour
                });
                return res.json ({ Status: "Success", role: role});
            } else {
                return res.status (401).json ({ Error: "Invalid credentials!" });
            }
        });[]
    } catch (error) {
        return res.json ({ Error: "Error when trying to log in:", error });
    }
}