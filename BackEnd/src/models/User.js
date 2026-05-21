// User.js model placeholder
// Representing User in the system. Since MongoDB is not connected yet, we use a simple JS class representation.

class User {
  constructor(email, password, name, teamName = '') {
    this.email = email;
    this.password = password; // In a production application, this should be hashed (e.g. using bcrypt)
    this.name = name;
    this.teamName = teamName;
    this.createdAt = new Date();
  }
}

module.exports = User;
