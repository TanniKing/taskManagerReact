
import React from 'react'

export default function TaskList({tasks, handleDeleteTask}) {
    const formatTasks = (task, index) =>{
        return (
          <React.Fragment key={task.id}>
            <h2>{index} - {task.title}</h2>
            <button onClick={()=>handleEditTask(task.id)}>edit</button>
            <button onClick={()=>handleDeleteTask(task.id)}>delete</button>        
          </React.Fragment>
        )
      }  

  return (
  <>
      {tasks.map(formatTasks)}
  </>
  )
}

