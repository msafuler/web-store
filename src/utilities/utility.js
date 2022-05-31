export const findPrice = (prices, currency) => prices.filter(price => {
  return price.currency.symbol === currency.symbol
})[0];
