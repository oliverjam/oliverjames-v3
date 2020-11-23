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
  const siteHeader = document.querySelector("#site-header");
  siteHeader.style.position = "absolute";
  const nav = document.querySelector("nav");
  nav.style.display = "none";
  const siteFooter = document.querySelector("#site-footer");
  siteFooter.style.display = "none";
  const main = document.querySelector("#main");
  main.style.marginTop = "1.5rem";
  const blogHeader = document.querySelector("#blog-header > div");
  blogHeader.style.gridRowGap = "0.75rem";

  main.childNodes.forEach((child) => {
    try {
      if (child && child.id !== "blog-header" && child.nodeName !== "#text") {
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
