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
}