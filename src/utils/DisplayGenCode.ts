import GenCode from "@/models/GenCode";
import GenCodeService from "@/services/genCode.service"

export default class DisplayGenCode  {
  /**
   * API を呼び出して、パラメーターを使用して生成されたコードを取得する
   * @param tableName テーブル名
   * @param fieldName フィールド名
   * @returns {object} genCode によるオブジェクト
   */
  static async getGenCode(tableName: string = '', fieldName: string = ''): Promise<GenCode[]> {
    const dataParam: any = {
      tableName: tableName,
      fieldName: fieldName
    }
    this.removePropertyEmpty(dataParam)
    const genCode = await (await GenCodeService.getAll(dataParam)).mstGenCode;
    return genCode
  }

  /**
   * オブジェクト プロパティが変数でない場合、オブジェクト プロパティを削除します。
   * @param objectParam オブジェクトのユーザーが空のプロパティを削除したい。
   */
  static removePropertyEmpty(objectParam: any) {
    Object.keys(objectParam).forEach((key) => {
      if (objectParam[key] !== 0 && !objectParam[key]) {
        delete objectParam[key]
      }
    })
  }

  /**
   * gen code アセットを取得する
   * @param tableName テーブル名
   * @param fieldName フィールド名
   * @param genCodeList ゲンコード一覧
   * @returns {array} プロパティ「値」と「タイトル」を持つ配列オブジェクト
   */
  static getListGenCodeLabel(tableName: string, fieldName: string, genCodeList: any[]): Array<any> {
    let genCodeLabelList: GenCode[] = []
    genCodeLabelList = genCodeList.filter((genCode: GenCode) => genCode.tableName === tableName && genCode.fieldName === fieldName)
    return genCodeLabelList.map((genCode) => {
      const genCodeLabel = {
        value: genCode.fieldValue,
        title: genCode.fieldDisplayLabel
      }
      return genCodeLabel
    })
  }
  /**
   * Display label by gen code value on gen code table
   * @param param is the passed argument array:
   * @number param[0] is value of param
   * @string param[1] is table name
   * @string param[2] is field name
   * @GenCode param[3] is gen code list
   * @returns {string} is title
   */
  static displayLabelByGenCode(...param: any[]): string {
    let genCodeLabelList = this.getListGenCodeLabel(param[1], param[2], param[3]);
    let labelByValue = genCodeLabelList.find((genCode) => param[0] === genCode.value);
    return labelByValue?.title || '';
  }

  /**
   * Display title by array object
   * @param value is value of user input
   * @param arrayObjectParam is param array object
   * @returns {string} is title
   */
  static displayTileByArrayObject(value: number, arrayObjectParam: Array<any>): string {
    let resultObject = arrayObjectParam.find(objectParam => objectParam.value === value);
    return resultObject?.title || '';
  }
}
