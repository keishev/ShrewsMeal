import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getTotalTenants = async () => {
    try {
        const response = await axios.get (`${BASE_URL}/tenant/getTotal`);
        return response.data.totalTenants;
    } catch (error) {
        console.error ('Error in getting total tenants');
        throw error;
    }
}