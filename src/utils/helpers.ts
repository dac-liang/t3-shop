const CURRENCY_FORMATTER = new Intl.NumberFormat("ja-JP", {
  currency: "JPY",
  style: "currency",
  currencyDisplay: "name",
});
const formatCurrency = (number: number) => {
  return CURRENCY_FORMATTER.format(number);
};

export { formatCurrency };
