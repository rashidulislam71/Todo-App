/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import { useEffect, useState } from "react";
import "./TodoApp.css";

// Get Todo Form LocalStorage
const getLocalStorage = () => {
  const getTodo = localStorage.getItem("todo")
  return getTodo ? JSON.parse(getTodo) : [];
}

const TodoApp = () => {
  const [todos, setTodos] = useState(getLocalStorage);
  const [input, setInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [updateTodo, setUpdateTodo] = useState(0);

// Set Todo LocalStorage
  useEffect(()=>{
    localStorage.setItem("todo", JSON.stringify(todos))
  },[todos])


  // Add task
  const addTask = (e) => {
    e.preventDefault();
    setTodos([...todos, input]);
    setInput("");
  };

  // Delete task
  const deleteBtn = (id) => {
    let deleteTodo = todos.filter((element, index) => index !== id);
    setTodos(deleteTodo);
  };

  // Edit task
  const editBtn = (id) => {
    let editIndexElement = todos.find((element, index) => index === id);
    setInput(editIndexElement);
    setIsEdit(true);
    setUpdateTodo(id);
  };

  // Update Task
  const updateTask = (e) => {
    e.preventDefault();
    todos[updateTodo] = input;
    setIsEdit(false);
    setInput("");
  };

  // Remove all tasks
  const removeAll = () => {
    setTodos([]);
  };

  return (
    <div>
      <div className="todo-app-content flex">
        <h1 className="title">Add Your Daily Works:</h1>
        <div className="form-content">
          <div className="form">
            <form onSubmit={isEdit ? updateTask : addTask}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Enter your task...."
                required
                autofocus="true"
              />
              <button className="addTaskBtn">
                {" "}
                {isEdit ? "Update Task" : "Add Task"}
              </button>
            </form>
          </div>
        </div>

        <h1>Tasks</h1>
        <ul className="tasks-list">
          {todos.map((element, index) => {
            return (
              <li>
                <div className="all-task flex">
                  <div className="listElement flex ">
                    <button  className="task-ok flex"><span><IoCheckmarkDone /></span></button>
                    {element}
                  </div>
                  <div className="btns flex">
                    <div className="edit-btn ">
                      <p onClick={() => editBtn(index)}>
                        <div><FiEdit /></div>
                      </p>
                    </div>
                    <div className="delete-btn">
                      <p onClick={() => deleteBtn(index)}>
                        <div><MdDeleteForever /></div>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="removeAll">
          <button onClick={removeAll}>Remove All</button>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
