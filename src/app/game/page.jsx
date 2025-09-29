'use client';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import GameList from '../../components/GameList'

export default function GamePage() {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <main style={{ marginLeft: '240px', padding: '80px 20px 20px' }}>
        <h1>GameList</h1>
        <GameList />
      </main>
    </div>
  );
}
