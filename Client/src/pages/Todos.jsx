import React, { useState, useEffect, useRef } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import PlusSign from "../components/PlusSign";
import Todo from "../components/Todo";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Todos = () => {
  const tabs = ["All", "Open", "Completed"];
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [openTodos, setOpenTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [addedTask, setAddedTask] = useState("");
  const [error, setError] = useState("");
  const token = useRef(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [checkedAuth, setCheckedAuth] = useState(false);
  
  const apiBase = "http://localhost:2000/";

  useEffect(() => {
    if (!token.current) {
      navigate(-1);
      return;
    }
    setCheckedAuth(true);
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(apiBase + "todos", {
        headers: { Authorization: token.current },
      });
      setTodos(response.data);
    } catch (error) {
      console.log("Error fetching todos:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  async function addTodo() {
    if (!addedTask) {
      alert("Add task input is empty!");
      return;
    }
    try {
      await axios.post(
        apiBase + "todos",
        { task: addedTask },
        {
          headers: { Authorization: token.current },
        }
      );

      setAddedTask("");
      await fetchTodos();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetchTodos();
  }, []);

  useEffect(() => {
    setOpenTodos(todos.filter((todo) => !todo.completed));
    setCompletedTodos(todos.filter((todo) => todo.completed));
  }, [todos]);

  const customBorder = { borderBottom: "solid 1px blue " };

  if (error) {
    return (
      <div className="text-red-400 text-lg sm:text-2xl text-center pt-10 font-grenze">
        {error}
      </div>
    );
  }

  if (!checkedAuth) return null;

  return (
    <div className="p-4 flex flex-col space-y-4 flex-nowrap max-w-[800px] mx-auto dark:text-white">
      <h1 className="text-3xl font-grenze font-bold bg-gradient-to-r from-violet-600 to-violet-300 text-transparent bg-clip-text ">
        You have {todos.length} open tasks.
      </h1>
      <ul
        className="navs flex gap  *:pb-4   border-r-3 border-b-[1px] border-stone-400 
      *:cursor-pointer  *:px-2 dark:border-stone-800 sm:*:px-4 gap-2 sm:gap-4 *:font-grenze *:font-bold *:text-lg flex-wrap transition-all duration-300"
      >
        {tabs.map((tab, index) => (
          <li
          key={index}
            style={activeTab == index ? customBorder : {}}
            onClick={() => {
              setActiveTab(index);
            }}
          >
            {tab}
            <span className="font-eczar text-[#727272] font-[300]">
              {" "}
              ({" "}
              {index == 0
                ? todos.length
                : index == 1
                ? openTodos.length
                : completedTodos.length}{" "}
              )
            </span>
          </li>
        ))}
      </ul>
      <div className="todos space-y-4">
        {isLoading ? (
          <p className="dark:text-white font-eczar ">Fetching your tasks!</p>
        ) : todos.length > 0 ? (
          activeTab == 0 ? (
            todos.map((todo, index) => (
              <Todo key={index} todo={todo} onUpdate={fetchTodos} />
            ))
          ) : activeTab == 1 ? (
            openTodos.map((todo, index) => (
              <Todo key={index} todo={todo} onUpdate={fetchTodos} />
            ))
          ) : activeTab == 2 ? (
            completedTodos.map((todo, index) => (
              <Todo key={index} todo={todo} onUpdate={fetchTodos} />
            ))
          ) : (
            <p className="dark:text-white">No todos under {tabs[activeTab]}</p>
          )
        ) : (
          <p className="dark:text-white text-lg font-grenze">No tasks!</p>
        )}
      </div>

      <div className="add-todo flex gap-4 ">
        <Input
          placeholder="Add task"
          name="task"
          type="text"
          btnFunction={addTodo}
          value={addedTask}
          onChange={(e) => {
            setAddedTask(e.target.value);
          }}
        />
        <span>
          <Button text={<PlusSign />} btnFunction={addTodo} />
        </span>
      </div>
    </div>
  );
};

export default Todos;
