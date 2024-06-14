import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
    const [isAutorized, setIsAutorized] = useState(null);

    useEffect(() => {
        auth().catch( () => setIsAutorized(false));
    }, []);

    const rereshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/auth/token/refresh", { 
                refresh: refreshToken, 
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAutorized(true);
            } else {
                setIsAutorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAutorized(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAutorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;
        if (tokenExpiration < now) {
            await rereshToken();
        } else {
            setIsAutorized(true);
        }
        
    }

    if (isAutorized === null) {
        return <div>Loading ...</div>
    }

    return isAutorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;