"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  function handleLogin() {
    const savedUser = localStorage.getItem("user");

    if (savedUser && savedUser === username) {
      document.cookie = "auth=true; path=/";
      router.push("/");
    } else {
      alert("Invalid user! Please signup first.");
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>Login Page</h1>
      
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleLogin} style={{ padding: "8px 16px" }}>
        Login
      </button>

      <p style={{ marginTop: "20px" }}>
        Don't have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
          onClick={() => router.push("/signup")}
        >
          Sign up here
        </span>
      </p>
    </div>
  );
}
