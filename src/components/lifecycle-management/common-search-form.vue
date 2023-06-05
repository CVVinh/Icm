<template>
  <div class="d-flex flex-wrap overflow-hidden">
    <vc-select
      class="v-col-sm-6 v-col-md-3 pl-0"
      label="資産ステータス"
      v-model="modelValue.assetStatus"
      hide-details
      :items="assetStatusList"
      item-title="fieldDisplayLabel"
      item-value="fieldValue"
    />

    <div class="v-col-sm-6 v-col-md-9"></div>

    <DatePicker
      class="v-col-2 pl-0"
      v-model="modelValue.assetFrom"
      :model-config="AppConstants.CALENDAR_CONFIG"
      :popover="{ visibility: 'hidden', positionFixed: true }"
      :masks="AppConstants.CALENDAR_MASKS"
      titlePosition="right"
    >
      <template v-slot="{ inputValue, inputEvents, togglePopover }">
        <v-text-field
          :model-value="inputValue"
          v-on="inputEvents"
          @click:append-inner="togglePopover"
          @click="togglePopover"
          label="資産開始日"
          append-inner-icon="mdi-calendar-blank"
          hide-details
          variant="underlined"
          density="compact"
          readonly
          clearable
        />
      </template>
    </DatePicker>
    <DatePicker
      class="v-col-2"
      v-model="modelValue.assetTo"
      :model-config="AppConstants.CALENDAR_CONFIG"
      :popover="{ visibility: 'hidden', positionFixed: true }"
      :masks="AppConstants.CALENDAR_MASKS"
      titlePosition="right"
    >
      <template v-slot="{ inputValue, inputEvents, togglePopover }">
        <v-text-field
          :model-value="inputValue"
          v-on="inputEvents"
          @click:append-inner="togglePopover"
          @click="togglePopover"
          label="資産終了日"
          append-inner-icon="mdi-calendar-blank"
          hide-details
          variant="underlined"
          density="compact"
          readonly
          clearable
        />
      </template>
    </DatePicker>

    <DatePicker
      class="v-col-2"
      v-model="modelValue.arrivalOnFrom"
      :model-config="AppConstants.CALENDAR_CONFIG"
      :popover="{ visibility: 'hidden', positionFixed: true }"
      :masks="AppConstants.CALENDAR_MASKS"
      titlePosition="right"
    >
      <template v-slot="{ inputValue, inputEvents, togglePopover }">
        <v-text-field
          :model-value="inputValue"
          v-on="inputEvents"
          @click:append-inner="togglePopover"
          @click="togglePopover"
          label="入荷日(From)"
          append-inner-icon="mdi-calendar-blank"
          hide-details
          variant="underlined"
          density="compact"
          readonly
          clearable
        />
      </template>
    </DatePicker>
    <DatePicker
      class="v-col-2"
      v-model="modelValue.arrivalOnTo"
      :model-config="AppConstants.CALENDAR_CONFIG"
      :popover="{ visibility: 'hidden', positionFixed: true }"
      :masks="AppConstants.CALENDAR_MASKS"
      titlePosition="right"
    >
      <template v-slot="{ inputValue, inputEvents, togglePopover }">
        <v-text-field
          :model-value="inputValue"
          v-on="inputEvents"
          @click:append-inner="togglePopover"
          @click="togglePopover"
          label="入荷日(To)"
          append-inner-icon="mdi-calendar-blank"
          hide-details
          variant="underlined"
          density="compact"
          readonly
          clearable
        />
      </template>
    </DatePicker>

    <template v-if="isHardwareFlag">
      <DatePicker
        class="v-col-2"
        v-model="modelValue.disposalOn"
        :model-config="AppConstants.CALENDAR_CONFIG"
        :popover="{ visibility: 'hidden', positionFixed: true }"
        :masks="AppConstants.CALENDAR_MASKS"
        titlePosition="right"
      >
        <template v-slot="{ inputValue, inputEvents, togglePopover }">
          <v-text-field
            :model-value="inputValue"
            v-on="inputEvents"
            label="廃棄日(From)"
            append-inner-icon="mdi-calendar-blank"
            @click:append-inner="togglePopover"
            @click="togglePopover"
            hide-details
            variant="underlined"
            density="compact"
            readonly
            clearable
          />
        </template>
      </DatePicker>
      <DatePicker
        class="v-col-2 pr-0"
        v-model="modelValue.disposalOn"
        :model-config="AppConstants.CALENDAR_CONFIG"
        :popover="{ visibility: 'hidden', positionFixed: true }"
        :masks="AppConstants.CALENDAR_MASKS"
        titlePosition="right"
      >
        <template v-slot="{ inputValue, inputEvents, togglePopover }">
          <v-text-field
            :model-value="inputValue"
            v-on="inputEvents"
            label="廃棄日(To)"
            append-inner-icon="mdi-calendar-blank"
            @click:append-inner="togglePopover"
            @click="togglePopover"
            hide-details
            variant="underlined"
            density="compact"
            readonly
            disabled
            clearable
          />
        </template>
      </DatePicker>
    </template>
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { DatePicker } from "v-calendar";
import AppConstants from "@/constants/constants";
import useLifeCycleMixin from "@/mixins/life-cycle-management/useLifeCycleMixin";
import VcSelect from "@/components/commons/vc-select.vue";

const { assetStatusList } = useLifeCycleMixin(true)

defineProps({
  modelValue: {
    type: Object as PropType<LifecycleHardwareSearch>,
    required: true,
  },
  isHardwareFlag: {
    type: Boolean,
    default: true,
  },
});
defineEmits(["update:modelValue"]);
</script>
<style lang="scss" scoped></style>
