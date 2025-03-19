const dotenv = require("dotenv");

dotenv.config ({ path: "../.env" });

const { getAllBookingByDate, getAllBookingByUser } = require ('../entity/booking.js');

exports.getBookingsByDate = async (req, res) => {
    const { date } = req.query;
    try {
        const bookings = await getAllBookingByDate (date);
        return res.json (bookings);
    } catch (error) {
        return res.json ({ Status: "Error" });
    }
};

exports.getBookingsByUser = async (req, res) => {
    const { user } = req.query;
    try {
        const bookings = await getAllBookingByUser (user);
        return res.json (bookings);
    } catch (error) {
        return res.json ({ Status: "Error" });
    }
};