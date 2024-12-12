const StatusModel = require('../models/statusModel');

class StatusController {
  static async index(req, res) {
    try {
      const data = await StatusModel.getAllStatus();
      res.json({
        message: "successfully get status",
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

module.exports = StatusController;