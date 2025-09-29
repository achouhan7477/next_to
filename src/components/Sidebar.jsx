'use client';
// import Link from 'next/link';
import { useState } from 'react';
import Calculator from './Calculator';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [calcOpen, setCalcOpen] = useState(false);

  return (
    <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
      {/* <div className="logo">🚀 MyDashboard</div> */}
      {/* <button onClick={() => setExpanded(!expanded)}>
        {expanded ? '⬅️' : '➡️'}
      </button> */}
      <nav>
        {/* <Link href="/">Home</Link> */}
        <button className="calc-btn" onClick={() => setCalcOpen(true)}>
          Calculator
        </button>
      </nav>

      {calcOpen && <Calculator onClose={() => setCalcOpen(false)} />}
    </div>
  );
}
