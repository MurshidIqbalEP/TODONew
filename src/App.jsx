import { useState,useEffect  } from 'react'
import './App.css'

function App() {
  const [newTask, setNewTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editTodo,setEditTodo] = useState(null)
  const [newEditedTask, setEditedTask] = useState("")

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleChange(event){
     setNewTask(event.target.value)
  }

  function handleKeyPress(event){
    if (event.key === 'Enter') {
      event.preventDefault();
      addTask();

    }
  }

  function addTask(){
    if(newTask.trim() !== ""){
      if (!tasks.some((item) => item.text === newTask)) {
        console.log(newTask);
        setTasks(prevTasks => [
          ...prevTasks,
          { text: newTask, completed: false, isEditing: false },
      ]);
        setNewTask("");
        
      } else {
        alert("⚠️ Task already exists!");
      }
    }else{
      alert("⚠️ Enter Somthing!");
    }
    console.log(tasks);
  }

  function toggleTaskCompletion(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  function handleEdit(index) {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, isEditing: true };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      let updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    } else {
      alert("Already at the Top 👑");
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      let updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    } else {
      alert("Already at the Bottom ⬇️");
    }
  }

  function handleEdit(index){
    setEditTodo(tasks[index])
  }

  function handleEditChange(event){
    setEditedTask(event.target.value)
  }

  function updateTask() {
    if (newEditedTask.trim() === "") {
      alert("⚠️ Enter Something!");
    } else {
      const updatedTasks = tasks.map(item => {
        if (item.text === editTodo.text) { 
          return { ...item, text: newEditedTask };
        }
        return item;
      });
  
      setTasks(updatedTasks);
      setEditTodo(null);
      setEditedTask(""); 
    }
  }
  
  

  return (
    <>
    <div className='mainDiv'>
       <div className='card'>
            <h1> Todo List </h1>   
       </div>
       <div className='form'>
            <form >
              {!editTodo ?  <input type="text"  className='inpt' placeholder='Enter your task...' value={newTask} onChange={handleChange}  onKeyPress={handleKeyPress}/> :
                <input type="text"  className='inpt' placeholder={editTodo.text} value={newEditedTask} onChange={handleEditChange} />
           }
            </form>
           {!editTodo ?  <button className='addbtn' onClick={addTask}>Add</button>: <button className='addbtn' onClick={updateTask}>Update</button>}

        </div>
        
        <ol>
  {tasks.map((task, index) => (
    <li key={index}  style={{
      textDecoration: task.completed ? "line-through" : "none",
      textAlign: "center",
    }}>
       <input
           type="checkbox"
          checked={task.completed}
           onChange={() => toggleTaskCompletion(index)}
          />
      <span className='text'>{task.text}</span>
      <div>
      <button className='editbtn' onClick={() => handleEdit(index)}>✏️</button>
      <button className='dltbtn' onClick={() => deleteTask(index)}>🗑️</button>
      <button className='movebtn' onClick={() => moveTaskUp(index)}>⬆️</button>
      <button className='movebtn' onClick={() => moveTaskDown(index)}>⬇️</button>
      </div>
    </li>
  ))}
</ol>


    </div>
      
    </>
  )
}

export default App
