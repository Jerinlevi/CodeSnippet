import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import './index.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true); // Start loading
    try {
      const response = await fetch("https://backend-production-8e0d.up.railway.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token);
        navigate("/snippets");
        setMsg("Login Successful").color = "green";
      } else {
        setMsg("Invalid Credentials or Not Registered");
      }
    } catch (err) {
      setMsg("Server error: " + err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  }

  return (
    <div className="login-container">
      {loading ? (
        <p>Loading...</p> // Show loader
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><br />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br />
            <p>{msg}</p>
            <div className="dual-button-container">
              <button>Login</button>
              <Link to="/register" style={{ marginLeft: '10px' }}>Sign Up</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}