const db = require('../config/database');

class ProvinceModel {
  static async getAllProvince() {
    const [rows] = await db.execute('SELECT * FROM provinces');
    return rows;
  }
}

module.exports = ProvinceModel;