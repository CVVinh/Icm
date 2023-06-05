export default class ConvertUtils {
  static convertNumberToJpCurrency(price: number | undefined) {
    if (!price) {
      return "0";
    }
    const convertedPrice = price.toLocaleString("jp-JP", {
      style: "currency",
      currency: "JPY",
    });
    return convertedPrice;
  }
}
