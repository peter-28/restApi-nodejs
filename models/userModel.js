const db = require('../config/database');
const bcrypt = require('bcryptjs');

class UserModel {
  static async findByUsername(username) {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }

  static async createUser(username, password, email) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)', 
      [username, hashedPassword, email]
    );
    return result.insertId;
  }

  static async validateUser(username, password) {
    const user = await this.findByUsername(username);
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      return isValid ? user : null;
    }
    return null;
  }
}

module.exports = UserModel;