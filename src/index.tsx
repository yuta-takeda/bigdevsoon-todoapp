import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { TodoContainer } from "./container";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <TodoContainer />
  </React.StrictMode>,
);
