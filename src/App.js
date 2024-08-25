

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [visibleSections, setVisibleSections] = useState(['Characters', 'Numbers', 'Highest alphabet']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = JSON.parse(jsonInput);
      const res = await axios.post('https://backendb-1.onrender.com/bfhl', payload); // Replace with your backend URL
      setResponse(res.data);
    } catch (error) {
      console.error('Invalid JSON or error in submission', error);
    }
  };

  const toggleVisibility = (section) => {
    if (visibleSections.includes(section)) {
      setVisibleSections(visibleSections.filter(v => v !== section));
    } else {
      setVisibleSections([...visibleSections, section]);
    }
  };

  return (
    <div>
      <h1>21BIT0700</h1> {/* Replace with your roll number */}
      <form onSubmit={handleSubmit}>
        <textarea style={{width:'300px',height:'200px'}}
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON input here'
        />
        <button type='submit'>Submit</button>
      </form>
      {response && (
        <>
          <div>
            <label>
              <input
                type='checkbox'
                checked={visibleSections.includes('Characters')}
                onChange={() => toggleVisibility('Characters')}
              />
              Characters
            </label>
            <label>
              <input
                type='checkbox'
                checked={visibleSections.includes('Numbers')}
                onChange={() => toggleVisibility('Numbers')}
              />
              Numbers
            </label>
            <label>
              <input
                type='checkbox'
                checked={visibleSections.includes('Highest alphabet')}
                onChange={() => toggleVisibility('Highest alphabet')}
              />
              Highest alphabet
            </label>
          </div>
          <div>
            {visibleSections.includes('Characters') && (
              <div>
                <h2>Characters</h2>
                <p>{response.alphabets.join(', ')}</p>
              </div>
            )}
            {visibleSections.includes('Numbers') && (
              <div>
                <h2>Numbers</h2>
                <p>{response.numbers.join(', ')}</p>
              </div>
            )}
            {visibleSections.includes('Highest alphabet') && (
              <div>
                <h2>Highest alphabet</h2>
                <p>{response.highest_alphabet.join(', ')}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

