<template>
  <v-form ref="itemMasterForm"
    lazy-validation
    validate-on="submit">
    <v-container>
      <v-card elevation="5">
        <div class="pa-3">
          <div class="title mb-5">
            <h4>出荷資産情報</h4>
          </div>
          <v-row>
            <v-col cols="2" class="">
              <div class="form-input">
                <span>出荷受付ID</span>
                <vc-input :readonly="true" v-model="modelValue.shippingInfo.shippingId"></vc-input>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-container>
    <v-container>
      <v-card elevation="5">
        <ExpansionPanelsComponent :expansion-panels="expansionPanels" v-model="state.tabExpanded">
          <template #content(containerPC)>
            <v-row>
              <v-container class="shipping-management-form">
                <!-- Start Asset table -->
                  <v-form>
                    <v-row>
                      <CustomTableMultiple
                        ref="customTableMultipleRef"
                        :asset-info="modelValue.assetInfo"
                        :genCodeList="genCodeList"
                        :show-select-asset-btn="!modelValue.shippingInfo.shippingId"
                        @onAddAsset="handleOnAddAsset"
                      >
                      </CustomTableMultiple>
                    </v-row>
                  </v-form>
              </v-container>
            </v-row>
          </template>
        </ExpansionPanelsComponent>
      </v-card>
    </v-container>
    <v-container>
      <div class="elevation-5" style="border-radius: 4px">
        <div class="pa-3">
          <div class="title">
            <h3>新資産利用者情報</h3>
          </div>
          <v-row>
            <v-col cols="3" class="">
              <div class="form-input">
                <span>利用会社/組織</span>
                <vc-input name="タイトル" :readonly="true" :value="accountGroup"></vc-input>
              </div>
            </v-col>
            <v-col cols="3" class="">
              <div class="form-input">
                <span>利用者</span>
                <vc-select
                  name="タイトル"
                  :rules="['required']"
                  v-model="modelValue.accountInfo"
                  :items="accountList"
                  item-value="accountId"
                  item-title="accountName"
                  return-object
                  @onChange="handleChangeAccount"
                >
                </vc-select>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" class="">
              <div class="form-input">
                <span>使用來自</span>
                <vc-input-date v-model="modelValue.assetInfo.usingFrom"></vc-input-date>
              </div>
            </v-col>
            <v-col cols="3" class="">
              <div class="form-input">
                <span>用於</span>
                <vc-input-date v-model="modelValue.assetInfo.usingTo"></vc-input-date>
              </div>
            </v-col>
            <v-col cols="3">
              <span>出荷予定日</span>
              <vc-input-date v-model="modelValue.shippingInfo.estimatedShippingDate"></vc-input-date>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
    <v-container>
      <v-card elevation="5">
        <div class="pa-3">
          <span class="ml-2">申し送り</span>
          <v-row class="d-flex justify-content-center">
            <v-col cols="11" class="">
              <div class="form-textarea">
                <v-textarea v-model="modelValue.shippingInfo.note" variant="outlined" rows="2"></v-textarea>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
import vcInput from '../commons/vc-input.vue';
import vcSelect from '../commons/vc-select.vue';
import vcInputDate from '../commons/vc-input-date.vue';
import { ref, reactive, PropType, Ref, onMounted } from 'vue';
import ShippingResponse from '@/models/response/shipping-response.model';
import ExpansionPanelsComponent from '../commons/expansion-panels-component.vue';
import ExpansionPanel from '@/models/ExpansionPanel';
import CustomTableMultiple from '@/components/content-asset-shipment-modal/custom-table-multiple/index.vue';
import ColumnAttributes from '@/models/column-attributes.model';
import AssetManagement from '@/models/AssetManagement';
import AccountService from '@/services/account.service';
import AccountInfo from '@/models/AccountInfo';

const props = defineProps({
  modelValue: {
    type: Object as PropType<ShippingResponse>,
    required: true
  },
  OS: {
    type: Array,
    required: true
  },
  genCodeList: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const expansionPanels: ExpansionPanel[] = [
  {
    panelTitle: "PCセット資産・ライセンス情報",
    panelContent: "containerPC"
  }
];

const state = reactive({
  tabExpanded: 0,
  total: 0,
  tableAttrs: {
    labels: ["資産ステータス", "資産ID", "資産名称", "資産タイプ", "資産開始日", "資産終了日", "発注ID", "ライセンス"],
    fields: ["assetStatus", "assetId", "assetNameKana", "assetType", "assetFrom", "assetTo", "orderId", "license"],
    clickableColumn: [false, true, false, false, false, false, false, true, true],
    columnsWidth: [100, 70, 250, 100, 200, 120, 120, 100, 100]
  } as ColumnAttributes,
  tableHeight: 370,
  dataTableAsset: [] as AssetManagement[],
  dataTableMain: [] as AssetManagement[],
  dataTableItem: [] as AssetManagement[],
});

const itemMasterForm = ref<any | null>(null);
const customTableMultipleRef = ref<InstanceType<typeof CustomTableMultiple> | null>(null);
const accountList: Ref<AccountInfo[]> = ref([]);
const accountGroup = ref('');

const handleChangeAccount = (newValueAccount: any) => {
  accountGroup.value = newValueAccount.groupName || '';
}

onMounted(async () => {
  await buildAccountData();
} );

const validateForm = async () => {
  const validForm = await itemMasterForm.value.validate();
  return validForm;
};

const handleOnAddAsset = (assetItem: any) => {
  handleChangeAccount(assetItem.group);
  props.modelValue.assetInfo = assetItem;
  props.modelValue.accountInfo = assetItem.account;
};

const buildAccountData = async () => {
  let responseAccount = await AccountService.getList();
  accountList.value = responseAccount.mstAccount;
  accountGroup.value = props.modelValue.accountInfo?.accountName || '';
};

defineExpose({
  validateForm,
});
</script>

<style scoped lang="scss">
.item-group {
  display: flex;
  align-items: center;
  width: 100%;
}

.form-item {
  width: 100%;
  margin-right: 10px;
}
.form-textarea {
  margin-top: 20px;
}

.shipping-management {
  &-form {

    .table-data-asset,
    .table-data-user {
      width: 100%;
      display: flex;
      justify-content: center;
      border-bottom: none;
      border-collapse: unset;

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
    }

    .table-data-asset {
      &-child {
        :deep(.v-table__wrapper) {
          max-height: 96px;
          overflow-y: auto;
        }
      }
    }

    .table-data-user {
      &-child {
        :deep(.v-table__wrapper) {
          max-height: 130px;
          overflow-y: auto;
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
}
</style>

