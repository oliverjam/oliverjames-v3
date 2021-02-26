#!/usr/bin/env node

const parser = require("ua-parser-js");

// data is piped in from shell
// since curl is easier than https.get
let data = "";
process.stdin.resume();
process.stdin.on("data", (d) => (data += d));
process.stdin.on("end", () => {
  const entries = JSON.parse(data);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 1);
  cutoff.setHours(0, 0, 0, 0);

  let csv =
    "id,url,browser,browser_version,engine,engine_version,os,os_version,created\n";

  for (let { _id, url, ua, _createdOn } of entries) {
    if (new Date(_createdOn) < cutoff) continue;
    const { browser, engine, os } = parser(ua);
    csv +=
      [
        _id,
        url,
        browser.name,
        browser.version,
        engine.name,
        engine.version,
        os.name,
        os.version,
        _createdOn,
      ].join(",") + "\n";
    // i.e. += each value separated by commas, then a new line
  }
  // just write csv to stdout so we can redirect to new file in shell
  process.stdout.write(csv);
});
