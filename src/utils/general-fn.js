function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export const formatIndianCurrency = number => {
  if (!number) return;
  const crore = 10000000;
  const lakh = 100000;

  if (number >= crore) {
    return (
      (number / crore).toFixed(2).replace(/(\d)(?=(\d\d)+\d$)/g, '$1,') + ' Cr'
    );
  } else if (number >= lakh) {
    return (
      (number / lakh).toFixed(2).replace(/(\d)(?=(\d\d)+\d$)/g, '$1,') + ' Lakh'
    );
  } else {
    return formatNumberWithCommas(number);
  }
};
