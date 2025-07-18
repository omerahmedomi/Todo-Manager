import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import PlusSign from "./PlusSign";
import Todo from "./Todo";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Todos = () => {
  const tabs = ["All", "Open", "Completed"];
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [todos,setTodos]=useState([])

  const navigate = useNavigate();
    const apiBase='http://localhost:2000/'
 useEffect(() => {
   const token = localStorage.getItem("token");
   if (!token) {
     navigate("/");
     return;
   }

   async function fetchTodos() {
     try {
       setIsLoading(true);
       const response = await axios.get(apiBase + "todos", {
         headers: { Authorization: token },
       });
       const todosData = response.data;
       setTodos(todosData);
       console.log(todosData)
       console.log(todos)
     } catch (error) {
       console.log("Error fetching todos:", error);
     } finally {
       setIsLoading(false);
     }
   }

   fetchTodos();
 }, []);


 
  const customBorder = { borderBottom: "solid 1px blue " };
  function changeTab(nav) {}
  return (
    <div className="p-4 flex flex-col space-y-4 flex-nowrap max-w-[800px] mx-auto dark:text-white">
      <h1 className="text-3xl font-grenze font-bold bg-gradient-to-r from-violet-600 to-violet-300 text-transparent bg-clip-text ">
        You have 2 open tasks.
      </h1>
      <ul
        className="navs flex gap  *:pb-4   border-r-3 border-b-[1px] border-stone-400 
      *:cursor-pointer  *:px-2 dark:border-stone-800 sm:*:px-4 gap-2 sm:gap-4 *:font-grenze *:font-bold *:text-lg flex-wrap transition-all duration-300"
      >
        {tabs.map((tab, index) => (
          <li
            style={activeTab == index ? customBorder : {}}
            onClick={() => {
              setActiveTab(index);
            }}
          >
            {tab}
            <span className="font-eczar text-[#727272] font-[300]"> ( 1 )</span>
          </li>
        ))}
      </ul>
      <div className="todos space-y-4">
        {todos.length > 0 ? (
          todos.map((todo, index) => <Todo key={index} todo={todo.task} />)
        ) : (
          <p className="dark:text-white">No todos</p>
        )}
      </div>

      <div className="add-todo flex gap-4 ">
        <Input placeholder="Add task" />
        <span>
          <Button text={<PlusSign />} />
        </span>
      </div>
    </div>
  );
};

export default Todos;
