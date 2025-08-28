const puppeteer = require("puppeteer");

const takeScreenshot = async (url) => {
  let target = url.trim();
  if (!/^https?:\/\//i.test(target)) {
    target = "http://" + target;
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto(target, { waitUntil: "networkidle2", timeout: 30000 });

  const buffer = await page.screenshot({ fullPage: true, type: "png" });

  await browser.close();

  return buffer.toString("base64");
};

module.exports = { takeScreenshot };
