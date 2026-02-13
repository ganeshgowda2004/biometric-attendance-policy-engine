import { useState } from "react";
import Layout from "../components/Layout";

function Leave() {
  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: ""
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // You can connect backend API here later

    setSuccessMessage("Leave applied successfully!");

    // ✅ Reset form
    setFormData({
      leaveType: "",
      fromDate: "",
      toDate: "",
      reason: ""
    });

    // Remove message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.heading}>Apply for Leave</h2>

        {successMessage && (
          <div style={styles.successBox}>
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          
          <div style={styles.field}>
            <label>Leave Type</label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Emergency Leave">Emergency Leave</option>
            </select>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label>From Date</label>
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label>To Date</label>
              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.field}>
            <label>Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              placeholder="Enter reason..."
              onChange={handleChange}
              required
              style={styles.textarea}
            />
          </div>

          <button type="submit" style={styles.button}>
            Apply Leave
          </button>
        </form>
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  heading: {
    marginBottom: "25px",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center"
  },
  successBox: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "15px",
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  row: {
    display: "flex",
    gap: "20px"
  },
  field: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "5px"
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "5px",
    minHeight: "80px"
  },
  button: {
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  }
};

export default Leave;
