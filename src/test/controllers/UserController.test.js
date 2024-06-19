import { getUser, saveUser, removeUser, getAllUsers } from '../../controllers/UserController';
import { fetchUser, updateUser, deleteUser, fetchAllUsers } from '../../services/userService';

jest.mock('../../services/userService');

describe('UserController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch a user', async () => {
    const mockUser = { _codUser: '123', _username: 'test', _password: 'test', _name: 'test', _surname: 'test', _type: 'test' };
    fetchUser.mockResolvedValue(mockUser);
    const result = await getUser('123');
    expect(result).toEqual(mockUser);
    expect(fetchUser).toHaveBeenCalledWith('123');
  });

  it('should update a user', async () => {
    const mockUser = { _codUser: '123', _username: 'test', _password: 'test', _name: 'test', _surname: 'test', _type: 'test' };
    const expectedUser = { _username: 'test', _password: 'test', _name: 'test', _surname: 'test', _type: 'test' };
    updateUser.mockResolvedValue(mockUser);
    const result = await saveUser('123', mockUser);
    expect(result).toEqual(mockUser);
    expect(updateUser).toHaveBeenCalledWith('123', expectedUser);
  });

  it('should delete a user', async () => {
    const mockUser = { _codUser: '123', _username: 'test', _password: 'test', _name: 'test', _surname: 'test', _type: 'test' };
    deleteUser.mockResolvedValue(mockUser);
    const result = await removeUser(mockUser);
    expect(result).toEqual(mockUser);
    expect(deleteUser).toHaveBeenCalledWith('123');
  });

  it('should fetch all users', async () => {
    const mockUsers = [
      { _codUser: '123', _username: 'test', _password: 'test', _name: 'test', _surname: 'test', _type: 'test' },
      { _codUser: '456', _username: 'test2', _password: 'test2', _name: 'test2', _surname: 'test2', _type: 'test2' }
    ];
    fetchAllUsers.mockResolvedValue(mockUsers);
    const result = await getAllUsers();
    expect(result).toEqual(mockUsers);
    expect(fetchAllUsers).toHaveBeenCalled();
  });
});