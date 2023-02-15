import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Day from './Day';
import Heatmap from './Heatmap'
import YearAtGlance from './YearAtGlance'
import Calendar from './calendar'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div class='heatmap-display'>
      <h2>Habit Tracker Heat Map:</h2>
      <Heatmap></Heatmap>
      <h2>Year at a glance:</h2>
      <YearAtGlance></YearAtGlance>
      <Calendar></Calendar>
    </div>
    <div>
      
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
