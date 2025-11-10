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

 
