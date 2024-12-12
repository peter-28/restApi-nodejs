const express = require("express");
const router = express.Router();
const ProvinceController = require("../controllers/provinceController");

router.get("/", ProvinceController.index);

module.exports = router;
