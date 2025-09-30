"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  function handleSignup() {
    if (username.trim()) {
      localStorage.setItem("user", username);
      alert("Signup successful! Please login now.");
      router.push("/login");
    }
  }

  return (
    <div>
      <h1>Signup Page</h1>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
