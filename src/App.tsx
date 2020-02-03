import React from 'react';
import { WordsPractice } from './components/WordsPractice'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@progress/kendo-theme-default/dist/all.css';


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
