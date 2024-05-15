import React, { useState, useEffect } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState([]); // State to store todos
  const [inputText, setInputText] = useState(''); // State to handle input text

  // Load todos from local storage on initial render
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Update local storage whenever todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Function to add a new todo
  const addTodo = () => {
    if (inputText.trim() !== '') {
      const rainbowColors = [
        'bg-red-200',
        'bg-orange-200',
        'bg-yellow-200',
        'bg-green-200',
        'bg-blue-200',
        'bg-indigo-200',
        'bg-purple-200',
        'bg-pink-200',
      ];
      const newColor = rainbowColors[todos.length % rainbowColors.length];
      setTodos([...todos, { id: Date.now(), text: inputText, completed: false, color: newColor }]);
      setInputText('');
    }
  };

  // Function to toggle the completion status of a todo
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Function to update the text of a todo
  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: newText };
        }
        return todo;
      })
    );
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-6 py-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="w-full rounded-l border border-gray-400 py-2 px-3 focus:outline-none"
          placeholder="Add a new todo..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 rounded-r focus:outline-none"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between mb-2 rounded-lg border-l-4 ${todo.color} p-4`}
          >
            <span
              className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text} {todo.completed ? '✅' : '📝'}
            </span>
            <div>
              <button
                className={`text-sm ${
                  todo.completed ? 'text-gray-500' : 'text-green-500 hover:text-green-600'
                } focus:outline-none mr-2`}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.completed ? 'Undo' : 'Done'}
              </button>
              <button
                className="text-blue-500 hover:text-blue-600 text-sm focus:outline-none mr-2"
                onClick={() => {
                  const newText = prompt('Enter new text:', todo.text);
                  if (newText !== null) {
                    updateTodo(todo.id, newText);
                  }
                }}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:text-red-600 text-sm focus:outline-none"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
