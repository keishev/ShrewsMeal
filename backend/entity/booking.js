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
    },

    getSelectedMeals: async (userID, date) => {
        return new Promise ((resolve, reject) => {
            const query = 'SELECT breakfast, lunch, dinner FROM booking WHERE userID = ? AND bookingDate = ?';

            const values = [userID, date];
            db.query (query, values, (err, result) => {
                if (err) { return reject (err); }
                
                if (result.length > 0) {
                    const meals = {
                        breakfast: Boolean (result[0].breakfast),
                        lunch: Boolean (result[0].lunch),
                        dinner: Boolean (result[0].dinner)
                    };
                
                    return resolve (meals);
                } else {
                    return resolve (null);
                }
                
            })
        })
    }
}

module.exports = booking;