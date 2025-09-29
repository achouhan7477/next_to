'use client';
import { useState } from 'react';

export default function CalculatorModal({ open, onClose }) {
  const [input, setInput] = useState('');

  if (!open) return null;

  const handleCalculate = () => {
    try {
      alert(eval(input));
    } catch {
      alert('Invalid expression');
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose}>Close</button>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="2+2" />
        <button onClick={handleCalculate}>Calculate</button>
      </div>
    </div>
  )
}
