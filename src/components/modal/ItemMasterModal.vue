<template>
  <v-form ref="itemMasterForm" lazy-validation validate-on="submit">
    <div class="top-form pa-3">
      <div class="title">
        <h4>利用者情報</h4>
      </div>
      <v-row class="mt-4">
        <v-col cols="2" class="">
          <div class="form-input">
            <vc-input label="品目ID" readonly v-model="modelValue.itemId" />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" class="">
          <div class="d-flex align-center">
            <v-select
              v-model="modelValue.assetType"
              label="タイプ"
              variant="underlined"
              density="comfortable"
              :rules="['required']"
              :items="listAssetType"
              class="table-submit-elements"
              style="min-width: 160px; max-width: 220px"
              item-title="fieldDisplayLabel"
              item-value="fieldValue"
              :readonly="itemDeletedFlag"
            >
            </v-select>
          </div>
        </v-col>
        <v-col cols="3" class="">
          <div class="form-input">
            <vc-input
              label="品目名称"
              name="品目名称"
              v-model="modelValue.itemName"
              :rules="['required']"
              density="compact"
              variant="underlined"
              :readonly="itemDeletedFlag"
            >
            </vc-input>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" class="">
          <div class="form-input">
            <v-text-field
              label="JANコード"
              v-model="modelValue.janCode"
              density="compact"
              hide-details
              variant="underlined"
              :readonly="itemDeletedFlag"
            >
            </v-text-field>
          </div>
        </v-col>
        <v-col cols="2" class="">
          <div class="form-input">
            <vc-input label="JANコード" v-model="modelValue.janCode" />
          </div>
        </v-col>
        <v-col cols="4" class="">
          <div class="d-flex align-center">
            <v-select
              v-model="modelValue.makerId"
              label="メーカー名称"
              variant="underlined"
              density="comfortable"
              :items="mstMakers"
              class="table-submit-elements"
              style="min-width: 160px; max-width: 220px"
              item-title="makerName"
              item-value="makerId"
              :readonly="itemDeletedFlag"
            >
            </v-select>
          </div>
        </v-col>
        <v-col cols="3" class="">
          <div class="form-input">
            <vc-input
              label="メーカー型番"
              v-model:value="modelValue.makerModel"
              :max-length="200"
              density="compact"
              variant="underlined"
              :readonly="itemDeletedFlag"
            >
            </vc-input>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="">
          <div class="form-input">
            <vc-input
              label="価格"
              type="number"
              v-model.number="modelValue.price"
              density="compact"
              hide-details
              variant="underlined"
              :readonly="itemDeletedFlag"
            >
            </vc-input>
          </div>
        </v-col>
        <v-col cols="2" class="">
          <div class="form-input">
            <vc-input
              label="税率"
              type="number"
              v-model.number="modelValue.tax"
              density="compact"
              hide-details
              variant="underlined"
              :readonly="itemDeletedFlag"
            >
            </vc-input>
          </div>
        </v-col>
        <v-col cols="2" class="">
          <div class="form-input">
            <vc-input
              label="税込み価格"
              disabled
              type="number"
              v-model.number="modelValue.taxIncPrice"
              density="compact"
              hide-details
              variant="underlined"
              :readonly="itemDeletedFlag"
            >
            </vc-input>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="d-flex align-center">
            <v-select
              v-model="modelValue.osId"
              label="OS"
              variant="underlined"
              density="comfortable"
              :items="AppConstants.OS"
              class="table-submit-elements"
              style="min-width: 160px; max-width: 220px"
              item-title="text"
              item-value="value"
              :readonly="itemDeletedFlag"
            >
            </v-select>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="top-form pa-3">
      <div class="title">
        <h4>品目運用情報</h4>
      </div>
      <v-row class="mt-4">
        <v-col cols="2" class="pr-0">
          <div class="form-input">
            <vc-input-date
              label="有効開始日"
              type="date"
              style="height: 60px"
              name="有効開始日"
              :rules="['required']"
              :maxValidateDate="modelValue.expirationDateTo"
              :defaultValue="modelValue.expirationDateFrom"
              v-model="modelValue.expirationDateFrom"
              :readonly="itemDeletedFlag"
            ></vc-input-date>
          </div>
        </v-col>
        <v-col cols="2" class="pr-0">
          <div class="form-input">
            <vc-input-date
              label="有効終了日"
              type="date"
              style="height: 60px"
              name="有効終了日"
              :rules="['required']"
              :defaultValue="modelValue.expirationDateTo"
              v-model="modelValue.expirationDateTo"
              :readonly="itemDeletedFlag"
            ></vc-input-date>
          </div>
        </v-col>
        <v-col cols="2">
          <div class="form-input">
            <vc-input
              name="発注単位数量"
              label="発注単位数量"
              type="number"
              :rules="['required']"
              v-model.number="modelValue.orderUnit"
              :maxValue="modelValue.orderUnitMax"
              :readonly="itemDeletedFlag"
            ></vc-input>
          </div>
        </v-col>
        <v-col cols="2">
          <div class="form-input">
            <vc-input
              name="最大発注数量"
              label="最大発注数量"
              type="number"
              v-model.number="modelValue.orderUnitMax"
              :readonly="itemDeletedFlag"
            ></vc-input>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="between-form pa-3">
      <div class="title">
        <h4>品目選択情報（発注管理用）</h4>
      </div>
      <v-row>
        <v-col cols="5" class="">
          <div class="form-input">
            <v-text-field
              disabled
              type="number"
              label="タイトル"
              :rules="['required']"
              v-model="modelValue.itemTitle"
              density="compact"
              hide-details
              variant="underlined"
              :readonly="itemDeletedFlag"
            >
            </v-text-field>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" class="">
          <div class="form-textarea">
            <v-textarea
              label="説明文"
              v-model="modelValue.itemDescription"
              :readonly="itemDeletedFlag"
            ></v-textarea>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="bottom-form pa-3">
      <div class="title">
        <h4>ソフトウェアインベントリ情報</h4>
      </div>
      <v-row>
        <v-col cols="5" class="">
          <div class="form-input">
            <vc-input
              name="マッチング名称1"
              label="マッチング名称1"
              :readonly="itemDeletedFlag"
            ></vc-input>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" class="">
          <div class="form-input">
            <vc-input
              name="マッチング名称1"
              label="マッチング名称1"
              :readonly="itemDeletedFlag"
            ></vc-input>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>

<script lang="ts" setup>
import vcInput from "../commons/vc-input.vue";
import { ref, PropType, onMounted } from "vue";
import ItemMaster from "@/models/ItemMaster";
import GenCode from "@/models/GenCode";
import GenCodeService from "@/services/genCode.service";
import AppConstants from "@/constants/constants";
import makerService from "@/services/maker.service";
import MakerMaster from "@/models/MakerMaster";

defineProps({
  modelValue: {
    type: Object as PropType<ItemMaster>,
    required: true,
  },
  itemDeletedFlag: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["update:modelValue"]);
const itemMasterForm = ref<any | null>(null);
const listAssetType = ref<GenCode[]>([]);
const mstMakers = ref<MakerMaster[]>([]);

onMounted(async () => {
  await getGenCode();
  await getMaker();
});

const getGenCode = async () => {
  listAssetType.value = (
    await GenCodeService.getAll({ tableName: AppConstants.MASTER_ITEM })
  ).mstGenCode;
};

const getMaker = async () => {
  const makerTemp = await makerService.getAll();
  mstMakers.value = [...makerTemp?.data?.mstMakerMaster];
};

const validateForm = async () => {
  const validForm = await itemMasterForm.value.validate();
  return validForm;
};
defineExpose({
  validateForm,
});
</script>

<style scoped>
.btn-qr {
  height: 30px;
  min-width: 30px;
}
</style>
