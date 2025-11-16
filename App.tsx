
import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { USERNAME, PASSWORD } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (username: string, password: string) => {
    if (username === USERNAME && password === PASSWORD) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('ভুল ইউজারনেম অথবা পাসওয়ার্ড');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <Login onLogin={handleLogin} error={error} />
      )}
    </div>
  );
};

export default App;
