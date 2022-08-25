const numeral = require("numeral");

export function formatElevation(num) {
  return numeral(num).format("0,0");
}

export function formatKP(number) {
  const num = number * 1;
  const postPlus = num % 1000;
  const prePlus = (num - postPlus) / 1000;
  return `${prePlus}+${numeral(postPlus).format("000")}`;
}
