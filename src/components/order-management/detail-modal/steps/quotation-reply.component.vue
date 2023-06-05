<template>
  <h3>発注品目</h3>

  <v-table
    class="w-100 detail-table lcm-table"
    fixed-header
    :height="getScrollHeightOfTable(procurementDetailList.length, undefined)"
    density="compact"
    hover
  >
    <thead>
      <tr>
        <th v-for="(item, index) in state.labels" :key="index">
          {{ item }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!procurementDetailList.length">
        <td :colspan="state.labels.length" class="text-center">EMPTY DATA</td>
      </tr>
      <tr v-for="(item, index) in procurementDetailList" :key="index">
        <td>{{ displayAssetClassLabelByGenCode(item.item) }}</td>
        <td>{{ displayItemIdOrItemSetId(item.item?.itemId, item.item?.itemIdSet) }}</td>
        <td>{{ item.item?.makerModel || item.item?.itemSetMakerModel }}</td>
        <td>{{ item.item?.itemName || item.item?.itemSetName }}</td>
        <td>{{ item.quantity }}</td>
        <td>{{ convertPriceToJpPrice(item.item?.taxIncPrice) }}</td>
        <td>
          {{
            convertPriceToJpPrice(
              (item.quantity || 0) * (item.item?.taxIncPrice || 0)
            )
          }}
        </td>
      </tr>
    </tbody>
    <tfoot v-if="procurementDetailList.length">
      <tr>
        <td :colspan="6" class="text-right">仮合計(税込)</td>
        <td colspan="2">{{ getTotalAmount(procurementDetailList) }}</td>
      </tr>
    </tfoot>
  </v-table>

  <div class="d-flex mt-3">
    <v-col cols="11" class="pa-0">
      <v-textarea
        variant="outlined"
        hide-details
        rows="2"
        v-model="procurement.quotationNote"
        :disabled="disabledInputFields"
        label="申し送り"
      />
    </v-col>
  </div>
  <div class="d-flex mt-3 justify-end gap-3">
    <v-btn
      v-if="
        procurement.procurementStatus === ProcurementStatusEnum.QUOTATION_REPLY
      "
      @click="onNeedToThinkClick"
      >回答取消</v-btn
    >
    <template v-if="showBtnGroupFlag">
      <v-btn @click="onSendBackClick">差戻</v-btn>
      <v-btn @click="onRejectClick">不可</v-btn>
      <v-btn @click="onApproveClick">回答</v-btn>
    </template>
  </div>
</template>
<script setup lang="ts">
import ProcurementDetail from "@/models/procurement-detail.model";
import Procurement from "@/models/procurement.model";
import procurementService from "@/services/procurement.service";
import { reactive, PropType, computed } from "vue";
import useMixin from "../mixin/useMixin";
import _ from "lodash";
import { ProcurementStatusEnum } from "@/enums/procurement.enum";

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
let { procurement } = props;

const { getScrollHeightOfTable, getTotalAmount, convertPriceToJpPrice, displayAssetClassLabelByGenCode, displayItemIdOrItemSetId } =
  useMixin();

const emit = defineEmits([
  "update:procurement",
  "update:procurementDetailList",
]);

let state = reactive({
  labels: [
    "資産区分",
    "品目ID",
    "型番",
    "品目名称",
    "数量",
    "見積金額(税込)",
    "小計(税込)",
  ],
});

const showBtnGroupFlag = computed(() => {
  if (procurement.isDeleted) {
    return false;
  }
  return (
    procurement.procurementId &&
    procurement.procurementStatus === ProcurementStatusEnum.ORDER_ITEM_CART &&
    !procurement.isBack
  );
});

const disabledInputFields = computed(() => {
  if (procurement.isDeleted) {
    return true;
  }
  return (
    procurement.procurementStatus >= ProcurementStatusEnum.QUOTATION_REPLY ||
    !procurement.procurementId ||
    procurement.isBack
  );
});

const callUpdateProcurement = async (procurement: Procurement) => {
  const responseProcurement = await procurementService.addOrUpdate(
    procurement,
    undefined
  );
  emit(
    "update:procurement",
    responseProcurement.procurementManagement.procurementId
  );
};

const onSendBackClick = async () => {
  let procurement = _.cloneDeep(props.procurement);
  procurement.isBack = true;
  await callUpdateProcurement(procurement);
};

const onRejectClick = async () => {
  let procurement = _.cloneDeep(props.procurement);
  procurement.isDeleted = true;
  await callUpdateProcurement(procurement);
};

const onApproveClick = async () => {
  let procurement = _.cloneDeep(props.procurement);
  procurement.procurementStatus = 1;
  await callUpdateProcurement(procurement);
};

const onNeedToThinkClick = async () => {
  let procurement = _.cloneDeep(props.procurement);
  procurement.procurementStatus = 0;
  await callUpdateProcurement(procurement);
};
</script>
<style lang="scss" scoped>
.gap-3 {
  gap: 12px;
}
</style>
