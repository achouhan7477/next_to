'use client';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import SignupPage from '../../components/SignupPage';

export default function SignupPages() {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <main style={{ marginLeft: '240px', padding: '80px 20px 20px' }}>
        <h1>SignupPage</h1>
        <SignupPage />
      </main>
    </div>
  );
}
