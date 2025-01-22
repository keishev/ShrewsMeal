const db = require ('../db.js');

const userAccount = {
    // Create a new user record
    create: async (user) => {
        return new Promise ((resolve, reject) => {
            const query = 'INSERT INTO useraccount (first_name, last_name, username, userPassword, role, unitNumber, dietaryRestrictions) VALUES (?, ?, ?, ?, ?, ?, ?)';

            const values = [user.first_name, user.last_name, user.username, user.userPassword, user.role, user.unitNumber, user.dietaryRestrictions];

            db.query (query, values, (err, result) => {
                if (err) { return reject (err); }
                resolve (result);   
            });
        });
    },

    // Find user from their username
    findByUsername: async (username) => {
        return new Promise ((resolve, reject) => {
            const query = 'SELECT * FROM useraccount WHERE username = ?';
            db.query (query, [username], (err, result) => {
                if (err) {
                    console.log ("error:", err);
                    return reject (err);
                }

                if (result.length === 0) {
                    // if no user is found, then resolve with null
                    return resolve (null);
                }
                return resolve (result[0]);        // return the first match
            });
        });
    },

    getIdByUsername: async (username) => {
        return new Promise ((resolve, reject) => {
            const query = 'SELECT userID FROM useraccount WHERE username = ?';

            db.query (query, [username], (err, result) => {
                if (err) {
                    console.log ("Error:", err);
                }

                if (result.length === 0) {
                    return resolve (null);
                }

                return resolve (result[0].userID);
            })
        })
    },

    updateUnitNumber: async (userID, newUnitNumber) => {
        return new Promise ((resolve, reject) => {
            const query = 'UPDATE useraccount SET unitnumber = ? WHERE userID = ?';
            db.query (query, [newUnitNumber, userID], (err, result) => {
                if (err) {
                    return reject (err);
                }
                resolve (result);
            });
        });
    },

    deleteById: async (userID) => {
        return new Promise ((resolve, reject) => {
            const query = 'DELETE FROM useraccount WHERE userID = ?';
            db.query (query, [userID], (err, result)=> {
                if (err) return reject (err);
                resolve (result);
            });
        });
    }
};

module.exports = userAccount;