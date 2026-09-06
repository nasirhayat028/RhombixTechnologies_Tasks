import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [tasks, setTasks] = useState(['Set up Jenkins', 'Write tests'])
  const [taskInput, setTaskInput] = useState('')

  const addTask = (e) => {
    e.preventDefault()
    const trimmed = taskInput.trim()
    if (!trimmed) return
    setTasks([...tasks, trimmed])
    setTaskInput('')
  }

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <div className="app">
      <header className="app-header">
        <span className="badge">Rhombix Technologies &bull; DevOps Internship</span>
        <h1>Jenkins CI Demo App</h1>
        <p className="subtitle">
          A small React application built to exercise an automated Jenkins pipeline —
          install, lint, test, and build — for Project 2 of the Rhombix Technologies
          DevOps internship.
        </p>
      </header>

      <main>
        <section className="counter-card">
          <span className="counter-star" aria-hidden="true">★</span>
          <h2>Counter</h2>
          <p className="count-value" data-testid="count-value">
            Count: {count}
          </p>
          <div className="counter-controls">
            <button
              className="icon-btn"
              aria-label="Increment"
              onClick={() => setCount((c) => c + 1)}
            >
              +
            </button>
            <button
              className="icon-btn"
              aria-label="Decrement"
              onClick={() => setCount((c) => c - 1)}
            >
              &minus;
            </button>
          </div>
          <button className="reset-btn" onClick={() => setCount(0)}>
            Reset
          </button>
        </section>

        <section className="card task-card">
          <h2>Task List</h2>
          <form className="task-form" onSubmit={addTask}>
            <input
              aria-label="new-task"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Add a task"
            />
            <button type="submit">Add</button>
          </form>
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li key={`${task}-${index}`}>
                <span>{task}</span>
                <button
                  className="remove-btn"
                  aria-label={`remove-${task}`}
                  onClick={() => removeTask(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Built by <strong>Nasir Hayat</strong> as part of the Rhombix Technologies
          DevOps Internship — Project 2: Jenkins CI.
        </p>
      </footer>
    </div>
  )
}

export default App
