import axios from "axios"

const BASE_URL = "http://localhost:5000/api";

export const userLogout = async () => {
    try {
        const response = await axios.post (`${BASE_URL}/logout`, { withCredentials: true })
        return response.data;
    } catch (error) {
        console.error ("Error sending logout request:", error);
        throw error;
    }
};