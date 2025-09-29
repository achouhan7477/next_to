"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import listIcon  from "../../public/list.png";
import p_task from "../../public/p_task.png";
import work from "../../public/work.png";
import shopping from "../../public/shopping.png";
import game from "../../public/game.png";

const Navbar = () => {
  const navItems = [
    { href: "/personal", label: "Personal Tasks", icon: p_task },
    { href: "/work", label: "Work Tasks", icon: work },
    { href: "/shopping", label: "Shopping List", icon: shopping },
    { href: "/game", label: "Game List", icon: game },
    { href: "/theme", label: "Theme", icon: p_task }, // You can use any icon you want here
  ];

  return (
    <nav className="navbar">
      {/* Logo */}
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

      {/* Nav Links */}
      <div className="nav-links" style={{ display: "flex", gap: "16px" }}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <Image
              src={item.icon}
              alt={`${item.label} Icon`}
              width={20}
              height={20}
              style={{ objectFit: "contain" }}
            />
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
