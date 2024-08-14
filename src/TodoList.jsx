import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./TodoList.css";

export default function TodoList() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('lists');
        return savedTodos ? JSON.parse(savedTodos) : [{ task: "sample-task", id: uuidv4(), isDone: false }];
    });

    const [newTodo, setNewTodos] = useState("");
    const [value, setValue] = useState("");
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [editId, setEditId] = useState(null);  // New state for tracking the todo being edited

    const addNewTask = () => {
        const takenTodo = newTodo.trim();
        if (takenTodo.length !== 0) {
            if (editId) {
                // Update the task if we're in editing mode
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo.id === editId ? { ...todo, task: takenTodo } : todo
                    )
                );
                setEditId(null);
                setToggleSubmit(true);
            } else {
                // Add a new task if we're not editing
                setTodos((prevTodos) => [
                    ...prevTodos,
                    { task: takenTodo, id: uuidv4(), isDone: false }
                ]);
            }
            setValue("");
            setNewTodos("");
        }
    };

    const updateTodoValue = (event) => {
        const newValue = event.target.value;
        setNewTodos(newValue);
        setValue(newValue);
    };

    const DeleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
    };

    const MarkAllDone = () => {
        setTodos((prevTodos) => prevTodos.map(todo => ({
            ...todo,
            isDone: true
        })));
    };

    const MarkAsDone = (id) => {
        setTodos((prevTodos) => prevTodos.map(todo => (
            todo.id === id ? { ...todo, isDone: true } : todo
        )));
    };

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(todos));
    }, [todos]);

    const EditTodo = (id) => {
        const newEditItem = todos.find(todo => todo.id === id);
        setNewTodos(newEditItem.task);  // Fill input with the current task value
        setValue(newEditItem.task);
        setEditId(id);  // Set the id of the todo being edited
        setToggleSubmit(false);  // Toggle button to show update instead of add
    };

    return (
        <div className='top'>
            <h3>TODO GAME</h3>
            <div>
                <input
                    autoFocus
                    placeholder="Add a task"
                    value={value}
                    onChange={updateTodoValue}
                    className="op"
                    
            
                />
                
                <button className="btn" onClick={addNewTask}>
                    {toggleSubmit ? "+" : "Update"}  {/* Toggle button text */}
                </button>
            </div>
            <br />
            
            &nbsp;
            <div className="Inlist1">
                <div className="maintodo">
                    <h4>Todo List</h4>
                </div>
                <div className="InList2">
                    <ul className="change">
                        {todos.map((todo) => (
                            <div className="Withinlist" key={todo.id}>
                                <li style={{ margin: "10px" }}>
                                    <span style={todo.isDone ? { textDecoration: "line-through" } : {}}>{todo.task}</span>
                                    &nbsp; &nbsp;
                                    <span className="del-icons">
                                        <i onClick={() => DeleteTodo(todo.id)} className="fa-solid fa-trash DelChang"></i>
                                    </span>
                                    <span style={{ marginLeft: '8px' }}>
                                        <i onClick={() => EditTodo(todo.id)} className="fa-regular fa-pen-to-square Edit"></i>
                                    </span>
                                    <span style={{ marginLeft: '8px' }}>
                                        <i onClick={() => MarkAsDone(todo.id)} className="fa-solid fa-check-double test"></i>
                                    </span>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
                <br />
                <button onClick={MarkAllDone}>Mark All As Done</button>
            </div>
        </div>
    );
}
