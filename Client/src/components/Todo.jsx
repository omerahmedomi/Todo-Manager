import React from "react";

const Todo = ({todo}) => {
  console.log("Single todo",todo.completed)
  return (
    <div
      className="todo-list bg-[#F8FAFC] flex flex-col
    justify-between sm:flex-row p-4 rounded-lg border border-light-cyan space-y-4 sm:space-y-0  dark:border-light-dark-blue
    dark:bg-dark-blue
    "
    >
      <p className="todo font-eczar">{todo.task} {todo.completed}</p>
      <div className="btns flex gap-4 font-grenze font-bold *:cursor-pointer ">
        <button className={`bg-blue-600 text-white rounded-md px-4 py-0.5 dark:bg-blue-400 dark:text-black hover:bg-blue-400 dark:hover:bg-blue-500 transition-colors duration-300  disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed `}
        disabled={todo.completed}
        >
          Done
        </button>
        <button
          className={`bg-stone-200 text-blue-600 rounded-md px-4 py-0.5 dark:bg-blue-900 dark:text-blue-300 hover:bg-stone-100 dark:hover:bg-blue-800 transition-colors duration-300 `}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
