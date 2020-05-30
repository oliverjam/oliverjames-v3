// highlights are redshifted, shadows are blueshifted
const shades = (HUE) => ({
  100: `hsl(${HUE + 4}, 100%, 97%)`,
  200: `hsl(${HUE + 8}, 72%, 87%)`,
  300: `hsl(${HUE + 16}, 60%, 75%)`,
  400: `hsl(${HUE + 20}, 54%, 61%)`,
  500: `hsl(${HUE + 24}, 45%, 50%)`,
  600: `hsl(${HUE + 28}, 48%, 42%)`,
  700: `hsl(${HUE + 32}, 48%, 34%)`,
  800: `hsl(${HUE + 36}, 45%, 27%)`,
  900: `hsl(${HUE + 40}, 42%, 23%)`,
  1000: `hsl(${HUE + 44}, 40%, 13%)`,
  1100: `hsl(${HUE + 48}, 38%, 8%)`,
});

const green = shades(90);

const day = {
  text: green[800],
  textLowContrast: green[700],
  bg: green[100],
  bgCode: green[200],
  bgContrast: green[200],
  bgHighlight: green[300],
  primary: green[600],
  primaryHighlight: green[400],
  primaryShadow: green[800],
};

const blue = shades(140);

const night = {
  text: blue[100],
  textLowContrast: blue[300],
  bg: blue[1100],
  bgCode: blue[1000],
  bgContrast: blue[900],
  bgHighlight: blue[800],
  primary: blue[600],
  primaryHighlight: blue[400],
  primaryShadow: blue[800],
};

module.exports = { shades: green, day, night };
