<template>
    <CommonModal ref="commonModalRef" modalId="repairingDetail" modalName="資産運用管理 > 修理・廃棄詳細" @on-save="onSave"
        :dateTimeForm="dateTimeFormat" :showDeleteBtn="false">
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
                                        <v-select hide-details variant="underlined" class="form-selection"
                                            :items="repairingStatus" v-model="repairingInfo.repairingStatus" />
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

                        <div class="pa-4">
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
                    </div>



                    <!-- 配送元情報 -->
                    <div class="bordered-component pa-4">
                        <label><strong>配送元情報</strong></label>
                        <v-form class="pt-3">
                            <v-row class="ma-0">
                                <v-col class="pa-0" cols="1">
                                    <div class="form-item">
                                        <label>利用会社/組織</label>
                                        <v-text-field hide-details variant="underlined" v-model="groupInfo.groupName"
                                            disabled />
                                    </div>
                                </v-col>
                                <v-col class="pa-0 pl-3" cols="1">
                                    <div class="form-item">
                                        <label>利用者</label>
                                        <v-select label="利用者" v-model="account.accountId" item-title="accountName"
                                            item-value="accountId" :items="mstAccount" variant="underlined"></v-select>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-form>
                    </div>
                    <!-- 配送先情報（修理後） hidden-->
                    <!-- <div class="bordered-component pa-4">
                        <label><strong>配送先情報（修理後）</strong></label>
                        <v-form class="pt-3">
                            <v-row class="ma-0">
                                <v-col class="pa-0" cols="1">
                                    <div class="form-item">
                                        <label>利用会社/組織</label>
                                        <v-text-field hide-details variant="underlined" />
                                    </div>
                                </v-col>
                                <v-col class="pa-0 pl-3" cols="1">
                                    <div class="form-item">
                                        <label>利用者</label>
                                        <v-text-field hide-details variant="underlined" />
                                    </div>
                                </v-col>
                            </v-row>
                        </v-form>
                    </div> -->
                    <!-- 修理・廃棄配送情報（配送委託先） -->

                    <div class="bordered-component pa-4">
                        <label><strong>修理・廃棄配送情報（配送委託先）</strong></label>
                        <v-form class="pt-3">
                            <v-row class="ma-0">
                                <v-col class="pa-0" cols="2">
                                    <div class="form-item">
                                        <label>委託先ID</label>
                                        <v-select hide-details variant="underlined"
                                            v-model="repairingInfo.outsourcingCompanyId" class="form-selection"
                                            :items="outsourcingCompany" item-title="outsourcingCompanyName"
                                            item-value="outsourcingCompanyId" />
                                    </div>
                                </v-col>
                                <!-- <v-col class="pa-0 pl-3" cols="2">
                                    <div class="form-item">
                                        <label>委託先名称</label>
                                        <v-text-field hide-details variant="underlined" v-model="outsourceCompanyInfo.outsourcingCompanyName" disabled/>
                                    </div>
                                </v-col> -->
                            </v-row>

                            <v-row class="ma-0">
                                <v-col class="pa-0" cols="2">
                                    <div class="form-item">
                                        <label>発送予定日</label>
                                        <vc-input-date v-model="repairingInfo.createdAt" disabled></vc-input-date>
                                    </div>
                                </v-col>
                                <v-col class="pa-0 pl-3" cols="2">
                                    <div class="form-item">
                                        <label>発送手配日</label>
                                        <vc-input-date v-model="repairingInfo.modifiedAt" disabled></vc-input-date>
                                    </div>
                                </v-col>
                                <v-col class="pa-0 pl-3" cols="2">
                                    <div class="form-item">
                                        <label>発送完了日</label>
                                        <vc-input-date v-model="repairingInfo.deletedAt" disabled></vc-input-date>
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
                                    <v-textarea label="申し送り" variant="outlined" hide-details rows="2"
                                        v-model="repairingInfo.note" />
                                </v-col>

                            </v-row>

                        </v-form>
                    </div>
                    <!-- 修理・廃棄配送情報（配送委託先） hidden-->

                    <!-- <div class="bordered-component pa-4">
                        <label><strong>修理・廃棄配送情報（配送委託先）</strong></label>
                        <v-form class="pt-3">
                            <v-row class="ma-0">
                                <v-col class="pa-0" cols="2">
                                    <div class="form-item">
                                        <label>委託先ID</label>
                                        <v-text-field hide-details variant="underlined" />
                                    </div>
                                </v-col>
                                <v-col class="pa-0 pl-3" cols="2">
                                    <div class="form-item">
                                        <label>委託先名称</label>
                                        <v-text-field hide-details variant="underlined" />
                                    </div>
                                </v-col>
                            </v-row>

                            <v-row class="ma-0">
                                <v-col class="pa-0" cols="2">
                                    <div class="form-item">
                                        <label>修理・廃棄予定日</label>
                                        <vc-input-date></vc-input-date>
                                    </div>
                                </v-col>
                                <v-col class="pa-0 pl-3" cols="2">
                                    <div class="form-item">
                                        <label>修理・廃棄手配日</label>
                                        <vc-input-date></vc-input-date>
                                    </div>
                                </v-col>
                                <v-col class="pa-0 pl-3" cols="2">
                                    <div class="form-item">
                                        <label>修理・廃棄完了日</label>
                                        <vc-input-date></vc-input-date>
                                    </div>
                                </v-col>
                                <v-col class="pa-0 pl-3" cols="1">
                                    <div class="form-item">
                                        <label class="pl-4">修理・廃棄エビデンス</label>
                                        <v-btn color="blue-darken-1" variant="text">PDF,画像添付</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row class="ma-0">
                                <v-col class="pa-0" cols="8">
                                    <v-textarea label="申し送り" variant="outlined" hide-details rows="2" />
                                </v-col>

                            </v-row>

                        </v-form>
                    </div> -->
                    <!-- 修理返却配送情報（配送委託先）hidden -->

                    <!-- <div class="bordered-component pa-4">
                        <label><strong>修理返却配送情報（配送委託先）</strong></label>
                        <v-form class="pt-3">
                            <v-row class="ma-0">
                                <v-col class="pa-0" cols="2">
                                    <div class="form-item">
                                        <label>委託先ID</label>
                                        <v-text-field hide-details variant="underlined" />
                                    </div>
                                </v-col>
                                <v-col class="pa-0 pl-3" cols="2">
                                    <div class="form-item">
                                        <label>委託先名称</label>
                                        <v-text-field hide-details variant="underlined" />
                                    </div>
                                </v-col>
                            </v-row>

                            <v-row class="ma-0">
                                <v-col class="pa-0" cols="2">
                                    <div class="form-item">
                                        <label>発送予定日</label>
                                        <vc-input-date></vc-input-date>
                                    </div>
                                </v-col>
                                <v-col class="pa-0 pl-3" cols="2">
                                    <div class="form-item">
                                        <label>発送手配日</label>
                                        <vc-input-date></vc-input-date>
                                    </div>
                                </v-col>
                                <v-col class="pa-0 pl-3" cols="2">
                                    <div class="form-item">
                                        <label>発送完了日</label>
                                        <vc-input-date></vc-input-date>
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
                                    <v-textarea label="申し送り" variant="outlined" hide-details rows="2" />
                                </v-col>

                            </v-row>

                        </v-form>
                    </div> -->

                </v-container>




            </v-card>
        </template>
    </CommonModal>
</template>
<script setup lang="ts">
import { reactive, ref, Ref } from "vue";
import CommonModal from '@/components/modal/index.vue';
import repairingService from "@/services/repairing.service";
import AppConstants from "@/constants/constants";
import { outsourcingCompanyService } from '@/services/outsourcing-company.service';
import GenCode from '@/models/GenCode';
import DisplayGenCode from "@/utils/displayGenCode";

const commonModalRef = ref<InstanceType<typeof CommonModal> | null>(null);
const assets = ref<any>([]);
const procurement = ref<any>([]);
const repairingInfo = ref<any>([]);
const account = ref<any>([]);
const groupInfo = ref<any>([]);
const repairingStatus: Ref<GenCode[]> = ref([]);
let outsourcingCompany = ref<any[]>([]);


let dateTimeFormat = reactive({
    createdTime: '',
    updatedTime: '',
    deletedTime: ''
});

const buildDataShippingModal = async () => {
    //get list outsourcingCompany
    outsourcingCompany.value = (await outsourcingCompanyService.getOutsourcingCompanyList()).mstOutsourcingCompanyMaster;
    repairingStatus.value = DisplayGenCode.getListGenCodeLabel(AppConstants.TABLE_REPAIRING, AppConstants.REPAIRING_STATUS, props.genCodeList);
};

const handleOpenModal = async (assetId: any) => {
    await buildDataShippingModal();
    //api getDetail
    const response = await repairingService.detail(assetId);
    assets.value = response.assetInfo || {};
    procurement.value = response.procurementInfo || {};
    repairingInfo.value = response.repairingInfo || {};
    account.value = response.accountInfo || {};
    groupInfo.value = response.groupInfo || {};
    dateTimeFormat.createdTime = response.repairingInfo.createdAt || '';
    dateTimeFormat.updatedTime = response.repairingInfo.modifiedAt || '';
    dateTimeFormat.deletedTime = response.repairingInfo.deletedAt || '';
    // show add/edit modal
    commonModalRef.value?.openModal(assetId);
};

const onSave = async () => {

    let objectRepairing = {
        assetId: assets.value.assetId,
        repairingStatus: repairingInfo.value.repairingStatus,
        accountId: account.value.accountId,
        outsourcingCompanyId: repairingInfo.value.outsourcingCompanyId,
        createdAt: repairingInfo.value.createdAt,
        modifiedAt: repairingInfo.value.modifiedAt,
        deletedAt: repairingInfo.value.deletedAt,
        note: repairingInfo.value.note,
    };
    await repairingService.update(objectRepairing);
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
