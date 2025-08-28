const express = require("express");
const router = express.Router();
const { captureScreenshot } = require("../controller/captureScreenshot");

// POST /api/screenshot
router.post("/screenshot", captureScreenshot);

module.exports = router;
