<template>
  <CommonModal ref="commonModalRef" modalId="KittingDetail" modalName="資産運用管理 > キッティング詳細" :dateTimeForm="dateTimeFormat"
    @on-save="onSave" :showDeleteBtn="false">
    <template v-slot:contentModal>
      <v-card>
        <v-container class="pa-8 pb-0">
          <v-form>
            <v-row class="ma-0">
              <v-col cols="3" md="3">
                <!-- <label>登録</label>
                      <div class="d-flex">
                        <v-col cols="4" md="4" class="pa-0">
                          <label>日時</label>
                        </v-col>
                        <v-col cols="8" md="8" class="pa-0">
                          <label>登録者</label>
                        </v-col>
                      </div> -->
              </v-col>

              <v-col cols="3" md="3">
                <!-- <label>最終更新</label>
                      <div class="d-flex">
                        <v-col cols="4" md="4" class="pa-0">
                          <label>日時</label>
                        </v-col>
                        <v-col cols="8" md="8" class="pa-0">
                          <label>登録者</label>
                        </v-col>
                      </div> -->
              </v-col>

              <v-col cols="4" md="4">
                <!-- <label>削除</label>
                      <div class="d-flex">
                        <v-col cols="4" md="4" class="pa-0">
                          <label>日時</label>
                        </v-col>
                        <v-col cols="8" md="8" class="pa-0">
                          <label>登録者</label>
                        </v-col>
                      </div> -->
              </v-col>


              <v-col cols="2" md="2">
                <div class="d-flex">
                  <v-col cols="12" md="12" class="pa-0">
                    <label>キッティングステータス</label>
                    <v-select hide-details variant="underlined" class="form-selection" v-model="kittingInfo.kittingStatus"
                      :items="kittingStatus" />
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
                          <vc-input hide-details variant="underlined" v-model="kittingInfo.kittingStatus" disabled  />
                        </div>
                      </v-col>
                      <v-col class="pa-0 pl-3" cols="3">
                        <div class="form-item">
                          <label>親PC資産ID</label>
                          <vc-input hide-details variant="underlined" v-model="kittingInfo.kittingId" disabled  />
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
                      <td>{{ assetInfo.assetStatus }}</td>
                      <td>{{ assetInfo.assetId }}</td>
                      <td>{{ assetInfo.assetNameKana }}</td>
                      <td>{{ assetInfo.assetType }}</td>
                      <td>{{ assetInfo.assetCd }}</td>
                      <td>{{ assetInfo.createdAt }}</td>
                      <td>{{ assetInfo.modifiedAt }}</td>
                      <td>{{ assetInfo.arrivalId }}</td>
                      <td>{{ assetInfo.version }}</td>
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
                      <th class="text-left">資産ステータス</th>
                      <th class="text-left">資産ID</th>
                      <th class="text-left">資産名称</th>
                      <th class="text-left">資産タイプ</th>
                      <th class="text-left">資産区分</th>
                      <th class="text-left">資産開始日</th>
                      <th class="text-left">資産終了日</th>
                      <th class="text-left">発注ID</th>
                      <th class="text-left">ライセンス</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ assetInfo.assetStatus }}</td>
                      <td>{{ assetInfo.assetId }}</td>
                      <td>{{ assetInfo.assetNameKana }}</td>
                      <td>{{ assetInfo.assetType }}</td>
                      <td>{{ assetInfo.assetCd }}</td>
                      <td>{{ assetInfo.createdAt }}</td>
                      <td>{{ assetInfo.modifiedAt }}</td>
                      <td>{{ assetInfo.arrivalId }}</td>
                      <td>{{ assetInfo.version }}</td>
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
                        <v-btn color="blue-darken-1" variant="text" class="d-none">削除</v-btn>
                      </td>
                      <td>{{ assetInfo.assetStatus }}</td>
                      <td>{{ assetInfo.assetId }}</td>
                      <td>{{ assetInfo.assetNameKana }}</td>
                      <td>{{ assetInfo.assetType }}</td>
                      <td>{{ assetInfo.assetCd }}</td>
                      <td>{{ assetInfo.createdAt }}</td>
                      <td>{{ assetInfo.modifiedAt }}</td>
                      <td>{{ assetInfo.arrivalId }}</td>
                      <td>{{ assetInfo.version }}</td>
                    </tr>
                  </tbody>
                  <v-btn color="blue-darken-1" variant="text" class="d-none">+追加</v-btn>
                </v-table>
              </v-container>
            </div>
          </div>



          <!-- 利用者情報 -->
          <div class="bordered-component pa-4">
            <label><strong>利用者情報</strong></label>
            <v-form class="pt-3">
              <v-row class="ma-0">
                <v-col class="pa-0" cols="1">
                  <div class="form-item">
                    <label>利用会社/組織</label>
                    <v-text-field hide-details variant="underlined" :value="groupInfo.groupName" disabled />
                  </div>
                </v-col>
                <v-col class="pa-0 pl-3" cols="1">
                  <div class="form-item">
                    <label>確認</label>
                    <v-select label="確認" :items="mstAccount" v-model="accountInfo.accountId" item-title="accountName"
                      item-value="accountId" variant="underlined"></v-select>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </div>
          <!-- キッティング情報 -->
          <div class="bordered-component pa-4">
            <label><strong>キッティング情報</strong></label>
            <v-form class="pt-3">

              <v-row class="ma-0">
                <v-col class="pa-0" cols="2">
                  <div class="form-item">
                    <label>キッティングマスター</label>
                  </div>
                </v-col>
                <v-col class="pa-0 pl-3 text-right" cols="1">
                  <div class="form-item">
                    <label>確認</label>
                  </div>
                </v-col>
                <v-col class="pa-0 pl-3" cols="1">
                </v-col>
                <v-col class="pa-0 pl-3" cols="1">
                  <div class="form-item">
                    <v-select hide-details variant="underlined" class="form-selection" v-model="assetInfo.kittingMasterId"
                      :items="mstKittingList" item-title="kittingMasterName" item-value="kittingMasterId" />
                  </div>
                </v-col>
              </v-row>

              <!-- <v-row class="ma-0 pt-5">
                      <v-col class="pa-0" cols="2">
                        <div class="form-item">
                          <label>資産ID/シリアルナンバー</label>
                        </div>
                      </v-col>
                      <v-col class="pa-0 pl-3 text-right" cols="1">
                        <div class="form-item">
                          <label>確認</label>
                        </div>
                      </v-col>
                      <v-col class="pa-0 text-right" cols="1">
                        <div class="form-item">
                          <label>担当者</label>
                        </div>
                      </v-col>
                      <v-col class="pa-0 pl-3" cols="1">
                        <div class="form-item">
                          <v-select hide-details variant="underlined" class="form-selection" v-model="kittingInfo.assetId"/>
                        </div>
                      </v-col>
                    </v-row>   -->


              <v-row class="ma-0">
                <v-col class="pa-0" cols="2">
                  <div class="form-item">
                    <label>PC/ハードウェア</label>
                  </div>
                </v-col>
                <v-col class="pa-0 pl-3 text-right" cols="1">
                  <div class="form-item">
                    <label>確認</label>
                  </div>
                </v-col>
                <v-col class="pa-0 text-right" cols="1">
                  <div class="form-item">
                    <label>担当者</label>
                  </div>
                </v-col>
                <v-col class="pa-0 pl-3" cols="1">
                  <div class="form-item">
                    <v-select hide-details variant="underlined" class="form-selection"
                      v-model="kittingInfo.hardwareConfirmAccountId" :items="mstAccount" item-title="accountName"
                      item-value="accountId" />
                  </div>
                </v-col>
              </v-row>


              <v-row class="ma-0">
                <v-col class="pa-0" cols="2">
                  <div class="form-item">
                    <label>ソフトウェア</label>
                  </div>
                </v-col>
                <v-col class="pa-0 pl-3 text-right" cols="1">
                  <div class="form-item">
                    <label>確認</label>
                  </div>
                </v-col>
                <v-col class="pa-0 text-right" cols="1">
                  <div class="form-item">
                    <label>担当者</label>
                  </div>
                </v-col>
                <v-col class="pa-0 pl-3" cols="1">
                  <div class="form-item">
                    <v-select hide-details variant="underlined" class="form-selection"
                      v-model="kittingInfo.softwareConfirmAccountId" :items="mstAccount" item-title="accountName"
                      item-value="accountId" />
                  </div>
                </v-col>
              </v-row>


              <v-row class="ma-0">
                <v-col class="pa-0" cols="2">
                  <div class="form-item">
                    <label>キッティング設定</label>
                  </div>
                </v-col>
                <v-col class="pa-0 pl-3 text-right" cols="1">
                  <div class="form-item">
                    <label>確認</label>
                  </div>
                </v-col>
                <v-col class="pa-0 text-right" cols="1">
                  <div class="form-item">
                    <label>担当者</label>
                  </div>
                </v-col>
                <v-col class="pa-0 pl-3" cols="1">
                  <div class="form-item">
                    <v-select hide-details variant="underlined" class="form-selection"
                      v-model="kittingInfo.kittingConfirmAccountId" :items="mstAccount" item-title="accountName"
                      item-value="accountId" />
                  </div>
                </v-col>
              </v-row>

              <v-row class="ma-0">
                <v-col class="pa-0" cols="2">
                  <div class="form-item">
                    <label>動作検証</label>
                  </div>
                </v-col>
                <v-col class="pa-0 pl-3 text-right" cols="1">
                  <div class="form-item">
                    <label>確認</label>
                  </div>
                </v-col>
                <v-col class="pa-0 text-right" cols="1">
                  <div class="form-item">
                    <label>担当者</label>
                  </div>
                </v-col>
                <v-col class="pa-0 pl-3" cols="1">
                  <div class="form-item">
                    <v-select hide-details variant="underlined" class="form-selection"
                      v-model="kittingInfo.functionalConfirmAccountId" :items="mstAccount" item-title="accountName"
                      item-value="accountId" />
                  </div>
                </v-col>
              </v-row>


              <v-row class="ma-0">
                <v-col class="pa-0" cols="2">
                  <div class="form-item">
                    <label>キッティングエビデンス</label>
                  </div>
                </v-col>
                <v-col class="pa-0 pl-3" cols="1">
                </v-col>
                <v-col class="pa-0 text-right" cols="1">
                  <div class="form-item">
                    <v-btn color="blue-darken-1" variant="text">PDF,画像添付</v-btn>
                  </div>
                </v-col>
              </v-row>


              <v-row class="ma-0">
                <v-col class="pa-0" cols="2">
                  <div class="form-item">
                    <label>申し送り</label>
                  </div>
                </v-col>
                <v-col class="pa-0 pl-3" cols="8">
                  <v-textarea variant="outlined" hide-details rows="2" v-model="kittingInfo.kittingComment" />
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
import CommonModal from '@/components/modal/index.vue'
import kittingService from "@/services/kitting.service";
import kittingMasterService from "@/apis/Kitting/kitting.service";
import AppConstants from "@/constants/constants";
import GenCode from '@/models/GenCode';
import DisplayGenCode from "@/utils/displayGenCode";
import KittingInformation from "@/models/kitting-information.model";

const assetInfo = ref<any>([])
const accountInfo = ref<any>([])
const kittingUserInfo = ref<any>([])
const kittingInfo = ref<any>([])
const groupInfo = ref<any>([])
const isSet = ref(0);
const isMain = ref(0);
const kittingStatus: Ref<GenCode[]> = ref([]);
const mstKittingList: Ref<Array<KittingInformation>> = ref([]);

const commonModalRef = ref<InstanceType<typeof CommonModal> | null>(null)

let dateTimeFormat = reactive({
  createdTime: '',
  updatedTime: '',
  deletedTime: ''
});

const buildDataKittingModal = async () => {
  kittingStatus.value = DisplayGenCode.getListGenCodeLabel(AppConstants.TABLE_KITTING, AppConstants.KITTING_STATUS, props.genCodeList);
  mstKittingList.value = (await kittingMasterService.getKittingList()).kittingList || [];
}

const handleOpenModal = async (assetId: any) => {
  await buildDataKittingModal()
  const response = await kittingService.detail(assetId);
  assetInfo.value = response.assetInfo;
  accountInfo.value = response.accountInfo;
  kittingInfo.value = response.kittingInfo;
  kittingUserInfo.value = response.kittingUserInfo;
  groupInfo.value = response.groupInfo;
  isMain.value = response.assetInfo.isMain || 0;
  isSet.value = response.assetInfo.isSet || 0;
  dateTimeFormat.createdTime = response.kittingInfo.createdAt || '';
  dateTimeFormat.updatedTime = response.kittingInfo.modifiedAt || '';
  dateTimeFormat.deletedTime = response.kittingInfo.deletedAt || '';
  commonModalRef.value?.openModal(assetId);
}

const onSave = async () => {
  let objectKitting = {
    assetId: assetInfo.value.assetId,
    kittingStatus: kittingInfo.value.kittingStatus,
    accountId: accountInfo.value.accountId,
    kittingMasterId: assetInfo.value.kittingMasterId,
    hardwareConfirmAccountId: kittingInfo.value.hardwareConfirmAccountId,
    softwareConfirmAccountId: kittingInfo.value.softwareConfirmAccountId,
    kittingConfirmAccountId: kittingInfo.value.kittingConfirmAccountId,
    functionalConfirmAccountId: kittingInfo.value.functionalConfirmAccountId,
    kittingComment: kittingInfo.value.kittingComment,
  }
  await kittingService.update(objectKitting);
  commonModalRef.value?.handleOnClose();
}
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
})
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
