import useAutoLogout from "../customHooks/useAutoLogout"

const SessionManager = () => {
    const {showWarning , dismissWarning} = useAutoLogout();

    if(!showWarning) return null;

    return(
        <div style={warningModalStyle}>
            <p>You will be logged out in 1 minute due to inactivity.</p>
            <button onClick={dismissWarning}>Stay Logged in</button>

        </div>
    )
}

export default SessionManager;

const warningModalStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "#ffefc3",
  color: "#333",
  border: "1px solid #ccc",
  padding: "15px 25px",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  zIndex: 1000,
};

