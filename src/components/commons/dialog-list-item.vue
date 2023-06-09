<template>
    <v-row justify="center">
        <v-dialog v-model="dialogListItem" persistent>
            <v-card>
                <v-container>
                    {{ $attrs.name }}
                </v-container>
                <v-container class="d-flex justify-end">
                    <v-btn density="compact" @click="onClickClose" size="large">戻る</v-btn>
                </v-container>
                <v-container class="pb-0">
                    <CommonTabs :tabDetails="tabDetails" />
                </v-container>
                <v-container class="pt-0">
                    <SearchComponent @onSearch="onClickSearch"
                        v-model:deleted-record-display-mode="searchState.deletedRecordDisplayMode"
                        @on-clear="onClickClear" v-model:isModal="isModal">
                        <template v-slot:searchForm>
                            <div>検索条件</div>
                            <v-form class="pt-3">
                                <v-row no-gutters>
                                    <v-col :cols="2">
                                        <div class="form-item">
                                            <v-text-field label="品目名称(前方一致)" class="" variant="underlined"
                                                v-model="searchState.itemName" hide-details />
                                        </div>
                                    </v-col>
                                    <v-col :cols="1" class="ml-3">
                                        <div class="form-item">
                                            <v-text-field label="JANコード" class="" variant="underlined"
                                                v-model="searchState.janCode" hide-details />
                                        </div>
                                    </v-col>
                                    <v-col :cols="1" class="ml-3">
                                        <div class="form-item">
                                            <v-select label="メーカー" class="pt-0 form-selection" variant="underlined"
                                                v-model="searchState.makerId" hide-details :items="mstMakers"
                                                item-title="makerName" item-value="makerId" />
                                        </div>
                                    </v-col>
                                    <v-col :cols="2" class="ml-3">
                                        <div class="form-item">
                                            <v-text-field label="メーカー型番" class="" variant="underlined" hide-details
                                                v-model="searchState.makerModel" />
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters>
                                    <v-col :cols="2">
                                        <div class="form-item">
                                            <v-select label="タイプ" class="pt-0 form-selection" variant="underlined"
                                                v-model="searchState.assetType" hide-details :items="SetType"
                                                item-title="fieldDisplayLabel" item-value="fieldValue" />
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-form>
                            <br>
                        </template>
                    </SearchComponent>
                </v-container>
                <v-container class="pt-0">
                    <CommonTable v-on:click-detail="onAddItem" :column-attrs="tableState.tableAttrs"
                        :data="tableState.data" :total="tableState.total" @page="onPage"
                        v-model:pageSize="searchState.pageSize" v-model:pageNum="searchState.pageNum"
                        @refresh-data="onRefreshData" :table-height="350"
                        :customBodyTable="true" :btnAddItem="false">
                        <template v-slot:customTableBody>
                            <tr v-for="item in tableState.data" :key="item">
                                <td v-for="(field, index) in tableState.tableAttrs.fields"  :key="index"
                                    :class="['border-table', { 'text-center': (typeof field === 'number') }]"
                                    :style="{ textDecoration: tableState.tableAttrs.clickableColumn[index] ? 'underline' : '', cursor: tableState.tableAttrs.clickableColumn[index] ? 'pointer' : '', color: tableState.tableAttrs.clickableColumn[index] ? 'blue' : '' }"
                                    @click="tableState.tableAttrs.clickableColumn[index]">
                                    <span v-if="(field !== 'button')">{{ displayLabel(item, field) }}</span>
                                    <span class="btn-add" v-else @click="onAddItem(item.itemId)">選択</span>
                                </td>
                            </tr>
                        </template>
                    </CommonTable>
                </v-container>


            </v-card>
        </v-dialog>
    </v-row>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, Ref } from 'vue'
import TabDetailModel from '@/models/tab-detail.model'
import CommonTable from '@/components/custom-table/index.vue'
import ColumnAttributes from '@/models/column-attributes.model'
import ItemSetForm from '@/components/form-component/item-set-form.component.vue'
import ItemMaster from '@/models/ItemMaster'
import AppConstants from '@/constants/constants'
import itemListService from "@/services/ItemMaster";
import SearchComponent from "@/components/tabs/search-button/index.vue"
import TabCommon from "@/models/tab-common";
import CommonTabs from "@/components/tabs/custom-tabs/index.vue";
import MakerService from "@/services/maker.service";
import GenCodeService from '@/services/genCode.service'
import GenCode from '@/models/GenCode';
import CustomValueTable from '@/utils/customValueTable';

const DEFAULT_OS = ['IOS', 'Android']
const dialogListItem = ref(false);
const isModal = ref(true)
let mstMakers = ref<any[]>([])
const SetType: Ref<GenCode[]> = ref([])

const tabDetails = [
    { tabTitle: "品目ID検索" },
] as TabCommon[];


const tableState = reactive({
    tableAttrs: {
        labels: ['品目ID', '品目名称', 'タイプ', 'メーカー', 'メーカー型番', '有効期間(From)', '有効期間(To)', ''],
        fields: ['itemId', 'itemName', 'SetType', 'makerId', 'makerModel', 'expirationDateFrom', 'expirationDateTo', 'button'],
        clickableColumn: [false],
        columnsWidth: [100, 250, 250, 250]
    } as ColumnAttributes,
    data: [] as ItemMaster[],
    total: 0
})

let searchState = reactive({
    itemId: undefined,
    itemName: undefined,
    assetType: undefined,
    makerId: undefined,
    makerModel: undefined,
    janCode: undefined,
    expirationDateFrom: undefined,
    expirationDateTo: undefined,
    deletedRecordDisplayMode: 0,
    pageNum: 1,
    pageSize: 10
})



let itemset = ref({
    itemId: undefined,
    itemName: undefined,
    assetType: undefined,
    makerId: undefined,
    makerModel: undefined,
    expirationDateFrom: undefined,
    expirationDateTo: undefined,
} as ItemMaster)

let keyMainChild = ref(Boolean);
onMounted(async () => {
    // call api to get data
})
const emit = defineEmits(['onAddItem', 'onCheckModal']);

const onAddItem = async (itemId: any) => {


    dialogListItem.value = false
    try {
        const response = await itemListService.get({ itemId }).then((data) => {

            tableState.data = [data.itemInfo]
            emit('onAddItem', tableState.data)
            emit('onCheckModal', keyMainChild)
        })
    } finally {
    }
}

const getItemSetList = async () => {
    try {
        const response = await itemListService.getAll(searchState).then((data) => {
            tableState.data = data.mstItem
            tableState.total = data.itemTotal
        })
    } finally {
    }
}
const onClickClear = () => {
    searchState.itemId = undefined;
    searchState.itemName = undefined;
    searchState.assetType = undefined;
    searchState.makerId = undefined;
    searchState.makerModel = undefined;
    searchState.janCode = undefined;

};
const onClickSearch = async () => {
    searchState.pageNum = 1
    getItemSetList()
}

const onClickClose = () => {
    dialogListItem.value = false
}

const onRefreshData = () => getItemSetList()

const onClickAddNewItem = () => {
    itemset.value = {
        expirationStatus: AppConstants.DEFAULT_ALL,
    } as ItemMaster
}



const onPage = () => getItemSetList()
const openDialogItemList = async (keyMain: any) => {
    const makerTemp = await MakerService.getAll();
    mstMakers.value = [...makerTemp?.data?.mstMakerMaster]
    dialogListItem.value = true
    keyMainChild = keyMain
    SetType.value = await (await GenCodeService.getAll({ tableName: AppConstants.MASTER_ITEM })).mstGenCode;

    getItemSetList()
}

/**
 * 調達テーブルにテキスト値を表示
 * @param item は調達テーブルのアイテムです
 * @param field 調達テーブル内のアイテムのプロパティです
 * @return {string} 調達表記録値
 */
const displayLabel = (item: any, field: string): string => {

    switch (field) {
        case "SetType":
            const SetTypeText =
                SetType.value.find(status => item.assetType === status.fieldValue)?.fieldDisplayLabel || "";
            return SetTypeText;
        default:
            break;
    }
    return CustomValueTable.setValueTable(item, field);
}

defineExpose({
    openDialogItemList,
})
defineProps<{
    itemIdSet?: any
    keyMain?: any
}>()

</script>

<style lang="scss" scoped>
.border-table {
    border: thin solid black;
}

.btn-add {
    text-decoration: underline;
    color: blue;
    cursor: pointer;
}
</style>

