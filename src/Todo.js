import React from "react";
import { motion } from "framer-motion";

const Todo = ({ todo, toggleTodo }) => {
  const handleCheck = () => toggleTodo(todo.id);

  return (
    <motion.div
      className="task"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      style={{
        background: "rgba(0,0,0,0.4)",
        border: "1px solid #0ff",
        borderRadius: "12px",
        padding: "12px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        boxShadow: "0 0 10px #0ff, 0 0 20px #f0f, 0 0 30px #0ff",
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        readOnly
        onChange={handleCheck}
      />
      <span
        className="task-name"
        style={{
          marginLeft: "10px",
          textShadow:
            "0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #f0f, 0 0 40px #0ff",
          fontWeight: "bold",
        }}
      >
        {todo.name}
      </span>
    </motion.div>
  );
};

export default Todo;
