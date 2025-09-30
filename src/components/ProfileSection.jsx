"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Profile from "../../public/icons_profile.png";

export default function ProfileSection() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {

    const savedUser = localStorage.getItem("user");
    const savedEmail = localStorage.getItem("email");

    if (savedUser) setUsername(savedUser);
    if (savedEmail) setEmail(savedEmail);
  }, []);

  function handleLogout() {
    document.cookie = "auth=; path=/; max-age=0"; 
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    window.location.href = "/login";
  }

  return (
    <div className={`profile-section ${open ? "open" : ""}`}>
      <div className="profile-header" onClick={() => setOpen(!open)}>
        <Image src={Profile} alt="Profile" width={40} height={40} className="avatar" />
        <span className="profile-name">{username || "Guest"}</span>
        <span className="arrow">{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="profile-details">
          <div className="profile-info">
            <Image src={Profile} alt="Profile" width={60} height={60} className="avatar-large" />
            <div>
              <p className="name">{username || "Guest"}</p>
              <p className="email">{email || "No email saved"}</p>
              <p className="role">Role: User</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
