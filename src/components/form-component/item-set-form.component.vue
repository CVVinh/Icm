<template>
  <v-dialog v-model="dialogFormItem" :scrim="false" transition="dialog-bottom-transition">
    <v-card>
      <!-- <v-container class="d-flex">
        <span>マスター管理 > PCセットマスター詳細</span>
        <v-spacer />
        <v-btn density="compact" prepend-icon="mdi-arrow-left" @click="closeModalItemSet()" size="large">戻る</v-btn>
        <v-btn class="ml-3" density="compact" prepend-icon="mdi-plus" @click="onClickSaveItem"
          :disabled="viewUpdate == 2" size="large">追加</v-btn>
        <v-btn class="ml-3" density="compact" prepend-icon="mdi-update" @click="onClickSaveOrUpdateItem"
          :disabled="viewUpdate == 1" size="large">変更</v-btn>
        <v-btn class="ml-3" density="compact" prepend-icon="mdi-delete" @click="handleDeleteItem"
          :disabled="viewUpdate == 1" size="large">削除</v-btn>
      </v-container> -->
      <v-container class="pa-8 pb-0">
        <detailModalComponent modalName="マスター管理 > PCセットマスター詳細" :isBtnAdd="viewUpdate == 1" :isBtnUpdate="viewUpdate == 2"
          :isBtnDelete="viewUpdate == 2" :customCondition="!isItemDeleted" :dateTime="dateTimeFormat"
          @onClose="closeModalItemSet" @onSave="onSaveItem()" @onDelete="handleDeleteItem"></detailModalComponent>
      </v-container>
      <v-container class="pa-4">
        <div class="bordered-component pa-4">
          <label><strong>PCセット品目情報</strong></label>
          <v-form class="pt-3">
            <v-row class="ma-0">
              <v-col class="pa-0" cols="2">
                <div class="form-item">
                  <v-text-field label="品目ID" readonly hide-details variant="underlined"
                    v-model.number="itemset.itemIdSet" />
                </div>
              </v-col>
            </v-row>

            <v-row class="ma-0 mt-2">
              <v-col class="pa-0" cols="2">
                <div class="form-item">
                  <v-select label="タイプ" hide-details variant="underlined" class="form-selection"
                    v-model="itemset.itemSetType" :items="SetType" item-title="fieldDisplayLabel" item-value="fieldValue"
                    :readonly="isItemDeleted" />
                </div>
              </v-col>

              <v-col class="pa-0 pl-3" cols="3">
                <div class="form-item">
                  <v-text-field label="品目名称" hide-details variant="underlined" v-model.trim="itemset.itemSetName"
                    :readonly="isItemDeleted" />
                </div>
              </v-col>
            </v-row>

            <v-row class="ma-0 mt-2">
              <v-col class="pa-0" cols="2">
                <div class="form-item">
                  <v-text-field label="JANコード" hide-details variant="underlined" v-model.trim="itemset.itemSetJanCode"
                    :readonly="isItemDeleted" />
                </div>
              </v-col>
              <v-col class="pa-0 pl-3 pr-3" cols="2">
                <div class="form-item">
                  <v-select label="メーカー名称" class="pt-0 form-selection" :items="mstMakers" item-title="makerName"
                    item-value="makerId" v-model="itemset.itemSetMakerId" variant="underlined" :readonly="isItemDeleted">
                  </v-select>
                </div>
              </v-col>
              <v-col class="pa-0" cols="2">
                <div class="form-item">
                  <v-text-field label="メーカー型番" v-model="itemset.itemSetMakerModel" variant="underlined"
                    :readonly="isItemDeleted" />
                </div>
              </v-col>
            </v-row>

            <v-row class="ma-0 mt-2">
              <v-col class="pa-0" cols="2">
                <div class="form-item">
                  <v-select label="OS" hide-details variant="underlined" class="form-selection"
                    v-model="itemset.itemSetOs" :items="OS" item-title="text" item-value="value"
                    :readonly="isItemDeleted" />
                </div>
              </v-col>
            </v-row>
          </v-form>
        </div>

        <div class="bordered-component pa-4">
          <label><strong>メインPC品目情報</strong></label>
          <v-form class="pt-3">
            <v-row class="ma-0">
              <v-col class="pa-0" cols="2">
                <div class="form-item">
                  <v-text-field label="品目ID" readonly hide-details variant="underlined"
                    v-model="itemset.mainItemInfo.mainItemId" />
                </div>
              </v-col>
              <v-col class="pa-0" cols="2">
                <div class="form-item pt-5">
                  <v-btn color="blue-darken-1" variant="text" @click="addMainItem"
                    :disabled="isItemDeleted">+追加品目選択</v-btn>
                </div>
              </v-col>
            </v-row>


            <v-row class="ma-0 mt-2">
              <v-col class="pa-0" cols="2">
                <div class="form-item">
                  <v-select label="タイプ" readonly hide-details variant="underlined" class="form-selection"
                    v-model="itemset.mainItemInfo.mainAssetType" :items="SetType" item-title="fieldDisplayLabel"
                    item-value="fieldValue" />
                </div>
              </v-col>

              <v-col class="pa-0 pl-3" cols="3">
                <div class="form-item">
                  <v-text-field label="品目名称" readonly hide-details variant="underlined"
                    v-model.trim="itemset.mainItemInfo.mainItemName" />
                </div>
              </v-col>


            </v-row>

            <v-row class="ma-0 mt-2">
              <v-col class="pa-0" cols="2">
                <div class="form-item">
                  <v-text-field label="JANコード" readonly hide-details variant="underlined"
                    v-model.trim="itemset.mainItemInfo.mainItemJanCode" />
                </div>
              </v-col>
              <v-col class="pa-0  pr-3 pl-3" cols="2">
                <div class="form-item">
                  <v-text-field label="メーカー名称" readonly hide-details variant="underlined"
                    v-model.trim="itemset.mainItemInfo.mainItemMaker" />
                </div>
              </v-col>
              <v-col class="pa-0" cols="2">
                <div class="form-item">
                  <v-text-field label="メーカー型番" readonly hide-details variant="underlined"
                    v-model.trim="itemset.mainItemInfo.mainItemMakerModel" />
                </div>
              </v-col>
            </v-row>
            <v-row class="ma-0 mt-2">
              <v-col class="pa-0" cols="2">
                <div class="form-item">
                  <v-select label="OS" readonly hide-details variant="underlined" class="form-selection"
                    v-model="itemset.mainItemInfo.mainItemOs" :items="OS" item-title="text" item-value="value" />
                </div>
              </v-col>
            </v-row>

          </v-form>
        </div>

        <div class="bordered-component pa-4">
          <label><strong>品目運用情報</strong></label>
          <v-form class="pt-3" ref="itemSetForm" lazy-validation validate-on="submit">
            <v-row class="ma-0">
              <v-col class="pa-0 mr-3" cols="2">
                <div class="form-item">
                  <vc-input-date label="有効開始日" type="date" name="有効開始日" :rules="['required']"
                    :maxValidateDate="itemset.itemSetExpirationDateTo" :defaultValue="itemset.itemSetExpirationDateFrom"
                    v-model="itemset.itemSetExpirationDateFrom" :disabled="isItemDeleted"></vc-input-date>
                </div>
              </v-col>

              <v-col class="pa-0 mr-3" cols="2">
                <div class="form-item">
                  <vc-input-date label="有効終了日" type="date" name="有効終了日" :rules="['required']"
                    :defaultValue="itemset.itemSetExpirationDateTo" v-model="itemset.itemSetExpirationDateTo"
                    :disabled="isItemDeleted"></vc-input-date>
                </div>
              </v-col>
            </v-row>
            <v-row class="ma-0">
              <v-col class="pa-0 pr-3" cols="2">
                <div class="form-item">
                  <v-text-field label="キッティングマスター" hide-details variant="underlined" />
                </div>
              </v-col>
            </v-row>
          </v-form>
        </div>
        <div class="bordered-component pa-4">
          <label><strong>セット品目情報</strong></label>

          <v-container class="v-card--variant-elevated">
            <v-table>
              <thead>
                <tr>
                  <th class="text-left"></th>
                  <th class="text-left">品目ID</th>
                  <th class="text-left">品目名称</th>

                  <th class="text-left">タイプ</th>
                  <th class="text-left">メーカー</th>
                  <th class="text-left">メーカー型番</th>
                  <th class="text-left">資産開始日</th>
                  <th class="text-left">資産終了日</th>
                  <th class="text-left">ライセンス</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in itemset.itemList" :key="item.itemId">
                  <td>
                    <v-btn @click="deleteItem(item.itemId)" color="blue-darken-1" variant="text"
                      :disabled="isItemDeleted">削除</v-btn>
                  </td>
                  <td>{{ item.itemId }}</td>
                  <td>{{ item.itemName }}</td>
                  <!-- <td>{{ item.Ver }}</td> -->
                  <td>{{ item.itemType }}</td>
                  <td>{{ item.itemMaker }}</td>
                  <td>{{ item.itemMakerModel }}</td>
                  <td>{{ item.ItemSetexpirationDateFrom }}</td>
                  <td>{{ item.itemexpirationDateTo }}</td>
                  <td>無</td>
                </tr>
              </tbody>
              <v-btn color="blue-darken-1" variant="text" @click="onClickItemList"
                :disabled="isItemDeleted">+追加品目選択</v-btn>
            </v-table>

            <dialog-list-item ref="activeDialogListItem" @onAddItem="getItem"
              @onCheckModal="checkModal"></dialog-list-item>
          </v-container>
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import AppConstants from "@/constants/constants";
import detailModalComponent from "@/components/commons/detail-modal-component.vue";
import ItemSet from "@/models/ItemSet";
import itemSetService from "@/services/itemset.service";
import MakerService from "@/services/maker.service";
import { useStore } from "@/store/index";
import GenCodeService from '@/services/genCode.service'
import GenCode from '@/models/GenCode';

import { ref, reactive, Ref } from "vue";
const activeDialogListItem = ref<any>(null);
let viewUpdate = ref<number>();
let mstMakers = ref<any[]>([])
const OS = ref<any[]>([
  { value: 0, text: 'IOS' },
  { value: 1, text: 'Android' },
])
const SetType: Ref<GenCode[]> = ref([])

const dialogFormItem = ref(false);
// let itemsetForm: ItemSet = reactive({});
let dateTimeFormat = reactive({
  createdTime: '',
  updatedTime: '',
  deletedTime: ''
});

let itemset = ref({
  itemIdSet: undefined,
  itemSetType: undefined,
  itemSetName: undefined,
  itemSetJanCode: undefined,
  itemSetMakerModel: undefined,
  itemSetMakerId: undefined,
  itemSetOs: undefined,
  itemSetExpirationDateFrom: undefined,
  itemSetExpirationDateTo: undefined,
  isDeleted: undefined,
  mainItemInfo: {
    mainItemId: undefined,
    mainAssetType: undefined,
    mainItemName: undefined,
  },

  itemList: [],
} as ItemSet);
const store = useStore()
const isItemDeleted = ref(false);

var keyMain = ref(Boolean);
const checkModal = (keyMainChild: any) => {
  keyMain = keyMainChild
}
const getItem = async (value: any) => {
  let formItemList = ref({
    itemId: undefined,
    itemType: undefined,
    itemName: undefined,
    itemMaker: undefined,
    itemMakerModel: undefined,
    ItemSetexpirationDateFrom: undefined,
    itemexpirationDateTo: undefined,
  });

  var item = itemset.value.itemList?.filter(x => x.itemId == value[0].itemId);

  if (item.length > 0) {
    const index = itemset.value.itemList?.findIndex(x => x.itemId === value[0].itemId);
    itemset.value.itemList.splice(index, 1);
  }
  if (keyMain == true) {
    itemset.value.mainItemInfo.mainItemId = value[0].itemId;
    itemset.value.mainItemInfo.mainAssetType = value[0].assetType;
    itemset.value.mainItemInfo.mainItemName = value[0].itemName;
    itemset.value.mainItemInfo.mainItemJanCode = value[0].janCode;
    itemset.value.mainItemInfo.mainItemMaker = value[0].makerId;
    itemset.value.mainItemInfo.mainItemMakerModel = value[0].makerModel;
    itemset.value.mainItemInfo.mainItemOs = value[0].osId;
  }
  formItemList.value.itemId = value[0].itemId;
  formItemList.value.itemName = value[0].itemName;
  formItemList.value.itemType = value[0].assetType;
  formItemList.value.itemMaker = value[0].makerId;
  formItemList.value.itemMakerModel = value[0].makerModel;
  formItemList.value.ItemSetexpirationDateFrom = value[0].expirationDateFrom;
  formItemList.value.itemexpirationDateTo = value[0].expirationDateTo;
  itemset.value.itemList.push(formItemList.value);
};

const deleteItem = (itemId: any) => {

  let obj = itemset.value.itemList
  const index = obj.findIndex(item => item.itemId === itemId);

  // Nếu tìm thấy phần tử có id cần xóa
  if (index !== -1) {
    // Xóa phần tử đó khỏi mảng
    obj.splice(index, 1);
  }



};

const addMainItem = () => {
  keyMain = true;
  activeDialogListItem.value.openDialogItemList(keyMain);
};
const onClickItemList = () => {
  keyMain = false;
  activeDialogListItem.value.openDialogItemList(keyMain);
};
const closeModalItemSet = () => {
  dialogFormItem.value = false;
  itemset = ref({
    itemIdSet: undefined,
    itemSetType: undefined,
    itemSetName: undefined,
    itemSetJanCode: undefined,
    itemSetMakerModel: undefined,
    itemSetMakerId: undefined,
    itemSetOs: undefined,
    itemSetExpirationDateFrom: undefined,
    itemSetExpirationDateTo: undefined,
    mainItemInfo: {
      mainItemId: undefined,
      mainAssetType: undefined,
      mainItemName: undefined,
    },

    itemList: [],
  } as ItemSet);
};
/**
 * Build data before modal render
 * @param isDeleted is flag to check if itemset is deleted
 */
const fetchDataByApi = async (isDeleted: number = 0) => {
  const makerTemp = await MakerService.getAll();
  mstMakers.value = [...makerTemp?.data?.mstMakerMaster]
  SetType.value = await (await GenCodeService.getAll({ tableName: AppConstants.MASTER_ITEM })).mstGenCode;
  // If item has not been deleted, show delete, update button and don't allow user to edit field
  isItemDeleted.value = isDeleted !== 0;
}

const openDialogFormUpdate = async (itemIdSet: any) => {
  viewUpdate.value = 2;
  try {
    const response = await itemSetService.detail(itemIdSet);
    itemset.value = response;
    await fetchDataByApi(itemset.value.isDeleted);
    dateTimeFormat.createdTime = itemset.value.createdAt || '';
    dateTimeFormat.updatedTime = itemset.value.modifiedAt || '';
    dateTimeFormat.deletedTime = itemset.value.deletedAt || '';
    dialogFormItem.value = true;
  } finally {
  }


};
const openDialogFormAdd = async () => {
  viewUpdate.value = 1;
  await fetchDataByApi();
  dialogFormItem.value = true;

};

const onSaveItem = async () => {
  let checkValidated = await validateForm()
  if (!checkValidated.valid) {
    return
  }
  if (viewUpdate.value == 1) {
    await onClickSaveItem()

  } else {
    await onClickSaveOrUpdateItem()
  }
  closeModalItemSet();

}
const onClickSaveOrUpdateItem = async () => {

  let response
  try {
    const objForPost = JSON.parse(JSON.stringify(itemset.value))
    const itemListId = itemset.value.itemList?.map((x) => x.itemId);
    objForPost.itemList = itemListId
    response = await itemSetService.saveOrUpdate(objForPost);
    setMessage(response?.msg);
    setStatusRes(response?.status);
    emit("getItemSetList");
  } catch (error) {
    console.log(error);
  }

};
const onClickSaveItem = async () => {

  let response
  try {
    const objForPost = JSON.parse(JSON.stringify(itemset.value))
    const itemListId = itemset.value.itemList?.map((x) => x.itemId);
    objForPost.itemList = itemListId
    response = await itemSetService.create(objForPost);
    console.log(response);

    setMessage(response?.message || response?.msg);
    setStatusRes(response?.stasus);
    emit("getItemSetList");

  } catch (error) {
    console.log(error);
  }
};
const handleDeleteItem = async () => {
  if (!itemset.value.itemIdSet) {
    return;
  }

  if (confirm("Are you sure to delete?")) {
    let response
    try {
      response = await itemSetService.delete(itemset.value);
      setMessage(response?.data.msg);
      setStatusRes(response?.status);
      emit("getItemSetList");
      closeModalItemSet();
    } catch (error) {
      console.log(error);
    }
  }
};
const itemSetForm = ref<any | null>(null);

const validateForm = async () => {
  const validForm = await itemSetForm.value.validate();
  return validForm;
}
/**
 * メッセージ設定メッセージの変更
 * @param message メッセージ文字列です
 */
const setMessage = async (message: string = '') => {
  store.dispatch('setMessage', message);
}

/**
 * ステータスによる警告メッセージの種類の変更
 * @param status 応答のステータスです
 */
const setStatusRes = async (status?: number) => {
  store.dispatch('setStatusResponse', status);
}

const emit = defineEmits(["getItemSetList"]);

defineExpose({
  openDialogFormUpdate,
  openDialogFormAdd,
  validateForm,
});
defineProps<{
  itemIdSet?: any;
}>();
</script>

<style lang="scss" scoped>
.bordered-component {
  border: thin solid;
  border-radius: 5px;
}
</style>
