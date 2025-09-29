'use client';
import Navbar from '../components/Navbar';
import TodoListView from '../components/TodoListView';
import ProfileSection from '../components/ProfileSection';
import ThemeToggle from '../components/ThemeToggle';
import CalculatorModal from '../components/CalculatorModal';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

export default function Page() {
  const [calcOpen, setCalcOpen] = useState(false);

  return (
    <div>
      <Sidebar />
      <Navbar />
      <main>
        <ThemeToggle />
        <h1>Dashboard</h1>
        {/* <button onClick={() => setCalcOpen(true)}>Open Calculator</button> */}
        <div className="cards">
         <TodoListView listKey="personal" title="Personal Tasks" desc="Home tasks" />
<TodoListView listKey="work" title="Work Tasks" desc="Office tasks" />
<TodoListView listKey="shopping" title="Shopping List" desc="Items to buy" />

        </div>
      </main>
      <ProfileSection />
      <CalculatorModal open={calcOpen} onClose={() => setCalcOpen(false)} />
    </div>
  );
}
