import React from 'react'

const Todo = () => {
  return (
    <div className="todo-list bg-red-300 flex flex-col
    justify-between sm:flex-row p-4 items-center">
        <p className="todo ">Lorem s </p>
        <div className="btns flex gap-3">
            <button>Done</button>
            <button>Delete</button>
        </div>
    </div>
  )
}

export default Todo