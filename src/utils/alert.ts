import { store } from "@/store";

export default function () {
  /**
   * メッセージ設定メッセージの変更
   * @param message メッセージ文字列です
   */
  const alertMessage = async (message: string, status: number = 0) => {
    store.dispatch('setMessage', message);
    store.dispatch('setStatusResponse', status);
  };

  /**
   * メッセージ設定メッセージを削除
   */
    const removeAlertMessage = async () => {
      store.dispatch('setMessage', '');
    };
  return {
    alertMessage,
    removeAlertMessage
  }
}
