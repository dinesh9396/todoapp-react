import React, { useState } from "react";
import "./TodoList.css";

const TodoList = ({ todos, deleteTodo, completeTodo, updateTodo }) => {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (todo) => {
    setEditId(todo._id);
    setEditText(todo.todo);
  };

  const handleUpdate = (e, id) => {
    if (e.key === "Enter") {
      updateTodo(id, editText);
      setEditId(null);
      setEditText("");
    }
  };
  return (
    <div className="todolist">
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className="listItem">
            <i class="fas fa-thumbtack"></i>

            {editId === todo._id ? (
              <input
                type="text"
                placeholder="Update your task"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyPress={(e) => handleUpdate(e, todo._id)}
              />
            ) : (
              <span>{todo.todo}</span>
            )}
            <button
              className="delete_button"
              onClick={() => deleteTodo(todo._id)}
            >
              <i class="fas fa-trash"></i>
            </button>
            <button className="edit_button" onClick={() => handleEdit(todo)}>
              <i class="fas fa-pen"></i>
            </button>
            <button
              className="complete_button"
              onClick={() => completeTodo(todo._id)}
            >
              Complete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
