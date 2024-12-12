const db = require('../config/database');

class StatusModel {
  static async getAllStatus() {
    const [rows] = await db.execute('SELECT * FROM status');
    return rows;
  }
}

module.exports = StatusModel;