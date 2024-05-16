import React, { useState, MouseEvent } from "react";
import "./App.css";
import lightModeIcon from "./assets/icons/light-mode.svg";
import darkModeIcon from "./assets/icons/dark-mode.svg";
import emptyState from "./assets/emptystate.svg";
import deleteIcon from "./assets/icons/close.svg";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showButton, setShowButton] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addTodo = () => {
    const input = document.querySelector<HTMLInputElement>(".input");
    if (!input) {
      return;
    }

    const value = input.value;
    if (value == "") {
      alert("Please enter a value");
      return;
    }
    const lastId = Math.max(Math.max(...todos.map((todo) => todo.id)), 1);
    const newTodos = [
      ...todos,
      { id: lastId + 1, text: value, completed: false },
    ];
    const sortedTodos = sortTodo(newTodos);
    setTodos(sortedTodos);
    setShowButton(false);
    input.value = "";
  };

  const deleteTodo = (event: MouseEvent, id: number) => {
    event.stopPropagation();

    const newTodos = todos.filter((todo) => todo.id !== id);
    const sortedTodos = sortTodo(newTodos);
    setTodos(sortedTodos);
  };

  const toggleCompleted = (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    const sortedTodos = sortTodo(newTodos);
    setTodos(sortedTodos);
  };

  const sortTodo = (todos: Todo[]) => {
    return todos.sort((a: Todo, b: Todo) => {
      return Number(a.completed) - Number(b.completed);
    });
  };

  const showDeleteButton = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    const deleteIcon: HTMLImageElement | null =
      target.querySelector(".deleteTodo");
    if (!deleteIcon) {
      return;
    }
    deleteIcon.style.display = "block";
  };

  const hideDeleteButton = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    const deleteIcon: HTMLImageElement | null =
      target.querySelector(".deleteTodo");
    if (!deleteIcon) {
      return;
    }
    deleteIcon.style.display = "none";
  };

  const toggleTheme = () => {
    const html = document.querySelector("html");
    if (!html) {
      return;
    }

    if (html.classList.contains("darkmode")) {
      html.classList.remove("darkmode");
      setIsDarkMode(false);
    } else {
      html.classList.add("darkmode");
      setIsDarkMode(true);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <div className="title">TODO</div>
        <div className="toggle" onClick={() => toggleTheme()}>
          <img
            src={isDarkMode ? lightModeIcon : darkModeIcon}
            alt={"モード切替"}
          />
        </div>
      </div>
      <div className="background">
        <div className="addTodo">
          <div className="inputField">
            <input
              type="text"
              className="input"
              placeholder="Create a new todo..."
              onChange={() => setShowButton(true)}
            />
            {showButton && (
              <button
                type="button"
                className="button"
                onClick={() => addTodo()}
              >
                Add todo
              </button>
            )}
          </div>
        </div>
        {todos.length > 0 ? (
          <div className="todoList">
            {todos.map((todo) => {
              return (
                <div
                  className="todo"
                  key={todo.id}
                  onMouseEnter={(e) => showDeleteButton(e)}
                  onMouseLeave={(e) => hideDeleteButton(e)}
                  onClick={() => toggleCompleted(todo.id)}
                >
                  <div className="todoLabel">
                    <input type="checkbox" checked={todo.completed} />
                    <div
                      className={
                        todo.completed ? "todoTextCompleted" : "todoText"
                      }
                    >
                      {todo.text}
                    </div>
                  </div>
                  <img
                    src={deleteIcon}
                    className="deleteTodo"
                    height="24"
                    width="24"
                    onClick={(e) => deleteTodo(e, todo.id)}
                  />
                </div>
              );
            })}
            <footer className="footer">
              <p>
                {todos.filter((todo) => todo.completed).length} / {todos.length}{" "}
                tasks completed
              </p>
            </footer>
          </div>
        ) : (
          <div className="emptyTodo">
            <img src={emptyState} className="emptyState" alt="no todo" />
            <p>You're todo's are empty</p>
            <small>Please add first one</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
