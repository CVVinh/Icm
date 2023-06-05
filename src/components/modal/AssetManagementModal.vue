<template>
  <v-form ref="assetManagementForm" class="asset-modal">
    <v-container>
      <v-card elevation="5">
        <v-container class="basic-information">
          <h4>基本情報</h4>
          <br />
          <v-row class="asset-info">
            <v-col :cols="3">
              <vc-input label="資産名称" :readonly="true" :value="modelValue.assetNameKana"></vc-input>
            </v-col>
            <v-col class="asset-item-group py-0" :cols="3">
              <span class="text-link">資産減価償却</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span>資産状況</span>
            </v-col>
          </v-row>
          <v-row class="asset-info">
            <div class="asset-info-status">
              <div class="asset-info-status-above">
                <span>在庫</span>
                <span class="asset-status">年月日</span>
              </div>
              <div class="asset-info-status-above">
                <span></span>
                <span class="asset-status">担当者</span>
              </div>
            </div>
            <div class="asset-info-status-blue-light">
              <div class="asset-info-status-above">
                <span>出荷受付</span>
                <span class="asset-status">年月日</span>
              </div>
              <div class="asset-info-status-above">
                <span class="text-link">詳細</span>
                <span class="asset-status">担当者</span>
              </div>
            </div>
            <div class="asset-info-status-blue-light">
              <div class="asset-info-status-above">
                <span>在庫</span>
                <span class="asset-status">年月日</span>
              </div>
              <div class="asset-info-status-above">
                <span class="text-link">詳細</span>
                <span class="asset-status">担当者</span>
              </div>
            </div>
            <div class="asset-info-status-blue-light">
              <div class="asset-info-status-above">
                <span>在庫</span>
                <span class="asset-status">年月日</span>
              </div>
              <div class="asset-info-status-above">
                <span class="text-link">詳細</span>
                <span class="asset-status">担当者</span>
              </div>
            </div>
            <div class="asset-info-status-blue-light">
              <div class="asset-info-status-above">
                <span>在庫</span>
                <span class="asset-status">年月日</span>
              </div>
              <div class="asset-info-status-above">
                <span class="text-link">詳細</span>
                <span class="asset-status">担当者</span>
              </div>
            </div>
            <div class="asset-info-status-blue-light">
              <div class="asset-info-status-above">
                <span>在庫</span>
                <span class="asset-status">年月日</span>
              </div>
              <div class="asset-info-status-above">
                <span class="text-link">詳細</span>
                <span class="asset-status">担当者</span>
              </div>
            </div>
            <div class="asset-info-status-blue-light">
              <div class="asset-info-status-above">
                <span>在庫</span>
                <span class="asset-status">年月日</span>
              </div>
              <div class="asset-info-status-above">
                <span class="text-link">詳細</span>
                <span class="asset-status">担当者</span>
              </div>
            </div>
          </v-row>
          <v-row>
            <v-container class="asset-info-form mt-5">
              <v-form>
                <v-row>
                  <v-col :cols="2">
                    <vc-input label="資産ステータス" :value="displayAssetType ? displayAssetStatus.title : ''" :readonly="true"></vc-input>
                  </v-col>
                  <v-col :cols="2">
                    <vc-input label="資産ID" :readonly="true" :value="modelValue.assetId"></vc-input>
                  </v-col>
                  <v-col :cols="2">
                    <vc-input label="資産タイプ" :readonly="true" :value="modelValue.assetKind"></vc-input>
                  </v-col>
                  <v-col :cols="2">
                    <vc-input label="資産区分" :readonly="true" :value="displayAssetType ? displayAssetType.title : ''"></vc-input>
                  </v-col>
                  <v-col :cols="2">
                    <vc-input label="キッティングマスター" :readonly="true"></vc-input>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col :cols="2">
                    <vc-input label="期間(開始)" :readonly="true" :value="modelValue.assetTo"></vc-input>
                  </v-col>
                  <v-col :cols="2">
                    <vc-input label="期間(終了)" :readonly="true"></vc-input>
                  </v-col>
                  <v-col :cols="2">
                    <vc-input label="資産登録日" :readonly="true"></vc-input>
                  </v-col>
                  <v-col :cols="2">
                    <vc-input label="資産廃棄日(利用期間終了日)" :readonly="true"></vc-input>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col :cols="2">
                    <vc-input label="シリアルナンバー" :readonly="true" :value="modelValue.item?.serialNumber"></vc-input>
                  </v-col>
                  <v-col :cols="2">
                    <vc-input label="JANコード" :readonly="true" :value="modelValue.item?.janCode"></vc-input>
                  </v-col>
                  <v-col :cols="2">
                    <vc-input label="メーカー名称" :readonly="true" :value="makerMaster.makerName"></vc-input>
                  </v-col>
                  <v-col :cols="2">
                    <vc-input label="メーカー型番" :readonly="true" :value="modelValue.item?.makerModel"></vc-input>
                  </v-col>
                  <v-col :cols="2">
                    <vc-input label="OS" :readonly="true" :value="AppConstants.OS.find((status) => modelValue.item?.osId === status.value)?.title"></vc-input>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col :cols="2">
                      <vc-input label="発注ID" :readonly="true" :value="modelValue.procument?.procurementId"></vc-input>
                  </v-col>
                  <v-col :cols="3">
                      <vc-input label="発注名称" :readonly="true" :value="modelValue.procument?.procurementName"></vc-input>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
    <v-container>
      <ExpansionPanelsComponent :expansion-panels="expansionPanels">
        <template #content(containerPC)>
          <v-row>
            <v-container class="asset-info-form">
              <v-form>
                <v-row>
                  <CustomTableMultiple
                    :asset-info="modelValue"
                    :genCodeList="genCodeList"
                    :show-select-asset-btn="false"
                    :show-edit-asset-item-btn="false"
                  >
                  </CustomTableMultiple>
                </v-row>
              </v-form>
            </v-container>
          </v-row>
        </template>
        <template #content(userInformation)>
          <v-row>
            <v-container class="asset-info-form">
              <v-form>
                <v-row>
                  <v-col class="asset-item-group" :cols="2">
                    <div class="asset-item">
                      <span class="asset-item-label">利用会社/組織</span>
                      <vc-input :readonly="true"></vc-input>
                    </div>
                  </v-col>
                  <v-col class="asset-item-group" :cols="2">
                    <div class="asset-item">
                      <span class="asset-item-label">利用者</span>
                      <vc-input :readonly="true"></vc-input>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-container>
                    <div style="width: 100%" class="table-data-user table-data-user-child">
                      <v-table :fixed-header="true" density="compact" :style="{ width: `${1100}px` }">
                        <thead>
                          <tr>
                            <th v-for="(header, index) of state.tableAttrsUser.labels" class="text-left"
                              :style="{ width: `${state.tableAttrsUser.columnsWidth[index]}px` }">
                              {{ header }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, idx) in state.dataTableUser">
                            <td>{{ idx === 0 ? '利用者履歴' : '' }}</td>
                            <td v-for="(field, index) in state.tableAttrsUser.fields" class="border-table"
                              :style="{ width: `${state.tableAttrsUser.columnsWidth[index]}px`, textDecoration: state.tableAttrsUser.columnsWidth[index] ? 'underline' : '', cursor: state.tableAttrsUser.clickableColumn[index] ? 'pointer' : '', color: state.tableAttrsUser.clickableColumn[index] ? 'blue' : '' }"
                              @click="state.tableAttrsUser.columnsWidth[index]"
                            >
                              {{ item[field] }}
                            </td>
                          </tr>
                          <tr v-if="!state.dataTableUser || state.dataTableUser.length === 0">
                            <td>利用者履歴</td>
                            <td :colspan="state.tableAttrsUser.labels.length" class="text-center border-table">
                              EMPTY DATA
                            </td>
                          </tr>
                        </tbody>
                      </v-table>
                    </div>
                  </v-container>
                </v-row>
              </v-form>
            </v-container>
          </v-row>
        </template>
        <template #content(transfer)>
          <v-row>
            <v-container class="asset-info-form">
              <v-form>
                <v-row justify="center">
                  <v-col :cols="10">
                    <v-textarea rows="3" variant="outlined"></v-textarea>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-row>
        </template>
      </ExpansionPanelsComponent>
    </v-container>
  </v-form>
</template>
<script setup lang="ts">
import AssetManagement from '@/models/AssetManagement';
import { computed, onMounted, PropType, reactive } from 'vue';
import AppConstants from '@/constants/constants';
import ColumnAttributes from '@/models/column-attributes.model';
import ExpansionPanelsComponent from '../commons/expansion-panels-component.vue';
import ExpansionPanel from '@/models/ExpansionPanel';
import MakerMaster from '@/models/MakerMaster';
import CustomTableMultiple from '@/components/content-asset-shipment-modal/custom-table-multiple/index.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<AssetManagement>,
    default: null,
    required: true
  },
  makerMaster: {
    type: Object as PropType<MakerMaster>,
    required: true
  },
  statusAssetList: {
    type: Array,
    default: [],
  },
  typeAssetList: {
    type: Array,
    default: [],
  },
  genCodeList: {
    type: Array,
    default: []
  }
});
const state = reactive({
  tableAttrsUser: {
    labels: ["", "利用開始日", "利用終了日", "利用会社/組織", "利用者"],
    fields: ["useStartDate", "useEndDate", "userCompany", "user"],
    clickableColumn: [false, false, false, true],
    columnsWidth: [120],
  } as ColumnAttributes,
  dataTableUser: [] as Array<any>,
});
const expansionPanels: ExpansionPanel[] = [
  {
    panelTitle: "PCセット資産・ライセンス情報",
    panelContent: "containerPC"
  },
  {
    panelTitle: "利用者情報",
    panelContent: 'userInformation'
  },
  {
    panelTitle: "申し送り",
    panelContent: 'transfer'
  }
];

const displayAssetStatus: any = computed(() => props.statusAssetList.find((status: any) => props.modelValue.assetStatus === status.value));
const displayAssetType: any = computed(() => props.typeAssetList.find((type: any) => props.modelValue.assetStatus === type.value));

</script>
<style scoped lang="scss">
.asset-modal {

  :deep(.v-expansion-panel-text) {
    height: 350px;
  }
  .asset-info {
    display: flex;
    align-items: center;
    padding: 0px 4px;

    &-status,
    &-status-blue-light {
      border: 1px solid black;
      padding: 0px 4px 0px 4px;
      width: 150px;
      flex: 1 1;

      &:first-of-type {
        margin-left: 12px;
      }

      &-above {
        display: flex;
        justify-content: space-between;
        margin-top: 0px;

        .asset-status {
          display: flex;
          justify-content: flex-end;
        }
      }
    }

    &-status {
      color: white;
      background-color: #4472C4;
    }

    &-status-blue-light {
      background-color: #D9E1F2;
      color: black;
      border-left: none;
    }

    &-form {
      .table-data-user {
        width: 100%;
        display: flex;
        justify-content: center;
        border-bottom: none;
        border-collapse: unset;

        &-child {
          :deep(.v-table__wrapper) {
            max-height: 130px;
            overflow-y: auto;
          }
        }

        thead {
          tr {
            &:last-child {
              th {
                border-bottom: none;
              }
            }

            th {
              box-shadow: none;
            }

            .text-left {
              padding-left: 5px;
            }
          }
        }

        tr {
          &:first-of-type {

            .border-table,
            .cell-button-child-asset {
              border-top: 1px solid black;
            }
          }

          &:last-of-type {

            .border-table,
            .cell-button-child-asset {
              border-bottom: 1px solid black;
            }
          }

          .border-table {
            border: 0.5px solid black;

            &:first-child {
              border-left: 1px solid black;
            }

            &:last-of-type {
              border-right: 1px solid black;
            }
          }
        }

        tbody {
          tr {
            td {
              border-bottom: none;
              box-shadow: none;
            }

            .border-table {
              border-left: 1px solid black;
              border-right: 0px;
            }
          }
        }
      }
    }

    .text-link {
      text-decoration: underline;
      cursor: pointer;
      color: #97E4FF;
      display: flex;
      align-items: flex-end;
      white-space: nowrap;
    }
  }

  .v-row {
    .asset-item-group {
      display: flex;
      align-items: center;
      .asset-item {
        display: flex;
        flex-direction: column;
        width: 100%;

        &:nth-child(2),
        &:nth-child(3) {
          .asset-item-value {
            border-left: 0px;
          }
        }

        &-label {
          white-space: nowrap;
        }

        &-value {
          border: 1px solid black;
          min-height: 30px;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
