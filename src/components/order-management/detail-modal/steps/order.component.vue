<template>
  <h3>発注品目</h3>
  <v-table
    class="w-100 detail-table lcm-table"
    fixed-header
    hover
    :height="getScrollHeightOfTable(procurementDetailList.length, undefined)"
    density="compact"
  >
    <thead>
      <tr>
        <th
          v-for="(item, index) in state.labels"
          :key="index"
          :style="{ width: item ? undefined : '200px' }"
        >
          {{ item }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!procurementDetailList.length">
        <td :colspan="state.labels.length" class="text-center">EMPTY DATA</td>
      </tr>
      <tr v-for="(data, index) in procurementDetailList" :key="index">
        <td>{{ displayItemIdOrItemSetId(data.item?.itemId, data.item?.itemIdSet) }}</td>
        <td>{{ data.item?.itemName || data.item?.itemSetName }}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </v-table>

  <div class="d-flex justify-end">
    <v-btn
      @click="onApproveClick"
      v-if="
        procurement.procurementStatus <=
        ProcurementStatusEnum.ARRIVAL_SCHEDULE_REGISTRATION
      "
      >完了</v-btn
    >
  </div>
</template>

<script setup lang="ts">
import ProcurementDetail from "@/models/procurement-detail.model";
import Procurement from "@/models/procurement.model";
import { PropType, reactive } from "vue";
import useMixin from "../mixin/useMixin";
import _ from "lodash";
import { ProcurementStatusEnum } from "@/enums/procurement.enum";
import procurementService from "@/services/procurement.service";
import arrivalService from "@/services/arrival.service";

const { getScrollHeightOfTable, displayItemIdOrItemSetId } = useMixin();

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

const state = reactive({
  labels: [
    "品目ID",
    "品目名称",
    "発注先",
    "発注先発注日",
    "発注先受注ID",
    "エビデンス",
  ],
});

const onApproveClick = async () => {
  const procurement = _.clone(props.procurement);
  procurement.procurementStatus = ProcurementStatusEnum.ORDER;

  const response = await procurementService.addOrUpdate(procurement, undefined);

  for (let index = 0; index < props.procurementDetailList.length; index++) {
    const element = props.procurementDetailList[index];
    const obj = {
      itemId: element.item?.itemId,
      orderId: element.orderId,
      itemIdSet: element.item?.itemIdSet,
      inspectionStatus: 0,
      failureAction: 0,
      accountId: 1 // set accountId default to 1, because author tokens doesn't exist
    };
    await arrivalService.add(obj);
  }

  emit("update:procurement", response.procurementManagement.procurementId);
};
</script>

<style lang=""></style>
