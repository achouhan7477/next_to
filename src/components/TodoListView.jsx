'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import '../styles/ReadOnlyTodo.css';

export default function ReadOnlyTodo({ listKey, title: defaultTitle, desc: defaultDesc }) {
  const STORAGE_KEY = 'todo_' + listKey;
  const [tasks, setTasks] = useState([]);
  const [title] = useState(defaultTitle || 'My Card');
  const [desc] = useState(defaultDesc || 'Description here');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setTasks(saved ? JSON.parse(saved) : []);
  }, [STORAGE_KEY]);

  return (
    <div className="read-todo-card">
      <div className="read-todo-header">
        <Link href="/personal" className="read-todo-title">{title}</Link>
        <p className="read-todo-desc">{desc}</p>
      </div>

      <ul className="read-todo-list">
        {tasks.map((t) => (
          <li
            key={t.id}
            className={`read-todo-item ${t.completed ? 'read-todo-completed' : ''}`}
          >
            <span>{t.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
