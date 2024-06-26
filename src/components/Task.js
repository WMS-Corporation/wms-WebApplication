import React, { useEffect, useState } from 'react';
import { getTasks, saveTask, addTask } from '../controllers/TaskController';
import TaskList from './Forms/TaskList';
import { TaskModel } from '../models/taskModel';
import TaskAddForm from "./Forms/TaskAddForm";
import {useApplicationGlobal} from "../contexts/AppGlobalContext";
import {useAuth} from "../contexts/AuthContext";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth() || {};

  const {
    editingTask,
    setEditingTask,
    addingTask,
    setAddingTask,
    viewProductDetailTask,
    setViewProductDetailTask,
  } = useApplicationGlobal() || {};

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
    if (user._type === "Operational"){
      task._status = "Completed"
      handleSave(task)
    } else {
      setEditingTask(task);
    }

  };
  
  const handleView = (task) => {
    setViewProductDetailTask(task)
  }

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
      setViewProductDetailTask(null)
      setError(null)
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    setEditingTask(null);
    setAddingTask(false);
    setViewProductDetailTask(null)
    setError(null)
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (addingTask) {
    return <TaskAddForm task={new TaskModel()} onSave={handleSave} onCancel={handleCancel} error={error}/>;
  } else if (editingTask) {
    return <TaskAddForm task={editingTask} onSave={handleSave} onCancel={handleCancel} error={error}/>;
  } else {
    return <TaskList tasks={tasks} onAdd={handleAdd} onEdit={handleEdit} onSave={handleSave} onView={handleView} viewProductDetailTask={viewProductDetailTask} onError={setError}/>;
  }
};

export default Task;