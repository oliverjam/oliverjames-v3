function formatDate(d) {
  // undefined locale should use user's browser language
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function fallback(value, unit) {
  return `${value * -1} ${unit}${value === 1 ? "" : "s"} ago`;
}

const rtf = Intl.RelativeTimeFormat
  ? new Intl.RelativeTimeFormat("en", { numeric: "auto" })
  : { format: fallback };

const DAY_MS = 1000 * 60 * 60 * 24;
const WEEK_MS = DAY_MS * 7;
const MONTH_MS = DAY_MS * 31;
const YEAR_MS = DAY_MS * 365;

function getTimeUnit(ms) {
  if (ms < WEEK_MS) return { value: ms / DAY_MS, unit: "day" };
  else if (ms < MONTH_MS) return { value: ms / WEEK_MS, unit: "week" };
  else if (ms < YEAR_MS) return { value: ms / MONTH_MS, unit: "month" };
  else return { value: ms / YEAR_MS, unit: "year" };
}

function getRelativeTime(d) {
  const todayMs = Date.now();
  const inputMs = d.getTime();
  const timeDifference = todayMs - inputMs;
  const { value, unit } = getTimeUnit(timeDifference);
  const roundedValue =
    unit === "day" ? Math.floor(value) : Math.round(value * 2) / 2;

  const relative = rtf.format(roundedValue * -1, unit);
  return relative;
}

function getReadingTime(content) {
  const contentWithoutHtml = content.replace(/(<([^>]+)>)/gi, "");
  const words = contentWithoutHtml.match(/[\u0400-\u04FF]+|\S+\s*/g);
  const wordCount = words ? words.length : 0;
  const wordsPerSecond = 200 / 60;
  const readingTime = wordCount / wordsPerSecond;
  return readingTime;
}

module.exports = {
  getRelativeTime,
  formatDate,
  getReadingTime,
};
