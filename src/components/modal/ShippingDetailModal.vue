<template>
  <CommonModal ref="commonModalRef" modalId="shippingDetail" modalName="資産運用管理 > 出荷・集荷詳細" :dateTimeForm="dateTimeFormat"
    @on-save="onSave" :showDeleteBtn="false">
    <template v-slot:contentModal>
      <v-card>
        <v-container class="pa-8 pb-0">
          <v-form>
            <v-row class="ma-0">
              <v-col cols="3" md="3">
              </v-col>

              <v-col cols="3" md="3">
              </v-col>

              <v-col cols="4" md="4">
              </v-col>


              <v-col cols="2" md="2">
                <div class="d-flex">
                  <v-col cols="12" md="12" class="pa-0">
                    <label>出荷・集荷ステータス</label>
                    <v-select hide-details variant="underlined" v-model="shippingInfo.shippingStatus"
                      class="form-selection" :items="shippingStatusList" />
                  </v-col>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-container>

        <!-- 対象資産 -->
        <v-container>
          <div class="bordered-component pa-4">
            <label><strong>対象資産</strong></label>
            <!-- <v-form class="pt-3">
              <v-row class="ma-0">
                <v-col class="pa-0" cols="2">
                  <div class="form-item">
                    <label>PCセット</label>
                    <v-text-field disabled hide-details variant="underlined" />
                  </div>
                </v-col>
                <v-col class="pa-0 pl-3" cols="3">
                  <div class="form-item">
                    <label>親PC資産ID</label>
                    <v-text-field disabled hide-details variant="underlined" />
                  </div>
                </v-col>
              </v-row>

            </v-form> -->


            <div class="pa-4" v-if="isSet">
              <label><strong>資産</strong></label>

              <v-container class="v-card--variant-elevated">
                <v-table>
                  <thead>
                    <tr>
                      <th class="text-left asset-info-form">資産ステータス</th>
                      <th class="text-left asset-info-form">資産ID</th>
                      <th class="text-left asset-info-form">資産名称</th>
                      <th class="text-left asset-info-form">資産タイプ</th>
                      <th class="text-left asset-info-form">資産区分</th>
                      <th class="text-left asset-info-form">資産開始日</th>
                      <th class="text-left asset-info-form">資産終了日</th>
                      <th class="text-left asset-info-form">発注ID</th>
                      <th class="text-left asset-info-form">ライセンス</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ assets.assetStatus }}</td>
                      <td>{{ assets.assetId }}</td>
                      <td>{{ assets.assetNameKana }}</td>
                      <td>{{ assets.assetType }}</td>
                      <td>{{ assets.assetCd }}</td>
                      <td>{{ assets.assetFrom }}</td>
                      <td>{{ assets.assetTo }}</td>
                      <td>{{ procurement.procurementId }}</td>
                      <td>無</td>
                    </tr>
                  </tbody>
                </v-table>



              </v-container>
            </div>
            <div class="pa-4" v-if="!isSet">
              <label><strong>親PC資産</strong></label>

              <v-container class="v-card--variant-elevated">
                <v-table>
                  <thead>
                    <tr>
                      <th class="text-left asset-info-form">資産ステータス</th>
                      <th class="text-left asset-info-form">資産ID</th>
                      <th class="text-left asset-info-form">資産名称</th>
                      <th class="text-left asset-info-form">資産タイプ</th>
                      <th class="text-left asset-info-form">資産区分</th>
                      <th class="text-left asset-info-form">資産開始日</th>
                      <th class="text-left asset-info-form">資産終了日</th>
                      <th class="text-left asset-info-form">発注ID</th>
                      <th class="text-left asset-info-form">ライセンス</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ assets.assetStatus }}</td>
                      <td>{{ assets.assetId }}</td>
                      <td>{{ assets.assetNameKana }}</td>
                      <td>{{ assets.assetType }}</td>
                      <td>{{ assets.assetCd }}</td>
                      <td>{{ assets.assetFrom }}</td>
                      <td>{{ assets.assetTo }}</td>
                      <td>{{ procurement.procurementId }}</td>
                      <td>無</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-container>
            </div>
            <div class="pa-4" v-if="!isSet && isMain">
              <label><strong>子資産</strong></label>

              <v-container class="v-card--variant-elevated">
                <v-table>
                  <thead>
                    <tr>
                      <th class="text-left asset-info-form">資産ステータス</th>
                      <th class="text-left asset-info-form">資産ID</th>
                      <th class="text-left asset-info-form">資産名称</th>
                      <th class="text-left asset-info-form">資産タイプ</th>
                      <th class="text-left asset-info-form">資産区分</th>
                      <th class="text-left asset-info-form">資産開始日</th>
                      <th class="text-left asset-info-form">資産終了日</th>
                      <th class="text-left asset-info-form">発注ID</th>
                      <th class="text-left asset-info-form">ライセンス</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <v-btn color="blue-darken-1" variant="text">削除</v-btn>
                      </td>
                      <td>{{ assets.assetStatus }}</td>
                      <td>{{ assets.assetId }}</td>
                      <td>{{ assets.assetNameKana }}</td>
                      <td>{{ assets.assetType }}</td>
                      <td>{{ assets.assetCd }}</td>
                      <td>{{ assets.assetFrom }}</td>
                      <td>{{ assets.assetTo }}</td>
                      <td>{{ procurement.procurementId }}</td>
                      <td>無</td>
                    </tr>
                  </tbody>
                  <v-btn color="blue-darken-1" variant="text">+追加</v-btn>
                </v-table>
              </v-container>
            </div>
          </div>


          <!-- 配送元情報 -->

          <!-- <div class="bordered-component pa-4">
            <label><strong>配送元情報</strong></label>
            <v-form class="pt-3">
              <v-row class="ma-0">
                <v-col class="pa-0" cols="2">
                  <div class="form-item">
                    <label>利用会社/組織</label>
                    <v-text-field hide-details variant="underlined" />
                  </div>
                </v-col>
                <v-col class="pa-0 pl-3" cols="2">
                  <div class="form-item">
                    <label>利用者</label>
                    <v-text-field hide-details variant="underlined" />
                  </div>
                </v-col>
              </v-row>

            </v-form>
          </div> -->

          <!-- 配送先情報 -->
          <div class="bordered-component pa-4">
            <label><strong>配送先情報</strong></label>
            <v-form class="pt-3">
              <v-row class="ma-0">
                <v-col class="pa-0" cols="2">
                  <div class="form-item">
                    <label>利用会社/組織</label>
                    <v-text-field disabled :value="groupInfo.groupName" hide-details variant="underlined" />
                  </div>
                </v-col>
                <v-col class="pa-0 pl-3" cols="2">
                  <div class="form-item">
                    <label>利用者</label>
                    <v-select v-model="accountInfo.accountId" item-title="accountName" item-value="accountId"
                      :items="mstAccount" variant="underlined"></v-select>
                  </div>
                </v-col>
              </v-row>

            </v-form>
          </div>


          <!-- 配送情報（配送委託先） -->
          <div class="bordered-component pa-4">
            <label><strong>配送情報（配送委託先）</strong></label>
            <v-form class="pt-3">
              <v-row class="ma-0">
                <v-col class="pa-0" cols="2">
                  <div class="form-item">
                    <label>委託先ID</label>
                    <v-select hide-details variant="underlined" v-model="shippingInfo.outsourcingCompanyId"
                      class="form-selection" :items="outsourcingCompany" item-title="outsourcingCompanyName"
                      item-value="outsourcingCompanyId" />
                  </div>
                </v-col>
              </v-row>

              <v-row class="ma-0">
                <v-col class="pa-0" cols="2">
                  <div class="form-item">
                    <label>発送予定日</label>
                    <vc-input-date v-model="shippingInfo.receptionOn" disabled></vc-input-date>
                  </div>
                </v-col>
                <v-col class="pa-0 pl-3" cols="2">
                  <div class="form-item">
                    <label>発送手配日</label>
                    <vc-input-date v-model="shippingInfo.workingOn" disabled></vc-input-date>
                  </div>
                </v-col>
                <v-col class="pa-0 pl-3" cols="2">
                  <div class="form-item">
                    <label>発送完了日</label>
                    <vc-input-date v-model="shippingInfo.completedOn" disabled></vc-input-date>
                  </div>
                </v-col>
                <v-col class="pa-0 pl-3" cols="1">
                  <div class="form-item">
                    <label class="pl-4">配送エビデンス</label>
                    <v-btn color="blue-darken-1" variant="text">PDF,画像添付</v-btn>
                  </div>
                </v-col>
              </v-row>
              <v-row class="ma-0">
                <v-col class="pa-0" cols="8">
                  <label>申し送り</label>
                  <v-textarea variant="outlined" disabled hide-details rows="2" v-model="shippingInfo.note" />
                </v-col>
              </v-row>
            </v-form>
          </div>
        </v-container>

      </v-card>
    </template>
  </CommonModal>
</template>
<script setup lang="ts">
import { reactive, ref, Ref } from "vue";
import CommonModal from '@/components/modal/index.vue';
import shippingService from "@/services/shipping.service";
import { outsourcingCompanyService } from '@/services/outsourcing-company.service';
import AppConstants from "@/constants/constants";
import DisplayGenCode from "@/utils/displayGenCode";

const commonModalRef = ref<InstanceType<typeof CommonModal> | null>(null);

const assets = ref<any>([]);
const accountInfo = ref<any>([]);
const shippingInfo = ref<any>([]);
const groupInfo = ref<any>([]);
const procurement = ref<any>([]);
const isSet = ref(0);
const isMain = ref(0);
const shippingStatusList: Ref<any[]> = ref([]);
let outsourcingCompany = ref<any[]>([]);

let dateTimeFormat = reactive({
  createdTime: '',
  updatedTime: '',
  deletedTime: ''
});

const buildDataShippingModal = async () => {
  shippingStatusList.value = DisplayGenCode.getListGenCodeLabel(AppConstants.TABLE_SHIPPING, AppConstants.SHIPPING_STATUS, props.genCodeList);
  //get list outsourcingCompany
  outsourcingCompany.value = (await outsourcingCompanyService.getOutsourcingCompanyList()).mstOutsourcingCompanyMaster;
};

const handleOpenModal = async (assetId: any) => {
  await buildDataShippingModal();
  //api getDetail
  const response = await shippingService.detail(assetId);
  assets.value = response.assetInfo || {};
  accountInfo.value = response.accountInfo || {};
  shippingInfo.value = response.shippingInfo || {};
  groupInfo.value = response.groupInfo || {};
  procurement.value = response.procurementInfo || {};
  dateTimeFormat.createdTime = response.assetInfo.createdAt || '';
  dateTimeFormat.updatedTime = response.assetInfo.modifiedAt || '';
  dateTimeFormat.deletedTime = response.assetInfo.deletedAt || '';
  isSet.value = response.isSet || 0;
  isMain.value = response.isMain || 0;
  // show modal
  commonModalRef.value?.openModal(assetId);
};

const onSave = async () => {
  let objectShipping = {
    assetId: assets.value.assetId,
    shippingStatus: shippingInfo.value.shippingStatus,
    accountId: accountInfo.value.accountId,
    outsourcingCompanyId: shippingInfo.value.outsourcingCompanyId,
    note: shippingInfo.value.note,
  };
  await shippingService.update(objectShipping);
  commonModalRef.value?.handleOnClose();
};
defineExpose({
  handleOpenModal,
});

const props = defineProps({
  genCodeList: {
    type: Array,
    default: []
  },
  mstAccount: {
    type: Array,
    default: []
  }
});
</script>

<style lang="scss" scoped>
.bordered-component {
  border: thin solid;
  border-radius: 5px;
}

.asset-info-form {
  background-color: #5cbbf6;
}
</style>
