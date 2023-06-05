<template>
  <v-card>
    <v-container>
      <p>ヘルプデスク管理 > 各種申請詳細</p>
      <v-row class="justify-end">
        <v-col cols="1">
          <v-btn color="#E0E0E0" v-on:click="$emit('ClickHelpdeskModal')">戻る</v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn color="#97E4FF" v-on:click="ClickHelpdeskModal">追加</v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn color="#97E4FF" v-on:click="ClickHelpdeskModal">更新</v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn color="#97E4FF" v-on:click="ClickHelpdeskModal">削除</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <h4>登録</h4>
          <v-row>
            <v-col cols="6">
              <dev class="form-input">
                <v-text-field
                  label="日時"
                  class="pt-0 form-selection"
                  density="compact"
                  hide-details
                  variant="underlined"
                ></v-text-field>
              </dev>
            </v-col>
            <v-col cols="6">
              <dev class="form-input">
                <v-text-field
                  label="登録者"
                  class="pt-0 form-selection"
                  density="compact"
                  hide-details
                  variant="underlined"
                ></v-text-field>
                </dev>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="3">
          <h4>最終更新</h4>
          <v-row>
            <v-col cols="6">
              <dev class="form-input">
                <v-text-field
                  label="日時"
                  class="pt-0 form-selection"
                  density="compact"
                  hide-details
                  variant="underlined"
                ></v-text-field>
              </dev>
            </v-col>
            <v-col cols="6">
              <dev class="form-input">
                <v-text-field
                  label="登録者"
                  class="pt-0 form-selection"
                  density="compact"
                  hide-details
                  variant="underlined"
                ></v-text-field>
              </dev>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="3">
          <h4>削除</h4>
          <v-row>
            <v-col cols="6">
              <dev class="form-input">
                <v-text-field
                  label="日時"
                  class="pt-0 form-selection"
                  density="compact"
                  hide-details
                  variant="underlined"
                ></v-text-field>
              </dev>
            </v-col>
            <v-col cols="6">
              <dev class="form-input">
                <v-text-field
                  label="登録者"
                  class="pt-0 form-selection"
                  density="compact"
                  hide-details
                  variant="underlined"
                ></v-text-field>
              </dev>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <!--申請対象資産-->
    <v-container>
      <v-card>
        <v-container>
          <v-row>
            <v-col>
              <h4>利用者</h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-select
                    label="利用会社/組織/拠点"
                    variant="underlined"
                    density="comfortable" 
                    :items="['分類1', '分類2']"
                    class="table-submit-elements"
                    style="min-width: 160px; max-width: 220px"
                  >
                  </v-select>
            </v-col>
            <v-col cols="2">
              <dev class="form-input">
                <v-text-field
                  v-model="searchState_application.application_state"
                  class="pt-0 form-selection"
                  density="compact"
                  hide-details
                  variant="underlined"
                  label="利用者状況"
                ></v-text-field>
              </dev>
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row>
            <v-col>
              <h4>対象資産</h4>
            </v-col>
          </v-row>
          <CommonTable
            :column-attrs="tableAssetState.tableAttrs"
            :data="tableAssetState.data"
            :total="tableAssetState.total"
            v-model:pageSize="searchState.pageSize"
            v-model:pageNum="searchState.pageNum"
            hide-pagination
          />
        </v-container>
      </v-card>
    </v-container>

    <v-container>
      <v-card>
        <v-container>
          <v-row>
            <v-col>
              <h4>問合せ詳細</h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <dev class="form-input">
                <v-text-field
                  v-model="searchState_application.application_state"
                  class="pt-0 form-selection"
                  density="compact"
                  hide-details
                  variant="underlined"
                  label="タイトル"
                ></v-text-field>
              </dev>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <vc-select label="問合せ種別" density="compact" />
            </v-col>
            <v-col cols="2">
              <vc-input-date
                label="初回問合せ日"
                v-model="application_menu"
              ></vc-input-date>
            </v-col>
            <v-col cols="2">
              <div class="form-input">
                <vc-input-date
                  label="完了日"
                  v-model="application_menu"
                ></vc-input-date>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-textarea label="対応内容"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h5>ダイレクトメッセージ</h5>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <vc-input
                v-model="searchState_application.application_state"
                density="compact"
                variant="underlined"
                label="タイトル"
              ></vc-input>
            </v-col>
            <v-spacer/>
            <v-col cols="2">
              <v-btn
              color="#97E4FF"
              >送信</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea label="メッセージ内容"></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>

    <!--代替手配資産-->
  </v-card>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import vcInputDate from "../commons/vc-input-date.vue";
import CommonTable from "@/components/common-custom-table-simple/index.vue";
import ColumnAttributes from "@/models/column-attributes.model";
import HelpdeskInformation from "@/models/userportal-request-information";

//カレンダー
const application_menu = document.querySelector('input[type="date"]');
const request_completion_date = document.querySelector('input[type="date"]');
//ダイアログ処理 
const dialogListItem = ref(false);

//対象資産のテーブル
const tableAssetState = reactive({
  tableAttrs: {
    labels: [
      "資産ステータス",
      "資産ID",
      "資産名称",
      "利用組織",
      "利用者",
      "利用開始日",
      "資産開始日",
      "資産終了日",
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
    ],
    clickableColumn: [true],
    columnsWidth: [120, 100, 300, 200, 100, 100, 100, 100],
  } as ColumnAttributes,
  data: [] as HelpdeskInformation[],
  total: 0,
});

//対象資産のテーブル
const tableIncidentState = reactive({
  tableAttrs: {
    labels: [
      "申請メニュー",
      "申請日",
      "申請者",
      "資産ID",
      "資産名称",
      "申請補足情報",
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
    columnsWidth: [120, 100, 300, 200, 100, 100, 100],
  } as ColumnAttributes,
  data: [] as HelpdeskInformation[],
  total: 0,
});

//未使用
let searchState = reactive({
  organization_name: undefined,
  account_name: undefined,
  use_on_from: undefined,
  asset_name: undefined,
  asset_id: undefined,
  asset_status: undefined,
  pageNum: 1,
  pageSize: 10,
});

//申請対象資産
let searchState_application = reactive({
  application_state: undefined,
  asset_status: undefined,
  asset_id: undefined,
  asset_name: undefined,
  organization_name: undefined,
  account_name: undefined,
  use_on_from: undefined,
});

//代替え手配資産
let searchState_substitute = reactive({
  substitute_stete: undefined,
  application_state: undefined,
  asset_status: undefined,
  asset_id: undefined,
  asset_name: undefined,
  organization_name: undefined,
  account_name: undefined,
  use_on_from: undefined,
});

//申請詳細
let searchState_application_detail = reactive({
  application_id: undefined,
  application_kinds: undefined,
  application_menu: undefined,
  application_from: undefined,
  request_completion_date: undefined,
  change_organization: undefined,
  change_account: undefined,
  remarks: undefined,
});
//申請ボタン処理

//プルダウンの内容
const user = ref<any[]>([
  { value: "1", text: "田中太郎" },
  { value: "2", text: "山田太郎" },
  { value: "3", text: "佐藤太郎" },
]);
const company = ref<any[]>([
  { value: "1", text: "会社" },
  { value: "2", text: "組織" },
  { value: "3", text: "拠点" },
]);
const aset = ref<any[]>([
  { value: "1", text: "資産" },
  { value: "2", text: "ｸﾗｳﾄﾞﾗｲｾﾝｽ" },
]);

interface Emits {
  (event: "clickHelpdeskModal"): void;
}
const emit = defineEmits<Emits>();
const ClickHelpdeskModal = (): void => {
  emit("clickHelpdeskModal");
};
</script>

<style scoped></style>
