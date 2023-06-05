<template>
    <v-card>
        <v-container>
            <p class="mb-6">ライフサイクル統合資産管理 > ライセンス利用詳細</p>
            <v-row>
                <v-col cols="4">
                    <p class="mb-15">ソフトウェア・クラウドライセンス</p>
                </v-col>
                <v-spacer/>
                <v-col>
                    <v-btn>戻る</v-btn>
                </v-col>
            </v-row>
            <CommonTable
                :column-attrs="tableState.tableAttrs"
                :data="tableState.data"
                :total="tableState.total"
                @page="onPage"
                show-data-manipulate-column
                hide-pagination/>
        </v-container>
        <v-container>
            <v-row no-gutters>
                <v-col cols="2">
                    <p>利用者</p>
                </v-col>
                <v-col cols="2">
                    利用数量
                </v-col>
                <!--利用数量を表示-->
                <v-col cols="1">
                    <v-input variant="underlined"></v-input>
                </v-col>
                <v-col cols="1">
                    <p>/</p>
                </v-col>
                <v-col cols="1">
                    <v-input variant="underlined"></v-input>
                </v-col>
                <v-spacer/>
                <v-col cols="1">
                    <v-btn>CSV出力</v-btn>
                </v-col>
            </v-row>
            <CommonTable
                :column-attrs="tableState2.tableAttrs"
                :data="tableState2.data"
                :total="tableState2.total"
                @page="onPage"
                show-data-manipulate-column
                hide-pagination/>
        </v-container>
    </v-card>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import CommonTable from "@/components/common-custom-table-simple/index.vue";
import ColumnAttributes from "@/models/column-attributes.model";

const tableState = reactive({
  tableAttrs: {
    labels: [
      "資産STS",
      "統合資産ID",
      "親資産ID",
      "資産名称",
      "品目ID",
      "タイプ",
      "資産区分",
      "調達ID",
      "入荷日",
      "利用者",
    ],
    fields: [
      "asset_status",
      "asset_id",
      "asset_name",
      "group_name",
      "account_name",
      "use_on_from",
      "asset_from",
      "asset_to",
      "asset_id",
      "asset_id",
    ],
    clickableColumn: [true],
    columnsWidth: [120, 100, 300, 200, 100, 100, 100, 100, 100],
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

  ] as HelpdeskInformation[],
  total: 0,
});

const tableState2 = reactive({
  tableAttrs: {
    labels: [
      "会社組織",
      "利用者ID",
      "利用者",
      "利用開始日",
    ],
    fields: [
      "asset_status",
      "asset_id",
      "asset_name",
      "group_name",
    ],
    clickableColumn: [true],
    columnsWidth: [120, 100, 300, 200],
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

  ] as HelpdeskInformation[],
  total: 0,
});
const onPage = () => gethelpdeskList();

</script>