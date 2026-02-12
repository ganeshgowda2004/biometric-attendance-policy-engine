import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <Link to="/dashboard" style={styles.link}>Dashboard</Link>
      <Link to="/attendance" style={styles.link}>Attendance</Link>
      <Link to="/wallet" style={styles.link}>Wallet</Link>
      <Link to="/justification" style={styles.link}>Justification</Link>
      <Link to="/leave" style={styles.link}>Leave</Link>  
      <Link to="/admin" style={styles.link}>Admin Panel</Link>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    height: "100vh",
    backgroundColor: "#334155",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    gap: "15px"
  },

  link: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "20px"
  }
};

export default Sidebar;
