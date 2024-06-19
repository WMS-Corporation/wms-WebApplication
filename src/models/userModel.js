class UserModel {
    constructor(codUser, username, password, name, surname, type) {
      this._codUser = codUser;
      this._username = username;
      this._password = password;
      this._name = name;
      this._surname = surname;
      this._type = type;
    }
  }
  
  export default UserModel;