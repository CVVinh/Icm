<template>
  <!-- <v-form class="d-flex w-100">
    <v-row class="ma-0">
      <v-col class="pa-0" cols="4">
        <div class="form-item">
          <label>承認ID</label>
          <v-text-field hide-details variant="solo" />
        </div>
      </v-col>
    </v-row>
  </v-form> -->

  <v-form class="mt-3 d-flex w-100">
    <v-row class="ma-0">
      <v-textarea
        label="申し送り"
        class="v-col-11 pa-0"
        rows="2"
        hide-details
        variant="outlined"
        v-model="procurement.approvalNote"
        :disabled="!enabledInputFields"
      />
    </v-row>
  </v-form>

  <div class="d-flex justify-end mt-3 gap-3">
    <template v-if="enabledInputFields">
      <v-btn @click="onSendBackClick">差戻</v-btn>
      <v-btn @click="onRejectClick">不可</v-btn>
      <v-btn @click="onApproveClick">回答</v-btn>
    </template>
    <v-btn
      v-if="
        procurement.procurementStatus ===
        ProcurementStatusEnum.PURCHASE_ORDER_APPROVAL
      "
      @click="onNeedToThinkClick"
      >回答取消</v-btn
    >
  </div>
</template>
<script setup lang="ts">
import Procurement from "@/models/procurement.model";
import { PropType, computed } from "vue";
import _ from "lodash";
import procurementService from "@/services/procurement.service";
import { ProcurementStatusEnum } from "@/enums/procurement.enum";
import ProcurementDetail from "@/models/procurement-detail.model";

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
const emit = defineEmits(["update:procurement"]);

const enabledInputFields = computed(() => {
  if (props.procurement.isDeleted) {
    return false;
  }
  return (
    props.procurement.procurementStatus ===
    ProcurementStatusEnum.PURCHASE_APRROVAL_REQUEST
  );
});

const onSendBackClick = async () => {
  const procurement = _.clone(props.procurement);
  procurement.procurementStatus = ProcurementStatusEnum.QUOTATION_REPLY;
  await callUpdateProcurement(procurement);
};

const onRejectClick = async () => {
  const procurement = _.clone(props.procurement);
  procurement.isDeleted = true;
  await callUpdateProcurement(procurement);
};

const onApproveClick = async () => {
  const procurement = _.clone(props.procurement);
  procurement.procurementStatus = ProcurementStatusEnum.PURCHASE_ORDER_APPROVAL;
  await callUpdateProcurement(procurement);
};

const onNeedToThinkClick = async () => {
  const procurement = _.clone(props.procurement);
  procurement.procurementStatus =
    ProcurementStatusEnum.PURCHASE_APRROVAL_REQUEST;
  await callUpdateProcurement(procurement);
};

const callUpdateProcurement = async (procurement: Procurement) => {
  const response = await procurementService.addOrUpdate(procurement, undefined);
  emit("update:procurement", response.procurementManagement.procurementId);
};
</script>
<style lang="scss" scoped>
.gap-3 {
  gap: 12px;
}
</style>
