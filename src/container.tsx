import React, { useState, MouseEvent } from "react";
import { TodoComponent } from "./component";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoContainer: React.FC = () => {
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
    <TodoComponent
      todos={todos}
      isDarkMode={isDarkMode}
      toggleTheme={toggleTheme}
      setShowButton={setShowButton}
      showButton={showButton}
      addTodo={addTodo}
      showDeleteButton={showDeleteButton}
      hideDeleteButton={hideDeleteButton}
      toggleCompleted={toggleCompleted}
      deleteTodo={deleteTodo}
    />
  );
};
