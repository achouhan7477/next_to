'use client';
import { useState } from 'react';
import Image from 'next/image';
import Profile from '../../public/icons_profile.png'

export default function ProfileSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`profile-section ${open ? 'open' : ''}`}>
      <div className="profile-header" onClick={() => setOpen(!open)}>
        <Image src={Profile} alt="Profile" width={40} height={40} className="avatar"/>
        <span className="profile-name">Aman Chouhan</span>
        <span className="arrow">{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div className="profile-details">
          <div className="profile-info">
            <Image src={Profile} alt="Profile" width={60} height={60} className="avatar-large"/>
            <div>
              <p className="name">Aman Chouhan</p>
              <p className="email">amanc7477@gmail.com</p>
              <p className="role">Role: User</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
