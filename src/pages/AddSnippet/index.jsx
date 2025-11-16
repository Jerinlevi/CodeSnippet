import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css';
export default function AddSnippet() {
  const { id } = useParams(); // if editing
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [tags, setTags] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    if (!id) {
      // New snippet — reset form
      setTitle('');
      setCode('');
      setLanguage('');
      setTags('');
    } else {
      // Editing — fetch snippet
      if (!token) return;
      setLoading(true); // Start loading
      fetch(`https://backend-production-8e0d.up.railway.app/snippets/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.id) {
            setTitle(data.title);
            setCode(data.code);
            setLanguage(data.language);
            setTags(data.tags || '');
          }
        })
        .finally(() => setLoading(false)); // Stop loading
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title,
      code,
      language,
      tags: tags.split(',').map(t => t.trim())
    };

    setLoading(true); // Start loading
    try {
      const res = await fetch(`https://backend-production-8e0d.up.railway.app/snippets${id ? '/' + id : ''}`, {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) setMessage(data.error || 'Error saving snippet');
      else {
        setMessage('Saved successfully!');
        if (!id) {
          // Clear form after adding new snippet
          setTitle('');
          setCode('');
          setLanguage('');
          setTags('');
        }
        setTimeout(() => navigate('/snippets'), 1000);
      }
    } catch (err) {
      setMessage('Server error: ' + err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this snippet?')) return;
    setLoading(true); // Start loading
    try {
      const res = await fetch(`https://backend-production-8e0d.up.railway.app/snippets/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        const data = await res.json();
        setMessage(data.error || 'Error deleting snippet');
      } else {
        navigate('/snippets');
      }
    } catch (err) {
      setMessage('Server error: ' + err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="form-container">
      {loading ? (
        <p>Loading...</p> // Show loader
      ) : (
        <div>
          <h2>{id ? 'Edit Snippet' : 'Add Snippet'}</h2>
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label htmlFor="title" style={{ flex: '1', marginRight: '10px' }}>Title:</label>
              <input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required style={{ flex: '2' }}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label htmlFor="code" style={{ flex: '1', marginRight: '10px' }}>Code:</label>
              <textarea id="code" cols='100' value={code} onChange={e => setCode(e.target.value)} placeholder="Code" rows="6" required style={{ flex: '2' }}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label htmlFor="language" style={{ flex: '1', marginRight: '10px' }}>Language:</label>
              <input id="language" value={language} onChange={e => setLanguage(e.target.value)} placeholder="Language" style={{ flex: '2' }}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label htmlFor="tags" style={{ flex: '1', marginRight: '10px' }}>Tags (comma separated):</label>
              <input id="tags" value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (comma separated)" style={{ flex: '2' }}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="submit">{id ? 'Update' : 'Add'}</button>
              {id && <button type="button" onClick={handleDelete}>Delete</button>}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
