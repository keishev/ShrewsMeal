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

    try {
        const dates = await Booking.getBookedDates (userID);
        return res.json (dates);
    } catch (error) {
        return res.json ({ Status: "Error" });
    }
};

const setSelectedMeals = async (req, res) => {
    try {
        const username = req.query.username;
        const date = req.query.date;
        const userID = await User.getIdByUsername (username);

        const selectedMeals = await Booking.getSelectedMeals (userID, date);
        return res.json (selectedMeals);
    } catch (error) {
        return res.json ({ Status: "Error" });
    }    
};

module.exports = {
    createBooking,
    checkBooking,
    setSelectedMeals
}