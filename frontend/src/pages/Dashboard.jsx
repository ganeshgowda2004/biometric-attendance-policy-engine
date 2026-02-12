import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function Dashboard() {
  const totalDays = 22;
  const lateUsed = 18;
  const monthlyLimit = 45;
  const remaining = monthlyLimit - lateUsed;

  const [latestLeave, setLatestLeave] = useState(null);

  useEffect(() => {
    const fetchLatestLeave = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("currentUser"));

        if (!user) return;

        const response = await fetch(
          `http://127.0.0.1:5000/latest-leave/${user.employee_id}`
        );

        if (!response.ok) return;

        const data = await response.json();
        setLatestLeave(data);
      } catch (error) {
        console.error("Error fetching leave:", error);
      }
    };

    fetchLatestLeave();
  }, []);

  return (
    <Layout>
      <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>Total Attendance</h3>
          <p>{totalDays} Days</p>
        </div>

        <div style={styles.card}>
          <h3>Late Minutes Used</h3>
          <p>{lateUsed} Minutes</p>
        </div>

        <div style={styles.card}>
          <h3>Remaining Wallet</h3>
          <p>{remaining} Minutes</p>
        </div>
      </div>

      {remaining <= 10 && (
        <div style={styles.warning}>
          ⚠ Warning: You are nearing your late-time limit!
        </div>
      )}

      {/* 🔥 LEAVE STATUS CARD */}
      {latestLeave && Object.keys(latestLeave).length > 0 && (
        <div style={styles.leaveCard}>
          <h3>Latest Leave Application</h3>
          <p><strong>Type:</strong> {latestLeave.leaveType}</p>
          <p>
            <strong>Duration:</strong> {latestLeave.fromDate} to {latestLeave.toDate}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              style={
                latestLeave.status === "Approved"
                  ? styles.approved
                  : latestLeave.status === "Rejected"
                  ? styles.rejected
                  : styles.pending
              }
            >
              {latestLeave.status}
            </span>
          </p>
        </div>
      )}
    </Layout>
  );
}

const styles = {
  cardContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },
  card: {
    flex: "1",
    minWidth: "200px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  warning: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    borderRadius: "8px",
  },
  leaveCard: {
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  approved: {
    color: "green",
    fontWeight: "bold",
  },
  rejected: {
    color: "red",
    fontWeight: "bold",
  },
  pending: {
    color: "orange",
    fontWeight: "bold",
  },
};

export default Dashboard;
