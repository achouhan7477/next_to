'use client';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Calculator from '../../components/Calculator'

export default function CalculatorPage() {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <main style={{ marginLeft: '240px', padding: '80px 20px 20px' }}>
        <h1>Calculator</h1>
        <Calculator />
      </main>
    </div>
  );
}
