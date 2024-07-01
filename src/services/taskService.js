import { TaskModel } from '../models/taskModel';
import { getAuthHeaders } from './authService';
import { API_URL } from '../config';

export const fetchTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks/all`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.map(item => new TaskModel(item._codOperator, item._date, item._type, item._status, item._productList, item._codTask));
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const updateTask = async (codTask, newData) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${codTask}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(newData),
    });
    if (!response.ok){
      const errorResponse = await response.json();
      throw new Error(errorResponse.message)
    }
    const data = await response.json();
    return new TaskModel(data._codOperator, data._date, data._type, data._status, data._productList, data._codTask);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    console.log(task)
    const response = await fetch(`${API_URL}/tasks/assignment`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(task),
    });
    if (!response.ok){
      const errorResponse = await response.json();
      console.log(errorResponse)
      throw new Error(errorResponse.message)
    }
    const data = await response.json();
    return new TaskModel(data._codOperator, data._date, data._type, data._status, data._productList, data._codTask);
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const removeTask = async (codTask) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${codTask}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok){
      const errorResponse = await response.json();
      throw new Error(errorResponse.message)
    }
    return codTask;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};