import React, { useState } from 'react';

const SummarizationForm = ({ setResult, setError }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSummarization = async (e) => {
    e.preventDefault();
    setError('');
    setResult('');
    try {
      const response = await fetch('http://localhost/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: formData.textToSummarize, style: formData.summarizationStyle }),
      });
      const data = await response.json();
      if (data.status === 'Completed') {
        setResult(data.result);
      } else {
        setError('Summarization failed.');
      }
    } catch (err) {
      setError('Error communicating with the server.');
    }
  };

  return (
    <form onSubmit={handleSummarization}>
      <h2>Summarize Text</h2>
      <textarea name="textToSummarize" placeholder="Enter text to summarize" onChange={handleChange} required />
      <select name="summarizationStyle" onChange={handleChange}>
        <option value="formal">Formal</option>
        <option value="informal">Informal</option>
        <option value="technical">Technical</option>
      </select>
      <button type="submit">Summarize</button>
    </form>
  );
};

export default SummarizationForm;
