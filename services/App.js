import React, { useState } from 'react';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import ActionSelection from './components/ActionSelection';
import TranslationForm from './components/TranslationForm';
import SummarizationForm from './components/SummarizationForm';

const App = () => {
  const [currentView, setCurrentView] = useState('signup');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const switchView = (view) => setCurrentView(view);

  return (
    <div className="app">
      <header>TransSummary</header>
      <main>
        {currentView === 'signup' && (
          <SignupForm
            onSwitchToLogin={() => switchView('login')}
            setResult={setResult}
            setError={setError}
          />
        )}
        {currentView === 'login' && (
          <LoginForm
            onSwitchToSignup={() => switchView('signup')}
            setResult={setResult}
            setError={setError}
            onLoginSuccess={() => switchView('actions')}
          />
        )}
        {currentView === 'actions' && (
          <ActionSelection onSelectAction={switchView} />
        )}
        {currentView === 'translation' && (
          <TranslationForm setResult={setResult} setError={setError} />
        )}
        {currentView === 'summarization' && (
          <SummarizationForm setResult={setResult} setError={setError} />
        )}
        {result && <div className="result">{result}</div>}
        {error && <div className="error">{error}</div>}
      </main>
      <footer>&copy; 2024 TransSummary. All Rights Reserved.</footer>
    </div>
  );
};

export default App;
