export default interface usermessageInformation {
  request_id: number,
  account_name: string,
  use_on_from: string,
  asset_name: string,
  asset_id: never,
  asset_status: string,
  group_name: string,
  asset_to: string,
  request_menu1?:{
    value: string,
    text: string,
  },
  request_menu2?:{
    value: string,
    text: string,
  },
  message: string,
}
