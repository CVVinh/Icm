<template>
  <v-container>
    {{ $attrs.name }}
  </v-container>
  <v-container>
    <CommonTabs
      :tab-details="tabDetails"
      v-model:deleted-record-display-mode="searchState_application.deletedRecordDisplayMode"
    >
      <template v-slot:content1>    
        <v-container>
          <v-row>
            <v-col>
              <v-form>
                <v-row>
                  <v-col cols="2">
                    <vc-input
                      label="利用会社/組織"
                      variant="underlined"
                      density="compact"
                    />
                  </v-col>
                  <v-col cols="2">
                    <vc-input
                      label="利用者"
                      variant="underlined"
                      density="compact"
                    />
                  </v-col>
                  <v-col cols="2">
                    <div class="d-flex align-center">
                      <vc-select
                        label="問合せ種別"
                        v-model="searchState_application.request_type"
                        :items="listAssetType"
                        item-title="text"
                        item-value="value"
                        density="compact"
                        style="width: 200px"
                      />
                    </div>
                  </v-col>
                  <v-col cols="1">
                    <div class="d-flex align-center">
                      <v-btn color="#97E4FF" class="ml-3">問合せ検索</v-btn>
                    </div>
                  </v-col>
                  <v-col cols="1">
                    <div class="d-flex align-center">
                      <v-btn color="#97E4FF" class="ml-3" v-on:click="ClickHelpdeskModal"
                        >新規問合せ</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <vc-input
                label="資産ID"
                variant="underlined"
                density="compact"
              />
            </v-col>
            <v-col cols="2">
              <v-btn color="#97E4FF">資産表示</v-btn>
            </v-col>
          </v-row>
        </v-container>  
        <v-container>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title
                color="#97E4FF"
                expand-icon="mdi-plus"
                collapse-icon="mdi-minus"
                expanded="true"
              >
                利用者資産
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-row>
                  <v-col cols="6" align-self="center">
                    <v-row no-gutters class="align-center">
                      <v-btn icon="mdi-reload" size="small" />
                    </v-row>
                  </v-col>
                </v-row>
                <CommonTable
                  v-on:click-detail="onDetailClick"
                  :column-attrs="tableState.tableAttrs"
                  :data="tableState.data"
                  :total="tableState.total"
                  @page="onPage"
                  v-on:add-new-item="onClickAddNewItem"
                  v-model:pageSize="searchState.pageSize"
                  v-model:pageNum="searchState.pageNum"
                  @refresh-data="onRefreshData"
                  show-data-manipulate-column
                  hide-pagination
                >
                  <template v-slot:selectHeader></template>
                  <template v-slot:selectMenu>
                    <div class="d-flex align-center">
                      <div class="pr-2 pt-6">
                        <vc-select
                          label="問合せ種別"
                          density="compact"
                          v-model="searchState_application.request_type2"
                          :items="listAssetType"
                          item-title="text"
                          item-value="value"
                          class="table-submit-elements"
                          style="min-width: 160px; max-width: 160px"
                        >
                        </vc-select>
                      </div>
                      <div class="pr-2">
                        <v-btn>問合せ履歴</v-btn>
                      </div>
                      <div>
                        <v-btn @click="ClickHelpdeskModal">新規問合せ</v-btn>
                      </div>
                    </div>
                  </template>
                </CommonTable>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-expansion-panels class="mt-8">
            <v-expansion-panel>
              <v-expansion-panel-title
                expand-icon="mdi-plus"
                collapse-icon="mdi-minus"
                expanded="true"
                color="#97E4FF"
              >問合せ/メッセージ履歴
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-row>
                  <v-col cols="6" align-self="center">
                    <v-row no-gutters class="align-center">
                      <v-btn icon="mdi-reload" size="small" />
                    </v-row>
                  </v-col>
                </v-row>
                <CommonTable
                  v-on:click-detail="onDetailClick"
                  :column-attrs="tableMessageHistoryState.tableAttrs"
                  :data="tableMessageHistoryState.data"
                  :total="tableMessageHistoryState.total"
                  @page="onPage"
                  v-on:add-new-item="onClickAddNewItem"
                  v-model:pageSize="searchState.pageSize"
                  v-model:pageNum="searchState.pageNum"
                  @refresh-data="onRefreshData"
                  show-data-manipulate-column
                >
                  <template v-slot:selectHeader></template>
                  <template v-slot:selectMenu>
                    <div class="d-flex align-center">
                      <div>
                        <v-btn @click="ClickHelpdeskModal">詳細</v-btn>
                      </div>
                    </div>
                  </template>
                </CommonTable>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
      </template>

      <template v-slot:content2>
        <v-container>
          <v-row>
            <v-col>
              <v-form>
                <v-row>
                  <v-col cols="2">
                    <vc-input
                      label="利用会社/組織"
                      variant="underlined"
                      hide-details
                      density="compact"
                    />
                  </v-col>
                  <v-col cols="2">
                    <vc-input
                      label="利用者"
                      variant="underlined"
                      density="compact"
                    />
                  </v-col>
                  <v-col cols="1">
                    <div class="d-flex align-center">
                      <v-btn color="#97E4FF" class="ml-3">申請履歴</v-btn>
                    </div>
                  </v-col>
                  <v-col cols="1">  
                    <div class="d-flex align-center">
                      <v-btn color="#97E4FF" class="ml-3" @click="ClickUserportalModal"
                        >代行申請</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <vc-input
                label="資産ID"
                variant="underlined"
                density="compact"
              />
            </v-col>
            <v-col cols="2">
              <v-btn color="#97E4FF">資産表示</v-btn>
            </v-col>
          </v-row>
        </v-container>
        
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title
          expand-icon="mdi-plus"
          collapse-icon="mdi-minus"
          expanded="true"
          color="#97E4FF"
        >
          利用者資産
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="6" align-self="center">
              <v-row no-gutters class="align-center">
                <v-btn icon="mdi-reload" size="small" />
              </v-row>
            </v-col>
          </v-row>
          <CommonTable
            v-on:click-detail="onDetailClick"
            :column-attrs="tableState.tableAttrs"
            :data="tableState.data"
            :total="tableState.total"
            @page="onPage"
            v-on:add-new-item="onClickAddNewItem"
            v-model:pageSize="searchState.pageSize"
            v-model:pageNum="searchState.pageNum"
            @refresh-data="onRefreshData"
            show-data-manipulate-column
            hide-pagination
          >
            <template v-slot:selectHeader></template>
            <template v-slot:selectMenu>
              <div class="d-flex align-center">
                <div class="pr-2">
                  <v-btn>申請履歴</v-btn>
                </div>
                <div>
                  <v-btn @click="ClickUserportalModal">代行申請</v-btn>
                </div>
              </div>
            </template>
          </CommonTable>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-expansion-panels class="mt-8">
      <v-expansion-panel>
        <v-expansion-panel-title
          expand-icon="mdi-plus"
          collapse-icon="mdi-minus"
          expanded="true"
          color="#97E4FF"
        >申請履歴
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="6" align-self="center">
              <v-row no-gutters class="align-center">
                <v-btn icon="mdi-reload" size="small" />
              </v-row>
            </v-col>
          </v-row>
          <CommonTable
            v-on:click-detail="onDetailClick"
            :column-attrs="tableState.tableAttrs"
            :data="tableState.data"
            :total="tableState.total"
            @page="onPage"
            v-on:add-new-item="onClickAddNewItem"
            v-model:pageSize="searchState.pageSize"
            v-model:pageNum="searchState.pageNum"
            @refresh-data="onRefreshData"
            show-submit-column
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
      </template>
    </CommonTabs>
  </v-container>
  <v-dialog v-model="userportalModalState.open">
    <UserPortalDetail v-on:clickUserportalModal="onClickUserportalModal"/>
  </v-dialog>
  <v-dialog v-model="helpdeskModalState.open">
    <HelpDeskDetail v-on:clickHelpdeskModal="onClickHelpdeskModal" />
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import CommonTable from "@/components/common-custom-table-simple/index.vue";
import ColumnAttributes from "@/models/column-attributes.model";
import AppConstants from "@/constants/constants";
//import { Helpdeskservice } from "@/services/userrequest.service";
import HelpDeskDetail from "@/components/modal/HelpDeskModal.vue"; 
import HelpdeskInformation from "@/models/userportal-request-information";
import CommonTabs from "@/components/common-tabs-simple/index.vue";
import UserPortalDetail from "@/components/modal/UserPortalDetail.vue";

//ユーザーポータル問い合わせダイアログ
const userportalModalState = reactive({ open: false });
const onClickUserportalModal = () => {
  userportalModalState.open = false;
}
const ClickUserportalModal = () => {
  userportalModalState.open = true;
};

//問合せ種類セレクト
let listAssetType = ref<any[]>([
  { value: 0, text: '全て' },
  { value: 1, text: '未完了' },
  { value: 2, text: 'メッセージ' },
])
//問合せタイプセレクト
let listAssetType2 = ref<any[]>([
  { value: 0, text: '全て' },
  { value: 1, text: '未完了' },
])

//タブメニュー
const tabDetails = [
  { tabName: "受付（問合せ）", slot: "content1" },
  { tabName: "受付（利用申請もしくは代行申請）", slot: "content2" },
];

//ヘルプデスク問い合わせダイアログ
const helpdeskModalState = reactive({ open: false });
const onClickHelpdeskModal = () => {
  helpdeskModalState.open = false;
};
const ClickHelpdeskModal = () => {
  helpdeskModalState.open = true;
};
const dialogState = reactive({
  open: false,
});

//型定義
let searchState = reactive({
  kittingId: undefined,
  kittingName: undefined,
  deletedRecordDisplayMode: 0,
  pageNum: 1,
  pageSize: 10,
});


//資産検索結果テーブルのヘッダー
const tableState = reactive({
  tableAttrs: {
    labels: [
      "資産ステータス",
      "資産ID",
      "資産名称",
      "利用組織",
      "利用者",
      "利用開始日",
    ],
    fields: [
      "asset_status",
      "asset_id",
      "asset_name",
      "group_name",
      "account_name",
      "use_on_from",
    ],
    clickableColumn: [true],
    columnsWidth: [120, 100, 300, 200, 100, 100],
  } as ColumnAttributes,
  data: [
    {
      organization_name: "string",
      account_name: "string",
      use_on_from: "string",
      asset_name: "string",
      asset_id: "never",
      asset_status: "string",
      application_state: "string",
      substitute_stete: "string",
      application_id: "never",
      application_kinds: "string",
      application_menu: "string",
      application_from: "string",
      request_completion_date: "string",
      change_organization: "string",
      change_account: "string",
      remarks: "string",
      message: "string",
    },
    {
      organization_name: "string",
      account_name: "string",
      use_on_from: "string",
      asset_name: "string",
      asset_id: "never",
      asset_status: "string",
      application_state: "string",
      substitute_stete: "string",
      application_id: "never",
      application_kinds: "string",
      application_menu: "string",
      application_from: "string",
      request_completion_date: "string",
      change_organization: "string",
      change_account: "string",
      remarks: "string",
      message: "string",
    },
  ],
  total: 0,
});

//履歴/メッセージ検索結果テーブルのヘッダー
const tableMessageHistoryState = reactive({
  tableAttrs: {
    labels: [
      "問合せ種別",
      "履歴/メッセージID",
      "登録日",
      "完了日",
      "利用者",
      "資産ID",
      "タイトル",
      "応対担当者",
    ],
    fields: [
      "asset_status",
      "asset_id",
      "asset_name",
      "group_name",
      "account_name",
      "use_on_from",
      "account_name",
      "use_on_from",
    ],
    clickableColumn: [true],
    columnsWidth: [100, 120, 100, 100, 120, 100, 300, 100],
  } as ColumnAttributes,
  data: [
    {
      organization_name: "string",
      account_name: "string",
      use_on_from: "string",
      asset_name: "string",
      asset_id: "never",
      asset_status: "string",
      application_state: "string",
      substitute_stete: "string",
      application_id: "never",
      application_kinds: "string",
      application_menu: "string",
      application_from: "string",
      request_completion_date: "string",
      change_organization: "string",
      change_account: "string",
      remarks: "string",
      message: "string",
    },
    {
      organization_name: "string",
      account_name: "string",
      use_on_from: "string",
      asset_name: "string",
      asset_id: "never",
      asset_status: "string",
      application_state: "string",
      substitute_stete: "string",
      application_id: "never",
      application_kinds: "string",
      application_menu: "string",
      application_from: "string",
      request_completion_date: "string",
      change_organization: "string",
      change_account: "string",
      remarks: "string",
      message: "string",
    },
  ],
  total: 0,
});

//型定義
let searchState_application = reactive({
  application_state: undefined,
  asset_status: undefined,
  asset_id: undefined,
  asset_name: undefined,
  organization_name: undefined,
  account_name: undefined,
  use_on_from: undefined,
  request_type: undefined,
  request_type2: undefined,
  deletedRecordDisplayMode: 0,
  pageNum: 1,
  pageSize: 10,
});

//型定義
let helpdeskInformation = ref({
  organization_name: undefined,
  account_name: undefined,
  use_on_from: undefined,
  asset_name: undefined,
  asset_id: undefined,
  asset_status: undefined,
  application_state: undefined,
  substitute_stete: undefined,
  application_id: undefined,
  application_kinds: undefined,
  application_menu: undefined,
  application_from: undefined,
  request_completion_date: undefined,
  change_organization: undefined,
  change_account: undefined,
  remarks: undefined,
  message: undefined,
} as unknown as HelpdeskInformation);

//？？？
onMounted(() => {
  // call api to get data
  gethelpdeskList();
});

//検索？
const gethelpdeskList = async () => {
  try {
    const response = await Helpdeskservice.gethelpdeskList(
      searchState_application
    );
    tableState.data = response.msthelpdesk;
    tableState.total = response.total;
  } finally {
    // TODO on/off loading flag
  }
};

//ページ移動？
const onClickSearch = async () => {
  searchState_application.pageNum = 1;
  gethelpdeskList();
};

//クリアボタン
const onClickClear = () => {
  searchState_application.organization_name = undefined;
  searchState_application.account_name = undefined;
  searchState_application.deletedRecordDisplayMode = 0;
};

//再読み込みボタン
const onRefreshData = () => gethelpdeskList();

//新規ボタン
const onClickAddNewItem = () => {
  helpdeskInformation.value = {
    area: AppConstants.DEFAULT_SELECTED_AREA,
    prefCode: AppConstants.DEFAULT_SELECTED_PREF_CODE,
  } as unknown as HelpdeskInformation;
  dialogState.open = true;
};

//保存ボタン
const onClickSaveOrUpdateItem = async () => {
  await Helpdeskservice.saveOrUpdatehelpdeskData(helpdeskInformation.value);
  await gethelpdeskList();
  dialogState.open = false;
};

//削除ボタン
const handleDeleteItem = async () => {
  if (!helpdeskInformation.value.organization_name) {
    return;
  }

  if (confirm("Are you sure to delete?")) {
    await Helpdeskservice.deleteById(helpdeskInformation.value.asset_id);
    await gethelpdeskList();
    dialogState.open = false;
  }
};

//???
const onDetailClick = async (kittingId: number) => {
  try {
    const response = await Helpdeskservice.gethelpdeskById();
    helpdeskInformation.value = response;
    dialogState.open = true;
  } finally {
  }
};

const onPage = () => gethelpdeskList();

//ボタン非活性
const newbtn = () => false;
const reloadicon = () => false;
const tabitem = () => false;
</script>

<style lang="scss"></style>
