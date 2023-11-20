"use client";

import { useState, FormEvent, useEffect } from "react";
import { Todo } from "./types";

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todo");
      const data = await response.json();

      data.map((item: any) => {
        item.data.id = item.id;
      });

      setTodos(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("im here");
    if (!inputValue.trim()) return;
    if (todos.some((todo) => todo.todo === inputValue.trim())) {
      alert("This todo already exists!");
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      todo: inputValue,
      isCompleted: false,
      createdAt: new Date().toISOString(), // Assuming you have a createdAt field
    };
    const response = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    if (response.ok) {
      console.log("It is working");
      setTodos([...todos, newTodo]);
      fetchTodos();
      setInputValue("");
    }
  };
  const updateTodo = async (id: string, updatedTodo: Todo) => {
    const response = await fetch(`/api/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });

    if (response.ok) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedTodo } : todo
        )
      );
      fetchTodos();
    }
  };

  const handleRemoveTodo = async (id: string) => {
    const response = await fetch(`/api/todo/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const handleEditTodo = (id: string) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setInputValue(todoToEdit.data.todo);
      handleRemoveTodo(id); // Remove the old todo
    }
  };

  const toggleComplete = async (id: string) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      const updatedTodo = {
        ...todoToUpdate,
        isCompleted: !todoToUpdate.data.isCompleted,
      };
      await updateTodo(id, updatedTodo);
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex flex-rows p-3 bg-blue-500 justify-between w-[350px]">
        <form onSubmit={handleAddTodo} className="flex flex-rows">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new todo"
            className="flex text-black text-sm pl-2"
          />
          <button
            className="border-2 rounded-[5px] px-1 text-sm ml-2 border-white bg-white text-blue-500"
            type="submit"
          >
            New Task
          </button>
        </form>
      </div>
      {}
      <div className="flex flex-col w-[350px] py-3 bg-white text-black mt-5">
        <ul>
          {todos.map((item) => (
            <div
              key={item.id}
              className="flex flex-row justify-between px-2 py-2"
            >
              <li
                style={{
                  textDecoration: item.data?.isCompleted
                    ? "line-through"
                    : "none",
                }}
                className="flex flex-rows justify-between"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 ml-2 mt-1 mr-3"
                  onChange={handleCheckboxChange}
                  onClick={() => toggleComplete(item.id)}
                />
                {item.data?.todo}
              </li>
              <div className="flex justify-evenly">
                <button
                  className="border-2 rounded-[5px] px-1 text-sm border-blue-500 bg-blue-500 text-white"
                  onClick={() => handleEditTodo(item.id)}
                >
                  Edit
                </button>
                <button
                  className="border-2 rounded-[5px] px-1 text-sm ml-2 border-blue-500 bg-blue-500 text-white"
                  onClick={() => handleRemoveTodo(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
