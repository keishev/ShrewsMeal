import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ allowedRoles }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/check-auth", { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) return <p>Loading...</p>;

    return user && allowedRoles.includes(user.role) ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
