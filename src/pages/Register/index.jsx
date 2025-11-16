import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading
    try {
      const res = await fetch('https://backend-production-8e0d.up.railway.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Registration failed');
      } else {
        setMessage(data.message || 'Registration successful! Redirecting to login...').color = 'green';
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err) {
      setMessage('Server error: ' + err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className='login-container'>
      {loading ? (
        <p>Loading...</p> // Show loader
      ) : (
        <div>
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {message && <p>{message}</p>}
            <button type="submit" style={{ marginTop: '10px' }}>Register</button>
          </form>
        </div>
      )}
    </div>
  );
}