import React, { useEffect, useState } from "react";

const TodoList = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
    const [todos, setTodos] = useState([]);

useEffect(() => {
    const getTodos = async() => {
        try {
            const response = await fetch("http://localhost:8000/");
            const data = await response.json();
            // console.log(data.data);
            setTodos(data.data);
            
        } catch (error) {
            console.log(error);
        }
       
    };
    getTodos();
}, []);

  const handleAddTodo = async() => {
    const response = await fetch("http://localhost:8000/insert", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
        })
    });
    const data = await response.json();
    // console.log(data);
    setTodos([...todos, {id:parseInt(todos[todos.length-1].id)+1,name: name, email: email}]);
    setName("");
    setEmail("");
  };

    const handleCheck = (index) => {
        setName(todos[index].name);
        setEmail(todos[index].email);
        handleDeleteTodo(todos[index].id);

    }
// console.log(todos);
  const handleDeleteTodo = async(index) => {
    const response = await fetch(`http://localhost:8000/delete/${index}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    });
    const data = await response.json();
    console.log(data);
    setTodos(todos.filter((todo) => todo.id !== index));
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">Students Information</h1>
      <div className="flex mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Add name"
          value={name}
          required
          onChange={(e)=>setName(e.target.value)}
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="Add email"
          value={email}
          required
          onChange={(e)=>setEmail(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-white border-l-4 border-blue-500 py-2 px-3 mb-2"
          >
            <input
              type="checkbox"
              className="form-checkbox h-6 w-6 rounded"
             onClick={(e)=>{if(e.target.checked){handleCheck(index)}}} />
            <span
              className={`text-lg flex-1 ml-3 ${
                false ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.name} - {todo.email}
            </span>
            <button
              className="flex items-center justify-center h-8 w-8 rounded-full border border-gray-300 hover:bg-red-500 hover:text-white"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              <i className="fas fa-times"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;