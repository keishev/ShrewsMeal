const db = require ('../db.js');

const booking = {
    create: async (userID, bookingDate, breakfast, lunch, dinner) => {
        return new Promise ((resolve, reject) => {
            const query = 'INSERT INTO booking (userID, bookingDate, breakfast, lunch, dinner) VALUES (?, ?, ?, ?, ?)';

            const values = [userID, bookingDate, breakfast, lunch, dinner];
            db.query (query, values, (err, result) => {
                if (err) { return reject (err); }
                return resolve (result);
            });
        });
    },

    getBookedDates: async (userID) => {
        return new Promise ((resolve, reject) => {
            const query = 'SELECT * FROM booking WHERE userID = ?';

            const value = [userID];
            db.query (query, value, (err, result) => {
                if (err) { return reject (err); }

                const bookingDates = result.map (record => record.bookingDate);
                return resolve (bookingDates);
            });
        })
    }
}

module.exports = booking;