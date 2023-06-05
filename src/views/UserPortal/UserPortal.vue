<template>
  <v-container>
    {{ $attrs.name }}
  </v-container>
  <v-container>
    <v-btn 
      variant="tonal" 
      elevation="1" 
      v-on:click="ClickHelpModal"
      >ヘルプデスク問合せ</v-btn
    >
    <v-dialog v-model="helpModalState.open">
      <v-card>
        <h4>ヘルプデスク（連絡先、方法と入口）への静的モーダル表示</h4>
      </v-card>
    </v-dialog>
  </v-container>
  <v-container>
    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <h4>運用担当からのメッセージ</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-table :fixed-header="true" class="lcm-table">
              <thead>
                <tr>
                  <th
                    v-for="(header, index) of messageTableState.tableAttrs
                      .labels"
                    class="text-left border-table"
                    :style="{
                      minWidth: `${messageTableState.tableAttrs.columnsWidth[index]}px`,
                      maxWidth: `${messageTableState.tableAttrs.columnsWidth[index]}px`,
                    }"
                  >
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-if="messageTableState.data.length !== 0"
                  v-for="item in messageTableState.data"
                >
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr v-else>
                  <td :colspan="messageTableState.tableAttrs.labels.length">
                    EMPTY DATA
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
  <v-container>
    <CommonTabs
      :tab-details="tabDetails"
      v-on:search="onClickSearch"
      v-on:clear="onClickClear"
      v-model:deleted-record-display-mode="searchState_application.deletedRecordDisplayMode"
    >
      <template v-slot:content1>
        <v-row>
          <v-col>
            <h4>検索条件</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-form>
              <v-row>
                <v-col cols="2">
                  <div class="form-input">
                    <vc-input
                      v-model="searchState_application.group_name"
                      label="会社/組織"
                      variant="underlined"
                      hide-details
                      density="compact"
                    />
                  </div>
                </v-col>
                <v-col cols="2">
                  <div class="form-input">
                    <vc-input
                      v-model="searchState_application.account_name"
                      label="利用者"
                      variant="underlined"
                      hide-details
                      density="compact"
                    />
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn color="#97E4FF">検索</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </template>
      <template v-slot:content2>
        <v-row>
          <v-col>
            <h4>検索条件</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-form>
              <v-row>
                <v-col cols="2">
                  <div class="form-input">
                    <vc-input
                      v-model="searchState_application.group_name"
                      label="会社/組織"
                      variant="underlined"
                      hide-details
                      density="compact"
                    />
                  </div>
                </v-col>
                <v-col cols="2">
                  <div class="form-input">
                    <vc-input
                      v-model="searchState_application.account_name"
                      label="利用者"
                      variant="underlined"
                      hide-details
                      density="compact"
                    />
                  </div>
                </v-col>
                <v-col cols="2">
                  <vc-select
                    label="申請メニュー"
                    variant="underlined"
                    density="comfortable" 
                    v-model="searchState_application.request_menu1"
                    :items="listAssetType"
                    item-title="text"
                    item-value="value"
                    class="table-submit-elements"
                    style="min-width: 160px; max-width: 220px"
                  >
                  </vc-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn color="#97E4FF">検索</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </template>
    </CommonTabs>
  </v-container>
  <v-container>
    <CommonTable
      v-on:click-detail="onDetailClick"
      :column-attrs="tableState.tableAttrs"
      :data="tableState.data"
      :total="tableState.total"
      @page="onPage"
      v-model:pageSize="searchState_application.pageSize"
      v-model:pageNum="searchState_application.pageNum"
      @submit-request="onClickUserportalModal"
      showDataManipulateColumn
      hide-pagination
    >
      <template v-slot:selectHeader></template>
      <template v-slot:selectMenu>
        <div class="d-flex align-center">
          <div class="pr-2">
            <vc-select
              label="申請メニュー"
              v-model="searchState_application.request_menu2"
              density="compact"
              hide-details
              :items="listAssetType"
              item-title="text"
              item-value="value"
              class="table-submit-elements"
              style="min-width: 160px; max-width: 160px">
            </vc-select>
          </div>
          <div>
            <v-btn @click="ClickUserportalModal">申請</v-btn>
          </div>
        </div>
      </template>
    </CommonTable>
  </v-container>
  <v-dialog
    v-model="userportalModalState.open">
    <UserPortalDetail
    v-on:clickHelpdeskModal="onClickUserportalModal"/>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import CommonTabs from "@/components/common-tabs-simple/index.vue";
import CommonTable from "@/components/custom-table/index.vue";
import ColumnAttributes from "@/models/column-attributes.model";
import ContractorInformationForm from "@/components/form-component/kitting-information-form-component.vue";
import AppConstants from "@/constants/constants";
import UserPortalDetail from "@/components/modal/UserPortalDetail.vue";
import AssetManagement from "@/models/AssetManagement";
import AssetManagementService from "@/services/asset.service";
import userrequestInformation from "@/models/userportal-request-information";

//申請menuセレクト
let listAssetType = ref<any[]>([
  { value: 0, text: '利用登録' },
  { value: 1, text: '返却申請' },
  { value: 2, text: '利用者変更申請' },
  { value: 3, text: '修理交換申請' },
  { value: 4, text: '発送済申請' }]
)

//ユーザーポータル問い合わせダイアログ
const userportalModalState = reactive({ open: false });
const onClickUserportalModal = () => {
  userportalModalState.open = false;
}
const ClickUserportalModal = () => {
  userportalModalState.open = true;
};
//申請ダイアログ
const helpModalState = reactive({ open: false });
const ClickHelpModal = () => {
  helpModalState.open = true;
};
const dialogState = reactive({
  open: false,
});
//タブメニュー
const tabDetails = [
  { tabName: "利用中資産", slot: "content1" },
  { tabName: "申請履歴", slot: "content2" },
] 

//運用担当からのメッセージ枠
const messageTableState = reactive({
  tableAttrs: {
    labels: ["年月日", "発信者", "メッセージ"],
    fields: ["use_on_from", "account_name", "message"],
    clickableColumn: [true],
    columnsWidth: [50, 50, 100],
  } as ColumnAttributes,
  data: [{ request_id: 1, message: "" }],
  total: 0,
});

//検索結果テーブルのヘッダー
const tableState = reactive({
  tableAttrs: {
    labels: [
      "資産ステータス",
      "資産ID",
      "資産名称",
      "利用組織",
      "利用者",
      "利用開始日",
      "資産終了日",
    ],
    fields: [
      "asset_status",
      "asset_id",
      "asset_name",
      "group_name",
      "account_name",
      "use_on_from",
      "asset_to"
    ],
    clickableColumn: [true],
    columnsWidth: [120, 100, 300, 200, 100, 100, 100],
  } as ColumnAttributes,
  datas: reactive([]),
  data: [
    {
      asset_status: "string",
      asset_id: "string",
      asset_name: "string",
      group_name: "string",
      account_name: "string",
      use_on_from: "string",
      asset_to: "string",
    },
  ],
  total: 0,
});

//型定義
let searchState_application = reactive({
  asset_id: undefined,
  asset_status: undefined,
  group_name: undefined,
  asset_name: undefined,
  asset_to: undefined,
  account_name: undefined,
  use_on_from: undefined,
  request_menu1: {
    value: '0',
    text: '選択',
  },
  request_menu2: {
    value: '0',
    text: '選択',
  },
  deletedRecordDisplayMode: 0,
  pageNum: 1,
  pageSize: 10,
});

/** 検索ボタン処理 */
const onClickSearch = () => {
  try{

} catch(error) {
  console.log(error);
}
}

/**
 * 申請ボタン
 */
const onDetailClick = () => {
  try{

  } catch(error) {
    console.log(error);
  }
}

/**
 * ページ移動でデータをロードする
 */
 const onPage = async () => {
  try {
    const response = await MakerService.getAll(dataSearch);
    state.dataTable = response.mstMakerMaster;
    state.total = response.total;
    await getPrefectureList();
  } catch(error) {
    console.log(error);
  }
}

</script>

<style lang="scss">
.lcm-table {
  table {
    thead {
      th {
        white-space: nowrap;
        font-size: small;
        
      }
    }
    tbody {
      td {
        background: #fff;
        font-size: small;
      }
    }
  }
}
.table-text-truncate {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.table-scroll {
  width: 100%;
  overflow: scroll;
  .v-table__wrapper {
    overflow-x: auto;
  }
  table {
    display: block;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      height: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background: #bbb;
    }
  }
  .v-field__input {
    white-space: nowrap;
    overflow: hidden;
  }
}

.table-scroll-right-fixed {
  position: sticky;
  right: 0;
  top: 0;
}

.pagination {
  position: relative;
  &_select {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
