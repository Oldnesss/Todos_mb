import React, { useState } from "react";
import "./App.css";
import Form from "../Form/Form";
import FilterButtons from "../FilterButtons/FilterButtons"; // Импортируем компонент кнопок фильтрации
import { Todo } from "../../types/types";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [allTodos, setAllTodos] = useState(0);
  const [doneTodos, setDoneTodos] = useState(0);
  const [activeTodos, setActiveTodos] = useState(0);
  const [filter, setFilter] = useState("all"); // Добавляем состояние для фильтрации

  const putTodo = (value: string): void => {
    if (value) {
      setTodos([...todos, { id: Date.now(), value, done: false }]);
      setAllTodos(allTodos + 1);
      setActiveTodos(activeTodos + 1);
    } else {
      alert("введите текст");
    }
  };

  const toggleTodo = (id: number): void => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        const updateTodo = { ...todo, done: !todo.done };
        updateTodo.done
          ? setDoneTodos((prev) => prev + 1)
          : setDoneTodos((prev) => prev - 1);
        updateTodo.done
          ? setActiveTodos((prev) => prev - 1)
          : setActiveTodos((prev) => prev + 1);
        return updateTodo;
      })
    );
  };

  const removeTodo = (id: number): void => {
    const removedTodo = todos.find((todo) => todo.id === id);
    if (removedTodo && !removedTodo.done) {
      setActiveTodos(activeTodos - 1); // Уменьшаем счетчик активных задач, если удаляем активную задачу
    }
    setTodos(todos.filter((todo) => todo.id !== id));
    setAllTodos(allTodos - 1);
    removedTodo && removedTodo.done && setDoneTodos((prev) => prev - 1); // Если удаляемая задача выполнена, уменьшаем счетчик выполненных задач
  };

  const deleteAllTodos = (): void => {
    setTodos([]);
    setAllTodos(0);
    setDoneTodos(0);
    setActiveTodos(0);
  };

  const filterTodos = (filter: string): Todo[] => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.done);
      case "completed":
        return todos.filter((todo) => todo.done);
      default:
        return todos;
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="title">
          {" "}
          Todos
          <Form putTodo={putTodo} />
          <FilterButtons filter={setFilter} /> 
          <ul className="todos">
            {filterTodos(filter).map((todo) => (
              <li
                className={todo.done ? "todo done" : "todo"}
                key={todo.id}
                onClick={() => toggleTodo(todo.id)}
              >
                <img
                  src="./done-check.png"
                  alt="done"
                  className="done_todo__icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTodo(todo.id);
                  }}
                />

                {todo.value}
                <img
                  src="./trash.png"
                  alt="delete"
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTodo(todo.id);
                  }}
                />
              </li>
            ))}
          </ul>
          <div className="info">
            <span>All todos: {allTodos}</span>
            <span>Active todos: {activeTodos}</span>
            <span>Done: {doneTodos}</span>
          </div>
          <button
            type="button"
            className="deleteAll"
            onClick={() => deleteAllTodos()}
          >
            Clear All
          </button>
        </h1>
      </div>
    </div>
  );
};

export default App;
