import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./TodoList";
import AnimatedCounter from "./AnimatedCounter";
import CyberBackground from "./CyberBackground";

function App() {
  const [todos, setTodos] = useState([]);
  const [lateCounts, setLateCounts] = useState([]);
  const todoNameRef = useRef();

  // Todo削除
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Todo追加
  const handleAddTodo = () => {
    const name = todoNameRef.current.value.trim();
    if (!name) return;
    setTodos((prev) => [...prev, { id: uuidv4(), name, completed: false }]);
    todoNameRef.current.value = "";
  };

  // Todo完了切替
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 完了済みTodo削除
  const handleClear = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  // 遅刻記録追加
  const recordLate = () => {
    const today = new Date();
    const dateStr = today.toISOString().split("T")[0]; // YYYY-MM-DD
    setLateCounts((prev) => [...prev, { id: uuidv4(), date: dateStr }]);
  };

  // 遅刻履歴削除
  const deleteLate = (id) => {
    setLateCounts((prev) => prev.filter((late) => late.id !== id));
  };

  // 当月の遅刻回数
  const getCurrentMonthLateCount = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    return lateCounts.filter((late) => {
      const d = new Date(late.date);
      return d.getFullYear() === year && d.getMonth() === month;
    }).length;
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
            Delete Completed
          </button>
        </div>

        {/* タスクカウント */}
        <div style={styles.counter}>
          残りのタスク：
          <AnimatedCounter value={todos.filter((t) => !t.completed).length} /> ／
          合計：
          <AnimatedCounter value={todos.length} />
        </div>

        {/* 遅刻カウント */}
        <div style={styles.lateCounter}>
          今月の遅刻回数：
          <AnimatedCounter value={getCurrentMonthLateCount()} />
        </div>

        {/* 遅刻記録ボタン */}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button onClick={recordLate} style={styles.button}>
            遅刻記録
          </button>
        </div>

        {/* 遅刻履歴リスト */}
        <div style={styles.lateListContainer}>
          <h2 style={styles.lateListTitle}>遅刻履歴</h2>
          {lateCounts.length === 0 ? (
            <p style={styles.noLate}>まだ遅刻記録はありません</p>
          ) : (
            <ul style={styles.lateList}>
              {lateCounts
                .slice()
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((late) => (
                  <li key={late.id} style={styles.lateItem}>
                    {late.date}
                    <button
                      onClick={() => deleteLate(late.id)}
                      style={styles.lateDeleteButton}
                    >
                      削除
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  app: {
    position: "relative",
    minHeight: "100vh",
    fontFamily: "'Orbitron', sans-serif",
    color: "#00ffea",
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
  lateCounter: {
    textAlign: "center",
    fontSize: "1.2rem",
    marginTop: "15px",
    color: "#ff4444",
    textShadow: "0 0 5px #f00, 0 0 10px #f00",
  },
  lateListContainer: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    borderRadius: "8px",
    color: "#ffcccc",
    textAlign: "center",
  },
  lateListTitle: {
    marginBottom: "10px",
    fontSize: "1.2rem",
    color: "#ff4444",
  },
  lateList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    maxHeight: "150px",
    overflowY: "auto",
  },
  lateItem: {
    padding: "5px 0",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noLate: {
    fontStyle: "italic",
    color: "#ff8888",
  },
  lateDeleteButton: {
    padding: "3px 8px",
    fontSize: "0.8rem",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#ff0000",
    color: "#fff",
    cursor: "pointer",
    animation: "glow 1.5s infinite",
  },
};

export default App;
