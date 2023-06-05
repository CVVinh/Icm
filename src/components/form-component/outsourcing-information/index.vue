<template>
  <div class="pa-4 elevation-5">
    <label><strong>委託先情報</strong></label>
    <v-form class="pt-3">
      <v-row class="">
        <v-col cols="2">
          <div class="form-item">
            <v-text-field
              variant="outlined"
              v-model="modelValue.outsourcingCompanyId"
              readonly
              :disabled="!modelValue.outsourcingCompanyId"
              label="委託先ID"
            />
          </div>
        </v-col>
      </v-row>

      <v-row class="mt-2">
        <v-col cols="2">
          <div class="form-item">
            <v-select
              variant="underlined"
              class="form-selection"
              v-model="modelValue.area"
              :items="AppConstants.AREAS"
              label="エリア"
            />
          </div>
        </v-col>

        <v-col class="" cols="3">
          <div class="form-item">
            <v-text-field
              variant="underlined"
              v-model.trim="modelValue.outsourcingCompanyName"
              label="委託先名称"
            />
          </div>
        </v-col>

        <v-col class="" cols="2">
          <div class="form-item">
            <v-text-field
              variant="underlined"
              v-model.trim="modelValue.pilotNumber"
              label="代表電話番号"
            />
          </div>
        </v-col>
      </v-row>

      <v-row class="mt-2">
        <v-col cols="2">
          <div class="form-item">
            <v-text-field
              variant="underlined"
              v-model.trim="modelValue.zipCode"
              label="郵便番号"
            />
          </div>
        </v-col>

        <v-col class="" cols="2">
          <div class="form-item">
            <v-select
              variant="underlined"
              class="form-selection"
              v-model="modelValue.prefCode"
              :items="prefectures"
              item-title="prefName"
              item-value="prefId"
              label="住所(都道府県)"
            />
          </div>
        </v-col>

        <v-col class="" cols="2">
          <div class="form-item">
            <v-text-field
              variant="underlined"
              v-model.trim="modelValue.city"
              label="(市区町村)"
            />
          </div>
        </v-col>

        <v-col class="" cols="2">
          <div class="form-item">
            <v-text-field
              variant="underlined"
              v-model.trim="modelValue.street"
              label="(番地)"
            />
          </div>
        </v-col>

        <v-col class="" cols="2">
          <div class="form-item">
            <v-text-field
              variant="underlined"
              v-model.trim="modelValue.building"
              label="(ビル名等)"
            />
          </div>
        </v-col>
      </v-row>

      <v-row class="mt-2">
        <v-col cols="2">
          <div class="form-item">
            <v-text-field
              variant="underlined"
              v-model.trim="modelValue.department"
              label="担当部署"
            />
          </div>
        </v-col>

        <v-col class="" cols="2">
          <div class="form-item">
            <v-text-field
              variant="underlined"
              v-model.trim="modelValue.pic"
              label="担当者名"
            />
          </div>
        </v-col>

        <v-col class="" cols="2">
          <div class="form-item">
            <v-text-field
              variant="underlined"
              v-model.trim="modelValue.directNumber"
              label="担当電話番号"
            />
          </div>
        </v-col>

        <v-col class="" cols="2">
          <div class="form-item">
            <v-text-field
              variant="underlined"
              v-model.trim="modelValue.directEmailAddress"
              label="担当メール"
            />
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts" setup>
import AppConstants from "@/constants/constants";
import OutsourcingCompanyInformation from "@/models/outsourcing-information.model";
import { PropType } from "vue";
import Prefecture from "@/models/Prefecture";

defineProps({
  modelValue: {
    required: true,
    type: Object as PropType<OutsourcingCompanyInformation>,
  },
  prefectures: {
    required: true,
    type: Object as PropType<Array<Prefecture>>,
  },
});

defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
.bordered-component {
  border: thin solid;
  border-radius: 5px;
}
</style>
