const dotenv = require("dotenv");

dotenv.config ({ path: "../.env" });

const { createBooking, modifyBooking, getBookedDates, getSelectedMeals } = require ('../entity/booking')
const { getIdByUsername } = require ('../entity/user');

exports.makeBooking = async (req, res) => {
    const { username, meals, date } = req.body;
    const userID = await getIdByUsername (username);

    try {
        await createBooking (userID, date, meals.breakfast, meals.lunch, meals.dinner);
        return res.json ({ Status: "Success" });
    } catch (error) {
        return res.json ({ Status: "Error" });
    }
};

exports.updateBooking = async (req, res) => {
    const { username, meals, date } = req.body;
    const userID = await getIdByUsername (username);

    try {
        await modifyBooking (userID, date, meals.breakfast, meals.lunch, meals.dinner);
        return res.json ({ Status: "Success" });
    } catch (error) {
        return res.json ({ Status: "Error" });
    }
}

exports.getAndSetBookedMeals = async (req, res) => {
    try {
        const { username, date } = req.query;
        const userID = await getIdByUsername (username);

        const selectedMeals = await getSelectedMeals (userID, date);
        console.log ("Selected meals", selectedMeals);
        return res.json (selectedMeals);
    } catch (error) {
        return res.json ({ Status: "Error" });
    }
};

exports.checkBooking = async (req, res) => {
    try {
        const { username } = req.query;
        const userID = await getIdByUsername (username);

        const dates = await getBookedDates (userID);
        return res.json ({ dates });
    } catch (error) {
        return res.json ({ Status: error })
    }
};