export const formattedNumber = (number) => {
  return new Intl.NumberFormat("tr-TR").format(number);
};
