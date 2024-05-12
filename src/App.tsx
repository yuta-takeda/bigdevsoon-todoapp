import React, { useState } from "react";
import "./App.css";
import lightModeIcon from "./assets/icons/light-mode.svg";
import emptyState from "./assets/emptystate.png";

function App() {
  const [todos, setTodos] = useState<string[]>([]);
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
    const newTodos = [...todos, value];
    setTodos(newTodos);
    setShowButton(false);
    input.value = "";
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
        {todos ? (
          <div className="todoList">
            {todos.map((todo, index) => {
              return (
                <div className="todo" key={index}>
                  {todo}
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
