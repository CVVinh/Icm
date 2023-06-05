<template>
  <div class="bordered-component pa-4">
    <label><strong>委託先情報</strong></label>
    <v-form class="pt-3">
      <v-row class="ma-0">
        <v-col class="pa-0" cols="2">
          <div class="form-item">
            <label>委託先ID</label>
            <v-text-field hide-details variant="solo" v-model="modelValue.outsourcingCompanyId" readonly
              :disabled="!modelValue.outsourcingCompanyId" />
          </div>
        </v-col>
      </v-row>

      <v-row class="ma-0 mt-2">
        <v-col class="pa-0" cols="2">
          <div class="form-item">
            <label>エリア</label>
            <vc-select hide-details variant="solo" class="form-selection" v-model="modelValue.area"
              :items="AppConstants.AREAS" />
          </div>
        </v-col>

        <v-col class="pa-0 pl-3" cols="3">
          <div class="form-item">
            <label>委託先名称</label>
            <v-text-field hide-details variant="solo" v-model.trim="modelValue.outsourcingCompanyName" />
          </div>
        </v-col>

        <v-col class="pa-0 pl-3" cols="2">
          <div class="form-item">
            <label>代表電話番号</label>
            <v-text-field hide-details variant="solo" v-model.trim="modelValue.pilotNumber" />
          </div>
        </v-col>
      </v-row>

      <v-row class="ma-0 mt-2">
        <v-col class="pa-0" cols="2">
          <div class="form-item">
            <label>郵便番号</label>
            <v-text-field hide-details variant="solo" v-model.trim="modelValue.zipCode" />
          </div>
        </v-col>

        <v-col class="pa-0 pl-3" cols="2">
          <div class="form-item">
            <label>住所(都道府県)</label>
            <vc-select hide-details variant="solo" class="form-selection" v-model="modelValue.prefCode"
              :items="prefectures" item-title="prefName" item-value="prefId" />
          </div>
        </v-col>

        <v-col class="pa-0 pl-3" cols="2">
          <div class="form-item">
            <label>(市区町村)</label>
            <v-text-field hide-details variant="solo" v-model.trim="modelValue.city" />
          </div>
        </v-col>

        <v-col class="pa-0 pl-3" cols="2">
          <div class="form-item">
            <label>(番地)</label>
            <v-text-field hide-details variant="solo" v-model.trim="modelValue.street" />
          </div>
        </v-col>

        <v-col class="pa-0 pl-3" cols="2">
          <div class="form-item">
            <label>(ビル名等)</label>
            <v-text-field hide-details variant="solo" v-model.trim="modelValue.building" />
          </div>
        </v-col>
      </v-row>

      <v-row class="ma-0 mt-2">
        <v-col class="pa-0" cols="2">
          <div class="form-item">
            <label>担当部署</label>
            <v-text-field hide-details variant="solo" v-model.trim="modelValue.department" />
          </div>
        </v-col>

        <v-col class="pa-0 pl-3" cols="2">
          <div class="form-item">
            <label>担当者名</label>
            <v-text-field hide-details variant="solo" v-model.trim="modelValue.pic" />
          </div>
        </v-col>

        <v-col class="pa-0 pl-3" cols="2">
          <div class="form-item">
            <label>担当電話番号</label>
            <v-text-field hide-details variant="solo" v-model.trim="modelValue.directNumber" />
          </div>
        </v-col>

        <v-col class="pa-0 pl-3" cols="2">
          <div class="form-item">
            <label>担当メール</label>
            <v-text-field hide-details variant="solo" v-model.trim="modelValue.directEmailAddress" />
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts" setup>
import AppConstants from '@/constants/constants';
import OutsourcingCompanyInformation from '@/models/outsourcing-information.model';
import { PropType } from 'vue';
import Prefecture from '@/models/Prefecture';

defineProps({
  modelValue: {
    required: true,
    type: Object as PropType<OutsourcingCompanyInformation>,
  },
  prefectures: {
    required: true,
    type: Object as PropType<Array<Prefecture>>
  }
})

defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.bordered-component {
  border: thin solid;
  border-radius: 5px;
}
</style>
