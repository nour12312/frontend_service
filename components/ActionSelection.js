import React from 'react';

const ActionSelection = ({ onSelectAction }) => {
  return (
    <div>
      <button onClick={() => onSelectAction('translation')}>Translate Text</button>
      <button onClick={() => onSelectAction('summarization')}>Summarize Text</button>
    </div>
  );
};

export default ActionSelection;
