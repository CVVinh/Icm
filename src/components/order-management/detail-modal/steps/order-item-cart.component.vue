<template>
  <div class="d-flex align-center">
    <h3>発注品目カート</h3>
    <v-spacer />
    <v-select
      class="v-col-2 form-selection pa-0 h-100 mr-3"
      density="compact"
      variant="outlined"
      hide-details
      :items="additionTypes"
      v-model="addingState"
    />
    <v-btn class="" @click="showModalListProcurement" size="small">選択</v-btn>
  </div>

  <v-table
    class="w-100 detail-table mt-3 lcm-table"
    fixed-header
    :height="getScrollHeightOfTable(addingItems.length, undefined)"
    density="compact"
    hover
  >
    <thead>
      <tr>
        <template v-for="label in state.columns">
          <th v-if="label !== BTN_AREA">
            {{ label }}
          </th>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!addingItems.length">
        <td :colspan="state.columns.length" class="text-center">EMPTY DATA</td>
      </tr>
      <tr v-else v-for="(item, index) in addingItems">
        <td>{{ displayAssetClassLabelByGenCode(item.item) }}</td>
        <td>{{ displayItemIdOrItemSetId(item.item?.itemId, item.item?.itemIdSet) }}</td>
        <td> {{ item.item?.makerModel || item.item?.itemSetMakerModel }}</td>
        <td>{{ item.item?.itemName || item.item?.itemSetName }}</td>
        <td>{{ item.quantity }}</td>
        <td>{{ convertPriceToJpPrice(item.item?.taxIncPrice) }}</td>
        <td>
          {{ convertPriceToJpPrice((item.quantity || 0) * (item.item?.taxIncPrice || 0)) }}
        </td>
        <td
          class="d-flex align-center"
          v-if="procurement.isBack || !procurement.procurementId"
          style="border-right: none; border-bottom: none"
        >
          <v-btn size="small" variant="outlined">添付</v-btn>
          <v-spacer />
          <v-btn
            size="small"
            variant="outlined"
            @click="addingItems.splice(index, 1)"
            >削除</v-btn
          >
        </td>
      </tr>
    </tbody>
    <tfoot v-if="addingItems.length">
      <tr>
        <td :colspan="6" class="text-right">仮合計(税込)</td>
        <td>
          {{ getTotalAmount(addingItems) }}
        </td>
      </tr>
    </tfoot>
  </v-table>

  <v-form class="d-flex w-100 mt-3">
    <v-row class="ma-0 form-item">
      <v-text-field
        label="発注名称"
        class="v-col-4 pa-0"
        hide-details
        variant="outlined"
        v-model="procurement.procurementName"
        :disabled="disabledInputFields"
      />
    </v-row>
  </v-form>

  <v-form class="mt-3 d-flex w-100">
    <v-row class="ma-0">
      <v-textarea
        label="申し送り"
        class="v-col-4 pa-0"
        rows="2"
        hide-details
        variant="outlined"
        v-model="procurement.quotationRequestNote"
        :disabled="disabledInputFields"
      />
    </v-row>
  </v-form>

  <v-form class="mt-3 d-flex w-100">
    <v-row class="ma-0">
      <v-col class="pa-0" cols="3">
        <div class="form-item">
          <DatePicker
            v-model="procurement.quotationDatetime"
            :model-config="AppConstants.CALENDAR_CONFIG"
            :popover="{ visibility: 'hidden' }"
            :masks="AppConstants.CALENDAR_MASKS"
          >
            <template v-slot="{ inputValue, inputEvents, togglePopover }">
              <v-text-field
                hide-details
                :model-value="inputValue"
                v-on="inputEvents"
                variant="outlined"
                readonly
                append-inner-icon="mdi-calendar"
                :disabled="disabledInputFields"
                label="回答期限"
                @click="togglePopover"
                @click:append-inner="togglePopover"
              />
            </template>
          </DatePicker>
        </div>
      </v-col>
      <v-col class="pa-0 ml-3" cols="3">
        <div class="form-item">
          <v-text-field
            label="見積担当"
            hide-details
            variant="outlined"
            v-model.number="procurement.quotationAccountId"
            :disabled="disabledInputFields"
          />
        </div>
      </v-col>
      <v-spacer />
      <v-btn
        color="primary"
        @click="onSaveOrderRequest"
        v-if="
          (procurement.isBack &&
            procurement.procurementStatus ===
              ProcurementStatusEnum.ORDER_ITEM_CART) ||
          !procurement.procurementId
        "
        >見積依頼</v-btn
      >
    </v-row>
  </v-form>

  <ModalListProcurement
    ref="listProcurentModalRef"
    v-on:get-item="onReceiveItem"
    v-on:licence-get-item="onReceiveItem"
    v-on:get-item-set="onReceiveItem"
  />
</template>
<script setup lang="ts">
import ProcurementDetail from "@/models/procurement-detail.model";
import Procurement from "@/models/procurement.model";
import { computed, PropType, reactive, ref, watch } from "vue";
import useMixin from "../mixin/useMixin";
import _ from "lodash";
import procurementService from "@/services/procurement.service";
import { ProcurementStatusEnum } from "@/enums/procurement.enum";
import { DatePicker } from "v-calendar";
import AppConstants from "@/constants/constants";
import ModalListProcurement from "@/components/modal/ItemListProcurement.vue";

const { getScrollHeightOfTable, getTotalAmount, convertPriceToJpPrice, displayAssetClassLabelByGenCode, displayItemIdOrItemSetId } = useMixin();

const props = defineProps({
  procurement: {
    type: Object as PropType<Procurement>,
    required: true,
  },
  procurementDetailList: {
    type: Object as PropType<Array<ProcurementDetail>>,
    required: true,
  },
});
const emit = defineEmits([
  "update:procurement",
  "update:procurementDetailList",
]);

const BTN_AREA = "btn-area";
const additionTypes = [
  {
    value: 0,
    title: 'PC・機器'
  },
  {
    value: 1,
    title: 'PCセット'
  },
  {
    value: 2,
    title: 'クラウドライセンス'
  }
];

const addingState = ref(0);
const listProcurentModalRef = ref<InstanceType<
  typeof ModalListProcurement
> | null>(null);
const addingItems = ref<ProcurementDetail[]>([]);

const state = reactive({
  columns: [
    `資産区分`,
    "品目ID",
    "型番",
    "品目名称",
    "数量",
    "金額(税込)",
    "仮小計(税込)",
    BTN_AREA,
  ],
});

watch(
  props.procurementDetailList,
  (value) => {
    addingItems.value = _.cloneDeep(value);
  },
  { immediate: true }
);

const disabledInputFields = computed(() => {
  const { procurement } = props;
  if (procurement.procurementStatus > ProcurementStatusEnum.ORDER_ITEM_CART) {
    return true;
  }
  if (!procurement.procurementId || procurement.isBack) {
    return false;
  }
  return true;
});

const onSaveOrderRequest = async () => {
  let procurement = _.cloneDeep(props.procurement);
  procurement.isBack = false;

  const response = await procurementService.addOrUpdate(
    procurement,
    addingItems.value
  );
  emit("update:procurement", response.procurementManagement.procurementId);
};

const showModalListProcurement = () => {
  listProcurentModalRef.value?.openDialogItemListProcurement(addingState.value);
};

/**
 * 注文リストにアイテムを追加
 * @param value
 */
const onReceiveItem = (value: ProcurementDetail) => {
  const itemOrder: any = value.item;
  const quantityItemOrder: any = value.quantity;
  if (!itemOrder && !quantityItemOrder) {
    return
  }
  const isItemSet = itemOrder.hasOwnProperty('itemIdSet');
  const isItem = itemOrder.hasOwnProperty('itemId');
  let checkItemDuplicate = false;
  addingItems.value.map((order: any) => {
    // 商品が注文リストにある場合は、商品の数量を更新してください
    if (isItemSet && order.item.itemIdSet === itemOrder.itemIdSet
      || isItem && order.item.itemId === itemOrder.itemId) {
        order.quantity = quantityItemOrder
        checkItemDuplicate = true
        return
    }
  })
  if (!checkItemDuplicate) {
    addingItems.value.push(value);
  }
}
</script>
<style lang=""></style>
