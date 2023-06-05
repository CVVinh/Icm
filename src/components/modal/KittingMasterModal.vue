<template>
  <v-form ref="itemMasterForm"
    lazy-validation
    validate-on="submit">
    <div class="top-form pa-3">
      <div class="title">
        <h4>利用者情報</h4>
      </div>
      <v-row>
        <v-col cols="2" class="">
          <div class="form-input">
            <span>品目ID</span>
            <vc-input disabled v-model="modelValue.itemId"></vc-input>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" class="">
          <div class="form-selection">
            <span>タイプ</span>
            <vc-select
              :rules="['required']"
              :items="listAssetType"
              item-title="text"
              item-value="value"
              v-model="modelValue.assetType"
            >
            </vc-select>
          </div>
        </v-col>
        <v-col cols="4" class="">
          <div class="form-input">
            <span>品目名称</span>
            <vc-input name="品目名称" v-model="modelValue.itemName" :rules="['required']"></vc-input>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" class="">
          <div class="form-input">
            <span>JANコード</span>
            <vc-input v-model="modelValue.janCode"></vc-input>
          </div>
        </v-col>
        <v-col cols="4" class="">
          <div class="form-selection">
            <span>メーカー名称</span>
            <v-select
              :items="mstMakers"
              item-title="makerName"
              item-value="makerId"
              v-model="modelValue.makerId"
            >
            </v-select>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" class="">
          <div class="form-input">
            <span>価格</span>
            <vc-input type="number" v-model.number="modelValue.price"></vc-input>
          </div>
        </v-col>
        <v-col cols="3" class="">
          <div class="form-input">
            <span>税率</span>
            <vc-input type="number" v-model.number="modelValue.tax"></vc-input>
          </div>
        </v-col>
        <v-col cols="3" class="">
          <div class="form-input">
            <span>税込み価格</span>
            <vc-input disabled type="number" v-model.number="modelValue.taxIncPrice"></vc-input>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <div class="form-selection">
            <span>OS</span>
            <v-select
              :items="OS"
              item-title="text"
              item-value="value"
              v-model="modelValue.osId"
            />
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="top-form pa-3">
      <div class="title">
        <h4>品目運用情報</h4>
      </div>
      <v-row>
        <v-col cols="2" class="pr-0">
          <div class="form-input">
            <span>有効開始日</span>
            <vc-input-date type="date" style="height: 60px" name="有効開始日" :rules="['required']" :maxValidateDate="modelValue.expirationDateTo" :defaultValue="modelValue.expirationDateFrom" v-model="modelValue.expirationDateFrom"></vc-input-date>
          </div>
        </v-col>
        <v-col cols="2" class="pr-0">
          <div class="form-input">
            <span>有効終了日</span>
            <vc-input-date type="date" style="height: 60px" name="有効終了日" :rules="['required']" :defaultValue="modelValue.expirationDateTo" v-model="modelValue.expirationDateTo"></vc-input-date>
          </div>
        </v-col>
        <v-col cols="2">
          <div class="form-input">
            <span>発注単位数量</span>
            <vc-input name="発注単位数量" type="number" :rules="['required']" v-model.number="modelValue.orderUnit" :maxValue="modelValue.orderUnitMax"></vc-input>
          </div>
        </v-col>
        <v-col cols="2">
          <div class="form-input">
            <span>最大発注数量</span>
            <vc-input name="最大発注数量" type="number" v-model.number="modelValue.orderUnitMax"></vc-input>
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
            <span>タイトル</span>
            <vc-input name="タイトル" :rules="['required']" v-model="modelValue.itemTitle"></vc-input>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" class="">
          <div class="form-textarea">
            <span>説明文</span>
            <v-textarea v-model="modelValue.itemDescription"></v-textarea>
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
            <span>マッチング名称1</span>
            <vc-input></vc-input>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" class="">
          <div class="form-input">
            <span>マッチング名称1</span>
            <vc-input></vc-input>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>

<script lang="ts" setup>
import vcInput from '../commons/vc-input.vue';
import { ref, reactive, watch, PropType } from 'vue';
import ItemMaster from "@/models/ItemMaster";


const props = defineProps({
  listAssetType: {
    type:  Array<string>,
    required: true
  },
  modelValue: {
    type: Object as PropType<ItemMaster>,
    required: true
  },
  OS: {
    type: Array,
    required: true
  },
  mstMakers: {
    type: Array,
    required: true
  }
});
const emit = defineEmits(['update:modelValue'])
const itemMasterForm = ref<any | null>(null);

const validateForm = async () => {
  const validForm = await itemMasterForm.value.validate();
  return validForm;
}
defineExpose({
  validateForm,
});
</script>

<style scoped>
.top-form {
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
}
.between-form {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
}
.bottom-form {
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
}
.btn-qr {
  height: 30px;
  min-width: 30px;
}
</style>

