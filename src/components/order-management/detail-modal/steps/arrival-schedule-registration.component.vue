<template>
  <h3>発注品目</h3>

  <v-table class="w-100 detail-table lcm-table" fixed-header hover
    :height="getScrollHeightOfTable(procurementDetailList.length, undefined)" density="comfortable">
    <thead>
      <tr>
        <th v-for="(item, index) in state.labels" :key="index" :style="{ width: item ? undefined : '200px' }">
          {{ item }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!procurementDetailList.length">
        <td :colspan="state.labels.length" class="text-center">
          EMPTY DATA
        </td>
      </tr>
      <tr v-for="(data, index) in procurementDetailList" :key="index">
        <!-- TODO Custom column -->
        <td>{{ displayItemIdOrItemSetId(data.item?.itemId, data.item?.itemIdSet)}}</td>
        <td>{{ data.item?.itemName || data.item?.itemSetName }}</td>
        <td></td>
        <td>
          <DatePicker v-model="data.estimatedArrivalDate" :model-config="AppConstants.CALENDAR_CONFIG"
            :popover="{ visibility: 'focus' }" :masks="AppConstants.CALENDAR_MASKS">
            <template v-slot="{ inputValue, inputEvents, togglePopover }">
              <v-text-field variant="underlined" :model-value="inputValue" v-on="inputEvents" :disabled="!enabledFlag"
                @click="togglePopover" @click:append-inner="togglePopover" density="compact" hide-details
                append-inner-icon="mdi-calendar" readonly />
            </template>
          </DatePicker>
        </td>
        <td>
          <DatePicker v-model="data.estimatedShippingDate" :model-config="AppConstants.CALENDAR_CONFIG"
            :popover="{ visibility: 'focus' }" :masks="AppConstants.CALENDAR_MASKS">
            <template v-slot="{ inputValue, inputEvents, togglePopover }">
              <v-text-field variant="underlined" :model-value="inputValue" v-on="inputEvents" :disabled="!enabledFlag"
                @click="togglePopover" @click:append-inner="togglePopover" density="compact" hide-details
                append-inner-icon="mdi-calendar" readonly />
            </template>
          </DatePicker>
        </td>
        <td>
          <vc-select v-model="data.depreciationRuleId" :items="depreciationRuleList" item-title="depreciationRuleName" item-value="depreciationRuleId" :hideDetails="true"/>
        </td>
        <td>
          <vc-select v-model="data.kittingMasterId" :items="kittingList" item-title="kittingMasterName" item-value="kittingMasterId" :hideDetails="true"/>
        </td>
      </tr>
    </tbody>
  </v-table>

  <div class="d-flex justify-end mt-3">
    <v-btn v-if="enabledFlag" @click="onApproveClick">完了</v-btn>
  </div>
</template>
<script setup lang="ts">
import ProcurementDetail from '@/models/procurement-detail.model';
import Procurement from '@/models/procurement.model';
import { computed, onBeforeMount, PropType, reactive, Ref, ref } from 'vue'
import useMixin from '../mixin/useMixin';
import _ from 'lodash'
import { ProcurementStatusEnum } from '@/enums/procurement.enum';
import { DatePicker } from 'v-calendar';
import procurementService from '@/services/procurement.service';
import AppConstants from '@/constants/constants';
import vcSelect from '@/components/commons/vc-select.vue';
import KittingInformation from '@/models/kitting-information.model';
import KittingService from '@/services/kitting.service';
import DepreciationRule from '@/models/DepreciationRule';
import DepreciationRulesService from '@/services/depreciationRule.service';

const { getScrollHeightOfTable, displayItemIdOrItemSetId } = useMixin()

const props = defineProps({
  procurement: {
    type: Object as PropType<Procurement>,
    required: true
  },
  procurementDetailList: {
    type: Object as PropType<Array<ProcurementDetail>>,
    required: true
  }
})

onBeforeMount(async () => {
  await getListKittings();
  await getListDepreciationRules();
})

const emit = defineEmits(['update:procurement'])

// if at step 3 => btn appear, input enabled
const enabledFlag = computed(() => props.procurement.procurementStatus === ProcurementStatusEnum.PURCHASE_ORDER_APPROVAL)

let state = reactive({
  labels: ['品目ID', '品目名称', '利用組織・利用者', '入荷予定日', '出荷予定日', '償却ルール', 'キッティングマスタ'],
})
const kittingList: Ref<Array<KittingInformation>>= ref([]);
const depreciationRuleList: Ref<Array<DepreciationRule>>= ref([]);

const onApproveClick = async () => {
  const procurement = _.clone(props.procurement)
  procurement.procurementStatus = ProcurementStatusEnum.ARRIVAL_SCHEDULE_REGISTRATION

  const response = await procurementService.addOrUpdate(procurement, props.procurementDetailList)
  emit('update:procurement', response.procurementManagement.procurementId)
}

const getListKittings = async () => {
  const response = await KittingService.getAll();
  kittingList.value = response.kittingList;
}

const getListDepreciationRules = async () => {
  const response = await DepreciationRulesService.getAll();
  depreciationRuleList.value = response.depreList;
}

</script>
<style lang="">

</style>
