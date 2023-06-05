export default class AppConstants {
  static AREAS = ["日本", "他の国"];
  static DEFAULT_SELECTED_AREA = "日本";
  static DEFAULT_SELECTED_PREF_CODE = "デフォルト 1";
  static ExpirationStatus = ["すべて", "有効のみ"];
  static DEFAULT_ALL = "すべて";
  static DEFAULT_VALID_ONLY = "有効のみ";
  static COMMON_MODAL_CARD_ID = 'commonCardModalId';
  // Master
  static MASTER_ITEM = 'm_item'
  // Table
  static TABLE_PROCUREMENT = 't_procurement';
  static TABLE_ARRIVAL = 't_arrival'
  static TABLE_ASSET = 't_asset';
  static TABLE_KITTING = 't_kitting'
  static TABLE_PICK_UP = 't_pick_up'
  static TABLE_SHIPPING = 't_shipping'
  static TABLE_DISPOSAL = 't_disposal'
  static TABLE_REPAIRING = 't_repairing'

  // calendar config
  static CALENDAR_CONFIG = {
    type: "string",
    mask: "YYYY-MM-DD",
  };
  // calendar masks
  static CALENDAR_MASKS = {
    input: "YYYY-MM-DD",
  };
  static OS = [
    { value: 0, text: 'IOS' },
    { value: 1, text: 'Android' },
  ];

  // constants for lifecycle management's screen
  static PROCUREMENT_MODAL_KEY = 'procurementId'
  static INTEGRATED_ASSET_MODAL_KEY = 'assetId'
  static PARENT_ASSET_ID = 'parentAssetId'
  static ITEM_ID_KEY = 'itemId'
  static ACCOUNT_NAME = 'accountName'

  // Field Of Gen Code
  static ASSET_TYPE = 'assetType';
  static SHIPPING_STATUS = 'shippingStatus';
  static PICK_UP_STATUS = 'pickUpStatus';
  static SHIPPING_RECEPTION_STATUS = 'shippingReceptionStatus';
  static KITTING_STATUS = 'kittingStatus';
  static REPAIRING_STATUS = 'repairingStatus';
  static DISPOSAL_STATUS = 'disposalStatus'
}
