<template>
  <div class="d-flex">
    <v-col cols="11" class="pa-0">
      <v-textarea
        label="申し送り"
        variant="outlined"
        hide-details
        rows="2"
        v-model="procurement.approvalRequestNote"
        :disabled="disabledInputFields"
      />
    </v-col>
  </div>
  <div class="d-flex mt-3">
    <v-form class="mt-3 d-flex w-100">
      <v-row class="ma-0">
        <v-col class="pa-0" cols="3">
          <div class="form-item">
            <DatePicker
              v-model="procurement.approvalExpirationDate"
              :model-config="AppConstants.CALENDAR_CONFIG"
              :popover="{ visibility: 'hidden' }"
              :masks="AppConstants.CALENDAR_MASKS"
            >
              <template v-slot="{ inputValue, inputEvents, togglePopover }">
                <v-text-field class="" hide-details :model-value="inputValue" v-on="inputEvents" variant="underlined"
                  append-inner-icon="mdi-calendar" :disabled="disabledInputFields" label="承認期限" @click="togglePopover"
                  @click:append-inner="togglePopover" />
              </template>
            </DatePicker>
          </div>
        </v-col>
        <v-col class="pa-0 ml-3" cols="3">
          <div class="form-item">
            <v-text-field hide-details variant="underlined" v-model.number="procurement.approvalAccountId"
              :disabled="disabledInputFields" label="発注承認担当" />
          </div>
        </v-col>
        <v-spacer />
        <v-btn v-if="procurement.procurementStatus === ProcurementStatusEnum.QUOTATION_REPLY" color="success"
          @click="onApproveOrSendBack(2)">承認依頼</v-btn>
        <v-btn v-if="procurement.procurementStatus === ProcurementStatusEnum.PURCHASE_APRROVAL_REQUEST" color="warning"
          @click="onApproveOrSendBack(1)" class="ml-3">承認依頼取消</v-btn>
      </v-row>
    </v-form>
  </div>
</template>
<script setup lang="ts">
import Procurement from "@/models/procurement.model";
import { PropType, computed } from "vue";
import _ from "lodash";
import procurementService from "@/services/procurement.service";
import { ProcurementStatusEnum } from "@/enums/procurement.enum";
import AppConstants from "@/constants/constants";
import { DatePicker } from "v-calendar";
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

const disabledInputFields = computed(
  () =>
    props.procurement.procurementStatus !==
    ProcurementStatusEnum.QUOTATION_REPLY
);

const onApproveOrSendBack = async (procurementStatus: number) => {
  const procurement = _.cloneDeep(props.procurement);
  procurement.procurementStatus = procurementStatus;
  procurement.isBack = false;

  const response = await procurementService.addOrUpdate(procurement, undefined);
  emit("update:procurement", response.procurementManagement.procurementId);
};
</script>
<style lang="scss" scoped></style>
