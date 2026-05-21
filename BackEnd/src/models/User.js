// User.js model placeholder

// In a real MongoDB application:
// const mongoose = require('mongoose');
// const userSchema = new mongoose.Schema({ ... });
// module.exports = mongoose.model('User', userSchema);

class User {
  constructor(email, passwordHash) {
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = new Date();
  }
}

module.exports = User;
