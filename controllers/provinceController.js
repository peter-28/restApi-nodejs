const ProvinceModel = require('../models/provinceModel');

class ProvinceController {
  static async index(req, res) {
    try {
      const data = await ProvinceModel.getAllProvince();
      res.json({
        message: "successfully get province",
        data: data
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "server error",
        serverMessage: error.message
      });
    }
  }
}

module.exports = ProvinceController;