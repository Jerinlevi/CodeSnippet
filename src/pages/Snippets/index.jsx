import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './index.css';

export default function Snippets() {
  const [snippets, setSnippets] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/login');

    setLoading(true); // Start loading
    fetch('https://backend-production-8e0d.up.railway.app/snippets', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) setMessage(data.error);
        else setSnippets(data);
      })
      .catch(err => setMessage(err.message))
      .finally(() => setLoading(false)); // Stop loading
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="snippets-container">
      {loading ? (
        <p>Loading...</p> // Show loader
      ) : (
        <div>

          <h2 className="snippets-title">Code Snippets</h2>
          <div className='logout-div'>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
          <div className="message-container">
            {message && <p className="error-message">{message}</p>}
          </div>
          <ul className="snippets-list">
            {snippets.map(s => (
              <li className="snippet-item" key={s.id}>
                <p className="snippet-title">{s.title}</p>
                <p className="snippet-language">Languages: {s.language}</p>
                <div className="snippet-details">
                  <p className="snippet-tags">Tags: #{s.tags}</p>
                  <p className="snippet-code">{s.code}</p>
                </div>
                <button className="edit-button" onClick={() => navigate(`/snippets/${s.id}`)}>Edit</button>
              </li>
            ))}
          </ul>
          <button className="add-snippet-button" onClick={() => navigate('/snippets/new')}>Add Snippet</button>
        </div>
      )}
    </div>
  );
}
