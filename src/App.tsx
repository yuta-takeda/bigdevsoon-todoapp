import React from "react";
import "./App.css";
import lightModeIcon from "./assets/icons/light-mode.svg";
import emptyState from "./assets/emptystate.png";

function App() {
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
          />
          <button type="button" className="button">
            Add todo
          </button>
        </div>
        <div className="todoList">
          <img src={emptyState} className="emptyState" alt="no todo" />
          <p>You're todo's are empty</p>
          <small>Please add first one</small>
        </div>
      </div>
    </div>
  );
}

export default App;
