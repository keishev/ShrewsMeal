const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')

const User = require ('../entity/userAccount.js')

exports.login = async (req, res) => {
    try {
        const user = await User.findByUsername (req.body.username);

        if (user == null) {
            return res.json ({ Error: "Username not found!" });
        }

        bcrypt.compare (req.body.password.toString (), user.userPassword, (err, response) => {
            if (err) { return res.json ({ Error: "Error comparing passwords during hashing" }) };
            if (response) {
                // Generate a token with our username and role, then store it inside a cookie
                const username = user.username;
                const role = user.role;
                const token = jwt.sign ({ username, role }, "this-is-the-secret-key", { expiresIn: '1h' });
                res.cookie ('token', token);
                return res.json ({ Status: "Success" });
            } else {
                return res.json ({ Error: "Invalid password!" });
            }
        });
    } catch (error) {
        return res.json ({ Error: "Error in server while trying to log in!" });
    }
};
