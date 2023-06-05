<template>
  <v-container>
    <v-card elevation="5">
      <v-container>
        <h3>発注進捗</h3>
        <br />
        <v-timeline direction="horizontal">
          <v-timeline-item
            v-for="(item, index) in procurementStatusList"
            :key="index"
            :dot-color="item?.color || 'white'"
          >
            <!-- <template v-slot:opposite v-if="item">
              Opposite
            </template> -->
            <!-- <template v-slot:icon>
              <v-icon icon="mdi-arrow-left mdi-spin"></v-icon>
            </template> -->
            <div>
              <strong>{{ item?.name }}</strong>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-container>

      <v-container class="pt-0">
        <v-form class="mt-3 d-flex w-100">
          <v-row class="ma-0">
            <v-col class="pa-0" cols="2">
              <div class="form-item">
                <v-text-field
                  hide-details
                  variant="underlined"
                  :model-value="procurement?.procurementId"
                  readonly
                  label="発注ID"
                />
              </div>
            </v-col>
            <v-col class="pa-0" cols="3">
              <div class="form-item">
                <v-text-field
                  hide-details
                  variant="underlined"
                  :model-value="procurement?.procurementName"
                  readonly
                  label="発注名称"
                />
              </div>
            </v-col>
            <v-col class="pa-0 ml-3" cols="2">
              <div class="form-item">
                <v-text-field
                  hide-details
                  variant="underlined"
                  :model-value="procurement?.approvalAccountId"
                  readonly
                  label="発注名称"
                />
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-container>

      <v-container class="pt-0">
        <h3>発注明細</h3>
        <v-table
          class="w-100 detail-table lcm-table"
          fixed-header
          hover
          :height="
            getScrollHeightOfTable(procurementDetailList?.length, undefined)
          "
          density="compact"
        >
          <thead>
            <tr>
              <th v-for="item in state.columns">
                {{ item }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!procurementDetailList?.length">
              <td :colspan="state.columns.length" class="text-center">
                EMPTY DATA
              </td>
            </tr>
            <tr v-else v-for="item in procurementDetailList">
              <td>{{ displayAssetClassLabelByGenCode(item.item)}}</td>
              <td>{{ displayItemIdOrItemSetId(item.item?.itemId, item.item?.itemIdSet)}}</td>
              <td>{{ item.item?.makerModel || item.item?.itemSetMakerModel}}</td>
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
              <td>
                {{
                  item.estimatedArrivalDate
                    ? moment(item.estimatedArrivalDate).format("yyyy-MM-DD")
                    : ""
                }}
              </td>
            </tr>
          </tbody>
          <tfoot v-if="procurementDetailList?.length">
            <tr>
              <td :colspan="6" class="text-right">仮合計(税込)</td>
              <td colspan="3">{{ getTotalAmount(procurementDetailList) }}</td>
            </tr>
          </tfoot>
        </v-table>
      </v-container>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import ProcurementDetail from "@/models/procurement-detail.model";
import Procurement from "@/models/procurement.model";
import { PropType, computed, reactive, inject, Ref } from "vue";
import useMixin from "../mixin/useMixin";
import moment from "moment";
import { ProcurementStatusEnum } from "@/enums/procurement.enum";

interface ProcurementStatus {
  name: string;
  color?: string;
  icon?: string;
}

enum ProcurementStatusColor {
  SUCCESS = "blue",
  DELETED = "red",
  WARNING = "yellow",
  BACK_TO_FIRST_STEP = "pink",
  DEFAULT = "white",
}

const { getScrollHeightOfTable, getTotalAmount, convertPriceToJpPrice, displayAssetClassLabelByGenCode, displayItemIdOrItemSetId } =
  useMixin();

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
const { procurement } = props;

const state = reactive({
  columns: [
    "資産区分",
    "品目ID",
    "型番",
    "品目名称",
    "数量",
    "金額(税込)",
    "小計(税込)",
    "見積",
  ],
});

const procurementStatusList = computed(() => {
  if (!procurement) {
    return [] as ProcurementStatus[];
  }
  return [
    getOrderItemStatus(),
    getQuotationReplyStatus(),
    getOrderAprovalRequestStatus(),
    getOrderAprovalStatus(),
    getScheduleRegistrationStatus(),
    getOrderStatus(),
    getOrderedStatus(),
  ];
});

const getOrderItemStatus = () => {
  let color =
    (procurement.procurementId && !procurement.isBack) ||
    procurement.procurementStatus > ProcurementStatusEnum.ORDER_ITEM_CART
      ? ProcurementStatusColor.SUCCESS
      : ProcurementStatusColor.DEFAULT;

  const firstStep: ProcurementStatus = {
    name: "見積依頼",
    color,
  };
  return firstStep;
};

const getQuotationReplyStatus = () => {
  let color;
  if (procurement.procurementStatus >= ProcurementStatusEnum.QUOTATION_REPLY) {
    color = ProcurementStatusColor.SUCCESS
  } else {
    let dif = moment(procurement.quotationDatetime).diff(moment(), 'day')
    color = dif < 0 ? ProcurementStatusColor.DELETED : ProcurementStatusColor.DEFAULT
  }

  const secondState: ProcurementStatus = {
    name: "見積回答",
    color,
  };
  return secondState;
};

const getOrderAprovalRequestStatus = () => {
  let color;
  if (
    procurement.procurementStatus >=
    ProcurementStatusEnum.PURCHASE_APRROVAL_REQUEST
  ) {
    color = ProcurementStatusColor.SUCCESS;
  }

  const thirdStep: ProcurementStatus = {
    name: "発注承認依頼",
    color,
  };
  return thirdStep;
};

const getOrderAprovalStatus = () => {
  let color
  if (procurement.procurementStatus >= ProcurementStatusEnum.PURCHASE_ORDER_APPROVAL) {
    color = ProcurementStatusColor.SUCCESS
  } else {
    let dif = moment(procurement.approvalExpirationDate).diff(moment(), 'day')
    color = dif < 0 ? ProcurementStatusColor.DELETED : ProcurementStatusColor.DEFAULT
  }

  return {
    name: "発注承認",
    color,
  } as ProcurementStatus;
};

const getScheduleRegistrationStatus = () => {
  let color;
  if (
    procurement.procurementStatus >=
    ProcurementStatusEnum.ARRIVAL_SCHEDULE_REGISTRATION
  ) {
    color = ProcurementStatusColor.SUCCESS;
  }

  return {
    name: "資産登録",
    color,
  } as ProcurementStatus;
};

const getOrderStatus = () => {
  let color;
  if (procurement.procurementStatus >= ProcurementStatusEnum.ORDER) {
    color = ProcurementStatusColor.SUCCESS;
  }

  return {
    name: "発注",
    color,
  } as ProcurementStatus;
};

const getOrderedStatus = () => {
  let color;
  if (procurement.procurementStatus >= ProcurementStatusEnum.ORDERED) {
    color = ProcurementStatusColor.SUCCESS;
  }

  return {
    name: "発注済",
    color,
  } as ProcurementStatus;
};
</script>
<style lang="scss" scoped></style>
