const express = require("express");
const router = express.Router();
const revenueController = require("../controllers/revenueController");

router.get("/refresh", revenueController.refreshData);

router.get("/revenue/total", revenueController.getTotalRevenue);

module.exports = router;
