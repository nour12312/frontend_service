import React, { useState } from 'react';

const TranslationForm = ({ setResult, setError }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTranslation = async (e) => {
    e.preventDefault();
    setError('');
    setResult('');
    try {
      const response = await fetch(`http://localhost/translate/${formData.languageDirection}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: formData.textToTranslate }),
      });
      const data = await response.json();
      if (data.status === 'Completed') {
        setResult(data.result);
      } else {
        setError('Translation failed.');
      }
    } catch (err) {
      setError('Error communicating with the server.');
    }
  };

  return (
    <form onSubmit={handleTranslation}>
      <h2>Translate Text</h2>
      <textarea name="textToTranslate" placeholder="Enter text to translate" onChange={handleChange} required />
      <select name="languageDirection" onChange={handleChange}>
        <option value="en2ar">English to Arabic</option>
        <option value="ar2en">Arabic to English</option>
      </select>
      <button type="submit">Translate</button>
    </form>
  );
};

export default TranslationForm;
