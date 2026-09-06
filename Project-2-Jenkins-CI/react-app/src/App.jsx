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
      <h1>Jenkins CI Demo App</h1>

      <section className="card">
        <h2>Counter</h2>
        <p data-testid="count-value">Count: {count}</p>
        <button onClick={() => setCount((c) => c + 1)}>Increment</button>
        <button onClick={() => setCount((c) => c - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </section>

      <section className="card">
        <h2>Task List</h2>
        <form onSubmit={addTask}>
          <input
            aria-label="new-task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add a task"
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {tasks.map((task, index) => (
            <li key={`${task}-${index}`}>
              {task}
              <button aria-label={`remove-${task}`} onClick={() => removeTask(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default App
