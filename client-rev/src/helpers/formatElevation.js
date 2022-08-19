const numeral = require("numeral");

export default function formatElevation(num) {
  return numeral(num).format("0,0");
}
