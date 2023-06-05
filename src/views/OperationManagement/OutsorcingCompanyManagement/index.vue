<template>
  <v-container>
    <h3>マスター管理</h3>
  </v-container>

  <v-container>
    <CommonTabs :tabDetails="tabState.tabDetails" />
    <div class="elevation-5">
    <SearchComponent
      v-on:on-search="onClickSearch"
      v-on:on-clear="onClickClear"
      v-model:deleted-record-display-mode="searchState.deletedRecordDisplayMode"
      v-model:tab-expanded="tabExpanded"
    >
      <template v-slot:searchForm>
        <v-form>
          <div class="d-flex mx-n3">
            <v-col :cols="2">
              <div class="form-input">
                <v-text-field
                  label="委託先ID"
                  v-model="searchState.outsourcingCompanyId"
                  hide-details
                  variant="underlined"
                />
              </div>
            </v-col>

            <v-col :cols="2">
              <div class="form-input">
                <v-text-field
                  label="委託先名称(前方一致)"
                  class=""
                  v-model="searchState.outsourcingCompanyName"
                  hide-details
                  variant="underlined"
                />
              </div>
            </v-col>

            <v-col :cols="2">
              <div class="d-flex align-center">
                <v-select
                  v-model="searchState.area"
                  label="エリア"
                  variant="underlined"
                  :items="AppConstants.AREAS"
                  class="table-submit-elements"
                  hide-details
                  style="min-width: 160px; max-width: 220px"
                >
                </v-select>
              </div>
            </v-col>
          </div>
        </v-form>
        <br>
      </template>
    </SearchComponent>
    </div>
  </v-container>

  <v-container class="pt-0">
    <div class="elevation-5">
      <CommonTable
        v-on:click-detail="onDetailClick"
        :column-attrs="tableState.tableAttrs"
        :data="tableState.data"
        :total="tableState.total"
        @page="onPage"
        v-model:pageSize="searchState.pageSize"
        v-model:pageNum="searchState.pageNum"
        @refresh-data="onRefreshData"
      >
        <template v-slot:buttonTable>
          <v-btn class="ml-3" @click="onClickAddNewItem">新規</v-btn>
        </template>
      </CommonTable>
    </div>
  </v-container>

  <CommonModal
    ref="modalRef"
    :modal-id="''"
    :date-time-form="dialogState.detailsDatetime"
    :modal-name="'マスター管理 > 委託先マスター詳細'"
    @on-save="onClickSaveOrUpdateItem"
    @on-delete="handleDeleteItem"
  >
    <template #contentModal>
      <OutsourcingInformationForm
        v-model="outsourcingInformation"
        :prefectures="dialogState.prefectures"
      />
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import CommonTabs from "@/components/tabs/custom-tabs/index.vue"
import SearchComponent from "@/components/tabs/search-button/index.vue";
import CommonTable from "@/components/custom-table/index.vue";
import ColumnAttributes from "@/models/column-attributes.model";
import OutsourcingInformationForm from "@/components/form-component/outsourcing-information/index.vue";
import OutsourcingCompanyInformation from "@/models/outsourcing-information.model";
import AppConstants from "@/constants/constants";
import { outsourcingCompanyService } from "@/services/outsourcing-company.service";
import prefectureService from "@/services/prefecture.service";
import Prefecture from "@/models/Prefecture";
import TabCommon from "@/models/tab-common";
import CommonModal from "@/components/modal/index.vue";
import DateTimeAction from "@/models/DateTimeAction";
import useAlert from "@/utils/alert"

const { alertMessage } = useAlert()
const tabState = reactive({
  tabDetails: [
    { tabTitle: "委託先マスター", tabName: "Outsourcing Company Management" },
  ] as TabCommon[],
  tabExpanded: false,
});
const tabExpanded = ref(false);
const tableState = reactive({
  tableAttrs: {
    labels: ["委託先ID", "委託先名称", "エリア", "住所", "担当者"],
    fields: [
      "outsourcingCompanyId",
      "outsourcingCompanyName",
      "area",
      "address",
      "pic",
    ],
    clickableColumn: [true],
    columnsWidth: [100, 250],
  } as ColumnAttributes,
  data: [] as OutsourcingCompanyInformation[],
  total: 0,
});

let searchState = reactive({
  outsourcingCompanyId: undefined,
  outsourcingCompanyName: undefined,
  area: undefined,
  deletedRecordDisplayMode: 0,
  pageNum: 1,
  pageSize: 10,
});

const dialogState = reactive({
  prefectures: [] as Prefecture[],
  detailsDatetime: {} as DateTimeAction,
});

let outsourcingInformation = ref({
  outsourcingCompanyId: undefined,
  outsourcingCompanyName: undefined,
  area: undefined,
  zipCode: undefined,
  pilotNumber: undefined,
  prefCode: undefined,
  city: undefined,
  street: undefined,
  building: undefined,
  department: undefined,
  pic: undefined,
  directNumber: undefined,
  directEmailAddress: undefined,
} as OutsourcingCompanyInformation);

const modalRef = ref<InstanceType<typeof CommonModal> | null>();

onMounted(() => {
  // call api to get data
  getOutsourcingCompanyList();
});

const getOutsourcingCompanyList = async () => {
  try {
    const response = await outsourcingCompanyService.getOutsourcingCompanyList(
      searchState
    );
    tableState.data = response.mstOutsourcingCompanyMaster;
    tableState.total = response.total;
  } finally {
    // TODO on/off loading flag
  }
};

const getPrefecture = async () => {
  dialogState.prefectures = await prefectureService.getAll();
};

const onClickSearch = async () => {
  console.log("asd");
  searchState.pageNum = 1;
  getOutsourcingCompanyList();
};

const onClickClear = () => {
  searchState.outsourcingCompanyId = undefined;
  searchState.outsourcingCompanyName = undefined;
  searchState.area = undefined;
  searchState.deletedRecordDisplayMode = 0;
};

const onRefreshData = () => getOutsourcingCompanyList();

const onClickAddNewItem = async () => {
  outsourcingInformation.value = {
    area: AppConstants.DEFAULT_SELECTED_AREA,
  } as OutsourcingCompanyInformation;

  dialogState.detailsDatetime = {};

  await getPrefecture();
  if (dialogState.prefectures.length !== 0) {
    outsourcingInformation.value.prefCode = dialogState.prefectures[0].prefId;
  }
  modalRef.value?.openModal(0);
};

const onClickSaveOrUpdateItem = async () => {
  try {
    const response = await outsourcingCompanyService.saveOrUpdateOutsourcingCompanyData(outsourcingInformation.value);
    await getOutsourcingCompanyList();
    alertMessage(response.message, response.status);
  } finally {
    modalRef.value?.handleOnClose();
  }
};

const handleDeleteItem = async () => {
  try {
    if (!outsourcingInformation.value.outsourcingCompanyId) {
      return;
    }

    if (confirm("Are you sure to delete?")) {
      const response = await outsourcingCompanyService.deleteById(
      outsourcingInformation.value.outsourcingCompanyId
    );
      await getOutsourcingCompanyList();
      alertMessage(response.message, response.status);
      modalRef.value?.handleOnClose();
    }
  } finally {
    modalRef.value?.handleOnClose();
  }
};

const onDetailClick = async (outsourcingId: number) => {
  try {
    await getPrefecture();
    const response = await outsourcingCompanyService.getOutsourcingCompanyById(
      outsourcingId
    );
    outsourcingInformation.value = response;

    dialogState.detailsDatetime = {
      createdTime: response.createdAt,
      updatedTime: response.modifiedAt,
      deletedTime: response.deletedAt
    }
    modalRef.value?.openModal(
      outsourcingInformation.value.outsourcingCompanyId as number
    );
  } finally {
  }
};

const onPage = () => getOutsourcingCompanyList();
</script>

<style lang="scss" scoped></style>
