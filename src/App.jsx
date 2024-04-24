import { useState } from 'react'
import './App.css'

function App() {
  const [newTask, setNewTask] = useState("")
  const [tasks, setTasks] = useState([])

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

  return (
    <>
    <div className='mainDiv'>
       <div className='card'>
            <h1> Todo List </h1>   
       </div>
       <div className='form'>
            <form >
              <input type="text"  className='inpt' placeholder='Enter your task...' value={newTask} onChange={handleChange}  onKeyPress={handleKeyPress}/>
            </form>
            <button className='addbtn' onClick={addTask}>Add</button>

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
