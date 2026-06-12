import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorOn, setCursorOn] = useState(true);

  const addTodo = () => {
    if (input.trim() === "") return;

    setTodos([
      ...todos,
      { text: input, completed: false }
    ]);

    setInput("");
  };

  const toggleTodo = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const deleteTodo = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  return (
    <div
      className={`background ${cursorOn ? "custom-cursor" : ""}`}
      onMouseMove={(e) =>
        setCursor({ x: e.clientX, y: e.clientY })
      }
    >

      {/* Toggle Button */}
      <button
        className="cursor-toggle"
        onClick={() => setCursorOn(!cursorOn)}
      >
        {cursorOn ? "Blob: ON" : "Blob: OFF"}
      </button>

      {/* Jelly Blob Cursor */}
      {cursorOn && (
        <>
          <div className="blob blob1" style={{ left: cursor.x + "px", top: cursor.y + "px" }}></div>
          <div className="blob blob2" style={{ left: cursor.x + "px", top: cursor.y + "px" }}></div>
          <div className="blob blob3" style={{ left: cursor.x + "px", top: cursor.y + "px" }}></div>
        </>
      )}

      <div className="glass">
        <h1>Todo List</h1>

        <div className="inputBox">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <span className={todo.completed ? "done" : ""}>
                {todo.text}
              </span>

              <div className="buttons">
                <button onClick={() => toggleTodo(index)}>✔</button>
                <button onClick={() => deleteTodo(index)}>🗑</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

