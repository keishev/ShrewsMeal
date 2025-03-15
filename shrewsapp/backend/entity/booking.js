const db = require ('../db/db.js');

exports.createBooking = async (userID, bookingDate, breakfast, lunch, dinner) => {
    try {
        const query = 'INSERT INTO booking (userID, bookingDate, breakfast, lunch, dinner) VALUES (?, ?, ?, ?, ?)';
        const values = [userID, bookingDate, breakfast, lunch, dinner];

            const [result] = await db.execute (query, values);
            return result;
    } catch (error) {
        console.error ("Error making a booking:", error);
        throw error;
    }
};

exports.getBookedDates = async (userID) => {
    try {
        const query = 'SELECT * FROM booking WHERE userID = ?';
        const [result] = await db.execute (query, [userID]);
        const bookingDates = result.map (record => record.bookingDate);
        console.log ('bookedDates:', bookingDates);
        return bookingDates;
    } catch (error) {
        console.log ("Error fetching booked dates:", error)
        throw error;
    }
}

exports.getSelectedMeals = async (userID, date) => {
    try {
        const query = 'SELECT breakfast, lunch, dinner FROM booking WHERE userID = ? AND bookingDate = ?';
        const values = [userID, date];
        console.log ('date:', date);
        const [result] = await db.execute (query, values)

        if (result.length > 0) {
            const meals = {
                breakfast: Boolean (result[0].breakfast),
                lunch: Boolean (result[0].lunch),
                dinner: Boolean (result[0].dinner)
            };
            return meals;
        } else {
            return null;
        }
    } catch (error) {
        console.error ("Error fetching selected meals:", error);
    }
}