<template>
  <div class="elevation-5">
    <SearchComponent
      @onSearch="fetchData(true)"
      @onClear="onClear"
      v-model:deleted-record-display-mode="dataSearch.deletedRecordDisplayMode"
      v-model:tab-expanded="tabExpanded"
    >
      <template v-slot:searchForm>
        <v-form class="pb-3">
          <v-row>
            <v-col cols="2">
              <vc-input
                label="メーカーID"
                name="メーカーID"
                v-model="dataSearch.makerId"
                hide-details
              />
            </v-col>
            <v-col cols="3">
              <vc-input
                label="メーカー名称(前方一致)"
                name="メーカー名称(前方一致)"
                v-model="dataSearch.makerName"
                hide-details
              />
            </v-col>
            <v-col cols="2">
              <vc-select
                label="地域選択"
                v-model:value="dataSearch.area"
                hide-details
                :items="areaList"
              />
            </v-col>
          </v-row>
        </v-form>
      </template>
    </SearchComponent>
  </div>
    <div class="container-table elevation-5 mt-4">
      <CommonTable
        :column-attrs="state.tableAttrs"
        :data="state.dataTable"
        :total="state.total"
        :tableHeight="state.tableHeight"
        v-model:page-size="dataSearch.pageSize"
        v-model:pageNum="dataSearch.pageNum"
        @page="fetchData"
        @click-detail="handleAddEditItem"
        @on-add-item="handleAddEditItem()"
        @refresh-data="fetchData"
      />
    </div>
    <MakerModal
      ref="makerMasterRef"
      modalId="makerMaster"
      modalName="マスター管理 > メーカーマスター詳細"
      :dateTimeForm="dateTimeFormat"
      @on-save="doSave"
      @on-delete="handleOnDeleteItem"
      @on-close="handleOnClose"
    >
      <template v-slot:contentModal>
        <MakerMasterModal
          ref="makerMasterModalRef"
          v-model="makerMasterForm"
          :areaList="areaList"
          :prefectures="prefectureList"
          :itemDeletedFlag="makerMasterForm?.isDeleted === 1"
        />
      </template>
    </MakerModal>
</template>

<script setup lang="ts">
import vcInput from '@/components/commons/vc-input.vue';
import vcSelect from '@/components/commons/vc-select.vue';
import { computed, onMounted, reactive, Ref, ref } from "vue";
import ColumnAttributes from "@/models/column-attributes.model";
import CommonTable from "@/components/custom-table/index.vue";
import SearchComponent from "@/components/tabs/search-button/index.vue";
import MakerMasterModal from "@/components/modal/MakerMasterModal.vue";
import MakerModal from "@/components/modal/index.vue"
import MakerService from "@/services/maker.service";
import PrefectureService from "@/services/prefecture.service"
import MakerMaster from "@/models/MakerMaster";
import Prefecture from "@/models/Prefecture";
import { useStore } from "@/store/index";

const state = reactive({
  total: 0,
  tableAttrs: {
    labels: ["メーカーID", "メーカー名称", "エリア", "住所", "担当者"],
    fields: ["makerId", "makerName", "area", "address", "pic"],
    clickableColumn: [true],
    columnsWidth: [100, 250, 250, 250]
  } as ColumnAttributes,
  tableHeight: 370,
  dataTable: [] as MakerMaster[],
});
const tabExpanded = ref(false);
const makerMasterRef = ref <InstanceType<typeof MakerModal> | null>(null);
const makerMasterModalRef = ref<InstanceType<typeof MakerMasterModal>| null>(null);
let makerMasterForm: Ref<MakerMaster> = ref({});
const areaList = ['日本', 'その他'];
let prefectureList: Array<Prefecture> = reactive([]);
const dataSearch = reactive({
  makerId: null,
  makerName: null,
  area: null,
  deletedRecordDisplayMode: 0,
  pageNum: 1,
  pageSize: 10
});
let dateTimeFormat = reactive({
    createdTime: '',
    updatedTime: '',
    deletedTime: ''
  });

onMounted(() => {
  fetchData();
});
const store = useStore();
const getStatusRes = computed(() => store.getters.getStatusResponse);

/**
 * モーダル追加編集項目を表示
 * @param makerId アイテムメーカーID
 */
const handleAddEditItem = async (makerId: number = 0) => {
  await getData(makerId);
  makerMasterRef.value?.openModal(makerId, makerMasterForm?.value.isDeleted);
};

/**
 * クリア条件検索
 */
const onClear = () => {
  dataSearch.makerId = null;
  dataSearch.makerName = null;
  dataSearch.area = null;
  dataSearch.deletedRecordDisplayMode = 0;
}

/**
 * メーカーIDでメーカー情報を取得する
 * @param makerId メーカーID
 */
const getData = async (makerId: number) => {
  if (!makerId) {
    makerMasterForm.value.area = areaList[0]
    makerMasterForm.value.prefCode = prefectureList.length ? prefectureList[0].prefId : undefined;
    return
  }
  try {
    makerMasterForm.value = await MakerService.get({makerId});
    dateTimeFormat.createdTime = makerMasterForm.value.createdAt || '';
    dateTimeFormat.updatedTime = makerMasterForm.value.modifiedAt || '';
    dateTimeFormat.deletedTime = makerMasterForm.value.deletedAt || '';
  } catch(error) {
    console.log(error);
  }
}

/**
 * データをロードする
 */
const fetchData = async (isSearch = false) => {
  try {
    if (isSearch) {
      dataSearch.pageNum = 1;
    }
    const response = await MakerService.getAll(dataSearch);
    state.dataTable = response?.data.mstMakerMaster;
    state.total = response?.data.total;
    await getPrefectureList();
  } catch(error) {
    console.log(error);
  }
}

/**
 * イベント削除メーカーアイテム
 * @param makerId アイテムメーカーID
 */
const handleOnDeleteItem = async (makerId: number) => {
  let response
  try {
    response = await MakerService.delete({makerId});
    setMessage(response?.data.message);
    setStatusRes(response?.status);
    reloadData();
  } catch(error) {
    console.log(error);
  }
}

const reloadData = () => {
  if (getStatusRes.value === 200) {
      fetchData();
    }
}

const handleOnClose = () => {
  makerMasterForm.value = {} as MakerMaster;
}

/**
 * イベントセーブメーカーアイテム
 * @param data メーカーのデータ
 * @param isAddItem モーダルを追加
 */
const doSave = async (isAddItem: Ref) => {
  const validForm = await makerMasterModalRef.value?.validateForm();
  if (!validForm.valid) {
    return
  }
  if (isAddItem.value) {
    await addMakerItem(makerMasterForm.value);
  } else {
    await updateMakerItem(makerMasterForm.value);
  }
  reloadData();
  makerMasterRef.value?.handleOnClose();
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

/**
 * 追加のイベント メーカー アイテム
 * @param data メーカーのデータ
 */
const addMakerItem = async (data: object) => {
  let response
  try {
    response = await MakerService.add(data);
    setMessage(response?.data.message);
    setStatusRes(response?.status);
  } catch(error) {
    console.log(error);
  }
}

/**
 * イベントメーカーアイテムアップデート
 * @param data メーカーのデータ
 */
const updateMakerItem = async (data: object) => {
  try {
    const response = await MakerService.update(data);
    setMessage(response?.data.message);
    setStatusRes(response?.status);
  } catch(error) {
    console.log(error);
  }
}

/**
 * 都道府県データ取得
 */
const getPrefectureList = async () => {
  prefectureList = await PrefectureService.getAll();
}
</script>
<style lang="scss" scoped>
.form-search {
  display: flex;
  align-items: center;
}
.container-table {
  padding: 16px 0px 0px 0px;
}
</style>
