import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const Journal = () => {
  const [content, setContent] = useState('');
  const [journals, setJournals] = useState([]);

  const fetchJournals = async () => {
    const res = await API.get('/api/journal/getjournals');
    setJournals(res.data);
  };

  const handleSubmit = async () => {
    await API.post('/api/journal/createjournals', { content });
    setContent('');
    fetchJournals();
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  return (
    <div>
      <h2>Your Journal</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        placeholder="Write something..."
      />
      <br />
      <button onClick={handleSubmit}>Save Entry</button>
      <ul>
        {journals.map((j) => (
          <li key={j._id}>
            <strong>{new Date(j.date).toLocaleString()}</strong>: {j.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Journal;
