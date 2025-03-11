import axios from "axios"

const BASE_URL = "http://localhost:5000/api";

export const userLogin = async (values) => {
    try {
        const response = await axios.post (`${BASE_URL}/login`, values)
        console.log (response.data);
        return response
    } catch (error) {
        console.error ("Error sending login request:", error);
        throw error;
    }
};