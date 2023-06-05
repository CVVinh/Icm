<template>
  <div class="elevation-5">
    <SearchComponent
      @onSearch="onSearch"
      @onClear="onClear"
      v-model:deleted-record-display-mode="
        state.searchCondition.deletedRecordDisplayMode
      "
      v-model:tab-expanded="state.searchCondition.tabExpanded"
    >
      <template v-slot:searchForm>
        <v-form>
          <div class="d-flex">
            <v-col cols="2" class="pl-0">
              <div class="form-input">
                <v-text-field
                  v-model="state.searchCondition.kittingMasterId"
                  id="input-id"
                  variant="underlined"
                  label="キッティングID"
                  density="compact"
                  hide-details
                  autocomplete="off"
                  type="number"
                />
              </div>
            </v-col>
            <v-col cols="3">
              <div class="form-input">
                <v-text-field
                  v-model="state.searchCondition.kittingMasterName"
                  id="input-name"
                  variant="underlined"
                  label="キッティング名称(前方一致)"
                  density="compact"
                  hide-details
                  autocomplete="off"
                />
              </div>
            </v-col>
            <v-col cols="2">
              <div class="form-input">
                <v-text-field
                  v-model="state.searchCondition.masterPCNumber"
                  id="input-name"
                  variant="underlined"
                  label="マスターPC番号"
                  density="compact"
                  hide-details
                  autocomplete="off"
                />
              </div>
            </v-col>
          </div>
        </v-form>
      </template>
    </SearchComponent>
  </div>

  <div class="elevation-5 mt-4">
    <CustomTable
      :column-attrs="state.tableState.columnAttrs"
      :data="state.tableState.data"
      :btn-add-item="false"
      :total="state.tableState.total"
      v-model:page-size="state.tableState.pageSize"
      v-model:page-num="state.tableState.pageNum"
      @click-detail="onClickAddNewOrUpdateItem"
      @page="getList()"
    >
      <template v-slot:buttonTable>
        <v-btn class="ml-3" @click="onClickAddNewOrUpdateItem(undefined)"
          >新規</v-btn
        >
      </template>
    </CustomTable>
  </div>

  <CommonModal
    ref="modalRef"
    modalId="itemMaster"
    modalName="キッティングマスタ"
    :dateTimeForm="actionDatetime"
    @on-save="handleOnSave"
    @on-delete="handleOnDelete"
    @on-close="handleOnClose"
  >
    <template v-slot:contentModal>
      <v-form class="elevation-5">
        <div>
          <v-col cols="3">
            <v-text-field
              label="キッティングマスターID"
              variant="underlined"
              density="compact"
              disabled
              v-model="state.kittingData.kittingMasterId"
            />
          </v-col>
        </div>
        <div>
          <v-col cols="3">
            <v-text-field
              label="キッティングマスター名称"
              variant="underlined"
              density="compact"
              v-model="state.kittingData.kittingMasterName"
            />
          </v-col>
        </div>
        <div>
          <v-col cols="3">
            <v-text-field
              type="number"
              label="マスターPC番号"
              variant="underlined"
              density="compact"
              v-model.number="state.kittingData.masterPCNumber"
            />
          </v-col>
        </div>
        <div>
          <v-col cols="3">
            <v-text-field
              label="キッティング方法"
              variant="underlined"
              density="compact"
              v-model="state.kittingData.kittingMethod"
            />
          </v-col>
        </div>
        <div>
          <v-col cols="5">
            <v-textarea
              label="補足"
              variant="underlined"
              density="compact"
              rows="2"
              v-model="state.kittingData.note"
            />
          </v-col>
        </div>
      </v-form>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import SearchComponent from "@/components/tabs/search-button/index.vue";
import CustomTable from "@/components/custom-table/index.vue";
import ColumnAttributes from "@/models/column-attributes.model";
import CommonModal from "@/components/modal/index.vue";
import KittingInformation from "@/models/kitting-information.model";
import kittingService from "@/apis/Kitting/kitting.service";

const modalRef = ref<InstanceType<typeof CommonModal> | null>(null);

const actionDatetime = reactive({
  createdTime: undefined as string | undefined,
  updatedTime: undefined as string | undefined,
  deletedTime: undefined as string | undefined,
});

const state = reactive({
  searchCondition: {
    kittingMasterId: undefined,
    kittingMasterName: undefined,
    masterPCNumber: undefined,
    deletedRecordDisplayMode: 0,
    tabExpanded: false,
  },
  tableState: {
    columnAttrs: {
      labels: [
        "キッティングマスターID",
        "名称",
        "マスターPC番号",
        "キッティング方法",
        "補足",
      ],
      fields: [
        "kittingMasterId",
        "kittingMasterName",
        "masterPCNumber",
        "kittingMethod",
        "note",
      ],
      columnsWidth: [150],
      clickableColumn: [true],
    } as ColumnAttributes,
    data: [] as any[],
    total: 0,
    pageSize: 10,
    pageNum: 1,
  },
  kittingData: {
    kittingMasterId: undefined,
    kittingMasterName: undefined,
    kittingMethod: undefined,
    masterPCNumber: undefined,
    note: undefined,
  } as KittingInformation,
});

onMounted(async () => {
  await getList();
});

const getList = async () => {
  const mergedCondition = {
    ...state.searchCondition,
    pageSize: state.tableState.pageSize,
    pageNum: state.tableState.pageNum,
  };
  const response = await kittingService.getKittingList(mergedCondition);
  state.tableState.data = response.kittingList;
  state.tableState.total = response.kittingTotal;
};

const onSearch = async () => {
  state.tableState.pageNum = 1;
  await getList();
};

const onClear = () => {
  state.searchCondition = {
    kittingMasterId: undefined,
    kittingMasterName: undefined,
    masterPCNumber: undefined,
    deletedRecordDisplayMode: 0,
    tabExpanded: false,
  };
};

const onClickAddNewOrUpdateItem = async (id: number | undefined) => {
  if (id) {
    const response = await kittingService.getKittingById(id);
    if (!response.kittingMasterInfo) {
      return;
    }
    state.kittingData = response.kittingMasterInfo;
    actionDatetime.createdTime = state.kittingData!.createdAt;
    actionDatetime.updatedTime = state.kittingData!.modifiedAt;
    actionDatetime.deletedTime = state.kittingData!.deletedAt;
    return modalRef.value?.openModal(id, state.kittingData.isDeleted);
  }
  return modalRef.value?.openModal(0);
};

const handleOnSave = async () => {
  if (!state.kittingData) {
    return;
  }
  await kittingService.saveOrUpdateKittingData(state.kittingData);
  await getList();
  modalRef.value?.handleOnClose();
};

const handleOnDelete = async (id: number) => {
  await kittingService.deleteById(id);
  await getList();
};

const handleOnClose = async () => {
  state.kittingData = {};
};
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
