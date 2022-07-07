export default function formatKP(number) {
  const num = number * 1;
  const postPlus = num % 1000;
  const prePlus = (num - postPlus) / 1000;
  return `${prePlus}+${numeral(postPlus).format("000")}`;
}
