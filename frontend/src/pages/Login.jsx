import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employee_id: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { employee_id, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", {
        employee_id,
        password,
      });

      // 🔐 Store JWT token (IMPORTANT: access_token, not token)
      localStorage.setItem("token", res.data.access_token);

      // Optional: store user info
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials"
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={onSubmit}>
          <div style={styles.inputGroup}>
            <label>Employee ID</label>
            <input
              type="text"
              name="employee_id"
              value={employee_id}
              onChange={onChange}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.registerText}>
          Don’t have an account?{" "}
          <span
            style={styles.registerLink}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  card: {
    padding: "30px",
    width: "350px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "8px",
  },
  inputGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  registerText: {
    marginTop: "15px",
    textAlign: "center",
  },
  registerLink: {
    color: "#007bff",
    cursor: "pointer",
  },
};

export default Login;
