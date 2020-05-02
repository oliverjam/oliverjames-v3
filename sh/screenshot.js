const puppeteer = require("puppeteer");

async function run(url) {
  try {
    const { pathname } = new URL(url);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({
      width: 600,
      height: 315,
      deviceScaleFactor: 4,
    });
    await page.evaluate(amendPageStyles);
    await page.screenshot({
      path: `src/assets/media/og-image/${pathname.split("/")[2]}.png`,
      type: "png",
    });
    await browser.close();
  } catch (error) {
    console.log(url);
    console.error(error);
    process.exit(2);
  }
}

function amendPageStyles() {
  document.querySelector(".site-header").style.position = "absolute";
  document.querySelector("nav").style.display = "none";
  document.querySelector(".site-footer").style.display = "none";
  const main = document.querySelector("#main");
  main.style.marginTop = "1.5rem";
  document.querySelector(".header-container").style.gridRowGap = "0.75rem";
  main.childNodes.forEach((child) => {
    try {
      if (child.className !== "header" && child.nodeName !== "#text") {
        child.style.display = "none";
      }
    } catch (e) {
      console.log(e);
    }
  });
}

const url = process.argv[2];
if (url) {
  run(url);
}

module.exports = run;
