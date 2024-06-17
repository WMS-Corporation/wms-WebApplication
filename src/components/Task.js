import React, { useEffect, useState } from 'react';
import { getTasks, saveTask, deleteTask, addTask } from '../controllers/TaskController';
import TaskList from './Forms/TaskList';
import TaskEditForm from './Forms/TaskEditForm';
import { TaskModel } from '../models/taskModel';
import TaskAddForm from "./Forms/TaskAddForm";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [addingTask, setAddingTask] = useState(false);

  const loadTasks = async () => {
    try {
      const result = await getTasks();
      setTasks(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleAdd = () => {
    setAddingTask(true);
  };

  const handleSave = async (task) => {
    try {
      if (addingTask) {
        await addTask(task);
        setAddingTask(false);
      } else {
        await saveTask(task._codTask, task);
      }
      loadTasks();
      setEditingTask(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setEditingTask(null);
    setAddingTask(false);
    setError(null)
  };

  const handleDelete = async (task) => {    
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task);
        loadTasks();
      } catch (error) {
        setError(error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (addingTask) {
    return <TaskAddForm task={new TaskModel()} onSave={handleSave} onCancel={handleCancel} error={error}/>;
  } else if (editingTask) {
    return <TaskEditForm task={editingTask} onSave={handleSave} onCancel={handleCancel} />;
  } else {
    return <TaskList tasks={tasks} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} onSave={handleSave} />;
  }
};

export default Task;