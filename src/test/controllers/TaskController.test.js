import { getTasks, saveTask, deleteTask, addTask } from '../../controllers/TaskController';
import { fetchTasks, updateTask, removeTask, addTask as addTaskToService } from '../../services/taskService';

jest.mock('../../services/taskService');

describe('TaskController', () => {
  it('should call the fetchTasks service', async () => {
    const tasks = [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }];

    fetchTasks.mockImplementation(async () => {
      return tasks;
    });

    const result = await getTasks();

    expect(fetchTasks).toHaveBeenCalled();
    expect(result).toEqual(tasks);
  });

  it('should call the updateTask service with correct parameters', async () => {
    const id = 1;
    const newData = { _codTask: '123', name: 'Updated Task' };
    const expectedData = { name: 'Updated Task' };

    updateTask.mockImplementation(async (id, data) => {
      return { id, ...data };
    });

    const result = await saveTask(id, newData);

    expect(updateTask).toHaveBeenCalledWith(id, expectedData);
    expect(result).toEqual({ id, ...expectedData });
  });

  it('should call the addTask service with correct parameters', async () => {
    const task = { _codTask: '123', name: 'New Task', codOperator: 'Operator', date: '2022-12-31', type: 'Type', status: 'Status', productList: [] };
    const expectedData = { name: 'New Task', codOperator: 'Operator', date: '2022-12-31', type: 'Type', status: 'Status', productList: [] };

    addTaskToService.mockImplementation(async (data) => {
      return { id: 3, ...data };
    });

    const result = await addTask(task);

    expect(addTaskToService).toHaveBeenCalledWith(expectedData);
    expect(result).toEqual({ id: 3, ...expectedData });
  });

  it('should call the removeTask service with correct parameters', async () => {
    const task = { _codTask: '123', name: 'Task to delete' };

    removeTask.mockImplementation(async (codTask) => {
      return { codTask };
    });

    const result = await deleteTask(task);

    expect(removeTask).toHaveBeenCalledWith(task._codTask);
    expect(result).toEqual({ codTask: task._codTask });
  });
});