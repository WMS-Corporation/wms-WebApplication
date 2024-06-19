import { fetchTasks, updateTask, addTask, removeTask } from '../../services/taskService';
import { TaskModel } from '../../models/taskModel';
import { API_URL } from '../../config';
import fetchMock from 'jest-fetch-mock';

// Enable fetch mocks
fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();

    jest.spyOn(global.localStorage.__proto__, 'getItem');
    global.localStorage.__proto__.getItem = jest.fn(() => 'token');
});

test('fetchTasks › should fetch tasks and return an array of TaskModel', async () => {
    const mockData = [
        { _codOperator: '1', _date: '2022-12-31', _type: 'Type1', _status: 'Status1', _productList: [], _codTask: 'Task1' },
        { _codOperator: '2', _date: '2023-01-01', _type: 'Type2', _status: 'Status2', _productList: [], _codTask: 'Task2' },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data = await fetchTasks();

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/tasks/all`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json'
        },
    });

    expect(data).toEqual(mockData.map(item => new TaskModel(item._codOperator, item._date, item._type, item._status, item._productList, item._codTask)));
});

test('updateTask › should update a task and return the updated TaskModel', async () => {
    const mockData = {
        _codOperator: '1',
        _date: '2023-01-01',
        _type: 'UpdatedType',
        _status: 'UpdatedStatus',
        _productList: [],
        _codTask: 'UpdatedTask',
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 });

    const data = await updateTask(mockData._codTask, {
        _codOperator: mockData._codOperator,
        _date: mockData._date,
        _type: mockData._type,
        _status: mockData._status,
        _productList: mockData._productList,
    });

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/tasks/${mockData._codTask}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _codOperator: mockData._codOperator,
            _date: mockData._date,
            _type: mockData._type,
            _status: mockData._status,
            _productList: mockData._productList,
        }),
    });

    expect(data).toEqual(new TaskModel(mockData._codOperator, mockData._date, mockData._type, mockData._status, mockData._productList, mockData._codTask));
});

test('addTask › should add a task and return the added task', async () => {
    const mockData = { _codOperator: '3', _date: '2023-01-01', _type: 'New Type', _status: 'New Status', _productList: [], _codTask: 'NewTask' };
    fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 });

    const data = await addTask(mockData);

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/tasks/assignment`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockData)
    });
    expect(data).toEqual(new TaskModel(mockData._codOperator, mockData._date, mockData._type, mockData._status, mockData._productList, mockData._codTask));
});

test('removeTask › should remove a task and return the id of the removed task', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    const data = await removeTask('1');

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/tasks/1`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json'
        },
    });
    expect(data).toEqual('1');
});