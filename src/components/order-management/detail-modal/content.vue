<template>
  <OrderStatus :procurement="state.procurementInfo" :procurement-detail-list="state.procurementDetailList"
    :key="state.componentKey" />

  <v-container>
    <v-expansion-panels v-model="state.tabExpanded" v-on:update:model-value="onScrollTo($event)">
      <v-expansion-panel :value="ProcurementStatusEnum.ORDER_ITEM_CART" :id="ORDER_ITEM_CART_ID" elevation="5">
        <v-expansion-panel-title>
          <h3>見積依頼</h3>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <OrderItemcart :procurement="state.procurementInfo" @update:procurement="onUpdateProcurement"
            v-model:procurement-detail-list="state.procurementDetailList" :key="state.componentKey" />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel :value="ProcurementStatusEnum.QUOTATION_REPLY" :id="QUOTATION_REPLY_ID" elevation="5">
        <v-expansion-panel-title>
          <h3>見積回答</h3>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <QuotationReply :procurement="state.procurementInfo" @update:procurement="onUpdateProcurement"
            :procurement-detail-list="state.procurementDetailList" :key="state.componentKey" />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel :value="ProcurementStatusEnum.PURCHASE_APRROVAL_REQUEST" :id="PURCHASE_APRROVAL_REQUEST_ID"
        elevation="5">
        <v-expansion-panel-title>
          <h3>発注承認依頼</h3>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <OrderAprovalRequest :procurement="state.procurementInfo" @update:procurement="onUpdateProcurement"
            :procurement-detail-list="state.procurementDetailList" :key="state.componentKey" />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel :value="ProcurementStatusEnum.PURCHASE_ORDER_APPROVAL" :id="PURCHASE_ORDER_APPROVAL_ID"
        elevation="5">
        <v-expansion-panel-title>
          <h3>発注承認</h3>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <OrderAproval :procurement="state.procurementInfo" @update:procurement="onUpdateProcurement"
            :procurement-detail-list="state.procurementDetailList" :key="state.componentKey" />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel :value="ProcurementStatusEnum.ARRIVAL_SCHEDULE_REGISTRATION"
        :id="ARRIVAL_SCHEDULE_RESGISTRATION_ID" elevation="5">
        <v-expansion-panel-title>
          <h3>入荷予定登録・償却登録</h3>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <ArrivalScheduleRegistration :procurement="state.procurementInfo" @update:procurement="onUpdateProcurement"
            :procurement-detail-list="state.procurementDetailList" :key="state.componentKey" />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel :value="ProcurementStatusEnum.ORDER" :id="ORDER_ID" elevation="5">
        <v-expansion-panel-title>
          <h3>発注</h3>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <Order :procurement-detail-list="state.procurementDetailList" :key="state.componentKey"
            :procurement="state.procurementInfo" @update:procurement="onUpdateProcurement" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
<script setup lang="ts">
import { reactive, onMounted, getCurrentInstance, ref, provide } from 'vue';
import OrderStatus from './order-status/index.vue'
import OrderItemcart from '@/components/order-management/detail-modal/steps/order-item-cart.component.vue'
import QuotationReply from './steps/quotation-reply.component.vue'
import OrderAprovalRequest from './steps/order-aproval-request.component.vue'
import OrderAproval from './steps/order-aproval.component.vue'
import ArrivalScheduleRegistration from './steps/arrival-schedule-registration.component.vue'
import Order from './steps/order.component.vue'
import procurementService from '@/services/procurement.service';
import Procurement from '@/models/procurement.model';
import ProcurementDetail from '@/models/procurement-detail.model';
import { ProcurementStatusEnum } from '@/enums/procurement.enum';
import AppConstants from '@/constants/constants';
import DateTimeAction from '@/models/DateTimeAction';
import GenCodeService from "@/services/genCode.service";

const ORDER_ITEM_CART_ID = 'orderItemCart'
const QUOTATION_REPLY_ID = 'quotationReply'
const PURCHASE_APRROVAL_REQUEST_ID = 'purchaseApprovalRequestId'
const PURCHASE_ORDER_APPROVAL_ID = 'purchaseOrderApprovalId'
const ARRIVAL_SCHEDULE_RESGISTRATION_ID = 'arrivalScheduleRegistrationId'
const ORDER_ID = 'orderId'
const elementIds = [ORDER_ITEM_CART_ID, QUOTATION_REPLY_ID, PURCHASE_APRROVAL_REQUEST_ID, PURCHASE_ORDER_APPROVAL_ID, ARRIVAL_SCHEDULE_RESGISTRATION_ID, ORDER_ID]

const props = defineProps({
  procurementId: {
    type: Number,
  }
})

const emit = defineEmits(['actionDatetime'])

const currentInstance = getCurrentInstance()

const state = reactive({
  tabExpanded: -1,
  procurementInfo: {} as Procurement,
  procurementDetailList: [] as ProcurementDetail[],
  componentKey: 0
})

const assetTypeList = ref<any>([]);
provide('assetTypeList', assetTypeList)

onMounted(async () => {
  await getGenCode();
  if (props.procurementId) {
    return getInfo(props.procurementId)
  }

  state.procurementInfo = {
    procurementStatus: ProcurementStatusEnum.ORDER_ITEM_CART,
    procurementName: undefined,
    quotationAccountId: undefined,
    quotationRequestNote: undefined,
    quotationDatetime: undefined
  }
  state.procurementDetailList = []
  state.tabExpanded = ProcurementStatusEnum.ORDER_ITEM_CART
  onScrollTo(state.tabExpanded)
})

const getGenCode = async () => {
  assetTypeList.value = (await GenCodeService.getAll({tableName: AppConstants.MASTER_ITEM})).mstGenCode;
}

const getInfo = async (id: number) => {
  const response = await procurementService.getProcurementInfo(id)
  state.procurementInfo = response.procurementManagement
  state.procurementDetailList = response.procurementDetailList
  state.tabExpanded = response.procurementManagement.isBack ? response.procurementManagement.procurementStatus : response.procurementManagement.procurementStatus + 1
  onScrollTo(state.tabExpanded)
  reloadComponent()
  emit('actionDatetime', {
    createdTime: response.procurementManagement.createdAt,
    updatedTime: response.procurementManagement.modifiedAt,
    deletedTime: response.procurementManagement.deletedAt
  } as DateTimeAction)
}

const onUpdateProcurement = (procurementId: number) => {
  if (props.procurementId || procurementId) {
    return getInfo(props.procurementId || procurementId)
  }
  state.tabExpanded = ProcurementStatusEnum.ORDER_ITEM_CART
}

const onScrollTo = (tabNumber: any) => {
  if (typeof tabNumber === 'undefined') {
    return document.getElementById(AppConstants.COMMON_MODAL_CARD_ID)?.scroll({ behavior: 'smooth', top: 0 })
  }
  const elementId = elementIds.at(tabNumber) as string
  const element = document.getElementById(elementId)
  setTimeout(() => element?.scrollIntoView({ behavior: 'smooth' }), 300)
}

const reloadComponent = () => {
  state.componentKey++
}
</script>
<style lang="scss">

</style>
