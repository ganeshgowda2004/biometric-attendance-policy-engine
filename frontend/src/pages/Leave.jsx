import { useState } from "react";
import Layout from "../components/Layout";

function Leave() {
  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("currentUser"));

    try {
      const response = await fetch("http://127.0.0.1:5000/apply-leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          ...formData
        })
      });

      if (response.ok) {
        alert("Leave Applied Successfully");
        setFormData({
          leaveType: "",
          fromDate: "",
          toDate: "",
          reason: ""
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to apply leave"}`);
      }
    } catch (error) {
      alert("Network error: Please try again later");
    }
  };

  return (
    <Layout>
      <h2>Apply Leave</h2>

      <form onSubmit={handleSubmit}>
        <select name="leaveType" onChange={handleChange} required>
          <option value="">Select Leave Type</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Emergency Leave">Emergency Leave</option>
        </select>

        <input type="date" name="fromDate" onChange={handleChange} required />
        <input type="date" name="toDate" onChange={handleChange} required />

        <textarea
          name="reason"
          placeholder="Reason"
          onChange={handleChange}
          required
        />

        <button type="submit">Apply</button>
      </form>
    </Layout>
  );
}

export default Leave;
