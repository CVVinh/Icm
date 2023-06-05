<template>
  <v-expansion-panels class="mt-8">
    <v-expansion-panel>
      <v-expansion-panel-title
      color="#97E4FF"
        >キッティング情報
        <template v-slot:actions="{ expanded }">
          <v-icon :icon="expanded ? 'mdi-minus' : 'mdi-plus'"></v-icon>
        </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-form>
          <v-row>
            <v-col cols="2">
              <vc-input
                hide-details
                variant="underlined"
                density="compact"
                v-model="modelValue.outsourcingCompanyId"
                readonly
                :disabled="!modelValue.outsourcingCompanyId"
                label="キッティングID"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3">
              <vc-input
                hide-details
                variant="underlined"
                density="compact"
                v-model.trim="modelValue.outsourcingCompanyName"
                label="キッティング名称"
              />
            </v-col>

            <v-col cols="2">
              <vc-input
                hide-details
                variant="underlined"
                density="compact"
                v-model.trim="modelValue.pilotNumber"
                label="マスターPC番号"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8">
              <dev class="form-input">
                <v-textarea
                label="キッティング方法"
                />
              </dev>
            </v-col>
            <v-col cols="8">
              <dev class="form-input">
                <v-textarea
                  label="補足"
                />
              </dev>
            </v-col>
          </v-row>
        </v-form>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts" setup>
import AppConstants from "@/constants/constants";
import OutsourcingCompanyInformation from "@/models/outsourcing-information.model";
import { PropType } from "vue";

const DEFAULT_PREF_CODE = ["デフォルト 1", "デフォルト 2", "デフォルト 3"];

defineProps({
  modelValue: {
    required: true,
    type: Object as PropType<OutsourcingCompanyInformation>,
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
