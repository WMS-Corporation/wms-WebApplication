import UserModel from '../../models/userModel';

describe('UserModel', () => {
  it('should correctly construct a user object when valid arguments are passed', () => {
    const user = new UserModel('1', 'username', 'password', 'name', 'surname', 'type');
    expect(user._codUser).toEqual('1');
    expect(user._username).toEqual('username');
    expect(user._password).toEqual('password');
    expect(user._name).toEqual('name');
    expect(user._surname).toEqual('surname');
    expect(user._type).toEqual('type');
  });
});