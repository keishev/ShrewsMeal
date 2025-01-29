const User = require ('../entity/userAccount.js');
const Booking = require ('../entity/booking.js');

const createBooking = async (req, res) => {
    const { username, meals, date } = req.body;
    const userID = await User.getIdByUsername (username);
    try {
        const newBooking = await Booking.create (userID, date, meals.breakfast, meals.lunch, meals.dinner);
        return res.json ({ Status: "Success" })
    } catch (error) {
        return res.json ({ Status: "Error" });
    }
}

const checkBooking = async (req, res) => {
    const username = req.query.username;
    const userID = await User.getIdByUsername (username);
    console.log ('username:', req.query);
    console.log ('userID:', userID);

    try {
        const dates = await Booking.getBookedDates (userID);
        console.log ('dates:', dates);
        return res.json (dates);
    } catch (error) {
        return res.json ({ Status: "Error" });
    }
}

module.exports = {
    createBooking,
    checkBooking
}