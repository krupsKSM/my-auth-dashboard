import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useEffect, useRef, useState } from "react";

const AUTO_LOGOUT_TIME = 2 * 60 * 1000; //2 mins
const WARNING_TIME = 1 * 60 * 1000; //1 mins  

const useAutoLogout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const warningTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [showWarning, setShowWarning] = useState(false);

    const clearTimers = () => {
        if (logoutTimer.current) clearTimeout(logoutTimer.current)
        if (warningTimer.current) clearTimeout(warningTimer.current)
        setShowWarning(false);
    }

    const startTimers = () => {
        clearTimers();

        warningTimer.current = setTimeout(() => {
            setShowWarning(true)
        }, WARNING_TIME);

        logoutTimer.current = setTimeout(() => {
            logout();
            alert("you have been logged out due to inactivity");
            navigate('/login')
        }, AUTO_LOGOUT_TIME);
    }

    const resetInactivityTimer = () => {
        if (user) startTimers();
    }

    useEffect(() => {
        if (!user) return;

        const events = ["mousemove", "keydown", "scroll", "click"];
        events.forEach((event) =>
            window.addEventListener(event, resetInactivityTimer)
        );

        startTimers();

        return (
            () => {
                events.forEach((event) => {
                    window.removeEventListener(event, resetInactivityTimer)
                });
                clearTimers();
            }
        );
    }, [user]);


    return {
        showWarning,
        dismissWarning: () => {
            resetInactivityTimer();
            setShowWarning(false);
        },
    }
}

export default useAutoLogout