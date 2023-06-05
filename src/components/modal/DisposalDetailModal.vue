<template>
    <CommonModal ref="commonModalRef" modalId="disposalDetail" modalName="資産運用管理 > 修理・廃棄詳細" @on-save="onSave"
        :dateTimeForm="dateTimeFormat" :showDeleteBtn="false">
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
                                        <label>キッティングステータス</label>
                                        <v-select hide-details variant="underlined" class="form-selection"
                                            :items="disposalStatusList" v-model="disposalInfo.disposalStatus" />
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

                    <!-- 修理・廃棄配送情報（配送委託先） -->

                    <div class="bordered-component pa-4">
                        <label><strong>修理・廃棄配送情報（配送委託先）</strong></label>
                        <v-form class="pt-3">
                            <v-row class="ma-0">
                                <v-col class="pa-0" cols="2">
                                    <div class="form-item">
                                        <label>委託先ID</label>
                                        <v-select hide-details variant="underlined"
                                            v-model="disposalInfo.outsourcingCompanyId" class="form-selection"
                                            :items="outsourcingCompanyList" item-title="outsourcingCompanyName"
                                            item-value="outsourcingCompanyId" />
                                    </div>
                                </v-col>
                            </v-row>

                            <v-row class="ma-0">
                                <v-col class="pa-0" cols="2">
                                    <div class="form-item">
                                        <label>発送予定日</label>
                                        <vc-input-date v-model="disposalInfo.createdAt" disabled></vc-input-date>
                                    </div>
                                </v-col>
                                <v-col class="pa-0 pl-3" cols="2">
                                    <div class="form-item">
                                        <label>発送手配日</label>
                                        <vc-input-date v-model="disposalInfo.modifiedAt" disabled></vc-input-date>
                                    </div>
                                </v-col>
                                <v-col class="pa-0 pl-3" cols="2">
                                    <div class="form-item">
                                        <label>発送完了日</label>
                                        <vc-input-date v-model="disposalInfo.deletedAt" disabled></vc-input-date>
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
                                    <v-textarea variant="outlined" hide-details rows="2" v-model="disposalInfo.note" />
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


                    <!-- 修理返却配送情報（配送委託先） hidden -->

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
import disposalService from "@/services/disposal.service";
import AppConstants from "@/constants/constants";
import { outsourcingCompanyService } from '@/services/outsourcing-company.service';
import OutsourcingCompanyInformation from "@/models/outsourcing-information.model";
import DisplayGenCode from "@/utils/displayGenCode";

const commonModalRef = ref<InstanceType<typeof CommonModal> | null>(null);
const assets = ref<any>([]);
const procurement = ref<any>([]);
const disposalInfo = ref<any>([]);
const disposalStatusList: Ref<Array<any>> = ref([]);
const outsourcingCompanyList = ref<any[]>([]);
const outsourcingCompanyInfo: Ref<OutsourcingCompanyInformation> = ref({});

let dateTimeFormat = reactive({
    createdTime: '',
    updatedTime: '',
    deletedTime: ''
});

const buildDataShippingModal = async () => {
    disposalStatusList.value = DisplayGenCode.getListGenCodeLabel(AppConstants.TABLE_DISPOSAL, AppConstants.DISPOSAL_STATUS, props.genCodeList);
    //get list outsourcingCompany
    outsourcingCompanyList.value = (await outsourcingCompanyService.getOutsourcingCompanyList()).mstOutsourcingCompanyMaster;
};

const handleOpenModal = async (assetId: any) => {
    await buildDataShippingModal()
    //api getDetail
    const response = await disposalService.detail(assetId);
    disposalInfo.value = response.disposalInfo || {};
    assets.value = response.assetInfo || {};
    procurement.value = response.procurementInfo || {};
    outsourcingCompanyInfo.value = response.outsourceCompanyInfo || {};
    dateTimeFormat.createdTime = disposalInfo.createdAt || '';
    dateTimeFormat.updatedTime = disposalInfo.modifiedAt || '';
    dateTimeFormat.deletedTime = disposalInfo.deletedAt || '';
    // show add/edit modal
    commonModalRef.value?.openModal(assetId);
};

const onSave = async () => {
    let objectDisposal = {
        assetId: assets.value.assetId,
        disposalStatus: disposalInfo.value.disposalStatus,
        outsourcingCompanyId: disposalInfo.value.outsourcingCompanyId,
        createdAt: disposalInfo.value.createdAt,
        modifiedAt: disposalInfo.value.modifiedAt,
        deletedAt: disposalInfo.value.deletedAt,
        note: disposalInfo.value.note,
    };
    await disposalService.update(objectDisposal);
    // show add/edit modal
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
