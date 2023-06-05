export default class CustomValueTable {
  /**
   * 調達テーブルにテキスト値を表示
   * @param item は調達テーブルのアイテムです
   * @param field 調達テーブル内のアイテムのプロパティです
   * @return {string} 調達表記録値
   */
  static setValueTable(item: any, fields: any): any {
    let value
      const splitField = fields.split('.')
      if (splitField.length == 1) {
          value = item[splitField[0]]
      }
      if (splitField.length == 2) {
          value = item[splitField[0]][splitField[1]]
      }
      if (splitField.length == 3) {
          value = item[splitField[0]][splitField[1]][splitField[2]]
      }
      return value
  }
}
