import { fetchTasks, updateTask, removeTask, addTask as addTaskToService } from '../services/taskService';

export const getTasks = async () => {
  return await fetchTasks();
};

export const saveTask = async (codTask, newData) => {
  const dataToSend = { ...newData };
  delete dataToSend._codTask;
  return await updateTask(codTask, dataToSend);
};

export const addTask = async (task) => {
  const dataToSend = { ...task };
  delete dataToSend._codTask;
  return await addTaskToService(dataToSend);
};

export const deleteTask = async (task) => {
  return await removeTask(task._codTask);
};