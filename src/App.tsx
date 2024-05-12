import React, { useState, MouseEvent } from "react";
import "./App.css";
import lightModeIcon from "./assets/icons/light-mode.svg";
import emptyState from "./assets/emptystate.png";
import deleteIcon from "./assets/icons/close.svg";

interface Todo {
  id: number;
  text: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showButton, setShowButton] = useState(false);

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
    const newTodos = [...todos, { id: lastId + 1, text: value }];
    console.log(newTodos);
    setTodos(newTodos);
    setShowButton(false);
    input.value = "";
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

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="title">TODO</div>
        <div className="toggle">
          <img src={lightModeIcon} alt={"モード切替"} />
        </div>
      </div>
      <div className="background">
        <div className="addTodo">
          <input
            type="text"
            className="input"
            placeholder="Create a new todo..."
            onChange={() => setShowButton(true)}
          />
          {showButton && (
            <button type="button" className="button" onClick={() => addTodo()}>
              Add todo
            </button>
          )}
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
                >
                  <div className="todoText">{todo.text}</div>
                  <img
                    src={deleteIcon}
                    className="deleteTodo"
                    height="24"
                    width="24"
                    onClick={() => deleteTodo(todo.id)}
                  />
                </div>
              );
            })}
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
