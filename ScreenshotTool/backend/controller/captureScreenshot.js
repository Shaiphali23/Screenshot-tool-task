const { takeScreenshot } = require("../utils/puppeteerHelper");

const captureScreenshot = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const imageBase64 = await takeScreenshot(url);
    res.json({ image: imageBase64 });
  } catch (error) {
    console.error("Error in captureScreenshot:", error.message);
    res.status(500).json({ error: "Failed to capture screenshot" });
  }
};

module.exports = { captureScreenshot };
