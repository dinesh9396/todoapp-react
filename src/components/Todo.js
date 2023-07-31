import React, { useState, useEffect } from "react";
import "./Todo.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch("https://flask-todo3.onrender.com/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    fetch("https://flask-todo3.onrender.com/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error(error));
  }, []);

  //   const addTodo = (newTodo) => {
  //     setTodos((prevTodos) => [...prevTodos, newTodo]);
  //   };

  const addTodo = (newTodo) => {
    fetch("https://flask-todo3.onrender.com/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: newTodo }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTodos((prevTodos) => [...prevTodos, data]);
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  const deleteTodo = (id) => {
    fetch(`https://flask-todo3.onrender.com/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => setTodos(todos.filter((todo) => todo._id !== id)))
      .catch((error) => console.error("Fetch error:", error));
  };

  const updateTodo = (id, updatedTask) => {
    fetch(`https://flask-todo3.onrender.com/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: updatedTask }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server response:", data);
        console.log("Task from todos array:", todos[0]);
        setTodos(todos.map((todo) => (todo._id === data._id ? data : todo)));
      })

      .catch((error) => console.error("Fetch error:", error));
  };

  const completeTodo = (id) => {
    fetch(`https://flask-todo3.onrender.com/${id}/complete`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // ensure you have this line
      },
      body: JSON.stringify({ completed: true }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        setCompletedTodos((prevCompleted) => [...prevCompleted, data]);
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  const deleteCompletedTodo = (id) => {
    fetch(`https://flask-todo3.onrender.com/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setCompletedTodos((prevCompletedTodos) =>
          prevCompletedTodos.filter((todo) => todo._id !== id)
        );
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  //   const remainingTodos = todos.filter((todo) => todo._id !== id);
  //   const completedTodo = todos.find((todo) => todo._id === id);
  //   setTodos(remainingTodos);
  //   setCompletedTodos([...completedTodos, completedTodo]);
  // };

  // const deleteCompletedTodo = (id) => {
  //   setCompletedTodos(completedTodos.filter((todo) => todo._id !== id));
  // };

  return (
    <div className="container">
      <h1 className="title">Todo App</h1>
      <div className="input_form">
        <TodoForm addTodo={addTodo} />
      </div>
      <div>
        <h2>Tasks To Do</h2>
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
          updateTodo={updateTodo}
        />
      </div>
      <div>
        <h2>Completed tasks</h2>
        <ul>
          {completedTodos.map((todo, index) => (
            <li key={index}>
              <i class="fas fa-thumbtack"></i>
              <span>{todo.todo}</span>
              <button onClick={() => deleteCompletedTodo(todo._id)}>
                <i class="fas fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
