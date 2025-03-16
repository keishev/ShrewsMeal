import axios from "axios"

const BASE_URL = "http://localhost:5000/api";

export const registerNewUser = async (formData) => {
    try {
        console.log ('formData in api:', formData);
        const response = await axios.post (`${BASE_URL}/registerUser`, formData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log ("Error in sending registration request:", error);
        throw error;
    }
};
