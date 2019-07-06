import React from 'react';
import logo from './logo.svg';
import { WordsPractice } from './components/WordsPractice'
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <WordsPractice></WordsPractice>
      </header>
    </div>
  );
}

export default App;
