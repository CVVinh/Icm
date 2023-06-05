<template>
  <v-form ref="makerMasterForm" class="maker-modal"
    lazy-validation
    validate-on="submit">
    <div class="title">
      <h4>メーカー情報</h4>
    </div>
    <v-row>
      <v-col :cols="2" class="mt-10 py-0">
        <vc-input label="メーカーID" name="メーカーID" :disabled="true" :value="modelValue.makerId" :minValue="1" variant="solo"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="2">
        <vc-select :disabled="itemDeletedFlag" label="エリア" v-model:value="modelValue.area" :items="areaList" />
      </v-col>
      <v-col :cols="6">
        <vc-input :disabled="itemDeletedFlag" label="メーカー名称" name="メーカー名称" v-model:value="modelValue.makerName" :rules="['required']" :maxLength="200"/>
      </v-col>
      <v-col :cols="2">
        <vc-input :disabled="itemDeletedFlag" label="代表電話番号" name="代表電話番号" v-model:value="modelValue.pilotNumber" :rules="['pilotPhone']" :maxLength="200"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="2">
        <vc-input :disabled="itemDeletedFlag" label="郵便番号" name="郵便番号" v-model:value="modelValue.zipCode" :rules="['zipCode']" :maxLength="200"/>
      </v-col>
      <v-col :cols="3">
        <vc-select
          :readonly="itemDeletedFlag"
          label="住所(都道府県)"
          v-model:value="modelValue.prefCode"
          :items="prefectures"
          itemTitle="prefName"
          itemValue="prefId"
          :menuProps="{maxHeight:200}"
          :rules="['required']"
          density="compact"
        />
      </v-col>
      <v-col :cols="2">
        <vc-input label="(市区町村)" name="(市区町村)" v-model:value="modelValue.city" :maxLength="200"/>
      </v-col>
      <v-col :cols="2">
        <vc-input label="(番地)" name="(番地)" v-model:value="modelValue.street" :maxLength="200"/>
      </v-col>
      <v-col :cols="2">
        <vc-input label="(ビル名等)" name="(ビル名等)" v-model:value="modelValue.building" :maxLength="200"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="3">
        <vc-input :disabled="itemDeletedFlag" label="担当部署" name="担当部署" v-model:value="modelValue.department" :maxLength="200"/>
      </v-col>
      <v-col :cols="2">
        <vc-input :disabled="itemDeletedFlag" label="担当者名" name="担当者名" v-model:value="modelValue.pic" :maxLength="200"/>
      </v-col>
      <v-col :cols="2">
        <vc-input :disabled="itemDeletedFlag" label="担当電話番号" name="担当電話番号" v-model:value="modelValue.directNumber" :rules="['phone']" :maxLength="200"/>
      </v-col>
      <v-col :cols="3">
        <vc-input :disabled="itemDeletedFlag" label="担当メール" name="担当メール" v-model:value="modelValue.directEmailAddress" :rules="['email']" :maxLength="200"/>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
import vcInput from '../commons/vc-input.vue';
import vcSelect from '../commons/vc-select.vue';
import { PropType, ref } from "vue";
import MakerMaster from "@/models/MakerMaster";

const props = defineProps({
  areaList: {
    type:  Array<string>,
    required: true
  },
  modelValue: {
    type: Object as PropType<MakerMaster>,
    required: true
  },
  prefectures: {
    type: Array,
    required: true
  },
  itemDeletedFlag: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:modelValue']);
const makerMasterForm = ref<any | null>(null);

const validateForm = async () => {
  const validForm = await makerMasterForm.value.validate();
  return validForm;
}
defineExpose({
  validateForm,
});
</script>

<style lang="scss" scoped>
.maker-modal {
  padding: 5px 20px 40px 20px;

}
</style>
