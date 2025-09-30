'use client';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import LoginPage from '../../components/LoginPage';

export default function LoginPages() {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <main style={{ marginLeft: '240px', padding: '80px 20px 20px' }}>
        <h1>LoginPage</h1>
        <LoginPage />
      </main>
    </div>
  );
}
