import React, { useRef } from "react";
import axios from "axios";

const Todo = ({ todo, onUpdate }) => {
  const apiBase = "http://localhost:2000/";
  const token = useRef(localStorage.getItem("token"));

  async function updateTodo() {
    try {
        await axios.put(
        apiBase + `todos/${todo.id}`,
        { completed: true }, 
        {
          headers: { Authorization: token.current },
        }
      );
     
      if (typeof onUpdate === "function") onUpdate(); //refresh parent state
    } catch (error) {
      console.log("Update error:", error.response?.data || error.message);
    }
  }

  async function deleteTodo() {
    try {
      await axios.delete(apiBase + `todos/${todo.id}`, {
        headers: { Authorization: token.current },
      });
      
      if (typeof onUpdate === "function") onUpdate(); 
    } catch (error) {
      console.log("Delete error:", error.response?.data || error.message);
    }
  }
 
  return (
    <div
      className="todo-list bg-[#F8FAFC] flex flex-col
    justify-between sm:flex-row p-4 rounded-lg border border-light-cyan space-y-4 sm:space-y-0  dark:border-light-dark-blue
    dark:bg-dark-blue
    "
    >
      <p className="todo font-eczar">
        {todo.task} 
      </p>
      <div className="btns flex gap-4 font-grenze font-bold *:cursor-pointer ">
        <button
          className={`bg-blue-600 text-white rounded-md px-4 py-0.5 dark:bg-blue-400 dark:text-black hover:bg-blue-400 dark:hover:bg-blue-500 transition-colors duration-300  disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed `}
          disabled={todo.completed}
          t
          onClick={() => {
            updateTodo();
          }}
        >
          Done
        </button>
        <button
          className={`bg-stone-200 text-blue-600 rounded-md px-4 py-0.5 dark:bg-blue-900 dark:text-blue-300 hover:bg-stone-100 dark:hover:bg-blue-800 transition-colors duration-300 `}
          onClick={() => {
            deleteTodo();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
