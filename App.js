import { useRef, useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import AnimatedCounter from "./AnimatedCounter";
import CyberBackground from "./CyberBackground"; // 背景用コンポーネント

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleAddTodo = () => {
    const name = todoNameRef.current.value.trim();
    if (!name) return;
    setTodos((prev) => [...prev, { id: uuidv4(), name, completed: false }]);
    todoNameRef.current.value = "";
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      setTodos(newTodos);
    }
  };

  const handleClear = () => {
    setTodos(todos.filter((t) => !t.completed));
  };

  return (
    <div style={styles.app}>
      <CyberBackground />

      <div style={styles.container}>
        <h1 style={styles.title}>👽YMTs ToDo List👽</h1>

        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />

        <div style={styles.inputGroup}>
          <input
            type="text"
            ref={todoNameRef}
            placeholder="Enter task..."
            style={styles.input}
          />
          <button onClick={handleAddTodo} style={styles.button}>
            Add Task
          </button>
          <button onClick={handleClear} style={styles.button}>
            Delete 
          </button>
        </div>

        <div style={styles.counter}>
  残りのタスク：
  <AnimatedCounter value={todos.filter((t) => !t.completed).length} /> ／ 
  合計：
  <AnimatedCounter value={todos.length} />
</div>
      </div>
    </div>
  );
}

const styles = {
  app: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "#0f0f0f",
    color: "#00ffea",
    fontFamily: "'Orbitron', sans-serif",
  },
  container: {
    position: "relative",
    zIndex: 1,
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: "10px",
    boxShadow: "0 0 20px #00ffea",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#ffffff",
  },
  inputGroup: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    outline: "none",
  },
  button: {
    padding: "10px 15px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#00ffea",
    color: "#000",
    cursor: "pointer",
  },
  counter: {
    textAlign: "center",
    fontSize: "1.2rem",
    marginTop: "10px",
    textShadow: "0 0 5px #0f0, 0 0 10px #0f0, 0 0 20px #0ff",
  },
};

export default App;
