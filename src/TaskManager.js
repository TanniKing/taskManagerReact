import './TaskManager.css';
import React, { useState, useEffect } from "react";
import Modal from './components/Modal';

function TaskManager() {
  // Load tasks from local storage or use default tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [
      { title: "Take Quiz", id: 1, completed: false },
      { title: "Paper Presentation", id: 2, completed: false },
      { title: "Final Exam", id: 3, completed: false },
    ];
  });

  const [title, setTitle] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editModalStatus, setEditModalStatus] = useState({ show: false, id: 0 });
  const [filter, setFilter] = useState("all");

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (title.trim() === '') return;
    const newId = tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
    setTasks([...tasks, { title, id: newId, completed: false }]);
    setTitle('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (id, title) => {
    setEditModalStatus({ show: true, id });
    setEditTitle(title);
  };

  const handleUpdateTask = (id) => {
    setEditModalStatus({ show: false, id: 0 });
    setTasks(tasks.map(task => (task.id === id ? { ...task, title: editTitle } : task)));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="task-manager">
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
        onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
      />
      <button className="add-task-button" onClick={handleAddTask}>Add Task</button>

      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <ul className="task-list">
        {filteredTasks.map(task => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
            onClick={() => toggleTaskCompletion(task.id)}
          >
            {task.title}
            <div className="task-buttons">
              <button onClick={(e) => { e.stopPropagation(); handleEditTask(task.id, task.title); }}>Edit</button>
              <button onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }}>❌</button>
            </div>
          </li>
        ))}
      </ul>

      {editModalStatus.show && (
        <Modal handleClose={() => handleUpdateTask(editModalStatus.id)}>
          <input
            type="text"
            onChange={(e) => setEditTitle(e.target.value)}
            value={editTitle}
            required
            onKeyDown={(e) => e.key === "Enter" && handleUpdateTask(editModalStatus.id)}
          />
        </Modal>
      )}
    </div>
  );
}

export default TaskManager;
