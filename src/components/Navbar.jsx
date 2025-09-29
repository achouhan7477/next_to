"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import listIcon from "../../public/list.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link
        href="/"
        className="logo"
        style={{ display: "flex", alignItems: "center", gap: "8px" }}
      >
        <Image
          src={listIcon}
          alt="List Icon"
          width={24}
          height={24}
          style={{ objectFit: "contain" }}
        />
        MyTasks
      </Link>

      <div className="nav-links">
        <Link href="/personal">Personal Tasks</Link>
        <Link href="/work">Work Tasks</Link>
        <Link href="/shopping">Shopping List</Link>
        <Link href="/game">Game List</Link>
        <Link href="/shopping">Theame</Link>

      </div>
    </nav>
  );
};

export default Navbar;
