'use client';
import { useState, useEffect } from 'react';
import '../styles/calculator.css';

export default function Calculator({ onClose }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('calc_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleClick = (value) => setInput((prev) => prev + value);

  const calculate = () => {
    try {

      const MAX_VALUE = 999999;
      const MIN_VALUE = -999999;


      let computedResult = eval(input); 


      if (computedResult > MAX_VALUE) {
        let extra = computedResult - MAX_VALUE; 
        console.log(`Result too big! Capping it by removing ${extra}`);
        computedResult = MAX_VALUE;
      } else if (computedResult < MIN_VALUE) {
        let deficit = MIN_VALUE - computedResult; 
        console.log(`Result too small! Increasing it by ${deficit}`);
        computedResult = MIN_VALUE;
      }


      const formatResult = (res) => Number(res.toFixed(2));

      const finalResult = formatResult(computedResult);

      setResult(finalResult);


      const newHistory = [
        { expression: `${input}`, result: `${finalResult}` },
        ...history,
      ];
      setHistory(newHistory);
      localStorage.setItem('calc_history', JSON.stringify(newHistory));
    } catch {
      setResult('Error');
    }
  };

  const clear = () => {
    setInput('');
    setResult('');
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calc_history');
  };

  const toggleHistory = () => setShowHistory(!showHistory);

  return (
    <div className="calc-overlay">
      <div className="calc-container">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        <input type="text" value={input} readOnly className="calc-display" />

        <div className="calc-buttons">
          {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map((btn) =>
            btn === '=' ? (
              <button key={btn} onClick={calculate}>=</button>
            ) : (
              <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
            )
          )}
          <button onClick={clear}>C</button>
        </div>

        {result && <div className="calc-result">Result: {result}</div>}

        <button className="toggle-history-btn" onClick={toggleHistory}>
          {showHistory ? 'Hide History' : 'Show History'}
        </button>

        {showHistory && (
          <div className="calc-history">
            <h4>History</h4>
            {history.length === 0 ? (
              <p className="empty-history">No history yet</p>
            ) : (
              <ul>
                {history.map((h, i) => (
                  <li key={i}>
                    {h.expression} = <strong>{h.result}</strong>
                  </li>
                ))}
              </ul>
            )}
            {history.length > 0 && (
              <button className="clear-history-btn" onClick={clearHistory}>
                Clear History
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
