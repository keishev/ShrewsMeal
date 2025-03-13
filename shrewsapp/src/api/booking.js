import axios from "axios"

const BASE_URL = "http://localhost:5000/api";

export const checkAuthenticated = async () => {
    try {
        const response = await axios.get (`${BASE_URL}/login`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error ("Error in authentication");
        throw error;
    }
};

export const createBooking = async (bookingData) => {
    try {
        const response = axios.post (`${BASE_URL}/booking`, bookingData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error ("Error in sending booking request:", error);
        throw error;
    }
};

export const getAndSetBookedMeals = async (username, date) => {
    try {
        const response = await axios.get (`${BASE_URL}/booking/getSetMeals`, {
            params: {
                username: username,
                date: date
            }
        });
        console.log ("GetAndSetBookedMeals response.data:", response.data);
        return response.data;
    } catch (error) {
        console.error ("Error in fetching selected meals:", error);
        throw error;
    }
};

export const checkBookedDays = async (username) => {
    try {
        const response = await axios.get (`${BASE_URL}/booking/check`, username)
        console.log ("CheckedBookedDays response.data:", response.data);
        return response.data;
    } catch (error) {
        console.error ("Error in fetching booked days:", error);
        throw error;
    }
}

