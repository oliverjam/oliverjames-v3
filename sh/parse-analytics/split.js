#!/usr/bin/env node

const fs = require("fs");

// data is piped in from shell
// since curl is easier than https.get
let data = "";
process.stdin.resume();
process.stdin.on("data", (d) => (data += d));
process.stdin.on("end", () => {
  const [headers, ...rows] = data.split("\n");

  let days = new Map();
  for (let row of rows) {
    const [
      id,
      url,
      browser,
      browser_version,
      engine,
      engine_version,
      os,
      os_version,
      created,
    ] = row.split(",");
    if (!row) continue;
    const [name] = new Date(created).toISOString().split("T");
    if (!days.has(name)) {
      days.set(name, []);
    }
    const existing = days.get(name);
    existing.push({
      id,
      url,
      browser,
      browser_version,
      engine,
      engine_version,
      os,
      os_version,
      created,
    });
  }

  for (let [file, entries] of days) {
    let contents = headers + "\n";
    for (let entry of entries) {
      contents +=
        [
          entry.id,
          entry.url,
          entry.browser,
          entry.browser_version,
          entry.engine,
          entry.engine_version,
          entry.os,
          entry.os_version,
          entry.created,
        ].join(",") + "\n";
    }
    fs.writeFileSync(`src/_data/analytics/${file}.csv`, contents);
  }
});
