import { fetchUser, updateUser, deleteUser, fetchAllUsers } from '../../services/userService';
import UserModel from '../../models/userModel';
import { API_URL } from '../../config';
import fetchMock from 'jest-fetch-mock';

// Enable fetch mocks
fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();

    jest.spyOn(global.localStorage.__proto__, 'getItem');
    global.localStorage.__proto__.getItem = jest.fn(() => 'token');
});

test('fetchUser › should fetch user and return a UserModel', async () => {
    const mockData = { _codUser: '1', _username: 'User1', _password: 'Password1', _name: 'Name1', _surname: 'Surname1', _type: 'Type1' };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data = await fetchUser(mockData._codUser);

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/${mockData._codUser}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json'
        },
    });

    expect(data).toEqual(new UserModel(mockData._codUser, mockData._username, mockData._password, mockData._name, mockData._surname, mockData._type));
});

test('updateUser › should update a user and return the updated UserModel', async () => {
    const mockData = { _codUser: '1', _username: 'UpdatedUser', _password: 'UpdatedPassword', _name: 'UpdatedName', _surname: 'UpdatedSurname', _type: 'UpdatedType' };
    fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 });

    const data = await updateUser(mockData._codUser, {
        _username: mockData._username,
        _password: mockData._password,
        _name: mockData._name,
        _surname: mockData._surname,
        _type: mockData._type,
    });

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/${mockData._codUser}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _username: mockData._username,
            _password: mockData._password,
            _name: mockData._name,
            _surname: mockData._surname,
            _type: mockData._type,
        }),
    });

    expect(data).toEqual(new UserModel(mockData._codUser, mockData._username, mockData._password, mockData._name, mockData._surname, mockData._type));
});

test('deleteUser › should delete a user and return a success message', async () => {
    const mockData = { message: 'User deleted successfully' };
    fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 });

    const data = await deleteUser('1');

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/1`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json',
        },
    });

    expect(data).toEqual(mockData);
});

test('fetchAllUsers › should fetch all users and return an array of UserModel', async () => {
    const mockData = [
        { _codUser: '1', _username: 'User1', _password: 'Password1', _name: 'Name1', _surname: 'Surname1', _type: 'Type1' },
        { _codUser: '2', _username: 'User2', _password: 'Password2', _name: 'Name2', _surname: 'Surname2', _type: 'Type2' },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data = await fetchAllUsers();

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/all`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json',
        },
    });

    expect(data).toEqual(mockData.map(user => new UserModel(user._codUser, user._username, user._password, user._name, user._surname, user._type)));
});