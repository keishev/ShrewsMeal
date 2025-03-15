const dotenv = require("dotenv");

dotenv.config ({ path: "../.env" });

const { createBooking, getBookedDates, getSelectedMeals } = require ('../entity/booking')
const { getIdByUsername } = require ('../entity/user')

exports.makeBooking = async (req, res) => {
    const { username, meals, date } = req.body;
    const userID = await getIdByUsername (username);
    console.log ("makebooking username & userID:", username + " " + userID);

    try {
        await createBooking (userID, date, meals.breakfast, meals.lunch, meals.dinner);
        return res.json ({ Status: "Success" });
    } catch (error) {
        return res.json ({ Status: "Error" });
    }
};

exports.getAndSetBookedMeals = async (req, res) => {
    try {
        const { username, date } = req.query;
        console.log ("Username in getset:", username);
        const userID = await getIdByUsername (username);

        console.log ('get and set controller userID & date: ' + userID + " " + date);
        const selectedMeals = await getSelectedMeals (userID, date);
        console.log ("Selected meals", selectedMeals);
        return res.json (selectedMeals);
    } catch (error) {
        return res.json ({ Status: "Error" });
    }
};

exports.checkBooking = async (req, res) => {
    try {
        console.log ('req:', req.query);
        const { username } = req.query;
        console.log ("username in checkbooking controller: ", username);
        const userID = await getIdByUsername (username);
        console.log ("Checkbooking controller username, userID:" + username + " " + userID);

        const dates = await getBookedDates (userID);
        console.log ('dates in controller checkBooking:', dates);
        return res.json ({ dates });
    } catch (error) {
        return res.json ({ Status: error })
    }
};