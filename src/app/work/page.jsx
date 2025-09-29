'use client';
import Navbar from '@/components/Navbar';
import TodoCard from '@/components/TodoCard';
// import ProfileSection from '@/components/ProfileSection';
import ThemeToggle from '@/components/ThemeToggle';
import CalculatorModal from '@/components/CalculatorModal';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

export default function WorkPage() {
  const [calcOpen, setCalcOpen] = useState(false);

  return (
    <div>
      <Sidebar />
      <Navbar />
      <main>
        <ThemeToggle />
        {/* <h1>Dashboard</h1> */}
        {/* <button onClick={() => setCalcOpen(true)}>Open Calculator</button> */}
        <div className="cards">
          {/* <TodoCard listKey="personal" title="Personal Tasks" desc="Home tasks" /> */}
          <TodoCard listKey="work" title="Work Tasks" desc="Office tasks" />
          {/* <TodoCard listKey="work" title="Shopping List" desc="Personal tasks" /> */}
        </div>
      </main>
      <CalculatorModal open={calcOpen} onClose={() => setCalcOpen(false)} />
    </div>
  );
}
