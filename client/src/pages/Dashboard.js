import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const Dashboard = () => {
  const [mood, setMood] = useState('');
  const [content, setContent] = useState('');
  const [journals, setJournals] = useState([]);

  const emojis = ['😊', '😐', '😢', '😠', '😴'];

  const fetchJournals = async () => {
    try {
      const response = await axios.get('/api/journal/getjournals');
      setJournals(response.data);
    } catch (error) {
      console.error('Error fetching journals:', error);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content && !mood) return alert('Please enter a mood or some content.');

    const entry = `${mood} ${content}`.trim();

    try {
      const response = await axios.post('/api/journal/createjournals', {
        content: entry,
      });
      console.log('Journal saved:', response.data);
      setContent('');
      setMood('');
      fetchJournals();
    } catch (error) {
      console.error('Error saving journal:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome to the Dashboard</h2>
      <h4>Select your mood:</h4>
      <div style={{ fontSize: '24px', marginBottom: '10px' }}>
        {emojis.map((emoji) => (
          <span
            key={emoji}
            onClick={() => setMood(emoji)}
            style={{
              cursor: 'pointer',
              marginRight: '10px',
              border: emoji === mood ? '2px solid #000' : 'none',
              borderRadius: '50%',
              padding: '5px',
            }}
          >
            {emoji}
          </span>
        ))}
      </div>
      <textarea
        rows="4"
        cols="50"
        placeholder="Write about your day..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '10px' }}
      ></textarea>
      <button onClick={handleSubmit} style={{ padding: '8px 16px' }}>
        Submit
      </button>
      <h3 style={{ marginTop: '30px' }}>Your Previous Entries</h3>
      <div
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
          background: '#f4f4f4',
          padding: '10px',
          border: '1px solid #ccc',
        }}
      >
        {journals.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          journals.map((entry) => (
            <div key={entry._id} style={{ marginBottom: '10px' }}>
              <strong>{new Date(entry.date).toLocaleString()}</strong>
              <p>{entry.content}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
