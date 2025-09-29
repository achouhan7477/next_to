'use client';
import { useState, useEffect } from 'react';

export default function TodoCard({ listKey, title: defaultTitle, desc: defaultDesc }) {
  const STORAGE_KEY = 'todo_' + listKey;
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [title, setTitle] = useState(defaultTitle || 'My Card');
  const [desc, setDesc] = useState(defaultDesc || 'Description here');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setTasks(saved ? JSON.parse(saved) : []);
  }, [STORAGE_KEY]);

  const saveTasks = (updated) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setTasks(updated);
  }

  const addTask = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const exists = tasks.some(t => t.text.toLowerCase() === trimmed.toLowerCase());
    if (exists) {
      setError('Task already exists!');
      return;
    }

    const newTask = { id: Date.now(), text: trimmed, completed: false };
    saveTasks([...tasks, newTask]);
    setInput('');
    setError('');
  }

  const toggleComplete = (id) => {
    saveTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  const deleteTask = (id) => {
    saveTasks(tasks.filter(t => t.id !== id));
  }

  const startEdit = (id) => setEditId(id);

  const finishEdit = (id, newText) => {
    const trimmed = newText.trim();
    if (!trimmed) return;
    saveTasks(tasks.map(t => t.id === id ? { ...t, text: trimmed } : t));
    setEditId(null);
  }

  const handleDragStart = (e, id) => {
    setDraggedTaskId(id);
    e.dataTransfer.effectAllowed = "move";
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  const handleDrop = (e, id) => {
    e.preventDefault();
    if (id === draggedTaskId) return;

    const draggedIndex = tasks.findIndex(t => t.id === draggedTaskId);
    const dropIndex = tasks.findIndex(t => t.id === id);

    const newTasks = [...tasks];
    const [draggedTask] = newTasks.splice(draggedIndex, 1);
    newTasks.splice(dropIndex, 0, draggedTask);
    saveTasks(newTasks);
    setDraggedTaskId(null);
  }

  return (
    <div className="todo-card-wrapper">
      <h2 className="card-main-title">{title}</h2>

      <div className="card">
        <input 
          className="card-title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
        />
        <textarea 
          className="card-desc" 
          value={desc} 
          onChange={e => setDesc(e.target.value)} 
        />

        <div className="task-input">
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && addTask()} 
            placeholder="Add new task..."
          />
          <button onClick={addTask}>Add</button>
        </div>

        {error && <p style={{ color: 'red', margin: '5px 0' }}>{error}</p>}

        <ul>
          {tasks.map(t => (
            <li 
              key={t.id} 
              draggable
              onDragStart={(e) => handleDragStart(e, t.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, t.id)}
              className={t.completed ? 'completed' : ''}
            >
              <button onClick={() => toggleComplete(t.id)}>
                {t.completed ? '✅' : '⏳'}
              </button>

              {editId === t.id ? (
                <input
                  autoFocus
                  value={t.text}
                  onChange={e => saveTasks(tasks.map(task => task.id === t.id ? { ...task, text: e.target.value } : task))}
                  onBlur={e => finishEdit(t.id, e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && finishEdit(t.id, e.target.value)}
                  style={{ textDecoration: t.completed ? 'line-through' : 'none', color: t.completed ? '#9ca3af' : 'inherit' }}
                />
              ) : (
                <span style={{ textDecoration: t.completed ? 'line-through' : 'none', color: t.completed ? '#9ca3af' : 'inherit' }}>
                  {t.text}
                </span>
              )}

              <button onClick={() => startEdit(t.id)}>✏️</button>
              <button onClick={() => deleteTask(t.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
